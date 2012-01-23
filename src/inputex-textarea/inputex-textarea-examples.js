gI.addExamples("inputex-textarea", {
              keyObject: "",list:[{
		title:"Basic Textarea creation",
		description:"Use the following code to create a basic inputEx Textarea.",
		fn:function(parentEl,I){
		new I.Textarea({parentEl: parentEl, value: 'Textarea can contain\nmultiline text !\n'});
		}},{
		title:"Textarea setValue/getValue",
		description:"Test of the setValue, getValue methods",
		fn:function(parentEl,I){
			var div = document.getElementById(parentEl);
			var textField = new I.Textarea({parentEl: div, showMsg:true, required:true});

			var button1 = I.cn('button', null, null, "SetValue");
			div.appendChild(button1);
			Y.on("click" ,function() { 
				textField.setValue('Textarea can contain\nmultiline text !\n'); 
			},button1);

			var button2 = I.cn('button', null, null, "GetValue");
			div.appendChild(button2);
			Y.on("click" ,function() { 
				alert(textField.getValue());
			},button2);
		}},{
		title:"Change Textarea size",
		description:"Set the size using 'rows' and 'cols' attributes.",
		fn:function(parentEl,I){
			new I.Textarea({parentEl: parentEl, value: 'Set the size...\nusing "rows" and "cols" attributes !\n', rows: 8, cols: 40});
		}},{
		title:"More options",
		description:"Set the min/max length, typeInvite...",
		fn:function(parentEl,I){
			new I.Textarea({parentEl: parentEl, showMsg:true, required:true, typeInvite:"Type text here", minLength:10, maxLength:20, name: "Test4"});
		}}]});