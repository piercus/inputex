gI.addExamples("inputex-file", {
              keyObject: "",list:[{
		title:"File upload",
		description:"To create a file upload form, you must use the 'file' field within a form with the enctype attribute set to 'multipart/form-data'.",
		fn:function(parentEl,I){
			I({
				type: 'form',
				parentEl: parentEl,
				enctype: 'multipart/form-data',
				action: 'input_file.php',
				fields: [
					{type: 'file', name: 'textFile', label:'Search file', accept: 'text/*', size: 50 }
				],
				buttons: [
					{type: 'submit', value: 'Upload'}
				]
			});
		}}]});
