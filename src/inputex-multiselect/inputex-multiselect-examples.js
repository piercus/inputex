gI.addExamples("inputex-multiselect", {
              keyObject: "",list:[{
		title:"Basic MultiSelectField creation",
		description:"Use the following code to create a basic inputEx MultiSelectField. The first value of 'options' is used as the invite text to select an option.",
		fn:function(parentEl,I){
		var ms = new I.MultiSelectField({
			label: 'Javascript libraries you use', 
			name: 'country', 
			choices: [{ value: 'Choose a library' }, { value: 'YUI' }, { value: 'Dojo' }, { value: 'Prototype' }, { value: 'Scriptaculous'}, { value: 'Mootools' }],
			parentEl: parentEl, 
			description: 'Select and order your favorite libraries'
		});
		ms.on("updated",function(params) {
			var value = Y.JSON.stringify(params);
			document.getElementById(parentEl).appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
  }},{
		title:"Change returned values",
		description:"As SelectField, MultiSelect field allow to set the labels for the options",
		fn:function(parentEl,I){
		var ms = new I.MultiSelectField({
			label: 'Javascript libraries you use',
			name: 'country',
			choices: [
				{ value: null, label: 'Choose a library' },
				{ value: 'yui', label: 'YUI' },
				{ value: 'dojo', label: 'Dojo' },
				{ value: 'prototype', label: 'Prototype' },
				{ value: 'scriptaculous', label: 'Scriptaculous'},
				{ value: 'mootools', label: 'Mootools' }
			],
			parentEl: parentEl,
			description: 'Select and order your favorite libraries'
		});
		ms.on("updated",function(params) {
			var value = Y.JSON.stringify(params);
			document.getElementById(parentEl).appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
  }},{
		title:"setValue",
		description:"Example setting the default value",
		fn:function(parentEl,I){
		var ms = new I.MultiSelectField({
			label: 'Javascript libraries you use',
			name: 'country',
			choices: [
				{ value: null, label: 'Choose a library' },
				{ value: 'yui', label: 'YUI' },
				{ value: 'dojo', label: 'Dojo' },
				{ value: 'prototype', label: 'Prototype' },
				{ value: 'scriptaculous', label: 'Scriptaculous'},
				{ value: 'mootools', label: 'Mootools' }
			],
			parentEl: parentEl,
			description: 'Select and order your favorite libraries'
		});
		ms.on("updated",function(params) {
			var value = Y.JSON.stringify(params);
			document.getElementById(parentEl).appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
		
		ms.setValue(['yui','dojo']);
		
  }}]});