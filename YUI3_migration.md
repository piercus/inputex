
@piercus started to rewrite InputEx fields for YUI3.

The repository for this project still is on inputEx's git repository neyric/inputEx, but the branch will be named "yui3"

## Goals

Guidelines to give inputEx 3 a fresh start :

* Remove as many YUI2 dependencies as possible
* Change the API as little as possible
* Use the YUI loader (now unique in js/loader.js)
* remove deprecated/unused/broken code

# TODO:

* remove inputParams
* merge examples scripts with a unit-test engine ? 
* repair ddlist


# Changelog

* Adding: RatingStars
* removed: YQL utilities, dependency-configurator, task manager demo, inputExHTML, YUI2 loader



## Contribute to the YUI3 branch

* clone inputEx repository
* Add "neyric"'s repository to your remote branches :

  % git remote add neyric git://github.com/neyric/inputex.git

* Fetch remote branches

  % git fetch neyric

* Create a new yui3 local branch

  % git checkout -b yui3 neyric/yui3

* Make some modifications
* Push to a new branch on your repository

  % git push origin yui3

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

* YAHOO.on('updated', function(value) { => Y.extend

* YAHOO.augmentObject replaced by
 *  Y.mix // is used instead of YAHOO.augmentObject
 *  Y.augment  // is used when augment an Object which have a prototype

* DOM.addClass(el,className) => Y.one(el).addClass(className)

* YAHOO.util.Event.addListener(node, "click", function(){}) => Y.one(node).on("click", function(){})
