gI.addExamples("inputex-email", {
              keyObject: "",list:[{
		title:"Basic EmailField creation",
		description:"Use the following code to create a basic inputEx EmailField.",
		fn:function(parentEl,I){
					var field = new I.EmailField({parentEl: parentEl, showMsg: true });

					var logDiv = I.cn('div', null, null, "Log :");
					document.getElementById(parentEl).appendChild(logDiv);
					field.on('updated', function(val) {
						logDiv.innerHTML += "Updated at "+(new Date())+" with value: "+val;
						logDiv.appendChild(I.cn('br'));
					});
		}},{
		title:"Basic EmailField creation (with MX correction)",
		description:"Use the following code to create a basic inputEx EmailField (with MX correction)",
		fn:function(parentEl,I){
					var field = new I.EmailField({parentEl: parentEl, showMsg:true, fixdomain:true, description:"Try abc@gmail.co, abc@yaoo.fr..." });

					var logDiv = I.cn('div', null, null, "Log :");
					document.getElementById(parentEl).appendChild(logDiv);
					field.on('updated', function(val) {
						logDiv.innerHTML += "Updated at "+(new Date())+" with value: "+val;
						logDiv.appendChild(I.cn('br'));
					});
		}}]});
