// global is wanted
gI = new LibManager({
    libs:{
        /*"yui2":{
            files : [
            "../../lib/yui2/yahoo.js",
            "../../lib/yui2/dom.js",
            "../../lib/yui2/event.js",
            "../../lib/yui2/connection_core.js",
            "../../lib/yui2/json.js"
            ]
        },*//*
    	"yui3":{
    		files: ["http://yui.yahooapis.com/3.18.1/build/yui/yui-min.js"]
    	},*/
        "requirejs" : {
            files: ["../../lib/require.js"]
        }
     },
     callback: function(){
         window.onload = function(){
                     gI.run();  
                     var el1 = document.getElementById("librairy"),
                         el2 = document.getElementById("field"),lib,field,
                         parentEl = document.getElementById("examples");
                         lib = el1[el1.value] &&el1[el1.value].label;
                         field = el2[el2.value] &&el2[el2.value].label;
                         build = function(lib,field){
                             if(lib && field){
                                 gI.addField(field,function(){
                                     parentEl.innerHTML="";
                                     gI.buildExamples(lib,field,parentEl,function(e,i){
                                         console.log("example "+i+" failed !",e.stack);
                                         
                                     });
                                 })
                             }
                         };
                     
                     build(lib,field);
                     el1.onchange= function(){
                         if(this.selectedIndex){
                            lib = this[this.value].label;
                            build(lib,field)
                         }
                     }
                     el2.onchange= function(){
                         if(this.selectedIndex){
                             field = this[this.value].label;
                             build(lib,field);
                         }
                      }  
              
         };
     },
     debug : function(o){
       console.log(o);
     }
	});
