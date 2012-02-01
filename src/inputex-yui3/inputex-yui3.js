//gI means globalInputEx
if(typeof(gI) === "undefined"){
    var gI = {modules:{}};
}

/*
 *  Differences between inputEx.addModule and YUI.add are :
 *   in GI.addModule :
 *     "inputex-yui3" is implicit
 *     the argument of the module is Y.inputEx and not inputEx (that why we use to write function(I){...} instead of function(Y){...})
 */
(function(){
    
    var gl = (typeof(gI.length) !== "number") ? gI : gI.addLib("yui3",{modules:{}});
    
    
    gl.addModule = function(){
        var modules = [], fnI, fnY, afterModules,args = [];
        for(var i = 0; i < arguments.length; i++){
            //console.log(i,"is requires ?", typeof(arguments[i]),typeof(arguments[i]) === "object" && typeof(arguments[i].requires));
            
            if(typeof(arguments[i]) == "function"){
                fnI = arguments[i];
                args.push(function(Y){
                    //lI means localInputEx
                    fnI(Y.lI);
                });
            } else if(typeof(arguments[i]) === "object" && typeof(arguments[i].requires) === "object") {
                //console.log("in requires");
                arg = {
                    requires : []
                };
                // copy
                for(var j = 0; j < arguments[i].requires.length; j++) arg.requires.push(arguments[i].requires[j])
                arg.requires.push("inputex-yui3")
                args.push(arg);
            } else {
                args.push(arguments[i]);
            }   
        }
        //console.log("yui3",args[0])
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
       Y.lI.insert = function(parent,child,position){
              return Y.one(parent).insert(child,position);
        }
       Y.lI.removeClass = function	(el,className){
           return Y.one(el).removeClass(className);
       }
       Y.lI.replaceClass = function	(el,className1,className2){
           Y.one(el).hasClass(className1);
       }
       Y.lI.setStyle = function	(el,a,b){
           return Y.one(el).setStyle(a,b);
       }
       Y.lI.inDoc = function(el){
           return el && Y.one(el) && Y.one(el).inDoc();
       }
       // Purge element (remove listeners on el and childNodes recursively)
       Y.lI.purgeElement = function(el){
           return Y.Event.purgeElement(el, true);
       }
       Y.lI.hasClass = function(el,className){
           return Y.one(el).hasClass(className);
       }
       Y.lI.augment = Y.augment;
       Y.lI.EventTarget = Y.EventTarget;
       Y.lI.purgeElement = Y.Event.purgeElement;
       Y.lI.mix = Y.mix;
       Y.lI.extend = Y.extend;
       Y.lI.JSON = Y.JSON;
       Y.lI.io = Y.io;
       Y.lI.guid = function(){return Y.guid.call(Y)};
       Y.lI.on = function(){
           var args = arguments,
               fn = args[1];
           args[1] = function(){
                  var e = arguments[0];
                  e.target = e.target._node;
                  fn.apply(this,arguments);
              }
           return Y.on.apply(Y,args)
        };
       Y.lI.all = function(){ var a =[]; Y.all.apply(Y,arguments).each(function(e){a.push(e._node)});return a;};
       Y.lI.error = function(){
           //console.log("InputEx Error : ",arguments);
           throw(arguments);
       }
       Y.lI.copy = function(obj){
           if(typeof(obj) !== "object"){
               return obj;
           }
           if(this.Lang.isArray(obj)){
               return obj.concat();
           }
           var a = {};
           for(var i in obj){
               if(obj.hasOwnProperty(i)){
                   a[i] = this.copy(obj[i]);
               }
           }
           return a;
         };
   
    },"3.0.0",{
        requires: ["yui-base","inputex-yui3-core","io-base","json"]
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