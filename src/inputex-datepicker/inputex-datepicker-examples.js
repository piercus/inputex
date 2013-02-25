gI.addExamples("inputex-datepicker", {
              keyObject: "",list:[{
		title:"Basic DatePickerField creation",
		description:"Use the following code to create a basic inputEx DatePickerField.",
		fn:function(parentEl,I){
			new I.DatePickerField({parentEl: parentEl});
		}},{
		title:"Change DatePickerField date format",
		description:"Use the following code to select another date format",
		fn:function(parentEl,I){
			new I.DatePickerField({parentEl: parentEl, value: new Date(1984,0,6), dateFormat: 'd/m/Y'});
		}},{
		title:"DatePickerField Updated event",
		description:"Listening for the updated event",
		fn:function(parentEl,I){
			var datepicker = new I.DatePickerField({parentEl: parentEl, value: new Date(), dateFormat: 'd/m/Y'});
			datepicker.on('updated', function(value) {
				document.getElementById(parentEl).appendChild( I.cn('div',null,null, value) );
			});
		}},{
		title:"Use a string input/output formatting",
		description:"The setValue/getValue methods will parse/format the dates to the <i>valueFormat</i> option.",
		fn:function(parentEl,I){
			var datepicker2 = new I.DatePickerField({parentEl: parentEl, value: new Date(), valueFormat: 'Y-m-d', value: '2009-01-01'});
			datepicker2.on('updated', function(value) {
				document.getElementById(parentEl).appendChild( I.cn('div',null,null, value) );
			});
		}},{
		title:"Disable DatePicker",
		description:"Disable method",
		fn:function(parentEl,I){
			var f = new I.DatePickerField({parentEl: parentEl});
			
			var exampleDiv = document.getElementById(parentEl);
			
			var button1 = I.cn('button', null, null, 'disable()');
			exampleDiv.appendChild(button1); 
			Y.one(button1).on('click', function() { f.disable(); });

			var button2 = I.cn('button', null, null, 'enable()');
			exampleDiv.appendChild(button2); 
			Y.one(button2).on('click', function() { f.enable(); });
			
		}},{
		title:"Disable readonly option",
		description:"If you want to let users enter the date manually",
		fn:function(parentEl,I){
			new I.DatePickerField({parentEl: parentEl, readonly: false, showMsg: true});
		}}]});
