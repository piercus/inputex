gI.addExamples("inputex-checkbox", {
              keyObject: "CheckBoxField",
        list:[{
		title:"Basic CheckBox creation",
		description:"Use the following code to create a basic inputEx CheckBox.",
		fn:function(parentEl,I){
			new I.CheckBox({parentEl: parentEl});
		}},{
		title:"With a label",
		description:"Add the label",
		fn:function(parentEl,I){
			new I.CheckBox({label: 'Do you like I ?', rightLabel: 'Check me !', parentEl: parentEl, value: false});
		}},{
		title:"Default returned values",
		description:"In its simplest form, the CheckBox returns <i>true</i> if checked, <i>false</i> otherwise.",
		fn:function(parentEl,I){			
			var field1 = new I.CheckBox({rightLabel: 'I return true/false', parentEl: parentEl});
			
			Y.Node.create("<button>getValue()</button>").appendTo('#container3').on('click', function() {
				alert( field1.getValue() );
			});
		}},{
		title:"Changing the returned values",
		description:"You can return different values if needed.",
		fn:function(parentEl,I){

var field2 = new I.CheckBox({sentValues: ['Yes', 'No'], rightLabel: 'Do you agree ?', parentEl: parentEl, value: 'Yes'});


Y.Node.create("<button>getValue()</button>").appendTo('#container4').on('click', function() {
  alert( field2.getValue() );
});

Y.Node.create("<button>setValue('No')</button>").appendTo('#container4').on('click', function() {
  field2.setValue('No');
});

Y.Node.create("<button>setValue('Yes')</button>").appendTo('#container4').on('click', function() {
  field2.setValue('Yes');
});

		}},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
			var el = document.getElementById(parentEl);
			var field = new I.CheckBox({parentEl: el });
			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value : "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"Disabling checkboxes",
		description:"How to enable/disable a checkbox :",
		fn:function(parentEl,I){
					var dc = new I.CheckBox({label: 'Disable', parentEl: parentEl});
					dc.disable();
		}}]});