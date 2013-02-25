gI.addExamples("inputex-uneditable", {
              keyObject: "",list:[{
		title:"UneditableField with HTML string",
		description:"To format the value of the field with an html string, use the <i>formatValue</i> function (schould return a string):",
		fn:function(parentEl,I){
			new I.UneditableField({
				name: 'date', 
				value: new Date(), 
				parentEl: parentEl
			});
		}},{
		title:"UneditableField with DOM rendering",
		description:"To render the value of the field with a DOM element (to add a behaviour), use the <i>formatDom</i> function (schould return a dom element):",
		fn:function(parentEl,I){
			new I.UneditableField({
				name: 'date', 
				value: 'http://farm2.static.flickr.com/1052/913643741_a83000f8e4.jpg', 
				visu: {
					visuType: 'func', 
					func: function(value){ return I.cn('img',{src:value},{border: '2px solid black'}); } 
				},
				parentEl: parentEl 
			});
		}},{
		title:"UneditableField with DOM rendering",
		description:"Display an image from the field value :",
		fn:function(parentEl,I){
			I({
				type: "uneditable",
				name: 'pagerank', 
				value: 5, 
				label: "Pagerank",
				visu: {visuType: 'func', func: function(value){ return I.cn('img',{src: "http://www.page-rank-lookup.com/i/style1/pagerank"+value+".png"}) } },
				parentEl: parentEl
			});
		}}]});
