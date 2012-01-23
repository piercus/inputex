gI.addExamples("inputex-group", {
              keyObject: "",list:[{
		title:"Basic Group creation",
		description:"Use the following code to create a basic inputEx group.",
		fn:function(parentEl,I){
					var contactFormFields = [
							{type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }]},
							{label: 'Firstname', name: 'firstname', required: true},
							{label: 'Lastname', name: 'lastname', value:'Dupont'},
							{type:'email', label: 'Email', name: 'email', required: true, showMsg: true},
							{type:'radio', label: 'Happy to be there ?', name: 'happy', display:'vertically', choices:[{value: "y", label:"yes"}, {value:"n", label:"no"}]},
							{type:'boolean', label: 'Favorite colors ?', name: 'yellow', rightLabel:"yellow"},
							{type:'boolean', label: ' ', name: 'blue', rightLabel:"blue"},
							{type:'boolean', label: ' ', name: 'red', rightLabel:"red"},
							{type:'url', label: 'Website', name:'website'}
					];
					new I.Group({parentEl: parentEl, fields: contactFormFields, legend: 'Tell us about yourself...'});
		}},{
		title:"Composition",
		description:"The inputEx.Group class inherits from inputEx.Field",
		fn:function(parentEl,I){
			var contactFormFields = [ {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }]}, {label: 'Firstname', name: 'firstname', required: true}, {label: 'Lastname', name: 'lastname', value:'Dupont'}, {type:'email', label: 'Email', name: 'email', required: true, showMsg: true}, {type:'radio', label: 'Happy to be there ?', name: 'happy', values:["y","n"], choices:["yes","no"]}, {type:'boolean', label: 'Favorite colors ?', name: 'yellow', rightLabel:"yellow"}, {type:'boolean', label: ' ', name: 'blue', rightLabel:"blue"}, {type:'boolean', label: ' ', name: 'red', rightLabel:"red"}, {type:'url', label: 'Website', name:'website'} ];
			
			new I.ListField({
				elementType: {
					type: 'group',
					fields: contactFormFields
				},
				parentEl: parentEl
			});
		}},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
			var contactFormFields = [ {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }]}, {label: 'Firstname', name: 'firstname', required: true}, {label: 'Lastname', name: 'lastname', value:'Dupont'}, {type:'email', label: 'Email', name: 'email', required: true, showMsg: true}, {type:'radio', label: 'Happy to be there ?', name: 'happy', values:["y","n"], choices:["yes","no"]}, {type:'boolean', label: 'Favorite colors ?', name: 'yellow', rightLabel:"yellow"}, {type:'boolean', label: ' ', name: 'blue', rightLabel:"blue"}, {type:'boolean', label: ' ', name: 'red', rightLabel:"red"}, {type:'url', label: 'Website', name:'website'} ];
			
			var el = document.getElementById(parentEl);
			var group3 = new I.Group({parentEl: el, fields: contactFormFields });
			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			group3.on('updated', function() {
				logDiv.innerHTML += "Updated at "+(new Date());
				logDiv.appendChild(I.cn('br'));
			});

			var setValueButton = I.cn('button', null, null, "SetValue");
			Y.one(setValueButton).on('click', function() {
				group3.setValue({
					title: 'Mme',
					firstname: 'Eric',
					lastname: 'Abouaf', 
					happy: "y",
					email: 'something@email.com',
					website: 'http://neyric.github.com/inputex',
					yellow: true
				});
				// when you don't pass all values, default values are applied
				// to missing fields (e.g. : 'blue' and 'red' fields)
				
			});
			el.appendChild(setValueButton);
		}},{
		title:"Collapsible",
		description:"Collapsible",
		fn:function(parentEl,I){
			var contactFormFields = [ {type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }]}, {label: 'Firstname', name: 'firstname', required: true}, {label: 'Lastname', name: 'lastname', value:'Dupont'}, {type:'email', label: 'Email', name: 'email', required: true, showMsg: true}, {type:'radio', label: 'Happy to be there ?', name: 'happy', values:["y","n"], choices:["yes","no"]}, {type:'boolean', label: 'Favorite colors ?', name: 'yellow', rightLabel:"yellow"}, {type:'boolean', label: ' ', name: 'blue', rightLabel:"blue"}, {type:'boolean', label: ' ', name: 'red', rightLabel:"red"}, {type:'url', label: 'Website', name:'website'} ];
			
			new I.Group({parentEl: parentEl, fields: contactFormFields, legend: 'User Informations', collapsible: true});
		}},{
		title:"Composition",
		description:"Composition",
		fn:function(parentEl,I){
					var contactFormFields2 = [ 
							{type: 'select', label: 'Title', name: 'title', choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
							{label: 'Firstname', name: 'firstname', required: true },
							{label: 'Lastname', name: 'lastname', value:'Dupont', required:false },
							{type:'email', label: 'Email', name: 'email', required: true, showMsg: true},
							{type:'boolean', label: 'Happy to be there ?', name: 'happy'},
							{type:'url', label: 'Website', name:'website'}
					];
					contactFormFields2.push({
						type: 'group',
						name: 'phone',
						collapsible: true,
						legend: 'Phone number',
						fields: [
							{ label: 'Home', name: 'home' },
							{ label: 'Business', name: 'business' },
							{ label: 'Mobile',name: 'mobile' },
							{ label: 'Fax', name: 'fax' }
						]
					});
					var field5 = new I.Group({parentEl: parentEl, fields: contactFormFields2});
					var button5 = I.cn('button', null, null, 'Get value');
					document.getElementById(parentEl).appendChild(button5);
					Y.one(button5).on('click', function() {
						alert( Y.JSON.stringify(field5.getValue()) );
					});
					var setValueButton = I.cn('button', null, null, "SetValue");
					Y.one(setValueButton).on('click', function() {
						field5.setValue({
							title: 'Mme',
							firstname: 'Eric',
							lastname: 'Abouaf', 
							happy: false,
							email: 'something@email.com',
							website: 'http://neyric.github.com/inputex',
							phone:{
								home:"911",
							   fax:"911"
							}
						});
					});
					var el = document.getElementById(parentEl);
					el.appendChild(setValueButton);
					var validButton = I.cn('button', null, null, 'Validate');
					document.getElementById(parentEl).appendChild(validButton);
					Y.one(validButton).on("click", function() {
						alert( field5.validate() );
					});
		}},{
		title:"Field descriptions",
		description:"Specify field descriptions",
		fn:function(parentEl,I){
					var descriptedFields = [ 
							{ type: 'select', label: 'Title', name: 'title', description: 'Select your gender',  choices: [{ value: 'Mr' }, { value: 'Mrs' }, { value: 'Ms' }] },
							{ label: 'Firstname', description: 'Your firstname', name: 'firstname', required: true, value:'Jacques' },
							{ label: 'Lastname', description: 'Your lastname', name: 'lastname', value:'Dupont' },
							{ type:'email', description: 'Your email. We wont send you any commercial information', label: 'Email', name: 'email'},
							{ type:'boolean', description: 'Check this box if you are happy to be there', label: 'Happy to be there ?', name: 'email'},
							{ type:'url', description: 'Your blog url', label: 'Website', name:'website'}
					];
					new I.Group({parentEl: parentEl, fields: descriptedFields, legend: 'User Informations'});
		}},{
		title:"Flatten output value for a sub-group",
		description:"The parent group will then flatten the sub-group value within its value.",
		fn:function(parentEl,I){
					var flattenGroup = new I.Group({
						parentEl: parentEl, 
						legend: 'Flatten demo', 
						name: "MyForm",
						fields: [
					      { 
					          type: 'group',
					          name: "MySubForm",
					          flatten: true,
					          fields: [
					             { label: 'Firstname', name: 'firstname' },
					             { label: 'Lastname', name: 'lastname', description: "Firstname and Lastname are within the same sub-group" }
					          ]
					      },
					      { label: 'Title', name: 'title' }
					   ]
					});
					flattenGroup.on('updated',function(value) {
						document.getElementById(parentEl).appendChild( I.cn('div',null,null, Y.JSON.stringify(value)) );
					});
		}},{
		title:"Set error messages",
		description:"Use the <i>setErrors</i> method on Group or Form instances to set error messages. The field will show the message only if the <i>showMsg</i> option is enabled on this field.",
		fn:function(parentEl,I){
					var myForm = new I.Group({
						parentEl: parentEl, 
						name: "MyForm",
						fields: [
					     {label: 'Firstname', name: 'firstname', showMsg: true},
					     {label: 'Age', name: 'age', showMsg: true},
					     {label: 'Title', name: 'title'}
					   ]
					});
					
					myForm.setErrors({
						firstname: "Cannot be empty",
						age: "Must be a number",
						title: "Cannot be empty !!! (not visible because no showMsg)"
					});
					
					// Equivalent call :
					myForm.setErrors([
						["firstname", "Cannot be empty"],
						["age", "Must be a number"],
						["title", "Cannot be empty !!! (not visible because no showMsg)"]
					]);
					
		}}]});