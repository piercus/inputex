gI.addExamples("inputex-password", {
              keyObject: "",list:[{
		title:"Basic PasswordField creation",
		description:"Use the following code to create a basic inputEx PasswordField.",
		fn:function(parentEl,I){
			new I.PasswordField({parentEl: parentEl, showMsg: true});
		}},{
		title:"Password and confirmation",
		description:"The <b>confirm</b> option makes sure there is no typo in new passwords. Use it in combination with an <i>id</i> set on the password field to compare with.",
		fn:function(parentEl,I){
			// Using the json instanciation method :
			I({
				type: 'group',
				fields: [
					{type: 'password', label: 'New password', showMsg: true, required: true, id: 'firstPassword' },
					{type: 'password', label: 'Confirmation', showMsg: true, required: true, confirm: 'firstPassword' }
				],
				parentEl: parentEl
			});
		}},{
		title:"Password length",
		description:"Set the minimum password length using the <i>minLength</i> option :",
		fn:function(parentEl,I){
			new I.PasswordField({parentEl: parentEl, showMsg: true, minLength: 10});
		}},{
		title:"Password strength indicator",
		description:"A widget indicating the strength of the password (useful for password creation) :",
		fn:function(parentEl,I){
			new I.PasswordField({parentEl: parentEl, showMsg: true, strengthIndicator: true});
		}},{
		title:"Caps Lock Warning",
		description:"Display a warning if the caps lock key is on",
		fn:function(parentEl,I){
			new I.PasswordField({parentEl: parentEl, showMsg: true, capsLockWarning: true});
		}}]});
