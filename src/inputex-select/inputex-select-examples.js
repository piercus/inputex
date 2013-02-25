gI.addExamples("inputex-select", {
              keyObject: "",list:[{
		title:"Basic SelectField creation",
		description:"Use the following code to create a basic inputEx SelectField.",
		fn:function(parentEl,I){
			new I.SelectField({
				name: 'country',
				choices: [                                     
					{ value: 'United States of America' },  
					{ value: 'France' }                     
				],                                         
				parentEl: parentEl
			});                                    
	}},{
		title:"Differentiate choices' labels and values",
		description:"Use the following code to create choices with labels different from values",
		fn:function(parentEl,I){
			new I.SelectField({
				label: 'Where are you from ?',
				name: 'country',
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
		var el = document.getElementById(parentEl);
		var field2 = new I.SelectField({ name: 'country', label: 'Where are you from ?', choices: [{ value: 'us', label: 'United States of America' }, { value: 'fr', label: 'France' }], parentEl: el });
		
		var button = I.cn('button', null, null, "SetValue with 'us'");
		var val = 'us';
		el.appendChild(button);
		I.on( "click" ,function() {
		   field2.setValue(val);
		   val = (val == 'fr') ? 'us' : 'fr';
		   button.innerHTML = "SetValue with '"+val+"'";
		},button);

		var logDiv = I.cn('div', null, null, "Log :");
		el.appendChild(logDiv);
		field2.on("updated",function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
			logDiv.appendChild(I.cn('br'));
		});
		}},{
		title:"addChoice",
		description:"Add choices dynamically",
		fn:function(parentEl,I){
         	var el = document.getElementById(parentEl);
			var field3 = new I.SelectField({name: 'country', choices: [{ value: 'United States of America' }, { value: 'France' }], parentEl: el});

			var button1 = I.cn('button', null, null, "Add 'Spain' choice (and select 'Spain')");
			I.on("click" ,function() {
			   field3.addChoice({value:"Spain",selected:true});
			   button1.disabled = true;
			},button1)

			var button2 = I.cn('button', null, null, "Add 'United Kingdom' choice (value : 'uk'), in position 1");
			I.on("click" ,function() {
			   field3.addChoice({value:"uk",label:"United Kingdom",position:1});
			   button2.disabled = true;
			},button2);

			var button3 = I.cn('button', null, null, "Add 'Sweden' choice after 'France' choice");
			I.on("click" ,function() {
			   field3.addChoice({value:"Sweden",after:"France"});
			   button3.disabled = true;
			},button3);

			el.appendChild(button1);
			el.appendChild(button2);
			el.appendChild(button3);

			var logDiv3 = I.cn('div', null, null, "Log : ");
			el.appendChild(logDiv3);
			field3.on("updated",function(value) {
				logDiv3.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv3.appendChild(I.cn('br'));
			});
		}},{
		title:"removeChoice",
		description:"Remove choices dynamically",
		fn:function(parentEl,I){
			var el = document.getElementById(parentEl);
			var field4 = new I.SelectField({
				name: 'country',
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
			
			var button4 = I.cn('button', null, null, "Remove 'Spain' choice (by label)");
			I.on("click" ,function() {
			   field4.removeChoice({label:"Spain"});
			   button4.disabled = true;
			},button4);

			var button5 = I.cn('button', null, null, "Remove 'United Kingdom' choice (by value)");
			I.on( "click" ,function() {
			   field4.removeChoice({value:"uk"});
			   button5.disabled = true;
			},button5);

			var button6 = I.cn('button', null, null, "Remove 'Germany' choice (by position)");
			I.on("click" ,function() {
			   field4.removeChoice({position:1});
			   button6.disabled = true;
			},button6) ;

			el.appendChild(button4);
			el.appendChild(button5);
			el.appendChild(button6);

			var logDiv4 = I.cn('div', null, null, "Log : ");
			el.appendChild(logDiv4);
			field4.on("updated",function(value) {
				logDiv4.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv4.appendChild(I.cn('br'));
			});
		}},{
		title:"Hide / Show / Disable / Enable choice",
		description:"Hide, show, disable or enable an choice in the selector, without removing it totally, and keeping the original choice's order",
		fn:function(parentEl,I){
		var el = document.getElementById(parentEl);
		var field5 = new I.SelectField({name: 'country', choices: [ { value: 'usa', label: 'United States of America' }, { value: 'fr', label: 'France' }, { value: 'es', label: 'Spain' }], parentEl: el});
		
		var button7 = I.cn('button', null, null, "Hide choice 'France'");
		el.appendChild(button7);
		var button8 = I.cn('button', null, null, "Show choice 'France'");
		el.appendChild(button8);
		var button9= I.cn('button', null, null, "Disable choice 'Spain'");
		el.appendChild(button9);
		var button10 = I.cn('button', null, null, "Enable choice 'Spain'");
		el.appendChild(button10);
		
		var logDiv5 = I.cn('div', null, null, "Log :");
		el.appendChild(logDiv5);
		field5.on("updated",function(value) {
			logDiv5.innerHTML += "Updated at "+(new Date())+" with value "+value;
			logDiv5.appendChild(I.cn('br'));
		});
		
		
		I.on("click" ,function() {
			
			field5.hideChoice({value:'fr'});
			
			logDiv5.innerHTML += "[INFO] Hide choice 'France' (current value : "+field5.getValue()+")";
			logDiv5.appendChild(I.cn('br'));
		},button7) ;
		
		I.on("click" ,function() {
			
			field5.showChoice({value:'fr'});
			
			logDiv5.innerHTML += "[INFO] Show choice 'France' (current value : "+field5.getValue()+")";
			logDiv5.appendChild(I.cn('br'));
		},button8);
		
		I.on("click" ,function() {
			
			field5.disableChoice({label:'Spain'});
			
			logDiv5.innerHTML += "[INFO] Disable choice 'Spain' (current value : "+field5.getValue()+")";
			logDiv5.appendChild(I.cn('br'));
		},button9);
		
		I.on("click" ,function() {
			
			field5.enableChoice({label:'Spain'});
			
			logDiv5.innerHTML += "[INFO] Enable choice 'Spain' (current value : "+field5.getValue()+")";
			logDiv5.appendChild(I.cn('br'));
		},button10);
		
		}}]});
