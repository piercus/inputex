gI.addExamples("inputex-ratingstars", {
              keyObject: "",list:[{
		title:"Basic RatingStars creation",
		description:"Use the following code to create a basic inputEx SelectField.",
		fn:function(parentEl,I){
			new I.RatingStars({
				name: 'star1',
        averageValue: 4.5,
				parentEl: parentEl
			});
		}},{
		title:"Change the number of stars",
		description:"Use the following code to change the number of stars",
		fn:function(parentEl,I){
			new I.RatingStars({
				label: 'Rate this one !',
				name: 'star1bis',
        averageValue: 2.3, 
        nStars: 8,  
        nRates: 25,
				parentEl: 'container1bis'
			});
		}},{
		title:"Change the message under the field",
		description:"Use the following code to change the message field",
		fn:function(parentEl,I){
			new I.RatingStars({
				name: 'star2',
        averageValue: 2.3, 
        nRates: 30,
        parentEl: parentEl,
				message : 'Yo!, average Rate is %, % ratings have been made'
			});
		}},{
		title:"Display Messages on mouseOver",
		description:"Use the following code to change the message field",
		fn:function(parentEl,I){
			new I.RatingStars({
				name: 'star2',
        averageValue: 2.3, 
        nStars: ["Not Cool","Half-Cool","Cool","Super Cool","Coolest Ever"],
        nRates: 30,
        parentEl: parentEl
			});
		}},{
		title:"StandAlone Form ",
		description:"Use the following code to make a configurable form that send rates with ajax",
		fn:function(parentEl,I){
			new I.RatingStarsForm({
          ratingStarsOptions: {
				    name: 'star',
            averageValue: 2.3, 
            nStars: ["Not Cool","Half-Cool","Cool","Super Cool","Coolest Ever"],
            nRates: 30        
          },
          parentEl: parentEl,
          ajax: { 
    	      method: 'POST', 
    	      uri: 'default.php'          
          } 
			});
		}},{
		title:"Display Messages on disabled",
		description:"Use the following code to display a disable Message",
		fn:function(parentEl,I){
			new I.RatingStars({
				name: 'star3',
        averageValue: 2.3, 
        disabled: true,
        disableMessage: "sorry the stars are disabled",
        nRates: 30,
        parentEl: parentEl
			});
		}}]});