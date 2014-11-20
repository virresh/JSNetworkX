/*jshint strict:false, node:true*/
/*global utils, assert*/

var Set = require('../Set');
var itertools = utils.itertools;

exports.Set = {
  testCreate: function() {
    var set = new Set();
    assert(set);
  },

  testAddElements: function() {
    var set = new Set([1,2,3]);
    assert.deepEqual(itertools.toArray(set.values()).sort(), [1,2,3]);

    set = new Set();
    set.add(1);
    set.add("4");
    assert(set.has(1));
    assert(set.has("4"));
  },

  testRemoveElements: function() {
    var set = new Set([1,2,3]);
    set.delete(2);
    assert(!set.has(2));
    assert(set.has(1));
    assert(set.has(3));
  },

  testCount: function() {
    var set = new Set([1,2,3]);
    assert.equal(set.size, 3);
  }
};
