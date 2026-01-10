
// Bypass Root Detection
Java.perform(function(){

    /// Get class reference to hook (in our case class 'b')
    var classBRef = Java.use("sg.vantagepoint.a.b");

    /// Disable ecah function in the class; override
    /// function a ; case 1
    classBRef.a.implementation = function(){
        console.log("Bypassed check 1")
        return false;
    }

    classBRef.b.implementation = function(){
        console.log("Bypassed check 2");
        return false;
    }

    classBRef.c.implementation = function(){
        console.log("Bypassed check 3");
        return false;
    }

    // Bypass also debugging checks

    //var classARef = Java.use("sg.vantagepoint.uncrackable2.MainActivity");
    var classARef = Java.use("sg.vantagepoint.a.a")


    // Bypass debug check
    classARef.a.overload('android.content.Context').implementation = function(context){
        console.log("Bypass check 4")
        return false;
    }
})

/**
 * Approach #1
 * The correct string is : "Thanks for all the fish"
 * We were able to find this string when opening the lib in ghidra..
 */



// "0x8e169000"
//var nativeFuncAddress = Process.findModuleByName("libfoo.so").enumerateExports()[0].address;

// 1. Identify the function to hook : get its address. 
var exportedFunctionsArray = Process.findModuleByName("libfoo.so").enumerateExports();

var nativeBarFuncAddress
exportedFunctionsArray.forEach(function(element, index){
    if(element.name.includes("bar"))
    {
        nativeBarFuncAddress = element.address;
        send(nativeBarFuncAddress)
        
    }
})

Interceptor.attach(nativeBarFuncAddress, {

    onEnter:function(args){


        send("Argument number #1 to this function are: "+ args[2])
        

    },
    onLeave:function(ret){
        send("Return values to this function are: " + ret)

    }
})

/**
 * Approach 2: is to hook the function and force it to accept whatever string you pass as correct.
 */

Java.perform(function(){
    var checkFunction = Java.use("sg.vantagepoint.uncrackable2.CodeCheck");
    checkFunction.a.implementation = function(JavaString)
    {
        console.log("inside verify function" + JavaString)
        return true;
    }

})
