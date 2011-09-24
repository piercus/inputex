
YUI_config.groups.inputex.base = '../../src/';
YUI({filter: 'raw'}).use("inputex-form","inputex-multi","inputex-label","inputex-menu","inputex-condition-plugin","inputex-jsontreeinspector","inputex-multiselect","substitute","jsonp","inputex-rpc",function(Y){
    var suffixJsonP = "format=jsonp&prefix={callback}";
    var DigestObjects = function(className,objects,actAsId){
      var res = [];
      for (var i = 0; i< objects.length; i++){
          res.push(findOrCreateObject(className,objects[i],actAsId));
      }
      return res;
    }
    var findOrCreateObject= function(className,options,actAsId){
        if (typeof(retrieveCollections[className]) === "undefined"){
              retrieveCollections[className] = {};
          } 
          
          var actAsId = actAsId || "id";
          if (retrieveCollections[className][options[actAsId]]){
              return retrieveCollections[className][options[actAsId]];
          }
          var res = new Models[className](options);
          retrieveCollections[className][options[actAsId]] = res;
          return res;
          
    }
    var RetrieveObject = function(options){
      this[this.actAsId] = options[this.actAsId];
      this.setOptions(options);
      this.buildAssociations(options);
    };

    RetrieveObject.prototype = {
        actAsId: "id",
        setOptions: function(options){
          for (var key in options){
              if(options.hasOwnProperty(key)){
                  this[key] = options[key];
              }
          }
        },
        buildAssociations: function(options){
            var self = this;
            var associations = {
                hasMany: {
                    cb: function(obj){
                            self[associationName] = obj;
                        return self[associationName];
                    },
                    getName: function(key){
                        return key.toLowerCase()+"s";
                    }
                },
                belongsTo: {
                    cb: function(obj){
                            self[associationName] = obj[0];
                        return self[associationName];
                    },
                    getName: function(){
                        return key.toLowerCase();
                    }
                }
            };
            for (var assoc in associations){
                if(associations.hasOwnProperty(assoc) && this[assoc]){
                    for (var key in this[assoc]){
                        if(this[assoc].hasOwnProperty(key)){
                            var cb = associations[assoc].cb
                            var associationName = this[assoc][key].associationName || associations[assoc].getName(key);
                            var fetch = buildFetch(this[assoc][key].fetch)
                            if(this[assoc][key].parse){
                                this[assoc][key].parse(options,fetch,cb);
                            } else {
                                fetch(options,cb);
                            }

                        }
                    }
                }
            }
        
        }
    
    };    
    
    var Models = {};
    Models.Topic = function(options){
      Models.Topic.superclass.constructor.call(this,options)
    };
    Y.extend(Models.Topic, RetrieveObject,{
      hasMany: {
        Indicator: {
          fetch: {
              url : "http://api.worldbank.org/topics/{id}/indicators?"+suffixJsonP,
              callback: function(res){
                  return DigestObjects("Indicator",res[1])
              }
           }
        }
      },
      className : "Topic"
    });

	var buildFetch = function(config){
        return function(options,cb){
            var url = Y.substitute(config.url,options);
            var callback = function(res){
                cb(config.callback(res));
            }
            Y.jsonp(url,callback);
        }
    }

    
    Models.Topic.fetchAll = buildFetch({
            url : "http://api.worldbank.org/topics?"+suffixJsonP,
            callback: function(res){
                return DigestObjects("Topic",res[1])
            }
    });
    
    
    
    
    
    Models.Indicator = function(options){
      Models.Indicator.superclass.constructor.call(this,options)
    }

    Y.extend(Models.Indicator, RetrieveObject,{
      belongsTo: {
        Topic: {
            parse: function(options,fetch,cb){
                var res = [];
                for (var t = 0; t < options.topics.length; t++){
                    if (
                          retrieveCollections["Topic"] && 
                          retrieveCollections["Topic"][options.topics[t].id]
                        ){
                        res.push(retrieveCollections["Topic"][options.topics[t].id]);
                        cb(res);
                     } else {
                         fetch({obj_id : options.topics[t].id},cb);
                     }
                }
                return res;
            },
            fetch: {
                url: "http://api.worldbank.org/topics/{obj_id}?format=json",
                callback: function(res){
                    return DigestObjects("Topic",res[1])
                }
            }
        }
      },
      className : "Indicator"
      
    });
    Models.Indicator.fetchAll = buildFetch({
            url : "http://api.worldbank.org/indicators?per_page=5000&"+suffixJsonP,
            callback: function(res){
                DigestObjects("Indicator",res[1])
            }
    });
    
    Models.Country = function(options){
      Models.Country.superclass.constructor.call(this,options)
    }
    Y.extend(Models.Country, RetrieveObject,{
        belongsTo: {
            Region: {
                parse: function(options,fetch,cb){
                    var res = [];
                    var id = options.region.id;
                    if (id == "NA"); return []; // NA means Aggregates, it not a region
                    if (
                          retrieveCollections["Region"] && 
                          retrieveCollections["Region"][id]
                        ){
                        res.push(retrieveCollections["Region"][id]);
                        cb(res);
                     } else {
                        console.log( retrieveCollections["Region"],retrieveCollections["Region"][id])
                       // Models.Region.fetchAll({},cb)
                     }
                    return res;
                }
            }
          },
        className : "Country"
    });
    Models.Country.fetchAll = buildFetch({
                url : "http://api.worldbank.org/countries?per_page=500&"+suffixJsonP,
                callback: function(res){
                    return DigestObjects("Country",res[1])
                }
    });
    Models.Region = function(options){
      Models.Country.superclass.constructor.call(this,options)
    }
    Y.extend(Models.Region, RetrieveObject,{
        className : "Region",
        hasMany: {
            Country: {
              fetch: {
                  url : "http://api.worldbank.org/regions/{code}/countries?"+suffixJsonP,
                  callback: function(res){
                      return DigestObjects("Country",res[1])
                  }
               },
               associationName: "countries"
            }
          }
    });
    Models.Region.fetchAll = buildFetch({
                url : "http://api.worldbank.org/regions?per_page=500&"+suffixJsonP,
                callback: function(res){
                    return DigestObjects("Region",res[1],"code");
                }
    });
    Models.Region.fetchAll({},function(){});
    
    var retrieveCollections = {};
    var topicId;
    var fields = [
            {
                type: "select", 
                name: "topic", 
                label: "Choose a topic", 
                choices: function(opts,cb){
                        var callback = function(objs){
                            var res = [{label: "Choose a topic"}];
                            for (var i = 0; i < objs.length; i++){
                              res.push({
                                label: objs[i].value,
                                value: objs[i].id
                              });
                            }
                            cb(res);
                        }
                        Models.Topic.fetchAll({},callback);
                }
            },{ 
                type :"select",
                label : "Choose on or multiple indicators",
                choices: function(opts,cb){
                        var topic = retrieveCollections["Topic"][topicId];
                        var res = [{label: "choose an indicator"}];
                        for (var i = 0; i < topic.indicators.length; i++){
                          var obj = topic.indicators[i];
                          res.push({
                            label: obj.name,
                            value: obj.id
                          });
                        }
                        cb(res);
                },
                label: "indicators",
                name: "indicators",
                condition: function(opts){               
                    topicId =  (
                        typeof(opts["topic"]) !== "undefined" && opts["topic"]
                        ) 
                    return topicId
                }
                
            },{
                name: "countries",
                required: true,
                delimiter: ";",
                type: "multi",
                addField: {
                  type: "menu",
                  menuItems : function(opts,cb){
                            var res = [];
                            for (var r in retrieveCollections["Region"]){
                                if(retrieveCollections["Region"].hasOwnProperty(r)){
                                    var reg = retrieveCollections["Region"][r];
                                    var countries = [];
                                    for (var c = 0 ; c < reg.countries.length; c ++){
                                        countries.push({text : reg.countries[c].name, value : reg.countries[c].id});
                                    }
                                    res.push({
                                        text : retrieveCollections["Region"][r].name,
                                        submenu: {
                                            itemdata: countries
                                        }
                                    }) 
                                }
                            }
                            cb(res);
                    },
                  label: "Choose Countries"
                },
                label: "countries"
            }
        ];
    Array.prototype.toString = function(){
        return this.join(";");
    }
    Y.on("domready",function(){
        
        /**
    	 * generate a form from the service.questionSearch method
    	 */
    	var onServiceReady = function() {
    		Y.inputEx.RPC.generateServiceForm(service.indicators, { 
    		      parentEl: 'dynamicFormContainer',
    		      fields : fields   
    		    },{
    				success: function(results) {
    					var treeContainer = Y.one('#treeResultsContainer');
    					treeContainer.innerHTML = "";
    					new Y.inputEx.widget.JsonTreeInspector(treeContainer, results);
    					WB.dataFromJSON({data : results[1]});
    				}
    			});
    	}

    	/**
    	 * automatically creates service method from the smd description
    	 */
    	var service = new Y.inputEx.RPC.Service("centralBank.smd",{ success: onServiceReady }	);
	});
	
  
});
