gI.addExamples("inputex-date", {
              keyObject: "",list:[{
		title:"Basic DateField creation",
		description:"Use the following code to create a basic inputEx DateField.",
		fn:function(parentEl,I){
			new I.DateField({parentEl: parentEl, value: new Date(), showMsg: true});
		}},{
		title:"Change date format",
		description:"Set the formatDate to your localized date format ! Here is the french format :",
		fn:function(parentEl,I){
			new I.DateField({dateFormat: 'd/m/Y', value: '27/03/2008', parentEl: parentEl, showMsg: true});
		}},{
		title:"Updated event and return value",
		description:"The DateField returns a javascript Date object instance :",
		fn:function(parentEl,I){
			var exampleDiv = document.getElementById(parentEl);
			var dateField = new I.DateField({value: new Date(),  parentEl: exampleDiv, showMsg: true, required:true, typeInvite:'m/d/Y'}); 
			dateField.on('updated', function(val) {
				exampleDiv.appendChild( I.cn('div', null, null, val) ); 
			});

			var button1 = I.cn('button', null, null, 'setValue()');
			exampleDiv.appendChild(button1); 
			Y.one(button1).on('click', function() { dateField.setValue("11/26/1980"); });

			var button2 = I.cn('button', null, null, 'getValue()');
			exampleDiv.appendChild(button2); 
			Y.one(button2).on('click', function() { alert(dateField.getValue()); });
		}},{
		title:"Use a string input/output formatting",
		description:"The setValue/getValue methods will parse/format the dates to the <i>valueFormat</i> option.",
		fn:function(parentEl,I){
			
			// Instantiate the date field
			var stringdateField = new I.DateField({value: new Date(),  parentEl: parentEl, showMsg: true, required:true, typeInvite:'m/d/Y', valueFormat: 'Y-m-d'}); 
			
			// Logger
			var exampleDiv = document.getElementById(parentEl);
			stringdateField.on('updated', function(val) {
				exampleDiv.appendChild( I.cn('div', null, null, val) ); 
			});

			// Set the value according to the valueFormat
			var button1 = I.cn('button', null, null, 'setValue()');
			exampleDiv.appendChild(button1); 
			Y.one(button1).on('click', function() { stringdateField.setValue("1980-11-16"); });

			// The returned value will use the valueFormat too
			var button2 = I.cn('button', null, null, 'getValue()');
			exampleDiv.appendChild(button2); 
			Y.one(button2).on('click', function() { alert(stringdateField.getValue()); });
		}}]});