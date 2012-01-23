gI.addExamples("inputex-map", {
              keyObject: "",list:[{
		title:"Virtual Earth MapField creation",
		description:"Use the following code to create a inputEx MapField for Virtual Earth.",
		fn:function(parentEl,I){
			var id = parentEl;
			var api = 'virtualearth';
			var elExample1 = new I.MapField({parentEl: id, name: 'mapField', width: '800px', api: api});

			var elButton1 = I.cn('button', null, null, "getValue");
			Y.one(elButton1).on( 'click', function() {
				alert(Y.JSON.stringify(elExample1.getValue()) );
			});
			Y.one('#'+id).appendChild(elButton1);
		}},{
		title:"Yahoo Maps MapField creation",
		description:"Use the following code to create a inputEx MapField for Yahoo Maps.",
		fn:function(parentEl,I){
			var id = parentEl;
			var api = 'yahoo';
			var elExample2 = new I.MapField({parentEl: id, name: 'mapField', width: '800px', api: api});

			var elButton2 = I.cn('button', null, null, "getValue");
			Y.one(elButton2).on('click', function() {
				alert( Y.JSON.stringify(elExample2.getValue()) );
			});
			Y.one('#'+id).appendChild(elButton2);
		}},{
		title:"Google Maps MapField creation",
		description:"Use the following code to create a inputEx MapField for Google Maps.",
		fn:function(parentEl,I){
			var id = parentEl;
			var api = 'google';
			var elExample3 = new I.MapField({parentEl: id, name: 'mapField', width: '800px', api: api, apikey: "Nk0DZDzV34FM2CIAsdRAtUgQJRSsJO7x2l5tuDBduamC_gZWkzyTEqcUJxAWjtqxs9Wnxb0-"});

			var elButton3 = I.cn('button', null, null, "getValue");
		 Y.one(elButton3).on('click', function() {
				alert( Y.JSON.stringify(elExample3.getValue()) );
			});
			Y.one('#'+id).appendChild(elButton3);
		}},{
		title:"Default MapField creation",
		description:"
	Use the following code to create a inputEx MapField for whatever the default API is.
	We should complete this example by making buttons to change the default and store
	that in cookies.
	",
		fn:function(parentEl,I){
			var id = parentEl;
			var elExample4 = new I.MapField({parentEl: id, name: 'mapField', width: '800px'});

			var elButton4 = I.cn('button', null, null, "getValue");
			Y.one(elButton4).on('click', function() {
				alert( Y.JSON.stringify(elExample4.getValue()) );
			});
			Y.one('#'+id).appendChild(elButton4);
		}}]});