gI.addExamples("inputex-datetime", {
              keyObject: "",list:[{
		title:"Basic DateTimeField creation",
		description:"Use the following code to create a basic inputEx DateTimeField.",
		fn:function(parentEl,I){	
			// Example 1
			field = new I.DateTimeField({parentEl: parentEl, value: new Date()});
			var button = I.cn('button', null, null, 'getValue');
			I.on('click',function() {
				alert(field.getValue());
			},button)
			document.getElementById(parentEl).appendChild(button);
		}},{
		title:"Date format",
		description:"Change the date format",
		fn:function(parentEl,I){
			new I.DateTimeField({parentEl: parentEl, value: new Date(), dateFormat: 'd/m/Y'});
		}}]});