# YUI3 migration

@piercus started to rewrite InputEx fields for YUI3.

I wrote about 5 prototypes of inputEx using YUI3, all of them were too ambitious.

Not an ideal YUI3 version, but first milestone towards YUI3...


Guidelines to give inputEx 3 a fresh start :

* Remove as many YUI2 dependencies as possible
* Change the API as little as possible: 
  * eg. Dom element references are not Y.Node(s) yet. But you can use them in your subclasses !
* Use the YUI loader (now unique in js/loader.js)
* remove deprecated/unused/broken code

## TODO:

* merge examples scripts with a unit-test engine ? 
* repair ddlist
* repair autocomplete
* finish ObjectField
* apidoc

* locals -> locales (will become i18n ???)


## Changelog

* Adding: RatingStars
* removed: YQL utilities, dependency-configurator, task manager demo, inputExHTML, YUI2 loader


## Developer guide


### Updated Event

  field.updatedEvt.subscribe(function(e,params){
    var val = params[0];
  })

now becomes

  field.on('updated', function(value, field){
    ...
  })

### old YAHOO references

* YAHOO.env.ua => Y.UA

* YAHOO.lang => Y.Lang

* Y.lang.extend => Y.extend

* YAHOO.augmentObject replaced by
 *  Y.mix // is used instead of YAHOO.augmentObject
 *  Y.augment  // is used when augment an Object which have a prototype

* DOM.addClass(el,className) => Y.one(el).addClass(className)

* YAHOO.util.Event.addListener(node, "click", function(){}) => Y.one(node).on("click", function(){})
