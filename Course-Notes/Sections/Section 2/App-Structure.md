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
|                  |                                                                                                                                                                                                                            |                                                        |


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


## Links
### Deep Links

If you have a web application opened on your mobile and that application has a link that re-directs you to the corresponding mobile app (corresponding activity on mobile app) ; This is **Deep Link**..

How Deep links are implemented?
- Dev uses `intent-filters` (filter out events) , to listen only to link events and respond with the correponding activities.

Deep Links requires:
- Scheme (e.g., `holiday://`)
- Authority
- Path
If you want to react to a deep link,  you have to define the following in the manifest file:
- Action -> `View` --> to display the activity to the user
- Category:
	- Default -> allows you to respond to implicit events
	- Browsable -> allows the activity to be accessed from the browser
- Scheme 
![[Pasted image 20250920020213.png]]

### What Possibly Could Go Wrong?

If we are sending data along with the deep link such as sending token as a parameter `?token=`, if an attacker have their malicious application on the same device that listens to the deep link event, they can get the token value.
**Look for deep links in mobile app or web apps 

### Web - App Links

Web links -> are deep links for HTTP(s). 
You need to define it in manifest file as before, but you also add `host`.
Every time you interact with this link -> triggers web link event.

On Android versions < 12, when clicking on the link the user is prompted to open the link with either :
 - Mobile app
 - Browser
If the mobile app is not the original -> then your session is stolen.

On Android version 12 or higher, the web link is automatically opened in the browser.

### App Link

We said that we cannot open a link with http(s) scheme on apps on android version 12. But using app links where we define a new element `autoVerify` we  can open the app link via the app because it verifies the host we are getting the link from. (to make sure this is  a site that is allowed to start my activity)
![[Pasted image 20250920023056.png]]
![[Pasted image 20250920023255.png]]
The file `assetlinks.json` is uploaded to the web server that holds the signature of the mobile app. So when we click on the link, the mobile app verifies the host + signature and then the site is allowed to start the activity.

### Summary
![[Pasted image 20250920023813.png]]
## BroadcastReceivers

**Broadcast Receivers** -> android component that listens to events system-wide and broacasts it to applications to react over it.

**Scenario**
- Connect a headphone to the smart phone (event)
- Smartphone receives the event and Broacasts event to all apps (e.g., music app, calc, calender ...)
- Some apps ignore, others react over it via (`onReceive`) to do something (e.g., pause music, lower volume..)

**Events Examples**
- Running Low on battery (sys event)
- Connecting headphone 
- etc.

Note: We can define our own custom Broadcast events.

We have 2 types of **Broadcastevents**:
- Normal Broadcasts (delievered async to all apps)
- Ordered Broadcasts (defined in order)
	- Have some set of priorities defined in Androidmanifest.xml by the developer.
	- Only apps with the highest priority is informed.
	- This app makes the decision whether to forward the event to low priority apps.

**What could possibly go wrong?**
> An attacker can manipulate the priority of his malicious app, and make it higher  than system app. Then makes the decision not to forward it to other apps (Android 4.3).
> For example if it's an sms app then the attacker could steal OTPs, 2FA codes, etc.

==Note:== Often occurs in system apps, but still can occur in custom apps.

**Where do apps define the events to listen for?**
- In Android versions < 8 : events are defined in `Androidmanifest.xml`.
- In Android versions >= 8 : events are defined in the java code directly.


Broadcast receivers can define multiple actions because of manufacturer.
Manufacturer can define their own broadcast events, and if you want app to be compatible to many manufacturers, include them all as shown below:
![[Pasted image 20250927142500.png]]

Some broadcast receivers are protected, and the system does not sent them to all apps because they can contain sensitive info.
So to get the protected broadcast, you need to ask for permission.
![[Pasted image 20250927143933.png]]
+++++++++++++++Till version 8 +++++++++++++++++++++++++++++++++

The new approach is that, broadcast receivers are defined in Java code as shown below:
![[Pasted image 20250927144331.png]]

**Things to take into account in this approach**
- Automated tools are not updated with this approach and they usually looks for broadcast receivers in `Androidmanifest.xml` file which makes these tools miss things.
- Background exe is no longer allowed, because the application should be up and running.

#### **Exploitation**

Triggering broadcast receivers can be done:
- Malicious app
- Via `adb shell`

**What to look for?**
- Sensitive info being stored in those intents that attacker can listenfor. (Note that broadcast events are sent via intents, and we can apply data to these intents)
- Custom permissions defined by the app that attackers can simply claim they have those permissions. (Unless it is proper protected via protection level signature)
- `LocalBroadcastManager` -> is a broadcast event that happens in internal apps. (Skip it because we cannot interact with them from the outside.)
- Have a look in Java code and look for `onReceive()` method.
- Have a look in `Androidmanifest.xml` file. 

We can exchange data within our apps, or with other apps.

## Services

Services are processes that run in the background in order not to block UI threads.
Usually in mobile apps you are handling a lot of stuff at the same time and some of the tasks are time-consuming that might block the running thread.

	**There are two types of services**: 
- ==Start Service== : e.g., playing music, make network request and so on.
- ==Bound Service==: Binds clients to the service. (e.g., Google Maps live location sharing,an Activity binds to a location service to get frequent GPS updates while the screen is open )
![[Pasted image 20250929230750.png]]

To interact with these services, since there are no UI updates, we can interact with them via `Broadcastreceivers()`.

This is until Android Version 8 -> no background execution is allowed.

**Where to look for to find a vulnerability?**
![[Pasted image 20250929234409.png]]
- The service need to be exported & you have the permissions to interact with it.


## Content Providers

**Content Provider** -> provides content (in most cases, database)
Data is stored in a database (e.g., contacts) and users/devlopers do not have direct access to that Database.
Android exposes data indirectly via `Content Providers`.

We can interact with this data via content URI such as `content://com.android.contacts/contacts/2`.
`content://` -> signals Android system that we are dealing with Content Providers.

To interact with Content Provider:
- ADB shell
- Malicious app

In order for your malicious App to interact with Content Provider, the following should happen:
![[Pasted image 20251001013547.png]]
Content Providers are not invoked via `Intents`.

==SQLi== in Content Providers are not that useful here because most of the time developers give database access to users anyways and they separate critical databases and does not provide access to users.

Content providers can be used with **files**. (Huge attack surface while interacting with files)
>[!Note]
>Google Play in 2018 prevents uploading any apps that has Path Traversal vulnerabilities. But other stores haven't yet (e.g., IOT apps, custom stores.) so until now this represents a huge attack surface.

How Content Providers Interact with File?
![[Pasted image 20251001015916.png]]

Database files are stored in `/data/data/<package>/db/<db_file>`.
If you have db file you can access it the following  way:
-  sqlite browser 3
- `sql` command
- Or reverse engineer the file


>[! Note]
>Table names in Content URI can be an aliase for the actual table name.
>Example: `content://com.example/Keys` is an aliase for a table name called `Key`.

SQL injection is not common because developers usually separate databases that contains critical data and don't give access to users.

When providing a path to a database table (e.g., `/Keys)` make sure to provide a regular expression not only checking the name of the table because we can access the content of the table by providing extra characters for example : `content://com.example/Keys//`.


In Android version 11 and higher, there was a huge change regarding privacy and protection.  In order for your malicious  app to interact with another app,  you need to be visible to that app.
(Define in your malicious app)

In order for our malicious app to access a protected content provider(resource) 
we need to do the following:
1. Define the permissions in our manifest file  -> install time
2. Ask for them during runtime.

>[!Note]
>When accessing data from a Cursor Object, make sure it is set back to the beginning to avoid indexing items out of range.


**Summary**
In content provider we can look for  the following:
- SQL Injection
- Path Traversal

**Indications of Path Traversal Vulnerability**
1. Exported Content Provider
2. Unfiltered  URI
3. Open File 

>[!Note]
>Until this moment we are providing PoC locally (we run our malicious app and install the vulnerable app and interact with it on the same smartphone/ virtual emulator). We can provide PoC remotely by sending HTTPs requests as well.

**Flow of InputStream**
![[Pasted image 20251011134224.png]]
Note: ==We keep reading from the input  stream until no data is returned.==

## Signing

### Objectives

- How to sign an application
- Why do we need to sign an application

Assume we have an application on our device and we want to check updates of that app on Google Play. How do we know that the update is that of app we have not of another developer? By signing.

Package name is unique on our device not on  Google Play.

In order to prevent this, a developer sign the application with a private key and in order to update your app, it has to contain the private key as well, so to indicate that both apps are from the same developer. 
If the app's version on Google Play is higher than the app's version on the device, update the app.

**Leakage of private keys**:
- An attacker can update your app and possibly install malware.

**Signing can be used in multiple contexts:**
- Verify the authority of app developer.
- Share data between apps - if two apps are signed with  the same certificate, then they can share data between this connection.

**Signing Process After Modification - Before Android v 11**
![[Pasted image 20251018122614.png]]
(`Jarsigner` is no longer working, because in Android 11 the layout has changed and it cannot handle it anymore.)

**The Newer Approach**
![[Pasted image 20251018123559.png]]
What `zipaline` does, is that it prepares some offsest/bits for the certificate, so to have the cert a the correct place.
=> `zipalign` re-arranges the way files are stored inside the apk file to start at specific memory boundaries (multiples of 4 bytes). 

This helps android read data faster - by adding padding bits to make files start at specific locations in memory. 

### How to Sign an Application
- Generate a key and create a key store to store the certificate.
- Use  `jarsigner` with the `alias_name` you created for the certificate to sign the application
![[Pasted image 20251018130643.png]]
![[Pasted image 20251018130810.png]]

### META-INF Directory

This file contains all signature information.
`.RSA` -> signature itself.
`.SF` -> signature file - hashes of file name + hashes
`.MF` -> Manifest file - hashes of files

Useful to detect tamper or corruption in files.

### BlueBox Master Key Vulnerability

An attacker was able to circumvent the verification process of signing in Android systems in  2013, where he was able to add a new file (holds the same name of an existing one e.g., `classes.dex` ) in the Zip archive and install it on the device.

To be able to add a new file with existing name, you can change its name using `ghex` tool where you change all occurrences to an existing one and last updated one would be installed.

(There may be customer applications that does  the verification process the same way Android system did in 2013)



