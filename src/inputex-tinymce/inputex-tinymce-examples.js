gI.addExamples("inputex-tinymce", {
              keyObject: "",list:[{
		title:"Important Notice :",
		description:"TinyMCE is not included in the inputEx distribution ! <br>
		Download it on <a href='http://tinymce.moxiecode.com/'>http://tinymce.moxiecode.com/</a> (tested with version 3.3.7) and install it in lib/tiny_mce",
		fn:function(parentEl,I){}},{
		title:"Basic TinyMCEField creation",
		description:"Use the following code to create a basic inputEx TinyMCEField.",
		fn:function(parentEl,I){
			new I.TinyMCEField({parentEl: parentEl, name: 'rteField', value: String.fromCharCode(60)+"b"+String.fromCharCode(62)+"I'm"+String.fromCharCode(60)+"/b"+String.fromCharCode(62)+" the default value. I've been set through the value option."});
		}},{
		title:"TinyMCEField setValue/getValue",
		description:"Test for setValue/getValue using the TinyMCEField.",
		fn:function(parentEl,I){
			var div = document.getElementById(parentEl);
			var htmlField = new I.TinyMCEField({parentEl: div, name: 'test2'});

			var button1 = I.cn('button', null, null, "SetValue");
			div.appendChild(button1);
			Y.one(button1).on('click' ,function() { 
				htmlField.setValue('TinyMCEField can contain HTML !'); 
			});
			var button2 = I.cn('button', null, null, "GetValue");
			div.appendChild(button2);
			Y.one(button2).on('click' ,function() { 
				alert(htmlField.getValue());
			});
		}},{
		title:"Using the SimpleEditor",
		description:"Use the following code to create a SimpleEditor widget",
		fn:function(parentEl,I){
			var field3 = new I.TinyMCEField({parentEl: parentEl, name: 'rteField3'});
			field3.setValue("Value set just after init...");
		}},{
		title:"Changing the config",
		description:"You can have access to all the tinymce config options through the 'opts' attribute. Check out the <a href='http://tinymce.moxiecode.com/examples/full.php'>TinyMCE examples</a> for all options.",
		fn:function(parentEl,I){
			var field4 = new I.TinyMCEField({
			  parentEl: parentEl, 
			  name: 'rteField4',
			  
			  opts: {
      		mode : "textareas",
      		//language : "fr",
      		height: "400",
      		width: "400"
      	}
			});
			field4.setValue("Value set just after init...");
		}}]});