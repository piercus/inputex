gI.addExamples("inputex-color", {
              keyObject: "",list:[{
		title:"Basic ColorField creation",
		description:"Use the following code to create a basic inputEx ColorField.",
		fn:function(parentEl,I){
			new I.ColorField({parentEl: parentEl, label: 'Choose a color', description: 'Click to view the available colors'});
		}},{
		title:"Updated event",
		description:"How to listen to the updated event :",
		fn:function(parentEl,I){
			var el = document.getElementById(parentEl);
			var field = new I.ColorField({parentEl: el });
			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated', function() {
				logDiv.innerHTML += "Updated at "+(new Date());
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"Setting the color",
		description:"The usual 'value' parameter:",
		fn:function(parentEl,I){
			new I.ColorField({parentEl: parentEl, value: '#ADC2FF'});
		}},{
		title:"Using a different palette",
		description:"You can choose another predefined palette, or a set of custom colors.",
		fn:function(parentEl,I){
			new I.ColorField({parentEl: parentEl, palette:1, label:"Palette 1"});
			new I.ColorField({parentEl: parentEl, palette:2, label:"Palette 2", cellPerLine:5});
			new I.ColorField({parentEl: parentEl, palette:3, label:"Palette 3", cellPerLine:10});
			new I.ColorField({parentEl: parentEl, palette:4, label:"Palette 4", cellPerLine:9});
			new I.ColorField({parentEl: parentEl, palette:5, label:"Palette 5"});
			new I.ColorField({parentEl: parentEl, palette:6, label:"Palette 6"});
			new I.ColorField({parentEl: parentEl, label:"Custom colors", colors:["#D0D0D0","#31A8FA","#8EC1E5","#58D7CF","#89E2BB","#A7F7F8","#F6B77C","#FE993F","#EEEEEE","#84CBFC","#BCDAF0","#9BE7E3","#B9EED7","#CBFBFB","#FAD4B1","#FFC28C","#FE6440","#F56572","#FA9AA3","#F7B1CA","#E584AF","#D1C3EF","#AB77B8","#C69FE7","#FFA28D","#F9A3AB","#FCC3C8","#FBD1E0","#F0B6CF","#E4DBF6","#CDAED5","#DDC6F1"]});
		}}]});
