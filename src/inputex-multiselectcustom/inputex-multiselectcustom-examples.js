gI.addExamples("inputex-multiselectcustom", {
              keyObject: "",list:[{
		title:"setValue",
		description:"Example setting the default value",
		fn:function(parentEl,I){
		var ms = new I.MultiSelectCustomField({
              label: "Choose librairies :", 
              name: 'librairies', 
              maxItems:3,
              choices: [
                    { value: null, label: 'Choose a library' },
                    { value: 'yui', label: 'YUI' },
                    { value: 'dojo', label: 'Dojo' },
                    { value: 'prototype', label: 'Prototype' },
                    { value: 'scriptaculous', label: 'Scriptaculous'},
                    { value: 'mootools', label: 'Mootools' }
                ],
              maxItemsAlert: function(){alert("limited to 3 responses")},// limit to 3 response
              listSelectOptions : {
                choices:[
                  { value: 0, label: 'Normal' },
                  { value: 1, label: 'I like' },
                  {'value': -1, label : "I don't like'"}
                ]
              },
              description: "what you think about those librairies",
              parentEl: parentEl
            });
		ms.on("updated",function(params) {
			var value = Y.JSON.stringify(params);
			document.getElementById(parentEl).appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
		
  }}]});
