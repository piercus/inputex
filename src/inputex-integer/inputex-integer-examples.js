gI.addExamples("inputex-integer", {
              keyObject: "",list:[{
		title:"Basic IntegerField creation",
		description:"Use the following code to create a basic inputEx IntegerField.",
		fn:function(parentEl,I){
			var field = new I.IntegerField({parentEl: parentEl, showMsg: true});
			field.on('updated', function(value) {
				document.getElementById(parentEl).innerHTML = "value: "+value+", type: "+typeof(value);
			});
		}},{
		title:"IntegerField with options",
		description:"Test IntegerField with more options.",
		fn:function(parentEl,I){
			var field = new I.IntegerField({parentEl: parentEl, showMsg: true, required:true, typeInvite:"Enter a number", trim: true});
			field.on('updated', function(value) {
				document.getElementById(parentEl).innerHTML = "value: "+value+", type: "+typeof(value);
			});
		}},{
		title:"Negative values",
		description:"Set the negative attribute to true if you allow negative values.",
		fn:function(parentEl,I){
			new I.IntegerField({parentEl: parentEl, showMsg: true, required:true, negative:true});
		}},{
		title:"Min &amp; Max",
		description:"Check values are within a range",
		fn:function(parentEl,I){
			new I.IntegerField({parentEl: parentEl, showMsg: true, min:3, max:10, typeInvite:"Integers between 3 and 10 only", size:30});
		}}]});