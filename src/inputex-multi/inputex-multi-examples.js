gI.addExamples("inputex-multi", {
              keyObject: "MultiField",
              requires : ["inputex-url","inputex-select","inputex-label"],
              list:[{
		title:"Basic MultiField creation (With Label Field)",
		description:"Use the following code to create a basic inputEx MultiField.",
		config: {
			name: 'websiteUrl', 
			listLabel: 'Websites',
			addField: {'type':"select", choices: [
			    'http://www.neyric.com',
			    'http://www.ajaxian.com', 
			    'http://www.google.com', 
			    'http://www.yahoo.com',
			    'http://www.sncf.com',
				'http://www.clicrdv.com',   
				'http://www.neyric.com',
				'http://javascript.neyric.com/wireit'
			]}
		},
		test: function(I,field,errCb){
		  if( !(field.addField&&I.inDoc(field.addField.divEl))){
		     errCb("no add field");   
		  }
		},
		/*
		var button = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button); 
		I.on('click', function() { alert( Y.JSON.stringify(field.getValue())); },button)  
		var button2 = I.cn('button', null, null, 'setValue()');
		document.getElementById(parentEl).appendChild(button2); 
		I.on('click', function() {
			field.setValue(['http://www.sncf.com',
											'http://www.clicrdv.com',
											'http://www.neyric.com',
											'http://javascript.neyric.com/wireit']);			
		},button2)
		var button3 = I.cn('button', null, null, 'Clear');
		document.getElementById(parentEl).appendChild(button3); 
		I.on('click', function() {
			field.setValue([]);
		},button3)*/
	
 // }
  },{
		title:"MultiField creation with url Field",
		description:"Use the following code to create a basic inputEx Multi with an url element field.",
		fn:function(parentEl,I){
		var field = new I.MultiField({
			name: 'websiteUrl', 
			listLabel: 'Websites',
			elementType: {type: 'url'}, 
			addField: {'type':"select", choices: [
			    'http://www.neyric.com',
			    'http://www.ajaxian.com', 
			    'http://www.google.com', 
			    'http://www.yahoo.com',
			    'http://www.sncf.com',
				'http://www.clicrdv.com',
				'http://www.neyric.com',
				'http://javascript.neyric.com/wireit'
			]},
			parentEl: parentEl
		});
		var button = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button); 
		I.on('click', function() { alert( I.JSON.stringify(field.getValue())); },button)  

		var button3 = I.cn('button', null, null, 'Clear');
		document.getElementById(parentEl).appendChild(button3); 
		I.on('click', function() {
			field.setValue([]);
		},button3)
	
  }}/*,{
		title:"Basic MultiField With elementType as a function",
		description:"Use the following code to create a basic inputEx MultiField, the element is function of the value selected.",
		fn:function(parentEl,I){
	
	    var getElementOptionsFromValue = function(v){
		   	return {
			 	  type: "group",
			      name: v+"group",
			      fields:[{
					   type: "select", 
					   value: "ok", 
					   name: "okbutton",
					   label: "what do you think about "+v, 
					   choices: ["ok","not good","very good"]
					}]
			   }
	    }
		var field = new I.MultiField({
			name: 'websiteUrl', 
			listLabel: 'Websites',
			elementType: getElementOptionsFromValue, 
			addField: {'type':"select", choices: [
			    'http://www.neyric.com',
			    'http://www.ajaxian.com', 
			    'http://www.google.com', 
			    'http://www.yahoo.com',
			    'http://www.sncf.com',
				'http://www.clicrdv.com',
				'http://www.neyric.com',
				'http://javascript.neyric.com/wireit'
			]},
			parentEl: parentEl
		});
		var button = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button); 
		I.on('click', function() { alert( Y.JSON.stringify(field.getValue())); },button)  

		var button3 = I.cn('button', null, null, 'Clear');
		document.getElementById(parentEl).appendChild(button3); 
		I.on('click', function() {
			field.setValue([]);
		},button3)
	
  }},{
		title:"Basic MultiField With Autocomplete",
		description:"Use the following code to create a basic inputEx MultiField with Autocomplete, the field can set values that are not proposed.",
		fn:function(parentEl,I){

       var addField = {
          type: "autocomplete",
          label: 'Search US state',
 
          // Format the hidden value (value returned by the form)
          returnValue: function(oResultItem) {
              return oResultItem.value;
          },
          acceptOutsideValues: true,
          autoComp: {// options of the YUI3 autocompleter (see http://developer.yahoo.com/yui/3/autocomplete/#config)
              minQueryLength: 2,
              maxResults: 50,
              resultTextLocator: 'label',
              source:
              [{label: "Massachusets", value: "MA"},
              {label: "state2", value: 2},
              {label: "state3", value:3}]   
          }
      };
		var field = new I.MultiField({
			name: 'websiteUrl', 
			delimiter: ",",
			description: 'type "test" or "test1,test2"',
			listLabel: 'Websites',
			elementType: {type: "label"}, 
			addField: addField,
			parentEl: parentEl
		});
  }},{
		title:"Basic MultiField With MenuField",
		description:"Use the following code to create a basic inputEx MultiField with MenuField.",
		fn:function(parentEl,I){
	var menuItems = [
	    {
	        text:'America',
	        submenu:{
	            itemdata:[
	                 {text:'United States of America',value:'Us'},
	                 {text:'Canada',value:'Ca'}
	             ]
	         }
	    },
	     {
	        text:'Europe',
	        submenu:{
	            itemdata:[
	                 {
	                     text:'Western Europe',
	                     submenu:{
	                        itemdata:[
	                             {text:'France',value:'Fr'},
	                             {text:'United Kingdom',value:'Uk'},
	                             {text:'Germany',value:'De'}
	                         ]
	                     }
	                 },
	                 {
	                     text:'Eastern Europe',
	                     submenu:{
	                        itemdata:[
	                             {text:'Poland',value:'Pl'},
	                             {text:'Czech Republic',value:'Cz'},
	                             {text:'Slovakia',value:'Sk'}
	                         ]
	                     }
	                 }
	             ]
	         }
	    },
	    {
	         text:'Africa',
	        submenu:{
	            itemdata:[
	                 {text:'Senegal',value:'Sn'},
	                 {text:'Madagascar',value:'Mg'}
	             ]
	         }
	     }
	];

       var addField = {
          type: "menu",
          label: 'Choose Countries',
          menuItems: menuItems
      };
		var field = new I.MultiField({
			name: 'countries', 
			listLabel: 'Countries',
			elementType: {type: "label"}, 
			addField: addField,
			parentEl: parentEl
		});
  }}*/]});