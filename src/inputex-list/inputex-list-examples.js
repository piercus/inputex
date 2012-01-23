gI.addExamples("inputex-list", {
              keyObject: "",list:[{
		title:"Basic ListField creation",
		description:"Use the following code to create a basic inputEx ListField.",
		fn:function(parentEl,I){
		var field = new I.ListField({
			name: 'websiteUrl', 
			listLabel: 'Websites',
			elementType: {type: 'url'},
			value: ['http://www.neyric.com', 'http://www.ajaxian.com', 'http://www.google.com', 'http://www.yahoo.com'], 
			parentEl: parentEl
		});
		var button = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button); 
		Y.one(button).on('click', function() { alert( Y.JSON.stringify(field.getValue())); });  
		var button2 = I.cn('button', null, null, 'setValue()');
		document.getElementById(parentEl).appendChild(button2); 
		Y.one(button2).on('click', function() {
			field.setValue(['http://www.sncf.com',
											'http://www.clicrdv.com',
											'http://www.neyric.com',
											'http://javascript.neyric.com/wireit']);			
		});
		var button3 = I.cn('button', null, null, 'Clear');
		document.getElementById(parentEl).appendChild(button3); 
		Y.one(button3).on('click', function() {
			field.setValue([]);
		});
	
  }},{
		title:"Sortable list",
		description:"Example for the sortable ListField",
		fn:function(parentEl,I){
		
		var field2 = new I.ListField({
			listLabel: 'Reorder example',
			elementType: {type: 'string'},
			value: ['one', 'two', 'three', 'four'], 
			parentEl: parentEl,
			sortable: true
		});
		var buttonGetValue = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(buttonGetValue); 
		Y.one(buttonGetValue).on('click', function() { 
			alert( Y.JSON.stringify(field2.getValue())); 
		});
	
  }},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
		var field3 = new I.ListField({parentEl: parentEl, value: ["one", "two", "three", "four"], sortable: true });
		var logDiv = I.cn('div', null, null, "Log :");
		document.getElementById(parentEl).appendChild(logDiv);
		field3.on('updated',function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+Y.JSON.stringify(value);
		});
  }},{
		title:"Use buttons instead of links",
		description:"Use buttons :",
		fn:function(parentEl,I){
		new I.ListField({
			listLabel: 'Websites',
			elementType: {
				type: 'select', 
				choices:  ['http://www.neyric.com', 'http://www.ajaxian.com', 'http://www.google.com', 'http://www.yahoo.com', 'http://javascript.neyric.com/blog', 'http://javascript.neyric.com/wireit', 'http://neyric.github.com/inputex']
			},
			value: ['http://www.neyric.com', 'http://www.ajaxian.com', 'http://www.google.com', 'http://www.yahoo.com'], 
			parentEl: parentEl,
			useButtons: true // set to true to display buttons instead of links
		});
  }},{
		title:"Set maximum/minimum number of items",
		description:"Use the maxItems and minItems options :",
		fn:function(parentEl,I){
		new I.ListField({
			listLabel: 'Websites',
			maxItems: 4,
			minItems: 1,
			elementType: {
				type: 'select',
				choices:  ['http://www.neyric.com', 'http://www.ajaxian.com', 'http://www.google.com', 'http://www.yahoo.com', 'http://javascript.neyric.com/blog', 'http://javascript.neyric.com/wireit', 'http://neyric.github.com/inputex']
			},
			value: ['http://www.neyric.com', 'http://www.ajaxian.com', 'http://www.google.com', 'http://www.yahoo.com'], 
			parentEl: parentEl,
			useButtons: true 
		});
  }},{
		title:"Field names",
		description:"The names are automatically set on sub-fields, so that standard forms can work. Click the button and check the URL",
		fn:function(parentEl,I){	
    new I.Form( {
			fields: [
			{
				name: 'firstVar',
				label: "First variable",
				value: "my-custom-value"
			},
			{
				type: 'list',
				label: "My Array",
				maxItems: 4,
				minItems: 1,
				elementType: {type: 'string'},
				value: ['this', 'is', 'a', 'test'],
				name: 'myarray',
				useButtons: true ,
				sortable: true
			}],
      buttons: [{type: 'submit', value: 'Test to send the GET request'}],
			method: 'GET',
			parentEl: parentEl
		});
  }}]});