gI.addExamples("inputex-tree", {
              keyObject: "",list:[{
		title:"Basic TreeField creation",
		description:"Use the following code to create a basic inputEx TreeField.",
		fn:function(parentEl,I){
			new I.TreeField({parentEl: parentEl, 
				elementType: {
						type: 'inplaceedit', 
						formatValue: function(val) { return "<img src="%22+val+%22favicon.ico">"+val; }, 
						editorField: {type: 'string' },
						value: 'Edit me'
				}
			});
		}}]});