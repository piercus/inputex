YUI.add("inputex-jsontreeinspector",function(Y) {

   var lang = Y.Lang;
   var inputEx = Y.inputEx;

/**
 * Create a treeview to inspect a javascript object
 * @class inputEx.widget.JsonTreeInspector
 * @constructor
 * @param {String|HTMLElement} parentEl where to append the tree
 * @param {Object} object the object to inspect
 * @param {String} jsonPath JSON Path string (optional) (http://code.google.com/p/jsonpath/wiki/Javascript)
 */
inputEx.widget.JsonTreeInspector = function(parentEl, object, jsonPath) {

   /**
    * Hash to contain the values indexed by li ids
    */
   this.hash = {};
   
   /**
    * Main div element
    */
   this.el = inputEx.cn('div');
   
   this.buildBranch( lang.isString(jsonPath) ? inputEx.widget.JsonTreeInspector.jsonPath(object,jsonPath) : object, Y.one(this.el));
   
   (lang.isString(parentEl) ? Y.one("#"+parentEl)._node : parentEl).appendChild(this.el);
};

inputEx.widget.JsonTreeInspector.prototype = {
   
   /**
    * Destroy the widget
    */
   destroy: function() {
      
      // Remove from DOM
      if(Y.one(this.el).inDoc()) {
         this.el.parentNode.removeChild(this.el);
      }
      
      // recursively purge element
      Y.Event.purgeElement(this.el,true);
   },
   
   /**
    * Build the sub-branch for obj
    */
   buildBranch: function(obj,yParentEl) {
      
      var ul = inputEx.cn('ul', {className: 'inputEx-JsonTreeInspector'});
      
      for(var key in obj) {
         if(obj.hasOwnProperty(key)) {
            var value = obj[key];
            
            var id = Y.guid();
            var li = inputEx.cn('li', {id: id}, null, key+':');
            this.hash[id] = {value: value, expanded: false};
            
            
            if( lang.isObject(value) || lang.isArray(value) ) {
               if(lang.isArray(value)) {
                  li.appendChild( inputEx.cn('span', null, null, "[ "+value.length+" element"+(value.length > 1 ? 's':'')+"]" ) );
               }
               var yLi = Y.one(li)
               yLi.addClass('collapsed')
               yLi.on('click',this.onItemClick, this)
            }
            else {
               var spanContent = '';
               if( lang.isString(value) ) {
                  spanContent = '"'+inputEx.htmlEntities(value)+'"';
               }
               else {
                  if(value === null) {
                     spanContent = "null";
                  } else if (typeof(value) === "undefined"){
                      spanContent = "undefined";
                  } else {
                     spanContent = value.toString();
                  }
               }
               li.appendChild( inputEx.cn('span', {className: 'type-'+(value === null ? "null" : (typeof value))}, null, spanContent ) );
            }
            
            
            ul.appendChild(li);
         }
      }
      
      yParentEl.append(ul);
      
      return ul;
   },
   
   
   /**
    * When the user click on a node
    */
   onItemClick: function(e, params) {
      e.halt();
      var tgt = e.target;
      
      if( tgt.hasClass('expanded') || tgt.hasClass('collapsed') ) {
         this.expandElement(tgt);
      }
   },
   
   
   /**
    * expand the node given the li element
    */
   expandElement: function(yLi) {
      
      var isExpanded = yLi.hasClass('expanded');
      yLi.replaceClass(isExpanded ? 'expanded' : 'collapsed' , isExpanded ? 'collapsed':'expanded')

      var h = this.hash[yLi.get("id")];

      if(isExpanded) {
         // hide the sub-branch
         h.expanded.style.display = 'none';
      }
      else {
         if(h.expanded === false) {
            // generate the sub-branch
            h.expanded = this.buildBranch(h.value, yLi);
         }
         // show the sub-branch
         h.expanded.style.display = '';
      }
   },
   
   /**
    * Expand a branch given a li element
    * @param {HTMLElement} li 
    * @param {Integer} maxLevel
    */
   expandBranch: function(yLi,maxLevel) {
      this.expandElement(li);
      var sub = yLi.one("ul").get("children");
      for(var j = 0 ; j < sub.length ; j++) {
         var s = sub[j];
         if(s.hasClass("collapsed") && maxLevel != 0) {
            this.expandBranch(s,maxLevel-1);
         }
      }
   },
   
   /**
    * Expand the root node
    * @param {Integer} maxLevel
    */
   expandAll: function(maxLevel) {
      var ul = this.el.childNodes[0];
      var liEls = ul.childNodes;
      for(var i = 0 ; i < liEls.length ; i++) {
         var li = liEls[i];
         this.expandBranch(Y.one(li),maxLevel);
      }
   }
   
};

/**
 * JSONPath 0.8.0 - XPath for JSON
 * http://code.google.com/p/jsonpath/
 * http://code.google.com/p/jsonpath/wiki/Javascript
 *
 * Copyright (c) 2007 Stefan Goessner (goessner.net)
 * Licensed under the MIT (MIT-LICENSE.txt) licence.
 */
inputEx.widget.JsonTreeInspector.jsonPath = function (obj, expr, arg) {
   var P = {
      resultType: arg && arg.resultType || "VALUE",
      result: [],
      normalize: function(expr) {
         var subx = [];
         return expr.replace(/[\['](\??\(.*?\))[\]']/g, function($0,$1){return "[#"+(subx.push($1)-1)+"]";})
                    .replace(/'?\.'?|\['?/g, ";")
                    .replace(/;;;|;;/g, ";..;")
                    .replace(/;$|'?\]|'$/g, "")
                    .replace(/#([0-9]+)/g, function($0,$1){return subx[$1];});
      },
      asPath: function(path) {
         var x = path.split(";"), p = "$";
         for (var i=1,n=x.length; i<n; i++)
            p += /^[0-9*]+$/.test(x[i]) ? ("["+x[i]+"]") : ("['"+x[i]+"']");
         return p;
      },
      store: function(p, v) {
         if (p) P.result[P.result.length] = P.resultType == "PATH" ? P.asPath(p) : v;
         return !!p;
      },
      trace: function(expr, val, path) {
         if (expr) {
            var x = expr.split(";"), loc = x.shift();
            x = x.join(";");
            if (val && val.hasOwnProperty(loc))
               P.trace(x, val[loc], path + ";" + loc);
            else if (loc === "*")
               P.walk(loc, x, val, path, function(m,l,x,v,p) { P.trace(m+";"+x,v,p); });
            else if (loc === "..") {
               P.trace(x, val, path);
               P.walk(loc, x, val, path, function(m,l,x,v,p) { typeof v[m] === "object" && P.trace("..;"+x,v[m],p+";"+m); });
            }
            else if (/,/.test(loc)) { // [name1,name2,...]
               for (var s=loc.split(/'?,'?/),i=0,n=s.length; i<n; i++)
                  P.trace(s[i]+";"+x, val, path);
            }
            else if (/^\(.*?\)$/.test(loc)) // [(expr)]
               P.trace(P.eval(loc, val, path.substr(path.lastIndexOf(";")+1))+";"+x, val, path);
            else if (/^\?\(.*?\)$/.test(loc)) // [?(expr)]
               P.walk(loc, x, val, path, function(m,l,x,v,p) { if (P.eval(l.replace(/^\?\((.*?)\)$/,"$1"),v[m],m)) P.trace(m+";"+x,v,p); });
            else if (/^(-?[0-9]*):(-?[0-9]*):?([0-9]*)$/.test(loc)) // [start:end:step]  phyton slice syntax
               P.slice(loc, x, val, path);
         }
         else
            P.store(path, val);
      },
      walk: function(loc, expr, val, path, f) {
         if (val instanceof Array) {
            for (var i=0,n=val.length; i<n; i++)
               if (i in val)
                  f(i,loc,expr,val,path);
         }
         else if (typeof val === "object") {
            for (var m in val)
               if (val.hasOwnProperty(m))
                  f(m,loc,expr,val,path);
         }
      },
      slice: function(loc, expr, val, path) {
         if (val instanceof Array) {
            var len=val.length, start=0, end=len, step=1;
            loc.replace(/^(-?[0-9]*):(-?[0-9]*):?(-?[0-9]*)$/g, function($0,$1,$2,$3){start=parseInt($1||start);end=parseInt($2||end);step=parseInt($3||step);});
            start = (start < 0) ? Math.max(0,start+len) : Math.min(len,start);
            end   = (end < 0)   ? Math.max(0,end+len)   : Math.min(len,end);
            for (var i=start; i<end; i+=step)
               P.trace(i+";"+expr, val, path);
         }
      },
      eval: function(x, _v, _vname) {
         try { return $ && _v && eval(x.replace(/@/g, "_v")); }
         catch(e) { throw new SyntaxError("jsonPath: " + e.message + ": " + x.replace(/@/g, "_v").replace(/\^/g, "_a")); }
      }
   };

   var $ = obj;
   if (expr && obj && (P.resultType == "VALUE" || P.resultType == "PATH")) {
      P.trace(P.normalize(expr).replace(/^\$;/,""), obj, "$");
      return P.result.length ? P.result : false;
   }
};

})();
