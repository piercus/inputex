gI.addExamples("inputex-menu", {
              keyObject: "",list:[{
		title:"Basic MenuField creation",
		description:"Use the following code to create a basic inputEx MenuField.",
		fn:function(parentEl,I){
		   var menuItems = [
			   {
				   text:'America',
				   submenu:{
					   itemdata:[
							{text:'United States of America',value:'Us'},
							{text:'Canada',value:'Ca'}
						]
					}
			   },
				{
				   text:'Europe',
				   submenu:{
					   itemdata:[
							{
								text:'Western Europe',
								submenu:{
								   itemdata:[
										{text:'France',value:'Fr'},
										{text:'United Kingdom',value:'Uk'},
										{text:'Germany',value:'De'}
									]
								}
							},
							{
								text:'Eastern Europe',
								submenu:{
								   itemdata:[
										{text:'Poland',value:'Pl'},
										{text:'Czech Republic',value:'Cz'},
										{text:'Slovakia',value:'Sk'}
									]
								}
							}
						]
					}
			   },
			   {
					text:'Africa',
				   submenu:{
					   itemdata:[
							{text:'Senegal',value:'Sn'},
							{text:'Madagascar',value:'Mg'}
						]
					}
				}
		   ];

			new I.MenuField({
				parentEl: parentEl,
				name: 'country',
				label: 'Your Country:',
				menuItems: menuItems
			});
		}},{
		title:"Test with more options",
		description:"Menu triggered on hover, displayed below the text invite, etc.",
		fn:function(parentEl,I){
		var menuItems2 = [
		   {
			   text:'America',
			   submenu:{
				   itemdata:[
						{text:'United States of America',value:'Us'},
						{text:'Canada',value:'Ca'}
					]
				}
		   },
			{
			   text:'Europe',
			   submenu:{
				   itemdata:[
						{
							text:'Western Europe',
							submenu:{
							   itemdata:[
									{text:'France',value:'Fr'},
									{text:'United Kingdom',value:'Uk'},
									{text:'Germany',value:'De'}
								]
							}
						},
						{
							text:'Eastern Europe',
							submenu:{
							   itemdata:[
									{text:'Poland',value:'Pl'},
									{text:'Czech Republic',value:'Cz'},
									{text:'Slovakia',value:'Sk'}
								]
							}
						}
					]
				}
		   },
		   {
				text:'Africa',
			   submenu:{
				   itemdata:[
						{text:'Senegal',value:'Sn'},
						{text:'Madagascar',value:'Mg'}
					]
				}
			}
	   ];

		var div = document.getElementById(parentEl);

		var f = new I.MenuField({
			parentEl: parentEl,
			name: 'country',
			label: 'Your Country:',
			required: true,
			typeInvite: 'Hover this text to select a country',
			menuTrigger: 'mouseover',
			menuPosition: ['tr','br'],
			menuItems: menuItems2
		});

		var logDiv = I.cn('div', null, null, "Log :");
		div.appendChild(logDiv);
		f.on('updated', function(value) {
			logDiv.innerHTML += "Updated at "+(new Date())+" with value "+value;
					logDiv.appendChild(I.cn('br'));
		});

		var button1 = I.cn('button', null, null, "SetValue with 'Fr' (France)");
		div.appendChild(button1);
		Y.one(button1).on('click' ,function() { 
			f.setValue("Fr"); 
		});
		var button2 = I.cn('button', null, null, "SetValue with empty string");
		div.appendChild(button2);
		Y.one(button2).on('click' ,function() { 
			f.setValue('');
		});

		var button3 = I.cn('button', null, null, "GetValue");
		div.appendChild(button3);
		Y.one(button3).on('click' ,function() { 
			alert(f.getValue());
		});

		var button4 = I.cn('button', null, null, "Clear");
		div.appendChild(button4);
		Y.one(button4).on('click' ,function() { 
			f.clear();
		});
		}}]});
