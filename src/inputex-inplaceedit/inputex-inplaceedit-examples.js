gI.addExamples("inputex-inplaceedit", {
              keyObject: "",list:[{
		title:"Basic InPlaceEdit creation",
		description:"Use the following code to create a basic inputEx InPlaceEdit.",
		fn:function(parentEl,I){
			new I.InPlaceEdit({parentEl: parentEl, editorField:{type:'string'}, animColors:{from:"#FFFF99" , to:"#DDDDFF"} });
		}},{
		title:"Complex group example",
		description:"Combine InPlaceEdit and groups",
		fn:function(parentEl,I){
			new I.InPlaceEdit({
				parentEl: parentEl, 
				editorField:{
					type:'group', 
					fields: [
						{ label: 'Firstname',name: 'firstname' },
						{ label: 'Lastname', name: 'lastname' },
						{ type:'url', label: 'Photo', name:'picUrl', favicon: false }
					]
				},
				visu: {visuType: 'func', func: function(val) {
					if( Y.Lang.isUndefined(val) ) return I.messages.emptyInPlaceEdit;
					return '<img src="'+val.picUrl+'" style="width: 128px; height: 128px;"><br><b>'+val.firstname+' '+val.lastname+'</b>';
				}},
				value: {
						firstname: 'Lena',
						lastname: 'Idontknow',
						picUrl: 'http://www.limsi.fr/Individu/vezien/lena.jpg'
				}
			});
		}},{
		title:"Getting the value",
		description:"When the editor is opened, getValue return the editor value.",
		fn:function(parentEl,I){
			var field = new I.InPlaceEdit({parentEl: parentEl, editorField:{type:'string'} });
			var button = I.cn('button', null, null, "getValue");
			Y.one(button).on('click', function() {
				alert(field.getValue());
			});
			document.getElementById(parentEl).appendChild(button);
		}},{
		title:"Image url from a dropdown menu",
		description:"",
		fn:function(parentEl,I){
			I({
				type: 'inplaceedit',
				parentEl: parentEl, 
				label: "PageRank",
				editorField:{
					type:'select', 
					name: 'pagerank',
					choices: ['0','1','2','3','4','5','6','7','8','9','10']
				},
				visu: {
					visuType: 'func', 
					func: function(val) {
						return I.cn('img',{src: "http://www.page-rank-lookup.com/i/style1/pagerank"+val+".png"});
					}
				},
				value: '5'
			});
		}}]});