gI.addExamples("inputex-multiautocompletecustom", {
              keyObject: "",list:[{
		title:"Basic MultiAutoCompleteCustom creation",
		description:"Use the following code to create a basic inputEx MultiAutoComplete. (note: this example doesn't work offline)",
		fn:function(parentEl,I){
      var field = new I.MultiAutoCompleteCustom(	{
				      label: 'Tags',
				      parentEl: parentEl,
				      maxItems:6,
				      uniqueness: true,
				      maxItemsAlert:function(){alert("You're limited to 6 tags")},
				      // autocompleter options
				      autoComp: {
				        forceSelection: true,
				        minQueryLength: 2,
				        maxResultsDisplayed: 50,
				        source: ["tag1","tag2","tag4","tag25"]
				      }
				    });

		var logDiv = I.cn('div', null, null, "");
		document.getElementById(parentEl).appendChild(logDiv);

		field.on("updated",function(v) {
			var value = Y.JSON.stringify(v);
			logDiv.appendChild( I.cn('div',null,null,"Updated at "+(new Date())+" "+value) );
		});
  }}]});