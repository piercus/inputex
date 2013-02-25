gI.addExamples("inputex-hidden", {
              keyObject: "",list:[{
		title:"Basic HiddenField creation",
		description:"The hidden field is by definition 'invisible', so there isn't a lot to see. However, it can be useful to keep an id :",
		fn:function(parentEl,I){
		var exampleDiv = document.getElementById(parentEl);
		var group = new I.Group({
			 	fields: [ 
					{ type: 'hidden', name: 'id', value: 12 },
					{ type: 'hidden', name: 'lastname', value: 'Scott' },
					{ type: 'string', name: 'firstname', label: 'Firstname', required: true, value:'James'}
				], 
				parentEl: exampleDiv
		});
		var button=I.cn('button',null,null, 'Get Value'); 
		exampleDiv.appendChild(button); 
		I.on('click', function(){ alert(Y.JSON.stringify(group.getValue()) ); },button)
		}}]});
