# Smali
`apk-tool` and `jadx-gui` have different decompilers, therefore, different byte code. </br> The smali syntax result of them are different.
| apk-tool smali| jadx-gui smali|
|---------------|---------------|
| Differentiate between local registers and parameter registers| Both are included under the term register.|

# Patching Smali 
In order to apply some modification to the app on smali level, you need to follow the following steps:
1. Decompile the app using `apktool`
2. Make modification to the code
3. Build the app once again
4. Use `zipalign -v 4 <original_apk> <modified_apk>` to optimize the build
5. Use `apksigner sign --ks mykeystore.jks --ks-pass pass:<keystore_pass> --key-pass pass:<your_pass> <aligned_apk>` to sign the app. </br>
