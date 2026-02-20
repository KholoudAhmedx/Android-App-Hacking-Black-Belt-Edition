# Section 3: Reverse Engineering

In order to decompile  Android applications we have 2 approaches:
-  `unzip`  -> which results in `classes.dex` file (java bytecode).
- `apktool -d` -> which results in  single smali file.

To reverse  engineer an application we would stick to `unziping` and  use a tool `Dex2Jar` to retrieve the java source code:

<img width="1823" height="995" alt="image" src="https://github.com/user-attachments/assets/0748587c-af2c-4fb6-88d3-f8e22ba71b49" /></b>

> [!Note]
> <a href="https://github.com/DexPatcher/dex2jar">`dex2jar`</a> tool from the original repo does not work for android version 8, so we would use a fork of the original repo to support Android v8 and it also works for the latest version of Android. 

`jadx` cli has the feature of "Mass decompilation". </br>
You can run `jadx` command on multiple apks and have a single output directory that contains all decompiled apps. </br>
<img width="1054" height="281" alt="image" src="https://github.com/user-attachments/assets/704162c7-cf98-4d84-b42e-a8cda19209f7" />

**AndroGuard** -> is a reverse engineering tool that deals perfectly with highly obfuscated code & has a lot of underrated features. </br>
AndroGaurd has 3 interesting features: </br>
1. `analyze` -> has the ability to analyze binaries and dump out all activities, etc.
2. `cg` (call graph) -> returns the hierarchy of methods (method 1 calls method 2 calls method 3 etc)
3. flow graph -> focuses on the flow of a single function (for example if it is using multiple if conditions,
