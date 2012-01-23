gI.addExamples("inputex-uppercase", {
              keyObject: "",list:[{
		title:"Basic UpperCaseField creation",
		description:"Use the following code to create a basic inputEx UpperCaseField.",
		fn:function(parentEl,I){
			var field = new I.UpperCaseField({parentEl: parentEl, value: 'i was lowercase'});

			var el = document.getElementById(parentEl);

			var button1 = I.cn('button', null, null, "SetValue with 'InputEx'");
			var val = 'InputEx';
			el.appendChild(button1);
			Y.one(button1).on('click' ,function() {
			   field.setValue(val);
			   val = (val == 'InputEx') ? '' : 'InputEx';
			   button1.innerHTML = "SetValue with '"+val+"'";
			});

			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}}]});