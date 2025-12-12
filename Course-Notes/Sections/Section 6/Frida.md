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
