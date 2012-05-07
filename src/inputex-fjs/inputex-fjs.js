//gI means globalInputEx
if(typeof(gI) === "undefined"){
    var gI = {modules:{}};
}

(function(){
    //var jQ = jQuery;
    var gl = gI;
    gl.modulesKeys = [];
    var capitalize = function(s) {
      return (s.charAt(0).toUpperCase() + s.slice(1));
    };
    gl.addModule = function(){
      
      var modules = [], fnI, fnY, afterModules,args = [null,null,null], requires = [],fjsName;
      for(var i = 0; i < arguments.length; i++){
          var name; 
          if(typeof(arguments[i]) == "function"){
              fnI = arguments[i];
              args[2] = function(r){
                  //lI means localInputEx
                  var key = name.split("-")[1] ? capitalize(name.split("-")[1]) : name;
                  
                  fnI(r.lI);
                  this.exports = r.lI[key];
              };
          } else if(typeof(arguments[i]) === "object" && typeof(arguments[i].requires) === "object") {
              //console.log("in requires");
              requires = [];
              
              // copy
              for(var j = 0; j < arguments[i].requires.length; j++) {
                if(arguments[i].requires[j].split("-")[1]){
                  requires.push("inputex/"+capitalize(arguments[i].requires[j].split("-")[1])); 
                } else {
                  requires.push(arguments[i].requires[j]); 
                }
              }
              requires.push("inputex/fjs->lI");
              requires.push("lang/inputex_fr");
              args[1] = requires;
          } else if(i === 0){
            name = arguments[i];
            if(arguments[i].split("-")[1]){
              fjsName = "inputex/"+capitalize(arguments[i].split("-")[1]); 
            } else {
              fjsName = arguments[i];
            }
            args[0] = fjsName;
          }  
      }
      fjs.define.apply(this,args);
    };

    gl.localInputEx = function(r){
          var jQ = r.jQ;
        //lI means localInputEx
          this.Lang = this.buildLang(r);
          this.UA = this.buildUA();
          this.addClass = function(el,c){
            return jQ(el).addClass(c);
          }
          this.hasClass = function(el,c){
            return jQ(el).hasClass(c);
          }
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
          this.removeClass = function (el,c) {
            return jQ(el).removeClass(c);
          }
          this.replaceClass= function (el,c) {
            return jQ(el).replaceClass(c);
          };
          this.all = function (selector) {
              return jQ(selector);
          };
          this.setStyle = function(el,s1,s2){
            return jQ(el).css(s1,s2);
          };
          this.EventTarget = function(){
            //should initialize an event  
            this.events = [];
          };
          // I.io(uri,{
          //         method:method,
          //         data: postData,
          //         headers: headers,
          //         on : {
          //           success: onSuccess,
          //           failure: onFailure
          //         },
          //         context: this
          //       });
          this.io = function(sUrl,options){
              jQ.ajax({
                method: options.method || "GET",
                success: options.on.success,
                failure: options.on.failure,
                context: options.context,
                url : sUrl,
                data : (options.method === "POST" ? options.data : null )
              });
          }
          this.insert = function(el,c){
            jQ(el).insertBefore(c);
          };
          this.on = function(){
            //console.log( "base on ",arguments)
            var args = arguments;
            if(args[0] == "domready"){
                jQ(window).ready(args[1]);
                return;
            } else if(args[0] === "key"){
              var fn = args[1],
                   el = args[2],
                   type = args[3],
                   scope = args[4];

              var cb = function(e){
                e.halt = function(){
                  //console.log("halt")
                  if(window.event){
                           this.cancelBubble=true;//In IE
                  }else{
                           this.stopPropagation();//in Others
                  }
                  this.preventDefault();
                }
                return fn.call(scope,e);
               }
               if(type === "press"){
                 return jQ(el).keypress(cb);
               } else if(type === "up"){
                 return jQ(el).keyup(cb);
               }
            } else {
               var action = args[0],
                   fn = args[1],
                   el = args[2],
                   scope = args[3];
              var cb = function(e){
                  e.halt = function(){
                      //console.log("halt")
                      if(window.event){
                               this.cancelBubble=true;//In IE
                      }else{
                               this.stopPropagation();//in Others
                      }
                      this.preventDefault()
                  }
                  fn.call(scope,e);
              }

              return jQ(el).on(action, cb);
            } 

          };
          this.extend = function(){
              jQ.extend(arguments[0].prototype,arguments[1].prototype, arguments[2]);

              arguments[0].superclass = jQ.extend(arguments[1].prototype,{ constructor : arguments[1]});
          };

          // to do
          //this.purgeElement = function(){ return evt.purgeElement();};
          
          this.EventTarget.prototype = {
              publish: function(evtName){
              },
              on: function(evtName,fn,scope){
                  //console.log(evtName);
                  var cb = function(type, args, obj){
                      return fn.call(scope,args[0],obj);
                  }
                  this.events || (this.events = {});
                  this.events[evtName] || (this.events[evtName] = []);
                  this.events[evtName].push(cb);
              },
              detach: function(evtName){
                  this.events[evtName] = [];
              },
              fire: function(evtName,options,scope){
                  if(!this.events || !this.events[evtName]){
                    return true;
                  }
                  for(var i = 0; i < this.events[evtName].length ; i++){
                    this.events[evtName][i].call(this,evtName,[options],scope);
                  }
                  return false;
              }
          }
    }
    gl.localInputEx.prototype= {
        buildLang: function(r){
          var jQ = r.jQ;
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
                  return jQ.trim(obj);
              },
              later: function(time,scope,fn){
                setTimeout(function(){
                  fn.call(scope);
                },time)
              }
          } 
        },
        JSON: {
          stringify: function(obj){
             return JSON.stringify(obj);
          },  
        },
        buildUA: function(){
            return true;//YAHOO.env.ua;
        },
        inDoc: function(o){
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
            };
            return obj1;
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
        error: function(){
            //console.log("InputEx Error : ",arguments);
            throw(arguments[0]);            
        }
    };
    gl.indexOf = function(array,el){
        return array.indexOf(el);
    };
    
    fjs.define("inputex/fjs", ["jQuery->jQ"],function(r){
       //lI means localInputEx
       this.exports = new gl.localInputEx(r);
    });
    gl.use = fjs.use;

})();
