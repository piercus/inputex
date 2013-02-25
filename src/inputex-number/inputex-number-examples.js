gI.addExamples("inputex-number", {
              keyObject: "",list:[{
		title:"Basic NumberField creation",
		description:"Use the following code to create a basic inputEx NumberField.",
		fn:function(parentEl,I){
			field = new I.NumberField({parentEl: parentEl, showMsg: true, value: 0.03});
			var button = I.cn('button', null, null, 'getValue');
			I.on('click',function() {
				alert(field.getValue());
			},button)
			document.getElementById(parentEl).appendChild(button);
		}},{
		title:"Supported format",
		description:"Everything accepted by parseFloat is valid.",
		fn:function(parentEl,I){
			field2 = new I.NumberField({parentEl: parentEl, showMsg: true, value: '03e-2', required:true, typeInvite:"Float numbers accepted"});
			var button = I.cn('button', null, null, 'getValue');
			I.on('click',function() {
				alert(field2.getValue());
			},button)
			document.getElementById(parentEl).appendChild(button);
		}},{
		title:"Min &amp; Max",
		description:"Check a minimum or a maximum value",
		fn:function(parentEl,I){
            field3 = new I.NumberField({parentEl: parentEl, showMsg: true, min:-15, max:'1e3', typeInvite:"Numbers between -15 and 1e3 (1000) only", size:40});
			   var button = I.cn('button', null, null, 'getValue');
			   I.on('click',function() {
			      alert(field3.getValue());
			   },button)
			   document.getElementById(parentEl).appendChild(button);
		}}]});
