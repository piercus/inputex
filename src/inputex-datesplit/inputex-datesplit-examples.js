gI.addExamples("inputex-datesplit", {
              keyObject: "",list:[{
		title:"Basic DateSplitField creation",
		description:"Use the following code to create a basic inputEx DateSplitField.",
		fn:function(parentEl,I){
					
					// Example 1
					var f = new I.DateSplitField({label: 'Birthday', parentEl: parentEl, showMsg: true, required:true});

					f.on('updated',function(val) {
						document.getElementById(parentEl).appendChild(I.cn('div', null, null, 'Updated with value= '+val));
					});

					var div = document.getElementById(parentEl);

					var button1 = I.cn('button', null, null, "SetValue with today date");
					div.appendChild(button1);
					Y.one(button1).on('click' ,function() { 
						f.setValue(new Date()); 
					});
					var button2 = I.cn('button', null, null, "SetValue with empty string");
					div.appendChild(button2);
					Y.one(button2).on('click' ,function() { 
						f.setValue(''); 
					});

					var button3 = I.cn('button', null, null, "GetValue");
					div.appendChild(button3);
					Y.one(button3).on('click' ,function() { 
						alert(f.getValue());
					});

					var button4 = I.cn('button', null, null, "Clear");
					div.appendChild(button4);
					Y.one(button4).on('click' ,function() { 
						f.clear();
					});
		}}]});
