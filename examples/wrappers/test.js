gI = new LibManager({
    libs:{
        "yui2":{
            files : [
            "../../lib/yui2/yahoo.js",
            "../../lib/yui2/dom.js",
            "../../lib/yui2/event.js",
            "../../lib/yui2/connection_core.js",
            "../../lib/yui2/json.js"
            ]
        },
    	"yui3":{
    		files: ["../../../yui/build/yui/yui.js"]
    	}
     },
     fields: ["inputex-string","inputex-url","inputex-email","inputex-select","inputex-checkbox","inputex-radio","inputex-group","inputex-list","inputex-multi","inputex-form"],
     debug: function(m){
         return;
         var pEl = document.getElementById("logs");
         var el = document.createElement("div");
         el.innerHTML = m;
         pEl.appendChild(el);
     },
     callback: function(){
         window.onload = function(){
                     gI.run();  
                     gI.testExamples();                    
              
         };
     }
	});