gI.addExamples("inputex-combine", {
              keyObject: "",list:[{
		title:"Basic CombineField creation",
		description:"",
		fn:function(parentEl,I){
			var field = new I.CombineField({
				parentEl: parentEl, 
				label: 'Your name',
				description: 'Please enter your name',
				fields: [
					{ name: 'firstname', typeInvite: 'firstname' },
					{ name: 'lastname', typeInvite: 'lastname' }
				],
				separators: [false,"   ",false],
				required:true
			});

		   var el = document.getElementById(parentEl);

			var button1 = I.cn('button', null, null, "SetValue with ['Jimi','Hendrix']");
			var val = ['Jimi','Hendrix'];
			el.appendChild(button1);
			Y.one(button1).on('click' ,function() {
			   field.setValue(val);
			   val = (val[0] == 'Jimi') ? ['',''] : ['Jimi','Hendrix'];
			   button1.innerHTML = "SetValue with "+((val[0] == 'Jimi') ? "['Jimi','Hendrix']" : "['','']");
			});

			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated',function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"Basic CombineField creation",
		description:"",
		fn:function(parentEl,I){
			new I.CombineField({
				parentEl: parentEl, 
				label:'Select Datetime :',
				fields: [
					{type: 'date', name: 'date', typeInvite: 'mm/dd/YYYY' },
					{type: 'time', name: 'time' }
				],
				separators: [false," ",false]
			});
		}},{
		title:"Field names",
		description:"The names are automatically set on sub-fields, so that standard forms can work. Click the button and check the URL",
		fn:function(parentEl,I){	
    new I.Form( {
			fields: [
			{
				name: 'firstVar',
				label: "First variable",
				value: "my-custom-value"
			},
			
			{
				type: 'list',
				label: "My Array",
				maxItems: 4,
				minItems: 1,
				elementType: {
					type: 'combine',
					description: 'Please enter your name',
					name: 'this_is_a_test',
					fields: [
						{ name: 'firstname', typeInvite: 'firstname' },
						{ name: 'lastname', typeInvite: 'lastname' }
					],
					value: ['Jimi','Hendrix'],
					name: "person",
					separators: [false,"   ",false],
				},
				value: [['Jimi','Hendrix'], ['Eric', 'Clapton']],
				name: 'myarray',
				useButtons: true ,
				sortable: true
			}
			
			
			],
      buttons: [{type: 'submit', value: 'Test to send the GET request'}],
			method: 'GET',
			parentEl: parentEl
		});
  }}]});