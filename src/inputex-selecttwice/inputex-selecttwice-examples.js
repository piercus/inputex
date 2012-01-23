gI.addExamples("inputex-selecttwice", {
              keyObject: "",list:[{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
		var el = document.getElementById(parentEl);
		
		var field1 = new I.SelectTwiceField({
			name: 'car',
			label: 'Which car ?',
			choices: [
				{ value: "", choices: [""] },
				{ value: "BMW Z Series", choices: ["Z1", "Z3", "Z4", "Z8"] },
				{ value: "MINI", choices: ["One", "Cooper S", "Cooper D", "Clubman", "John Cooper Works"] }
			],
			parentEl: el,
			required: true
		});
		
		var button = I.cn('button', null, null, "SetValue with 'MINI_One'");
		el.appendChild(button);
		Y.one(button).on('click' ,function() {
		   field1.setValue('MINI_One');
		});
		
		var logDiv = I.cn('div', null, null, "Log :");
		el.appendChild(logDiv);
		field1.on('updated', function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
			logDiv.appendChild(I.cn('br'));
		});
		}}]});