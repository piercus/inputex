gI.addExamples("inputex-multiautocomplete", {
              keyObject: "",list:[{
		title:"Basic MultiAutoComplete creation",
		description:"Use the following code to create a basic inputEx MultiAutoComplete. (note: this example doesn't work offline)",
		fn:function(parentEl,I){
      var field = new I.MultiAutoComplete({
        parentEl: parentEl, 
        label: 'Search US state',

        // autocompleter options
        autoComp: {
          source: ["aaa","bbb","cccc","ccc","dddddd"],
          minQueryLength: 2,
          maxResultsDisplayed: 50
        }
		  });

		var logDiv = I.cn('div', null, null, "");
		document.getElementById(parentEl).appendChild(logDiv);

		field.on("updated",function(v) {
			var value = Y.JSON.stringify(v);
			logDiv.appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
  }}]});
