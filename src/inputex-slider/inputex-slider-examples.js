gI.addExamples("inputex-slider", {
              keyObject: "",list:[{
		title:"Basic SliderField creation",
		description:"A simple SliderField instance",
		fn:function(parentEl,I){
			sliderField = new I.SliderField({parentEl: parentEl});
		}},{
		title:"Updated Event",
		description:"The updated event",
		fn:function(parentEl,I){
			var el = document.getElementById(parentEl);
			var field = new I.SliderField({parentEl: el, displayValue: false}); 
			var logDiv = I.cn('div', null, null, "Log :"); 
			el.appendChild(logDiv); 
			field.on('updated', function(value) { 
			    logDiv.innerHTML += "Updated at "+(new Date())+" with value: "+value+"<br>";
			});
		}},{
		title:"Boundaries",
		description:"WARNING: this feature does NOT work (click the button)",
		fn:function(parentEl,I){
			new I.SliderField({parentEl: parentEl, minValue: 50, maxValue: 500});
		}}]});