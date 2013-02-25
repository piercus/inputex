gI.addExamples("inputex-timeinterval", {
              keyObject: "",list:[{
		title:"Basic TimeIntervalField creation",
		description:"Use the following code to create a basic inputEx TimeIntervalField.",
		fn:function(parentEl,I){
		var field = new I.TimeIntervalField({parentEl: parentEl, label: 'Length',value:82800});
		var button = I.cn('button', null, null, 'getValue');
		Y.one(button).on('click',function() {
			alert(field.getValue()+" (seconds)");
		});
		document.getElementById(parentEl).appendChild(button);
  }},{
		title:"TimeIntervalField options",
		description:"You can set the <i>fields</i> and <i>separators</i> options of the combine field to customize the field",
		fn:function(parentEl,I){
	  var units = I.TimeIntervalField.units;
	  var unitsStr = I.messages.timeUnits;
	  var n=[]; for(var i=1;i !=30;i++){ n.push(i); }
	  var fields = [
	       {type: 'select', choices: n },
	       {
	          type: 'select',
	          choices: [
					{ value: units.DAY, label: unitsStr.DAY },
					{ value: units.MONTH, label: unitsStr.MONTH },
					{ value: units.YEAR, label: unitsStr.YEAR }
				]
	       }
	    ];

		new I.TimeIntervalField({
			parentEl: parentEl,
			value: 60*24*2, // 2 days 
			unit: I.TimeIntervalField.units.MINUTE,
			label: 'Continue',
			fields: fields,
			separators: ["for ", "  ", false]
		});
  }}]});
