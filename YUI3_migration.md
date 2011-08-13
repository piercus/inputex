# YUI3 migration

## Goals

 * Remove as many YUI2 dependencies as possible
 * Change the API as little as possible

## Project

@piercus started to rewrite InputEx fields for YUI3.

The repository for this project still is on inputEx's git repository neyric/inputEx, but the branch will be named "yui3"

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

## Method

### YAHOO.lang

   * YAHOO.lang replaced by Y.Lang

   * YAHOO.lang.extend replaced by Y.extend
   
   * YAHOO.augmentObject replaced by
     *  Y.mix // is used instead of YAHOO.augmentObject
     *  Y.augment  // is used when augment an Object which have a prototype

### Dom && Event

I removed 

    var Dom = YAHOO.util.Dom
    var Event = YAHOO.util.Event

Then i choose to replace

    DOM.addClass(el,className)
 
by

    Y.one(el).addClass(className)

### inputEx
For less rewriting, i start my files with

    var inputEx = Y.inputEx

## dependencies and wording

I followed the wording/dependencies in js/yui3-loader.js.

## Unit testing

I use inputex examples as unit-tests to be sure that it works fine.

However, i had to change the first line of examples/inputex-example.js at each new test. 
Maybe we could merge examples scripts with a unit-test engine ? 
Maybe we could also manage dependencies of examples with YUI3 ?

## What works today

What works on my computer (chrome).

inputex-field
inputex-string
inputex-url
inputex-email
inputex-select
inputex-multiselect
inputex-pie-multiselectcustom
inputex-autocomplete
inputex-multiautocomplete
inputex-multiautocompletecustom
inputex-group
inputex-button
inputex-form
