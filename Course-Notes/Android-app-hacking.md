# Section 1: Setup and Installation 
## Introduction

In order to hack an Android application, we need some kind of interaction with the device.
We can do this by visualizing the Android system in our system (so on our laptop).

There are differences between testing on a real device and on an Emulator or Virtual machine.

|                                            | Real Device                                                                                                                                                                                  | Emulator/Virtual Machine                                                                                                                                                                                                                                                                                                |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Setup**                                  | Interaction based on ==USB== or ==WiFi== . We connect our USB cable, then perform all of our stuff and start hacking.                                                                        | Comes with Android Studio                                                                                                                                                                                                                                                                                               |
|                                            | USB is a better option because it is more stable than WiFi                                                                                                                                   |                                                                                                                                                                                                                                                                                                                         |
| **What can we do?**                        | 1- Use Android Debug Bridge (ADB) to interact with the device/2- Use Java Debug Buyer Protocol (JDBP) to debug Java code/ 3-3. Use C Debug Bridge (CDB) to debug native C code/ 4. Use Frida |                                                                                                                                                                                                                                                                                                                         |
|                                            |                                                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                         |
| **Root Access**                            | It hard to get root access and you can break your device                                                                                                                                     | YES (you gain directly Root access)                                                                                                                                                                                                                                                                                     |
| **Performance**                            | Best performance                                                                                                                                                                             | If you have enough resources it works perfectly fine.                                                                                                                                                                                                                                                                   |
| **Platform Support (App is working?)**<br> | YES                                                                                                                                                                                          | Real smart phones are using **ARM** architecture and VM/Emulators are using your laptop architecture (most probably **x86** architecture) so it is not always the case that an application can run on VM or Emulator but it is rare. ==NOTE: you can emulate ARM architecture on your laptop but it is terribly slow.== |
| **Smartphone Features (phone calls, SMS)** | YES                                                                                                                                                                                          | You cannot sent SMS or phone calls but you can fake them (there are lost of apps can do this), and this is a benefit as you can test for example spamming a lot of SMS without paying.                                                                                                                                  |
| **Up to date?**                            | Y/N because if you are using a device now you should be fine for the next 4 years. (Not always up to date)                                                                                   | YES. You can choose within the Emulator between different devices and you pick the one that has the most up to date versions.                                                                                                                                                                                           |
| **Price**                                  | Expensive                                                                                                                                                                                    | FREE                                                                                                                                                                                                                                                                                                                    |

## Setup Guidelines 

### Setup (Not Recommned)

**VM/Emulator**

The worst user experience you could encounter is installing a virtual machine (VM) on your laptop, then installing Android Studio and its emulator within that VM. This setup results in **nested virtualization** — where virtualization is layered inside another virtualized environment. Since hypervisors already share your laptop’s resources between the host system and the VM, you're now dividing those same limited resources again, this time between the VM and the Android Emulator running inside it. This double resource-sharing severely impacts performance. ==(Not Recommended)==

### Setup (Recommned)

**Dedicated smartphone/Dedicated Laptop**
==This the best setup==, to have a dedicated device and a dedicated laptop to perform these tasks (Most expensive though)

**Dedicated Laptop/ Emulator**
This is the second recommended setup.

### Android Studio 

|               | SDK Platform                                                                                                                                           | SDK Tools                                                                                                                                                                                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Defintion** | Android versions (APIs) you build your apps for. So for example, you build an application that runs on Android version 11.0 and 12.0.                  | Set of command-lines and background tools that allows Android Studio and Gradle Scripts to build and manage apps.                                                                                                                                                     |
| **Includes**  | 1. System image for that version (e.g., Android 14)/ 2. Framework APIs (Java/Kotlin classes and methods you can use)/ 3. Source code of the Android OS | `adb` (Android Debug Bridge) – for debugging and communicating with devices./ `emulator` – for running Android emulators./ `avdmanager`, `sdkmanager` – for managing emulators and SDK components./ `dx` / `d8` – converts Java bytecode into DEX format for Android. |
| **Purpose**   | Build, test and compile apps for specific version of Android.                                                                                          | Let you **develop, debug, test, and deploy** apps effectively.                                                                                                                                                                                                        |
|               | Target specific Android versions.                                                                                                                      | Shared across different Android versions.                                                                                                                                                                                                                             |

|                | Android API Level                                                                                                                                                                                        | Android Version                                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Definition** | What the developer works with (e.g., API 34), defining the **set of Java/Kotlin classes and methods** you use to interact with the Android operating system.                                             | What the end user sees (e.g., Android 14).                                                               |
| **Example**    | If you want to access the camera or GPS in your Android app, the Android API provides classes like:<br><br>- `CameraManager` (API 21+)<br>    <br>- `LocationManager`<br>    <br>- `NotificationManager` | Each Android version may introduce new APIs, deprecate old ones, or change the behavior of existing one. |
|                | The **developer-facing identifier** of the OS                                                                                                                                                            | The **user-facing name** of the OS.                                                                      |
**Native Development Kit (NDK)** is used to enable writing parts of Android apps in **C or C++**, instead of Java. While Android apps are primarily developed in Java or Kotlin, certain performance-critical tasks—like game development, graphics rendering, or heavy computations—can benefit from native code due to its speed. The NDK allows you to write this native code, which is then compiled into libraries that your app can use alongside the regular Java code.

**Android SDK Command-Line Tools** -> such as `ADB`, `fastboot` and many more.

**CMake** -> is a **build system tool** used in Android development (especially with the **NDK**) to compile **C and C++ code** into native libraries that can be included in your Android app.

#### **Path Variable** 

 In order to have your binary seen across the whole system, you can define the path of that binary inside a path variable and use it anywhere in your terminal. 
 
The system looks for the location of that binary and if it finds one, it will executes it, otherwise, it will result in command not found.

The command used to append new values to the path variable is as the following:
`export path=$PATH:/directory_of_the_binary/`

## Emulator

Installing an emulator image for a device with play store enabled removes *root access* automatically. 

In Emulator you can do lots of stuff as you emulate circumstances such  as lowering battery level.

**Battery**
In Android systems there are **Broadcast receivers** that can react over events such as lowering the battery level and sends message to all apps that we can trigger to do certain actions. ==For example if battery is running out, save all data in the app to not be lost.==

**Camera**
Can be used for example to scan QR codes.

**SMS and Phone Calls**
You can spoof phone calls and SMS messages, so if some event is happening when some number is calling or texting, then you can spoof that number to trigger the event.

**Snapshot**
Snapshot saves the state of the device as it is, so we can take a snapshot and make some changes to the device (e.g., install new apps, games etc.,) and revert back to the saved state as nothing have ever happened.

Also can be used to boot quickly.

**Video Recording**
Macro playback are predefined actions that can be found in Nexus 6 version of android.

`quemo` is the emulation framework of the android emulator
![[Pasted image 20250716211336.png]]
These are services provided by the emulator.

## Android x_86 Virtual Machine

This is basically an Android iso image that you can install in your VM.
You can use it to interact with the Android system in case if you  don't have a real device or you cannot install the Android Emulator.

Android_x86 image: https://www.android-x86.org/download.html
Download any 32-bit or 68-bit.

## Developer Options

The **Developer Options** menu in Android is a hidden section of system settings meant for **developers, testers, and advanced users**. It provides tools and settings that help in developing, testing, and debugging Android apps and system behavior.

In your smart phone there are developer options that are disabled by default because this is a consumer device. 
**Developer options** -> enable us to perform or investigate certain things as well as helping us in hacking Android apps.

### Options

#### General

`Select mock location` -> spoof GPS location for applications.
`Pointer location` -> get exact coordinates of a view of our application.
`Bluetooth HCI Snoop Log` -> If application is communicating by a Bluetooth, we can log every single byte into an file and we can analyze this afterwards via Wireshark for example.

`USB Debugging` -> is a feature that allows your **Android device** to **communicate with your computer** over a USB connection **using the Android Debug Bridge (ADB)**.

USB Debugging is primarily used during development to:
- Send commands from your computer to the device
- Install and debug apps directly onto the device
- Access logs, system internals, and file systems

`scrcpy` (screen copy)-> is a command line tool that is used to copy your device screen to your laptop.

`OEM Unlocking` -> allows us to flash certain binary on a device.

OEM unlocking only gives the permission for the bootloader to be unlocked and then we can use `fastboot` to unlock the bootloader.

>==NOTE:== If rooting goes wrong you might break your device.


| Term                   | Meaning                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Bootloader             | First software that runs; controls what OS or system can boot                                                                                 |
| OEM Unlocking          | Developer setting to allow bootloader to be unlocked                                                                                          |
| Unlock Bootloader      | Removes manufacturer protection; allows flashing custom software                                                                              |
| Flash                  | Write custom software (ROMs, binaries) directly to device partitions                                                                          |
| ROM (Read-only Memory) | Is a non-volatile storage that store system software and firmware; Where system image, recovery, and bootloader are stored.                   |
| Custom ROM             | Modified Android OS (e.g., LineageOS)                                                                                                         |
| Custom Recovery        | Advanced recovery system like TWRP for flashing and backup, that replaces the default Android recovery (one used for factory reset or update) |
| Rooting                | Gaining superuser access for full control over Android                                                                                        |
| Magisk/Meterpreter     | Tools that provide root access or post-exploit access (security context)                                                                      |
>==NOTE==: ROM in Android context is the software image of the Android OS. 

**What if the Bootloader is Unlocked?**
1. Install (or "flash") custom ROMs
2. Replace default recovery with custom recovery like TWRP
3. Gain root access by flashing root binaries (Magisk)

`Select Debug App` -> If enabled, when choosing an application to debug a debug port is enabled which you can attach to it and debug your application.
Debugging allows you to:
- Inspect memroy
- Change variables and many more.

#### Pointer Location

**Pointer location** is a feature in Android developer options that shows you current touch data.

Pointer location is useful for both developers/testers and hackers (penetration testers).

**For Developers**:
 - Show coordinates of touch screen which makes it easy for developers to debug touch input behaviors.
 - Display a trail of touch point (drag & drop) to check if UI elements responds properly to touches.
 - Log touch data in real-time access that helps developers and testers to identify touch issues if existed.

**For Hackers:**
- It helps hackers to address input fields locations/coordinates in:
	- Automated scripts 
	-  Simulates touches 
	- Automate login forms, dialogs, hidden elements and much more

`.apk` -> is the file format used to install apps on Android devices.
`.apk` is a zip archive that contains all files needed for an application to run and to be installed.

When installing apps from Play store you don't see that .apk file, but when you develop your own app, you can see it and you can as well install it on your device via `adb shell`.


>[!NOTE]
>The best option to run scripts on your device to automate some actions, is using bash. You can as well use Python but if you are performing something with `adb` you will have to wait for the command to be executed


#### Bluetooth HCI Snoop Log

`Bluetooth HCI Snoop Log` -> is a feature that allows the developers to log traffic sent via bluetooth.

For example:
> If you device is connected to an IOT device, then they connect via BLE and since the traffic is now radio waves we cannot sniff it, but thankful to Bluetooth Snoop Log we can log the traffic and analyze it.

`adb bugreport <file_name>` -> is used to search the log file generated by Bluetooth Low Energy because its location differs based on manufacturer, version and so on. So you can use `bugreport` command to look for it.

This command connects to our device, create the  report and automatically fetching it on our host system.

**Bluetooth Low Energy (BLE)** -> is a radio protocol that devices can communicate via it. (Iot devices)

These are radio waves so we cannot sniff the traffic as normal web traffic, so to be able to analyze the BLE traffic we need to enable Bluetooth HCI Snoop Log to log the traffic for us.

Why BLE?
> Because it is around us and often IOT devices uses it as well and since IOT devices might have as well mobile applications, so finding vulnerabilities in those mobile applications can be exploited via BLE.

##### Bluetooth Low Energy (BLE)

###### **What is BLE**

**BLE** stands for **Bluetooth Low Energy**, a **wireless communication protocol** designed for short-range, low-power communication between devices.
###### **BLE Structure**

Bluetooth Low Energy (BLE) communication is based on a **client-server model**:
- The **server** is typically a BLE-enabled device (e.g., an IoT device) that **advertises** its presence.
- The **client** (e.g., a smartphone) scans for these advertisements and initiates a connection.

###### **BLE Advertisement Channels**

BLE advertisement occurs over **three dedicated channels**: **37, 38, and 39**.
These channels are used by the server to broadcast its availability, and by the client to scan for nearby devices.
###### ⚠️ **The Sniffing Problem**

When using an **external sniffer** (e.g., Ubertooth), capturing BLE traffic can be unreliable due to how advertisements work:
- If the **server** is broadcasting on **channel 37**, but your sniffer is only listening on **channel 38**, you'll **miss the advertisement**.
- This mismatch between advertising and scanning channels means **incomplete or no data is captured**.

###### ✅ **The Solution**

To effectively **capture BLE traffic** using an external device like **Ubertooth**, you must:
- **Monitor all 3 advertisement channels (37, 38, and 39)** simultaneously or in rapid rotation.
- This ensures that you don't miss packets due to channel mismatch between the server and client.
>[!Note]
>BLE is using 40 channels, 3 of them are for advertisement and the 37 channels left are for data transfer.


###### **How BLE Communicates**
In a nutshell: 
1. The server (toothbrush in our case) advertises itself and says "I am here!"
2. The smartphone scans for the serve and establishes a connection
3. Once the connection is established: 
	1. The smartphone asks for GATT (Generic Attribute Profile) that represents what services the server provides/offers.
		1. GATT strucuture:
			1. Profile -> represents information about the server
			2. Service -> A group of related data and can have many characteristics
			3. Characteristics -> set of data related to a service (e.g., brush time, brush mode, etc)
	2. After the server responds with the GATT, the client requests a specific characteristic by providing its UUID
	3. UUID has permission (e.g., read, write and notify) that tells the client what actions they can perform for each characteristic.
![[Pasted image 20250721230516.png]]

###### **Possible Exploits**

1. We can impersonate our device (toothbrush in our case) and send arbitrary data to the smartphone application
2. Pair with the device (toothbrush in our case) and and send arbitrary data to the device

Therefore, we have to analyze both endpoints regarding vulnerabilities and exploits.

##### **Sending Crafted Packets via BLE**

**nRF Connect** for Mobile -> is a **Bluetooth Low Energy (BLE) scanner and debugging app** developed by **Nordic Semiconductor**. 

It allows you to:
- **Scan** for BLE devices
- **Connect** to BLE devices
- **Explore GATT services and characteristics**
- **Read, write, or subscribe** to BLE characteristics
- Monitor **advertisements**, **RSSI**, and **device metadata**

>[!NOTE] nRF Connect is a powerful tool for **Bluetooth hacking** and **BLE security testing**, especially in **IoT penetration testing**.



#### Android Debug Bridge (ADB)

**ADB Command line Tool** consists of 3 components:
1. `adb server` (running on localhost:5037)
2. `adbd` (adb daemon) (service running on real device)
3. `adb binary` (adb client) 

**ADB Connection Explaination**
![[Pasted image 20250723081928.png]]
When `adb shell` command is triggered, it makes a connection to the `adb server` and send the command to be executed (e.g., `shell`). The `adb server` sends the the command to the Android device to be executed, after it gets executed, the response is sent back to the server and the serve then sends it back to the `adb client` which afterwards gets displayed on the terminal.

>[!Note]
>ADB can have one or multiple connections (e.g., connect to real device or Emulator/VM)

**Types of Connections**
![[Pasted image 20250723091306.png]]

##### Use Cases

1- **Port Forwarding**

If you want a port on your device to be accessible on your laptop (VM), you can do this by leveraging port forwarding.
**It works by redirecting incoming network traffic from a public IP address and port to a different IP address and port on a private network.**

`adb forward tcp:<public_port> tcp:<private_port>`
`adb forward tcp:1337 tcp:31415` (port 1: host port / port 2: mobile service/app port)

2- Reverse Port Forwarding

If you want a service/port on your local machine (laptop) to be accessible to your smartphone, you can do this by reversing the connection.

**It works by redirecting network traffic from a port on your smartphone (public IP address and port) to a different IP address and port on a private network (in our case, local machine)**

`adb reverse tcp:<public_port> tcp:<private_port>` (in the reverse order) (port 1: mobile port (port which we will forward the traffic on)/ port 2 : host serive/app port)
`adb forward tcp:1234 tcp:8000` 


##### Additional Notes

When you allow `USB Debugging` on your smartphone, the information is kept on both your smartphone and also on your laptop. It is hidden in a `.android` directory which contains 2 important files `adbkey` and `adbkey.pub` which are the public and private keys of your adb connection.

The private key should be kept private as if anyone ===within the same network== or has a ==USB cable== can access/connect to your device.

>[!Note]
>The only two directories that are public (don't need permissions to perform actions (e.g., read, write)) are `/sdcard` and `/temp`.
>`/sdcard` -> is the internal storage of your smartphone and not a physical SD card.
>`/sdcard` is an EMC which stands for Embedded Multimedia Card which is a chip that acts like an SD card.
>

Always enable `logcat` to log your activity while investigating an application because it is super handy and you can find useful info in the logs such as tokens, credentials, etc.

`adb root` -> can be used to run the `adbd` with root privileges and it makes things a lot easier.

# Section 2: App Structure 

## Filestructure of APK
==The reason why app structure is important is that when we reverse engineer its files we can identify which ones are interesting and which are not.==

`.apk` file is simply a `zip archive`.
![[Pasted image 20250728204152.png]]

In order to install `./apk` file, we would do the following:
1. Install app from Play Store.
2. Connect device to our laptop
3. Run `pm path <apk>` to get the location of the apk file and then pull it
![[Pasted image 20250728204435.png]]
### Inside .apk archive

`assets` folder => contains  resources and additional files (e.g., certificates)
`lib` directory => contains **shared objects** files.

**What are shared objects  files?**
These are the compiled c/c++ code that developers use inside their applications to write parts of the project and then compile these parts (which are the shared objects) and import those files inside your Java code for better performance.

| Java code compiled into =>      | classes.dex (dalvik executable format) |
| ------------------------------- | -------------------------------------- |
| **C/C++ code compiled into =>** | **libgdx.so**                          |
**Why lib directory is important?**
Because the shared object files are ==processor independent== which means you can identify this app runs on what? for example an emulator (e.g., x86) or on real device (e.g., ARM arch) and so on.

**Shared object files** are important because C/C++ code is harder to reverse-engineer than Java code, so sometimes developers hide info inside these files. Therefore if we managed to reverse-engineer those files we can access those hidden info.

`META-INF` directory -> contains certificates and other files related to signing the application.
`AndroidManifest.xml` file -> is the most important file that contains configs about the app and Android serialize this file and to get the original format you need to use some kind of tool `apk` to deserialize it.

`resources.arsc` -> contains string definition, color definitions and the kind of values defined in your application.

## Dalvik/Dex

| Difference       | Typical Java Applications on PCs/Laptops                                                                                                                                                                                   | Android Java Applications(Dalivk)                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Compilation      | Compiled into `.class` format and packged inside `.jar`.                                                                                                                                                                   | Compiled into Dalvik exec `.dex`  and executed via VM. |
|                  | Java bytecode is compiled by ==JVM==                                                                                                                                                                                       | Java bytecode is compiled via ==Dalvik VM==            |
| Compilation Flow | ![[Pasted image 20250730072314.png]]                                                                                                                                                                                       | ![[Pasted image 20250730073134.png]]                   |
| Resources        | Requires more resources; because JVM interprets at run time or uses JIT (just in time) compilation to translate java bytecode into native CPU instructions (assembly) and this process consumes CPU cycles, RAM and Power. |                                                        |
| Suitability      | x86 Arch (Pcs/Laptops) (continous power supply)                                                                                                                                                                            | ARM arch (smartphones)                                 |


| VM                                                                                                                               | Dalvik VM                                                                                                                                         |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stack-based Architecture                                                                                                         | Register-based Architecture                                                                                                                       |
| A lot of pushing and poping out of stack to execute instructions                                                                 | It uses a **set of virtual registers** to store variables and intermediate results directly.                                                      |
| ==Example== : `a=b+c`; 1. Push b onto stack 2. Push c 3. Pop c and b to add them 4. Push results 5. Pop result and store it in a | ==Example==: `add v0, v1, v2    // v0 = v1 + v2`<br>                                                                                              |
| Causes overhead / suitable for x86 arch                                                                                          | Fewer instructions are needed because data can stay in registers instead of constantly pushing/popping from a stack. Therefore better performace. |

### **What does JVM do?**
Java Virtual Machine loads bytecode (resulted from javac) and verifies it for security and interprets it into native machine code your CPU can understand.

But **Java works differently** because it’s designed to be **platform independent**. Therefore `javac` (java compiler) does not produce machine code directly unlike other programming languages (e.g., C/C++). Instead it compiles it into bytecode( instructions for JVM not CPU) and JVM interprets it into machine code.

### **What is an ODEX file?**

**ODEX (Optimized Dalvik Executable)** is a **pre-optimized version** of a DEX file.
- `.odex` files are created **by the Android system** to speed up the app's startup time.
- These are generated during app installation or by the system’s ahead-of-time (AOT) compiler.
### MultiDexing

The default limit of methods inside `classess.dex` are 65535 but if your application is using more than this limit of methods (caused of using libs, frameworks etc.,) you might end up with multiple `classess.dex` files.

>[!Note]
>When reverse-engineering apk files you need to look at all `classess.dex` files as you don't know where does the important info exists.


## Classes.dex

When reading `classess.dex` files you can use hex editor to identify if the file is comprised, is there any patterns, readable strings and so on.

We can construct the original java code by decompiling `classess.dex` file.

### Tools
1. `ghex`
2. `dexdump` -> preinstalled within Android Sdk and is used to decompile/dissamble bytecode.

## Decompiling

**How to get an APK file from the device?**
![[Pasted image 20250730094219.png]]
>[!Note] 
>- Package name is unique to each application.
>- The reason why getting apk file is important is that when you are handling real targets and download the application from the *Play Store* you do not have direct access to the `.apk` file, so you need to obtain it in order to interact with it.

**How to decompile APK files?**
By using `apktool`.
![[Pasted image 20250730094438.png]]

>[!Note]
>Decompiling is slightly different than unzipping .apk files and decompiling is much more convenient.
>

It is important not to decompile resources files by leveraging `-r` flag within `apktool` as developers use strange chars into these files (including Androidmanifest.xml, resources.arsc,..) and when we decompile these files, the process might fail.

Also it is important to decompile Androidmanifest.xml as we need to modify this file by leveraging `--force-manifest` flag.

Difference between decompiling and unzipping is that decompiling results in single smali file for `classess.dex` and the `Androidmanifest.xml` is decompiled into a nice readable xml structure.

## AndroidManifest.xml

Androidmanifest.xml -> can be used to enable some feature (e.g., debugging).


`android:compileSdkVersionCodename=11` -> developer used compiler settings for android version 11 (which compiled version)-> ==indicates that security features till android version 11 is included.== 

`android:compileSdkVersion=30` -> API level is 30.

`package=""` -> is a unique identifier for each application and if you have an app with a package name similar to another app's package name then you would get an error downloading it. 
- Can be used for phishing.
- Used by attackers to address the application in their scripts, tools ,etc.

 `platformBuildVersionCode` and `platformBuildVersionName` -> indicates that developers have verified that app works on API level defined or Android version defined as well. ==(Not too important)==

Regarding the permissions the application can have you should check `READ_EXTERNAL_STORAGE` permission. Why it is important?

> When an application in installed on the device, it is installed in a protected location `/data/data/<package_name>` directory which means the application is sand-boxed. If the app needs to read or write to  files stored in `/sdcard` (e.g.,  `/Downloads`, `/Music/`, etc.) then the app needs read and write external storage permissions to be able to do this.

The attacker might abuse this communication between the app and the files it fetches/stores and make the application read a malicious file. More on this later on.

**KEY TAKEAWAY** -> check what the application is doing with given permissions.

| `<uses-permission>`                                       | `<permission>`                                                                                                                                                                                              |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| These are predefined permissions the application can have | Theses are the permissions defined by the application itself, so if other apps are interacting with this one, what they are allowed to access. ==Custom permission== (protect something in this applicaton) |

`<queries>` -> If an application wants to exchange data with another app via component such as **Broadcast Receiver**/ Declares what apps or intents the app wants to be aware of.

**Some interesting attributes inside `<application>` tag:**
- `android:allowBackup=true`
- `android:debuggable=true` -> means we can attach to this process, so we can debug the application.
- `android:networkSecurityConfig=@xml/network_security_config` is very important:
	- This feature/attribute allows the application to trust user storage by including it in this file, so gives developers fine-grained control over how their app handles network traffic.
	- We can create our own file, if not included to enable user storage

`<service>` -> is a background task that is resource intensive and it needs to be run in the background because it is not allowed to run in the UI threads because it will be blocked by the application.

`<receiver>` -> is a broadcast receiver (messaging application) which is listening to certain events. ==Prime attack service==
`<provider>` -> which is a content provider to provide application with some data.
	- can have `<path-permission>` where it asks the application of user-info (application's own permission to give access for other apps to read the data)

![[Pasted image 20250807092532.png]]



## App-Permissions

In order for Android system to allow applications to access other application's data, it does the following: 
- Android sandboxes applications, which means App x (where x is 1,2,4, etc) cannot access other applications' data.
- Each application is assigned user (e.g., user  1,  user 2, etc) that represents the application and the permissions they have.
- Users/User IDs are defined in `/etc/permissions/platform.xml`.
- In order for an application to access the data of another application, we need to assign the other application's user to us, so for example:
	 App 1 : user_1  , user_2
     App 2:  user_2
     (Grouping)
     This grouping is defined in `/data/system/packages.xml`, that defines the permissions for each application. 
     ==User ids and groud ids are defined in this file.
- System users are applications that need to be active before system is running (e.g, `adb shell`, camera, bluetooth, etc) and these are defined in a kernel file `android_filesystem_config.sh`.

![[Pasted image 20250809103207.png]]
How to ask for permissions:  via `Android_manifest_file`.

### Custom Permissions

Custom permissions are permissions defined by the application itself to grant access to their data.

How an attacking application can be granted these permissions ? By manually writing it in the application as shown below:
App 2 is the attacking application.
![[Pasted image 20250809104434.png]]
>[!Note] 
>Custom permission in itself is not protecting the application data unless you use the correct protection level.

#### Protection Levels
- Dangerous -> where user is being informed to allow permissions.
- Normal -> user is not being informed (e.g., `Internet` access permissions)
- Signature -> every application which is signed with the same key can access the data,, which means the application needs the private key of the other app to be able to access its data.==(downside: not practical in daily business)==
- SignatureOrSystem

## Activities

Half of the vulnerabilities in Android application relies in **network traffic** and the other half relies in the **4 components** we will discuss.

The 4 components are:
1. Activities
2. Content Providers
3. Broadcast Receivers
4. Services

Activity is simply a screen.

In Android, Activities can be secured with passwords, and this security is tied to the application’s `Context`. Because the `Context` contains the identity and permission scope of the calling app, a malicious application cannot directly access these protected Activities unless it supplies the correct credentials.

### Developer Use Case That Causes Vulnerability

An application is designed with a login flow where the user must enter valid credentials in a **LoginActivity** before accessing other components, such as **UserActivity** and **HomeActivity**.  
One of these components, **CodeActivity**, allows the user to scan a QR code using the device’s camera to interact with the app.

However, **CodeActivity** is mistakenly marked as **exported**, making it directly accessible to other applications without going through the authentication process. If **CodeActivity** can invoke or interact with sensitive components such as **ProfileActivity** (which contains private user data), a malicious application could bypass the login process entirely and gain unauthorized access — resulting in a serious security vulnerability.

#### Where to Look For This Vulnerability

Inside `Android_manifest.xml` file, you have two options:
- Exported defined explicitly 
	- `exported=true`
- Exported defined implicitly
	- `<intent-filter>...</intent-filter>`

All 4 components are affected with this "exported scheme".
## Intents

**Intents** -> are messaging objects that allow us to interact with other components of the same application or of different application.

Two types of intents:
- Implicit -> we don't know the destination of the component.
- Explicit -> we know the destination; either an activity within the same app or an activity within different app

Intent applies to activities, broadcast receivers, and services.

### Intent Sniffing

Intent sniffing occurs with implicit intents, where one application broadcasts data without specifying the exact destination. Since the receiving application is not explicitly defined, a malicious app can intercept these broadcasts and capture the sensitive data being transmitted.

### Intent-filter

Intent filter listens all the time to the system path and filters out events. So it allows us to listen to certain events and ignore the other.

Intent can respond to:
- actions
- categories
- data types

