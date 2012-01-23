gI.addExamples("inputex-vector", {
              keyObject: "",list:[{
		title:"Basic VectorField creation",
		description:"Use the following code to create a basic inputEx VectorField.",
		fn:function(parentEl,I){
			var field = new I.VectorField({parentEl: parentEl, value: [-10.4,13*2]});

			var el = document.getElementById(parentEl);

			var button1 = I.cn('button', null, null, "SetValue");
			el.appendChild(button1);
			Y.one(button1).on('click' ,function() {
			   field.setValue([-42.42,12.603]);
			});

			var logDiv = I.cn('div', null, null, "Log :");
			el.appendChild(logDiv);
			field.on('updated', function(value) {
				logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
				logDiv.appendChild(I.cn('br'));
			});
		}},{
		title:"VectorField with separators",
		description:"VectorField inherits CombineField, so you can change the separators :",
		fn:function(parentEl,I){
			new I.VectorField({
				parentEl: parentEl, 
				value: [-10.4,13*2],
				separators: ["x:",", y:", null]
			});
		}},{
		title:"VectorField dimension",
		description:"Set the dimension option :",
		fn:function(parentEl,I){
			new I.VectorField({
				parentEl: parentEl, 
				value: [-1, 0, 1],
				dimension: 3,
				separators: ["x:",", y:", ", z: ", null]
			});
		}}]});