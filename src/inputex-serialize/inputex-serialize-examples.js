gI.addExamples("inputex-serialize", {
              keyObject: "",list:[{
		title:"Basic SerializeField creation (JSON serialization)",
		description:"",
		fn:function(parentEl,I){
			var field = new I.SerializeField({
				parentEl: parentEl, 
				label: 'Your name',
				description: 'Please enter your name',
				
				subfield: {
							type: 'group',
							fields: [
								{ name: 'firstname', typeInvite: 'firstname' },
								{ name: 'lastname', typeInvite: 'lastname' }
							],
							required:true
				}
				
			});

		   var el = document.getElementById(parentEl);

			var button1 = I.cn('button', null, null, "SetValue with '{\"firstname\":\"Jimi\",\"lastname\":\"Hendrix\"}'");
			el.appendChild(button1);
			Y.one(button1).on('click' ,function() {
			   field.setValue('{"firstname":"Jimi","lastname":"Hendrix"}');
			});

			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"XML serialization",
		description:"There is an issue because ObjTree needs only 1 root element :",
		fn:function(parentEl,I){
			var field = new I.SerializeField({
				parentEl: parentEl, 
				label: 'Your name',
				description: 'Please enter your name',
				
				serializer: 'xml',
				
				subfield: {
							type: 'group',
							fields: [
								{
									type: 'group',
									name: 'person',
									fields: [
										{ name: 'firstname', typeInvite: 'firstname' },
										{ name: 'lastname', typeInvite: 'lastname' }
									]
								}
							]
				}
				
			});

		   var el = document.getElementById(parentEl);
			
			var button2 = I.cn('button', null, null, "SetValue");
			el.appendChild(button2);
			Y.one(button2).on('click' ,function() {
				var xml = String.fromCharCode(60)+'?xml version="1.0" encoding="UTF-8" ?'+String.fromCharCode(62)+String.fromCharCode(60)+'person'+String.fromCharCode(62)+String.fromCharCode(60)+'firstname'+String.fromCharCode(62)+'Jimi'+String.fromCharCode(60)+'/firstname'+String.fromCharCode(62)+String.fromCharCode(60)+'lastname'+String.fromCharCode(62)+'Hendrix'+String.fromCharCode(60)+'/lastname'+String.fromCharCode(62)+String.fromCharCode(60)+'/person'+String.fromCharCode(62);
				field.setValue(xml);
			});

			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated',function(value) {
				value = value.replace( new RegExp(String.fromCharCode(60),"g") , '&lt;' ).replace( new RegExp(String.fromCharCode(62),"g") , '&gt;' );
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+I.htmlEntities(value);
				logDiv.appendChild(I.cn('br'));
			});
		}}]});