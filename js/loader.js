YUI().use(function(Y) {

	/**
 	 * YUI 3 module metadata
	 */
	var CONFIG = {
		groups: {
			'inputex': {
				base: 'inputex/',
				combine: false,
				modules: {
					'cssinputex-ie6': {
					   type: 'css',
   					path: 'css/inputEx-IE6.css',
   					condition:{
   					   when: 'after',
   					   trigger: 'cssinputex',
   					   test: function() {
   					      return !!Y.UA.ie && Y.UA.ie <= 6;
   					   }
   					}
					},
					'cssinputex': {
						type: 'css',
						path: 'css/inputEx.css',
						requires: ['cssreset', 'cssfonts']
					},
				   'inputex': {
				   	path: 'js/inputex.js',
				      requires: ['cssinputex', 'node','intl'],
				      lang: ['en','fr','de','es','fr','it','nl']
				   },
					// inputEx base
					'inputex-field': {
						path: 'js/Field.js',
						requires: ['inputex']
					},
					'inputex-visus': {
					  	path: 'js/Visus.js',
						requires: ['inputex','dump']
					},
					'inputex-jsonschema': {
						path: 'js/json-schema.js',
						requires: ['inputex']
					},
					// RPC
					'inputex-rpc': {
						path: 'js/rpc/inputex-rpc.js',
						requires: ['json','inputex','yui2-connection','inputex-jsonschema']
					},
					'inputex-smdtester': {
						path: 'js/rpc/smdTester.js',
						requires: ['inputex-rpc', 'inputex-jsontreeinspector']
					},
					// Mixins
					'inputex-choice': {
						path: 'js/mixins/choice.js',
						requires: ['inputex']
					},
					// Widgets
					'inputex-ddlist': {
						path: 'js/widgets/ddlist.js',
						requires: ['inputex', 'dd','event-custom']
					},
					'inputex-dialog': {
						path: 'js/widgets/Dialog.js',
						requires: ['inputex-form', 'yui2-dragdrop', 'yui2-container']
					},
					'inputex-datatable': {
						path: 'js/widgets/DataTable.js',
						requires: ['yui2-datatable', 'yui2-button','inputex', 'inputex-dialog']
					},
					'inputex-dtinplaceedit': {
						path: 'js/widgets/dtInPlaceEdit.js',
						requires: ['inputex-datatable']
					},
					'inputex-jsontreeinspector': {
					  	path: 'js/widgets/json-tree-inspector.js',
					  	requires: ['inputex']
					},
					'inputex-button': {
					  	path: 'js/widgets/Button.js',
					   requires: ['inputex']
					},
					// MetaFields
					'inputex-group': {
						path: 'js/Group.js',
						requires: ['inputex-field'],
						ix_provides: 'group'
					},
					'inputex-form': {
						path: 'js/Form.js',
						requires: ['inputex-group','inputex-button'],
						ix_provides: 'form'
					},
					'inputex-list': {
						path: 'js/fields/ListField.js',
						requires: ['inputex-field','anim'],
						ix_provides: 'list'
					},
					'inputex-tree': {
						path: 'js/fields/TreeField.js',
						requires: ['inputex-string', 'inputex-list','inputex-inplaceedit'],
						ix_provides: 'tree'
					},
					'inputex-combine': {
						path: 'js/fields/CombineField.js',
						requires: ['inputex-group'],
						ix_provides: 'combine'
					},
					'inputex-inplaceedit': {
						path: 'js/fields/InPlaceEdit.js',
						requires: ['inputex-field', 'inputex-button', 'anim','inputex-visus'],
						ix_provides: 'inplaceedit'
					},
					'inputex-lens': {
						path: 'js/fields/Lens-beta.js',
						requires: ['inputex-group','inputex-inplaceedit'],
						ix_provides: 'lens'
					},
					'inputex-serialize': {
					   path: 'js/fields/SerializeField-beta.js',
					   requires: ['inputex-string','json'],
						ix_provides: 'serialize'
					},
					'inputex-object': {
					   path: 'js/fields/ObjectField.js',
   					requires: ['inputex-list','inputex-combine','inputex-string'],
						ix_provides: 'object'
					},
					// Fields
					'inputex-string': {
						path: 'js/fields/StringField.js',
						requires: ['inputex-field','event-key'],
						ix_provides: 'string'
					},
					'inputex-uppercase': {
						path: 'js/fields/UpperCaseField.js',
						requires: ['inputex-string'],
						ix_provides: 'uppercase'
					},
					'inputex-autocomplete': {
						path: 'js/fields/AutoComplete.js',
						requires: ['inputex-string','autocomplete', 'autocomplete-filters', 'autocomplete-highlighters','datasource'],
						ix_provides: 'autocomplete'
					},
					'inputex-checkbox': {
						path: 'js/fields/CheckBox.js',
						requires: ['inputex-field'],
						ix_provides: 'boolean'
					},
					'inputex-color': {
						path: 'js/fields/ColorField.js',
						requires: ['inputex-field','yui2-container','yui2-button'],
						ix_provides: 'color'
					},
					'inputex-colorpicker': {
						path: 'js/fields/ColorPickerField.js',
						requires: ['inputex-field','yui2-colorpicker','yui2-container','yui2-menu','yui2-button'],
						ix_provides: 'colorpicker'
					},
					'inputex-date': {
						path: 'js/fields/DateField.js',
						requires: ['inputex-string'],
						ix_provides: 'date'
					},
					'inputex-datepicker': {
						path: 'js/fields/DatePickerField.js',
						requires: ['yui2-calendar', 'yui2-button', 'inputex-date', 'yui2-container'],
						ix_provides: 'datepicker'
					},
					'inputex-dateselectmonth': {
						path: 'js/fields/DateSelectMonthField.js',
						requires: ['inputex-combine'],
						ix_provides: 'dateselectmonth'
					},
					'inputex-integer': {
						path: 'js/fields/IntegerField.js',
						requires: ['inputex-string'],
						ix_provides: 'integer'
					},
					'inputex-datesplit': {
						path: 'js/fields/DateSplitField.js',
						requires: ['inputex-combine', 'inputex-integer'],
						ix_provides: 'datesplit'
					},
					'inputex-select': {
						path: 'js/fields/SelectField.js',
						requires: ['inputex-field','inputex-choice'],
						ix_provides: 'select'
					},
					'inputex-time': {
						path: 'js/fields/TimeField.js',
						requires: ['inputex-combine', 'inputex-select'],
						ix_provides: 'time'
					},
					'inputex-datetime': {
						path: 'js/fields/DateTimeField.js',
						requires: ['inputex-datepicker', 'inputex-combine', 'inputex-time'],
						ix_provides: 'datetime'
					},
					'inputex-timeinterval': {
						path: 'js/fields/TimeIntervalField.js',
						requires: ['inputex-combine', 'inputex-select'],
						ix_provides: 'timeinterval'
					},
					'inputex-dsselect': {
						path: 'js/fields/DSSelectField.js',
						requires: ['inputex-select', 'yui2-datasource'],
						ix_provides: 'dsselect'
					},
					'inputex-email': {
						path: 'js/fields/EmailField.js',
						requires: ['inputex-string'],
						ix_provides: 'email'
					},
					'inputex-hidden': {
						path: 'js/fields/HiddenField.js',
						requires: ['inputex-field'],
						ix_provides: 'hidden'
					},
					'inputex-keyvalue': {
						path: 'js/fields/KeyValueField-beta.js',
						requires: ['inputex-combine'],
						ix_provides: 'keyvalue'
					},
					'inputex-keyopvalue': {
						path: 'js/fields/KeyOpValueField-beta.js',
						requires: ['inputex-keyvalue'],
						ix_provides: 'keyopvalue'
					},
					'inputex-multiautocomplete': {
						path: 'js/fields/MultiAutoComplete.js',
						requires: ['inputex-autocomplete','json','inputex-ddlist'],
						ix_provides: 'multiautocomplete'
					},
					'inputex-multiselect': {
						path: 'js/fields/MultiSelectField.js',
						requires: ['inputex-select', 'inputex-ddlist'],
						ix_provides: 'multiselect'
					},
					'inputex-number': {
						path: 'js/fields/NumberField.js',
						requires: ['inputex-string'],
						ix_provides: 'number'
					},
					'inputex-password': {
						path: 'js/fields/PasswordField.js',
						requires: ['inputex-string'],
						ix_provides: 'password'
					},
					'inputex-radio': {
						path: 'js/fields/RadioField.js',
						requires: ['selector','event-delegate','inputex-field','inputex-choice','inputex-string'],
						ix_provides: 'radio'
					},
					'inputex-rte': {
						path: 'js/fields/RTEField.js',
						requires: ['inputex-field', 'yui2-editor'],
						ix_provides: 'html'
					},
					'inputex-slider': {
						path: 'js/fields/SliderField.js',
						requires: ['inputex-field', 'yui2-slider'],
						ix_provides: 'slider'
					},
					'inputex-textarea': {
						path: 'js/fields/Textarea.js',
						requires: ['inputex-string'],
						ix_provides: 'text'
					},
					'inputex-type': {
						path: 'js/fields/TypeField.js',
						requires: ['inputex-field','inputex-group','inputex-select', 'inputex-list','inputex-string','inputex-checkbox','inputex-integer'],
						ix_provides: 'type'
					},
					'inputex-uneditable': {
						path: 'js/fields/UneditableField.js',
						requires: ['inputex-field', 'inputex-visus'],
						ix_provides: 'uneditable'
					},
					'inputex-url': {
						path: 'js/fields/UrlField.js',
						requires: ['inputex-string'],
						ix_provides: 'url'
					},
					'inputex-dateselectmonth': {
					  	path: 'js/fields/DateSelectMonthField.js',
						requires: ['inputex-combine', 'inputex-string', 'inputex-select'],
						ix_provides: 'dateselectmonth'
					},
					'inputex-ipv4': {
					  	path: 'js/fields/IPv4Field.js',
						requires: ['inputex-string'],
						ix_provides: 'ipv4'
					},
					'inputex-vector': {
					  	path: 'js/fields/VectorField.js',
						requires: ['inputex-combine'],
						ix_provides: 'vector'
					},
					'inputex-map': {
					  	path: 'js/fields/MapField.js',
						requires: ['inputex-field'],
						ix_provides: 'map'
					},
					'inputex-ratingstars': {
					  	path: 'js/fields/RatingStars.js',
						requires: ['inputex-field'],
						ix_provides: 'ratingstars'
					},
					'inputex-ratingstarsform': {
					  	path: 'js/fields/RatingStarsForm.js',
                  requires: ['inputex-ratingstars','inputex-form'],
						ix_provides: 'ratingstarsform'
					},
					'inputex-menu': {
					  	path: 'js/fields/MenuField.js',
					   requires: ['inputex-field','yui2-menu'],
						ix_provides: 'menu'
					},
					'inputex-file': {
					 	path: 'js/fields/FileField.js',
					   requires: ['inputex-field'],
						ix_provides: 'file'
					},
					'inputex-tinymce': {
					   path: 'js/fields/TinyMCEField.js',
					   requires: ['inputex-field'],
						ix_provides: 'tinymce'
					}
					/*,
					// Piercus widgets
					'inputex-pie-listcustom': {
						path: 'js/widgets/listCustom.js',
						requires: ['inputex-ddlist','yui2-json']
					},
					'inputex-pie-multiselect':{
						path: 'js/fields/MultiSelectFieldCustom.js',
						requires: ['inputex-multiselect', 'inputex-pie-listcustom']
					},
					'inputex-pie-multiautocomplete':{
						path: 'js/fields/MultiAutoCompleteCustom.js',
						requires: ['inputex-multiautocomplete', 'inputex-pie-listcustom']
					}*/
				}
			}
		}
	};

	if(typeof YUI_config === 'undefined') { YUI_config = {groups: {}}; }
	Y.mix(YUI_config.groups, CONFIG.groups);

   // Loop through all modules
   var modules = YUI_config.groups.inputex.modules,
       allModules = [],
       modulesByType = {};
   for(var moduleName in modules) {
     if (modules.hasOwnProperty(moduleName) ) {
       
       // Build a list of all inputEx modules
       allModules.push(moduleName);
       
       // Build a reverse index on which module provides what type
       if(modules[moduleName].ix_provides) {
          modulesByType[modules[moduleName].ix_provides] = moduleName;
       }
       
     }
   }
   YUI_config.groups.inputex.allModules = allModules;
   YUI_config.groups.inputex.modulesByType = modulesByType;

});
