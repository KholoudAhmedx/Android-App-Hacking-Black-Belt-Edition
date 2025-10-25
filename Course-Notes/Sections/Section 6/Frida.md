# FRIDA 
## Introduction
### Components (Simplified)
- Smart phone -> runs JVM.
- JVM -> Manages Java Code.
- Client (Laptop) </b>

**FRIDA** Hooks into the JVM and perfom run time manipulation, where it modifies code in memory/at run time.
**FRIDA** consists of two components:
  - FRIDA Server (Gadget) : installed on the smartphone.
  - FRIDA Client : installed on the client (Laptop). </br>
  
And the way these two components communicate with each other is by using JS/Python. 
>[!Note]
> The backend of **FRIDA** is written in JS, so it is better to communicate via JS instead of Python. </br>


