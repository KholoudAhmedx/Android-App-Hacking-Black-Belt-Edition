# Smali
**Smali** -> is the representation of the android bytecode (`.dex`: Dalvik exec format). </br>
`apk-tool` and `jadx-gui` have different decompilers, therefore, different byte code. </br> The smali syntax result of them are different.
| apk-tool smali| jadx-gui smali|
|---------------|---------------|
| Differentiate between local registers and parameter registers| Both are included under the term register.|

## Patching Smali 
In order to apply some modification to the app on smali level, you need to follow the following steps:
1. Decompile the app using `apktool`
2. Make modification to the code
3. Build the app once again
4. Use `zipalign -v 4 <original_apk> <modified_apk>` to optimize the build
5. Use `apksigner sign --ks mykeystore.jks --ks-pass pass:<keystore_pass> --key-pass pass:<your_pass> <aligned_apk>` to sign the app. </br>

## Registers
<img width="1233" height="637" alt="image" src="https://github.com/user-attachments/assets/a8ba1168-67fa-4fd8-b5f1-50b8dff58c30" />

`local registers` can be recycled in code execution --> they can be assigned different values for performance purposes. </br>
`p0` --> special parameter register that holds `this` object. </br>
## Types
Inner classes are dentoe with `$` so the type be `Lcom/apphacking/smaliOne/Player$tenisPlayer`. </br>
<img width="1772" height="782" alt="image" src="https://github.com/user-attachments/assets/49ec1f6b-1575-4bd4-9418-beee84fc0051" />
## P0

`iget v0, p0, Lcom/apphacking/smaliOne/Player->power;` </br>
We are buffering (this.power) object into a local register because we cannot act on `return this.power`, so we need to put it first in a buffer and then return it. </br>

## DalivkOpCodes
DalivOpCodes -> are the instruction set of dalivk. </br>

|                 | Smali               | Assembly       |
| --------------- | ------------------- | -------------- |
| Runs on         | Dalvik / ART (VM)   | CPU (ARM, x86) |
| Level           | **Virtual machine** | **Hardware**   |
| Instruction set | DEX instructions    | CPU opcodes    |

It's important to understand dalivk instructions as it helps in patching smali code. </br>
The better approach to follow when patching smali is to figure out which registers hold which values because this is what really matters. </br>
(Don't just convert smali into java code because you can simply patch the code in java directly.)</br>

## Smali File Structure
<img width="1920" height="1075" alt="image" src="https://github.com/user-attachments/assets/338e3be1-b5b6-4d4f-a537-3c4542e041e6" />

## IF?ELSE
### Patching IF/ELSE/Goto
To patch code in smali: 
1. Logic flipping
2. Deleting code
3. Jumps (`goto`)
**Switch statements** -> is translated into smali code as multiple if conditions. </br>

>[!Note]
>Rooting detection is not a security mechanism to block attackers, it is a security mechanism regarding the client/user to prevent them from accidently running the application on a rooted device.
>Since it is a client mechanism an attacker can bypass it:( </br>

## Objects & Methods
`invoke-direct` -> to invoke constructors. </br>
`invoke-virtual` -> to invoke public methods. </br>

**How to print out strings?** </br>
<img width="605" height="209" alt="image" src="https://github.com/user-attachments/assets/cb06399f-5892-491c-b5a4-ec3e31ccb280" />

>[!Note]
>When patching a large snippet of code, you can write it in java first, build the APK, then reverse engineer it and take that samli part insert it into you app. (This is an easy method to patch large code in smali without making too much mistakes) </br>

## Debugging Android Applications
If an application is not set to `debuggable=true` we can patch it to interact with the app if it is debuggable. </br>

**Debugging on Steriods**
The other method to debug Android apps is by loading smali files on `Android Studio` and install a plugin called `smalidea` to be able to attact break points and get values from memory directly. </br>
