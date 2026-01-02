# FRIDA 
## Introduction
### Components (Simplified)
- Smart phone -> runs JVM & runs FRIDA server.
- JVM -> Manages Java code.
- Client (Laptop) -> runs FRIDA client that communicates with the server. </b>

**FRIDA** Hooks into the JVM and perfom run time manipulation, where it modifies code in memory/at run time.
**FRIDA** consists of two components:
  - FRIDA Server (Gadget) : installed on the smartphone.
  - FRIDA Client : installed on the client (Laptop). </br>
  
And the way these two components communicate with each other is by using JS/Python. 
>[!Note]
> The backend of **FRIDA** is written in JS, so it is better to communicate via JS instead of Python. </br>
## Installation
In order to install FRIDA, you need to install two components:
- Frida Server:
  -  Install the binary file that matches your platform from the official <a href="https://github.com/frida/frida/releases">FRIDA</a> Git repo.
  -  Push the binary to `/data/local/tmp` in your smartphone to be able to execute that binary. </br>
- FRIDA Client:
  - Install it via `pip3 install frida-tools`. </br>
## Hooking FRIDA
**How to hook into a JVM?**
1. Install the APK file on the application.
2. Get the package identifier of the app that we want to hook into via `frida-ps -U | grep -i <pacakge_name>`.
3. Hook into the package via `frida -U <package_name>`. </br>

We have 2 ways to run FRIDA scripts: </br>
1. Provide the script as a parameter to the frida client.
2. Provde the script directly inside the frida terminal. </br>

>[!Note]
>`Java.peform()` -> we use this method to override the Java function stored on the JVM on the smartphone you are testing the application on. In order for FRIDA to define which platform it operates on (since it can operates on Win, Linux, and MAC), we call this function that attaches to the JVM running on the smartphone and get access to all classes, methods, etc required for hooking. </br>
> So it tells FRIDA, please hook into the JVM that has access to those classes & methods. </br>
><img width="1010" height="360" alt="image" src="https://github.com/user-attachments/assets/e57fe240-6e0a-4be9-9e4e-b72dce87ee0b" />
</br>

## Function Overloadig

**Function Overloading** is simply writing the same function with different signature. Two functions can have the same name but with different number of arguments or different data types. </br>
## Timing (Hooking)

Normal hooking scenario with FRIDA is as the following:
1. App starts
2. App is up and running so its status is marked as **running**.
3. After it is marked as running, we connect to the process, then patch the method and interfere with the app. </br>

What if there are set of check in between that detects certian conditions (e.g, whether you are running as root) and terminates the app immediately? In this case, you won't be able to hook into the app and patch the functions because the app's status won't be running anymore. </br>
<img width="1634" height="890" alt="image" src="https://github.com/user-attachments/assets/08af98e8-11e0-4d70-9cc9-a5617c6fdfdd" />
 Hooking into the running process after it is marked as **rooted** won't help us much. Therefore, there's another possibilility that you can take controll of the app start/boot/ </br>
 <img width="1634" height="890" alt="image" src="https://github.com/user-attachments/assets/233dbdf1-2c95-41a9-b666-624ff511762e" />
So frida launches the application and provide the script as soon as possible via `frida -U -f <App_bundle>`.

## Actively Calling a Method
We've seen how to override existing method but we have to wait until this method is triggered. Now we need to know how to actively call a method and take over control. </br>
There are 2 types of classes to call: </br>
1. Static methods -> does not require to inistantiate an object to call it, you call it with the name of the class `Alien.increaseLives()`.
2. Class methods -> you need to inistantiate an object of the class and then call this method `Player player = new Player(); player.increaseLever()`.
</br>
To actively call a static method, you get a reference to this class and class the method directly. </br>

```
Java.perform(function(){
  mainAct= Java.use('com.apphacking.fridaFunc.MainActivity');
  mainAct.nextLevel();
})
```
To actively call a class method, you need to first create an instance of the class and then call the method. </br>

```
Java.Perform(function(){

  var playerClassRef = Java.use('com.apphacking.fridaFunc.Player');
  var playerInstance = playerClassRef.$new();
  playerInstance.increaseLevel();
});
```
The `$new` keyword creates a new object/instance of the class in memory everytime it gets called. </br>

## Working with Instances & Existing Objects
In order to update an existing object, we need to scan the memory, look for that existing object and update its values/attributes. </br>
`Java.choose(className, callback)` -> where it enumaters live instances of the `ClassName` class by scanning the Java heap. </br>
To update an attribute of the instance in the memory, you simply do it this way `instance.lives.value = 10` where lives is the attribute of the instance you are looking for, and value is it's value. </br>

FRIDA may crash if it is incompatible with our device; To make sure if it is a compatibility issue, run the application on a VM and then run the FRIDA script on it. </br>

## Instance as Paramaeter
In order to pass complex parameters such as objects in Frida, we can get reference to these objects and pass them as a parameter. </br>

```
/** Assuming we have 2 objects Boss and Item and Boss takes Item as a parameter **/
const BossRef = Java.use(<classRef>)
const ItemRef = Java.use(<classRef>)
const ItemInstanceRef = ItemRef.$new(1000);
const BossInstanceRef = BossRef.$new(ItemInstanceRef);

```
## Constructor Hooking
The difference between this approach and the previous ones is we are manipulating the creation of the object. Before, we were creating new objects/instances and therefore, the constructor was being called. Now we are not creating new objects, we are hooking the constructor itself without creating any new objects. </br>

```
Java.perform(function(){
  var classRef = Java.use(<classref>)
  // To call the constructor
  classRef.$init.implementation = function(){
  // new implementation
  }
});

```
Notice that it's always a good idea to hook constructors at the beginning of the app. Because if it's called later, it gets created elsewhere and overriding it, is no longer affects.</br>
## Hooking the Native Development Kit
Hooking native code with Frida makes us leave `Java.use` and adapt a new approach `Interceptor.attach(target, callback)`. </br>
We are no longer attaching to JVM (Dalvik),
**Target** -> is the pointer to the native function (function we want to hook). </br>
**Callback** -> has `onEnter()` which let us have an easy access to parameters and perform the code upon entering the method and `onLeave()` which let us have an easy access to return values (just before leaving the function). </br>

In order to bridge between native code and java code is by doing the following: </br>
1. First we load the native library into the Java code.
2. Add the definition of the new function with the prefix `native`.
3. Call the method </br>
<img width="1875" height="924" alt="image" src="https://github.com/user-attachments/assets/0ff79558-c6c0-4216-8950-04e8ef08ab60" />

**How does the function look like in the C/C++ code?** </br>
<img width="848" height="281" alt="image" src="https://github.com/user-attachments/assets/bb0bb964-9471-4057-8e1a-4f76e1134aa1" />
This allows us to have multiple functions with the same name without colliding. </br> 
`JNEnv* env` -> pointer to all NDK functions. </br>
`jobject` -> pointer to the current object. </br>

In order to hook a native function: </br>
1. There's an easy way.
2. There's a hard way. </br>

### Hooking NDK : The Easy Way
We hook simply the Java function..`decryptString()`. </br>
If you are dealing with native function that has a prototype in the Java code -->> go the easy way. </br>

Same method of hooking functions as before (`Java.perform(function(){// get class reference //get method and change the imp. })`. 
### Hooking NDK : The Hard Way 
We use `Interceptor.attach(nativeFunctionPointer, callbacks)`. The native function is being defined in the native library, we need to get this function at rest (nativeFunctionPointer), then we have to provide our callbacks, after that we can observe the paramateres and return values. </br>
**Why bother learning the hardway?**
-> Because not all functions we want to hook are defined in the Java world (`strcpy()`, `strcmpr()`, ..). </br>


