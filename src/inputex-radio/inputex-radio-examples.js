gI.addExamples("inputex-radio", {
              keyObject: "",list:[{
		title:"Basic RadioField creation",
		description:"Use the following code to create a basic inputEx RadioField.",
		fn:function(parentEl,I){
			new I.RadioField({
				label: 'Where did you learn about I ?',
				name: 'example1',
				choices: [                    // choices: [       <- alternative syntax (shorter)
					{ value: 'Ajaxian' },     //    'Ajaxian',    <-
					{ value: 'YUI blog' },    //    'YUI blog',   <-
					{ value: 'Other' }        //    'Other'       <-
				],                            // ],               <-
				value:'Ajaxian',
				parentEl: parentEl
			});                   // choices: [       
	}}/*,{
		title:"Differentiate choices' labels and values",
		description:"Use the following code to create choices with labels different from values",
		fn:function(parentEl,I){
			new I.RadioField({
				label: 'Where are you from ?',
				name: 'example2',
				choices: [                                                // no alternative syntax
					{ value: 'us', label: 'United States of America' },
					{ value: 'fr', label: 'France' }
				],
				parentEl: parentEl
			});
		}},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
		var el, field, button, val, logDiv;
		
		el = document.getElementById(parentEl);
		field = new I.RadioField({ name: 'example3', label: 'Where are you from ?', choices: [{ value: 'us', label: 'United States of America' }, { value: 'fr', label: 'France' }], parentEl: el });
		
		button = I.cn('button', null, null, "SetValue with 'us'");
		el.appendChild(button);
		
		val = 'us';
		
		Y.one(button).on("click" ,function() {
		   field.setValue(val);
		   val = (val == 'fr') ? 'us' : 'fr';
		   button.innerHTML = "SetValue with '"+val+"'";
		});
		
		logDiv = I.cn('div', null, null, "Log :");
		el.appendChild(logDiv);
		
		field.on('updated', function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
			logDiv.appendChild(I.cn('br'));
		});
		}},{
		title:"Styling RadioField",
		description:"Display the choices vertically, style currently selected choice...",
		fn:function(parentEl,I){
			new I.RadioField({
				label: 'Where did you learn about I ?',
				display:'vertically',  // instead of default implicit "display:'inline'"
				name: 'example4',
				choices: ['Ajaxian','YUI blog','Other'],
				parentEl: parentEl
			});
			
			// + CSS : underline selected choice
			//
			// <style>
			//   .I-RadioField .I-selected label { text-decoration: underline; }
			// </style>
		}
		},{
		title:"allowAny option",
		description:"The 'allowAny' option adds a radio associated to a StringField to let the user enter any value.",
		fn:function(parentEl,I){
			var field2 = new I.RadioField({label: 'Where did you learn about I ?', name: 'example5', choices: ['Ajaxian','YUI blog'], parentEl: parentEl, allowAny: true});
			field2.on('updated', function(value) {
					document.getElementById(parentEl).appendChild( I.cn('div',null,null, "Updated with value: "+value) );
			});
		}},{
		title:"Advanced allowAny option",
		description:"More options with allowAny (separators, default value, validator, etc.)",
		fn:function(parentEl,I){
			var field, el, button1, button2, button3;
			
			el = document.getElementById(parentEl);
			
			field = new Y.inputEx.RadioField({
				label: 'Would you like to receive an email reminder ?',
				name: 'example6',
				display: 'vertically',
				choices: [{ value: '0', label: 'No' }],
				value: '0', // default value, also used by clear() method
				parentEl: 'container6',
				allowAny: {
					separators:['Yes, ',' hours before the event'],
					value:'3', // default value for allowAny field, not for radioField
					validator: function(val) {
						var num = parseInt(val,10);
						return (val === ""+num && num >= 1 && num <= 48);
					}
				},
				messages: {invalid:"Hours should be between 1 and 48."},
				showMsg:true,
				required:true
			});
	}},{
		title:"Advanced allowAny option 2",
		description:"Use a custom field in allowAny",
		fn:function(parentEl,I){
			var field, el, button1, button2, button3;
			
			el = document.getElementById(parentEl);
			
			field = new Y.inputEx.RadioField({
				label: 'Would you like to receive an email reminder ?',
				name: 'example6bis',
				display: 'vertically',
				choices: [{ value: 0, label: 'No' }, { value: 1440, label: 'Yes, 1 day before the event (recommended)'}],
				value: 1440, // default value, also used by clear() method
				parentEl: el,
				allowAny: {
					field: {
						type: "timeinterval",
						unit: inputEx.TimeIntervalField.units.MINUTE, // return value in 'minutes'
						value: 7*24*60, // 1 week = 7 days,
						fields: [
							{type:'integer', value:1, required:true},
							{
								type: 'select',
								choices: [
									{ value: inputEx.TimeIntervalField.units.HOUR, label: inputEx.messages.timeUnits.HOUR },
									{ value: inputEx.TimeIntervalField.units.DAY, label: inputEx.messages.timeUnits.DAY },
									{ value: inputEx.TimeIntervalField.units.MONTH, label: inputEx.messages.timeUnits.MONTH }
								]
							}
						],
						separators:['Yes, ',false, ' before the event']
					},
					validator: function(val) {
						return (val >= 120 && val <= 43200);
					}
				},
				required:true,
				messages: {invalid:"Reminder can be set between 2 hours and 1 month before the event"},
				showMsg:true
			});
	}},{
		title:"Disable RadioField",
		description:"Disable the field (to disable radio inputs individually, see another example below)",
		fn:function(parentEl,I){
			var el, field, button1, button2;
			
			el = document.getElementById(parentEl);
			field = new I.RadioField({label: 'Where did you learn about I ?', name: 'example8', choices: ['Ajaxian','YUI blog','Other'], value:'Ajaxian', parentEl: el});
			
			button1 = I.cn('button', null, null, 'disable()');
			el.appendChild(button1); 
			I.on(button1,'click', function() { field.disable(); });

			button2 = I.cn('button', null, null, 'enable()');
			el.appendChild(button2); 
			I.on(button2,'click', function() { field.enable(); });
			
		}},{
		title:"addChoice",
		description:"Add choices dynamically",
		fn:function(parentEl,I){
			var el, field, button1, button2, button3, logDiv;
			
			el = document.getElementById(parentEl);
			field = new I.RadioField({name: 'example9', choices: [{ value: 'United States of America' }, { value: 'France' }], parentEl: el});
			
			button1 = I.cn('button', null, null, "Add 'Spain' choice (and select 'Spain')");
			Y.one(button1).on('click' ,function() {
				field.addChoice({value:"Spain",selected:true});
				button1.disabled = true;
			});
			
			button2 = I.cn('button', null, null, "Add 'United Kingdom' choice (value : 'uk'), in position 1");
			Y.one(button2).on('click' ,function() {
				field.addChoice({value:"uk",label:"United Kingdom",position:1});
				button2.disabled = true;
			});
			
			button3 = I.cn('button', null, null, "Add 'Sweden' choice after 'France' choice");
			Y.one(button3).on('click' ,function() {
				field.addChoice({value:"Sweden",after:"France"});
				button3.disabled = true;
			});
			
			el.appendChild(button1);
			el.appendChild(button2);
			el.appendChild(button3);
			
			logDiv = I.cn('div', null, null, "Log : ");
			el.appendChild(logDiv);
			
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"removeChoice",
		description:"Remove choices dynamically",
		fn:function(parentEl,I){
			var el, field, button1, button2, button3, logDiv;
			
			el = document.getElementById(parentEl);
			field = new I.RadioField({
				name: 'example9',
				choices: [
					{ value: 'usa', label: 'United States of America' },
					{ value: 'de', label: 'Germany' },
					{ value: 'uk', label: 'United Kingdom' },
					{ value: 'fr', label: 'France' },
					{ value: 'se', label: 'Sweden' },
					{ value: 'es', label: 'Spain' }
				],
				parentEl: el
			});
			
			button1 = I.cn('button', null, null, "Remove 'Spain' choice (by label)");
			I.on('click', function() {
			   field.removeChoice({label:"Spain"},button1)
			   button1.disabled = true;
			});
			
			button2 = I.cn('button', null, null, "Remove 'United Kingdom' choice (by value)");
			I.on('click', function() {
			   field.removeChoice({value:"uk"},button2)
			   button2.disabled = true;
			});
			
			button3 = I.cn('button', null, null, "Remove 'Germany' choice (by position)");
			I.on('click', function() {
			   field.removeChoice({position:1},button3)
			   button3.disabled = true;
			});
			
			el.appendChild(button1);
			el.appendChild(button2);
			el.appendChild(button3);
			
			logDiv = I.cn('div', null, null, "Log : ");
			el.appendChild(logDiv);
			
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"Hide / Show / Disable / Enable choice",
		description:"Hide, show, disable or enable an choice in the selector, without removing it totally, and keeping the original choice's order",
		fn:function(parentEl,I){
		var el, field, button1, button2, button3, button4, logDiv;
		
		el = document.getElementById(parentEl);
		field = new I.RadioField({name: 'example11', choices: [ { value: 'usa', label: 'United States of America' }, { value: 'fr', label: 'France' }, { value: 'es', label: 'Spain' }], parentEl: el});
		
		button1 = I.cn('button', null, null, "Hide choice 'France'"); el.appendChild(button1);
		button2 = I.cn('button', null, null, "Show choice 'France'"); el.appendChild(button2);
		button3 = I.cn('button', null, null, "Disable choice 'Spain'"); el.appendChild(button3);
		button4 = I.cn('button', null, null, "Enable choice 'Spain'"); el.appendChild(button4);
		
		logDiv = I.cn('div', null, null, "Log :");
		el.appendChild(logDiv);
		
		field.on('updated', function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
			logDiv.appendChild(I.cn('br'));
		});
		
		
		Y.one(button1).on('click' ,function() {
			
			field.hideChoice({value:'fr'});
			
			logDiv.innerHTML += "[INFO] Hide choice 'France' (current value : "+field.getValue()+")";
			logDiv.appendChild(I.cn('br'));
		});
		
		Y.one(button2).on('click' ,function() {
			
			field.showChoice({value:'fr'});
			
			logDiv.innerHTML += "[INFO] Show choice 'France' (current value : "+field.getValue()+")";
			logDiv.appendChild(I.cn('br'));
		});
		
		Y.one(button3).on('click' ,function() {
			
			field.disableChoice({label:'Spain'});
			
			logDiv.innerHTML += "[INFO] Disable choice 'Spain' (current value : "+field.getValue()+")";
			logDiv.appendChild(I.cn('br'));
		});
		
		Y.one(button4).on('click' ,function() {
			
			field.enableChoice({label:'Spain'});
			
			logDiv.innerHTML += "[INFO] Enable choice 'Spain' (current value : "+field.getValue()+")";
			logDiv.appendChild(I.cn('br'));
		});
		
		}}*/]});