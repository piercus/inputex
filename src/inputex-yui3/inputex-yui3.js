//gIE means globalInputEx
var gIE = {};

/*
 *  Differences between inputEx.addModule and YUI.add are :
 *   in GI.addModule :
 *     "inputex-yui3" is implicit
 *     the argument of the module is Y.inputEx and not inputEx (that why we use to write function(I){...} instead of function(Y){...})
 */

gIE.addModule = function(){
    var modules = [], fnI, fnY, afterModules,args;
    for(var i = 0; i < arguments.length; i++){
        if(typeof(arguments[i]) == "function"){
            fnI = arguments[i];
            args.push(function(Y){
                //lIE means localInputEx
                fnI(Y.lIE);
            });
        } else if(typeof(arguments[i]) === "object" && typeof(arguments[i].requires) === "array") {
            arguments[i].required.push("inputex-yui3");
            args.push("inputex-yui3");
        } else {
            args.push(arguments[i]);
        }   
    }

    YUI.add.apply(args);
};


/*
 *  Differences between inputEx.addModule and YUI.add are :
 *   in inputEx.addModule :
 *     "inputex-yui3" is implicit
 *     the argument of the module is Y.inputEx and not inputEx (that why we use to write function(I){...} instead of function(Y){...})
 */

YUI.add("inputex-yui3", function(Y){
   Y.lIE.error = function(m){
        throw new Error(m);
    }
},"3.0.0",{
    requires: ["yui-base","inputex-yui3-lang","inputex-yui3-core"]
});

YUI.add("inputex-yui3-lang", function(Y){
    //lIE means localInputEx
   Y.lIE.Lang = Y.Lang;
   Y.lIE.UA = Y.UA;
   Y.lIE.each = Y.Array.each;
   Y.lIE.use = Y.use;
   Y.lIE.addClass = function(el,className){
       return Y.one(el).addClass(className);
   }
   Y.lIE.removeClass = function	(el,className){
       return Y.one(this.divEl).removeClass(className);
   }
   Y.lIE.isInDoc = function(el){
       return Y.one(el).inDoc();
   }
   // Purge element (remove listeners on el and childNodes recursively)
   Y.lIE.purgeElement = function(el){
       Y.Event.purgeElement(el, true);
   }
   Y.lIE.hasClass = function(el,className){
       return Y.one(el).hasClass(className);
   }
   Y.lIE.augment = Y.augment;
   Y.lIE.EventTarget = Y.EventTarget;
   
},"3.0.0",{
    requires: ["yui-base","inputex-yui3-core"]
});

YUI.add("inputex-yui3-core", function(Y){
   //lIE means localInputEx
   Y.lIE = {};
},"3.0.0",{
    requires: ["yui-base","inputex-yui3-core"]
});

gIE.use = YUI().use;