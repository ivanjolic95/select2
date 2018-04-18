module('focusAfterClose option');

var MultipleSelection = require('select2/selection/multiple');
var InlineSearch = require('select2/selection/search');

var $ = require('jquery');

var Utils = require('select2/utils');
var Options = require('select2/options');

test('selection should be focused when focusAfterClose is true', function (assert) {
  var $select = $('#qunit-fixture .multiple');
  var options = new Options({});

  var CustomSelection = Utils.Decorate(MultipleSelection, InlineSearch);
  var selection = new CustomSelection($select, options);
  var $selection = selection.render();

  var isFocused = false;

  $selection.on('focus', function() {
    isFocused = true;
  });

  var container = new MockContainer();
  selection.bind(container, $('<span></span>'));

  // Update the selection so the search is rendered
  selection.update([]);

  container.trigger('close');

  assert.ok(
    isFocused,
    'Selection should be focused'
  );
});

test('selection should NOT be focused when focusAfterClose is false', function (assert) {
  var $select = $('#qunit-fixture .multiple');
  var options = new Options({
    focusAfterClose: false
  });

  var CustomSelection = Utils.Decorate(MultipleSelection, InlineSearch);
  var selection = new CustomSelection($select, options);
  var $selection = selection.render();

  var isFocused = false;

  $selection.on('focus', function() {
    isFocused = true;
  });

  var container = new MockContainer();
  selection.bind(container, $('<span></span>'));

  // Update the selection so the search is rendered
  selection.update([]);

  container.trigger('close');

  assert.ok(
    !isFocused,
    'Selection should be focused'
  );
});
