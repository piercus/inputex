gI.addExamples("inputex-string", {
              keyObject: "",list:[{
		title:"Basic StringField creation",
		description:"Use the following code to create a basic inputEx field.",
		fn:function(parentEl,I){
		new I.StringField({parentEl: parentEl});
}},{
		title:"With a default value",
		description:"You can set a default value by specifying the 'value' property in the options object.",
		fn:function(parentEl,I){
			new I.StringField({value: 'I rocks', parentEl: parentEl});
		}},{
		title:"Changing the size",
		description:"You can set the size of the input.",
		fn:function(parentEl,I){
		new I.StringField({size: 40, value: 'size is set to 40 (default is 20)', parentEl: parentEl});
		}},{
		title:"Maximum and minimum length",
		description:"You can add a maximum/minimum length on string fields :",
		fn:function(parentEl,I){
			new I.StringField({value: '0123456789', showMsg: true, minLength: 3, maxLength: 10, parentEl: parentEl});
		}},{
		title:"Required",
		description:"If the 'required' property is set, the 'validate' method will return false if the field is empty. In a form, the 'validate' method will be called on each field and will return false if at least one field doesn't validate.",
		fn:function(parentEl,I){
			new I.StringField({required: true, showMsg: true, parentEl: parentEl});
		}},{
		title:"Regular Expression 1",
		description:"Here is an example on how to check the value with a regular expression. (It is better to use the IntegerField, but this is a simple example.)",
		fn:function(parentEl,I){
			new I.StringField({label: 'Enter your age', regexp: /^[0-9]*$/, parentEl: parentEl});
		}},{
		title:"Regular Expression 2",
		description:"The basic Field class can use regular expressions to validate the field content. Here is an example with this wonderful email regular expression (note that there is an Email Field class).",
		fn:function(parentEl,I){
		new I.StringField({showMsg: true,regexp: I.regexps.email, value: 'wrong@email', parentEl: parentEl});
		}},{
		title:"Enabling/Disabling inputs",
		description:"You can call the methods 'disable' or 'enable' to set the state of the field.",
		fn:function(parentEl,I){
			var field = new I.StringField({value: 'This field is disabled', parentEl: parentEl});
			field.disable();
		}},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
					var el = document.getElementById(parentEl);
					var field = new I.StringField({parentEl: el });
					var logDiv = I.cn('div', null, null, "Log :");
					el.appendChild(logDiv);
					field.on("updated",function(val) {
						logDiv.innerHTML += "Updated at "+(new Date())+" with value: "+val;
					});
		}},{
		title:"Type invitation",
		description:"Display a text when the field is empty.",
		fn:function(parentEl,I){
		new I.StringField({parentEl: parentEl, typeInvite: 'lastname', description: 'Enter your lastname'});
		}},{
		title:"Various options",
		description:"Config with various options : typeInvite, required, minLength, trim   --  Test setValue and getValue methods",
		fn:function(parentEl,I){
			var field1 = new I.StringField({
				parentEl: parentEl, 
				typeInvite: 'lastname', 
				description: 'Enter your lastname', 
				minLength:10, 
				trim:true, // getValue will return a trimed value
				required:true, 
				showMsg:true
			});

			var exampleDiv = document.getElementById(parentEl);

			var button1 = I.cn('button', null, null, 'setValue()');
			exampleDiv.appendChild(button1); 
			I.on('click', function() { 
				field1.setValue("I've been set by setValue"); 
			}, button1);

			var button2 = I.cn('button', null, null, 'getValue()');
			exampleDiv.appendChild(button2); 
			I.on( 'click', function() { 
				alert(field1.getValue()); 
			},button2);
		}},{
		title:"Focus the field",
		description:"Use the focus method",
		fn:function(parentEl,I){
			var field12 = new I.StringField({parentEl: parentEl});

			var exampleDiv = document.getElementById(parentEl);

			var button3 = I.cn('button', null, null, 'focus()');
			exampleDiv.appendChild(button3); 
			I.on('click', function() { field12.focus(); }, button3);
		}}]});