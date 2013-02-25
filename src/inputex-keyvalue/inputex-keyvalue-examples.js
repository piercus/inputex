gI.addExamples("inputex-keyvalue", {
              keyObject: "",list:[{
		title:"Basic KeyValueField creation",
		description:"The KeyValueField makes it easy to build a search form from an existing inputEx definition",
		fn:function(parentEl,I){
		var field = new I.KeyValueField({
			parentEl: parentEl,
			availableFields: [
				{type: 'string', name: 'lastname', label: 'Lastname' },
				{type: 'string', name: 'firstname', label: 'Firstname' },
				{type: 'select', name: 'gender', label: 'Gender', choices: ["Mr","Mrs","Ms"] }
			]
		});
		
		var button = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button); 
		Y.one(button).on('click', function() { alert( Y.JSON.stringify(field.getValue())); });  
			
		
  }}]});
