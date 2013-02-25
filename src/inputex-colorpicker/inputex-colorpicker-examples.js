gI.addExamples("inputex-colorpicker", {
              keyObject: "",list:[{
		title:"Basic ColorPickerField creation",
		description:"Use the following code to create a basic inputEx ColorPickerField.",
		fn:function(parentEl,I){
			new I.ColorPickerField({parentEl: parentEl, label: 'Choose a color', description: 'Click to view the available colors' });
		}},{
		title:"Smaller ColorPickerField",
		description:"Use the following code to create a ColorPickerField without controls",
		fn:function(parentEl,I){
			var field = new I.ColorPickerField({parentEl: parentEl, label: 'Choose a color', value:'#2626AF', colorPickerOptions:{showcontrols:false} });
			
			// Register the 'updated' event and log the value to the page
			var logDiv = I.cn('div', null, null, "Log :");
			document.getElementById(parentEl).appendChild(logDiv);
			field.on('updated',function(val) {
				logDiv.appendChild( I.cn('div', null, null, "Updated at "+(new Date())+" with value: "+val) );
			});
			
		}}]});
