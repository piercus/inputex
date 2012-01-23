gI.addExamples("inputex-keyopvalue", {
              keyObject: "",list:[{
		title:"Basic KeyOpValueField creation",
		description:"The KeyOpValueField makes it easy to build a search form from an existing inputEx definition",
		fn:function(parentEl,I){
		var field1 = new I.KeyOpValueField({
			parentEl: parentEl,
			availableFields: [
				{type: 'string', name: 'lastname', label: 'Lastname' },
				{type: 'string', name: 'firstname', label: 'Firstname' },
				{type: 'select', name: 'gender', label: 'Gender',  choices: ["Mr","Mrs","Ms"] }
			]
		});
		
		var button1 = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button1); 
		Y.one(button1).on('click', function() { alert( Y.JSON.stringify(field1.getValue())); });  
			
		
  }},{
		title:"List of conditions",
		description:"Here is a search form with multiple conditions",
		fn:function(parentEl,I){
	I({
		type: 'list',
		parentEl: parentEl,
		elementType: {
			type: 'keyopvalue',
			availableFields: [
				{type: 'string', name: 'lastname', label: 'Lastname' },
				{type: 'string', name: 'firstname', label: 'Firstname' },
				{type: 'select', name: 'gender', label: 'Gender',  choices: ["Mr","Mrs","Ms"] }
			]
		}
	});
  }},{
		title:"Changing the operators and setting labels for operators",
		description:"Two more options are available for this field: 'operators' and 'operatorLabels'",
		fn:function(parentEl,I){
		var field3 = new I.KeyOpValueField({
			parentEl: parentEl,
			availableFields: [
				{type: 'string', name: 'lastname', label: 'Lastname' },
				{type: 'string', name: 'firstname', label: 'Firstname' },
				{type: 'select', name: 'gender', label: 'Gender',  choices: ["Mr","Mrs","Ms"] }
			],
			
			operators: ["=","!="],
			operatorLabels: ["equals", "different"]
		});
		
		var button3 = I.cn('button', null, null, 'getValue()');
		document.getElementById(parentEl).appendChild(button3); 
		Y.one(button3).on('click', function() { alert( Y.JSON.stringify(field3.getValue())); });  
		
  }}]});