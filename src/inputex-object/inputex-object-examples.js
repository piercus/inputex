gI.addExamples("inputex-object", {
              keyObject: "",list:[{
		title:"Basic ObjectField creation",
		description:"Use the following code to create a basic inputEx ObjectField.",
		fn:function(parentEl,I){
			var f = new I.ObjectField({parentEl: parentEl, showMsg: true});
			
			var el = document.getElementById(parentEl)._node;
			var logDiv = I.cn('div', null, null, "Log :"); 
      el.appendChild(logDiv); 
      f.on("updated",function(value) { 
          logDiv.innerHTML += "Updated at "+(new Date())+" with value: "+Y.JSON.stringify(value)+"&lt;br /&gt;"; 
      });
			
		}}]});