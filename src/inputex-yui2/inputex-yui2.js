

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
    var dom = YAHOO.util.Dom, evt = YAHOO.util.Event, CstEvt = YAHOO.util.CustomEvent;
    var gl = (typeof(gI.length) !== "number") ? gI : (gI.push({modules:[]}) && gI.globals[gI.globals.length-1]);
    
    
    gl.modulesKeys = [];
    gl.addModule = function(){
        var modules = gl.modules,keys = gl.modulesKeys, key, requires, fn;
        for(var i = 0; i < arguments.length; i++){
            if(typeof(arguments[i]) == "function" && typeof(key) === "string"){
                modules[key].fn = arguments[i];
            } else if(typeof(arguments[i]) === "object" && typeof(arguments[i].requires) === "object") {
                modules[key].requires = arguments[i].requires;
            } else if(typeof(arguments[i]) === "string" && i < 2)  {
                if(gl.modulesKeys.indexOf(arguments[i]) !== -1){
                    console.log(arguments[i]+" ever been loaded");
                    return;
                } else {
                    gl.modulesKeys.push(arguments[i]);
                    key = arguments[i];
                    modules[key] = {"name": key};
                }
            }   
        }
    };

    gl.localInputEx = function(){
      
        //lI means localInputEx
          this.Lang = this.buildLang();
          this.UA = this.buildUA();
          this.addClass = dom.addClass;
          this.hasClass = dom.hasClass;
          //this.hasClass
          this.copy = function(obj){
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
          this.removeClass = dom.removeClass;
          this.replaceClass= dom.replaceClass;
          this.EventTarget = function(){
            //should initialize an event  
            this.events = [];
          };
          this.EventTarget.prototype = {
              publish: function(evtName){
                  if(typeof(this.events) === "undefined"){
                      this._initEventTarget();
                  }
                  this.events[evtName] = new CstEvt("evtName");
              },
              on: function(evtName,fn,scope){
                  console.log(evtName);
                  this.events[evtName].subscribe(fn,true,scope);
              },
              _initEventTarget: function(){
                  this.events = [];
              },
              fire: function(evtName,options,scope){
                  this.events[evtName].fire(options,scope);
              }
          }
          // Purge element (remove listeners on el and childNodes recursively)
          //Y.lI.purgeElement = function(el){
            //  Y.Event.purgeElement(el, true);
          //}
    }
    gl.localInputEx.prototype= {
        buildLang: function(){
          return {
              isString: function(obj){
                  return typeof(obj) === "string";
              },
              isFunction: function(obj){
                  return typeof(obj) === "function";              
              },
              isArray: function(obj){
                  return typeof(obj) === "object" && typeof(obj.length) === "number";  
              },
              isUndefined: function(obj){
                  return typeof(obj) === "undefined";
              },
              isNull: function(obj){
                  return obj === null;
              },
              isObject: function(obj){
                  return typeof(obj) === "object";
              },
              isNumber: function(obj){
                  return typeof(obj) === "number";
              },
              trim : function(obj){
                  return YAHOO.lang.trim(obj);
              }
          } 
        },
        buildUA: function(){
            return YAHOO.env.ua;
        },
        isInDoc: function(){
            // from http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
            //
            //Returns true if it is a DOM element    
              return (
                typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
                typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
            );
        },
        mix: function(obj1,obj2){
            for(var i in obj2){
                if(obj2.hasOwnProperty(i)){
                    obj1[i] = obj2[i];
                }
            }
        },
        each: function(array,fn,scope){
            for (var i = 0; i< array.length; i++){
                fn.call(scope,array[i]);
            }
        },
        // the augment function is not really good on YUI2 wrapper, it doesn't work as it should (see how EventTarget works to understand)
        augment: function(object1,object2){
         
            var fnToAdd = object2.prototype;
            for(var i in fnToAdd){
                if(fnToAdd.hasOwnProperty(i)){
                    object1.prototype[i] = fnToAdd[i];
                }
            }
        },
        guid: function(){
            return "inputex-"+Math.random().toString().slice(2);
        },
        all: function(selector){
            var a =[]; 
            if(selector[0] === "."){
                return dom.getElementsByClassName(selector.slice(1));
            } else if(selector[0] === "#") {
                return document.getElementById(selector.slice(1));
            } else if(selector[0]){
                return document.getElementsByTagName(selector);
            }
        
        },
        on: function(){
          //console.log( "base on ",arguments)
          var args = arguments;
          if(args[0] == "domready"){
              evt.onDOMReady(args[1]);
              return;
          } else {
             var action = args[0],
                 fn = args[1],
                 el = args[2],
                 scope = args[3];
            return evt.on( el, action, fn, true, scope);
          } 
      
        },
        extend: function(){
            YAHOO.extend.apply(this,arguments);
        }
    
    };
    gl.indexOf = function(array,el){
        return array.indexOf(el);
    }
    gl.use = function(){
        var args = [];
        var scope = new gl.localInputEx();
        var loaded = [];
        var loadModule = function (moduleName){
            var moduleConf = gl.modules[moduleName], bool;
            if(typeof(moduleConf)=== "undefined"){
                console.log(moduleName+" not loaded");
                return false;
            }
            // if not loaded
            if(gl.indexOf(loaded, moduleName) === -1){
                if(moduleConf.requires){
                    for (var i = 0; i< moduleConf.requires.length; i++){
                        bool = loadModule(moduleConf.requires[i]);                    
                        if(!bool){
                            console.log(moduleConf.requires[i]+" failed then "+moduleName+" failed");
                            return false;
                        }
                    }
                }
            
                moduleConf.fn.call(scope,scope);
                loaded.push(moduleName);
                return true;
            } else{
                return true;
            }
        }
        for(var i = 0; i < arguments.length; i++){
            if(typeof(arguments[i]) == "function"){
                fnI = arguments[i];
                fnI.call(scope,scope);
            } else if(typeof(arguments[i]) == "string") {
            
                if(!gl.modules[arguments[i]]){
                    console.log(arguments[i]+" is not loaded");
                    throw("error : "+arguments[i]+" is not loaded");
                    return;
                } else {
                    loadModule(arguments[i]);
                }
            }   
        }
    };

})();