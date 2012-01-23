gI.addExamples("inputex-rte", {
              keyObject: "",list:[{
		title:"Basic RTEField creation",
		description:"Use the following code to create a basic inputEx RTEField.",
		fn:function(parentEl,I){
			new I.RTEField({parentEl: parentEl, name: 'rteField',value:"I'm the default value. I've been set through the value option."});
		}},{
		title:"RTEField setValue/getValue",
		description:"Test for setValue/getValue using the RTEField.",
		fn:function(parentEl,I){
			var div = document.getElementById(parentEl);
			var htmlField = new I.RTEField({parentEl: div, name: 'test2'});

			var button1 = I.cn('button', null, null, "SetValue");
			div.appendChild(button1);
			Y.one(button1).on('click' ,function() { 
				htmlField.setValue('RTEField can contain HTML !'); 
			});
			var button2 = I.cn('button', null, null, "GetValue");
			div.appendChild(button2);
			Y.one(button2).on('click' ,function() { 
				alert(htmlField.getValue());
			});
		}},{
		title:"Using the SimpleEditor",
		description:"Use the following code to create a SimpleEditor widget",
		fn:function(parentEl,I){
			var field3 = new I.RTEField({parentEl: parentEl, name: 'rteField3', editorType: 'simple'});
			field3.setValue("Value set just after init...");
		}}]});