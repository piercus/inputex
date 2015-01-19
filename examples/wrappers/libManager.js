var LibManager = function(options){
    this.libs = options.libs || {};
    this.fields = options.fields || [];
    this.examples = {};
    this.modules = {};
    this.length = 1;
    this.debug = options.debug;
    var l2 = 0,
        l3 = this.fields.length;
    for(var i in this.libs) this.libs.hasOwnProperty(i) && l2++;
    
    var that = this;


    var onReadyLibs= this.onReady(l2,function(){
        that.log("libs are ready");


        var onReadyFields = that.onReady(l3,function(){
            that.log("fields are ready");   
            that.addExampleFiles(that.fields,function(){
                      that.addScript("../../src/inputex/lang/inputex_en.js");
                      gI.waitForAddModule("inputex/lang/inputex_en",function(){
                          that.log("inputex/lang/inputex_en is loaded");
                          that.log("callback");
                          options.callback();
                });
            });
        });

        for(i = 0; i< that.fields.length; i++){
            that.addFieldFile(that.fields[i],onReadyFields);
        }   
     },"log on Ready libs");
     
      
    for(var i in this.libs) this.libs.hasOwnProperty(i) && this.addLibFiles(i,onReadyLibs);
};
LibManager.prototype = {
    addModule : function(){
        var args = arguments, that=this;

        var cb = function(){
            for (var i in that.libs) if(that.libs.hasOwnProperty(i)){
              that.libs[i].global && that.libs[i].global.addModule.apply(that,args);  
            } 

            if(that.modules && that.modules[args[0]] && that.modules[args[0]].state == "wait"){        
                that.modules[args[0]].state = "ready";        
                that.modules[args[0]].cb.call(that);
                that.log(args[0],"module file added");
            }
        }
        if(arguments[3] && arguments[3].requires && arguments[3].requires.length > 0 && (requires = arguments[3].requires)){
            var onReady = this.onReady(requires.length,cb)
            for(var f = 0; f < requires.length; f++){       
                this.addFieldFile(requires[f],onReady)
            }        
        } else {
            cb();
        }

    },
    log: function(){

        var a = [];
        for (var i =0; i< arguments.length; i++) {
            a.push(arguments[i]);
        }
        try{
            this.debug&& this.debug(a.join(" ; "));            
        } catch(e){
            console.log(e);
        }
    },
    waitForAddModule: function(fN,cb){
        var mod = (this.modules || (this.modules = {}))
        if(!mod[fN]){
            mod[fN] = { state : "wait", cb : cb};
        } else if(mod[fN].state == "ready") {
            cb();
        }else if(mod[fN].state == "wait"){
            var fnOld = mod[fN].cb , fnNew = cb;
            mod[fN].cb = function(){fnOld();fnNew();}
        }
    },
    onReady : function(l,cb,debugName){
        var c = l;
        var that = this;
        if(c ===0){
            cb();
        } else{
            return function(){
              debugName && that.log(debugName,c.toString(),l)
              !(--c)&&cb();
            }
        }

    },
    addLibFiles : function(i,cb){
          var li = this.libs[i].files,fn=cb;
          li.push("../../src/inputex-"+i+"/inputex-"+i+".js");
 
          this.addScripts(li,cb);
    },
    addScripts: function(list,callback){
        var that=this,
            inc = function(s,cb){
              return function(){
                  that.addScript(s,cb);
              }
          }, fn = callback;
          for(var i = list.length; i--;){
              fn = inc(list[i],fn);
          }
          this.addScript(list[0],fn);
    },
    addScript: function(src,cb){
          if(this.filesLoaded && (this.filesLoaded.indexOf(src) !== -1)){
            cb&&cb();
            return;
          } 
          (this.filesLoaded || (this.filesLoaded = [])).push(src);
          var el = document.createElement("script");
          el.setAttribute("src",src);
          el.onload= function() {
             cb&&cb();
          }
          document.body.appendChild(el);
    },
    addExamples: function(field,exs){
        this.examples[field] = exs;
        
    },
    buildExamples: function(libName,fieldName,parentEl,errCb){
        var g=this.libs[libName].global,
            that=this,
            requires = this.examples[fieldName].requires || [];
        var cb = function(){
            var fns = [];
            for(var j = 0; j < that.examples[fieldName].list.length; j++){
                fns.push(that.buildFieldExample(g,fieldName,parentEl,that.examples[fieldName].list[j],j,libName,requires,that.examples[fieldName].keyObject));
            } 
            console.log("call use", fieldName);
            g.use.apply(that,[
                [fieldName],
                function(I){

                  for(var i = 0; i< fns.length; i++){
                    try{
                       fns[i].call(this,I,errCb);                  
                    } catch(e){
                        errCb(e,i);
                    }
                  }

                }
              ]
            );
        };
        
        var onReady = this.onReady(requires.length,cb,"l140");
        if(requires.length > 0){
            for(var i = 0; i<requires.length; i++){
                this.addFieldFile(requires[i],onReady);          
            }
        } 
        
    },
    /*buildDependenciesEl: function(lib,field){
      var dep = document.findElementById("dependencies");
      dep.innerHTML = "<pre class=\"brush:html\"><script src=\"dependencies.js\"></script></pre>";
    },*/
    addField: function(fieldName,cb){
        var that = this;
        this.addFieldFile(fieldName,function(){
            that.addExampleFiles([fieldName],function(){
                cb && cb();
            });
        });
    },
    buildFieldExample: function(g,fName,parentEl,ex,j,libName,requires,keyObject){
        var id = "container"+(j+1)+"-"+fName+"-"+libName,
            id2 = id+"-code",
            el = document.createElement("div"),
            seeCode = document.createElement("div"),
            exDiv = document.createElement("div"),
            title = document.createElement("h2"),
            desc = document.createElement("div"),
            that = this,
            f = ex.fn || this.buildFnForExample(ex,keyObject);
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
            var fnCache = f;
            var idCache = id2;
            var idCacheCont = id;
            var fieldName =fName;
            seeCode.onclick = function(){
                var co = document.getElementById(idCache);
                if(!co){
                    var co = document.createElement('div');
                    e.appendChild(co);
                    co.setAttribute("id",idCache);
                    r = /function ?\(parentEl,I\){((.|\n)*)}$/
                    var libs = requires.length ? ",\""+requires.join("\",\"")+"\"" : "";
                    co.innerHTML = "<pre class=\"brush:js\">gI.use(\"lang/inputex_en\",\""+fieldName+"\""+libs+",function(I){\n\t\tvar parentEl = \""+idCacheCont+"\";"+fnCache.toString().match(r)[1]+"});</pre>";
                    co.style.display = "block   ";
                } else if(co.style.display === "block"){
                    co.style.display = "none";
                } else{
                    co.style.display = "block";
                }
                SyntaxHighlighter.highlight();
            };
            
            el.setAttribute("id",idCacheCont);
            (parentEl || document.body).appendChild(e);
        })();
        return function(I,errCb){
          f.call(I,id,I,errCb);
        }
    },    
    buildFnForExample: function(ex,keyObj,test){
        return function(parentEl,I,errCb){
            var field = new I[keyObj](I.mix({
                parentEl:parentEl
            },ex.config));
            ex.test&&ex.test(I,field,errCb);
            if(!I.inDoc(field.divEl)){
                errCb("not created");
            }
        }
    },
    testExamples: function(){
      var el = document.createElement("div"),g;
      document.body.appendChild(el);
      var t = document.createElement("table"),tr,td;
      tr = document.createElement("tr");
      tr.appendChild(document.createElement("td"));
      for(var f=0; f < this.fields.length; f++) {
           td = document.createElement("td");
           td.innerHTML = this.fields[f];
           tr.appendChild(td);
      }
       t.appendChild(tr);
       
      for(var i in this.libs) if(this.libs.hasOwnProperty(i)){
          tr = document.createElement("tr");
          td = document.createElement("td");
          td.innerHTML = i;
          tr.appendChild(td);

          for(var f=0; f < this.fields.length; f++){
              var fi = this.fields[f],res = "ok";
              td = document.createElement("td");
              var errCb = function(e,ex){
                 td.innerHTML = td.innerHTML+ "error on "+ex+" : "+e.toString()+"<br/><a href='examples.php?librairy="+i+"&field="+fi+"'>debug</a>";
              }
              try{
                  this.buildExamples(i,fi,el,errCb);
                  el.innerHTML = "";
              } catch(e){
                  errCb(e);
              }
              td.innerHTML = res;
              tr.appendChild(td);
          }
          t.appendChild(tr);
      }
      document.body.appendChild(t);
    },
    addExampleFiles: function(fields,cb){
        var onReady = this.onReady(fields.length,cb);
        
        for(var i = 0; i<fields.length; i++){
            if(this.filesExamples && (this.filesExamples.indexOf(fields[i]) !== -1)){
                onReady();
            } else {
              (this.filesExamples || (this.filesExamples = [])).push(fields[i]);
              this.addScript("../../src/"+fields[i]+"/"+fields[i]+"-examples.js",onReady);
            } 
        }
    },
    addFieldFile : function(fieldName,cb){
          //var onReady = this.onReady(,,this),
          file = "../../src/"+fieldName+"/"+fieldName+".js";
          this.addScript(file);
          gI.waitForAddModule(fieldName,cb);
          
    },
    addLib : function(libName,g){
        return (this.libs[libName].global = g);
    },
    run : function(){
        var fields = [],that=this;
        for(var f = 0; f< this.fields.length; f++) {
            fields.push(this.fields[f]);
         }
        for (var i in this.libs) this.libs.hasOwnProperty(i) && this.libs[i].global && this.libs[i].global.use.apply(this,[fields]);//.concat(["inputex/lang/inputex_en"]));
    }
    
};
