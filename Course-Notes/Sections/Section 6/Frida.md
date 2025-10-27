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


