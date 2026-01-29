# Smali
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
<img width="1772" height="782" alt="image" src="https://github.com/user-attachments/assets/49ec1f6b-1575-4bd4-9418-beee84fc0051" />
## P0
`iget v0, p0, Lcom/apphacking/smaliOne/Player->power;` </br>
We are buffering (this.power) object into a local register because we cannot act on `return this.power`, so we need to put it first in a buffer and then return it. </br>
