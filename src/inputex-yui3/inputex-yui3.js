//gI means globalInputEx
if(typeof(gI) === "undefined"){
    var gI = {modules:[]};
}

/*
 *  Differences between inputEx.addModule and YUI.add are :
 *   in GI.addModule :
 *     "inputex-yui3" is implicit
 *     the argument of the module is Y.inputEx and not inputEx (that why we use to write function(I){...} instead of function(Y){...})
 */
(function(){
    
    var gl = (typeof(gI.length) !== "number") ? gI : (gI.push({modules:[]}) && gI.globals[gI.globals.length-1]);
    
    
    gl.addModule = function(){
        var modules = [], fnI, fnY, afterModules,args = [];
        for(var i = 0; i < arguments.length; i++){
            if(typeof(arguments[i]) == "function"){
                fnI = arguments[i];
                args.push(function(Y){
                    //lI means localInputEx
                    fnI(Y.lI);
                });
            } else if(typeof(arguments[i]) === "object" && typeof(arguments[i].requires) === "array") {
                arguments[i].required.push("inputex-yui3");
                args.push("inputex-yui3");
            } else {
                args.push(arguments[i]);
            }   
        }

        YUI.add.apply(this,args);
    };


    /*
     *  Differences between inputEx.addModule and YUI.add are :
     *   in inputEx.addModule :
     *     "inputex-yui3" is implicit
     *     the argument of the module is Y.inputEx and not inputEx (that why we use to write function(I){...} instead of function(Y){...})
     */

    YUI.add("inputex-yui3", function(Y){
       Y.lI.error = function(m){
            throw new Error(m);
        }
    },"3.0.0",{
        requires: ["yui-base","node","inputex-yui3-lang","inputex-yui3-core"]
    });

    YUI.add("inputex-yui3-lang", function(Y){
        //lI means localInputEx
       Y.lI = {};
       Y.lI.Lang = Y.Lang;
       Y.lI.UA = Y.UA;
       Y.lI.each = Y.Array.each;
       Y.lI.use = Y.use;
       Y.lI.addClass = function(el,className){
           return Y.one(el).addClass(className);
       }
       Y.lI.removeClass = function	(el,className){
           return Y.one(el).removeClass(className);
       }
       Y.lI.isInDoc = function(el){
           return Y.one(el).inDoc();
       }
       // Purge element (remove listeners on el and childNodes recursively)
       Y.lI.purgeElement = function(el){
           Y.Event.purgeElement(el, true);
       }
       Y.lI.hasClass = function(el,className){
           return Y.one(el).hasClass(className);
       }
       Y.lI.augment = Y.augment;
       Y.lI.EventTarget = Y.EventTarget;
       Y.lI.mix = Y.mix;
       Y.lI.extend = Y.extend;
       Y.lI.guid = function(){return Y.guid.call(Y)};
       Y.lI.on = function(){return Y.on.apply(Y,arguments)};
       Y.lI.all = function(){ var a =[]; Y.all.apply(Y,arguments).each(function(e){a.push(e._node)});return a;};
   
    },"3.0.0",{
        requires: ["yui-base","inputex-yui3-core"]
    });

    YUI.add("inputex-yui3-core", function(Y){
       //lI means localInputEx
       Y.g = {};
    },"3.0.0",{
        requires: ["yui-base","inputex-yui3-core"]
    });

    gl.use = function(){
        var y= YUI();
        var args =[];
        for(var i = 0; i < arguments.length; i++){
            if(typeof(arguments[i]) == "function"){
                fnI = arguments[i];
                args.push(function(Y){
                    //lI means localInputEx
                    fnI(Y.lI);
                });
            } else {
                args.push(arguments[i]);
            }   
        }
        y.use.apply(y,args);
    };
})();