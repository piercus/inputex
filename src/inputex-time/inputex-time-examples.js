gI.addExamples("inputex-time", {
              keyObject: "",list:[{
		title:"Basic TimeField creation",
		description:"Use the following code to create a basic inputEx TimeField.",
		fn:function(parentEl,I){
					field = new I.TimeField({
						parentEl: parentEl, 
						value:'15:17:34'
					});
					var button = I.cn('button', null, null, 'getValue');
					Y.one(button).on('click',function() {
						alert(field.getValue());
					});
					document.getElementById(parentEl).appendChild(button);
		}},{
		title:"Change separators",
		description:"Use the separators attribute from CombineField to change the separator strings.",
		fn:function(parentEl,I){
					new I.TimeField({
						parentEl: parentEl, 
						separators: [false,"h","m","s"],
						value:'15:17:34'
					});
		}}]});