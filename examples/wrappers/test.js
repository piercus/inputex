var LibManager = function(options){
    this.libs = options.libs || {};
    this.fields = options.fields || {};
    this.globals = [];
    this.examples = {};
    this.length = 1;
    var l2 = 2+this.fields.length;
    var that = this;
    
    var onReady= this.onReady(l2,function(){
        that.addExampleFiles(that.fields,function(){
            options.callback();
        });
    },this);
      
    for(var i in this.libs) this.libs.hasOwnProperty(i) && this.addLibFiles(i,onReady); 
    for(i = 0; i< this.fields.length; i++){
        this.addFieldFiles(this.fields[i],onReady);
    }   
};
LibManager.prototype = {
    addModule : function(){
        var args = arguments, that=this;
        var cb = function(){
            for (var i =0; i < that.globals.length; i++)  that.globals[i].addModule.apply(that,args);
        }
        if(arguments[3] && (requires = arguments[3].requires)){

            for(var f = 0; f < requires.length; f++){       
                this.addFieldFiles(requires[f],this.onReady(requires.length,cb))
            }        
        } else {
            cb();
        }

    },
    onReady : function(l,cb,scope){
        return function(l){
          !(--l)&&cb(scope);
        }
    },
    addLibFiles : function(i,cb){
        console.log(i);
          var li = this.libs[i].files;
          li.push("../../src/inputex-"+i+"/inputex-"+i+".js");
          var el,l = li.length,l2=l,scope = this;
          
          var onReady = this.onReady(l2,function(){
              cb();
            },this);
          

          for(var i = 0; i < l; i++){
              this.addScript(li[i],onReady)
          }
    },
    addScript: function(src,cb){
          var el = document.createElement("script");
          el.setAttribute("src",src);
          el.onload= function() {
             cb();
          }
          document.body.appendChild(el);
    },
    addExamples: function(field,exs){
        this.examples[field] = exs;
    },
    buildExamples: function(g){
        var n = 0,that=this;        
        for(var i in this.examples) if(this.examples.hasOwnProperty(i)) {
                
                for(var j = 0; j < this.examples[i].list.length; j++){
                    
                }  
        }
    },
    buildFieldExamples: function(global,fieldName,parentEl){
        for(var j = 0; j < this.examples[fieldName].list.length; j++){
            this.buildFieldExample(global,fieldName,parentEl,this.examples[fieldName].list[j],j);
        }
    },
    buildFieldExample: function(g,fName,parentEl,ex,j){
        var id = "container"+(j+1)+"-"+fName,
            id2 = id+"-code",
            el = document.createElement("div"),
            seeCode = document.createElement("div"),
            exDiv = document.createElement("div"),
            title = document.createElement("h2"),
            desc = document.createElement("div");
        seeCode.setAttribute("class","inputEx-seeCode");
        desc.innerHTML = ex.description;
        seeCode.innerHTML = "see Code";
        exDiv.setAttribute("class","exampleDiv");
        el.setAttribute("class",'demoContainer');

        
        title.innerHTML = ex.title;
        
        exDiv.appendChild(title);
        exDiv.appendChild(desc);
        exDiv.appendChild(seeCode);
        exDiv.appendChild(el);
        
        (function(){
            var e = exDiv;
            var fnCache = ex.fn;
            var idCache = id2;
            var idCacheCont = id;
            var fieldName =fName;
            seeCode.onclick = function(){
                var co = document.getElementById(idCache);
                if(!co){
                    var co = document.createElement('div');
                    e.appendChild(co);
                    co.setAttribute("id",idCache);
                }
                r = /function ?\(parentEl,I\){((.|\n)*)}$/
                co.innerHTML = "<pre class=\"brush:js\">gI.use(\"lang/inputex_fr\",\""+fieldName+"\",function(I){\n\t\tvar parentEl = \""+idCacheCont+"\";"+fnCache.toString().match(r)[1]+"});</pre>";
            };
        })();
        
        el.setAttribute("id",id);
        (parentEl || document.body).appendChild(exDiv);
        g.use.apply(this,this.fields.concat(["lang/inputex_fr",function(I){
            ex.fn.call(this,id,I)
        }]));
        
    },    
    testExamples: function(){
      var el = document.createElement("div");
      document.body.appendChild(el);
      var t = document.createElement("table"),tr,td;
      tr = document.createElement("th");
      tr.appendChild(document.createElement("td"));
      for(var f=0; f < this.fields.length; f++) {
           td = document.createElement("td");
           td.innerHTML = this.fields[f];
           tr.appendChild(td);
      }
       t.appendChild(tr);
      for(var g=0; g < this.globals.length; g++){
          var gl = this.globals[g];
          tr = document.createElement("tr");
          td = document.createElement("td");
          td.innerHTML = g;
          tr.appendChild(td);
          for(var f=0; f < this.fields.length; f++){
              var fi = this.fields[f],res = "ok";
              try{
                  this.buildFieldExamples(gl,fi,el);
                  el.innerHTML = "";
              } catch(e){
                  res="not ok : "+ e.stack;
              }
              td = document.createElement("td");
              td.innerHTML = res;
              tr.appendChild(td);
          }
          t.appendChild(tr);
      }
      document.body.appendChild(t);
    },
    addExampleFiles: function(fields,cb){
        var onReady = this.onReady(fields.length,cb,this);
        for(var i = 0; i<fields.length; i++){
            this.addScript("../../src/"+fields[i]+"/"+fields[i]+"-examples.js",onReady);
        }
    },
    addFieldFiles : function(fieldName,cb){
          if(this.filesLoaded && (this.filesLoaded.indexOf(fieldName) !== -1)){
              cb();
              return;
          } 
          (this.filesLoaded || (this.filesLoaded = [])).push(fieldName);
          var li = [],el,l2=1,scope = this;

          var onReady = this.onReady(l2,cb,this);
          
          li.push("../../src/"+fieldName+"/"+fieldName+".js");
          var l = li.length;
          for(var i = 0; i < l; i++){
              this.addScript(li[i],onReady)
          }
    },
    push : function(g){
        console.log("push");
        return this.globals.push(g);
    },
    run : function(){
        var fields = [],that=this;
        for(var f = 0; f< this.fields.length; f++) {
            fields.push(this.fields[f]);
         }
        for(var n =0; n < this.globals.length; n++) {
           this.globals[n].use.apply(this,["lang/inputex_fr"].concat(fields));
        } 
    }
    
};

var gI = new LibManager({
    libs:{
	    "yui2":{
    		files : [
    		"../../lib/yui2/yahoo.js",
    		"../../lib/yui2/dom.js",
    		"../../lib/yui2/event.js",
    		"../../src/inputex/lang/inputex_fr.js"
    		]
    	},
    	"yui3":{
    		files: ["../../../yui/build/yui/yui.js"]
    	}
     },
     fields: ["inputex-string","inputex-email","inputex-url"],
     callback: function(){
         window.onload = function(){
             setTimeout(function(){
                 gI.run();  
                 //gI.buildExamples(gI.globals[0]);  
                 gI.testExamples();               
             },2000);
         };
     }
	});