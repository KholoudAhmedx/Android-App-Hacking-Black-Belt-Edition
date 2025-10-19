# Section 3: Reverse Engineering

In order to decompile  Android applications we have 2 approaches:
-  `unzip`  -> which results in `classes.dex` file (java bytecode).
- `apktool -d` -> which results in  single smali file.

To reverse  engineer an application we would stick to `unziping` and  use a tool `Dex2Jar` to retrieve the java source code:

<img width="1823" height="995" alt="image" src="https://github.com/user-attachments/assets/0748587c-af2c-4fb6-88d3-f8e22ba71b49" />

