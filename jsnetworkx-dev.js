(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsnx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {
  workerPath: 'jsnetworkx-dev.js'
};
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashCollectionShuffle = require('lodash/collection/shuffle');

var _lodashCollectionShuffle2 = _interopRequireDefault(_lodashCollectionShuffle);

var _lodashCollectionSample = require('lodash/collection/sample');

var _lodashCollectionSample2 = _interopRequireDefault(_lodashCollectionSample);

exports['default'] = { shuffle: _lodashCollectionShuffle2['default'], sample: _lodashCollectionSample2['default'] };
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"lodash/collection/sample":203,"lodash/collection/shuffle":204}],3:[function(require,module,exports){
'use strict';
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString()
 * and does not accept arrays as keys (just like Python does not accept lists).
 */

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _clear2 = require('./clear');

var _clear3 = _interopRequireDefault(_clear2);

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _lodashLangIsFunction = require('lodash/lang/isFunction');

var _lodashLangIsFunction2 = _interopRequireDefault(_lodashLangIsFunction);

var _lodashLangIsObject = require('lodash/lang/isObject');

var _lodashLangIsObject2 = _interopRequireDefault(_lodashLangIsObject);

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _lodashCollectionSize = require('lodash/collection/size');

var _lodashCollectionSize2 = _interopRequireDefault(_lodashCollectionSize);

var Map = (function () {
  /**
   * @param {Iterable=} opt_data An object, array or iterator to
   *  populate the map with. If 'data' is an array or iterable, each element is
   *  expected to be a 2-tuple. The first element will be the key and second the
   *  value.
   *  If it is an object, the property names will be the keys and the value the
   *  values.
   */

  function Map(optData) {
    _classCallCheck(this, Map);

    // Can't use class syntax because of generator functions
    this._stringValues = _Object$create(null); // strings
    this._numberValues = _Object$create(null); // numbers
    this._values = _Object$create(null); // every other value
    this._keys = _Object$create(null);

    if (optData != null) {
      if ((0, _isIterable2['default'])(optData)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(optData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var value = _step$value[1];

            this.set(key, value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if ((0, _isArrayLike2['default'])(optData)) {
        for (var i = 0; i < optData.length; i++) {
          var _optData$i = _slicedToArray(optData[i], 2);

          var key = _optData$i[0];
          var value = _optData$i[1];

          this.set(key, value);
        }
      } else if ((0, _lodashLangIsObject2['default'])(optData)) {
        for (var key in optData) {
          this.set(isNaN(+key) ? key : +key, optData[key]);
        }
      }
    }
  }

  /**
   * Returns the appropriate storage object for a given key.
   *
   * @param {*} key
   * @return {Object}
   * @private
   */

  _createClass(Map, [{
    key: '_getStorage',
    value: function _getStorage(key) {
      switch (typeof key) {
        case 'number':
          return this._numberValues;
        case 'string':
          return this._stringValues;
        default:
          return this._values;
      }
    }

    /**
     * Returns the value for the given key.
     *
     * Unlike native ES6 maps, this also accepts a default value which is returned
     * if the map does not contain the value.
     *
     * @param {*} key
     * @param {*=} optDefaultValue
     *
     * @return {*}
     * @export
     */
  }, {
    key: 'get',
    value: function get(key, optDefaultValue) {
      var storage = this._getStorage(key);
      return key in storage ? storage[key] : optDefaultValue;
    }

    /**
     * Returns true if the key is in the map.
     *
     * @param {*} key
     *
     * @return {boolean}
     * @export
     */
  }, {
    key: 'has',
    value: function has(key) {
      return key in this._getStorage(key);
    }

    /**
     * Adds the value and key to the map.
     *
     * @param {*} key
     * @param {*} value
     *
     * @return {Map} the map object itself
     * @export
     */
  }, {
    key: 'set',
    value: function set(key, value) {
      var values = this._getStorage(key);
      values[key] = value;

      // save actual key value
      if (values === this._values) {
        this._keys[key] = key;
      }

      return this;
    }

    /**
     * Remove value with given key.
     *
     * @param {*} key
     *
     * @return {boolean}
     * @export
     */
  }, {
    key: 'delete',
    value: function _delete(key) {
      var values = this._getStorage(key);
      if (key in values) {
        delete values[key];
        if (values === this._values) {
          delete this._keys[key];
        }
        return true;
      }
      return false;
    }

    /**
     * Returns an array of (key, value) tuples.
     *
     * @return {!Iterator}
     * @export
    */
  }, {
    key: 'entries',
    value: _regeneratorRuntime.mark(function entries() {
      var key;
      return _regeneratorRuntime.wrap(function entries$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

          case 1:
            if ((context$2$0.t1 = context$2$0.t0()).done) {
              context$2$0.next = 7;
              break;
            }

            key = context$2$0.t1.value;
            context$2$0.next = 5;
            return [+key, this._numberValues[key]];

          case 5:
            context$2$0.next = 1;
            break;

          case 7:
            context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

          case 8:
            if ((context$2$0.t3 = context$2$0.t2()).done) {
              context$2$0.next = 14;
              break;
            }

            key = context$2$0.t3.value;
            context$2$0.next = 12;
            return [key, this._stringValues[key]];

          case 12:
            context$2$0.next = 8;
            break;

          case 14:
            context$2$0.t4 = _regeneratorRuntime.keys(this._values);

          case 15:
            if ((context$2$0.t5 = context$2$0.t4()).done) {
              context$2$0.next = 21;
              break;
            }

            key = context$2$0.t5.value;
            context$2$0.next = 19;
            return [this._keys[key], this._values[key]];

          case 19:
            context$2$0.next = 15;
            break;

          case 21:
          case 'end':
            return context$2$0.stop();
        }
      }, entries, this);
    })

    /**
     * Returns an iterator over keys.
     *
     * @return {!Iterator}
     * @export
    */
  }, {
    key: 'keys',
    value: _regeneratorRuntime.mark(function keys() {
      var key;
      return _regeneratorRuntime.wrap(function keys$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

          case 1:
            if ((context$2$0.t1 = context$2$0.t0()).done) {
              context$2$0.next = 7;
              break;
            }

            key = context$2$0.t1.value;
            context$2$0.next = 5;
            return +key;

          case 5:
            context$2$0.next = 1;
            break;

          case 7:
            context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

          case 8:
            if ((context$2$0.t3 = context$2$0.t2()).done) {
              context$2$0.next = 14;
              break;
            }

            key = context$2$0.t3.value;
            context$2$0.next = 12;
            return key;

          case 12:
            context$2$0.next = 8;
            break;

          case 14:
            context$2$0.t4 = _regeneratorRuntime.keys(this._values);

          case 15:
            if ((context$2$0.t5 = context$2$0.t4()).done) {
              context$2$0.next = 21;
              break;
            }

            key = context$2$0.t5.value;
            context$2$0.next = 19;
            return this._keys[key];

          case 19:
            context$2$0.next = 15;
            break;

          case 21:
          case 'end':
            return context$2$0.stop();
        }
      }, keys, this);
    })

    /**
     * Returns an array of values.
     *
     * @return {!Array}
     * @export
    */
  }, {
    key: 'values',
    value: _regeneratorRuntime.mark(function values() {
      var key;
      return _regeneratorRuntime.wrap(function values$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            context$2$0.t0 = _regeneratorRuntime.keys(this._numberValues);

          case 1:
            if ((context$2$0.t1 = context$2$0.t0()).done) {
              context$2$0.next = 7;
              break;
            }

            key = context$2$0.t1.value;
            context$2$0.next = 5;
            return this._numberValues[key];

          case 5:
            context$2$0.next = 1;
            break;

          case 7:
            context$2$0.t2 = _regeneratorRuntime.keys(this._stringValues);

          case 8:
            if ((context$2$0.t3 = context$2$0.t2()).done) {
              context$2$0.next = 14;
              break;
            }

            key = context$2$0.t3.value;
            context$2$0.next = 12;
            return this._stringValues[key];

          case 12:
            context$2$0.next = 8;
            break;

          case 14:
            context$2$0.t4 = _regeneratorRuntime.keys(this._values);

          case 15:
            if ((context$2$0.t5 = context$2$0.t4()).done) {
              context$2$0.next = 21;
              break;
            }

            key = context$2$0.t5.value;
            context$2$0.next = 19;
            return this._values[key];

          case 19:
            context$2$0.next = 15;
            break;

          case 21:
          case 'end':
            return context$2$0.stop();
        }
      }, values, this);
    })

    /**
     * Returns the number of element in the map.
     *
     * @return {number}
     * @export
    */
  }, {
    key: 'clear',

    /**
     * Empties the map.
     *
     * @export
    */
    value: function clear() {
      (0, _clear3['default'])(this._stringValues);
      (0, _clear3['default'])(this._numberValues);
      (0, _clear3['default'])(this._values);
      (0, _clear3['default'])(this._keys);
    }

    /**
     * Executes the provided callback for each item in the map.
     *
     * @param {function(*,*)} callback A function which gets the key as first
     *  argument and value as second argument.
     * @param {*=} opt_this Object/value to set this to inside the callback
     * @export
    */
  }, {
    key: 'forEach',
    value: function forEach(callback, optThis) {
      if (!(0, _lodashLangIsFunction2['default'])(callback)) {
        throw new TypeError('callback must be a function');
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(this.entries()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var v = _step2.value;

          callback.call(optThis, v[1], v[0], this);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }

    /**
    * Returns an iterator for the map object.
    *
    * @return {Iterator}
    */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.entries();
    }
  }, {
    key: 'size',
    get: function get() {
      return (0, _lodashCollectionSize2['default'])(this._values) + (0, _lodashCollectionSize2['default'])(this._numberValues) + (0, _lodashCollectionSize2['default'])(this._stringValues);
    }
  }]);

  return Map;
})();

exports['default'] = Map;
module.exports = exports['default'];

},{"./clear":7,"./isArrayLike":21,"./isIterable":24,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/create":93,"babel-runtime/core-js/symbol/iterator":101,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112,"lodash/collection/size":205,"lodash/lang/isFunction":260,"lodash/lang/isObject":262}],4:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
function sorter(a, b) {
  return b[0] - a[0];
}

/**
 * A simple priority queue implementation.
 */

var PriorityQueue = (function () {

  /**
   * Accepts an iterable that emits `[priority, value]` pairs. Iterates over the
   * iterable only once.
   *
   * `priority` must be a number.
   *
   * @param {Iterable} iterable
   */

  function PriorityQueue(iterable) {
    _classCallCheck(this, PriorityQueue);

    this._values = [];
    if (iterable != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(iterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2);

          var priority = _step$value[0];
          var value = _step$value[1];

          this._values.push([priority, value]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this._values.sort(sorter);
    }
  }

  /**
   * Adds a value to the queue. It will be inserted into the queue according to
   * `priority`.
   *
   * @param {number} priority
   * @param {*} value
   */

  _createClass(PriorityQueue, [{
    key: 'enqueue',
    value: function enqueue(priority, value) {
      this._values.push([priority, value]);
      this._values.sort(sorter);
    }

    /**
     * Removes and returns the smallest [priority, value] tuple from the queue.
     *
     * @return {?}
     */
  }, {
    key: 'dequeue',
    value: function dequeue() {
      return this._values.pop();
    }

    /**
     * Returns the current size of the queue.
     *
     * @return {number}
     */
  }, {
    key: 'size',
    get: function get() {
      return this._values.length;
    }
  }]);

  return PriorityQueue;
})();

exports['default'] = PriorityQueue;
module.exports = exports['default'];

},{"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/sliced-to-array":111}],5:[function(require,module,exports){
'use strict';
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString().
 */

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.symmetricDifference = symmetricDifference;
exports.union = union;

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _toIterator = require('./toIterator');

var _toIterator2 = _interopRequireDefault(_toIterator);

var Set = (function () {

  /**
   * @param {Iterable} opt_data An object, array or iterator to populate the set
   * with.
   */

  function Set(optData) {
    _classCallCheck(this, Set);

    this._map = new _Map2['default']();

    if (optData != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator((0, _toIterator2['default'])(optData)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          this.add(v);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }

  /**
   * Returns true if the key is in the map.
   *
   * @param {*} value
   *
   * @return {boolean}
   */

  _createClass(Set, [{
    key: 'has',
    value: function has(value) {
      return this._map.has(value);
    }

    /**
     * Adds the value and key to the map.
     *
     * @param {*} value
     *
     * @export
     */
  }, {
    key: 'add',
    value: function add(value) {
      this._map.set(value, true);
    }

    /**
     * Remove value with given key.
     *
     * @param {*} value
     *
     * @export
     */
  }, {
    key: 'delete',
    value: function _delete(value) {
      return this._map['delete'](value);
    }

    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */
  }, {
    key: 'values',
    value: function values() {
      return this._map.keys();
    }

    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */
  }, {
    key: 'keys',
    value: function keys() {
      return this.values();
    }

    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */
  }, {
    key: 'entries',
    value: _regeneratorRuntime.mark(function entries() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v;

      return _regeneratorRuntime.wrap(function entries$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 3;
            _iterator2 = _getIterator(this.values());

          case 5:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 12;
              break;
            }

            v = _step2.value;
            context$2$0.next = 9;
            return [v, v];

          case 9:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 5;
            break;

          case 12:
            context$2$0.next = 18;
            break;

          case 14:
            context$2$0.prev = 14;
            context$2$0.t0 = context$2$0['catch'](3);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t0;

          case 18:
            context$2$0.prev = 18;
            context$2$0.prev = 19;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 21:
            context$2$0.prev = 21;

            if (!_didIteratorError2) {
              context$2$0.next = 24;
              break;
            }

            throw _iteratorError2;

          case 24:
            return context$2$0.finish(21);

          case 25:
            return context$2$0.finish(18);

          case 26:
          case 'end':
            return context$2$0.stop();
        }
      }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })

    /**
     * Returns the number of element in the set.
     *
     * @return {number}
     * @export
     */
  }, {
    key: 'clear',

    /**
     * Empties the set.
     *
     * @export
     */
    value: function clear() {
      this._map.clear();
    }

    /**
     * Executes the provided callback for each item in the set.
     *
     * @param {function(*)} callback A function which gets the key as first
     *  argument and value as second argument.
     * @param {*=} opt_this Object/value to set this to inside the callback
     * @export
    */
  }, {
    key: 'forEach',
    value: function forEach(callback, optThis) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(this.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var v = _step3.value;

          callback.call(optThis, v, v, this);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    /** EXTENSIONS **/
    /**
     * The following methods are not part of the ES6 Set class but are provided
     * for convenience. Once Sets become more widely available, we could simply
     * extend the native Set class.
     */

    /**
     * Returns a new set with the values of this set, not found in the other
     * sets.
     *
     * @param {...(Set|Array)} others
     */
  }, {
    key: 'difference',
    value: function difference() {
      var result = new Set(this);

      for (var _len = arguments.length, others = Array(_len), _key = 0; _key < _len; _key++) {
        others[_key] = arguments[_key];
      }

      for (var i = 0, l = others.length; i < l; i++) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (var _iterator4 = _getIterator(others[i]), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var v = _step4.value;

            result['delete'](v);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }
      return result;
    }

    /**
     * Returns a new set containing only elements found in this and every
     * other set/array.
     *
     * @param {...(Set|Array)} others
     */
  }, {
    key: 'intersection',
    value: function intersection() {
      var result = new Set();
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _len2 = arguments.length, others = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          others[_key2] = arguments[_key2];
        }

        for (var _iterator5 = _getIterator(this), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var v = _step5.value;

          /* eslint-disable no-loop-func */
          if (others.every(function (other) {
            return other.has(v);
          })) {
            result.add(v);
          }
          /* eslint-enable no-loop-func */
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return result;
    }

    /**
     * Removes and returns an element from the set.
     *
     * @return {?}
     */
  }, {
    key: 'pop',
    value: function pop() {
      try {
        var value = this.values().next().value;
        this['delete'](value);
        return value;
      } catch (ex) {} // eslint-disable-line no-empty
    }

    /**
     * Returns an iterator for the set object.
     *
     * @return {Iterator}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.values();
    }
  }, {
    key: 'size',
    get: function get() {
      return this._map.size;
    }
  }]);

  return Set;
})();

exports['default'] = Set;

function symmetricDifference(a, b) {
  var c = new Set(a);
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(b), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var v = _step6.value;

      if (a.has(v)) {
        c['delete'](v);
      } else {
        c.add(v);
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6['return']) {
        _iterator6['return']();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return c;
}

function union(a, b) {
  var c = new Set(a);
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(b), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var v = _step7.value;

      c.add(v);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return c;
}

},{"./Map":3,"./toIterator":39,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/symbol/iterator":101,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/regenerator":112}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = global.Worker;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
'use strict';

/**
 * Removes every property of the object.
 *
 * @param {Object} obj
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = clear;

function clear(obj) {
  for (var prop in obj) {
    delete obj[prop];
  }
}

module.exports = exports['default'];

},{}],8:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashLangClone = require('lodash/lang/clone');

var _lodashLangClone2 = _interopRequireDefault(_lodashLangClone);

exports['default'] = _lodashLangClone2['default'];
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"lodash/lang/clone":256}],9:[function(require,module,exports){
/*jshint latedef:false*/
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deepcopy;

var _lodashInternalBaseClone = require('lodash/internal/baseClone');

var _lodashInternalBaseClone2 = _interopRequireDefault(_lodashInternalBaseClone);

var _isGraph = require('./isGraph');

var _isGraph2 = _interopRequireDefault(_isGraph);

var _isMap = require('./isMap');

var _isMap2 = _interopRequireDefault(_isMap);

var _isSet = require('./isSet');

var _isSet2 = _interopRequireDefault(_isSet);

function deepcopyInstance(obj, stackA, stackB) {
  // temporary constructor, we don't know if the original expects
  // parameter
  /**
   * @constructor
   */
  var T_ = function T_() {};
  T_.prototype = obj.constructor.prototype;
  var ownProps = {};
  var prop;
  var instance;

  // collect instance properties
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ownProps[prop] = obj[prop];
    }
  }

  // deepcopy them
  ownProps = deepcopyImplementation(ownProps, stackA, stackB);

  // create a new instance and assign properties
  instance = new T_();
  for (prop in ownProps) {
    instance[prop] = ownProps[prop];
  }

  return instance;
}

function deepcopyImplementation(value, stackA, stackB) {
  return (0, _lodashInternalBaseClone2['default'])(value, true, function (v) {
    if ((0, _isMap2['default'])(v) || (0, _isSet2['default'])(v) || (0, _isGraph2['default'])(v)) {
      var copy = deepcopyInstance(v, stackA, stackB);
      stackA.push(v);
      stackB.push(copy);
      return copy;
    }
  }, null, null, stackA, stackB);
}

/**
 * Creates a deep copy of the value, also of maps and sets.
 *
 * @param {*} value The value to be cloned
 * @return {?}
 */

function deepcopy(value) {
  return deepcopyImplementation(value, [], []);
}

module.exports = exports['default'];

},{"./isGraph":23,"./isMap":26,"./isSet":28,"babel-runtime/helpers/interop-require-default":109,"lodash/internal/baseClone":212}],10:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashObjectMerge = require('lodash/object/merge');

var _lodashObjectMerge2 = _interopRequireDefault(_lodashObjectMerge);

exports['default'] = _lodashObjectMerge2['default'];
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"lodash/object/merge":271}],11:[function(require,module,exports){
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = delegateSync;

var _WorkerSettings = require('../WorkerSettings');

var _WorkerSettings2 = _interopRequireDefault(_WorkerSettings);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * In environments that does not support workers, we are using this synchronous
 * version.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */

function delegateSync(method, args) {
  return new _Promise(function (resolve, reject) {
    try {
      // We have to do the same here as we do in the worker, which is
      // returning an array if we get back an iterator
      var result = _WorkerSettings2['default'].methodLookupFunction(method).apply(null, args);
      if ((0, _isIterator2['default'])(result)) {
        result = _Array$from(result);
      }
      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  });
}

module.exports = exports['default'];

},{"../WorkerSettings":1,"./isIterator":25,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/promise":99,"babel-runtime/helpers/interop-require-default":109}],12:[function(require,module,exports){
'use strict';

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = delegateToWorker;

var _Worker = require('./Worker');

var _Worker2 = _interopRequireDefault(_Worker);

var _WorkerSettings = require('../WorkerSettings');

var _WorkerSettings2 = _interopRequireDefault(_WorkerSettings);

var _delegateSync = require('./delegateSync');

var _delegateSync2 = _interopRequireDefault(_delegateSync);

var _message = require('./message');

var delegateImplementation;
if (typeof _Worker2['default'] === 'function') {
  // Workers are supported
  delegateImplementation = function (method, args) {
    var _serializeAll = (0, _message.serializeAll)(args);

    var serializable = _serializeAll.serializable;
    var serializedValues = _serializeAll.serializedValues;

    if (!serializable) {
      console.info('At least one argument can\'t be serialized and sent to the worker. ' + ('We will run ' + method + ' in the same thread instead.'));
      return (0, _delegateSync2['default'])(method, args);
    }

    return new _Promise(function (resolve, reject) {
      var worker = new _Worker2['default'](_WorkerSettings2['default'].workerPath);
      worker.addEventListener('message', function (oEvent) {
        return resolve((0, _message.deserialize)(oEvent.data));
      }, false);
      worker.addEventListener('error', reject, false);
      worker.postMessage({ method: method, args: serializedValues });
    });
  };
} else {
  delegateImplementation = function (method, args) {
    console.info('Workers are not supported in this environment, so "' + method + '" will ' + 'run in the same thread instead. This might block the environment.');
    return (0, _delegateSync2['default'])(method, args);
  };
}

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Tries to create a worker and pass the arguments to it. Copying large graphs
 * is not very fast, but still faster than running most algorithms
 * synchronously.
 *
 * Falls back to synchronous execution if browser doesn't support workers.
 *
 * This returns a promise which gets resolved with the result sent from the
 * worker or the synchronous functions.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */

function delegateToWorker(method, args) {
  return delegateImplementation(method, args);
}

module.exports = exports['default'];

},{"../WorkerSettings":1,"./Worker":6,"./delegateSync":11,"./message":32,"babel-runtime/core-js/promise":99,"babel-runtime/helpers/interop-require-default":109}],13:[function(require,module,exports){
'use strict';

/**
 * Creates an array of `n` elements, each being `value`.
 *
 * @param {number} n Number of elements in the array
 * @param {?} value The value to put in each location
 * @return {Array}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = fillArray;

function fillArray(n, value) {
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

module.exports = exports['default'];

},{}],14:[function(require,module,exports){
'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = forEach;

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

/**
 * Helper to iterate over sequence types (arrays, array-like objects,
 * objects, etc)
 *
 * @param {Iterable} seq
 * @param {function(this:T, ...)} callback
 * @param {T=} optThisObj
 * @template T
 */

function forEach(seq, callback, optThisObj) {
  if (Array.isArray(seq)) {
    var _i = 0;
    var l = seq.length;
    if (optThisObj) {
      for (; _i < l; _i++) {
        callback.call(optThisObj, seq[_i], _i);
      }
    } else {
      for (; _i < l; _i++) {
        callback(seq[_i], _i);
      }
    }
    return;
  }
  if ((0, _isIterable2['default'])(seq)) {
    seq = _getIterator(seq);
  }
  if ((0, _isIterator2['default'])(seq)) {
    var v;
    var i;
    // Avoiding call if it is not necessary is faster in some browsers
    if (optThisObj !== undefined) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(seq), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          v = _step.value;

          i += 1;
          callback.call(optThisObj, v, i);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(seq), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          v = _step2.value;

          i += 1;
          callback(v, i);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } else if (seq && typeof seq === 'object') {
    if (optThisObj) {
      for (var prop in seq) {
        callback.call(optThisObj, seq[prop], prop);
      }
    } else {
      for (var prop in seq) {
        callback(seq[prop], prop);
      }
    }
  }
}

module.exports = exports['default'];

},{"./isIterable":24,"./isIterator":25,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109}],15:[function(require,module,exports){
'use strict';

/**
 * Computes the greatest common divisor of two numbers using Euclid's algorithm.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = gcd;

function gcd(a, b) {
  while (b !== 0) {
    var _ = a;
    a = b;
    b = _ % b;
  }
  return a;
}

module.exports = exports['default'];

},{}],16:[function(require,module,exports){
'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = genCombinations;
var marked0$0 = [genCombinations].map(_regeneratorRuntime.mark);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

function reversed(array) {
  return array.slice().reverse();
}

/**
 * Implements Python's itertools.combinations
 *
 * Return r length subsequences of elements from the input iterable.
 *
 * @param {Iterable} iterable
 * @param {number} r
 *
 * @return {Iterator}
 */

function genCombinations(iterable, r) {
  var pool, n, indicies, reversedIndicies, i, k, j;
  return _regeneratorRuntime.wrap(function genCombinations$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pool = _Array$from(iterable);
        n = pool.length;

        if (!(r > n)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt('return');

      case 4:
        indicies = (0, _range2['default'])(r);
        reversedIndicies = reversed(indicies);
        context$1$0.next = 8;
        return indicies.map(function (i) {
          return pool[i];
        });

      case 8:
        if (!true) {
          context$1$0.next = 26;
          break;
        }

        i = undefined;
        k = 0;

      case 11:
        if (!(k < reversedIndicies.length)) {
          context$1$0.next = 18;
          break;
        }

        i = reversedIndicies[k];

        if (!(indicies[i] !== i + n - r)) {
          context$1$0.next = 15;
          break;
        }

        return context$1$0.abrupt('break', 18);

      case 15:
        k++;
        context$1$0.next = 11;
        break;

      case 18:
        if (!(reversedIndicies.length === k)) {
          context$1$0.next = 20;
          break;
        }

        return context$1$0.abrupt('return');

      case 20:
        indicies[i] += 1;
        for (j = i + 1; j < r; j++) {
          indicies[j] = indicies[j - 1] + 1;
        }
        context$1$0.next = 24;
        return indicies.map(function (i) {
          return pool[i];
        });

      case 24:
        context$1$0.next = 8;
        break;

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// genCombinations('ABCD', 2) --> AB AC AD BC BD CD
// genCombinations(range(4), 3) --> 012 013 023 123
// eslint-disable-line no-loop-func

},{"./range":35,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/regenerator":112}],17:[function(require,module,exports){
'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = genPermutations;
var marked0$0 = [genPermutations].map(_regeneratorRuntime.mark);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

/**
 * Implements Python's itertools.permutations
 *
 * Return successive r length permutations of elements in the iterable.
 * *
 * @param {Iterable} iterable
 * @param {number=} opt_r
 *
 * @return {Iterator}
 */

function genPermutations(iterable, r) {
  var pool, n, indicies, cycles, rangeR, k, i, index, j;
  return _regeneratorRuntime.wrap(function genPermutations$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pool = _Array$from(iterable);
        n = pool.length;

        r = r == null ? n : r;

        if (!(r > n)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt('return');

      case 5:
        indicies = (0, _range2['default'])(n);
        cycles = (0, _range2['default'])(n, n - r, -1);
        rangeR = (0, _range2['default'])(r - 1, -1, -1);
        context$1$0.next = 10;
        return indicies.slice(0, r).map(function (i) {
          return pool[i];
        });

      case 10:
        if (!true) {
          context$1$0.next = 35;
          break;
        }

        k = 0;

      case 12:
        if (!(k < rangeR.length)) {
          context$1$0.next = 31;
          break;
        }

        i = rangeR[k];

        cycles[i] -= 1;
        index = indicies[i];

        if (!(cycles[i] === 0)) {
          context$1$0.next = 22;
          break;
        }

        indicies.splice(i, 1);
        indicies.push(index);
        cycles[i] = n - i;
        context$1$0.next = 28;
        break;

      case 22:
        j = cycles[i];

        indicies[i] = indicies[indicies.length - j];
        indicies[indicies.length - j] = index;
        /* eslint-disable no-loop-func */
        context$1$0.next = 27;
        return indicies.slice(0, r).map(function (i) {
          return pool[i];
        });

      case 27:
        return context$1$0.abrupt('break', 31);

      case 28:
        k++;
        context$1$0.next = 12;
        break;

      case 31:
        if (!(rangeR.length === k)) {
          context$1$0.next = 33;
          break;
        }

        return context$1$0.abrupt('return');

      case 33:
        context$1$0.next = 10;
        break;

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// genPermutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
// genPermutations(range(3)) --> 012 021 102 120 201 210

/* eslint-enable no-loop-func */

},{"./range":35,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/regenerator":112}],18:[function(require,module,exports){
'use strict';

/**
 * Implements Python's range function, returns an iterator.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} opt_start Number to start from
 * @param {?number=} opt_end Number to count to
 * @param {?number=} opt_step Step size
 * @return {!Iterator}
 */

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genRange;
var marked0$0 = [genRange].map(_regeneratorRuntime.mark);

function genRange(optStart, optEnd, optStep) {
  var negative, i;
  return _regeneratorRuntime.wrap(function genRange$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(optStart == null)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt("return");

      case 4:
        if (!(optEnd == null)) {
          context$1$0.next = 10;
          break;
        }

        optEnd = optStart;
        optStart = 0;
        optStep = 1;
        context$1$0.next = 16;
        break;

      case 10:
        if (!(optStep == null)) {
          context$1$0.next = 14;
          break;
        }

        optStep = 1;
        context$1$0.next = 16;
        break;

      case 14:
        if (!(optStep === 0)) {
          context$1$0.next = 16;
          break;
        }

        throw new RangeError("opt_step can't be 0");

      case 16:
        negative = optStep < 0;
        i = optStart;

      case 18:
        if (!(negative && i > optEnd || !negative && i < optEnd)) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 21;
        return i;

      case 21:
        i += optStep;
        context$1$0.next = 18;
        break;

      case 24:
      case "end":
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports["default"];

},{"babel-runtime/regenerator":112}],19:[function(require,module,exports){
'use strict';

/**
 * Returns the second argument if the first argument is null or undefined.
 *
 * @param {*} value
 * @param {*} defaultValue
 * @return {?}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = get;

function get(value, defaultValue) {
  return value == null ? defaultValue : value;
}

module.exports = exports['default'];

},{}],20:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Arrays = require('./Arrays');

var _Arrays2 = _interopRequireDefault(_Arrays);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _PriorityQueue = require('./PriorityQueue');

var _PriorityQueue2 = _interopRequireDefault(_PriorityQueue);

var _Set = require('./Set');

var _Set2 = _interopRequireDefault(_Set);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

var _clear = require('./clear');

var _clear2 = _interopRequireDefault(_clear);

var _deepcopy = require('./deepcopy');

var _deepcopy2 = _interopRequireDefault(_deepcopy);

var _deepmerge = require('./deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

var _gcd = require('./gcd');

var _gcd2 = _interopRequireDefault(_gcd);

var _genCombinations = require('./genCombinations');

var _genCombinations2 = _interopRequireDefault(_genCombinations);

var _genPermutations = require('./genPermutations');

var _genPermutations2 = _interopRequireDefault(_genPermutations);

var _genRange = require('./genRange');

var _genRange2 = _interopRequireDefault(_genRange);

var _getDefault = require('./getDefault');

var _getDefault2 = _interopRequireDefault(_getDefault);

var _fillArray = require('./fillArray');

var _fillArray2 = _interopRequireDefault(_fillArray);

var _forEach = require('./forEach');

var _forEach2 = _interopRequireDefault(_forEach);

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isBoolean = require('./isBoolean');

var _isBoolean2 = _interopRequireDefault(_isBoolean);

var _isGraph = require('./isGraph');

var _isGraph2 = _interopRequireDefault(_isGraph);

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

var _isMap = require('./isMap');

var _isMap2 = _interopRequireDefault(_isMap);

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _mapIterator = require('./mapIterator');

var _mapIterator2 = _interopRequireDefault(_mapIterator);

var _mapSequence = require('./mapSequence');

var _mapSequence2 = _interopRequireDefault(_mapSequence);

var _max = require('./max');

var _max2 = _interopRequireDefault(_max);

var _next = require('./next');

var _next2 = _interopRequireDefault(_next);

var _nodesAreEqual = require('./nodesAreEqual');

var _nodesAreEqual2 = _interopRequireDefault(_nodesAreEqual);

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _someIterator = require('./someIterator');

var _someIterator2 = _interopRequireDefault(_someIterator);

var _toIterator = require('./toIterator');

var _toIterator2 = _interopRequireDefault(_toIterator);

var _tuple = require('./tuple');

var tuple = _interopRequireWildcard(_tuple);

var _size = require('./size');

var _size2 = _interopRequireDefault(_size);

var _sprintf = require('./sprintf');

var _sprintf2 = _interopRequireDefault(_sprintf);

var _zipIterator = require('./zipIterator');

var _zipIterator2 = _interopRequireDefault(_zipIterator);

var _zipSequence = require('./zipSequence');

var _zipSequence2 = _interopRequireDefault(_zipSequence);

exports.Arrays = _Arrays2['default'];
exports.Map = _Map2['default'];
exports.PriorityQueue = _PriorityQueue2['default'];
exports.Set = _Set2['default'];
exports.clone = _clone2['default'];
exports.clear = _clear2['default'];
exports.deepcopy = _deepcopy2['default'];
exports.deepmerge = _deepmerge2['default'];
exports.gcd = _gcd2['default'];
exports.genCombinations = _genCombinations2['default'];
exports.genPermutations = _genPermutations2['default'];
exports.genRange = _genRange2['default'];
exports.getDefault = _getDefault2['default'];
exports.fillArray = _fillArray2['default'];
exports.forEach = _forEach2['default'];
exports.isArrayLike = _isArrayLike2['default'];
exports.isBoolean = _isBoolean2['default'];
exports.isGraph = _isGraph2['default'];
exports.isIterable = _isIterable2['default'];
exports.isIterator = _isIterator2['default'];
exports.isMap = _isMap2['default'];
exports.isPlainObject = _isPlainObject2['default'];
exports.mapIterator = _mapIterator2['default'];
exports.mapSequence = _mapSequence2['default'];
exports.max = _max2['default'];
exports.next = _next2['default'];
exports.nodesAreEqual = _nodesAreEqual2['default'];
exports.range = _range2['default'];
exports.someIterator = _someIterator2['default'];
exports.toIterator = _toIterator2['default'];
exports.tuple = tuple;
exports.size = _size2['default'];
exports.sprintf = _sprintf2['default'];
exports.zipIterator = _zipIterator2['default'];
exports.zipSequence = _zipSequence2['default'];

_defaults(exports, _interopExportWildcard(_tuple, _defaults));

},{"./Arrays":2,"./Map":3,"./PriorityQueue":4,"./Set":5,"./clear":7,"./clone":8,"./deepcopy":9,"./deepmerge":10,"./fillArray":13,"./forEach":14,"./gcd":15,"./genCombinations":16,"./genPermutations":17,"./genRange":18,"./getDefault":19,"./isArrayLike":21,"./isBoolean":22,"./isGraph":23,"./isIterable":24,"./isIterator":25,"./isMap":26,"./isPlainObject":27,"./mapIterator":29,"./mapSequence":30,"./max":31,"./next":33,"./nodesAreEqual":34,"./range":35,"./size":36,"./someIterator":37,"./sprintf":38,"./toIterator":39,"./tuple":40,"./zipIterator":41,"./zipSequence":42,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110}],21:[function(require,module,exports){
'use strict';

/**
 * Returns true of the array is an object and has a numerical length property.
 *
 * @param {?} v
 * @return {bool}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isArrayLike;

function isArrayLike(v) {
  return v && typeof v === 'object' && typeof v.length === 'number' && typeof v !== 'function';
}

module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashLangIsBoolean = require('lodash/lang/isBoolean');

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

exports['default'] = _lodashLangIsBoolean2['default'];
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"lodash/lang/isBoolean":259}],23:[function(require,module,exports){
'use strict';

/**
 * Returns true if value is a Graph
 *
 * @param {*} value
 * @return {bool}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isGraph;

function isGraph(value) {
  // We are not using instanceof to avoid circular dependencies
  return value && typeof value.addNode === 'function';
}

module.exports = exports['default'];

},{}],24:[function(require,module,exports){
'use strict';

/**
 * Returns true if object implement the @@iterator method.
 *
 * @param {*} obj

 * @return {boolean}
 */

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isIterable;

function isIterable(obj) {
  return typeof obj[_Symbol$iterator] === 'function';
}

module.exports = exports['default'];

},{"babel-runtime/core-js/symbol/iterator":101}],25:[function(require,module,exports){
'use strict';

/**
 * Returns true if object is an iterator
 *
 * @param {*} obj
 *
 * @return {boolean}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isIterator;

function isIterator(obj) {
  return obj && typeof obj.next === 'function';
}

module.exports = exports['default'];

},{}],26:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isMap;

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */

function isMap(v) {
  return v instanceof _Map2['default'];
}

module.exports = exports['default'];

},{"./Map":3,"babel-runtime/helpers/interop-require-default":109}],27:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodashLangIsPlainObject = require('lodash/lang/isPlainObject');

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

exports['default'] = _lodashLangIsPlainObject2['default'];
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"lodash/lang/isPlainObject":263}],28:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = isSet;

var _Set = require('./Set');

var _Set2 = _interopRequireDefault(_Set);

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */

function isSet(v) {
  return v instanceof _Set2['default'];
}

module.exports = exports['default'];

},{"./Set":5,"babel-runtime/helpers/interop-require-default":109}],29:[function(require,module,exports){
'use strict';

/**
 * Returns a new iterator which maps every value from the provided iterator via
 * the callback function.
 *
 * @param {Iterator} iterator
 * @param {function} map
 * @param {?=} opt_this_obj
 * @return {Iterator}
 */

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = mapIterator;
var marked0$0 = [mapIterator].map(_regeneratorRuntime.mark);

function mapIterator(iterator, map, optThisObj) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

  return _regeneratorRuntime.wrap(function mapIterator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = _getIterator(iterator);

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 12;
          break;
        }

        v = _step.value;
        context$1$0.next = 9;
        return map.call(optThisObj, v);

      case 9:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t0 = context$1$0['catch'](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t0;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[3, 14, 18, 26], [19,, 21, 25]]);
}

module.exports = exports['default'];

},{"babel-runtime/core-js/get-iterator":89,"babel-runtime/regenerator":112}],30:[function(require,module,exports){
'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = mapSequence;

var _lodashLangIsPlainObject = require('lodash/lang/isPlainObject');

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

var _lodashObjectMapValues = require('lodash/object/mapValues');

var _lodashObjectMapValues2 = _interopRequireDefault(_lodashObjectMapValues);

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

var _mapIterator = require('./mapIterator');

var _mapIterator2 = _interopRequireDefault(_mapIterator);

var nativeMap = Array.prototype.map;

/**
 * Helper to map sequence types (arrays, array-like objects, objects, etc).
 * Note that if an array-like object is passed, an array is returned:
 *
 * Array -> Array
 * ArrayLike -> Array
 * Iterator -> Iterator
 * Iterable -> Iterator
 * Object -> Object
 *
 * @param {Iterable} sequence
 * @param {function(this:T,...)} callback
 * @param {T=} this_obj
 * @template T
 *
 * @return {(Array|Object|Iterator)}
 */

function mapSequence(sequence, callback, thisObj) {
  if ((0, _isArrayLike2['default'])(sequence)) {
    return nativeMap.call(sequence, callback, thisObj);
  } else if ((0, _isIterable2['default'])(sequence)) {
    sequence = _getIterator(sequence);
  }
  if ((0, _isIterator2['default'])(sequence)) {
    return (0, _mapIterator2['default'])(sequence, callback, thisObj);
  } else if ((0, _lodashLangIsPlainObject2['default'])(sequence)) {
    return (0, _lodashObjectMapValues2['default'])(sequence, callback, thisObj);
  } else {
    throw new TypeError("Can't map value of type %s", typeof sequence);
  }
}

module.exports = exports['default'];

},{"./isArrayLike":21,"./isIterable":24,"./isIterator":25,"./mapIterator":29,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"lodash/lang/isPlainObject":263,"lodash/object/mapValues":270}],31:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = max;

var _forEach = require('./forEach');

var _forEach2 = _interopRequireDefault(_forEach);

/**
 * Returns the maximum value from an iterable. It uses the optional callback
 * function to determine the value to compare.
 *
 * @param {Iterable} iterable
 * @param {function(?): ?} map
 * @return {?}
 */

function max(iterable, map) {
  var maxComparisonValue = -Infinity;
  var maxValue;

  (0, _forEach2['default'])(iterable, function (value) {
    var comparisonValue = map ? map(value) : value;
    if (comparisonValue > maxComparisonValue) {
      maxComparisonValue = comparisonValue;
      maxValue = value;
    }
  });

  return maxValue;
}

module.exports = exports['default'];

},{"./forEach":14,"babel-runtime/helpers/interop-require-default":109}],32:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isSupported = isSupported;
exports.serialize = serialize;
exports.deserialize = deserialize;
exports.serializeAll = serializeAll;

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

var _isPlainObject = require('./isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Map = require('./Map');

var _Map2 = _interopRequireDefault(_Map);

var _Set = require('./Set');

var _Set2 = _interopRequireDefault(_Set);

var _classes = require('../classes');

var classes = _interopRequireWildcard(_classes);

var KEY = '__type-jsnx__';

/**
 * @fileoverview
 * Helper methods to serialize and unserialize data for communicating with
 * workers.
 */

function serializeSet(value) {
  // istanbul ignore next

  var _ref;

  // TODO: serialize nested values
  return _ref = {}, _defineProperty(_ref, KEY, 'Set'), _defineProperty(_ref, 'data', _Array$from(value.values())), _ref;
}

function deserializeSet(value) {
  return new _Set2['default'](value.data);
}

function serializeMap(value) {
  // istanbul ignore next

  var _ref2;

  return _ref2 = {}, _defineProperty(_ref2, KEY, 'Map'), _defineProperty(_ref2, 'data', (function () {
    var _data = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(value), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var k = _step$value[0];
        var v = _step$value[1];

        _data.push([k, serialize(v)]);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return _data;
  })()), _ref2;
}

//eslint-disable-line no-undef
function deserializeMap(value) {
  return new _Map2['default'](value.data.map(function (kv) {
    return kv[1] = deserialize(kv[1]), kv;
  }));
}

function serializeGraph(value) {
  // istanbul ignore next

  var _ref3;

  // TODO: serialize complex edge and node data
  return _ref3 = {}, _defineProperty(_ref3, KEY, value.constructor.__name__), _defineProperty(_ref3, 'data', value.graph), _defineProperty(_ref3, 'nodes', _Array$from(value.node)), _defineProperty(_ref3, 'edges', value.edges(null, true)), _ref3;
}

function deserializeGraph(value) {
  var G = new classes[value[KEY]](value.edges, value.data);
  G.addNodesFrom(value.nodes);
  return G;
}

/**
 * Returns true if the value can be properly serialized, otherwise false.
 *
 * @param {*} value
 * @return {boolean}
 */

function isSupported(value) {
  var type = typeof value;
  return(
    // Primitives
    value == null || type === 'string' || type === 'number' || type === 'boolean' ||

    // Objects and arrays (we just assume they contain only primitives)
    (0, _isPlainObject2['default'])(value) || Array.isArray(value) ||

    // Our custom collections (shallow)
    value instanceof _Map2['default'] || value instanceof _Set2['default'] ||

    // Graphs
    value.constructor.__name__ === 'Graph' || value.constructor.__name__ === 'DiGraph' ||

    // Generic iterables
    (0, _isIterable2['default'])(value)
  );
}

function serialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  }
  // Collections
  if (value instanceof _Set2['default']) {
    return serializeSet(value);
  } else if (value instanceof _Map2['default']) {
    return serializeMap(value);
  }
  // Graphs
  else if (value.constructor.__name__ === 'Graph' || value.constructor.__name__ === 'DiGraph') {
      return serializeGraph(value);
    }
    // Iterables
    else if ((0, _isIterable2['default'])(value)) {
        // We keep it simple for now and don't serialize the values of the iterable
        // itself
        return _Array$from(value);
      }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

function deserialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  }
  // custom serializtion?
  if (value[KEY]) {
    switch (value[KEY]) {
      case 'Map':
        return deserializeMap(value);
      case 'Set':
        return deserializeSet(value);
      case 'Graph':
      case 'DiGraph':
        return deserializeGraph(value);
    }
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

/**
 * Serialize an array of values (e.g. arguments passed to a method).,
 *
 * @param {Array} values
 * @return {{serializable: bool, values: Array}}
 */

function serializeAll() {
  var values = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

  var serializedValues = new Array(values.length);
  var serializable = values.every(function (value, i) {
    var supported = isSupported(value);
    if (supported) {
      serializedValues[i] = serialize(value);
    }
    return supported;
  });

  return { serializable: serializable, serializedValues: serializedValues };
}

},{"../classes":65,"./Map":3,"./Set":5,"./isIterable":24,"./isPlainObject":27,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/define-property":105,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110,"babel-runtime/helpers/sliced-to-array":111}],33:[function(require,module,exports){
'use strict';

/**
 * Returns the next value of an iterator or throws an error if the iterator was
 * already consumed.
 *
 * @param {Iterator} iterator
 * @return {?}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = next;

function next(iterator) {
  var result = iterator.next();
  if (result.done) {
    throw new Error('Iterator is already exhausted');
  }
  return result.value;
}

module.exports = exports['default'];

},{}],34:[function(require,module,exports){
'use strict';

/**
 * Returns true if the two values are equal node values. If the values are
 * primitives, they are compared directly. If they are objects, their string
 * representation is compared.
 *
 * @param {Node} a
 * @param {Node} b
 * @return {boolean}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nodesAreEqual;

function nodesAreEqual(a, b) {
  return a === b || typeof a === 'object' && a.toString() === b.toString();
}

module.exports = exports['default'];

},{}],35:[function(require,module,exports){
'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = range;

var _genRange = require('./genRange');

var _genRange2 = _interopRequireDefault(_genRange);

/**
 * Implements Python's range function, returns an array.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} optStart Number to start from
 * @param {?number=} optEnd Number to count to
 * @param {?number=} optStep Step size
 * @return {!Array}
 */

function range(optStart, optEnd, optStep) {
  return _Array$from((0, _genRange2['default'])(optStart, optEnd, optStep));
}

module.exports = exports['default'];

},{"./genRange":18,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109}],36:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = size;

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isGraph = require('./isGraph');

var _isGraph2 = _interopRequireDefault(_isGraph);

var _lodashLangIsPlainObject = require('lodash/lang/isPlainObject');

var _lodashLangIsPlainObject2 = _interopRequireDefault(_lodashLangIsPlainObject);

var _lodashCollectionSize = require('lodash/collection/size');

var _lodashCollectionSize2 = _interopRequireDefault(_lodashCollectionSize);

/**
 * Returns the number of elements in the container. That is
 * the number of elements in the array or object or the length
 * of a string.
 *
 * @param {(string|Object|ArrayLike|Graph)} obj
 *    Object to determine the length of
 *
 * @return {number} The number of elements
 * @throws {TypeError} When length cannot be determined
 */

function size(obj) {
  if ((0, _isGraph2['default'])(obj)) {
    return obj.numberOfNodes();
  } else if (typeof obj === 'string' || (0, _isArrayLike2['default'])(obj)) {
    return obj.length;
  } else if ((0, _lodashLangIsPlainObject2['default'])(obj)) {
    return (0, _lodashCollectionSize2['default'])(obj);
  } else {
    throw new TypeError('Expected a graph object, array, string or object, but got %s instead', typeof obj);
  }
}

module.exports = exports['default'];

},{"./isArrayLike":21,"./isGraph":23,"babel-runtime/helpers/interop-require-default":109,"lodash/collection/size":205,"lodash/lang/isPlainObject":263}],37:[function(require,module,exports){
'use strict';

/**
 * Returns true if the callback function returns true for any of the elements
 * of the iterator.
 *
 * @param {Iterator} iterator
 * @param {function} callback
 * @return {boolean}
 */

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = someIterator;

function someIterator(iterator, callback) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(iterator), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (callback(value)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

module.exports = exports['default'];

},{"babel-runtime/core-js/get-iterator":89}],38:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _tinySprintf = require('tiny-sprintf');

var _tinySprintf2 = _interopRequireDefault(_tinySprintf);

var undef;

_tinySprintf2['default'].j = function (value) {
  if (value === undef) {
    return undef + '';
  }

  try {
    return JSON.stringify(value);
  } catch (e) {
    return value + '';
  }
};

exports['default'] = _tinySprintf2['default'];
module.exports = exports['default'];

},{"babel-runtime/helpers/interop-require-default":109,"tiny-sprintf":277}],39:[function(require,module,exports){
'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = toIterator;

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

var _isIterable = require('./isIterable');

var _isIterable2 = _interopRequireDefault(_isIterable);

/**
 * Returns an iterator object for the given array, array-like object
 * or object. Should behave like Python's iter:
 * http://docs.python.org/library/functions.html#iter
 *
 *
 * The iterator object implements the goog.iter.Iterator interface.
 *
 * @param {Iterable} seq
 * @return {!Iterator}
 */

function toIterator(seq) {
  /*jshint expr:true*/
  if ((0, _isIterator2['default'])(seq)) {
    return seq;
  } else if ((0, _isIterable2['default'])(seq)) {
    return _getIterator(seq);
  } else if (Array.isArray(seq) || (0, _isArrayLike2['default'])(seq)) {
    return _regeneratorRuntime.mark(function callee$1$0(seq) {
      var i, l;
      return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            i = 0, l = seq.length;

          case 1:
            if (!(i < l)) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 4;
            return seq[i];

          case 4:
            i++;
            context$2$0.next = 1;
            break;

          case 7:
          case 'end':
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })(seq);
  } else {
    throw new TypeError('Unable to convert ' + seq + ' to an iterator');
  }
}

module.exports = exports['default'];
// eslint-disable-line no-shadow

},{"./isArrayLike":21,"./isIterable":24,"./isIterator":25,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/regenerator":112}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.tuple2 = tuple2;
exports.tuple3 = tuple3;
exports.tuple4 = tuple4;
exports.tuple2c = tuple2c;
exports.tuple3c = tuple3c;
exports.tuple4c = tuple4c;
exports.createTupleFactory = createTupleFactory;
var t2 = new Array(2);
var t3 = new Array(3);
var t4 = new Array(4);

/**
 * This function always returns the same instance of an array for a given number
 * of arguments.
 * It should be used instead of creating temporary arrays, if the arrays are
 * consumed immediately anyways.
 *
 * @param {...*} var_args The elemens of the tuple
 * @return {Array}
 */

function tuple2(x, y) {
  t2[0] = x;
  t2[1] = y;
  return t2;
}

function tuple3(x, y, z) {
  t3[0] = x;
  t3[1] = y;
  t3[2] = z;
  return t3;
}

function tuple4(a, b, c, d) {
  t4[0] = a;
  t4[1] = b;
  t4[2] = c;
  t4[3] = d;
  return t4;
}

/**
 * Same as tuple2, but sets the values on container instead of the allocated
 * array here. Useful to reuse an existing array.
 *
 * @param {...*} var_args The elemens of the tuple
 * @param {Array} opt_container If present, set values there instead
 * @return {Array}
 */

function tuple2c(x, y, container) {
  container.length = 2;
  container[0] = x;
  container[1] = y;
  return container;
}

function tuple3c(x, y, z, container) {
  container.length = 3;
  container[0] = x;
  container[1] = y;
  container[2] = z;
  return container;
}

function tuple4c(a, b, c, d, container) {
  container.length = 4;
  container[0] = a;
  container[1] = b;
  container[2] = c;
  container[3] = d;
  return container;
}

function createTupleFactory(count) {
  var t = new Array(count);
  switch (count) {
    case 2:
      return function (a, b) {
        t[0] = a;
        t[1] = b;
        return t;
      };
    case 3:
      return function (a, b, c) {
        t[0] = a;
        t[1] = b;
        t[2] = c;
        return t;
      };
    default:
      throw new Error('Typle size not supported.');
  }
}

},{}],41:[function(require,module,exports){
'use strict';

/**
 * Takes a number of iterators and returns a new iterator which emits an array
 * of each of the iterators next values. Stops when the shortest iterator is
 * exhausted.
 *
 * @param {...Iterator} var_args
 * @return {Iterator}
 */

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = zipIterator;
var marked0$0 = [zipIterator].map(_regeneratorRuntime.mark);

function zipIterator() {
  var varArgs,
      length,
      done,
      nextZip,
      i,
      next,
      args$1$0 = arguments;
  return _regeneratorRuntime.wrap(function zipIterator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        varArgs = args$1$0;
        length = varArgs.length;

      case 2:
        if (!true) {
          context$1$0.next = 21;
          break;
        }

        done = false;
        nextZip = new Array(length);
        i = 0;

      case 6:
        if (!(i < length)) {
          context$1$0.next = 15;
          break;
        }

        next = varArgs[i].next();

        if (!next.done) {
          context$1$0.next = 11;
          break;
        }

        done = true;
        return context$1$0.abrupt('break', 15);

      case 11:
        nextZip[i] = next.value;

      case 12:
        i++;
        context$1$0.next = 6;
        break;

      case 15:
        if (!done) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt('break', 21);

      case 17:
        context$1$0.next = 19;
        return nextZip;

      case 19:
        context$1$0.next = 2;
        break;

      case 21:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

module.exports = exports['default'];

// TODO: Use rest parameter once 6to5 is fixed (2.0)

},{"babel-runtime/regenerator":112}],42:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = zipSequence;

var _isArrayLike = require('./isArrayLike');

var _isArrayLike2 = _interopRequireDefault(_isArrayLike);

var _isIterator = require('./isIterator');

var _isIterator2 = _interopRequireDefault(_isIterator);

var _zipIterator = require('./zipIterator');

var _zipIterator2 = _interopRequireDefault(_zipIterator);

function zipArray() {
  for (var _len = arguments.length, varArgs = Array(_len), _key = 0; _key < _len; _key++) {
    varArgs[_key] = arguments[_key];
  }

  // Pre-allocation arrays speeds up assignment drastically, so we want to
  // optimize for that case
  var length = varArgs.length;
  var min = Infinity;
  var i;
  var result;
  var nextZip = new Array(length);

  // first pass
  for (i = 0; i < length; i++) {
    var array = varArgs[i];
    var arrayLength = array.length;
    if (arrayLength < min) {
      min = arrayLength;
      if (min === 0) {
        return []; // backout early
      }
    }
    nextZip[i] = array[0];
  }
  result = new Array(min);
  result[0] = nextZip;

  for (i = 1; i < min; i++) {
    nextZip = new Array(length);
    for (var j = 0; j < length; j++) {
      nextZip[j] = varArgs[j][i];
    }
    result[i] = nextZip;
  }
  return result;
}

/**
 * Helper to zip sequence types (arrays, array-like objects, objects, etc).
 * All arguments must be the same type. The first argument is used to determine
 * the type.
 * This behaves the same as Python's zip function, i.e. the result has the
 * length of the shortest input.
 *
 * Array -> Array
 * Array-like -> Array
 * Iterator -> Iterator
 *
 * @param {...(Iterable)} var_args
 *
 * @return {!(Array|Iterator)}
 */

function zipSequence() {
  for (var _len2 = arguments.length, varArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    varArgs[_key2] = arguments[_key2];
  }

  var first = varArgs[0];

  if ((0, _isArrayLike2['default'])(first)) {
    return zipArray.apply(null, varArgs);
  } else if ((0, _isIterator2['default'])(first)) {
    return _zipIterator2['default'].apply(null, varArgs);
  } else {
    throw new TypeError('Expected an iterator, array-like object or object, but got %s instead', first);
  }
}

module.exports = exports['default'];

},{"./isArrayLike":21,"./isIterator":25,"./zipIterator":41,"babel-runtime/helpers/interop-require-default":109}],43:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.betweennessCentrality = betweennessCentrality;
exports.genBetweennessCentrality = genBetweennessCentrality;
exports.edgeBetweennessCentrality = edgeBetweennessCentrality;
exports.genEdgeBetweennessCentrality = genEdgeBetweennessCentrality;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _internals = require('../../_internals');

/**
 * Compute the shortest-path betweenness centrality for nodes.
 *
 * Betweenness centrality of a node `$v$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$v$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|v)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths,  and `$\sigma(s, t|v)$` is the number of those
 * paths  passing through some  node `$v$` other than `$s, t$`.
 * If `$s = t$`, `$\sigma(s, t) = 1$`, and if `$v \in {s, t}$`,
 * `$\sigma(s, t|v) = 0$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]):
 *
 * See ([2][]) for details on algorithms for variations and related metrics.
 *
 * For approximate betweenness calculations set `k=#samples` to use
 * `k` nodes ("pivots") to estimate the betweenness values. For an estimate
 * of the number of pivots needed see ([3][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality.
 *    Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 *
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * [3] [Ulrik Brandes and Christian Pich:
 *    Centrality Estimation in Large Networks.
 *    International Journal of Bifurcation and Chaos 17(7):2303-2318, 2007.][3]
 * [3]: http://www.inf.uni-konstanz.de/algo/publications/bp-celn-06.pdf
 *
 * @see edgeBetweennessCentrality
 * @see loadCentrality
 *
 * @param {!Graph} G A JSNetworkX graph
 * @param {{k: ?number, normalized: ?bool, weight: ?string,endpoints: ?bool}=} optParameters
 *   - `k` (int)
 *
 *     If `k` is defined use `k` node samples to estimate betweenness.
 *     The value of `k <= n` where `n` is the number of nodes in the graph.
 *     Higher values give better approximation.
 *   - `normalized` (bool)
 *
 *     If `true`, the betweenness values are normalized by `2/((n-1)(n-2))`
 *     for graphs and `1/((n-1)(n-2))` for directed graphs where `n` is the
 *     number of nodes in G.
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 *   - `endpoints` (default=false)
 *
 *     If true include the endpoints in the shortest path counts.
 *
 * @return {Map} object with node keys with betweenness centrality as the value.
 */
/*eslint max-len:[1, 94]*/
'use strict';

function betweennessCentrality(G) {
  // istanbul ignore next

  var _this = this;

  var optArgDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  // {k=null, normalized=true, weight=null, endpoints=false}
  var k = optArgDict.k;
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;
  var endpoints = optArgDict.endpoints;

  normalized = normalized == null ? true : normalized;
  endpoints = endpoints == null ? false : endpoints;

  var v;
  var betweenness = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  var nodes = G.nodes();
  if (k != null) {
    nodes = _internals.Arrays.sample(nodes, k);
  }

  nodes.forEach(function (s) {
    // single source shortest paths

    var _ref = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
    singleSourceDijkstraPathBasic(G, s, weight);

    var _ref2 = _slicedToArray(_ref, 3);

    var S = _ref2[0];
    var P = _ref2[1];
    var sigma = _ref2[2];
    // use Dijkstra's algorithm
    // accumulation
    betweenness = endpoints ? accumulateEndpoints(betweenness, S, P, sigma, s) : accumulateBasic(betweenness, S, P, sigma, s);
  });
  // rescaling
  return rescale(betweenness, G.order(), normalized, G.isDirected(), k);
}

/**
 * Compute betweenness centrality for edges.
 *
 * Betweenness centrality of an edge `$e$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$e$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|e)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths, and `$\sigma(s, t|e)$` is the number of
 * those paths passing through edge `$e$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality. Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * @see betweennessCentrality
 * @see edgeLoad
 *
 * @param {!Graph} G A NetworkX graph
 * @param {{normalized: bool=, weight: string=}=} optArgDict
 *   - `normalized` (default=false)
 *
 *     If true the betweenness values are normalized by `2/(n(n-1))`
 *     for graphs, and `1/(n(n-1))` for directed graphs where `n`
 *     is the number of nodes in G.
 *
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 * @return {Map} object with edge keys with betweenness centrality as the value.
*/

function genBetweennessCentrality(G, optArgDict) {
  return (0, _internalsDelegate2['default'])('betweennessCentrality', [G, optArgDict]);
}

function edgeBetweennessCentrality(G) {
  // istanbul ignore next

  var _this2 = this;

  var optArgDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;

  normalized = normalized == null ? true : normalized;

  var v;
  var betweenness = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _v2;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          context$2$0.prev = 3;
          _iterator2 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v2 = _step2.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v2, 0);

        case 9:
          _iteratorNormalCompletion2 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError2 = true;
          _iteratorError2 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError2) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError2;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this2, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(G.edgesIter()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var edge = _step3.value;

      betweenness.set(edge, 0);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(G), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var s = _step4.value;

      // single source shortest paths

      var _ref3 = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
      singleSourceDijkstraPathBasic(G, s, weight);

      var _ref32 = _slicedToArray(_ref3, 3);

      var S = _ref32[0];
      var P = _ref32[1];
      var sigma = _ref32[2];
      // use Dijkstra's algorithm
      // accumulation
      betweenness = accumulateEdges(betweenness, S, P, sigma, s);
    }
    // rescaling
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  var _iteratorNormalCompletion5 = true;
  var _didIteratorError5 = false;
  var _iteratorError5 = undefined;

  try {
    for (var _iterator5 = _getIterator(G), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
      var n = _step5.value;

      betweenness['delete'](n);
    }
  } catch (err) {
    _didIteratorError5 = true;
    _iteratorError5 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion5 && _iterator5['return']) {
        _iterator5['return']();
      }
    } finally {
      if (_didIteratorError5) {
        throw _iteratorError5;
      }
    }
  }

  return rescaleE(betweenness, G.order(), normalized, G.isDirected());
}

// helpers for betweenness centrality

function genEdgeBetweennessCentrality(G, optArgDict) {
  return (0, _internalsDelegate2['default'])('edgeBetweennessCentrality', [G, optArgDict]);
}

function singleSourceShortestPathBasic(G, s) {
  // istanbul ignore next

  var _this3 = this;

  var S = [];
  var P = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _v3;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion6 = true;
          _didIteratorError6 = false;
          _iteratorError6 = undefined;
          context$2$0.prev = 3;
          _iterator6 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v3 = _step6.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v3, []);

        case 9:
          _iteratorNormalCompletion6 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError6 = true;
          _iteratorError6 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError6) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError6;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this3, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, _v4;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion7 = true;
          _didIteratorError7 = false;
          _iteratorError7 = undefined;
          context$2$0.prev = 3;
          _iterator7 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v4 = _step7.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v4, 0);

        case 9:
          _iteratorNormalCompletion7 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError7 = true;
          _iteratorError7 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError7) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError7;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this3, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new _internals.Map();

  sigma.set(s, 1);
  D.set(s, 0);
  var Q = [s];
  while (Q.length > 0) {
    // use BFS to find shortest paths
    var v = Q.shift();
    S.push(v);
    var Dv = D.get(v);
    var sigmav = sigma.get(v);
    /* eslint-disable no-loop-func */
    G.neighbors(v).forEach(function (w) {
      if (!D.has(w)) {
        Q.push(w);
        D.set(w, Dv + 1);
      }
      if (D.get(w) === Dv + 1) {
        // this is a shortest path, count paths
        sigma.set(w, sigma.get(w) + sigmav);
        P.get(w).push(v); // predecessors
      }
    });
    /* eslint-enable no-loop-func */
  }
  return [S, P, sigma];
}

function singleSourceDijkstraPathBasic(G, s) {
  // istanbul ignore next

  var _this4 = this;

  var weight = arguments.length <= 2 || arguments[2] === undefined ? 'weight' : arguments[2];

  // modified from Eppstein
  var S = [];
  var P = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _v5;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion8 = true;
          _didIteratorError8 = false;
          _iteratorError8 = undefined;
          context$2$0.prev = 3;
          _iterator8 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v5 = _step8.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v5, []);

        case 9:
          _iteratorNormalCompletion8 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError8 = true;
          _iteratorError8 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError8) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError8;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this4, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, _v6;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion9 = true;
          _didIteratorError9 = false;
          _iteratorError9 = undefined;
          context$2$0.prev = 3;
          _iterator9 = _getIterator(G);

        case 5:
          if (_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v6 = _step9.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_v6, 0);

        case 9:
          _iteratorNormalCompletion9 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError9 = true;
          _iteratorError9 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError9) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError9;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this4, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new _internals.Map();

  sigma.set(s, 1);
  var seen = new _internals.Map([(0, _internals.tuple2)(s, 0)]);
  // use Q as heap with (distance,node id) tuples
  var Q = new _internals.PriorityQueue();
  Q.enqueue(0, [s, s]);
  while (Q.size > 0) {
    var _Q$dequeue = Q.dequeue();

    var _Q$dequeue2 = _slicedToArray(_Q$dequeue, 2);

    var dist = _Q$dequeue2[0];

    var _Q$dequeue2$1 = _slicedToArray(_Q$dequeue2[1], 2);

    var pred = _Q$dequeue2$1[0];
    var v = _Q$dequeue2$1[1];

    if (D.has(v)) {
      continue; // already searched this node.
    }
    sigma.set(v, sigma.get(v) + sigma.get(pred)); // count paths
    S.push(v);
    D.set(v, dist);

    var _iteratorNormalCompletion10 = true;
    var _didIteratorError10 = false;
    var _iteratorError10 = undefined;

    try {
      for (var _iterator10 = _getIterator(G.get(v)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
        var _step10$value = _slicedToArray(_step10.value, 2);

        var w = _step10$value[0];
        var edgedata = _step10$value[1];

        var vwDist = dist + (0, _internals.getDefault)(edgedata[weight], 1);
        if (!D.has(w) && (!seen.has(w) || vwDist < seen.get(w))) {
          seen.set(w, vwDist);
          Q.enqueue(vwDist, [v, w]);
          sigma.set(w, 0);
          P.set(w, [v]);
        } else if (vwDist === seen.get(w)) {
          // handle equal paths
          sigma.set(w, sigma.get(w) + sigma.get(v));
          P.get(w).push(v);
        }
      }
    } catch (err) {
      _didIteratorError10 = true;
      _iteratorError10 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion10 && _iterator10['return']) {
          _iterator10['return']();
        }
      } finally {
        if (_didIteratorError10) {
          throw _iteratorError10;
        }
      }
    }
  }
  return [S, P, sigma];
}

function accumulateBasic(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this5 = this;

  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _s;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          context$2$0.prev = 3;
          _iterator11 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s = _step11.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s, 0);

        case 9:
          _iteratorNormalCompletion11 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError11 = true;
          _iteratorError11 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion11 && _iterator11['return']) {
            _iterator11['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError11) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError11;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this5, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function accumulateEndpoints(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this6 = this;

  betweenness.set(s, betweenness.get(s) + S.length - 1);
  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _s2;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          context$2$0.prev = 3;
          _iterator12 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s2 = _step12.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s2, 0);

        case 9:
          _iteratorNormalCompletion12 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError12 = true;
          _iteratorError12 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion12 && _iterator12['return']) {
            _iterator12['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError12) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError12;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this6, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w) + 1);
    }
  }
  return betweenness;
}

function accumulateEdges(betweenness, S, P, sigma, s) {
  // istanbul ignore next

  var _this7 = this;

  var delta = new _internals.Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion13, _didIteratorError13, _iteratorError13, _iterator13, _step13, _s3;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion13 = true;
          _didIteratorError13 = false;
          _iteratorError13 = undefined;
          context$2$0.prev = 3;
          _iterator13 = _getIterator(S);

        case 5:
          if (_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s3 = _step13.value;
          context$2$0.next = 9;
          return (0, _internals.tuple2)(_s3, 0);

        case 9:
          _iteratorNormalCompletion13 = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t0 = context$2$0['catch'](3);
          _didIteratorError13 = true;
          _iteratorError13 = context$2$0.t0;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion13 && _iterator13['return']) {
            _iterator13['return']();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError13) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError13;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, _this7, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */
    P.get(w).forEach(function (v) {
      var c = sigma.get(v) * coeff;
      var edge = [v, w];
      if (!betweenness.has(edge)) {
        edge = [w, v];
      }
      betweenness.set(edge, betweenness.get(edge) + c);
      delta.set(v, delta.get(v) + c);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes
    if (w !== s || typeof w === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function rescale(betweenness, n, optNormalized, optDirected, optK) {
  if (optDirected === undefined) optDirected = false;

  var scale;
  if (optNormalized) {
    scale = n <= 2 ? null : 1 / ((n - 1) * (n - 2));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    if (optK != null) {
      scale = scale * n / optK;
    }
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}

function rescaleE(betweenness, n, optNormalized, optDirected) {
  var scale;
  if (optNormalized) {
    scale = n <= 1 ? null : 1 / (n * (n - 1));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}

},{"../../_internals":20,"../../_internals/delegate":12,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],44:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.eigenvectorCentrality = eigenvectorCentrality;
exports.genEigenvectorCentrality = genEigenvectorCentrality;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptions = require('../../exceptions');

var _internals = require('../../_internals');

/**
 * Compute the eigenvector centrality for `G`.
 *
 * Eigenvector centrality computes the centrality for a node based on the
 * centrality of its neighbors. The eigenvector centrality for node `i` is
 *
 * ```math
 * Ax = \lambda x
 * ```
 *
 * where `$A$` is the adjacency matrix of the graph `G` with eigenvalue
 * `$\lambda$`. By virtue of the Perron-Frobinus theorem, there is a unique and
 * positive solution if `$\lambda$` is the largest eigenvalue associated with
 * the eigenvector of the adjacency matrix `$A$`. ([2])
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * jsnx.eigenvectorCentrality(G);
 * // Map {0: 0.37, 1: 0.6, 2: 0.6, 3: 0.37}
 * ```
 *
 * ### Notes
 *
 * The measure was introduced by ([1][]).
 *
 * The eigenvector calculation is done by the power iteration method and has
 * no guarantee of convergence. The iteration will stop after `maxIter`
 * iterations or an error tolerance of `numberOfNodes(G) * tol` has been
 * reached.
 *
 * For directed graphs this is "left" eigenvector centrality which corresponds
 * to the in-edges in the graph. For out-edges eigenvector centrality
 * first reverse the graph with `G.reverse()`.
 *
 * ### References
 *
 * [1] [Phillip Bonacich:
 *     Power and Centrality: A Family of Measures.
 *     American Journal of Sociology 92(5):1170–1182, 1986](1)
 * [1]: http://www.leonidzhukov.net/hse/2014/socialnetworks/papers/Bonacich-Centrality.pdf
 * [2] Mark E. J. Newman:
 *     Networks: An Introduction.
 *     Oxford University Press, USA, 2010, pp. 169.
 *
 * @see pagerank
 * @see hits
 *
 * @param {Graph} G
 * @param {{maxIter: ?number, tolerance: ?number, nstart: ?Map, weight: ?string}} optParameters
 *   - maxIter: Maximum number of iterations in power method.
 *   - tolerance: Error tolerance used to check convergence in power method
 *     iteration.
 *   - nstart: Starting value of eigenvector iteration for each node.
 *   - weight: If not defined, all edge weights are considered equal. Otherwise
 *     holds the name of the edge attribute used as weight.
 * @return {Map} Map of nodes with eigenvector centrality as the value
 */
'use strict';

function eigenvectorCentrality(G) {
  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var _ref$maxIter = _ref.maxIter;
  var maxIter = _ref$maxIter === undefined ? 100 : _ref$maxIter;
  var _ref$tolerance = _ref.tolerance;
  var tolerance = _ref$tolerance === undefined ? 1e-6 : _ref$tolerance;
  var nstart = _ref.nstart;
  var weight = _ref.weight;

  var sqrt = Math.sqrt;
  var pow = Math.pow;
  var abs = Math.abs;

  if (G.isMultigraph()) {
    throw new _exceptions.JSNetworkXException('Not defined for multigraphs.');
  }

  if (G.order() === 0) {
    throw new _exceptions.JSNetworkXException('Empty graph.');
  }

  var x = undefined;
  var zeroMap = new _internals.Map();
  if (!nstart) {
    // choose starting vector with entries of 1/#G
    var start = 1 / G.order();
    x = new _internals.Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        x.set(n, start);
        zeroMap.set(n, 0);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    x = nstart;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(x.keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var n = _step2.value;

        zeroMap.set(n, 0);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  // normalize starting vector
  var sum = 0;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(x.values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var v = _step3.value;

      sum += v;
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  sum = 1 / sum;

  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(x), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 2);

      var k = _step4$value[0];
      var v = _step4$value[1];

      x.set(k, v * sum);
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  tolerance = G.order() * tolerance;
  // make up to maxIter iterations
  for (var i = 0; i < maxIter; i++) {
    var xlast = x;
    x = new _internals.Map(zeroMap);

    // do the multiplication y^T = x^T A
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(x), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var _step5$value = _slicedToArray(_step5.value, 2);

        var n = _step5$value[0];
        var v = _step5$value[1];
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = _getIterator(G.get(n)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _step8$value = _slicedToArray(_step8.value, 2);

            var nbr = _step8$value[0];
            var data = _step8$value[1];

            x.set(nbr, x.get(nbr) + xlast.get(n) * (0, _internals.getDefault)(weight && data[weight], 1));
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8['return']) {
              _iterator8['return']();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }

      // normalize vector
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    var _sum = 0;
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = _getIterator(x.values()), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var v = _step6.value;

        _sum += pow(v, 2);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
          _iterator6['return']();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    _sum = sqrt(_sum);
    // this should never be zero?
    _sum = _sum === 0 ? 1 : 1 / _sum;

    var error = 0;
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _getIterator(x), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var _step7$value = _slicedToArray(_step7.value, 2);

        var n = _step7$value[0];
        var v = _step7$value[1];

        v = v * _sum;
        x.set(n, v);
        // check error convergence
        error += abs(v - xlast.get(n));
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
          _iterator7['return']();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    if (error < tolerance) {
      return x;
    }
  }

  throw new _exceptions.JSNetworkXError('eigenvectorCentrality(): power iteration failed to converge in ' + (maxIter + ' iterations.'));
}

// not ported:
// eigenvectorCentralityNumpy

function genEigenvectorCentrality(G, _maxIter$tolerance$nstart$weight) {
  return (0, _internalsDelegate2['default'])('eigenvectorCentrality', [G, _maxIter$tolerance$nstart$weight]);
}

},{"../../_internals":20,"../../_internals/delegate":12,"../../exceptions":78,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],45:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _betweenness = require('./betweenness');

var betweenness = _interopRequireWildcard(_betweenness);

var _eigenvector = require('./eigenvector');

var eigenvector = _interopRequireWildcard(_eigenvector);

exports.betweenness = betweenness;
exports.eigenvector = eigenvector;

_defaults(exports, _interopExportWildcard(_betweenness, _defaults));

_defaults(exports, _interopExportWildcard(_eigenvector, _defaults));

},{"./betweenness":43,"./eigenvector":44,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],46:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.findCliques = findCliques;
exports.genFindCliques = genFindCliques;
exports.findCliquesRecursive = findCliquesRecursive;
exports.genFindCliquesRecursive = genFindCliquesRecursive;
exports.graphCliqueNumber = graphCliqueNumber;
exports.genGraphCliqueNumber = genGraphCliqueNumber;
exports.graphNumberOfCliques = graphNumberOfCliques;
exports.genGraphNumberOfCliques = genGraphNumberOfCliques;
exports.numberOfCliques = numberOfCliques;
exports.genNumberOfCliques = genNumberOfCliques;
var marked0$0 = [findCliques, findCliquesRecursive].map(_regeneratorRuntime.mark);

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _internals = require('../_internals');

/**
 * @fileoverview
 * Find and manipulate cliques of graphs.
 *
 * Note that finding the largest clique of a graph has been
 * shown to be an NP-complete problem; the algorithms here
 * could take a long time to run.
 *
 * http://en.wikipedia.org/wiki/Clique_problem
 */

// TODO: enumerate_all_cliques

/**
 * Search for all maximal cliques in a graph.
 *
 * Maximal cliques are the largest complete subgraph containing
 * a given node.  The largest maximal clique is sometimes called
 * the maximum clique.
 *
 *
 * ### Notes
 *
 * Based on the algorithm published by Bron & Kerbosch (1973) ([1][])
 * as adapted by Tomita, Tanaka and Takahashi (2006) ([2][])
 * and discussed in Cazals and Karande (2008) ([3][]).
 *
 * This algorithm ignores self-loops and parallel edges as
 * clique is not conventionally defined with such edges.
 *
 * There are often many cliques in graphs.  This algorithm can
 * run out of memory for large graphs.
 *
 * ### References
 *
 * [1] [Bron, C. and Kerbosch, J. 1973.
 *    Algorithm 457: finding all cliques of an undirected graph.
 *    Commun. ACM 16, 9 (Sep. 1973), 575-577.][1]
 * [1]: http://portal.acm.org/citation.cfm?doid=362342.362367
 *
 * [2] [Etsuji Tomita, Akira Tanaka, Haruhisa Takahashi,
 *    The worst-case time complexity for generating all maximal
 *    cliques and computational experiments,
 *    Theoretical Computer Science, Volume 363, Issue 1,
 *    Computing and Combinatorics,
 *    10th Annual International Conference on
 *    Computing and Combinatorics (COCOON 2004), 25 October 2006,
 *    Pages 28-42][2]
 * [2]: http://dx.doi.org/10.1016/j.tcs.2006.06.015
 *
 * [3] [F. Cazals, C. Karande,
 *    A note on the problem of reporting maximal cliques,
 *    Theoretical Computer Science,
 *    Volume 407, Issues 1-3, 6 November 2008, Pages 564-568][3]
 * [3]: http://dx.doi.org/10.1016/j.tcs.2008.05.010
 *
 * @see findCliquesRecursive
 *
 * @param {Graph} G
 * @return {Iterator<Array<Node>>} Iterator over member lists for each maximal
 *  clique
 */
/*eslint max-len:[1, 94]*/
'use strict';

function findCliques(G) {
  var adj, subgraph, candidates, Q, u, extU, stack, q, adjQ, subgraphQ, candidatesQ, _stack$pop, _stack$pop2;

  return _regeneratorRuntime.wrap(function findCliques$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(G.numberOfNodes() === 0)) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', []);

      case 2:
        adj = new _internals.Map((0, _internals.mapIterator)(G, function (u) {
          var neighbors = new _internals.Set(G.neighborsIter(u));
          neighbors['delete'](u);
          return (0, _internals.tuple2)(u, neighbors);
        }));
        subgraph = new _internals.Set(G);
        candidates = new _internals.Set(G);
        Q = [null];
        u = (0, _internals.max)(subgraph, function (u) {
          return candidates.intersection(adj.get(u)).size;
        });
        extU = candidates.difference(adj.get(u));
        stack = [];

      case 9:
        if (!true) {
          context$1$0.next = 35;
          break;
        }

        if (!(extU.size > 0)) {
          context$1$0.next = 25;
          break;
        }

        q = extU.pop();

        candidates['delete'](q);
        Q[Q.length - 1] = q;
        adjQ = adj.get(q);
        subgraphQ = subgraph.intersection(adjQ);

        if (!(subgraphQ.size === 0)) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 19;
        return Q.slice();

      case 19:
        context$1$0.next = 23;
        break;

      case 21:
        candidatesQ = candidates.intersection(adjQ);

        if (candidatesQ.size > 0) {
          stack.push([subgraph, candidates, extU]);
          Q.push(null);
          subgraph = subgraphQ;
          candidates = candidatesQ;
          /* eslint-disable no-loop-func*/
          u = (0, _internals.max)(subgraph, function (u) {
            return candidates.intersection(adj.get(u)).size;
          });
          /* eslint-enable no-loop-func*/
          extU = candidates.difference(adj.get(u));
        }

      case 23:
        context$1$0.next = 33;
        break;

      case 25:
        if (!(Q.length === 0 || stack.length === 0)) {
          context$1$0.next = 27;
          break;
        }

        return context$1$0.abrupt('break', 35);

      case 27:
        Q.pop();
        _stack$pop = stack.pop();
        _stack$pop2 = _slicedToArray(_stack$pop, 3);
        subgraph = _stack$pop2[0];
        candidates = _stack$pop2[1];
        extU = _stack$pop2[2];

      case 33:
        context$1$0.next = 9;
        break;

      case 35:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

function genFindCliques(G) {
  return (0, _internalsDelegate2['default'])('findCliques', [G]);
}

;

/**
 * Recursive search for all maximal cliques in a graph.
 *
 * Maximal cliques are the largest complete subgraph containing
 * a given point.  The largest maximal clique is sometimes called
 * the maximum clique.
 *
 * ### Notes
 *
 * Based on the algorithm published by Bron & Kerbosch (1973) ([1][])
 * as adapted by Tomita, Tanaka and Takahashi (2006) ([2][])
 * and discussed in Cazals and Karande (2008) ([3][]).
 *
 * This algorithm ignores self-loops and parallel edges as
 * clique is not conventionally defined with such edges.
 *
 *
 * ### References
 *
 * [1] [Bron, C. and Kerbosch, J. 1973.
 *    Algorithm 457: finding all cliques of an undirected graph.
 *    Commun. ACM 16, 9 (Sep. 1973), 575-577.][1]
 * [1]: http://portal.acm.org/citation.cfm?doid=362342.362367
 *
 * [2] [Etsuji Tomita, Akira Tanaka, Haruhisa Takahashi,
 *    The worst-case time complexity for generating all maximal
 *    cliques and computational experiments,
 *    Theoretical Computer Science, Volume 363, Issue 1,
 *    Computing and Combinatorics,
 *    10th Annual International Conference on
 *    Computing and Combinatorics (COCOON 2004), 25 October 2006, Pages 28-42][2]
 * [2]: http://dx.doi.org/10.1016/j.tcs.2006.06.015
 *
 * [3] [F. Cazals, C. Karande,
 *    A note on the problem of reporting maximal cliques,
 *    Theoretical Computer Science,
 *    Volume 407, Issues 1-3, 6 November 2008, Pages 564-568][3]
 * [3]: http://dx.doi.org/10.1016/j.tcs.2008.05.010
 *
 * @param {Graph} G
 * @return {!Iterator<Array<Node>>} List of members in each maximal clique
 *
 * @see find_cliques
 */

function findCliquesRecursive(G) {
  var marked1$0, adj, Q, expand;
  return _regeneratorRuntime.wrap(function findCliquesRecursive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        expand = function expand(subgraph, candidates) {
          var u, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, q, adjQ, subgraphQ, candidatesQ;

          return _regeneratorRuntime.wrap(function expand$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
              case 0:
                u = (0, _internals.max)(subgraph, function (u) {
                  return candidates.intersection(adj.get(u)).size;
                });
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$2$0.prev = 4;
                _iterator = _getIterator(candidates.difference(adj.get(u)));

              case 6:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$2$0.next = 24;
                  break;
                }

                q = _step.value;

                candidates['delete'](q);
                Q.push(q);
                adjQ = adj.get(q);
                subgraphQ = subgraph.intersection(adjQ);

                if (!(subgraphQ.size === 0)) {
                  context$2$0.next = 17;
                  break;
                }

                context$2$0.next = 15;
                return Q.slice();

              case 15:
                context$2$0.next = 20;
                break;

              case 17:
                candidatesQ = candidates.intersection(adjQ);

                if (!(candidatesQ.size > 0)) {
                  context$2$0.next = 20;
                  break;
                }

                return context$2$0.delegateYield(expand(subgraphQ, candidatesQ), 't0', 20);

              case 20:
                Q.pop();

              case 21:
                _iteratorNormalCompletion = true;
                context$2$0.next = 6;
                break;

              case 24:
                context$2$0.next = 30;
                break;

              case 26:
                context$2$0.prev = 26;
                context$2$0.t1 = context$2$0['catch'](4);
                _didIteratorError = true;
                _iteratorError = context$2$0.t1;

              case 30:
                context$2$0.prev = 30;
                context$2$0.prev = 31;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                  _iterator['return']();
                }

              case 33:
                context$2$0.prev = 33;

                if (!_didIteratorError) {
                  context$2$0.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return context$2$0.finish(33);

              case 37:
                return context$2$0.finish(30);

              case 38:
              case 'end':
                return context$2$0.stop();
            }
          }, marked1$0[0], this, [[4, 26, 30, 38], [31,, 33, 37]]);
        };

        marked1$0 = [expand].map(_regeneratorRuntime.mark);

        if (!(G.size === 0)) {
          context$1$0.next = 5;
          break;
        }

        context$1$0.next = 5;
        return [];

      case 5:
        adj = new _internals.Map((0, _internals.mapIterator)(G, function (u) {
          var neighbors = new _internals.Set(G.neighborsIter(u));
          neighbors['delete'](u);
          return (0, _internals.tuple2)(u, neighbors);
        }));
        Q = [];
        return context$1$0.delegateYield(expand(new _internals.Set(G), new _internals.Set(G)), 't0', 8);

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this);
}

function genFindCliquesRecursive(G) {
  return (0, _internalsDelegate2['default'])('findCliquesRecursive', [G]);
}

;

//TODO: make_max_clique_graph
//TODO: make_clique_bipartite
//TODO: project_down
//TODO: project_up

/**
 * Return the clique number (size of the largest clique) for G.
 *
 * An optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optCliques
 * @return {number}
 */

function graphCliqueNumber(G, optCliques) {
  if (optCliques == null) {
    optCliques = findCliques(G); // eslint-disable-line no-undef
  }
  return (0, _internals.max)(optCliques, function (c) {
    return c.length;
  }).length;
}

/**
 * Returns the number of maximal cliques in G.
 *
 * An optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optCliques
 * @return {number}
 */

function genGraphCliqueNumber(G, optCliques) {
  return (0, _internalsDelegate2['default'])('graphCliqueNumber', [G, optCliques]);
}

function graphNumberOfCliques(G, optCliques) {
  if (optCliques == null) {
    optCliques = findCliques(G); // eslint-disable-line no-undef
  }
  return _Array$from(optCliques).length;
}

//TODO: node_clique_number

/**
 * Returns the number of maximal cliques for each node.
 *
 * Returns a single or list depending on input nodes.
 * Optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optNodes List of nodes
 * @param {Iterable=} optCliques List of cliques
 * @return {!(Map|number)}
 */

function genGraphNumberOfCliques(G, optCliques) {
  return (0, _internalsDelegate2['default'])('graphNumberOfCliques', [G, optCliques]);
}

function numberOfCliques(G, optNodes, optCliques) {
  optCliques = _Array$from(optCliques || findCliques(G)); // eslint-disable-line no-undef

  if (optNodes == null) {
    optNodes = G.nodes(); // none, get entire graph
  }

  var numcliq;
  if (!Array.isArray(optNodes)) {
    var v = optNodes;
    numcliq = optCliques.filter(function (c) {
      return new _internals.Set(c).has(v);
    }).length;
  } else {
    optCliques = optCliques.map(function (c) {
      return new _internals.Set(c);
    });
    numcliq = new _internals.Map();
    optNodes.forEach(function (v) {
      numcliq.set(v, optCliques.filter(function (c) {
        return c.has(v);
      }).length);
    });
  }
  return numcliq;
}

//TODO: cliques_containing_node

function genNumberOfCliques(G, optNodes, optCliques) {
  return (0, _internalsDelegate2['default'])('numberOfCliques', [G, optNodes, optCliques]);
}

/*jshint ignore:start*/

/*jshint ignore:end*/

// eslint-disable-line no-unused-expressions
// eslint-disable-line no-unused-expressions

},{"../_internals":20,"../_internals/delegate":12,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],47:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.triangles = triangles;
exports.genTriangles = genTriangles;
exports.averageClustering = averageClustering;
exports.genAverageClustering = genAverageClustering;
exports.clustering = clustering;
exports.genClustering = genClustering;
exports.transitivity = transitivity;
exports.genTransitivity = genTransitivity;
exports.squareClustering = squareClustering;
exports.genSquareClustering = genSquareClustering;
var marked0$0 = [trianglesAndDegreeIter, weightedTrianglesAndDegreeIter].map(_regeneratorRuntime.mark);

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _internals = require('../_internals');

/**
 * Compute the number of triangles.
 *
 * Finds the number of triangles that include a node as one vertex.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.triangles(G, 0);
 * // 6
 * jsnx.triangles(G);
 * Map {0: 6, 1: 6, 2: 6, 3: 6, 4: 6}
 * Array.from(jsnx.triangles(G, [0,1]).values());
 * // [6, 6]
 * ```
 *
 * ### Notes
 *
 * When computing triangles for the entire graph each triangle is counted
 * three times, once at each node.  Self loops are ignored.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!(Map|number)} Number of triangles keyed by node label.
 */
'use strict';

function triangles(G, optNodes) {
  if (G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('triangles() is not defined for directed graphs.');
  }

  if (optNodes != null && G.hasNode(optNodes)) {
    // return single value
    return Math.floor((0, _internals.next)(trianglesAndDegreeIter(G, optNodes))[2] / 2);
  }

  return new _internals.Map((0, _internals.mapIterator)(trianglesAndDegreeIter(G, optNodes),
  /* eslint-disable no-unused-vars */
  function (_ref) {
    var _ref2 = _slicedToArray(_ref, 3);

    var v = _ref2[0];
    var _ = _ref2[1];
    var triangles = _ref2[2];
    return (0, _internals.tuple2)(v, Math.floor(triangles / 2), v);
  }
  /* eslint-enable no-unused-vars */
  ));
}

/**
 * Return an iterator of (node, degree, triangles).
 *
 * This double counts triangles so you may want to divide by 2.
 * See `degree()` and `triangles()` for definitions and details.
 *
 * @param {Graph} G A jsnetworkx graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!Iterator<Array>}
 */

function genTriangles(G, optNodes) {
  return (0, _internalsDelegate2['default'])('triangles', [G, optNodes]);
}

function trianglesAndDegreeIter(G, optNodes) {
  var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, v, vNbrs, vset, ntriangles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, w, wset;

  return _regeneratorRuntime.wrap(function trianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new _exceptionsJSNetworkXError2['default']('Not defined for multigraphs.');

      case 2:
        nodesNbrs = (0, _internals.mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return (0, _internals.tuple2)(n, G.get(n));
        });
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _getIterator(nodesNbrs);

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 39;
          break;
        }

        _step$value = _slicedToArray(_step.value, 2);
        v = _step$value[0];
        vNbrs = _step$value[1];
        vset = new _internals.Set(vNbrs.keys());

        vset['delete'](v);
        ntriangles = 0;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 18;

        for (_iterator2 = _getIterator(vset); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          w = _step2.value;
          wset = new _internals.Set(G.get(w).keys());

          wset['delete'](w);
          ntriangles += vset.intersection(wset).size;
        }
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t0 = context$1$0['catch'](18);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t0;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError2) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError2;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 36;
        return (0, _internals.tuple3)(v, vset.size, ntriangles);

      case 36:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 39:
        context$1$0.next = 45;
        break;

      case 41:
        context$1$0.prev = 41;
        context$1$0.t1 = context$1$0['catch'](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t1;

      case 45:
        context$1$0.prev = 45;
        context$1$0.prev = 46;

        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }

      case 48:
        context$1$0.prev = 48;

        if (!_didIteratorError) {
          context$1$0.next = 51;
          break;
        }

        throw _iteratorError;

      case 51:
        return context$1$0.finish(48);

      case 52:
        return context$1$0.finish(45);

      case 53:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[6, 41, 45, 53], [18, 22, 26, 34], [27,, 29, 33], [46,, 48, 52]]);
}

/**
 * Return an iterator of `(node, degree, weightedTriangles)`.
 *
 * Used for weighted clustering.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 * @param {string=} opt_weight (default: 'weight')
 *      The name of edge weight attribute.
 *
 * @return {Iterator<Array>}
 */
function weightedTrianglesAndDegreeIter(G, optNodes) {
  var optWeight = arguments.length <= 2 || arguments[2] === undefined ? 'weight' : arguments[2];

  var maxWeight, nodesNbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, i, nbrs, inbrs, weightedTriangles, seen, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, j, weightij, jnbrs, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, k, weightjk, weightki;

  return _regeneratorRuntime.wrap(function weightedTrianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new _exceptionsJSNetworkXError2['default']('Not defined for multigraphs.');

      case 2:
        maxWeight = optWeight == null || G.edges().length === 0 ? 1 : (0, _internals.max)((0, _internals.mapIterator)(G.edgesIter(true),
        /* eslint-disable no-unused-vars */
        function (_ref3) {
          var _ref32 = _slicedToArray(_ref3, 3);

          var u = _ref32[0];
          var v = _ref32[1];
          var data = _ref32[2];
          return (0, _internals.getDefault)(data[optWeight], 1);
        }
        /* eslint-enable no-unused-vars */
        ));
        nodesNbrs = (0, _internals.mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return (0, _internals.tuple2)(n, G.get(n));
        });
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 7;
        _iterator3 = _getIterator(nodesNbrs);

      case 9:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 67;
          break;
        }

        _step3$value = _slicedToArray(_step3.value, 2);
        i = _step3$value[0];
        nbrs = _step3$value[1];
        inbrs = new _internals.Set(nbrs.keys()).difference([i]);
        weightedTriangles = 0;
        seen = new _internals.Set();
        _iteratorNormalCompletion4 = true;
        _didIteratorError4 = false;
        _iteratorError4 = undefined;
        context$1$0.prev = 19;
        _iterator4 = _getIterator(inbrs);

      case 21:
        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
          context$1$0.next = 48;
          break;
        }

        j = _step4.value;
        weightij = (0, _internals.getDefault)(nbrs.get(j)[optWeight], 1) / maxWeight;

        seen.add(j);
        jnbrs = new _internals.Set(G.get(j).keys()).difference(seen);
        _iteratorNormalCompletion5 = true;
        _didIteratorError5 = false;
        _iteratorError5 = undefined;
        context$1$0.prev = 29;

        for (_iterator5 = _getIterator(inbrs.intersection(jnbrs)); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          k = _step5.value;
          weightjk = (0, _internals.getDefault)(G.get(j).get(k)[optWeight], 1) / maxWeight;
          weightki = (0, _internals.getDefault)(nbrs.get(k)[optWeight], 1) / maxWeight;

          weightedTriangles += Math.pow(weightij * weightjk * weightki, 1 / 3);
        }
        context$1$0.next = 37;
        break;

      case 33:
        context$1$0.prev = 33;
        context$1$0.t0 = context$1$0['catch'](29);
        _didIteratorError5 = true;
        _iteratorError5 = context$1$0.t0;

      case 37:
        context$1$0.prev = 37;
        context$1$0.prev = 38;

        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }

      case 40:
        context$1$0.prev = 40;

        if (!_didIteratorError5) {
          context$1$0.next = 43;
          break;
        }

        throw _iteratorError5;

      case 43:
        return context$1$0.finish(40);

      case 44:
        return context$1$0.finish(37);

      case 45:
        _iteratorNormalCompletion4 = true;
        context$1$0.next = 21;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t1 = context$1$0['catch'](19);
        _didIteratorError4 = true;
        _iteratorError4 = context$1$0.t1;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError4) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError4;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
        context$1$0.next = 64;
        return (0, _internals.tuple3)(i, inbrs.size, weightedTriangles * 2);

      case 64:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 9;
        break;

      case 67:
        context$1$0.next = 73;
        break;

      case 69:
        context$1$0.prev = 69;
        context$1$0.t2 = context$1$0['catch'](7);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t2;

      case 73:
        context$1$0.prev = 73;
        context$1$0.prev = 74;

        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }

      case 76:
        context$1$0.prev = 76;

        if (!_didIteratorError3) {
          context$1$0.next = 79;
          break;
        }

        throw _iteratorError3;

      case 79:
        return context$1$0.finish(76);

      case 80:
        return context$1$0.finish(73);

      case 81:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this, [[7, 69, 73, 81], [19, 50, 54, 62], [29, 33, 37, 45], [38,, 40, 44], [55,, 57, 61], [74,, 76, 80]]);
}

/**
 * Compute the average clustering coefficient for the graph G.
 *
 * The clustering coefficient for the graph is the average,
 *
 * ```math
 * C = \frac{1}{n}\sum_{v \in G} c_v
 * ```
 *
 * where `$n$` is the number of nodes in `$G$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.averageClustering(G);
 * // 1
 * ```
 *
 * ### Notes
 *
 * Self loops are ignored.
 *
 *
 * ### References
 *
 * [1] [Generalizations of the clustering coefficient to weighted
 *     complex networks by J. Saramäki, M. Kivelä, J.-P. Onnela,
 *     K. Kaski, and J. Kertész, Physical Review E, 75 027105 (2007).][1]
 * [1]: http://jponnela.com/web_documents/a9.pdf
 * [2] [Marcus Kaiser,  Mean clustering coefficients: the role of isolated
 *     nodes and leafs on clustering measures for small-world networks.][2]
 * [2]:http://arxiv.org/abs/0802.2512
 *
 * @param {Graph} G graph
 * @param {?Iterable} optNodes (default: all nodes)
 *    Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *    The edge attribute that holds the numerical value used as a weight.
 *    If `null`, then each edge has weight `1`.
 * @param {?boolean=} optCountZeros
 *    If `false` include only the nodes with nonzero clustering in the average.
 * @return {number}
 */

function averageClustering(G, optNodes, optWeight) {
  var optCountZeros = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  var clusters = _Array$from(clustering(G, optNodes, optWeight).values());

  if (!optCountZeros) {
    clusters = clusters.filter(function (v) {
      return v > 0;
    });
  }
  return clusters.reduce(function (s, x) {
    return s + x;
  }, 0) / clusters.length;
}

/**
 * Compute the clustering coefficient for nodes.
 *
 * For unweighted graphs the clustering of each node `$u$`
 * is the fraction of possible triangles through that node that exist,
 *
 * ```math
 * c_u = \frac{2 T(u)}{deg(u)(deg(u)-1)}
 * ```
 *
 * where `$T(u)$` is the number of triangles through node `$u$` and `$deg(u)$`
 * is the degree of `$u$`.
 *
 * For weighted graphs the clustering is defined as the geometric average of
 * the subgraph edge weights,
 *
 * ```math
 * c_u = \frac{1}{deg(u)(deg(u)-1)}
 *       \sum_{uv} (\hat{w}_{uv} \hat{w}_{uw} \hat{w}_{vw})^{1/3}
 * ```
 *
 * The edge weights `$\hat{w}_{uv}$` are normalized by the maximum weight in the
 * network `$\hat{w}_{uv} = w_{uv}/\max(2)$`.
 *
 * The value `$c_u$` is assigned to `$0$` if `$deg(u) < 2$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.clustering(G, 0);
 * // 1
 * jsnx.clustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * @param {Graph} G graph
 * @param {?Iterable=} optNodes (default: all nodes)
 *      Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *  If the edge attribute that holds the numerical value used as a weight.
 *  If `null`, then each edge has weight `1`.
 *
 * @return {!(number|Map)} Clustering coefficient at specified nodes
 */

function genAverageClustering(G, optNodes, optWeight, optCountZeros) {
  return (0, _internalsDelegate2['default'])('averageClustering', [G, optNodes, optWeight, optCountZeros]);
}

function clustering(G, optNodes, optWeight) {
  if (G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('Clustering algorithms are not defined for directed graphs.');
  }

  var trianglesIter = optWeight == null ? trianglesAndDegreeIter(G, optNodes) : weightedTrianglesAndDegreeIter(G, optNodes, optWeight);

  var clusters = new _internals.Map((0, _internals.mapIterator)(trianglesIter, function (_ref4) {
    var _ref42 = _slicedToArray(_ref4, 3);

    var node = _ref42[0];
    var degree = _ref42[1];
    var triangles = _ref42[2];

    return (0, _internals.tuple2)(node, triangles === 0 ? 0 : triangles / (degree * (degree - 1)));
  }));

  return G.hasNode(optNodes) ? (0, _internals.next)(clusters.values()) : clusters;
}

/**
 * Compute graph transitivity, the fraction of all possible triangles
 * present in G.
 *
 * Possible triangles are identified by the number of "triads"
 * (two edges with a shared vertex).
 *
 * The transitivity is
 *
 * ```math
 * T = 3\frac{\#triangles}{\#triads}
 * ```
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.transitivity(G);
 * // 1
 * ```
 *
 * @param {Graph} G graph
 * @return {number} Transitivity
 */

function genClustering(G, optNodes, optWeight) {
  return (0, _internalsDelegate2['default'])('clustering', [G, optNodes, optWeight]);
}

function transitivity(G) {
  /* eslint-disable no-shadow */
  var triangles = 0; // 6 times number of triangles
  /* eslint-enable no-shadow */
  var triples = 0; // 2 times number of connected triples

  /* eslint-disable no-unused-vars */
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (var _iterator6 = _getIterator(trianglesAndDegreeIter(G)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
      var _step6$value = _slicedToArray(_step6.value, 3);

      var node = _step6$value[0];
      var degree = _step6$value[1];
      var triangles_ = _step6$value[2];

      /* eslint-enable no-unused-vars */
      triples += degree * (degree - 1);
      triangles += triangles_;
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6['return']) {
        _iterator6['return']();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return triangles === 0 ? 0 : triangles / triples;
}

/**
 * Compute the squares clustering coefficient for nodes.
 *
 * For each node return the faction of possible squares that exist at the node
 *
 * ```math
 * C_4(v) = \frac{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} q_v(u,w) }{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} [a_v(u,w) + q_v(u,w)]}
 * ```
 *
 * where `$q_v(u,w)$` are the number of common neighbors of `$u$` and `$v$`
 * other than `$v$` (i.e. squares), and
 * `$a_v(u,w) = (k_u-(1+q_v(u,w)+\theta_{uv}))(k_w-(1+q_v(u,w)+\theta_{uw}))$`
 * where `$\theta_{uw} = 1$` if `$u$` and `$w$` are  connected and `$0$`
 * otherwise.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.squareClustering(G, 0);
 * // 1
 * jsnx.squareClustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * ### Notes
 *
 * While `$C_3(v)$` (triangle clustering) gives the probability that
 * two neighbors of node `$v$` are connected with each other, `$C_4(v)$` is
 * the probability that two neighbors of node `$v$` share a common
 * neighbor different from `$v$`. This algorithm can be applied to both
 * bipartite and unipartite networks.
 *
 * @param {Graph} G graph
 * @param {Iterable=} opt_nodes (default: all)
 *   Compute clustering for nodes in this container.
 *
 * @return {!(Map|number)}
 *      A dictionary keyed by node with the square clustering coefficient value.
 */

function genTransitivity(G) {
  return (0, _internalsDelegate2['default'])('transitivity', [G]);
}

function squareClustering(G, optNodes) {
  var nodesIter = optNodes == null ? G : G.nbunchIter(optNodes);
  var clustering = new _internals.Map(); // eslint-disable-line no-shadow

  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(nodesIter), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var v = _step7.value;

      clustering.set(v, 0);
      var potential = 0;

      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _getIterator((0, _internals.genCombinations)(G.get(v).keys(), 2)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var _step8$value = _slicedToArray(_step8.value, 2);

          var u = _step8$value[0];
          var w = _step8$value[1];

          var squares = new _internals.Set(G.get(u).keys()).intersection(new _internals.Set(G.get(w).keys()));
          squares['delete'](v);
          squares = squares.size;

          clustering.set(v, clustering.get(v) + squares);
          var degm = squares + 1;
          if (G.get(u).has(w)) {
            degm += 1;
          }
          potential += (G.get(u).size - degm) * (G.get(w).size - degm) + squares;
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      if (potential > 0) {
        clustering.set(v, clustering.get(v) / potential);
      }
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  if (G.hasNode(optNodes)) {
    return (0, _internals.next)(clustering.values()); // return single value
  }
  return clustering;
}

function genSquareClustering(G, optNodes) {
  return (0, _internalsDelegate2['default'])('squareClustering', [G, optNodes]);
}

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":20,"../_internals/delegate":12,"../exceptions/JSNetworkXError":73,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],48:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isDirectedAcyclicGraph = isDirectedAcyclicGraph;
exports.genIsDirectedAcyclicGraph = genIsDirectedAcyclicGraph;
exports.topologicalSort = topologicalSort;
exports.genTopologicalSort = genTopologicalSort;
exports.topologicalSortRecursive = topologicalSortRecursive;
exports.genTopologicalSortRecursive = genTopologicalSortRecursive;
exports.isAperiodic = isAperiodic;
exports.genIsAperiodic = genIsAperiodic;

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _exceptionsJSNetworkXUnfeasible = require('../exceptions/JSNetworkXUnfeasible');

var _exceptionsJSNetworkXUnfeasible2 = _interopRequireDefault(_exceptionsJSNetworkXUnfeasible);

var _internals = require('../_internals');

// TODO: descendants
// TODO: ancestors

/**
 * Return `true` if the graph G is a directed acyclic graph (DAG) or
 * `false` if not.
 *
 * @param {Graph} G A graph
 * @return {boolean} true of G is a DAG, false otherwise
 */
/*eslint max-len:[1, 83]*/
'use strict';

function isDirectedAcyclicGraph(G) {
  try {
    topologicalSort(G);
    return true;
  } catch (ex) {
    if (ex instanceof _exceptionsJSNetworkXUnfeasible2['default']) {
      return false;
    }
    throw ex;
  }
}

/**
 * Return a list of nodes in topological sort order.
 *
 * A topological sort is a non-unique permutation of the nodes such that an edge
 * from `$u$` to `$v$` implies that `$u$` appears before `$v$` in the
 * topological sort order.
 *
 * ### Notes
 *
 * This algorithm is based on a description and proof in
 * The Algorithm Design Manual ([1][]).
 *
 * ### References
 *
 *
 * [1] [Skiena, S. S. The Algorithm Design Manual  (Springer-Verlag, 1998).][1]
 * [1]: http://www.amazon.com/exec/obidos/ASIN/0387948600/ref=ase_thealgorithmrepo/
 *
 * @see #is_directed_acyclic_graph
 *
 * @param {Graph} G A directed Graph
 * @param {Iterable=} optNbunch Explore graph in specified order given
 *    in optNbunch.
 * @return {!Array}
 */

function genIsDirectedAcyclicGraph(G) {
  return (0, _internalsDelegate2['default'])('isDirectedAcyclicGraph', [G]);
}

function topologicalSort(G, optNbunch) {
  if (!G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('Topological sort not defined on undirected graphs.');
  }

  // nonrecursive version
  var seen = new _internals.Set();
  var orderExplored = []; // provide order and
  // fast search without more general priorityDictionary
  var explored = new _internals.Set();

  if (optNbunch == null) {
    optNbunch = G.nodesIter();
  }

  (0, _internals.forEach)(optNbunch, function (v) {
    // process all vertices in G
    if (explored.has(v)) {
      return; // continue
    }

    var fringe = [v]; // nodes yet to look at
    while (fringe.length > 0) {
      var w = fringe[fringe.length - 1]; // depth first search
      if (explored.has(w)) {
        // already looked down this branch
        fringe.pop();
        continue;
      }
      seen.add(w); // mark as seen
      // Check successors for cycles for new nodes
      var newNodes = [];
      /*eslint-disable no-loop-func*/
      G.get(w).forEach(function (_, n) {
        if (!explored.has(n)) {
          if (seen.has(n)) {
            // CYCLE !!
            throw new _exceptionsJSNetworkXUnfeasible2['default']('Graph contains a cycle.');
          }
          newNodes.push(n);
        }
      });
      /*eslint-enable no-loop-func*/
      if (newNodes.length > 0) {
        // add new nodes to fringe
        fringe.push.apply(fringe, newNodes);
      } else {
        explored.add(w);
        orderExplored.unshift(w);
      }
    }
  });

  return orderExplored;
}

/**
 * Return a list of nodes in topological sort order.
 *
 * A topological sort is a non-unique permutation of the nodes such that an edge
 * from `$u$` to `$v$` implies that `$u$` appears before `$v$` in the
 * topological sort order.
 *
 * ### Notes
 *
 * This is a recursive version of topological sort.
 *
 * @see #topological_sort
 * @see #is_directed_acyclic_graph
 *
 * @param {Graph} G A directed Graph
 * @param {Iterable=} optNbunch Explore graph in specified order given
 *    in optNbunch.
 * @return {!Array}
 */

function genTopologicalSort(G, optNbunch) {
  return (0, _internalsDelegate2['default'])('topologicalSort', [G, optNbunch]);
}

function topologicalSortRecursive(G, optNbunch) {
  if (!G.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('Topological sort not defined on undirected graphs.');
  }

  // function for recursive dfs
  /**
   * @param {Graph} G graph
   * @param {Set} seen
   * @param {Array} explored
   * @param {string} v
   * @return {boolean}
   */
  function _dfs(G, seen, explored, v) {
    // eslint-disable-line no-shadow
    seen.add(v);
    G.get(v).forEach(function (_, w) {
      if (!seen.has(w)) {
        if (!_dfs(G, seen, explored, w)) {
          return false;
        }
      } else if (seen.has(w) && explored.indexOf(w) === -1) {
        throw new _exceptionsJSNetworkXUnfeasible2['default']('Graph contains a cycle.');
      }
    });
    explored.unshift(v);
    return true;
  }

  var seen = new _internals.Set();
  var explored = [];

  if (optNbunch == null) {
    optNbunch = G.nodesIter();
  }

  (0, _internals.forEach)(optNbunch, function (v) {
    if (explored.indexOf(v) === -1) {
      if (!_dfs(G, seen, explored, v)) {
        throw new _exceptionsJSNetworkXUnfeasible2['default']('Graph contains a cycle.');
      }
    }
  });

  return explored;
}

/**
 * Return true if G is aperiodic.
 *
 * A directed graph is aperiodic if there is no integer `$k > 1$` that
 * divides the length of every cycle in the graph.
 *
 * ### Notes
 *
 * This uses the method outlined in (1), which runs in `$O(m)$` time
 * given `$m$` edges in `$G$`. Note that a graph is not aperiodic if it is
 * acyclic as every integer trivial divides length `$0$` cycles.
 *
 *
 * ### References
 *
 * [1] Jarvis, J. P.; Shier, D. R. (1996),
 *     Graph-theoretic analysis of finite Markov chains,
 *     in Shier, D. R.; Wallenius, K. T., Applied Mathematical Modeling:
 *     A Multidisciplinary Approach, CRC Press.
 *
 * @param {Graph} G
 * @return {boolean} true if the graph is aperiodic false otherwise
 */

function genTopologicalSortRecursive(G, optNbunch) {
  return (0, _internalsDelegate2['default'])('topologicalSortRecursive', [G, optNbunch]);
}

function isAperiodic(_x) {
  var _left;

  var _again = true;

  _function: while (_again) {
    var G = _x;
    _again = false;

    if (!G.isDirected()) {
      throw new _exceptionsJSNetworkXError2['default']('is_aperiodic not defined for undirected graphs.');
    }

    var next = G.nodesIter().next();
    if (next.done) {
      return true;
    }
    var levels = new _internals.Map();
    levels.set(next.value, 0);
    var thisLevel = [next.value];
    var g = 0;
    var l = 1;

    while (thisLevel.length > 0) {
      var nextLevel = [];
      for (var i = 0; i < thisLevel.length; i++) {
        var u = thisLevel[i];
        /*eslint-disable no-loop-func*/
        G.get(u).forEach(function (_, v) {
          if (levels.has(v)) {
            // non-tree edge
            g = (0, _internals.gcd)(g, levels.get(u) - levels.get(v) + 1);
          } else {
            // tree edge
            nextLevel.push(v);
            levels.set(v, l);
          }
        });
        /*eslint-enable no-loop-func*/
      }
      thisLevel = nextLevel;
      l += 1;
    }

    if (levels.size === G.numberOfNodes()) {
      return g === 1;
    }

    if (!(_left = g === 1)) {
      return _left;
    }

    _x = G.subgraph(new _internals.Set(G.nodes()).difference(levels.keys()));
    _again = true;
    next = levels = thisLevel = g = l = nextLevel = i = u = undefined;
    continue _function;
  }
}

function genIsAperiodic(G) {
  return (0, _internalsDelegate2['default'])('isAperiodic', [G]);
}

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":20,"../_internals/delegate":12,"../exceptions/JSNetworkXError":73,"../exceptions/JSNetworkXUnfeasible":76,"babel-runtime/helpers/interop-require-default":109}],49:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.isGraphical = isGraphical;
exports.genIsGraphical = genIsGraphical;
exports.isValidDegreeSequence = isValidDegreeSequence;
exports.genIsValidDegreeSequence = genIsValidDegreeSequence;
exports.isValidDegreeSequenceHavelHakimi = isValidDegreeSequenceHavelHakimi;
exports.genIsValidDegreeSequenceHavelHakimi = genIsValidDegreeSequenceHavelHakimi;
exports.isValidDegreeSequenceErdosGallai = isValidDegreeSequenceErdosGallai;
exports.genIsValidDegreeSequenceErdosGallai = genIsValidDegreeSequenceErdosGallai;

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptions = require('../exceptions');

var _internalsFillArray = require('../_internals/fillArray');

var _internalsFillArray2 = _interopRequireDefault(_internalsFillArray);

/**
 * Returns `true` if `sequence` is a valid degree sequence.
 * A degree sequence is valid if some graph can realize it.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * var sequence = G.degree().values();
 * jsnx.isValidDegreeSequence(sequence);
 * // true
 * ```
 *
 * @param {Iterable} sequence A sequence of integer node degrees.
 * @param {string=} optMethod ('eg' | 'hh')
 *      The method used to validate the degree sequence.
 *      "eg" corresponds to the Erdős-Gallai algorithm, and
 *      "hh" to the Havel-Hakimi algorithm.
 * @return {boolean}
 *      `true` if `sequence` is a valid degree sequence and `false` if not.
 */
'use strict';

function isGraphical(sequence) {
  var optMethod = arguments.length <= 1 || arguments[1] === undefined ? 'hh' : arguments[1];

  switch (optMethod) {
    case 'eg':
      return isValidDegreeSequenceErdosGallai(_Array$from(sequence));
    case 'hh':
      return isValidDegreeSequenceHavelHakimi(_Array$from(sequence));
    default:
      throw new _exceptions.JSNetworkXException("`opt_method` must be 'eg' or 'hh'");
  }
}

// We need this instead of just aliasing this so that the async code transform
// kicks in
/**
 * @alias isGraphical
 */

function genIsGraphical(sequence, optMethod) {
  return (0, _internalsDelegate2['default'])('isGraphical', [sequence, optMethod]);
}

function isValidDegreeSequence(sequence, optMethod) {
  return isGraphical(sequence, optMethod);
}

function genIsValidDegreeSequence(sequence, optMethod) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequence', [sequence, optMethod]);
}

function basicGraphicalTests(sequence) {
  // sort and perform some simple tests on the sequence
  if (!sequence.every(function (x) {
    return Math.floor(x) === x;
  })) {
    // list of positive intengers
    throw new _exceptions.JSNetworkXUnfeasible();
  }

  var numberOfNodes = sequence.length;
  var numDegress = (0, _internalsFillArray2['default'])(numberOfNodes, 0);
  var maxDegree = 0;
  var minDegree = numberOfNodes;
  var degreeSum = 0;
  var n = 0;

  for (var i = 0; i < numberOfNodes; i++) {
    var degree = sequence[i];
    // Reject if degree is negative or larger than the sequence length
    if (degree < 0 || degree >= numberOfNodes) {
      throw new _exceptions.JSNetworkXUnfeasible();
    }
    // process only the non-zero integers
    else if (degree > 0) {
        maxDegree = Math.max(maxDegree, degree);
        minDegree = Math.min(minDegree, degree);
        degreeSum += degree;
        n += 1;
        numDegress[degree] += 1;
      }
  }
  // Reject sequence if it has odd sum or is over-saturated
  if (degreeSum % 2 === 1 || degreeSum > n * (n - 1)) {
    throw new _exceptions.JSNetworkXUnfeasible();
  }
  return [maxDegree, minDegree, degreeSum, n, numDegress];
}

/**
 * Returns `true` if `degreeSequence` cam be realized by a simple graph.
 *
 * The Validation proceeds via the Havel-Hakimi theorem.
 * Worst-case run time is `$O(s)$`, where `$s$` is the sum of the degree
 * sequence.
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 *     |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical.
 *
 * ### References
 *
 * [1] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *   A list of integers where each element specifies the degree of a node
 *   in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and `false` if not.
 */

function isValidDegreeSequenceHavelHakimi(degreeSequence) {
  var _; // eslint-disable-line no-unused-vars
  var maxDegree;
  var minDegree;
  var n;
  var numDegrees;

  try {
    var _basicGraphicalTests = basicGraphicalTests(degreeSequence);

    var _basicGraphicalTests2 = _slicedToArray(_basicGraphicalTests, 5);

    maxDegree = _basicGraphicalTests2[0];
    minDegree = _basicGraphicalTests2[1];
    _ = _basicGraphicalTests2[2];
    n = _basicGraphicalTests2[3];
    numDegrees = _basicGraphicalTests2[4];
  } catch (ex) {
    if (ex instanceof _exceptions.JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  var modstubs = (0, _internalsFillArray2['default'])(maxDegree + 1, 0);
  // successively reduce degree sequence by removing node of maximum degree
  while (n > 0) {
    // Retrieve the maximum degree in the sequence
    while (numDegrees[maxDegree] === 0) {
      maxDegree -= 1;
    }
    // If there are not enough stubs to connect to, then the sequence is not
    // graphical
    if (maxDegree > n - 1) {
      return false;
    }

    // Remove largest stub in list
    numDegrees[maxDegree] -= 1;
    n -= 1;
    // Reduce the next maxDegree largest stubs
    var mslen = 0;
    var k = maxDegree;
    for (var i = 0; i < maxDegree; i++) {
      while (numDegrees[k] === 0) {
        k -= 1;
      }
      numDegrees[k] -= 1;
      n -= 1;
      if (k > 1) {
        modstubs[mslen] = k - 1;
        mslen += 1;
      }
    }
    // Add back to the list any non-zero stubs that were removed
    for (i = 0; i < mslen; i++) {
      var stub = modstubs[i];
      numDegrees[stub] += 1;
      n += 1;
    }
  }
  return true;
}

/**
 * Returns `true` if `degreeSequence` can be realized by a simple graph.
 * The validation is done using the Erdős-Gallai theorem.
 *
 * This implementation uses an equivalent form of the Erdős-Gallai criterion.
 * Worst-case run time is `$O(n)$` where `$n$` is the length of the sequence.
 *
 * Specifically, a sequence `$d$` is graphical if and only if the sum of the
 * sequence is even and for all strong indices `$k$` in the sequence,
 *
 * ```math
 * \sum_{i=1}^{k} d_i \leq k(k-1) + \sum_{j=k+1}^{n} \min(d_i,k)
 *    = k(n-1) - ( k \sum_{j=0}^{k-1} n_j - \sum_{j=0}^{k-1} j n_j )
 * ```
 *
 * A strong index `$k$` is any index where `$d_k \geq k$` and the value `$n_j$`
 * is the number of occurrences of `$j$` in `$d$`. The maximal strong index is
 * called the Durfee index.
 *
 * This particular rearrangement comes from the proof of Theorem 3 in (2)
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 * |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical. This was shown in Theorem 6 in (2).
 *
 * ### References
 * [1] A. Tripathi and S. Vijay. "A note on a theorem of Erdős & Gallai",
 *     Discrete Mathematics, 265, pp. 417-420 (2003).
 *
 * [2] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *      A list of integers where each element specifies the degree of a node
 *      in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and f`alse` if not.
 */

function genIsValidDegreeSequenceHavelHakimi(degreeSequence) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequenceHavelHakimi', [degreeSequence]);
}

function isValidDegreeSequenceErdosGallai(degreeSequence) {
  var maxDegree;
  var minDegree;
  var _; // eslint-disable-line no-unused-vars
  var n;
  var numDegrees;

  try {
    var _basicGraphicalTests3 = basicGraphicalTests(degreeSequence);

    var _basicGraphicalTests32 = _slicedToArray(_basicGraphicalTests3, 5);

    maxDegree = _basicGraphicalTests32[0];
    minDegree = _basicGraphicalTests32[1];
    _ = _basicGraphicalTests32[2];
    n = _basicGraphicalTests32[3];
    numDegrees = _basicGraphicalTests32[4];
  } catch (ex) {
    if (ex instanceof _exceptions.JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  // Perform the EG checks using the reformulation of Zverovich and Zverovich
  var k = 0;
  var degreeSum = 0;
  var sumnj = 0;
  var sumjnj = 0;

  for (var dk = maxDegree; dk >= minDegree; dk -= 1) {
    if (dk < k + 1) {
      // Check if already past Durfee index
      return true;
    }
    if (numDegrees[dk] > 0) {
      var runSize = numDegrees[dk]; // Process a run of identical-valued degrees
      if (dk < k + runSize) {
        // Check if end of run is past Durfee index
        runSize = dk - k; // Adjust back to Durfee index
      }
      degreeSum += runSize * dk;
      for (var v = 0; v < runSize; v++) {
        sumnj += numDegrees[k + v];
        sumjnj += (k + v) * numDegrees[k + v];
      }
      k += runSize;
      if (degreeSum > k * (n - 1) - k * sumnj + sumjnj) {
        return false;
      }
    }
  }
  return true;
}

// TODO: is_multigraphical
// TODO: is_pseudographical
// TODO: is_digraphical

function genIsValidDegreeSequenceErdosGallai(degreeSequence) {
  return (0, _internalsDelegate2['default'])('isValidDegreeSequenceErdosGallai', [degreeSequence]);
}

},{"../_internals/delegate":12,"../_internals/fillArray":13,"../exceptions":78,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],50:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _centrality = require('./centrality');

var centrality = _interopRequireWildcard(_centrality);

var _clique = require('./clique');

var clique = _interopRequireWildcard(_clique);

var _cluster = require('./cluster');

var cluster = _interopRequireWildcard(_cluster);

var _dag = require('./dag');

var dag = _interopRequireWildcard(_dag);

var _graphical = require('./graphical');

var graphical = _interopRequireWildcard(_graphical);

var _isomorphism = require('./isomorphism');

var isomorphism = _interopRequireWildcard(_isomorphism);

var _operators = require('./operators');

var operators = _interopRequireWildcard(_operators);

var _shortestPaths = require('./shortestPaths');

var shortestPaths = _interopRequireWildcard(_shortestPaths);

exports.centrality = centrality;
exports.clique = clique;
exports.cluster = cluster;
exports.dag = dag;
exports.graphical = graphical;
exports.isomorphism = isomorphism;
exports.operators = operators;
exports.shortestPaths = shortestPaths;

_defaults(exports, _interopExportWildcard(_centrality, _defaults));

_defaults(exports, _interopExportWildcard(_clique, _defaults));

_defaults(exports, _interopExportWildcard(_cluster, _defaults));

_defaults(exports, _interopExportWildcard(_dag, _defaults));

_defaults(exports, _interopExportWildcard(_graphical, _defaults));

_defaults(exports, _interopExportWildcard(_isomorphism, _defaults));

_defaults(exports, _interopExportWildcard(_operators, _defaults));

_defaults(exports, _interopExportWildcard(_shortestPaths, _defaults));

},{"./centrality":45,"./clique":46,"./cluster":47,"./dag":48,"./graphical":49,"./isomorphism":51,"./operators":54,"./shortestPaths":56,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],51:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _isomorph = require('./isomorph');

var isomorph = _interopRequireWildcard(_isomorph);

exports.isomorph = isomorph;

_defaults(exports, _interopExportWildcard(_isomorph, _defaults));

},{"./isomorph":52,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],52:[function(require,module,exports){
'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.couldBeIsomorphic = couldBeIsomorphic;
exports.genCouldBeIsomorphic = genCouldBeIsomorphic;
exports.fastCouldBeIsomorphic = fastCouldBeIsomorphic;
exports.genFastCouldBeIsomorphic = genFastCouldBeIsomorphic;
exports.fasterCouldBeIsomorphic = fasterCouldBeIsomorphic;
exports.genFasterCouldBeIsomorphic = genFasterCouldBeIsomorphic;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _clique = require('../clique');

var _cluster = require('../cluster');

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree, triangle, and number of cliques sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */
'use strict';

function couldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = (0, _cluster.triangles)(G1);
  var cliques1 = (0, _clique.numberOfCliques)(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v), cliques1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  var degree2 = G2.degree();
  var triangles2 = (0, _cluster.triangles)(G2);
  var cliques2 = (0, _clique.numberOfCliques)(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v), cliques2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  });
}

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree and triangle sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */

function genCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('couldBeIsomorphic', [G1, G2]);
}

function fastCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = (0, _cluster.triangles)(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  var degree2 = G2.degree();
  var triangles2 = (0, _cluster.triangles)(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1];
  });
}

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 *
 * @return {boolean}  False if graphs are definitely not isomorphic.
 *
 * @export
 */

function genFastCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('fastCouldBeIsomorphic', [G1, G2]);
}

function fasterCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = _Array$from(G1.degree().values());
  degree1.sort(function (a, b) {
    return a - b;
  });

  var degree2 = _Array$from(G2.degree().values());
  degree2.sort(function (a, b) {
    return a - b;
  });

  return degree1.every(function (v, i) {
    return v === degree2[i];
  });
}

//TODO: is_isomorphic

function genFasterCouldBeIsomorphic(G1, G2) {
  return (0, _internalsDelegate2['default'])('fasterCouldBeIsomorphic', [G1, G2]);
}

},{"../../_internals/delegate":12,"../clique":46,"../cluster":47,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109}],53:[function(require,module,exports){
'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.union = union;
exports.genUnion = genUnion;
exports.disjointUnion = disjointUnion;
exports.genDisjointUnion = genDisjointUnion;
exports.intersection = intersection;
exports.genIntersection = genIntersection;
exports.difference = difference;
exports.genDifference = genDifference;
exports.symmetricDifference = symmetricDifference;
exports.genSymmetricDifference = genSymmetricDifference;
exports.compose = compose;
exports.genCompose = genCompose;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptionsJSNetworkXError = require('../../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _relabel = require('../../relabel');

var _classesFunctions = require('../../classes/functions');

var _internalsSet = require('../../_internals/Set');

var _internalsSet2 = _interopRequireDefault(_internalsSet);

var _internals = require('../../_internals');

'use strict';

function assertSameNodes(G, H) {
  var Hnodes = new _internalsSet2['default'](H);
  var Gnodes = new _internalsSet2['default'](G);
  if (Hnodes.size !== Gnodes.size || (0, _internals.someIterator)(Gnodes.values(), function (v) {
    return !Hnodes.has(v);
  })) {
    throw new _exceptionsJSNetworkXError2['default']('Node sets of graphs are not equal.');
  }
}

/**
 * Return the union of graphs `G` and `H`.
 *
 * Graphs `G` and `H` must be disjoint, otherwise an exception is raised.
 *
 * ### Notes
 *
 * To force a disjoint union with node relabeling, use `disjointUnion(G, H)` or
 * `convertNodeLabelsToIntegers()`.
 *
 * Graph, edge and node attributes are propagated from `G` and `H` to the union
 * Graph. If a graph attribute is present in both `G` and `H`, the value from
 * `H` is used.
 *
 * @see #disjointUnion
 *
 * @param {Graph} G
 * @param {Graph} H
 * @param {{rename: ?Array}} optParameters
 *   - rename: Node names `G` and `H` can be changed by specifying the tuple
 *     `['G-', 'H-']` (for example). Node `'u'` in `G` is then renamed to
 *     `'G-u'` and `'v'` in `H` is renamed to `'H-v'`.
 * @return {Graph} A union graph with the same type as G
 */

function union(G, H) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var _ref$rename = _ref.rename;
  var rename = _ref$rename === undefined ? [null, null] : _ref$rename;

  if (G.isMultigraph() !== H.isMultigraph()) {
    throw new _exceptionsJSNetworkXError2['default']('G and H must both be graphs or multigraphs');
  }

  // Union is same type as G
  var R = new G.constructor();
  R.name = 'union(' + G.name + ', ' + H.name + ')';

  // rename graph to obtain disjoint node labels
  function addPrefix(graph, prefix) {
    if (!prefix) {
      return graph;
    }
    return (0, _relabel.relabelNodes)(graph, function (n) {
      return prefix + n.toString();
    });
  }
  G = addPrefix(G, rename[0]);
  H = addPrefix(H, rename[1]);

  if (new _internalsSet2['default'](G).intersection(new _internalsSet2['default'](H)).size > 0) {
    throw new _exceptionsJSNetworkXError2['default']('The node sets of G and H are not disjoint. Use appropriate ' + '{rename: [Gprefix, Hprefix]} or use disjointUnion({G, H})');
  }

  // add nodes
  R.addNodesFrom(G.nodesIter(true));
  R.addNodesFrom(H.nodesIter(true));
  // add edges
  R.addEdgesFrom(G.isMultigraph() ? G.edgesIter(true, true) : G.edgesIter(true));
  R.addEdgesFrom(H.isMultigraph() ? H.edgesIter(true, true) : H.edgesIter(true));
  // add graph attributes
  _Object$assign(R.graph, G.graph, H.graph);

  return R;
}

/**
 * Return the disjoint union of graphs `G` and `H`.
 *
 * This algorithm forces distinct integer node labels.
 *
 * ### Notes
 *
 * A new graph is created, of the same class as `G`.  It is recommended that `G`
 * and `H` be either both directed or both undirected.
 *
 * The nodes of `G` are relabeled `0` to `numberOfNodes(G) - 1`, and the nodes
 * of `H` are relabeled `numberOfNodes(G)` to
 * `numberOfNodes(G) + numberOfNodes(H) - 1`.
 *
 * Graph, edge, and node attributes are propagated from `G` and `H` to the union
 * graph. If a graph attribute is present in both `G` and `H` the value from `H`
 * is used.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A union graph with the same type as G.
 */

function genUnion(G, H, _rename) {
  return (0, _internalsDelegate2['default'])('union', [G, H, _rename]);
}

function disjointUnion(G, H) {
  var R1 = (0, _relabel.convertNodeLabelsToIntegers)(G);
  var R2 = (0, _relabel.convertNodeLabelsToIntegers)(H, R1.order());
  var R = union(R1, R2);
  R.name = 'disjointUnion(' + G.name + ', ' + H.name + ')';
  _Object$assign(R.graph, G.graph, H.graph);
  return R;
}

/**
 * Return a new graph that contains only edges that exist in both `G` and `H`.
 *
 * The node set of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 * If you want a new graph of the intersection of `G` and `H` with the
 * attributes, (including edge data) from `G` use `removeNode()` as follows
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.pathGraph(5);
 * var R = G.copy();
 * for (var n of G) {
 *   if (!H.hasNode(n)) {
 *     R.removeNode(n);
 *   }
 * }
 * ```
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */

function genDisjointUnion(G, H) {
  return (0, _internalsDelegate2['default'])('disjointUnion', [G, H]);
}

function intersection(G, H) {
  if (G.isMultigraph() !== H.isMultigraph()) {
    throw new _exceptionsJSNetworkXError2['default']('G and H must both be graphs or multigraphs');
  }

  // create new graph
  var R = (0, _classesFunctions.createEmptyCopy)(G);
  R.name = 'Intersection of (' + G.name + ' and ' + H.name + ')';
  assertSameNodes(G, H);

  var graph = G.numberOfEdges() < H.numberOfEdges() ? G : H;
  var otherGraph = graph === G ? H : G;

  var edges = graph.isMultigraph() ? graph.edgesIter(false, true) : graph.edgesIter();
  var hasEdge = otherGraph.hasEdge;
  var addEdge = R.addEdge;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(edges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var e = _step.value;

      if (hasEdge.apply(otherGraph, e)) {
        addEdge.apply(R, e);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return R;
}

/**
 * Return a new graph that contains the edges that exist in `G` but not in `H`.
 *
 * The node sets of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 * If you want a new graph of the difference of `G` and `H` with the attributes
 * (including edge data) from `G`, use `removeNodes()` as follows:
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.pathGraph(5);
 * var R = G.copy();
 * for (var n of G) {
 *   if (!H.hasNode(n)) {
 *     R.removeNode(n);
 *   }
 * }
 * ```
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */

function genIntersection(G, H) {
  return (0, _internalsDelegate2['default'])('intersection', [G, H]);
}

function difference(G, H) {
  if (G.isMultigraph() !== H.isMultigraph()) {
    throw new _exceptionsJSNetworkXError2['default']('G and H must both be graphs or multigraphs');
  }
  // create new graph
  var R = (0, _classesFunctions.createEmptyCopy)(G);
  G.name = 'Difference of (' + G.name + ' and ' + H.name + ')';
  assertSameNodes(G, H);

  var edges = G.isMultigraph() ? G.edgesIter(false, true) : G.edgesIter();
  var hasEdge = H.hasEdge;
  var addEdge = R.addEdge;
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(edges), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var e = _step2.value;

      if (!hasEdge.apply(H, e)) {
        addEdge.apply(R, e);
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return R;
}

/**
 * Return new graph with edges that exit in either `G` or `H` but not both.
 *
 * The node sets of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */

function genDifference(G, H) {
  return (0, _internalsDelegate2['default'])('difference', [G, H]);
}

function symmetricDifference(G, H) {
  if (G.isMultigraph() !== H.isMultigraph()) {
    throw new _exceptionsJSNetworkXError2['default']('G and H must both be graphs or multigraphs');
  }
  var R = (0, _classesFunctions.createEmptyCopy)(G);
  R.name = 'Symmetric difference of (' + G.name + ' and ' + H.name + ')';

  assertSameNodes(G, H);
  R.addNodesFrom((0, _internalsSet.symmetricDifference)(new _internalsSet2['default'](G), new _internalsSet2['default'](H)));

  var edges = G.isMultigraph() ? G.edgesIter(false, true) : G.edgesIter();
  var addEdge = R.addEdge;
  var hasEdge = H.hasEdge;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(edges), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var edge = _step3.value;

      if (!hasEdge.apply(H, edge)) {
        addEdge.apply(R, edge);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  edges = H.isMultigraph() ? H.edgesIter(false, true) : H.edgesIter();
  hasEdge = H.hasEdge;
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(edges), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var edge = _step4.value;

      if (!hasEdge.apply(G, edge)) {
        addEdge.apply(R, edge);
      }
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return R;
}

/**
 * Return a new graph of `G` composed with `H`.
 *
 * Composition is the simple union of the node sets and edge sets. The node sets
 * of `G` and `H` do not need to be disjoint.
 *
 * ### Notes
 *
 * It is recommended that `G` and `H` be either both directed or both
 * undirected. Attributes from `H` take precedent over attributes from `G`.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same type as G
 */

function genSymmetricDifference(G, H) {
  return (0, _internalsDelegate2['default'])('symmetricDifference', [G, H]);
}

function compose(G, H) {
  if (G.isMultigraph() !== H.isMultigraph()) {
    throw new _exceptionsJSNetworkXError2['default']('G and H must both be graphs or multigraphs');
  }

  var R = new G.constructor();
  R.name = 'compose(' + G.name + ', ' + H.name + ')';
  R.addNodesFrom(G.nodesIter(true));
  R.addNodesFrom(H.nodesIter(true));
  R.addEdgesFrom(G.isMultigraph() ? G.edgesIter(true, true) : G.edgesIter(true));
  R.addEdgesFrom(H.isMultigraph() ? H.edgesIter(true, true) : H.edgesIter(true));

  // add graph attributes
  _Object$assign(R.graph, G.graph, H.graph);

  return R;
}

function genCompose(G, H) {
  return (0, _internalsDelegate2['default'])('compose', [G, H]);
}

},{"../../_internals":20,"../../_internals/Set":5,"../../_internals/delegate":12,"../../classes/functions":64,"../../exceptions/JSNetworkXError":73,"../../relabel":87,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/assign":92,"babel-runtime/helpers/interop-require-default":109}],54:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _binary = require('./binary');

var binary = _interopRequireWildcard(_binary);

exports.binary = binary;

_defaults(exports, _interopExportWildcard(_binary, _defaults));

},{"./binary":53,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],55:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.hasPath = hasPath;
exports.genHasPath = genHasPath;
exports.shortestPath = shortestPath;
exports.genShortestPath = genShortestPath;
exports.shortestPathLength = shortestPathLength;
exports.genShortestPathLength = genShortestPathLength;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptions = require('../../exceptions');

var _unweighted = require('./unweighted');

var _weighted = require('./weighted');

/**
 * Return `true` if `G` has a path from `source to `target`, `false` otherwise.
 *
 * @param {Graph} G
 * @param {{source: Node, target: node}} parameters
 *   - source: Starting node for path
 *   - target: Ending node for path
 * @return {boolean}
 */
'use strict';

function hasPath(G, _ref) {
  var source = _ref.source;
  var target = _ref.target;

  try {
    shortestPath(G, { source: source, target: target });
  } catch (error) {
    if (error instanceof _exceptions.JSNetworkXNoPath) {
      return false;
    }
    throw error;
  }
  return true;
}

/**
 * Compute shortest paths in the graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.shortestPath(G, {source: 0, target: 4});
 * // [0, 1, 2, 3, 4]
 * var paths = jsnx.shortestPath(G, {source: 0}); // target not specified
 * paths.get(4);
 * // [0, 1, 2, 3, 4]
 * paths = jsnx.shortestPath(G {target: 4}); // source not specified
 * paths.get(0);
 * // [0, 1, 2, 3, 4]
 * paths = jsnx.shortestPath(G); // source, target not specified
 * paths.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * There may be more than one shortest path between a source and a target.
 * This returns only one of them.
 *
 * @see allPairsShortestPath
 * @see allPairsDijkstraPath
 * @see singleSourceShortestPath
 * @see singleSourceDijkstraPath
 *
 * @param {Graph} G
 * @param {?{source: ?Node, target: ?Node, weight: ?string}=} optParameters
 *   - source: Starting node for path.
 *     If not specified, compute the shortest paths using all nodes as source
 *     nodes.
 *   - target: Ending node for path.
 *     If not specified, compute the shortest paths using all nodes as target
 *     nodes.
 *   - weight:
 *     If not specified, every edge has weight/distance/cost of 1.
 *     If a string, use this edge attribute as the edge weight. Any edg
 *     attribute not present defaults to 1.
 * @return {(Array|Map)} All returned paths include both the source and the
 *   target in the path.
 *
 *   If the `source` and `target` are both specified, return a single list
 *   of nodes in a shortest path from the source to the target.
 *
 *   If only the `source` is specified, return a Map keyed by
 *   targets with a list of nodes in a shortest path from the source
 *   to one of the targets.
 *
 *   If only the `target` is specified, return a Map keyed by
 *   sources with a list of nodes in a shortest path from one of the
 *   sources to the target.
 *
 *   If neither the `source` nor `target` are specified return a Map
 *   of Maps with `Map {source: Map {target: [list of nodes in path] }}`.
 */

function genHasPath(G, _source$target) {
  return (0, _internalsDelegate2['default'])('hasPath', [G, _source$target]);
}

function shortestPath(G) {
  var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var source = _ref2.source;
  var target = _ref2.target;
  var weight = _ref2.weight;

  var paths;

  if (source == null) {
    if (target == null) {
      // find paths between all pairs
      if (weight == null) {
        paths = (0, _unweighted.allPairsShortestPath)(G);
      } else {
        paths = (0, _weighted.allPairsDijkstraPath)(G, { weight: weight });
      }
    } else {
      // find paths from all nodes co-accessibly to the target
      var directed = G.isDirected();
      try {
        if (directed) {
          G.reverse(false);
        }
        if (weight == null) {
          paths = (0, _unweighted.singleSourceShortestPath)(G, target);
        } else {
          paths = (0, _weighted.singleSourceDijkstraPath)(G, { target: target, weight: weight });
        }

        // now flip the paths so they go from a source to the target
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(paths), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var _target = _step$value[0];
            var path = _step$value[1];

            paths.set(_target, path.reverse());
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } finally {
        if (directed) {
          G.reverse(false);
        }
      }
    }
  } else {
    if (target == null) {
      // find paths to all nodes accessible from the source
      if (weight == null) {
        paths = (0, _unweighted.singleSourceShortestPath)(G, source);
      } else {
        paths = (0, _weighted.singleSourceDijkstraPath)(G, { source: source, weight: weight });
      }
    } else {
      // find shortest source-target path
      if (weight == null) {
        paths = (0, _unweighted.bidirectionalShortestPath)(G, source, target);
      } else {
        paths = (0, _weighted.dijkstraPath)(G, { source: source, target: target, weight: weight });
      }
    }
  }

  return paths;
}

/**
 * Compute shortest path lengths in the graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.shortestPathLength(G, {source: 0, target: 4});
 * // 4
 * var paths = jsnx.shortestPathLength(G, {source: 0}); // target not specified
 * paths.get(4);
 * // 4
 * paths = jsnx.shortestPathLength(G {target: 4}); // source not specified
 * paths.get(0);
 * // 4
 * paths = jsnx.shortestPathLength(G); // source, target not specified
 * paths.get(0).get(4);
 * // 4
 * ```
 *
 * ### Notes
 *
 * The length of the path is always 1 less than the number of nodes involved in
 * the path since the length measures the number of edges followed.
 *
 * For digraphs this returns the shortest directed path length. To find path
 * lengths in the reverse directio, use `G.reverse(false)` first to flip the
 * edge orientation.
 *
 * @see allPairsShortestPathLength
 * @see allPairsDijkstraPathLength
 * @see singleSourceShortestPathLength
 * @see singleSourceDijkstraPathLength
 *
 * @param {Graph} G
 * @param {?{source: ?Node, target: ?Node, weight: ?string}=} optParameters
 *   - source: Starting node for path.
 *     If not specified, compute the shortest path lengths using all nodes as
 *     source nodes.
 *   - target: Ending node for path.
 *     If not specified, compute the shortest path length using all nodes as
 *     target nodes.
 *   - weight:
 *     If not specified, every edge has weight/distance/cost of 1.
 *     If a string, use this edge attribute as the edge weight. Any edg
 *     attribute not present defaults to 1.
 * @return {(number|Map)}
 *   If the `source` and `target` are both specified, return the length of the
 *   shortest path from the source to the target.
 *
 *   If only the `source` is specified, return a Map keyed by
 *   targets whose values are the lengths of the shortest path from the source
 *   to one of the targets.
 *
 *   If only the `target` is specified, return a Map keyed by
 *   sources whose values are the lengths of the shortest path from one of the
 *   sources to the target.
 *
 *   If neither the `source` nor `target` are specified return a Map
 *   of Maps with path[source][target]=L, where L is the length of the shortest
 *   path from source to target.
 */

function genShortestPath(G, _source$target$weight) {
  return (0, _internalsDelegate2['default'])('shortestPath', [G, _source$target$weight]);
}

function shortestPathLength(G) {
  var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var source = _ref3.source;
  var target = _ref3.target;
  var weight = _ref3.weight;

  var paths;

  if (source == null) {
    if (target == null) {
      // find paths between all pairs
      if (weight == null) {
        paths = (0, _unweighted.allPairsShortestPathLength)(G);
      } else {
        paths = (0, _weighted.allPairsDijkstraPathLength)(G, { weight: weight });
      }
    } else {
      // find paths from all nodes co-accessibly to the target
      var directed = G.isDirected();
      try {
        if (directed) {
          G.reverse(false);
        }
        if (weight == null) {
          paths = (0, _unweighted.singleSourceShortestPathLength)(G, target);
        } else {
          paths = (0, _weighted.singleSourceDijkstraPathLength)(G, { target: target, weight: weight });
        }
      } finally {
        if (directed) {
          G.reverse(false);
        }
      }
    }
  } else {
    if (target == null) {
      // find paths to all nodes accessible from the source
      if (weight == null) {
        paths = (0, _unweighted.singleSourceShortestPathLength)(G, source);
      } else {
        paths = (0, _weighted.singleSourceDijkstraPathLength)(G, { source: source, weight: weight });
      }
    } else {
      // find shortest source-target path
      if (weight == null) {
        paths = (0, _unweighted.bidirectionalShortestPath)(G, source, target);
        paths = paths.length - 1;
      } else {
        paths = (0, _weighted.dijkstraPathLength)(G, { source: source, target: target, weight: weight });
      }
    }
  }

  return paths;
}

// TODO averageShortestPathLength
// TODO allShortestPaths

function genShortestPathLength(G, _source$target$weight2) {
  return (0, _internalsDelegate2['default'])('shortestPathLength', [G, _source$target$weight2]);
}

},{"../../_internals/delegate":12,"../../exceptions":78,"./unweighted":57,"./weighted":58,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],56:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _generic = require('./generic');

var generic = _interopRequireWildcard(_generic);

var _unweighted = require('./unweighted');

var unweighted = _interopRequireWildcard(_unweighted);

var _weighted = require('./weighted');

var weighted = _interopRequireWildcard(_weighted);

exports.generic = generic;
exports.unweighted = unweighted;
exports.weighted = weighted;

_defaults(exports, _interopExportWildcard(_generic, _defaults));

_defaults(exports, _interopExportWildcard(_unweighted, _defaults));

_defaults(exports, _interopExportWildcard(_weighted, _defaults));

},{"./generic":55,"./unweighted":57,"./weighted":58,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],57:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.singleSourceShortestPathLength = singleSourceShortestPathLength;
exports.genSingleSourceShortestPathLength = genSingleSourceShortestPathLength;
exports.allPairsShortestPathLength = allPairsShortestPathLength;
exports.genAllPairsShortestPathLength = genAllPairsShortestPathLength;
exports.bidirectionalShortestPath = bidirectionalShortestPath;
exports.genBidirectionalShortestPath = genBidirectionalShortestPath;
exports.singleSourceShortestPath = singleSourceShortestPath;
exports.genSingleSourceShortestPath = genSingleSourceShortestPath;
exports.allPairsShortestPath = allPairsShortestPath;
exports.genAllPairsShortestPath = genAllPairsShortestPath;
exports.predecessor = predecessor;
exports.genPredecessor = genPredecessor;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

/**
 * @fileoverview Shortest path algorithms for unweighted graphs.
 */

var _exceptions = require('../../exceptions');

var _internals = require('../../_internals');

/**
 * Compute the shortest path lengths from source to all reachable nodes.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.singleSourceShortestPathLength(G, 0);
 * length.get(4);
 * // 4
 * length
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * ```
 *
 * @see shortestPathLength
 *
 * @param {Graph} G graph
 * @param {Node} source Starting node for path
 * @param {number=} optCutoff
 *    Depth to stop the search. Only paths of length <= cutoff are returned.
 *
 * @return {!Map} Map of shortest path lengths keyed by target.
 */
'use strict';
function singleSourceShortestPathLength(G, source, optCutoff) {
  var seen = new _internals.Map(); // level (number of hops) when seen n BFS
  var level = 0; // the current level
  // map of nodes to check at next level
  var nextlevel = new _internals.Map([[source, 1]]);

  while (nextlevel.size > 0) {
    var thislevel = nextlevel;
    nextlevel = new _internals.Map();
    /*eslint no-loop-func:0*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(thislevel.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;

        if (!seen.has(v)) {
          seen.set(v, level);
          G.get(v).forEach(function (_, n) {
            return nextlevel.set(n, 1);
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (optCutoff != null && optCutoff <= level) {
      break;
    }
    level += 1;
  }
  return seen;
}

/**
 * Compute the shortest path lengths between all nodes in G.
 *
 * The map returned only has keys for reachable node pairs.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.allPairsShortestPathLength(G);
 * length.get(1).get(4);
 * // 3
 * length.get(1);
 * // Map {0: 1, 1: 0, 2: 1, 3: 2, 4: 3}
 * ```
 *
 * @param {Graph} G
 * @param {number=} optCutoff  depth to stop the search.
 *    Only paths of length <= cutoff are returned.
 *
 * @return {!Map}
 */

function genSingleSourceShortestPathLength(G, source, optCutoff) {
  return (0, _internalsDelegate2['default'])('singleSourceShortestPathLength', [G, source, optCutoff]);
}

function allPairsShortestPathLength(G, optCutoff) {
  var paths = new _internals.Map();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _getIterator(G), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var n = _step2.value;

      paths.set(n, singleSourceShortestPathLength(G, n, optCutoff));
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2['return']) {
        _iterator2['return']();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return paths;
}

/**
 * Return a list of nodes in a shortest path between source and target.
 *
 * This algorithm is used by `shortestPath(G, source, target)`.
 *
 * @see shortestPath
 *
 * @param {Graph} G
 * @param {Node} source starting node for path
 * @param {Node} target ending node for path
 *
 * @return {!Array}
 */

function genAllPairsShortestPathLength(G, optCutoff) {
  return (0, _internalsDelegate2['default'])('allPairsShortestPathLength', [G, optCutoff]);
}

function bidirectionalShortestPath(G, source, target) {
  // call helper to do the real work

  var _bidirectionalPredSucc = bidirectionalPredSucc(G, source, target);

  var _bidirectionalPredSucc2 = _slicedToArray(_bidirectionalPredSucc, 3);

  var pred = _bidirectionalPredSucc2[0];
  var succ = _bidirectionalPredSucc2[1];
  var w = _bidirectionalPredSucc2[2];

  // build path from pred+w+succ
  var path = [];
  // from source to w
  while (w != null) {
    path.push(w);
    w = pred.get(w);
  }
  w = succ.get(path[0]);
  path.reverse();
  // from w to target
  while (w != null) {
    path.push(w);
    w = succ.get(w);
  }
  return path;
}

/**
 * Bidirectional shortest path helper.
 *
 * @return {!Array} Returns [pred,succ,w] where
 *    pred is a map of predecessors from w to the source, and
 *    succ is a map of successors from w to the target.
 */

function genBidirectionalShortestPath(G, source, target) {
  return (0, _internalsDelegate2['default'])('bidirectionalShortestPath', [G, source, target]);
}

function bidirectionalPredSucc(G, source, target) {
  // does BFS from both source and target and meets in the middle
  if ((0, _internals.nodesAreEqual)(source, target)) {
    return [new _internals.Map([[source, null]]), new _internals.Map([[target, null]]), source];
  }

  // handle either directed or undirected
  var gpred, gsucc;
  if (G.isDirected()) {
    gpred = G.predecessorsIter.bind(G);
    gsucc = G.successorsIter.bind(G);
  } else {
    gpred = G.neighborsIter.bind(G);
    gsucc = G.neighborsIter.bind(G);
  }

  // predecesssor and successors in search
  var pred = new _internals.Map([[source, null]]);
  var succ = new _internals.Map([[target, null]]);
  //
  // initialize fringes, start with forward
  var forwardFringe = [source];
  var reverseFringe = [target];
  var thisLevel;

  /*jshint newcap:false*/
  while (forwardFringe.length > 0 && reverseFringe.length > 0) {
    if (forwardFringe.length <= reverseFringe.length) {
      thisLevel = forwardFringe;
      forwardFringe = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(thisLevel), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var v = _step3.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = _getIterator(gsucc(v)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var w = _step4.value;

              if (!pred.has(w)) {
                forwardFringe.push(w);
                pred.set(w, v);
              }
              if (succ.has(w)) {
                return [pred, succ, w]; // found path
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    } else {
        thisLevel = reverseFringe;
        reverseFringe = [];
        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = _getIterator(thisLevel), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var v = _step5.value;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
              for (var _iterator6 = _getIterator(gpred(v)), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                var w = _step6.value;

                if (!succ.has(w)) {
                  reverseFringe.push(w);
                  succ.set(w, v);
                }
                if (pred.has(w)) {
                  return [pred, succ, w]; // found path
                }
              }
            } catch (err) {
              _didIteratorError6 = true;
              _iteratorError6 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                  _iterator6['return']();
                }
              } finally {
                if (_didIteratorError6) {
                  throw _iteratorError6;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5['return']) {
              _iterator5['return']();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }
      }
  }
  throw new _exceptions.JSNetworkXNoPath((0, _internals.sprintf)('No path between `%j` and `%j`.', source, target));
}

/**
 * Compute shortest path between source and all other nodes reachable from
 * source.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.singleSourceShortestPath(G, 0);
 * path.get(4);
 * // [1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * The shortest path is not necessarily unique. So there can be multiple⋅
 * paths between the source and each target node, all of which have the⋅
 * same 'shortest' length. For each target node, this function returns⋅
 * only one of those paths.
 *
 *
 * @see shortestPath
 *
 * @param {Graph} G
 * @param {Node} source
 * @param {number=} optCutoff Depth to stop the search.
 *    Only paths of `length <= cutoff` are returned.
 *
 * @return {!Map<Array>} Map, keyed by target, of shortest paths.
 */

function singleSourceShortestPath(G, source, optCutoff) {
  var level = 0;
  var nextlevel = new _internals.Map([[source, 1]]);
  var paths = new _internals.Map([[source, [source]]]);
  if (optCutoff === 0) {
    return paths;
  }
  /*jshint loopfunc:true*/
  while (nextlevel.size > 0) {
    var thislevel = nextlevel;
    nextlevel = new _internals.Map();
    var _iteratorNormalCompletion7 = true;
    var _didIteratorError7 = false;
    var _iteratorError7 = undefined;

    try {
      for (var _iterator7 = _getIterator(thislevel.keys()), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
        var v = _step7.value;
        var _iteratorNormalCompletion8 = true;
        var _didIteratorError8 = false;
        var _iteratorError8 = undefined;

        try {
          for (var _iterator8 = _getIterator(G.get(v).keys()), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var w = _step8.value;

            if (!paths.has(w)) {
              paths.set(w, paths.get(v).concat([w]));
              nextlevel.set(w, 1);
            }
          }
        } catch (err) {
          _didIteratorError8 = true;
          _iteratorError8 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion8 && _iterator8['return']) {
              _iterator8['return']();
            }
          } finally {
            if (_didIteratorError8) {
              throw _iteratorError8;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError7 = true;
      _iteratorError7 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
          _iterator7['return']();
        }
      } finally {
        if (_didIteratorError7) {
          throw _iteratorError7;
        }
      }
    }

    level += 1;
    if (optCutoff != null && optCutoff <= level) {
      break;
    }
  }
  return paths;
}

/**
 * Compute shortest paths between all nodes.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsShortestPath(G);
 * path.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * @see floydWarshall
 *
 * @param {Graph} G
 * @param {number=} optCutoff Depth to stop the search.
 *    Only paths of length <= cutoff are returned.
 *
 * @return {!Map} Map, keyed by source and target, of shortest paths.
 */

function genSingleSourceShortestPath(G, source, optCutoff) {
  return (0, _internalsDelegate2['default'])('singleSourceShortestPath', [G, source, optCutoff]);
}

function allPairsShortestPath(G, optCutoff) {
  var paths = new _internals.Map();
  var _iteratorNormalCompletion9 = true;
  var _didIteratorError9 = false;
  var _iteratorError9 = undefined;

  try {
    for (var _iterator9 = _getIterator(G), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
      var n = _step9.value;

      paths.set(n, singleSourceShortestPath(G, n, optCutoff));
    }
  } catch (err) {
    _didIteratorError9 = true;
    _iteratorError9 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion9 && _iterator9['return']) {
        _iterator9['return']();
      }
    } finally {
      if (_didIteratorError9) {
        throw _iteratorError9;
      }
    }
  }

  return paths;
}

/**
 * Returns a map of predecessors for the path from source to all nodes in G.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * G.nodes();
 * // [0, 1, 2, 3, 4]
 * jsnx.predecessor(G, 0);
 * // Map {0: [], 1: [0], 2: [1], 3: [2]}
 *
 * @param {Graph} G
 * @param {Node} source Starting node for path
 * @param {{target: Node, cutoff: number, returnSeen: boolean}} optArgs
 *   - `target(=null)`: If provided only predecessors between⋅source and target
 *     are returned
 *   - `cutoff`: Depth to stop the search. Only paths of `length <= cutoff` are
 *     returned
 *   - `returnSeen(=false)`: If `true`, return `(seenNodes, predecessors)`
 *
 * @return {!(Map|Array)} Map, keyed by node, of predecessors in the shortest
 *   path.
 */

function genAllPairsShortestPath(G, optCutoff) {
  return (0, _internalsDelegate2['default'])('allPairsShortestPath', [G, optCutoff]);
}

function predecessor(G, source) {
  var optArgs = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  // TODO: use parameter destructuring
  // {target, cutoff, returnSeen}
  var target = optArgs.target;
  var cutoff = optArgs.cutoff;
  var returnSeen = optArgs.returnSeen;

  var level = 0;
  var nextlevel = [source];
  var seen = new _internals.Map([[source, level]]);
  var pred = new _internals.Map([[source, []]]);

  /*jshint loopfunc:true*/
  while (nextlevel.length > 0) {
    level += 1;
    var thislevel = nextlevel;
    nextlevel = [];
    thislevel.forEach(function (v) {
      G.get(v).forEach(function (_, w) {
        if (!seen.has(w)) {
          pred.set(w, [v]);
          seen.set(w, level);
          nextlevel.push(w);
        } else if (seen.get(w) === level) {
          // add v to predecesssor list if it
          pred.get(w).push(v); // is at the correct level
        }
      });
    });
    if (cutoff != null && cutoff <= level) {
      break;
    }
  }

  if (target != null) {
    if (returnSeen) {
      return pred.has(target) ? [pred.get(target), seen.get(target)] : [[], -1];
    } else {
      return (0, _internals.getDefault)(pred.get(target), []);
    }
  }
  return returnSeen ? [pred, seen] : pred;
}

function genPredecessor(G, source, optArgs) {
  return (0, _internalsDelegate2['default'])('predecessor', [G, source, optArgs]);
}

},{"../../_internals":20,"../../_internals/delegate":12,"../../exceptions":78,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],58:[function(require,module,exports){
'use strict';

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.dijkstraPath = dijkstraPath;
exports.genDijkstraPath = genDijkstraPath;
exports.dijkstraPathLength = dijkstraPathLength;
exports.genDijkstraPathLength = genDijkstraPathLength;
exports.singleSourceDijkstraPath = singleSourceDijkstraPath;
exports.genSingleSourceDijkstraPath = genSingleSourceDijkstraPath;
exports.singleSourceDijkstraPathLength = singleSourceDijkstraPathLength;
exports.genSingleSourceDijkstraPathLength = genSingleSourceDijkstraPathLength;
exports.singleSourceDijkstra = singleSourceDijkstra;
exports.genSingleSourceDijkstra = genSingleSourceDijkstra;
exports.allPairsDijkstraPathLength = allPairsDijkstraPathLength;
exports.genAllPairsDijkstraPathLength = genAllPairsDijkstraPathLength;
exports.allPairsDijkstraPath = allPairsDijkstraPath;
exports.genAllPairsDijkstraPath = genAllPairsDijkstraPath;

var _internalsDelegate = require('../../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _internals = require('../../_internals');

var _exceptionsJSNetworkXNoPath = require('../../exceptions/JSNetworkXNoPath');

var _exceptionsJSNetworkXNoPath2 = _interopRequireDefault(_exceptionsJSNetworkXNoPath);

/**
 * Returns the shortest path from `source` to `target` in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPath(G, {source: 0, target: 4});
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {Array} List of nodes in a shortest path
 */
'use strict';

function dijkstraPath(G, _ref3) {
  var source = _ref3.source;
  var target = _ref3.target;
  var _ref3$weight = _ref3.weight;
  var weight = _ref3$weight === undefined ? 'weight' : _ref3$weight;

  var _singleSourceDijkstra = // eslint-disable-line no-unused-vars
  singleSourceDijkstra(G, { source: source, target: target, weight: weight });

  var _singleSourceDijkstra2 = _slicedToArray(_singleSourceDijkstra, 2);

  var distances = _singleSourceDijkstra2[0];
  var paths = _singleSourceDijkstra2[1];

  var path = paths.get(target);
  if (!path) {
    throw new _exceptionsJSNetworkXNoPath2['default']((0, _internals.sprintf)('Node %j is not reachable from %j', source, target));
  }
  return path;
}

/**
 * Returns the shortest path length from `source` to `target` in a weighted
 * graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPathLength(G, {source: 0, target: 4});
 * // 4
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {number} Shortest path length
 */

function genDijkstraPath(G, _source$target$weight) {
  return (0, _internalsDelegate2['default'])('dijkstraPath', [G, _source$target$weight]);
}

function dijkstraPathLength(G, _ref4) {
  var source = _ref4.source;
  var target = _ref4.target;
  var _ref4$weight = _ref4.weight;
  var weight = _ref4$weight === undefined ? 'weight' : _ref4$weight;

  var distances = singleSourceDijkstraPathLength(G, { source: source, weight: weight });
  var distance = distances.get(target);
  if (distance == null) {
    throw new _exceptionsJSNetworkXNoPath2['default']((0, _internals.sprintf)('Node %j is not reachable from %j', source, target));
  }
  return distance;
}

function genDijkstraPathLength(G, _source$target$weight2) {
  return (0, _internalsDelegate2['default'])('dijkstraPathLength', [G, _source$target$weight2]);
}

function minMultiEdgeWeight(keydata, weight) {
  var minweight = Infinity;
  for (var key in keydata) {
    var edgeWeight = (0, _internals.getDefault)(keydata[key][weight], 1);
    if (edgeWeight < minweight) {
      minweight = edgeWeight;
    }
  }
  return minweight;
}

/**
 * Compute shortest path between source and all other reachable nodes for a
 * weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.singleSourceDijkstraPath(G, {source: 0});
 * path.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */

function singleSourceDijkstraPath(G, _ref5) {
  var source = _ref5.source;
  var cutoff = _ref5.cutoff;
  var _ref5$weight = _ref5.weight;
  var weight = _ref5$weight === undefined ? 'weight' : _ref5$weight;

  var _singleSourceDijkstra3 = // eslint-disable-line no-unused-vars
  singleSourceDijkstra(G, { source: source, cutoff: cutoff, weight: weight });

  var _singleSourceDijkstra32 = _slicedToArray(_singleSourceDijkstra3, 2);

  var length = _singleSourceDijkstra32[0];
  var path = _singleSourceDijkstra32[1];

  return path;
}

/**
 * Compute the shortest path length between source and all other reachable
 * nodes for a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.singleSourceDijkstraPathLength(G, {source: 0});
 * length.get(4);
 * // 4
 * length
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *

 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */

function genSingleSourceDijkstraPath(G, _source$cutoff$weight) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstraPath', [G, _source$cutoff$weight]);
}

function singleSourceDijkstraPathLength(G, _ref6) {
  var source = _ref6.source;
  var cutoff = _ref6.cutoff;
  var _ref6$weight = _ref6.weight;
  var weight = _ref6$weight === undefined ? 'weight' : _ref6$weight;

  var distances = new _internals.Map();
  var seen = new _internals.Map([[source, 0]]);
  var fringe = new _internals.PriorityQueue();
  var i = 0;
  fringe.enqueue(0, [i++, source]);
  while (fringe.size > 0) {
    var _fringe$dequeue = fringe.dequeue();

    var _fringe$dequeue2 = _slicedToArray(_fringe$dequeue, 2);

    var d = _fringe$dequeue2[0];

    var _fringe$dequeue2$1 = _slicedToArray(_fringe$dequeue2[1], 2);

    var _ = _fringe$dequeue2$1[0];
    var v = _fringe$dequeue2$1[1];
    // eslint-disable-line no-unused-vars
    if (distances.has(v)) {
      continue; // already searched this node
    }
    distances.set(v, d);
    var edata = undefined;
    if (G.isMultigraph()) {
      edata = (0, _internals.mapIterator)(G.get(v), function (_ref7) {
        var _ref72 = _slicedToArray(_ref7, 2);

        var w = _ref72[0];
        var keydata = _ref72[1];
        // eslint-disable-line no-loop-func
        return [w, _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
      });
    } else {
      edata = G.get(v);
    }
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(edata), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _slicedToArray(_step.value, 2);

        var w = _step$value[0];
        var edgeData = _step$value[1];

        var vwDistance = d + (0, _internals.getDefault)(edgeData[weight], 1);
        if (cutoff != null) {
          if (vwDistance > cutoff) {
            continue;
          }
        }
        if (distances.has(w)) {
          if (vwDistance < distances.get(w)) {
            throw new Error('Contradictory paths found: negative weights?');
          }
        } else if (!seen.has(w) || vwDistance < seen.get(w)) {
          seen.set(w, vwDistance);
          fringe.enqueue(vwDistance, [i++, w]);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return distances;
}

/**
 * Compute shortest paths and lengths in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var [lengths, paths] = jsnx.singleSourceDijkstra(G, {source: 0});
 * lengths.get(4);
 * // 4
 * lengths
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * paths.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * This algorithm is not guaranteed to work if edge weights are negative or are
 * floating point numbers (overflows and roundoff errors can cause problems).
 *
 * @see singleSourceDijkstraPath
 * @see singleSourceDijkstraPathLength
 *
 * @param {Graph} G
 * @param {{source: Node, target: ?Node, cutoff: ?number, weight: ?string}}
 *   parameters
 *   - source: Starting node for path
 *   - target: Ending node in the path (optional)
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Array<Map>}
 *   Returns a tuple of two Maps keyed by node. The first Map stores distances
 *   from the source. The second one stores the path from the source to that
 *   node.
 */

function genSingleSourceDijkstraPathLength(G, _source$cutoff$weight2) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstraPathLength', [G, _source$cutoff$weight2]);
}

function singleSourceDijkstra(G, _ref8) {
  var source = _ref8.source;
  var target = _ref8.target;
  var cutoff = _ref8.cutoff;
  var _ref8$weight = _ref8.weight;
  var weight = _ref8$weight === undefined ? 'weight' : _ref8$weight;

  if ((0, _internals.nodesAreEqual)(source, target)) {
    return [new _internals.Map([[source, 0]]), new _internals.Map([[source, target]])];
  }

  var distances = new _internals.Map();
  var paths = new _internals.Map([[source, [source]]]);
  var seen = new _internals.Map([[source, 0]]);
  var fringe = new _internals.PriorityQueue();
  var i = 0;
  fringe.enqueue(0, [i++, source]);
  while (fringe.size > 0) {
    var _fringe$dequeue3 = fringe.dequeue();

    var _fringe$dequeue32 = _slicedToArray(_fringe$dequeue3, 2);

    var d = _fringe$dequeue32[0];

    var _fringe$dequeue32$1 = _slicedToArray(_fringe$dequeue32[1], 2);

    var _ = _fringe$dequeue32$1[0];
    var v = _fringe$dequeue32$1[1];
    // eslint-disable-line no-unused-vars
    if (distances.has(v)) {
      continue; // already searched this node
    }
    distances.set(v, d);
    if ((0, _internals.nodesAreEqual)(v, target)) {
      break;
    }
    var edata = undefined;
    if (G.isMultigraph()) {
      edata = (0, _internals.mapIterator)(G.get(v), function (_ref9) {
        var _ref92 = _slicedToArray(_ref9, 2);

        var w = _ref92[0];
        var keydata = _ref92[1];
        // eslint-disable-line no-loop-func
        return [w, _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
      });
    } else {
      edata = G.get(v);
    }
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(edata), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _slicedToArray(_step2.value, 2);

        var w = _step2$value[0];
        var edgeData = _step2$value[1];

        var vwDistance = d + (0, _internals.getDefault)(edgeData[weight], 1);
        if (cutoff != null) {
          if (vwDistance > cutoff) {
            continue;
          }
        }
        if (distances.has(w)) {
          if (vwDistance < distances.get(w)) {
            throw new Error('Contradictory paths found: negative weights?');
          }
        } else if (!seen.has(w) || vwDistance < seen.get(w)) {
          seen.set(w, vwDistance);
          fringe.enqueue(vwDistance, [i++, w]);
          paths.set(w, paths.get(v).concat([w]));
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return [distances, paths];
}

// TODO dijkstraPredecessorAndDistance

/**
 * Compute shortest path lengths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(1).get(4);
 * // 3
 * path.get(1);
 * // Map {0: 1, 1: 0, 2: 1, 3: 2, 4: 3}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * The Map returned only has keys for reachable node pairs.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest path lengths
 */

function genSingleSourceDijkstra(G, _source$target$cutoff$weight) {
  return (0, _internalsDelegate2['default'])('singleSourceDijkstra', [G, _source$target$cutoff$weight]);
}

function allPairsDijkstraPathLength(G) {
  var _ref10 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var cutoff = _ref10.cutoff;
  var _ref10$weight = _ref10.weight;
  var weight = _ref10$weight === undefined ? 'weight' : _ref10$weight;

  var distances = new _internals.Map();
  var parameters = { weight: weight, cutoff: cutoff };
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(G), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var source = _step3.value;

      parameters.source = source;
      distances.set(source, singleSourceDijkstraPathLength(G, parameters));
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return distances;
}

/**
 * Compute shortest paths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest paths.
 */

function genAllPairsDijkstraPathLength(G, _cutoff$weight) {
  return (0, _internalsDelegate2['default'])('allPairsDijkstraPathLength', [G, _cutoff$weight]);
}

function allPairsDijkstraPath(G) {
  var _ref11 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  var cutoff = _ref11.cutoff;
  var _ref11$weight = _ref11.weight;
  var weight = _ref11$weight === undefined ? 'weight' : _ref11$weight;

  var paths = new _internals.Map();
  var parameters = { weight: weight, cutoff: cutoff };
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(G), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var source = _step4.value;

      parameters.source = source;
      paths.set(source, singleSourceDijkstraPath(G, parameters));
    }
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  return paths;
}

// TODO bellmanFord
// TODO goldbergRadzik
// TODO negativeEdgeCycle
// TODO bidirectionalDijkstra

function genAllPairsDijkstraPath(G, _cutoff$weight2) {
  return (0, _internalsDelegate2['default'])('allPairsDijkstraPath', [G, _cutoff$weight2]);
}

},{"../../_internals":20,"../../_internals/delegate":12,"../../exceptions/JSNetworkXNoPath":75,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/define-property":105,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],59:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _WorkerSettings = require('./WorkerSettings');

var _WorkerSettings2 = _interopRequireDefault(_WorkerSettings);

var _initializeBrowserWorker = require('./initializeBrowserWorker');

var _initializeBrowserWorker2 = _interopRequireDefault(_initializeBrowserWorker);

var _ = require('./');

var jsnx = _interopRequireWildcard(_);

Object.defineProperty(jsnx, 'workerPath', {
  set: function set(value) {
    _WorkerSettings2['default'].workerPath = value;
  },
  get: function get() {
    return _WorkerSettings2['default'].workerPath;
  }
});

_WorkerSettings2['default'].methodLookupFunction = function (name) {
  return jsnx[name];
};
(0, _initializeBrowserWorker2['default'])();

exports['default'] = jsnx;
module.exports = exports['default'];

},{"./":85,"./WorkerSettings":1,"./initializeBrowserWorker":86,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110}],60:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

var _internalsMap = require('../_internals/Map');

var _internalsMap2 = _interopRequireDefault(_internalsMap);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _convert = require('../convert');

var convert = _interopRequireWildcard(_convert);

var _internals = require('../_internals');

/**
 * Base class for directed graphs.
 *
 * A DiGraph stores nodes and edges with optional data, or attributes.
 *
 * DiGraphs hold directed edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be strings, numbers or any object with a custom `toString` method.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = new jsnx.DiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2, 3]);
 * G.addNodesFrom(new Set('foo', 'bar'));
 * var H = jsnx.completeGraph(10);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings, numbers and arrays, any object that implements a
 * custom `toString` method can be used as node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges,
 *
 * ```
 * G.addEdgesFrom(H.edges);
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. There are no errors when adding nodes or edges that already
 * exist.
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object (keys must be strings or numbers).
 * By default these are empty, but can added or changed using `addEdge`,
 * `addNode`.
 *
 * ```
 * var G = new jsnx.DiGraph(null, {day: 'Friday'});
 * G.graph
 * // {day: 'Friday'}
 * ```
 *
 * Add node attributes using `addNode()` or `addNodesFrom()`:
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([2, [3, {time: '3pm'}]], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [2, {time: '2pm'}], [3, {time: '3pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge()`, or `addEdgesFrom()`:
 *
 * ```
 * G.addEdge(1, w, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * ```
 *
 * @see Graph
 * @see MultiGraph
 * @see MultiDiGraph
 */

var DiGraph = (function (_Graph) {
  _inherits(DiGraph, _Graph);

  /**
   * @param {Iterable} optData
   *      Data to initialize graph.  If data=None (default) an empty
   *      graph is created.  The data can be an edge list, or any
   *      JSNetworkX graph object.
   *
   * @param {Object=} optAttr
   *       Attributes to add to graph as key=value pairs.
   */

  function DiGraph(optData, optAttr) {
    _classCallCheck(this, DiGraph);

    _get(Object.getPrototypeOf(DiGraph.prototype), 'constructor', this).call(this);
    this.graph = {}; // dictionary for graph attributes
    this.node = new _internalsMap2['default'](); // dictionary for node attributes
    // We store two adjacency lists:
    // the  predecessors of node n are stored in the dict self.pred
    // the successors of node n are stored in the dict self.succ=self.adj
    this.adj = new _internalsMap2['default'](); // empty adjacency dictionary
    this.pred = new _internalsMap2['default'](); // predecessor
    this.succ = this.adj; // successor

    //attempt to load graph with data
    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    }
    // load graph attributes (must be afte convert)
    _Object$assign(this.graph, optAttr || {});
    this.edge = this.adj;
  }

  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */

  _createClass(DiGraph, [{
    key: 'addNode',

    /**
     * Add a single node n and update node attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addNode(1);
     * G.addNode('Hello');
     * G.numberOfNodes();
     * 2
     * ```
     *
     * @see #addNodesFrom
     *
     * @param {Node} n Node
     * @param {Object=} opt_attr_dict Dictionary of node attributes.
     *      Key/value pairs will update existing data associated with the node.
     */
    value: function addNode(n) {
      var optAttrDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The opt_attr_dict argument must be an object.');
      }

      if (!this.succ.has(n)) {
        this.succ.set(n, new _internalsMap2['default']());
        this.pred.set(n, new _internalsMap2['default']());
        this.node.set(n, optAttrDict);
      } else {
        // update attr even if node already exists
        _Object$assign(this.node.get(n), optAttrDict);
      }
    }

    /**
     * Add multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph
     * G.addNodesFrom([1,2,3]);
     * G.nodes();
     * // [1,2,3]
     * ```
     *
     * Use the second argument to update specific node attributes for every node.
     *
     * ```
     * G.addNodesFrom([1,2], {size: 10});
     * G.addNodesFrom([2,3], {weight: 0.4});
     * ```
     *
     * Use `(node, object)` tuples to update attributes for specific nodes.
     *
     * ```
     * G.addNodesFrom([[1, {size: 11}], [2, {color: 'blue'}]]);
     * G.node.get(1).size
     * // 11
     * var H = new jsnx.Graph();
     * H.addNodesFrom(G.nodes(true));
     * H.node.get(1).size
     * // 11
     * ```
     *
     * @see #addNode
     *
     * @param {Iterable} nodes
     *      An iterable of nodes
     *      OR
     *      An iterable of (node, object) tuples.
     *
     * @param {Object=} optAttr  Update attributes for all nodes in nodes.
     *       Node attributes specified in nodes as a tuple
     *       take precedence over attributes specified generally.
     */
  }, {
    key: 'addNodesFrom',
    value: function addNodesFrom(nodes) {
      var optAttr = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      // if an object, only iterate over the keys
      (0, _internals.forEach)(nodes, function (n) {
        var newnode = !this.succ.has(n);

        // test whether n is a (node, attr) tuple
        if (Array.isArray(n) && n.length === 2 && (0, _internals.isPlainObject)(n[1])) {
          var nn = n[0];
          var ndict = n[1];

          if (!this.succ.has(nn)) {
            this.succ.set(nn, new _internalsMap2['default']());
            this.pred.set(nn, new _internalsMap2['default']());
            var newdict = (0, _internals.clone)(optAttr);
            _Object$assign(newdict, ndict);
            this.node.set(nn, newdict);
          } else {
            var olddict = this.node.get(nn);
            _Object$assign(olddict, optAttr, ndict);
          }
        } else if (newnode) {
          this.succ.set(n, new _internalsMap2['default']());
          this.pred.set(n, new _internalsMap2['default']());
          this.node.set(n, (0, _internals.clone)(optAttr));
        } else {
          _Object$assign(this.node.get(n), optAttr);
        }
      }, this);
    }

    /**
     * Remove node n.
     *
     * Removes the node n and all adjacent edges.
     * Attempting to remove a non-existent node will raise an exception.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.edges();
     * // [[0,1], [1,2]]
     * G.removeNode(1);
     * G.edges();
     * // []
     * ```
     *
     * @see #removeNodesFrom
     *
     * @param {Node} n  A node in the graph
     */
  }, {
    key: 'removeNode',
    value: function removeNode(n) {
      if (this.node['delete'](n)) {
        var nbrs = this.succ.get(n);
        nbrs.forEach(function (_, u) {
          this.pred.get(u)['delete'](n); // remove all edges n-u in digraph
        }, this);
        this.succ['delete'](n); // remove node from succ
        this.pred.get(n).forEach(function (_, u) {
          this.succ.get(u)['delete'](n); // remove all edges n-u in digraph
        }, this);
        this.pred['delete'](n); // remove node from pred
      } else {
          throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The node "%j" is not in the graph', n));
        }
    }

    /**
     * Remove multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * var e = G.nodes(); // [0,1,2]
     * G.removeNodesFrom(e);
     * G.nodes();
     * // []
     * ```
     *
     * @see #removeNode
     *
     * @param {Iterable} nodes  A container of nodes.
     *      If a node in the container is not in the graph it is silently ignored.
     */
  }, {
    key: 'removeNodesFrom',
    value: function removeNodesFrom(nodes) {
      (0, _internals.forEach)(nodes, function (n) {
        if (this.succ.has(n)) {
          var succs = this.succ.get(n);

          this.node['delete'](n);
          succs.forEach(function (_, u) {
            // remove all edges n-u in digraph
            this.pred.get(u)['delete'](n);
          }, this);
          this.succ['delete'](n); // remove node from succ
          this.pred.get(n).forEach(function (_, u) {
            // remove all edges n-u in digraph
            this.succ.get(u)['delete'](n);
          }, this);
          this.pred['delete'](n); // remove node from pred
        }
      }, this);
    }

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are
     * not already in the graph.
     *
     * Edge attributes can be specified with keywords or by providing
     * a object with key/value pairs as third argument.
     *
     *
     * ### Examples
     *
     * The following all add the edge `(1,2)` to graph `G`:
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1,2);
     * G.addEdgesFrom([[1,2]]);
     * ```
     *
     * Associate data to edges using an object:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     *
     * ### Notes
     *
     * Adding an edge that already exists updates the edge data.
     *
     * Many algorithms designed for weighted graphs use as the edge weight a
     * numerical value assigned to an attribute which by default is 'weight'.
     *
     * @see #addEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Key/value pairs will update existing data associated with the edge.
     */
  }, {
    key: 'addEdge',
    value: function addEdge(u, v) {
      var optAttrDict = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      if (!(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The optAttrDict argument must be a plain object.');
      }

      // add nodes
      if (!this.succ.has(u)) {
        this.succ.set(u, new _internalsMap2['default']());
        this.pred.set(u, new _internalsMap2['default']());
        this.node.set(u, {});
      }

      if (!this.succ.has(v)) {
        this.succ.set(v, new _internalsMap2['default']());
        this.pred.set(v, new _internalsMap2['default']());
        this.node.set(v, {});
      }

      // add the edge
      var datadict = this.adj.get(u).get(v) || {};
      _Object$assign(datadict, optAttrDict);
      this.succ.get(u).set(v, datadict);
      this.pred.get(v).set(u, datadict);
    }

    /**
     * Add all the edges in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdgesFrom([[0,1], [1,2]]); // using a list of edges
     * ```
     *
     * Associate data to edges
     *
     * ```
     * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
     * G.addEdgesFrom([[3,4], [1,4]], {label: 'WN2898'});
     * ```
     *
     * ### Notes
     *
     * Adding the same edge twice has no effect but any edge data
     * will be updated when each duplicate edge is added.
     *
     * @see #add_edge
     * @see #addWeightedEdgesFrom
     *
     * @param {Iterable} ebunch container of edges
     *      Each edge given in the container will be added to the
     *      graph. The edges must be given as as 2-tuples (u,v) or
     *      3-tuples (u,v,d) where d is a dictionary containing edge data.
     *
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Dictionary of edge attributes.  Key/value pairs will
     *      update existing data associated with each edge.
     */
  }, {
    key: 'addEdgesFrom',
    value: function addEdgesFrom(ebunch) {
      var optAttrDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The opt_attr_dict argument must be an object.');
      }

      // process ebunch
      (0, _internals.forEach)(ebunch, function (edge) {
        var length = (0, _internals.size)(edge);
        var u, v, edgeData;
        if (length === 3) {
          u = edge[0];
          v = edge[1];
          edgeData = edge[2];
        } else if (length === 2) {
          u = edge[0];
          v = edge[1];
          edgeData = {};
        } else {
          throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('Edge tuple "%j" must be a 2-tuple or 3-tuple.', edge));
        }

        if (!this.succ.has(u)) {
          this.succ.set(u, new _internalsMap2['default']());
          this.pred.set(u, new _internalsMap2['default']());
          this.node.set(u, {});
        }
        if (!this.succ.has(v)) {
          this.succ.set(v, new _internalsMap2['default']());
          this.pred.set(v, new _internalsMap2['default']());
          this.node.set(v, {});
        }

        var datadict = this.adj.get(u).get(v) || {};
        _Object$assign(datadict, optAttrDict, edgeData);
        this.succ.get(u).set(v, datadict);
        this.pred.get(v).set(u, datadict);
      }, this);
    }

    /**
     * Remove the edge between u and v.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0,1);
     * ```
     *
     * @see #removeEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     */
  }, {
    key: 'removeEdge',
    value: function removeEdge(u, v) {
      var edge = this.succ.get(u);
      if (edge !== undefined && edge['delete'](v)) {
        this.pred.get(v)['delete'](u);
      } else {
        throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The edge "%j-%j" is not in the graph', u, v));
      }
    }

    /**
     * Remove all edges specified in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var ebunch = [[1,2], [2,3]];
     * G.removeEdgesFrom(ebunch);
     * ```
     *
     * ### Notes
     *
     * Will fail silently if an edge in `ebunch` is not in the graph.
     *
     * @param {Iterable} ebunch Iterable of edge tuples
     *      Each edge given in the list or container will be removed
     *      from the graph. The edges can be:
     *        - 2-tuples (u,v) edge between u and v.
     *        - 3-tuples (u,v,k) where k is ignored.
     */
  }, {
    key: 'removeEdgesFrom',
    value: function removeEdgesFrom(ebunch) {
      (0, _internals.forEach)(ebunch, function (edge) {
        var u = edge[0]; // ignore edge data if present
        var v = edge[1];

        try {
          this.succ.get(u)['delete'](v);
          this.pred.get(v)['delete'](u);
        } catch (ex) {
          /*eslint no-empty:0*/
          // pass
        }
      }, this);
    }

    /**
     * Return True if node u has successor v.
     *
     * This is true if graph has the edge u->v.
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @return {boolean} True if node u has successor v
     */
  }, {
    key: 'hasSuccessor',
    value: function hasSuccessor(u, v) {
      return this.succ.has(u) && this.succ.get(u).has(v);
    }

    /**
     * Return True if node u has predecessor v.
     *
     * This is true if graph has the edge u<-v.
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @return {boolean} True if node u has predecessor v
     */
  }, {
    key: 'hasPredecessor',
    value: function hasPredecessor(u, v) {
      return this.pred.has(u) && this.pred.get(u).has(v);
    }

    /**
     * Return an iterator over successor nodes of n.
     *
     * `neighborsIter()` and `successorsIter()` are the same.
     *
     * @param {Node} n Node
     * @return {!Iterator} Iterator over successor nodes of n
     */
  }, {
    key: 'successorsIter',
    value: function successorsIter(n) {
      var nbrs = this.succ.get(n);
      if (nbrs !== undefined) {
        return nbrs.keys();
      }
      throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The node "%j" is not in the digraph.', n));
    }

    /**
     * Return an iterator over predecessor nodes of n.
     *
     * @param {Node} n Node
     * @return {!Iterator} Iterator over predecessor nodes of n
     */
  }, {
    key: 'predecessorsIter',
    value: function predecessorsIter(n) {
      var nbrs = this.pred.get(n);
      if (nbrs !== undefined) {
        return nbrs.keys();
      }
      throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The node "%j" is not in the digraph.', n));
    }

    /**
     * Return a list of successor nodes of n.
     *
     * `neighbors()` and `successors()` are the same.
     *
     * @param {Node} n Node
     * @return {!Array} List of successor nodes of n
     */
  }, {
    key: 'successors',
    value: function successors(n) {
      return _Array$from(this.successorsIter(n));
    }

    /**
     * Return list of predecessor nodes of n.
     *
     * @param {Node} n Node
     * @return {!Array} List of predecessor nodes of n
     */
  }, {
    key: 'predecessors',
    value: function predecessors(n) {
      return _Array$from(this.predecessorsIter(n));
    }

    // digraph definitions
    /**
     * @alias successors
     */
  }, {
    key: 'neighbors',
    value: function neighbors(n) {
      return this.successors(n);
    }

    /**
     * @alias successorsIter
     */
  }, {
    key: 'neighborsIter',
    value: function neighborsIter(n) {
      return this.successorsIter(n);
    }

    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data in the order
     * `(node, neighbor, data)`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph() // or MultiDiGraph, etc
     * G.addPath([0,1,2]);;
     * G.addEdge(2, 3, {weight: 5});
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgeIter(true)); // default data is {}
     * // [[0,1,{}], [1,2,{}], [2,3,{weight: 5}]]
     * Array.from(G.edgesIter([0,2]));
     * // [[0,1], [2,3]]
     * Array.from(G.edgesIter(0));
     * // [[0,1]]
     * ```
     *
     *
     * ### Notes
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     *
     * @see #edges
     *
     * @param {?boolean=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} optData
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of edges.
     */
  }, {
    key: 'edgesIter',
    value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeNbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbrData, result;

      return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
        // istanbul ignore next

        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // handle calls with opt_data being the only argument
            if ((0, _internals.isBoolean)(optNbunch)) {
              optData = optNbunch;
              optNbunch = undefined;
            }

            if (optNbunch === undefined) {
              nodesNbrs = this.adj;
            } else {
              nodesNbrs = (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
                return (0, _internals.tuple2)(n, _this.adj.get(n));
              });
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 5;
            _iterator = _getIterator(nodesNbrs);

          case 7:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 40;
              break;
            }

            nodeNbrs = _step.value;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 12;
            _iterator2 = _getIterator(nodeNbrs[1]);

          case 14:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 23;
              break;
            }

            nbrData = _step2.value;
            result = [nodeNbrs[0], nbrData[0]];

            if (optData) {
              result[2] = nbrData[1];
            }
            context$2$0.next = 20;
            return result;

          case 20:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 14;
            break;

          case 23:
            context$2$0.next = 29;
            break;

          case 25:
            context$2$0.prev = 25;
            context$2$0.t0 = context$2$0['catch'](12);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t0;

          case 29:
            context$2$0.prev = 29;
            context$2$0.prev = 30;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 32:
            context$2$0.prev = 32;

            if (!_didIteratorError2) {
              context$2$0.next = 35;
              break;
            }

            throw _iteratorError2;

          case 35:
            return context$2$0.finish(32);

          case 36:
            return context$2$0.finish(29);

          case 37:
            _iteratorNormalCompletion = true;
            context$2$0.next = 7;
            break;

          case 40:
            context$2$0.next = 46;
            break;

          case 42:
            context$2$0.prev = 42;
            context$2$0.t1 = context$2$0['catch'](5);
            _didIteratorError = true;
            _iteratorError = context$2$0.t1;

          case 46:
            context$2$0.prev = 46;
            context$2$0.prev = 47;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 49:
            context$2$0.prev = 49;

            if (!_didIteratorError) {
              context$2$0.next = 52;
              break;
            }

            throw _iteratorError;

          case 52:
            return context$2$0.finish(49);

          case 53:
            return context$2$0.finish(46);

          case 54:
          case 'end':
            return context$2$0.stop();
        }
      }, edgesIter, this, [[5, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
    })

    // alias out_edges to edges

    /**
     * @alias edgesIter
     */
  }, {
    key: 'outEdgesIter',
    value: function outEdgesIter(optNbunch, optData) {
      return this.edgesIter(optNbunch, optData);
    }

    /**
     * @alias edges
     */
  }, {
    key: 'outEdges',
    value: function outEdges(optNbunch, optData) {
      return this.edges(optNbunch, optData);
    }

    /**
     * Return an iterator over the incoming edges.
     *
     * @see edgesIter
     *
     * @param {?boolean=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} optData
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of
     *      incoming edges.
     */
  }, {
    key: 'inEdgesIter',
    value: _regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var nodesNbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, nodeNbrs, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, nbrData, result;

      return _regeneratorRuntime.wrap(function inEdgesIter$(context$2$0) {
        // istanbul ignore next

        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            // handle calls with opt_data being the only argument
            if ((0, _internals.isBoolean)(optNbunch)) {
              optData = optNbunch;
              optNbunch = undefined;
            }

            if (optNbunch === undefined) {
              nodesNbrs = this.pred;
            } else {
              nodesNbrs = (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
                return (0, _internals.tuple2)(n, _this2.pred.get(n));
              });
            }

            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 5;
            _iterator3 = _getIterator(nodesNbrs);

          case 7:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 40;
              break;
            }

            nodeNbrs = _step3.value;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            context$2$0.prev = 12;
            _iterator4 = _getIterator(nodeNbrs[1]);

          case 14:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              context$2$0.next = 23;
              break;
            }

            nbrData = _step4.value;
            result = [nbrData[0], nodeNbrs[0]];

            if (optData) {
              result[2] = nbrData[1];
            }
            context$2$0.next = 20;
            return result;

          case 20:
            _iteratorNormalCompletion4 = true;
            context$2$0.next = 14;
            break;

          case 23:
            context$2$0.next = 29;
            break;

          case 25:
            context$2$0.prev = 25;
            context$2$0.t0 = context$2$0['catch'](12);
            _didIteratorError4 = true;
            _iteratorError4 = context$2$0.t0;

          case 29:
            context$2$0.prev = 29;
            context$2$0.prev = 30;

            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }

          case 32:
            context$2$0.prev = 32;

            if (!_didIteratorError4) {
              context$2$0.next = 35;
              break;
            }

            throw _iteratorError4;

          case 35:
            return context$2$0.finish(32);

          case 36:
            return context$2$0.finish(29);

          case 37:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 7;
            break;

          case 40:
            context$2$0.next = 46;
            break;

          case 42:
            context$2$0.prev = 42;
            context$2$0.t1 = context$2$0['catch'](5);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t1;

          case 46:
            context$2$0.prev = 46;
            context$2$0.prev = 47;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 49:
            context$2$0.prev = 49;

            if (!_didIteratorError3) {
              context$2$0.next = 52;
              break;
            }

            throw _iteratorError3;

          case 52:
            return context$2$0.finish(49);

          case 53:
            return context$2$0.finish(46);

          case 54:
          case 'end':
            return context$2$0.stop();
        }
      }, inEdgesIter, this, [[5, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
    })

    /**
     * Return a list of the incoming edges.
     *
     * @see #edges
     *
     * @param {?Iterable=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} opt_data
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Array} A list of incoming edges
     */
  }, {
    key: 'inEdges',
    value: function inEdges(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return _Array$from(this.inEdgesIter(optNbunch, optData));
    }

    /**
     * Return an iterator for (node, degree).
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph() // or MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter(0));
     * // [[0, 1]]
     * Array.from(G.degreeIter([0,1]));
     * // [[0, 1], [1, 2]]
     * ```
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #inDegreeIter
     * @see #outDegreeIter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {!Iterator}  The iterator returns two-tuples of (node, degree).
     */
  }, {
    key: 'degreeIter',
    value: function degreeIter(optNbunch, optWeight) {
      // istanbul ignore next

      var _this3 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs = (0, _internals.zipIterator)(this.succ.entries(), this.pred.entries());
      } else {
        var tuple2Succ = (0, _internals.createTupleFactory)(2);
        var tuple2Pred = (0, _internals.createTupleFactory)(2);
        nodesNbrs = (0, _internals.zipIterator)((0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
          return tuple2Succ(n, _this3.succ.get(n));
        }), (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
          return tuple2Pred(n, _this3.pred.get(n));
        }));
      }

      if (optWeight == null) {
        /*eslint no-unused-vars:0*/
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2);

          var _ref2$0 = _slicedToArray(_ref2[0], 2);

          var node = _ref2$0[0];
          var succ = _ref2$0[1];

          var _ref2$1 = _slicedToArray(_ref2[1], 2);

          var u = _ref2$1[0];
          var pred = _ref2$1[1];
          return [node, pred.size + succ.size];
        });
      } else {
        // edge weighted graph - degree is sum of edge weights
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref3) {
          var _ref32 = _slicedToArray(_ref3, 2);

          var _ref32$0 = _slicedToArray(_ref32[0], 2);

          var node = _ref32$0[0];
          var succ = _ref32$0[1];

          var _ref32$1 = _slicedToArray(_ref32[1], 2);

          var _ = _ref32$1[0];
          var pred = _ref32$1[1];

          var sum = 0;

          function sumData(data) {
            var weight = data[optWeight];
            sum += weight != null ? +weight : 1;
          }

          succ.forEach(sumData);
          pred.forEach(sumData);

          return [node, sum];
        });
      }
    }

    /**
     * Return an iterator for (node, in-degree).
     *
     * The node in-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.inDegreeIter(0));
     * // [[0, 0]]
     * Array.from(G.inDegreeIter([0,1]));
     * // [[0, 0], [1, ]]
     * ```
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #outDegreeIter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     *
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If null or undefined, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {Iterator}  The iterator returns two-tuples of (node, in-degree).
     */
  }, {
    key: 'inDegreeIter',
    value: function inDegreeIter(optNbunch, optWeight) {
      // istanbul ignore next

      var _this4 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs = this.pred;
      } else {
        nodesNbrs = (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
          return (0, _internals.tuple2)(n, _this4.pred.get(n));
        });
      }

      if (optWeight == null) {
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref4) {
          var _ref42 = _slicedToArray(_ref4, 2);

          var node = _ref42[0];
          var pred = _ref42[1];
          return [node, pred.size];
        });
      } else {
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref5) {
          var _ref52 = _slicedToArray(_ref5, 2);

          var node = _ref52[0];
          var pred = _ref52[1];

          var sum = 0;
          pred.forEach(function (data) {
            var weight = data[optWeight];
            sum += weight != null ? +weight : 1;
          });
          return [node, sum];
        });
      }
    }

    /**
     * Return an iterator for (node, out-degree).
     *
     * The node out-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.outDegreeIter(0));
     * // [[0, 1]]
     * Array.from(G.outDegreeIter([0,1]));
     * // [[0, 1], [1, ]]
     *
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #inDegreeIter
     *
     * @param {(Node|Iterable)=} opt_nbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {Iterator}  The iterator returns two-tuples of (node, out-degree).
     */
  }, {
    key: 'outDegreeIter',
    value: function outDegreeIter(optNbunch, optWeight) {
      // istanbul ignore next

      var _this5 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs = this.succ;
      } else {
        nodesNbrs = (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
          return (0, _internals.tuple2)(n, _this5.succ.get(n));
        });
      }

      if (optWeight == null) {
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref6) {
          var _ref62 = _slicedToArray(_ref6, 2);

          var node = _ref62[0];
          var succ = _ref62[1];
          return [node, succ.size];
        });
      } else {
        return (0, _internals.mapIterator)(nodesNbrs, function (_ref7) {
          var _ref72 = _slicedToArray(_ref7, 2);

          var node = _ref72[0];
          var succ = _ref72[1];

          var sum = 0;
          succ.forEach(function (data) {
            var weight = data[optWeight];
            sum += weight != null ? +weight : 1;
          });
          return [node, sum];
        });
      }
    }

    /**
     * Return the in-degree of a node or nodes.
     *
     * The node in-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph
     * G.addPath([0,1,2,3]);
     * G.inDegree(0);
     * // 0
     * G.inDegree([0,1]);
     * // Map {0: 0, 1: 1}
     * Array.from(G.inDegree([0,1]).values());
     * // [0, 1]
     * ```
     *
     * @see #degree
     * @see #outDegree
     * @see #inDegreeIter
     *
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} opt_weight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {(number|Map)}
     *       A dictionary with nodes as keys and in-degree as values or
     *       a number if a single node is specified.
     */
  }, {
    key: 'inDegree',
    value: function inDegree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return (0, _internals.next)(this.inDegreeIter(optNbunch, optWeight))[1];
      } else {
        return new _internalsMap2['default'](this.inDegreeIter(optNbunch, optWeight));
      }
    }

    /**
     * Return the out-degree of a node or nodes.
     *
     * The node out-degree is the number of edges pointing out of the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph
     * G.addPath([0,1,2,3]);
     * G.outDegree(0);
     * // 1
     * G.outDegree([0,1]);
     * // Map {0: 1, 1: 1}
     * Array.from(G.inDegree([0,1]).values());
     * // [1, 1]
     * ```
     *
     * @see #degree
     * @see #out_degree
     * @see #in_degree_iter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {(number|Map)}
     *       A dictionary with nodes as keys and in-degree as values or
     *       a number if a single node is specified.
     */
  }, {
    key: 'outDegree',
    value: function outDegree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return (0, _internals.next)(this.outDegreeIter(optNbunch, optWeight))[1];
      } else {
        return new _internalsMap2['default'](this.outDegreeIter(optNbunch, optWeight));
      }
    }

    /**
     * Remove all nodes and edges from the graph.
     *
     * This also removes the name, and all graph, node, and edge attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.clear();
     * G.nodes();
     * // []
     * G.edges();
     * // []
     * ```
     */
  }, {
    key: 'clear',
    value: function clear() {
      this.succ.clear();
      this.pred.clear();
      this.node.clear();
      (0, _internals.clear)(this.graph);
    }

    /**
     * Return True if graph is a multigraph, False otherwise.
     *
     * @return {boolean} True if graph is a multigraph, False otherwise.
     */
  }, {
    key: 'isMultigraph',
    value: function isMultigraph() {
      return false;
    }

    /**
     * Return True if graph is directed, False otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */
  }, {
    key: 'isDirected',
    value: function isDirected() {
      return true;
    }

    /**
     * Return a directed copy of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or MultiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1], [1,0]]
     * ```
     *
     * If already directed, return a (deep) copy
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1]]
     * ```
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.DiGraph(G)` which
     * returns a shallow copy of the data.
     *
     * @return {!DiGraph} A deepcopy of the graph
     */
  }, {
    key: 'toDirected',
    value: function toDirected() {
      return (0, _internals.deepcopy)(this);
    }

    /**
     * Return an undirected representation of the digraph.
     *
     * ### Notes
     *
     * If edges in both directions (u,v) and (v,u) exist in the
     * graph, attributes for the new undirected edge will be a combination of
     * the attributes of the directed edges.  The edge data is updated
     * in the (arbitrary) order that the edges are encountered.  For
     * more customized control of the edge attributes use `addEdge()`.
     *
     * This returns a "deepcopy" of the edge, node, and graph attributes which
     * attempts to completely copy all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.Graph(G)`
     * which returns a shallow copy of the data.
     *
     * @param {boolean=} optReciprocal
     *      If True only keep edges that appear in both directions
     *      in the original digraph.
     * @return {!Graph}
     *      An undirected graph with the same name and nodes and
     *      with edge (u,v,data) if either (u,v,data) or (v,u,data)
     *      is in the digraph.  If both edges exist in digraph and
     *      their edge data is different, only one edge is created
     *      with an arbitrary choice of which edge data to use.
     *      You must check and correct for this manually if desired.
     */
  }, {
    key: 'toUndirected',
    value: function toUndirected(optReciprocal) {
      var H = new _Graph3['default']();
      H.name = this.name;
      H.addNodesFrom(this);

      var thisPred = this.pred;

      if (optReciprocal) {
        H.addEdgesFrom(_regeneratorRuntime.mark(function callee$2$0() {
          var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, nodeData, node, predecessors, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, nbrData;

          return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                context$3$0.prev = 3;
                _iterator5 = _getIterator(this.adjacencyIter());

              case 5:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  context$3$0.next = 39;
                  break;
                }

                nodeData = _step5.value;
                node = nodeData[0];
                predecessors = thisPred.get(node);
                _iteratorNormalCompletion6 = true;
                _didIteratorError6 = false;
                _iteratorError6 = undefined;
                context$3$0.prev = 12;
                _iterator6 = _getIterator(nodeData[1]);

              case 14:
                if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                  context$3$0.next = 22;
                  break;
                }

                nbrData = _step6.value;

                if (!predecessors.has(nbrData[0])) {
                  context$3$0.next = 19;
                  break;
                }

                context$3$0.next = 19;
                return (0, _internals.tuple3)(node, nbrData[0], (0, _internals.deepcopy)(nbrData[1]));

              case 19:
                _iteratorNormalCompletion6 = true;
                context$3$0.next = 14;
                break;

              case 22:
                context$3$0.next = 28;
                break;

              case 24:
                context$3$0.prev = 24;
                context$3$0.t0 = context$3$0['catch'](12);
                _didIteratorError6 = true;
                _iteratorError6 = context$3$0.t0;

              case 28:
                context$3$0.prev = 28;
                context$3$0.prev = 29;

                if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                  _iterator6['return']();
                }

              case 31:
                context$3$0.prev = 31;

                if (!_didIteratorError6) {
                  context$3$0.next = 34;
                  break;
                }

                throw _iteratorError6;

              case 34:
                return context$3$0.finish(31);

              case 35:
                return context$3$0.finish(28);

              case 36:
                _iteratorNormalCompletion5 = true;
                context$3$0.next = 5;
                break;

              case 39:
                context$3$0.next = 45;
                break;

              case 41:
                context$3$0.prev = 41;
                context$3$0.t1 = context$3$0['catch'](3);
                _didIteratorError5 = true;
                _iteratorError5 = context$3$0.t1;

              case 45:
                context$3$0.prev = 45;
                context$3$0.prev = 46;

                if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                  _iterator5['return']();
                }

              case 48:
                context$3$0.prev = 48;

                if (!_didIteratorError5) {
                  context$3$0.next = 51;
                  break;
                }

                throw _iteratorError5;

              case 51:
                return context$3$0.finish(48);

              case 52:
                return context$3$0.finish(45);

              case 53:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this, [[3, 41, 45, 53], [12, 24, 28, 36], [29,, 31, 35], [46,, 48, 52]]);
        }).call(this));
      } else {
        H.addEdgesFrom(_regeneratorRuntime.mark(function callee$2$0() {
          var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, nodeData, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, nbrData;

          return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                _iteratorNormalCompletion7 = true;
                _didIteratorError7 = false;
                _iteratorError7 = undefined;
                context$3$0.prev = 3;
                _iterator7 = _getIterator(this.adjacencyIter());

              case 5:
                if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                  context$3$0.next = 36;
                  break;
                }

                nodeData = _step7.value;
                _iteratorNormalCompletion8 = true;
                _didIteratorError8 = false;
                _iteratorError8 = undefined;
                context$3$0.prev = 10;
                _iterator8 = _getIterator(nodeData[1]);

              case 12:
                if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                  context$3$0.next = 19;
                  break;
                }

                nbrData = _step8.value;
                context$3$0.next = 16;
                return (0, _internals.tuple3)(nodeData[0], nbrData[0], (0, _internals.deepcopy)(nbrData[1]));

              case 16:
                _iteratorNormalCompletion8 = true;
                context$3$0.next = 12;
                break;

              case 19:
                context$3$0.next = 25;
                break;

              case 21:
                context$3$0.prev = 21;
                context$3$0.t0 = context$3$0['catch'](10);
                _didIteratorError8 = true;
                _iteratorError8 = context$3$0.t0;

              case 25:
                context$3$0.prev = 25;
                context$3$0.prev = 26;

                if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                  _iterator8['return']();
                }

              case 28:
                context$3$0.prev = 28;

                if (!_didIteratorError8) {
                  context$3$0.next = 31;
                  break;
                }

                throw _iteratorError8;

              case 31:
                return context$3$0.finish(28);

              case 32:
                return context$3$0.finish(25);

              case 33:
                _iteratorNormalCompletion7 = true;
                context$3$0.next = 5;
                break;

              case 36:
                context$3$0.next = 42;
                break;

              case 38:
                context$3$0.prev = 38;
                context$3$0.t1 = context$3$0['catch'](3);
                _didIteratorError7 = true;
                _iteratorError7 = context$3$0.t1;

              case 42:
                context$3$0.prev = 42;
                context$3$0.prev = 43;

                if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                  _iterator7['return']();
                }

              case 45:
                context$3$0.prev = 45;

                if (!_didIteratorError7) {
                  context$3$0.next = 48;
                  break;
                }

                throw _iteratorError7;

              case 48:
                return context$3$0.finish(45);

              case 49:
                return context$3$0.finish(42);

              case 50:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this, [[3, 38, 42, 50], [10, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
        }).call(this));
      }

      H.graph = (0, _internals.deepcopy)(this.graph);
      H.node = (0, _internals.deepcopy)(this.node);
      return H;
    }

    /**
     * Return the reverse of the graph.
     *
     * The reverse is a graph with the same nodes and edges
     * but with the directions of the edges reversed.
     *
     * @param {boolean=} optCopy (default=True)
     *      If True, return a new DiGraph holding the reversed edges.
     *      If False, reverse the reverse graph is created using
     *      the original graph (this changes the original graph).
     *
     * @return {!DiGraph} A copy of the graph or the graph itself
     */
  }, {
    key: 'reverse',
    value: function reverse() {
      var optCopy = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var H;
      if (optCopy) {
        H = new this.constructor(null, { name: 'Reverse of (' + this.name + ')' });
        H.addNodesFrom(this);
        H.addEdgesFrom((0, _internals.mapIterator)(this.edgesIter(null, true), function (edge) {
          return (0, _internals.tuple3c)(edge[1], edge[0], (0, _internals.deepcopy)(edge[2]), edge);
        }));
        H.graph = (0, _internals.deepcopy)(this.graph);
        H.node = (0, _internals.deepcopy)(this.node);
      } else {
        var thisPred = this.pred;
        var thisSucc = this.succ;

        this.succ = thisPred;
        this.pred = thisSucc;
        this.adj = this.succ;
        H = this;
      }
      return H;
    }

    /**
     * Return the subgraph induced on nodes in `nbunch`.
     *
     * The induced subgraph of the graph contains the nodes in `nbunch`
     * and the edges between those nodes.
     *
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `new jsnx.Graph(G.subgraph(nbunch))`.
     *
     * For an inplace reduction of a graph to a subgraph you can remove nodes:
     *
     * ```
     * G.removeNodesFrom(G.nodes().filter(function(n) {
     *      return nbunch.indexOf(n) > -1;
     * }))
     * ```
     *
     * @param {Iterable} nbunch
     *      A container of nodes which will be iterated through once.
     * @return {DiGraph} A subgraph of the graph with the same edge
     *   attributes.
     */
  }, {
    key: 'subgraph',
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch);
      var n;
      // create new graph and copy subgraph into it
      var H = new this.constructor();
      // copy node and attribute dictionaries
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _getIterator(bunch), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          n = _step9.value;

          H.node.set(n, this.node.get(n));
        }
        // namespace shortcuts for speed
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      var HSucc = H.succ;
      var HPred = H.pred;

      // add nodes
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _getIterator(H), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          n = _step10.value;

          HSucc.set(n, new _internalsMap2['default']());
          HPred.set(n, new _internalsMap2['default']());
        }
        // add edges
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10['return']) {
            _iterator10['return']();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = _getIterator(HSucc), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var unbrs = _step11.value;

          var _unbrs = _slicedToArray(unbrs, 2);

          var u = _unbrs[0];
          var Hnbrs = _unbrs[1];
          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (var _iterator12 = _getIterator(this.succ.get(u)), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
              var vdataddict = _step12.value;

              var _vdataddict = _slicedToArray(vdataddict, 2);

              var v = _vdataddict[0];
              var datadict = _vdataddict[1];

              if (HSucc.has(v)) {
                // add both representations of edge: u-v and v-u
                Hnbrs.set(v, datadict);
                HPred.get(v).set(u, datadict);
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12['return']) {
                _iterator12['return']();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11['return']) {
            _iterator11['return']();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      H.graph = this.graph;
      return H;
    }
  }], [{
    key: '__name__',
    get: function get() {
      return 'DiGraph';
    }
  }]);

  return DiGraph;
})(_Graph3['default']);

exports['default'] = DiGraph;
module.exports = exports['default'];

},{"../_internals":20,"../_internals/Map":3,"../convert":69,"../exceptions/JSNetworkXError":73,"./Graph":61,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/assign":92,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],61:[function(require,module,exports){
'use strict';

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Symbol$iterator = require('babel-runtime/core-js/symbol/iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _exceptionsKeyError = require('../exceptions/KeyError');

var _exceptionsKeyError2 = _interopRequireDefault(_exceptionsKeyError);

var _internalsMap = require('../_internals/Map');

var _internalsMap2 = _interopRequireDefault(_internalsMap);

var _internalsSet = require('../_internals/Set');

var _internalsSet2 = _interopRequireDefault(_internalsSet);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _lodashLangIsBoolean = require('lodash/lang/isBoolean');

var _lodashLangIsBoolean2 = _interopRequireDefault(_lodashLangIsBoolean);

var _lodashLangIsString = require('lodash/lang/isString');

var _lodashLangIsString2 = _interopRequireDefault(_lodashLangIsString);

var _convert = require('../convert');

var convert = _interopRequireWildcard(_convert);

var _internals = require('../_internals');

/*jshint expr:false*/

/*
 * Base class for undirected graphs.
 *
 * A Graph stores nodes and edges with optional data, or attributes.
 *
 * Graphs hold undirected edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be strings, numbers or any object with a custom `toString` method.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = new jsnx.Graph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2, 3]);
 * G.addNodesFrom(new Set('foo', 'bar'));
 * var H = jsnx.completeGraph(10);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings, numbers and arrays, any object that implements a
 * custom `toString` method can be used as node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges,
 *
 * ```
 * G.addEdgesFrom(H.edges);
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. There are no errors when adding nodes or edges that already
 * exist.
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object (keys must be strings or numbers).
 * By default these are empty, but can added or changed using `addEdge`,
 * `addNode`.
 *
 * ```
 * var G = new jsnx.Graph(null, {day: 'Friday'});
 * G.graph
 * // {day: 'Friday'}
 * ```
 *
 * Add node attributes using `addNode()` or `addNodesFrom()`:
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([2, [3, {time: '3pm'}]], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [2, {time: '2pm'}], [3, {time: '3pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge()`, or `addEdgesFrom()`:
 *
 * ```
 * G.addEdge(1, w, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * ```
 *
 * @see DiGraph
 * @see MultiGraph
 * @see MultiDiGraph
 */

var Graph = (function () {

  /*
   * @param {Iterable} optData Data to initialize graph.  If `data` is not
   *    provided, an empty graph is created. The data can be an edge list, or
   *    any JSNetworkX graph object.
   * @param {Object=} optAttr (default=no attributes)
   *    Attributes to add to graph as key=value pairs.
   */

  function Graph(optData, optAttr) {
    _classCallCheck(this, Graph);

    // makes it possible to call Graph without new
    if (!(this instanceof Graph)) {
      return new Graph(optData, optAttr);
    }

    this.graph = {}; // dictionary for graph attributes
    this.node = new _internalsMap2['default'](); // empty node dict (created before convert)
    this.adj = new _internalsMap2['default'](); // empty adjacency dict

    // attempt to load graph with data
    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    }

    // load graph attributes (must be after convert)
    if (optAttr) {
      _Object$assign(this.graph, optAttr);
    }
    this.edge = this.adj;
  }

  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */

  _createClass(Graph, [{
    key: 'toString',

    /**
     * Return the graph name
     *
     * @return {string} Graph name.
     */
    value: function toString() {
      return this.name;
    }

    /**
     * Return a Map of neighbors of node n.
     *
     * @param {Node} n  A node in the graph.
     *
     * @return {!Map} The adjacency dictionary for nodes connected to n.
     */
  }, {
    key: 'get',
    value: function get(n) {
      var value = this.adj.get(n);
      if (typeof value === 'undefined') {
        throw new _exceptionsKeyError2['default']('Graph does not contain node ' + n + '.');
      }
      return value;
    }

    /**
     * Add a single node n and update node attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addNode(1);
     * G.addNode('Hello');
     * G.numberOfNodes();
     * 2
     * ```
     *
     * @see #addNodesFrom
     *
     * @param {Node} n Node
     * @param {Object=} opt_attr_dict Dictionary of node attributes.
     *      Key/value pairs will update existing data associated with the node.
     */
  }, {
    key: 'addNode',
    value: function addNode(n) {
      var optAttrDict = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The attr_dict argument must be an object.');
      }

      if (!this.node.has(n)) {
        this.adj.set(n, new _internalsMap2['default']());
        this.node.set(n, optAttrDict);
      } else {
        // update attr even if node already exists
        _Object$assign(this.node.get(n), optAttrDict);
      }
    }

    /**
     * Add multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph
     * G.addNodesFrom([1,2,3]);
     * G.nodes();
     * // [1,2,3]
     * ```
     *
     * Use the second argument to update specific node attributes for every node.
     *
     * ```
     * G.addNodesFrom([1,2], {size: 10});
     * G.addNodesFrom([2,3], {weight: 0.4});
     * ```
     *
     * Use `(node, object)` tuples to update attributes for specific nodes.
     *
     * ```
     * G.addNodesFrom([[1, {size: 11}], [2, {color: 'blue'}]]);
     * G.node.get(1).size
     * // 11
     * var H = new jsnx.Graph();
     * H.addNodesFrom(G.nodes(true));
     * H.node.get(1).size
     * // 11
     * ```
     *
     * @see #addNode
     *
     * @param {Iterable} nodes
     *      An iterable of nodes
     *      OR
     *      An iterable of (node, object) tuples.
     *
     * @param {Object=} optAttr  Update attributes for all nodes in nodes.
     *       Node attributes specified in nodes as a tuple
     *       take precedence over attributes specified generally.
     */
  }, {
    key: 'addNodesFrom',
    value: function addNodesFrom(nodes) {
      var optAttr = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      (0, _internals.forEach)(nodes, function (node) {
        if (Array.isArray(node) && node.length === 2 && (0, _internals.isPlainObject)(node[1])) {
          var _node = _slicedToArray(node, 2);

          var nn = _node[0];
          var ndict = _node[1];

          if (!this.adj.has(nn)) {
            this.adj.set(nn, new _internalsMap2['default']());
            var newdict = (0, _internals.clone)(optAttr);
            this.node.set(nn, _Object$assign(newdict, ndict));
          } else {
            var olddict = this.node.get(nn);
            _Object$assign(olddict, optAttr, ndict);
          }
          return; // continue next iteration
        }
        var newnode = !this.node.has(node);
        if (newnode) {
          this.adj.set(node, new _internalsMap2['default']());
          this.node.set(node, (0, _internals.clone)(optAttr));
        } else {
          _Object$assign(this.node.get(node), optAttr);
        }
      }, this);
    }

    /**
     * Remove node n.
     *
     * Removes the node n and all adjacent edges.
     * Attempting to remove a non-existent node will raise an exception.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.edges();
     * // [[0,1], [1,2]]
     * G.removeNode(1);
     * G.edges();
     * // []
     * ```
     *
     * @see #removeNodesFrom
     *
     * @param {Node} n  A node in the graph
     */
  }, {
    key: 'removeNode',
    value: function removeNode(n) {
      var adj = this.adj;

      if (this.node['delete'](n)) {
        adj.get(n).forEach(function (_, u) {
          return adj.get(u)['delete'](n);
        } // remove all edges n-u in graph
        );
        adj['delete'](n); // now remove node
      } else {
          throw new _exceptionsJSNetworkXError2['default']('The node %s is not in the graph', n);
        }
    }

    /**
     * Remove multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * var e = G.nodes(); // [0,1,2]
     * G.removeNodesFrom(e);
     * G.nodes();
     * // []
     * ```
     *
     * @see #removeNode
     *
     * @param {Iterable} nodes  A container of nodes.
     *      If a node in the container is not in the graph it is silently ignored.
     */
  }, {
    key: 'removeNodesFrom',
    value: function removeNodesFrom(nodes) {
      var adj = this.adj;
      var node = this.node;

      (0, _internals.forEach)(nodes, function (n) {
        if (node['delete'](n)) {
          adj.get(n).forEach(function (_, u) {
            return adj.get(u)['delete'](n);
          });
          adj['delete'](n);
        }
      });
    }

    /**
     * Return an iterator over the nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * var data = [];
     * Array.from(G.nodesIter(true)).map(([node, data]) => data);
     * // [{}, {}, {}]
     * ```
     *
     * ### Notes
     *
     * If the node is not required, it is simpler and equivalent to use `G`, e.g.
     * `Array.from(G)` or `for (var node of G)`.
     *
     * @param {boolean=} optData If false the iterator returns
     *   nodes. If true return a two-tuple of node and node data dictionary.
     *
     * @return {Iterator} of nodes If data=true the iterator gives
     *           two-tuples containing (node, node data, dictionary).
     */
  }, {
    key: 'nodesIter',
    value: function nodesIter() {
      var optData = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      if (optData) {
        return (0, _internals.toIterator)(this.node);
      }
      return this.node.keys();
    }

    /**
     * Return a list of the nodes in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.nodes();
     * // [0,1,2]
     * G.addNode(1, {time: '5pm'});
     * G.nodes(true);
     * // [[0,{}], [1,{time: '5pm'}], [2,{}]]
     * ```
     *
     * @param {boolean=} optData If false the iterator returns
     *   nodes. If true return a two-tuple of node and node data dictionary.
     *
     * @return {!Array} of nodes If data=true a list of two-tuples containing
     *           (node, node data object).
     */
  }, {
    key: 'nodes',
    value: function nodes() {
      var optData = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      return _Array$from(optData ? this.node.entries() : this.node.keys());
    }

    /**
     * Return the number of nodes in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.numberOfNodes();
     * // 3
     * ```
     *
     * @see #order
     *
     * @return {number} The number of nodes in the graph.
     */
  }, {
    key: 'numberOfNodes',
    value: function numberOfNodes() {
      return this.node.size;
    }

    /**
     * Return the number of nodes in the graph.
     *
     * @see #numberOfNodes
     *
     * @return {number} The number of nodes in the graph.
     */
  }, {
    key: 'order',
    value: function order() {
      return this.node.size;
    }

    /**
     * Return true if the graph contains the node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.hasNode(0);
     * // true
     * ```
     *
     * @param {Node} n node.
     * @return {boolean}
     */
  }, {
    key: 'hasNode',
    value: function hasNode(n) {
      return this.node.has(n);
    }

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are
     * not already in the graph.
     *
     * Edge attributes can be specified with keywords or by providing
     * a object with key/value pairs as third argument.
     *
     *
     * ### Examples
     *
     * The following all add the edge `(1,2)` to graph `G`:
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1,2);
     * G.addEdgesFrom([[1,2]]);
     * ```
     *
     * Associate data to edges using an object:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     *
     * ### Notes
     *
     * Adding an edge that already exists updates the edge data.
     *
     * Many algorithms designed for weighted graphs use as the edge weight a
     * numerical value assigned to an attribute which by default is 'weight'.
     *
     * @see #addEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Key/value pairs will update existing data associated with the edge.
     */
  }, {
    key: 'addEdge',
    value: function addEdge(u, v, optAttrDict) {
      if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The attr_dict argument must be an object.');
      }

      // add nodes
      if (!this.node.has(u)) {
        this.adj.set(u, new _internalsMap2['default']());
        this.node.set(u, {});
      }
      if (!this.node.has(v)) {
        this.adj.set(v, new _internalsMap2['default']());
        this.node.set(v, {});
      }

      // add the edge
      var datadict = this.adj.get(u).get(v) || {};
      _Object$assign(datadict, optAttrDict);
      this.adj.get(u).set(v, datadict);
      this.adj.get(v).set(u, datadict);
    }

    /**
     * Add all the edges in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdgesFrom([[0,1], [1,2]]); // using a list of edges
     * ```
     *
     * Associate data to edges
     *
     * ```
     * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
     * G.addEdgesFrom([[3,4], [1,4]], {label: 'WN2898'});
     * ```
     *
     * ### Notes
     *
     * Adding the same edge twice has no effect but any edge data
     * will be updated when each duplicate edge is added.
     *
     * @see #add_edge
     * @see #addWeightedEdgesFrom
     *
     * @param {Iterable} ebunch container of edges
     *      Each edge given in the container will be added to the
     *      graph. The edges must be given as as 2-tuples (u,v) or
     *      3-tuples (u,v,d) where d is a dictionary containing edge data.
     *
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Dictionary of edge attributes.  Key/value pairs will
     *      update existing data associated with each edge.
     */
  }, {
    key: 'addEdgesFrom',
    value: function addEdgesFrom(ebunch, optAttrDict) {
      if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The attr_dict argument must be an object.');
      }

      // process ebunch
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _getIterator(ebunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var tuple = _step.value;

          if (tuple.length == null) {
            throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('Edge tuple %j must be a 2-tuple or 3-tuple.', tuple));
          }

          var _tuple = _slicedToArray(tuple, 3);

          var u = _tuple[0];
          var v = _tuple[1];
          var data = _tuple[2];

          if (!(0, _internals.isPlainObject)(data)) {
            data = {};
          }
          if (u == null || v == null || tuple[3] != null) {
            throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('Edge tuple %j must be a 2-tuple or 3-tuple.', tuple));
          }

          if (!this.node.has(u)) {
            this.adj.set(u, new _internalsMap2['default']());
            this.node.set(u, {});
          }
          if (!this.node.has(v)) {
            this.adj.set(v, new _internalsMap2['default']());
            this.node.set(v, {});
          }

          // add the edge
          var datadict = this.adj.get(u).get(v) || {};
          _Object$assign(datadict, optAttrDict, data);
          this.adj.get(u).set(v, datadict);
          this.adj.get(v).set(u, datadict);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    /**
     * Add all the edges in `ebunch` as weighted edges with specified weights.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addWeightedEdgesFrom([[0,1,3.0], [1,2,7.5]]);
     * ```
     *
     * ### Note
     *
     * Adding the same edge twice for Graph/DiGraph simply updates
     * the edge data.  For MultiGraph/MultiDiGraph, duplicate edges
     * are stored.
     *
     * @see #addEdge
     * @see #addEdgesFrom
     *
     * @param {Iterable} ebunch  container of edges
     *      Each edge given in the list or container will be added
     *      to the graph. The edges must be given as 3-tuples (u,v,w)
     *      where w is a number.
     * @param {string=} optWeight (default 'weight')
     *      The attribute name for the edge weights to be added.
     * @param {Object=} optAttr Edge attributes to add/update for all edges.
     */
  }, {
    key: 'addWeightedEdgesFrom',
    value: function addWeightedEdgesFrom(ebunch, optWeight, optAttr) {
      optAttr = optAttr || {};
      if (!(0, _lodashLangIsString2['default'])(optWeight)) {
        optAttr = optWeight;
        optWeight = 'weight';
      }

      this.addEdgesFrom((0, _internals.mapSequence)(ebunch, function (e) {
        var attr = {};
        attr[optWeight] = e[2];
        if (attr[optWeight] == null) {
          // simulate too few value to unpack error
          throw new TypeError('Values must consist of three elements: %s.', e);
        }
        return [e[0], e[1], attr];
      }), optAttr);
    }

    /**
     * Remove the edge between u and v.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0,1);
     * ```
     *
     * @see #removeEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     */
  }, {
    key: 'removeEdge',
    value: function removeEdge(u, v) {
      var node = this.adj.get(u);
      if (node != null) {
        node['delete'](v);
        // self-loop needs only one entry removed
        var vnode = this.adj.get(v);
        if (vnode !== node) {
          vnode['delete'](u);
        }
      } else {
        throw new _exceptionsJSNetworkXError2['default']('The edge %s-%s is not in the graph', u, v);
      }
    }

    /**
     * Remove all edges specified in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var ebunch = [[1,2], [2,3]];
     * G.removeEdgesFrom(ebunch);
     * ```
     *
     * ### Notes
     *
     * Will fail silently if an edge in `ebunch` is not in the graph.
     *
     * @param {Iterable} ebunch Iterable of edge tuples
     *      Each edge given in the list or container will be removed
     *      from the graph. The edges can be:
     *        - 2-tuples (u,v) edge between u and v.
     *        - 3-tuples (u,v,k) where k is ignored.
     */
  }, {
    key: 'removeEdgesFrom',
    value: function removeEdgesFrom(ebunch) {
      var adj = this.adj;
      (0, _internals.forEach)(ebunch, function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2);

        var u = _ref2[0];
        var v = _ref2[1];

        var unode = adj.get(u);
        if (unode != null && unode.has(v)) {
          unode['delete'](v);
          var vnode = adj.get(v);
          if (vnode !== unode) {
            vnode['delete'](u);
          }
        }
      });
    }

    /**
     * Return True if the edge (u,v) is in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.hasEdge(0, 1);
     * // true
     * var edge = [0, 1];
     * G.hasEdge.apply(G, edge);
     * // true
     * ```
     *
     * @param {Node} u Node.
     * @param {Node} v Node.
     *
     * @return {boolean} True if edge is in the graph, False otherwise.
     */
  }, {
    key: 'hasEdge',
    value: function hasEdge(u, v) {
      var unode = this.adj.get(u);
      return unode && unode.has(v);
    }

    /**
     * Return a list of the nodes connected to the node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.neighbors(0);
     * // [1]
     * ```
     *
     * ### Notes
     *
     * It can be more convenient to access the adjacency map as `G.get(n)`:
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge('a', 'b', {weight: 7});
     * G.get('a');
     * // Map {'b': {weight: 7}}
     * ```
     *
     * @param {!Node} n A node in the graph.
     * @return {!Array} A list of nodes that are adjacent to n.
     */
  }, {
    key: 'neighbors',
    value: function neighbors(n) {
      return _Array$from(this.neighborsIter(n));
    }

    /**
     * Return an iterator over all neighbors of node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.neighborsIter(0));
     * // [1]
     * ```
     *
     * You could also iterate over the adjacency map instead:
     *
     * ```
     * Array.from(G.get(0).keys());
     * ```
     *
     * @param {!Node} n A node in the graph.
     * @return {!Iterator} A list of nodes that are adjacent to n.
     */
  }, {
    key: 'neighborsIter',
    value: function neighborsIter(n) {
      var node = this.adj.get(n);
      if (node != null) {
        return node.keys();
      } else {
        throw new _exceptionsJSNetworkXError2['default']('The node %s is not in the graph.', n);
      }
    }

    /**
     * Return a list of edges.
     *
     * Edges are returned as tuples with optional data
     * in the order (node, neighbor, data).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.addEdge(2, 3, {weight: 5});
     * G.edges();
     * // [[0,1], [1,2], [2,3]]
     * G.edges(true);
     * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
     * G.edges([0,3]);
     * // [[0,1], [3,2]]
     * G.edges(0);
     * // [[0,1]]
     * ```
     *
     * ### Note
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * @param {?(Node|Iterable)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData Return two tuples (u,v) (False)
     *      or three-tuples (u,v,data) (True).
     * @return {!Array} list of edge tuples
     *      Edges that are adjacent to any node in nbunch, or a list
     *      of all edges if nbunch is not specified.
     */
  }, {
    key: 'edges',
    value: function edges(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      return _Array$from(this.edgesIter(optNbunch, optData));
    }

    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data
     * in the order (node, neighbor, data).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.addEdge(2, 3, {weight: 5});
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgesIter(true));
     * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
     * Array.from(G.edgesIter([0,3]));
     * // [[0,1], [3,2]]
     * Array.from(G.edgesIter(0));
     * // [[0,1]]
     * ```
     *
     * ### Note
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * @param {?(Node|Iterable)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData Return two tuples (u,v) (False)
     *      or three-tuples (u,v,data) (True).
     * @return {!Iterator} iterater if `(u,v)` or `(u,v,d)` edge tuples
     */
  }, {
    key: 'edgesIter',
    value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var seen, nodesNbrs, adj, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nodeData, node, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, neighborsData;

      return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:

            // handle calls with data being the only argument
            if ((0, _lodashLangIsBoolean2['default'])(optNbunch)) {
              optData = optNbunch;
              optNbunch = null;
            }

            // helper dict to keep track of multiply stored edges
            seen = new _internalsSet2['default']();

            if (optNbunch == null) {
              nodesNbrs = this.adj.entries();
            } else {
              adj = this.adj;

              nodesNbrs = (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
                return (0, _internals.tuple2)(n, adj.get(n));
              });
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 6;
            _iterator2 = _getIterator(nodesNbrs);

          case 8:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 49;
              break;
            }

            nodeData = _step2.value;
            node = nodeData[0];
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 14;
            _iterator3 = _getIterator(nodeData[1].entries());

          case 16:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 30;
              break;
            }

            neighborsData = _step3.value;

            if (seen.has(neighborsData[0])) {
              context$2$0.next = 27;
              break;
            }

            if (!optData) {
              context$2$0.next = 25;
              break;
            }

            neighborsData.unshift(node);
            context$2$0.next = 23;
            return neighborsData;

          case 23:
            context$2$0.next = 27;
            break;

          case 25:
            context$2$0.next = 27;
            return [node, neighborsData[0]];

          case 27:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 16;
            break;

          case 30:
            context$2$0.next = 36;
            break;

          case 32:
            context$2$0.prev = 32;
            context$2$0.t0 = context$2$0['catch'](14);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t0;

          case 36:
            context$2$0.prev = 36;
            context$2$0.prev = 37;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 39:
            context$2$0.prev = 39;

            if (!_didIteratorError3) {
              context$2$0.next = 42;
              break;
            }

            throw _iteratorError3;

          case 42:
            return context$2$0.finish(39);

          case 43:
            return context$2$0.finish(36);

          case 44:
            seen.add(node);
            nodeData.length = 0;

          case 46:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 8;
            break;

          case 49:
            context$2$0.next = 55;
            break;

          case 51:
            context$2$0.prev = 51;
            context$2$0.t1 = context$2$0['catch'](6);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t1;

          case 55:
            context$2$0.prev = 55;
            context$2$0.prev = 56;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 58:
            context$2$0.prev = 58;

            if (!_didIteratorError2) {
              context$2$0.next = 61;
              break;
            }

            throw _iteratorError2;

          case 61:
            return context$2$0.finish(58);

          case 62:
            return context$2$0.finish(55);

          case 63:
          case 'end':
            return context$2$0.stop();
        }
      }, edgesIter, this, [[6, 51, 55, 63], [14, 32, 36, 44], [37,, 39, 43], [56,, 58, 62]]);
    })

    /**
     * Return the attribute object associated with edge (u,v).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.getEdgeData(0,1);
     * // {}
     * ```
     *
     * If the edge exists, it may be simpler to access `G.get(0).get(1)`.
     *
     * @param {Node} u Node.
     * @param {Node} v Node.
     * @param {*} optDefault
     *   Value to return if the edge (u,v) is not found.
     * @return {*} The edge attribute object.
     */
  }, {
    key: 'getEdgeData',
    value: function getEdgeData(u, v) {
      var optDefault = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

      var nbrs = this.adj.get(u);
      if (nbrs != null) {
        var data = nbrs.get(v);
        if (data != null) {
          return data;
        }
      }
      return optDefault;
    }

    /**
     * Return an adjacency list representation of the graph.
     *
     * The output adjacency list is in the order of G.nodes().
     * For directed graphs, only outgoing adjacencies are included.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.adjacencyList();
     * // [[1], [0,2], [1,3], [2]]
     * ```
     *
     * @return {!Array.<Array>} The adjacency structure of the graph as a
     *      list of lists.
     */
  }, {
    key: 'adjacencyList',
    value: function adjacencyList() {
      /*eslint no-unused-vars:0*/
      return _Array$from((0, _internals.mapIterator)(this.adjacencyIter(), function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var _ = _ref32[0];
        var adj = _ref32[1];
        return _Array$from(adj.keys());
      }));
    }

    /**
     * Return an iterator of (node, adjacency map) tuples for all nodes.
     *
     * For directed graphs, only outgoing adjacencies are included.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.adjacencyIter());
     * // [
     * //   [0, Map {1: {}}],
     * //   [1, Map {0: {}, 2: {}}],
     * //   [2, Map {1: {}, 3: {}}],
     * //   [3, Map {2: {}]]
     * // ]
     * ```
     *
     * @return {!Iterator} An array of (node, adjacency map) tuples
     *      for all nodes in the graph.
     */
  }, {
    key: 'adjacencyIter',
    value: function adjacencyIter() {
      return this.adj.entries();
    }

    /**
     * Return the degree of a node or nodes.
     *
     * The node degree is the number of edges adjacent to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * G.degree(0)
     * // 1
     * G.degree([0,1])
     * // Map {0: 1, 1: 2}
     * Array.from(G.degree([0,1]).values())
     * // [1, 2]
     * ```
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *      An iterable of nodes.  The iterable will be iterated
     *      through once.
     * @param {string=} optWeight
     *      The edge attribute that holds the numerical value used
     *      as a weight.  If null or not defined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     * @return {!(number|Map)} A dictionary with nodes as keys and
     *      degree as values or a number if a single node is specified.
     */
  }, {
    key: 'degree',
    value: function degree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return this.degreeIter(optNbunch, optWeight).next().value[1];
      } else {
        return new _internalsMap2['default'](this.degreeIter(optNbunch, optWeight));
      }
    }

    /**
     * Return an array for (node, degree).
     *
     * The node degree is the number of edges adjacent to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * Array.from(G.degreeIter(0));
     * // [[0, 1]]
     * Array.from(G.degreeIter([0,1]));
     * // [[0, 1], [1, 2]]
     * ```
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *       A container of nodes.  The container will be iterated
     *       through once.
     * @param {string=} optWeight
     *      The edge attribute that holds the numerical value used
     *      as a weight.  If null or not defined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     * @return {!Iterator} of two-tuples of (node, degree).
     *
     * @export
     */
  }, {
    key: 'degreeIter',
    value: function degreeIter(optNbunch, optWeight) {
      // istanbul ignore next

      var _this = this;

      var nodesNbrs;
      var iterator;

      if (optNbunch == null) {
        nodesNbrs = this.adj.entries();
      } else {
        (function () {
          var adj = _this.adj;
          nodesNbrs = (0, _internals.mapIterator)(_this.nbunchIter(optNbunch), function (n) {
            return (0, _internals.tuple2)(n, adj.get(n));
          });
        })();
      }

      if (!optWeight) {
        iterator = (0, _internals.mapIterator)(nodesNbrs, function (_ref4) {
          var _ref42 = _slicedToArray(_ref4, 2);

          var node = _ref42[0];
          var nbrs = _ref42[1];

          return [node, nbrs.size + +nbrs.has(node)];
        });
      } else {
        iterator = (0, _internals.mapIterator)(nodesNbrs, function (_ref5) {
          var _ref52 = _slicedToArray(_ref5, 2);

          var n = _ref52[0];
          var nbrs = _ref52[1];

          var sum = 0;

          nbrs.forEach(function (data) {
            var weight = data[optWeight];
            sum += +(weight != null ? weight : 1);
          });

          if (nbrs.has(n)) {
            var weight = nbrs.get(n)[optWeight];
            sum += +(weight != null ? weight : 1);
          }

          return [n, sum];
        });
      }

      return iterator;
    }

    /**
     * Remove all nodes and edges from the graph.
     *
     * This also removes the name, and all graph, node, and edge attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.clear();
     * G.nodes();
     * // []
     * G.edges();
     * // []
     * ```
     */
  }, {
    key: 'clear',
    value: function clear() {
      this.name = '';
      this.adj.clear();
      this.node.clear();
      (0, _internals.clear)(this.graph);
    }

    /**
     * Return a copy of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var H = G.copy();
     * ```
     *
     * ### Notes
     *
     * This makes a complete copy of the graph including all of the
     * node or edge attributes.
     *
     * @return {!Graph}
     */
  }, {
    key: 'copy',
    value: function copy() {
      return (0, _internals.deepcopy)(this);
    }

    /**
     * Return True if graph is a multigraph, False otherwise.
     *
     * @return {boolean} True if graph is a multigraph, False otherwise.
     */
  }, {
    key: 'isMultigraph',
    value: function isMultigraph() {
      return false;
    }

    /**
     * Return True if graph is directed, False otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */
  }, {
    key: 'isDirected',
    value: function isDirected() {
      return false;
    }

    /**
     * Return a directed representation of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or MultiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1], [1,0]]
     * ```
     *
     * If already directed, return a (deep) copy
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1]]
     * ```
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.DiGraph(G)` which
     * returns a shallow copy of the data.
     *
     * @return {!DiGraph}
     *   A directed graph with the same name, same nodes, and with
     *   each edge (u,v,data) replaced by two directed edges
     *   (u,v,data) and (v,u,data).
     */
  }, {
    key: 'toDirected',
    value: function toDirected() {
      var G = new (require('./DiGraph'))();
      G.name = this.name;
      G.addNodesFrom(this);
      G.addEdgesFrom(_regeneratorRuntime.mark(function callee$2$0() {
        var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, nd, u, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, nbr;

        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              context$3$0.prev = 3;
              _iterator4 = _getIterator(this.adjacencyIter());

            case 5:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                context$3$0.next = 37;
                break;
              }

              nd = _step4.value;
              u = nd[0];
              _iteratorNormalCompletion5 = true;
              _didIteratorError5 = false;
              _iteratorError5 = undefined;
              context$3$0.prev = 11;
              _iterator5 = _getIterator(nd[1]);

            case 13:
              if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                context$3$0.next = 20;
                break;
              }

              nbr = _step5.value;
              context$3$0.next = 17;
              return (0, _internals.tuple3)(u, nbr[0], (0, _internals.deepcopy)(nbr[1]));

            case 17:
              _iteratorNormalCompletion5 = true;
              context$3$0.next = 13;
              break;

            case 20:
              context$3$0.next = 26;
              break;

            case 22:
              context$3$0.prev = 22;
              context$3$0.t0 = context$3$0['catch'](11);
              _didIteratorError5 = true;
              _iteratorError5 = context$3$0.t0;

            case 26:
              context$3$0.prev = 26;
              context$3$0.prev = 27;

              if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                _iterator5['return']();
              }

            case 29:
              context$3$0.prev = 29;

              if (!_didIteratorError5) {
                context$3$0.next = 32;
                break;
              }

              throw _iteratorError5;

            case 32:
              return context$3$0.finish(29);

            case 33:
              return context$3$0.finish(26);

            case 34:
              _iteratorNormalCompletion4 = true;
              context$3$0.next = 5;
              break;

            case 37:
              context$3$0.next = 43;
              break;

            case 39:
              context$3$0.prev = 39;
              context$3$0.t1 = context$3$0['catch'](3);
              _didIteratorError4 = true;
              _iteratorError4 = context$3$0.t1;

            case 43:
              context$3$0.prev = 43;
              context$3$0.prev = 44;

              if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                _iterator4['return']();
              }

            case 46:
              context$3$0.prev = 46;

              if (!_didIteratorError4) {
                context$3$0.next = 49;
                break;
              }

              throw _iteratorError4;

            case 49:
              return context$3$0.finish(46);

            case 50:
              return context$3$0.finish(43);

            case 51:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this, [[3, 39, 43, 51], [11, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
      }).call(this));
      G.graph = (0, _internals.deepcopy)(this.graph);
      G.node = (0, _internals.deepcopy)(this.node);

      return G;
    }

    /**
     * Return an undirected copy of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or MultiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1], [1,0]]
     * var G2 = H.toUndirected();
     * G2.edges();
     * // [[0,1]]
     * ```
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.Graph(G);` which
     * returns a shallow copy of the data.
     *
     * @return {!Graph} A deepcopy of the graph.
     * @export
     */
  }, {
    key: 'toUndirected',
    value: function toUndirected() {
      return (0, _internals.deepcopy)(this);
    }

    /**
     * Return the subgraph induced on nodes in nbunch.
     *
     * The induced subgraph of the graph contains the nodes in nbunch
     * and the edges between those nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `new jsnx.Graph(G.subgraph(nbunch))`.
     *
     * For an inplace reduction of a graph to a subgraph you can remove nodes:
     *
     * ```
     * G.removeNodesFrom(G.nodes().filter(function(n) {
     *      return nbunch.indexOf(n) > -1;
     * }))
     * ```
     *
     * @param {Iterable} nbunch
     *      An iterable of nodes which will be iterated through once.
     * @return {Graph}
     */
  }, {
    key: 'subgraph',
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch);
      var n;

      // create new graph and copy subgraph into it
      var H = new this.constructor();
      // copy node and attribute dictionaries
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _getIterator(bunch), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          n = _step6.value;

          H.node.set(n, this.node.get(n));
        }
        // namespace shortcuts for speed
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      var HAdj = H.adj;
      var thisAdj = this.adj;

      // add nodes and edges (undirected method)
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _getIterator(H), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          n = _step7.value;

          var Hnbrs = new _internalsMap2['default']();
          HAdj.set(n, Hnbrs);

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = _getIterator(thisAdj.get(n)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var nbrdata = _step8.value;

              var nbr = nbrdata[0];
              var data = nbrdata[1];
              if (HAdj.has(nbr)) {
                // add both representations of edge: n-nbr and nbr-n
                Hnbrs.set(nbr, data);
                HAdj.get(nbr).set(n, data);
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                _iterator8['return']();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      H.graph = this.graph;

      return H;
    }

    /**
     * Return a list of nodes with self loops.
     *
     * A node with a self loop has an edge with both ends adjacent
     * to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1, 1)
     * G.addEdge(1, 2)
     * G.nodesWithSelfloops()
     * // [1]
     * ```
     *
     * @return {Array} A list of nodes with self loops.
     */
  }, {
    key: 'nodesWithSelfloops',
    value: function nodesWithSelfloops() {
      var nodes = [];
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _getIterator(this.adj.entries()), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var nd = _step9.value;

          if (nd[1].has(nd[0])) {
            nodes.push(nd[0]);
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      return nodes;
    }

    /**
     * Return a list of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1,1)
     * G.addEdge(1,2)
     * G.selfloopEdges()
     * // [(1, 1)]
     * G.selfloop_edges(true)
     * // [(1, 1, {})]
     * ```
     *
     * @param {boolean=} optData
     *      Return selfloop edges as two tuples (u,v) (data=False)
     *      or three-tuples (u,v,data) (data=True).
     *
     * @return {Array}  A list of all selfloop edges.
     */
  }, {
    key: 'selfloopEdges',
    value: function selfloopEdges() {
      var optData = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

      var edges = [];

      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (var _iterator10 = _getIterator(this.adj.entries()), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
          var nd = _step10.value;

          var _nd = _slicedToArray(nd, 2);

          var node = _nd[0];
          var nbrs = _nd[1];

          if (nbrs.has(node)) {
            if (optData) {
              edges.push((0, _internals.tuple3c)(node, node, nbrs.get(node), nd));
            } else {
              edges.push((0, _internals.tuple2c)(node, node, nd));
            }
          }
        }
      } catch (err) {
        _didIteratorError10 = true;
        _iteratorError10 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion10 && _iterator10['return']) {
            _iterator10['return']();
          }
        } finally {
          if (_didIteratorError10) {
            throw _iteratorError10;
          }
        }
      }

      return edges;
    }

    /**
     * Return the number of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.add_edge(1,1)
     * G.add_edge(1,2)
     * G.number_of_selfloops()
     * // 1
     * ```
     *
     * @return {number} The number of selfloops.
     */
  }, {
    key: 'numberOfSelfloops',
    value: function numberOfSelfloops() {
      return this.selfloopEdges().length;
    }

    /**
     * Return the number of edges.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * G.size()
     * // 3
     *
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge('a',' b', {weight: 2});
     * G.addEdge('b', 'c', {weight: 4});
     * G.size()
     * // 2
     * G.size('weight');
     * // 6.0
     * ```
     *
     * @param {string=} optWeight The edge attribute that holds the numerical
     *      value used as a weight.  If not defined, then each edge has weight 1.
     * @return {number} The number of edges or sum of edge weights in the graph.
     */
  }, {
    key: 'size',
    value: function size(optWeight) {
      var s = 0;
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (var _iterator11 = _getIterator(this.degree(null, optWeight).values()), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
          var v = _step11.value;

          s += v;
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11['return']) {
            _iterator11['return']();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      s = s / 2;

      if (optWeight == null) {
        return Math.floor(s); // int(s)
      } else {
          return s; // no need to cast to float
        }
    }

    /**
     * Return the number of edges between two nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.numberOfEdges();
     * // 3
     * G.number_of_edges(0,1);
     * // 1
     * ```
     *
     * @param {!Node=} u node.
     * @param {!Node=} v node
     *       If u and v are both specified, return the number of edges between
     *       u and v. Otherwise return the total number of all edges.
     * @return {number} The number of edges in the graph.
     *      If nodes u and v are specified return the number of edges between
     *      those nodes.
     */
  }, {
    key: 'numberOfEdges',
    value: function numberOfEdges(u, v) {
      if (u == null) {
        return Math.floor(this.size());
      }
      if (this.adj.get(u).has(v)) {
        return 1;
      } else {
        return 0;
      }
    }

    /**
     * Add a star.
     *
     * ### Examples
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addStar([0,1,2,3]);
     * G.addStar([10,11,12], {weight: 2});
     * ```
     *
     * The first node in nodes is the middle of the star.  It is connected
     * to all other nodes.
     *
     * @param {Iterable} nodes A container of nodes.
     * @param {Object=} optAttr  Attributes to add to every edge in the star.
     */
  }, {
    key: 'addStar',
    value: function addStar(nodes, optAttr) {
      var niter = (0, _internals.toIterator)(nodes);
      var v = niter.next().value;
      var edges = (0, _internals.mapIterator)(niter, function (n) {
        return (0, _internals.tuple2)(v, n);
      });
      this.addEdgesFrom(edges, optAttr);
    }

    /**
     * Add a path.
     *
     * ### Examples
     *
     * ```
     * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.addPath([10,11,12], {weight: 7});
     * ```
     *
     * @param {Iterable} nodes A container of nodes.
     *      A path will be constructed from the nodes (in order)
     *      and added to the graph.
     * @param {Object=} optAttr Attributes to add to every edge in path.
     */
  }, {
    key: 'addPath',
    value: function addPath(nodes, optAttr) {
      var nlist = _Array$from(nodes);
      var edges = (0, _internals.zipSequence)(nlist.slice(0, nlist.length - 1), nlist.slice(1));
      this.addEdgesFrom(edges, optAttr);
    }

    /**
     * Add a cycle.
     *
     * ### Examples
     *
     * ```
     * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addCycle([0,1,2,3]);
     * G.addCycle([10,11,12], {weight: 7});
     * ```
     *
     * @param {Iterable} nodes A container of nodes.
     *      A cycle will be constructed from the nodes (in order)
     *      and added to the graph.
     * @param {Object=} optAttr  Attributes to add to every edge in cycle.
     */
  }, {
    key: 'addCycle',
    value: function addCycle(nodes, optAttr) {
      var nlist = _Array$from(nodes);
      var edges = (0, _internals.zipSequence)(nlist, nlist.slice(1).concat([nlist[0]]));
      this.addEdgesFrom(edges, optAttr);
    }

    /**
     * Return an iterator of nodes contained in `nbunch` that are
     * also in the graph.
     *
     * The nodes in `nbunch` are checked for membership in the graph
     * and if not are silently ignored.
     *
     * ### Notes
     *
     * When `nbunch` is an iterator, the returned iterator yields values
     * directly from `nbunch`, becoming exhausted when `nbunch` is exhausted.
     *
     * To test whether `nbunch` is a single node, one can use
     * `if (this.hasNode(nbunch))`, even after processing with this routine.
     *
     * If `nbunch` is not a node or a (possibly empty) sequence/iterator
     * or not defined, an Error is raised.
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *      A container of nodes.  The container will be iterated
     *      through once.
     * @return {!Iterator} An iterator over nodes in nbunch
     *      that are also in the graph.
     *      If nbunch is null or not defined, iterate over all nodes in the graph.
     */
  }, {
    key: 'nbunchIter',
    value: _regeneratorRuntime.mark(function nbunchIter(optNbunch) {
      var adj, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, n;

      return _regeneratorRuntime.wrap(function nbunchIter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (!(optNbunch == null)) {
              context$2$0.next = 4;
              break;
            }

            return context$2$0.delegateYield(this.adj.keys(), 't0', 2);

          case 2:
            context$2$0.next = 44;
            break;

          case 4:
            if (!this.hasNode(optNbunch)) {
              context$2$0.next = 9;
              break;
            }

            context$2$0.next = 7;
            return optNbunch;

          case 7:
            context$2$0.next = 44;
            break;

          case 9:
            adj = this.adj;
            context$2$0.prev = 10;
            _iteratorNormalCompletion12 = true;
            _didIteratorError12 = false;
            _iteratorError12 = undefined;
            context$2$0.prev = 14;
            _iterator12 = _getIterator((0, _internals.toIterator)(optNbunch));

          case 16:
            if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
              context$2$0.next = 24;
              break;
            }

            n = _step12.value;

            if (!adj.has(n)) {
              context$2$0.next = 21;
              break;
            }

            context$2$0.next = 21;
            return n;

          case 21:
            _iteratorNormalCompletion12 = true;
            context$2$0.next = 16;
            break;

          case 24:
            context$2$0.next = 30;
            break;

          case 26:
            context$2$0.prev = 26;
            context$2$0.t1 = context$2$0['catch'](14);
            _didIteratorError12 = true;
            _iteratorError12 = context$2$0.t1;

          case 30:
            context$2$0.prev = 30;
            context$2$0.prev = 31;

            if (!_iteratorNormalCompletion12 && _iterator12['return']) {
              _iterator12['return']();
            }

          case 33:
            context$2$0.prev = 33;

            if (!_didIteratorError12) {
              context$2$0.next = 36;
              break;
            }

            throw _iteratorError12;

          case 36:
            return context$2$0.finish(33);

          case 37:
            return context$2$0.finish(30);

          case 38:
            context$2$0.next = 44;
            break;

          case 40:
            context$2$0.prev = 40;
            context$2$0.t2 = context$2$0['catch'](10);

            if (!(context$2$0.t2 instanceof TypeError)) {
              context$2$0.next = 44;
              break;
            }

            throw new _exceptionsJSNetworkXError2['default']('nbunch is not a node or a sequence of nodes');

          case 44:
          case 'end':
            return context$2$0.stop();
        }
      }, nbunchIter, this, [[10, 40], [14, 26, 30, 38], [31,, 33, 37]]);
    })

    /**
     * A graph is an iterable over its nodes.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addNodesFrom([0,1,2,3]);
     * for (var node of G) {
     *   console.log(node);
     * }
     * ```
     *
     * @return {Iterator}
     */
  }, {
    key: _Symbol$iterator,
    value: function value() {
      return this.node.keys();
    }
  }, {
    key: 'name',

    /**
     * Gets or sets the name of the graph.
     *
     * @param {string=} opt_name Graph name.
     * @return {(string|undefined)} Graph name if no parameter was passed.
     */
    get: function get() {
      return this.graph.name || '';
    },
    set: function set(name) {
      this.graph.name = name;
    }
  }], [{
    key: '__name__',
    get: function get() {
      return 'Graph';
    }
  }]);

  return Graph;
})();

exports['default'] = Graph;
module.exports = exports['default'];
// include all nodes
/*jshint expr:true*/
// if nbunch is a single node
// if nbunch is a sequence of nodes

},{"../_internals":20,"../_internals/Map":3,"../_internals/Set":5,"../convert":69,"../exceptions/JSNetworkXError":73,"../exceptions/KeyError":77,"./DiGraph":60,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/assign":92,"babel-runtime/core-js/symbol/iterator":101,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112,"lodash/lang/isBoolean":259,"lodash/lang/isString":264}],62:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Object$getOwnPropertyNames = require('babel-runtime/core-js/object/get-own-property-names')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
var marked0$0 = [yieldEdges, yieldDegree].map(_regeneratorRuntime.mark);

var _DiGraph2 = require('./DiGraph');

var _DiGraph3 = _interopRequireDefault(_DiGraph2);

var _MultiGraph = require('./MultiGraph');

var _MultiGraph2 = _interopRequireDefault(_MultiGraph);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _internals = require('../_internals');

/**
 * A directed graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes. Each edge can hold optional
 * data or attributes.
 *
 * A MultiDiGraph holds directed edges. Self loops are allowed. Edges are
 * respresented as links between nodes with optional key/value attributes.
 *
 * ### Example
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges:
 *
 * ```
 * var G = new jsnx.MultiDiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2,3]);
 * var H = new jsnx.Graph();
 * H.addPath([0,1,2,3,4,5]);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can represent a node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges. Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges
 *
 * ```
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an additional edge is created and
 * stored using a key to identify the edge. By default the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route:282}], [4,5,{route:37}]]);
 * G.get(4);
 * // Map {5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object. By default these are empty, but can be added or changed
 * using `addEdge` or `addNode`.
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge` and `addEdgesFrom`:
 *
 * ```
 * G.addEdge(1, 2, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * G.addEdgesFrom([[1,2,{color: 'blue'}], [2,3,{weight: 8}]]);
 * ```
 */

var MultiDiGraph = (function (_DiGraph) {
  _inherits(MultiDiGraph, _DiGraph);

  /**
   * @param {(Object|Array|Graph)} optData Data to initialize graph.
   *   If no data is passed, an empty graph is created. The data can be an edge
   *   list, or any JSNetworkX graph object.
   * @param {Object=} opt_attr (default= no attributes)
   *       Attributes to add to graph as key=value pairs.
   */

  function MultiDiGraph(optData, optAttr) {
    _classCallCheck(this, MultiDiGraph);

    _get(Object.getPrototypeOf(MultiDiGraph.prototype), 'constructor', this).call(this, optData, optAttr);
  }

  // Simulate multiple inheritance by merging prototypes

  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */

  _createClass(MultiDiGraph, [{
    key: 'addEdge',

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are not already in
     * the graph.
     *
     * Edge attributes can be specified by providing an object with key/value
     * pairs.
     *
     * ### Note
     *
     * To replace/update edge data, use the optional key argument to identify a
     * unique edge. Otherwise a new edge will be created.
     *
     * ### Example
     *
     * The following add the edge e=(1,2) to graph G:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdge(1, 2);
     * G.addEdgesFrom([[1,2]]);
     * ```
     *
     * Associate data to edges using keywords:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     * @param {Node} u
     * @param {Node} v
     * @param {(string|number)} optKey (default=lowest unused integer) Used to
     *   distinguish multiedges between a pair of nodes.
     * @param {Object} opAttrDict Object of edge attributes. Key/value pairs will
     *   update existing data associated with the edge.
     */
    value: function addEdge(u, v, optKey, optAttrDict) {
      if (optKey && typeof optKey === 'object') {
        optAttrDict = optKey;
        optKey = null;
      }

      if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The optAttrDict argument must be a plain object.');
      }

      // add nodes
      var keydict;
      if (!this.succ.has(u)) {
        this.succ.set(u, new _internals.Map());
        this.pred.set(u, new _internals.Map());
        this.node.set(u, {});
      }
      if (!this.succ.has(v)) {
        this.succ.set(v, new _internals.Map());
        this.pred.set(v, new _internals.Map());
        this.node.set(v, {});
      }
      if (this.succ.get(u).has(v)) {
        keydict = this.get(u).get(v);
        if (optKey == null) {
          // find unique integer key
          optKey = _Object$keys(keydict).length;
          while (keydict[optKey]) {
            optKey += 1;
          }
        }
        keydict[optKey] = _Object$assign((0, _internals.getDefault)(keydict[optKey], {}), optAttrDict);
      } else {
        // selfloops work this way without special treatment
        if (optKey == null) {
          optKey = 0;
        }
        keydict = _defineProperty({}, optKey, _Object$assign({}, optAttrDict));
        this.succ.get(u).set(v, keydict);
        this.pred.get(v).set(u, keydict);
      }
    }

    /**
     * Remove an edge between u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0, 1);
     * ```
     *
     * For multiple edges:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdge(1, 2); // remove a single (arbitrary) edge
     * ```
     *
     * For edges with keys:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdge(1, 2, 'first');
     * G.addEdge(1, 2, 'second');
     * G.removeEdge(1, 2, 'second');
     * ```
     * @param {Node} u
     * @param {Node} v
     * @param {(string|number)} optKey Used to distinguish multiple edges between
     *   a pair of nodes. If undefined, remove a single (arbitrary) edge between
     *   u and v.
     */
  }, {
    key: 'removeEdge',
    value: function removeEdge(u, v, optKey) {
      var keydict;
      var neightborsOfU = this.adj.get(u);
      if (neightborsOfU) {
        keydict = neightborsOfU.get(v);
      }
      if (keydict == null) {
        throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The edge %j-%j is not in the graph', u, v));
      }

      // remove the edge with specified data
      if (optKey == null) {
        for (var key in keydict) {
          delete keydict[key];
          break;
        }
      } else {
        if (!keydict[optKey]) {
          throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The edge %j-%j with key %j is not in the graph', u, v, optKey));
        }
        delete keydict[optKey];
      }
      if (_Object$keys(keydict).length === 0) {
        // remove the key entries if last edge
        this.succ.get(u)['delete'](v);
        this.pred.get(v)['delete'](u);
      }
    }

    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * ### Note
     *
     * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgesIter(true));
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * Array.from(G.edgesIter([0,2]));
     * // [[0,1], [2,3]]
     * ```
     *
     * @alias outEdgesIter
     *
     * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
     */
  }, {
    key: 'edgesIter',
    value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var optKeys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var nodesNbrs;
      return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
        // istanbul ignore next

        var _this = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (typeof optNbunch === 'boolean') {
              optKeys = optData;
              optData = optNbunch;
              optNbunch = null;
            }

            nodesNbrs = optNbunch == null ? this.adj : (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return (0, _internals.tuple2)(n, _this.adj.get(n));
            });
            return context$2$0.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, 'out'), 't0', 3);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, edgesIter, this);
    })

    /**
     * @alias edgesIter
     */
  }, {
    key: 'outEdgesIter',
    value: function outEdgesIter(optNbunch, optData, optKeys) {
      return this.edgesIter(optNbunch, optData, optKeys);
    }

    /**
     * Return a list of the outgoing edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * ### Note
     *
     * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs `edges()` is the same as `outEdges()`.
     *
     * @see inEdges
     *
     * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
     *   edges
     */
  }, {
    key: 'outEdges',
    value: function outEdges(optNbunch, optData, optKeys) {
      return _Array$from(this.outEdgesIter(optNbunch, optData, optKeys));
    }

    /**
     * Return an iterator over the incoming edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * @see edgesIter
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean=} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean=} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
     */
  }, {
    key: 'inEdgesIter',
    value: _regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var optKeys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
      var nodesNbrs;
      return _regeneratorRuntime.wrap(function inEdgesIter$(context$2$0) {
        // istanbul ignore next

        var _this2 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (typeof optNbunch === 'boolean') {
              optKeys = optData;
              optData = optNbunch;
              optNbunch = null;
            }

            nodesNbrs = optNbunch == null ? this.pred : (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return (0, _internals.tuple2)(n, _this2.pred.get(n));
            });
            return context$2$0.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, 'in'), 't0', 3);

          case 3:
          case 'end':
            return context$2$0.stop();
        }
      }, inEdgesIter, this);
    })

    /**
     * Return a list of the incoming edges.
     *
     * @see outEdges
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean=} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean=} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
     *   edges
     */
  }, {
    key: 'inEdges',
    value: function inEdges(optNbunch, optData, optKeys) {
      return _Array$from(this.inEdgesIter(optNbunch, optData, optKeys));
    }

    /**
     * Return an iterator for `(node, degree)`.
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */
  }, {
    key: 'degreeIter',
    value: _regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
      var tuple2Succ, tuple2Pred, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, _step$value$0, n, succ, _step$value$1, _, pred, keydict, inDegree, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, outDegree, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _step4$value$0, _step4$value$1;

      return _regeneratorRuntime.wrap(function degreeIter$(context$2$0) {
        // istanbul ignore next

        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            tuple2Succ = (0, _internals.createTupleFactory)(2);
            tuple2Pred = (0, _internals.createTupleFactory)(2);
            nodesNbrs = optNbunch == null ? (0, _internals.zipIterator)(this.succ.entries(), this.pred.entries()) : (0, _internals.zipIterator)((0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return tuple2Succ(n, _this3.succ.get(n));
            }), (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return tuple2Pred(n, _this3.pred.get(n));
            }));

            if (!(optWeight == null)) {
              context$2$0.next = 78;
              break;
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 7;
            _iterator = _getIterator(nodesNbrs);

          case 9:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 62;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2);
            _step$value$0 = _slicedToArray(_step$value[0], 2);
            n = _step$value$0[0];
            succ = _step$value$0[1];
            _step$value$1 = _slicedToArray(_step$value[1], 2);
            _ = _step$value$1[0];
            pred = _step$value$1[1];
            inDegree = 0;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 21;

            for (_iterator2 = _getIterator(pred.values()); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              keydict = _step2.value;

              inDegree += _Object$keys(keydict).length;
            }
            context$2$0.next = 29;
            break;

          case 25:
            context$2$0.prev = 25;
            context$2$0.t0 = context$2$0['catch'](21);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t0;

          case 29:
            context$2$0.prev = 29;
            context$2$0.prev = 30;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 32:
            context$2$0.prev = 32;

            if (!_didIteratorError2) {
              context$2$0.next = 35;
              break;
            }

            throw _iteratorError2;

          case 35:
            return context$2$0.finish(32);

          case 36:
            return context$2$0.finish(29);

          case 37:
            outDegree = 0;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 41;

            for (_iterator3 = _getIterator(succ.values()); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              keydict = _step3.value;

              inDegree += _Object$keys(keydict).length;
            }
            context$2$0.next = 49;
            break;

          case 45:
            context$2$0.prev = 45;
            context$2$0.t1 = context$2$0['catch'](41);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t1;

          case 49:
            context$2$0.prev = 49;
            context$2$0.prev = 50;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 52:
            context$2$0.prev = 52;

            if (!_didIteratorError3) {
              context$2$0.next = 55;
              break;
            }

            throw _iteratorError3;

          case 55:
            return context$2$0.finish(52);

          case 56:
            return context$2$0.finish(49);

          case 57:
            context$2$0.next = 59;
            return [n, inDegree + outDegree];

          case 59:
            _iteratorNormalCompletion = true;
            context$2$0.next = 9;
            break;

          case 62:
            context$2$0.next = 68;
            break;

          case 64:
            context$2$0.prev = 64;
            context$2$0.t2 = context$2$0['catch'](7);
            _didIteratorError = true;
            _iteratorError = context$2$0.t2;

          case 68:
            context$2$0.prev = 68;
            context$2$0.prev = 69;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 71:
            context$2$0.prev = 71;

            if (!_didIteratorError) {
              context$2$0.next = 74;
              break;
            }

            throw _iteratorError;

          case 74:
            return context$2$0.finish(71);

          case 75:
            return context$2$0.finish(68);

          case 76:
            context$2$0.next = 110;
            break;

          case 78:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            context$2$0.prev = 81;
            _iterator4 = _getIterator(nodesNbrs);

          case 83:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              context$2$0.next = 96;
              break;
            }

            _step4$value = _slicedToArray(_step4.value, 2);
            _step4$value$0 = _slicedToArray(_step4$value[0], 2);
            n = _step4$value$0[0];
            succ = _step4$value$0[1];
            _step4$value$1 = _slicedToArray(_step4$value[1], 2);
            _ = _step4$value$1[0];
            pred = _step4$value$1[1];
            context$2$0.next = 93;
            return [n, sumEdgeAttribute(pred, optWeight, 1) + sumEdgeAttribute(succ, optWeight, 1)];

          case 93:
            _iteratorNormalCompletion4 = true;
            context$2$0.next = 83;
            break;

          case 96:
            context$2$0.next = 102;
            break;

          case 98:
            context$2$0.prev = 98;
            context$2$0.t3 = context$2$0['catch'](81);
            _didIteratorError4 = true;
            _iteratorError4 = context$2$0.t3;

          case 102:
            context$2$0.prev = 102;
            context$2$0.prev = 103;

            if (!_iteratorNormalCompletion4 && _iterator4['return']) {
              _iterator4['return']();
            }

          case 105:
            context$2$0.prev = 105;

            if (!_didIteratorError4) {
              context$2$0.next = 108;
              break;
            }

            throw _iteratorError4;

          case 108:
            return context$2$0.finish(105);

          case 109:
            return context$2$0.finish(102);

          case 110:
          case 'end':
            return context$2$0.stop();
        }
      }, degreeIter, this, [[7, 64, 68, 76], [21, 25, 29, 37], [30,, 32, 36], [41, 45, 49, 57], [50,, 52, 56], [69,, 71, 75], [81, 98, 102, 110], [103,, 105, 109]]);
    })

    /**
     * Return an iterator for `(node, in-degree)`.
     *
     * The node in-degree is the number of edges pointing to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,0], [1,1]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */
  }, {
    key: 'inDegreeIter',
    value: _regeneratorRuntime.mark(function inDegreeIter(optNbunch, optWeight) {
      return _regeneratorRuntime.wrap(function inDegreeIter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.delegateYield(yieldDegree(this, this.pred, optNbunch, optWeight), 't0', 1);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, inDegreeIter, this);
    })

    /**
     * Return an iterator for `(node, out-degree)`.
     *
     * The node out-degree is the number of edges pointing out of the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,1]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */
  }, {
    key: 'outDegreeIter',
    value: _regeneratorRuntime.mark(function outDegreeIter(optNbunch, optWeight) {
      return _regeneratorRuntime.wrap(function outDegreeIter$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            return context$2$0.delegateYield(yieldDegree(this, this.succ, optNbunch, optWeight), 't0', 1);

          case 1:
          case 'end':
            return context$2$0.stop();
        }
      }, outDegreeIter, this);
    })

    /**
     * Return True if graph is a multigraph, False otherwise.
     *
     * @return {boolean} True if graph is a multigraph, False otherwise.
     */
  }, {
    key: 'isMultigraph',
    value: function isMultigraph() {
      return true;
    }

    /**
     * Return True if graph is directed, False otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */
  }, {
    key: 'isDirected',
    value: function isDirected() {
      return true;
    }

    /**
     * Return a directed copy of the graph.
     *
     * ### Notes
     *
     * This returns a deep copy of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var G = new MultiDiGraph(D);`, which
     * returns a shallow copy of the data.
     *
     * @return {MultiDiGraph} A deep copy of the graph.
     */
  }, {
    key: 'toDirected',
    value: function toDirected() {
      return (0, _internals.deepcopy)(this);
    }

    /**
     * Return an undirected representation of the digraph.
     *
     * ### Notes
     *
     * The result is an undirected graph with the same name, nodes and
     * with edge `(u,v,data)` if either `(u,v,data)` or `(v,u,data)`
     * is in the digraph.  If both edges exist in digraph and
     * their edge data is different, only one edge is created
     * with an arbitrary choice of which edge data to use.
     * You must check and correct for this manually if desired.
     *
     * This returns a deep copy of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var G = new MultiGraph(D);`, which
     * returns a shallow copy of the data.
     *
     * @param {boolean=} optReciprocal If true, only keep edges that appear in
     *   both directions in the original digraph.
     * @return {MultiGraph}
     */
  }, {
    key: 'toUndirected',
    value: function toUndirected(optReciprocal) {
      var H = new _MultiGraph2['default']();
      H.name = this.name;
      H.addNodesFrom(this);
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = _getIterator(this.adjacencyIter()), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _step5$value = _slicedToArray(_step5.value, 2);

          var u = _step5$value[0];
          var nbrs = _step5$value[1];
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = _getIterator(nbrs), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _step6$value = _slicedToArray(_step6.value, 2);

              var v = _step6$value[0];
              var keydict = _step6$value[1];

              for (var key in keydict) {
                if (!optReciprocal || this.hasEdge(v, u, key)) {
                  H.addEdge(u, v, key, (0, _internals.deepcopy)(keydict[key]));
                }
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                _iterator6['return']();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5['return']) {
            _iterator5['return']();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      H.graph = (0, _internals.deepcopy)(this.graph);
      H.node = (0, _internals.deepcopy)(this.node);
      return H;
    }

    /**
     * Return the subgraph induced on nodes in `nbunch`.
     *
     * The induced subgraph of the graph contains the nodes in `optNbunch` and the
     * edges between those nodes.
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `jsnx.MultiDiGraph(G.subgraph(nbunch))`.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {Iterable} nBunch A container of nodes which will be iterated
     *   through once.
     * @return {MultiDiGraph}
     */
  }, {
    key: 'subgraph',
    value: function subgraph(nBunch) {
      var bunch = this.nbunchIter(nBunch);
      // create new graph and copy subgraph into it
      var H = new this.constructor();
      // copy node and attribute dictionaries
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _getIterator(bunch), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var n = _step7.value;

          H.node.set(n, this.node.get(n));
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var HSucc = H.succ;
      var HPred = H.pred;
      var thisSucc = this.succ;

      // add nodes
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (var _iterator8 = _getIterator(H), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
          var n = _step8.value;

          HSucc.set(n, new _internals.Map());
          HPred.set(n, new _internals.Map());
        }
        // add edges
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8['return']) {
            _iterator8['return']();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (var _iterator9 = _getIterator(HSucc), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
          var _step9$value = _slicedToArray(_step9.value, 2);

          var u = _step9$value[0];
          var HNbrs = _step9$value[1];
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (var _iterator10 = _getIterator(thisSucc.get(u)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
              var _step10$value = _slicedToArray(_step10.value, 2);

              var v = _step10$value[0];
              var keydict = _step10$value[1];

              if (HSucc.has(v)) {
                // add both representations of edge: u-v and v-u
                // they share the same keydict
                var keydictCopy = (0, _internals.clone)(keydict);
                HNbrs.set(v, keydictCopy);
                HPred.get(v).set(u, keydictCopy);
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10['return']) {
                _iterator10['return']();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9['return']) {
            _iterator9['return']();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      H.graph = this.graph;
      return H;
    }

    /**
     * Return the reverse of the graph.
     *
     * The reverse is a graph with the same nodes and edges but with the
     * directions of the edges reversed.
     *
     * @param {boolean=} optCopy If true, return a new MultiDiGraph holding the
     *   reversed edges. If false, the reverse graph is created using the original
     *   graph (this changes the original graph).
     * @return {?MultiDiGraph}
     */
  }, {
    key: 'reverse',
    value: function reverse() {
      var optCopy = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

      var H;
      if (optCopy) {
        H = new this.constructor(null, { name: (0, _internals.sprintf)('Reverse of (%s)', this.name) });

        H.addNodesFrom(this);
        H.addEdgesFrom((0, _internals.mapIterator)(this.edges(true, true), function (_ref) {
          var _ref2 = _slicedToArray(_ref, 4);

          var u = _ref2[0];
          var v = _ref2[1];
          var key = _ref2[2];
          var data = _ref2[3];
          return (0, _internals.tuple4)(v, u, key, (0, _internals.deepcopy)(data));
        }));
        H.graph = (0, _internals.deepcopy)(this.graph);
        H.node = (0, _internals.deepcopy)(this.node);
      } else {
        var _ref3 = [this.succ, this.pred];
        this.pred = _ref3[0];
        this.succ = _ref3[1];

        this.adj = this.succ;
        H = this;
      }
      return H;
    }
  }], [{
    key: '__name__',
    get: function get() {
      return 'MultiDiGraph';
    }
  }]);

  return MultiDiGraph;
})(_DiGraph3['default']);

exports['default'] = MultiDiGraph;
_Object$getOwnPropertyNames(_MultiGraph2['default'].prototype).forEach(function (prop) {
  if (!MultiDiGraph.prototype.hasOwnProperty(prop)) {
    MultiDiGraph.prototype[prop] = _MultiGraph2['default'].prototype[prop];
  }
});

function yieldEdges(nodesNbrs, data, keys, type) {
  var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _step11$value, n, nbrs, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _step12$value, nbr, keydict, key, result;

  return _regeneratorRuntime.wrap(function yieldEdges$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion11 = true;
        _didIteratorError11 = false;
        _iteratorError11 = undefined;
        context$1$0.prev = 3;
        _iterator11 = _getIterator(nodesNbrs);

      case 5:
        if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
          context$1$0.next = 48;
          break;
        }

        _step11$value = _slicedToArray(_step11.value, 2);
        n = _step11$value[0];
        nbrs = _step11$value[1];
        _iteratorNormalCompletion12 = true;
        _didIteratorError12 = false;
        _iteratorError12 = undefined;
        context$1$0.prev = 12;
        _iterator12 = _getIterator(nbrs);

      case 14:
        if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
          context$1$0.next = 31;
          break;
        }

        _step12$value = _slicedToArray(_step12.value, 2);
        nbr = _step12$value[0];
        keydict = _step12$value[1];
        context$1$0.t0 = _regeneratorRuntime.keys(keydict);

      case 19:
        if ((context$1$0.t1 = context$1$0.t0()).done) {
          context$1$0.next = 28;
          break;
        }

        key = context$1$0.t1.value;
        result = type === 'out' ? [n, nbr] : [nbr, n];

        if (keys) {
          result[2] = isNaN(key) ? key : +key;
        }
        if (data) {
          result.push(keydict[key]);
        }
        context$1$0.next = 26;
        return result;

      case 26:
        context$1$0.next = 19;
        break;

      case 28:
        _iteratorNormalCompletion12 = true;
        context$1$0.next = 14;
        break;

      case 31:
        context$1$0.next = 37;
        break;

      case 33:
        context$1$0.prev = 33;
        context$1$0.t2 = context$1$0['catch'](12);
        _didIteratorError12 = true;
        _iteratorError12 = context$1$0.t2;

      case 37:
        context$1$0.prev = 37;
        context$1$0.prev = 38;

        if (!_iteratorNormalCompletion12 && _iterator12['return']) {
          _iterator12['return']();
        }

      case 40:
        context$1$0.prev = 40;

        if (!_didIteratorError12) {
          context$1$0.next = 43;
          break;
        }

        throw _iteratorError12;

      case 43:
        return context$1$0.finish(40);

      case 44:
        return context$1$0.finish(37);

      case 45:
        _iteratorNormalCompletion11 = true;
        context$1$0.next = 5;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t3 = context$1$0['catch'](3);
        _didIteratorError11 = true;
        _iteratorError11 = context$1$0.t3;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion11 && _iterator11['return']) {
          _iterator11['return']();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError11) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError11;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this, [[3, 50, 54, 62], [12, 33, 37, 45], [38,, 40, 44], [55,, 57, 61]]);
}

function sumEdgeAttribute(nbrs, attribute, def) {
  var sum = 0;
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (var _iterator13 = _getIterator(nbrs.values()), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
      var keydict = _step13.value;

      for (var key in keydict) {
        sum += (0, _internals.getDefault)(keydict[key][attribute], def);
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13['return']) {
        _iterator13['return']();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return sum;
}

function yieldDegree(graph, edges, nBunch, weight) {
  var nodesNbrs, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, n, nbrs, sum, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, keydict, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _step16$value;

  return _regeneratorRuntime.wrap(function yieldDegree$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        nodesNbrs = nBunch == null ? edges : (0, _internals.mapIterator)(graph.nbunchIter(nBunch), function (n) {
          return (0, _internals.tuple2)(n, edges.get(n));
        });

        if (!(weight == null)) {
          context$1$0.next = 52;
          break;
        }

        _iteratorNormalCompletion14 = true;
        _didIteratorError14 = false;
        _iteratorError14 = undefined;
        context$1$0.prev = 5;
        _iterator14 = _getIterator(nodesNbrs);

      case 7:
        if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
          context$1$0.next = 36;
          break;
        }

        _step14$value = _slicedToArray(_step14.value, 2);
        n = _step14$value[0];
        nbrs = _step14$value[1];
        sum = 0;
        _iteratorNormalCompletion15 = true;
        _didIteratorError15 = false;
        _iteratorError15 = undefined;
        context$1$0.prev = 15;

        for (_iterator15 = _getIterator(nbrs.values()); !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
          keydict = _step15.value;

          sum += _Object$keys(keydict).length;
        }
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t0 = context$1$0['catch'](15);
        _didIteratorError15 = true;
        _iteratorError15 = context$1$0.t0;

      case 23:
        context$1$0.prev = 23;
        context$1$0.prev = 24;

        if (!_iteratorNormalCompletion15 && _iterator15['return']) {
          _iterator15['return']();
        }

      case 26:
        context$1$0.prev = 26;

        if (!_didIteratorError15) {
          context$1$0.next = 29;
          break;
        }

        throw _iteratorError15;

      case 29:
        return context$1$0.finish(26);

      case 30:
        return context$1$0.finish(23);

      case 31:
        context$1$0.next = 33;
        return [n, sum];

      case 33:
        _iteratorNormalCompletion14 = true;
        context$1$0.next = 7;
        break;

      case 36:
        context$1$0.next = 42;
        break;

      case 38:
        context$1$0.prev = 38;
        context$1$0.t1 = context$1$0['catch'](5);
        _didIteratorError14 = true;
        _iteratorError14 = context$1$0.t1;

      case 42:
        context$1$0.prev = 42;
        context$1$0.prev = 43;

        if (!_iteratorNormalCompletion14 && _iterator14['return']) {
          _iterator14['return']();
        }

      case 45:
        context$1$0.prev = 45;

        if (!_didIteratorError14) {
          context$1$0.next = 48;
          break;
        }

        throw _iteratorError14;

      case 48:
        return context$1$0.finish(45);

      case 49:
        return context$1$0.finish(42);

      case 50:
        context$1$0.next = 80;
        break;

      case 52:
        _iteratorNormalCompletion16 = true;
        _didIteratorError16 = false;
        _iteratorError16 = undefined;
        context$1$0.prev = 55;
        _iterator16 = _getIterator(nodesNbrs);

      case 57:
        if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
          context$1$0.next = 66;
          break;
        }

        _step16$value = _slicedToArray(_step16.value, 2);
        n = _step16$value[0];
        nbrs = _step16$value[1];
        context$1$0.next = 63;
        return [n, sumEdgeAttribute(nbrs, weight, 1)];

      case 63:
        _iteratorNormalCompletion16 = true;
        context$1$0.next = 57;
        break;

      case 66:
        context$1$0.next = 72;
        break;

      case 68:
        context$1$0.prev = 68;
        context$1$0.t2 = context$1$0['catch'](55);
        _didIteratorError16 = true;
        _iteratorError16 = context$1$0.t2;

      case 72:
        context$1$0.prev = 72;
        context$1$0.prev = 73;

        if (!_iteratorNormalCompletion16 && _iterator16['return']) {
          _iterator16['return']();
        }

      case 75:
        context$1$0.prev = 75;

        if (!_didIteratorError16) {
          context$1$0.next = 78;
          break;
        }

        throw _iteratorError16;

      case 78:
        return context$1$0.finish(75);

      case 79:
        return context$1$0.finish(72);

      case 80:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[1], this, [[5, 38, 42, 50], [15, 19, 23, 31], [24,, 26, 30], [43,, 45, 49], [55, 68, 72, 80], [73,, 75, 79]]);
}
module.exports = exports['default'];

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

/* eslint-disable no-unused-vars */

/* eslint-enable no-unused-vars */

},{"../_internals":20,"../exceptions/JSNetworkXError":73,"./DiGraph":60,"./MultiGraph":63,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/assign":92,"babel-runtime/core-js/object/get-own-property-names":96,"babel-runtime/core-js/object/keys":97,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/define-property":105,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],63:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Graph2 = require('./Graph');

var _Graph3 = _interopRequireDefault(_Graph2);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _internals = require('../_internals');

/**
 * An undirected graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes.  Each edge
 * can hold optional data or attributes. A MultiGraph holds undirected edges.
 * Self loops are allowed.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = jsnx.MultiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2, 3]);
 * var H = jsnx.Graph();
 * H.addPath([0,1,2,3,4,5,6,7,8,9]);
 * G.addNodesFrom(h);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can be used as node. For example, arrays:
 *
 * ```
 * G.addNode([1,2]);
 * ```
 *
 * #### Edges
 *
 * A graph can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list or collection of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an addition edge is created and
 * stored using a key to identify the edge. By default, the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route: 282}], [4,5,{route: 37}]]);
 * G.get(4);
 * // Map { 3: {0: {}}, 5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 * ```
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute "dictionary" (object). By defauly these are empty, but can be added
 * or changed using `addEdge` or `addNode`.
 *
 * ```
 * var G = jsnx.MultiGraph(null, {day: Friday}):
 * G.graph
 * // {day: 'Friday'}
 *
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * @see Graph
 * @see DiGraph
 * @see MultiDiGraph
 *
 */

var MultiGraph = (function (_Graph) {
  _inherits(MultiGraph, _Graph);

  /**
   * @param {?} optData Data to initialze graph.
   *      If no data is provided, an empty graph is created. The data can be
   *      an edge list or any graph object.
   * @param {Object=} optAttr Attributes to add to graph as key=value pairs.
   */

  function MultiGraph(optData, optAttr) {
    _classCallCheck(this, MultiGraph);

    _get(Object.getPrototypeOf(MultiGraph.prototype), 'constructor', this).call(this, optData, optAttr);
  }

  /**
   * Holds the graph type (class) name for information.
   * This is compatible to Pythons __name__ property.
   *
   * @type {string}
   */

  _createClass(MultiGraph, [{
    key: 'addEdge',

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are
     * not already in the graph.
     *
     * Edge attributes can be specified with keywords or by providing
     * a dictionary with key/value pairs.
     *
     * ### Notes:
     *
     * To replace/update edge data, use the optional key argument
     * to identify a unique edge.  Otherwise a new edge will be created.
     *
     * NetworkX algorithms designed for weighted graphs cannot use
     * multigraphs directly because it is not clear how to handle
     * multiedge weights.  Convert to Graph using edge attribute
     * 'weight' to enable weighted graph algorithms.
     *
     * ### Example
     *
     * The following all add the edge [1,2] to the graph G:
     *
     * ```
     * var G = jsnx.MultiGraph();
     * var e = [1,2];
     * G.addEdge(1, 2);
     * G.addEdge.apply(G, e);
     * G.addEdgesFrom([e]);
     * ```
     * Associate data to edges by passing a data object:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     * @see #addEdgesFrom
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {?(number|string)=} optKey identifier
     *      Used to distinguish multiedges between a pair of nodes. Default is
     *      the lowest unused integer.
     * @param {?Object=} optAttrDict  Dictionary of edge attributes.
     *      Key/value pairs will update existing data associated with the edge.
     */
    value: function addEdge(u, v, optKey, optAttrDict) {
      var type = typeof optKey;
      if (optKey != null && type !== 'number' && type !== 'string') {
        optAttrDict = optKey;
        optKey = null;
      }

      // set up attribute dict
      if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The optAttrDict argument must be an object.');
      }

      // add nodes
      if (!this.adj.has(u)) {
        this.adj.set(u, new _internals.Map());
        this.node.set(u, {});
      }
      if (!this.adj.has(v)) {
        this.adj.set(v, new _internals.Map());
        this.node.set(v, {});
      }

      var keydict;
      if (this.adj.get(u).has(v)) {
        keydict = this.adj.get(u).get(v);
        if (optKey == null) {
          // find a unique integer key
          // other methods might be better here?
          optKey = _Object$keys(keydict).length;
          while (keydict[optKey]) {
            // ok, because values are objects only
            optKey += 1;
          }
        }
        var datadict = keydict[optKey] || {};
        keydict[optKey] = _Object$assign(datadict, optAttrDict);
      } else {
        // selfloops work this way without special treatment
        if (optKey == null) {
          optKey = 0;
        }
        keydict = _Object$create(null);
        keydict[optKey] = _Object$assign({}, optAttrDict);
        this.adj.get(u).set(v, keydict);
        this.adj.get(v).set(u, keydict);
      }
    }

    /**
     * Add all the edges in `ebunch`.
     *
     * Adding the same edge twice has no effect but any edge data will be updated
     * when each duplicate edge is added.
     *
     * Edge attributes specified in edges as a tuple take precedence over the
     * attributes specified generally.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[0,1], [1,2]]);
     * ```
     *
     * Associate data to edges
     *
     * ```
     * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
     * G.addEdgesFrom([[1,2], [2,3]], {label: 'WN2898'});
     * ```
     *
     * @see #addEdge
     * @see #addWeightedEdgesFrom
     *
     *
     * @param {Iterable} ebunch container of edges
     *      Each edge given in the container will be added to the
     *      graph. The edges can be:
     *
     *          - 2-tuples (u,v) or
     *          - 3-tuples (u,v,d) for an edge attribute dict d or
     *          - 4-tuples (u,v,k,d) for an edge identified by key k
     *
     * @param {Object=} optAttrDict Dictionary of edge attributes.
     *       Key/value pairs will update existing data associated with each edge.
     */
  }, {
    key: 'addEdgesFrom',
    value: function addEdgesFrom(ebunch, optAttrDict) {
      // istanbul ignore next

      var _this = this;

      if (optAttrDict && !(0, _internals.isPlainObject)(optAttrDict)) {
        throw new _exceptionsJSNetworkXError2['default']('The optAttrDict argument must be an object.');
      }

      // process ebunch
      (0, _internals.forEach)(ebunch, function (edge) {
        var u;
        var v;
        var key;
        var data;

        switch (edge.length) {
          case 4:
            u = edge[0];
            v = edge[1];
            key = edge[2];
            data = edge[3];
            break;
          case 3:
            u = edge[0];
            v = edge[1];
            data = edge[2];
            break;
          case 2:
            u = edge[0];
            v = edge[1];
            break;
          default:
            if (!(0, _internals.isArrayLike)(edge)) {
              throw new TypeError('Elements in edgelists must be tuples.');
            }
            throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('Edge tuple %j must be a 2-tuple, 3-tuple or 4-tuple.', edge));
        }

        var keydict = _this.adj.has(u) ? _this.adj.get(u).get(v) || _Object$create(null) : _Object$create(null);

        if (key == null) {
          // find a unique integer key
          // other methods might be better here?
          key = _Object$keys(keydict).length;
          while (keydict[key]) {
            key += 1;
          }
        }
        var datadict = keydict[key] || {};
        _Object$assign(datadict, optAttrDict, data);
        _this.addEdge(u, v, key, datadict);
      });
    }

    /**
     * Remove an edge between u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0, 1);
     * ```
     *
     * For multiple edges
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdge(1, 2); // remove a single edge
     * ```
     *
     * For edges with keys
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdge(1, 2, 'first');
     * G.addEdge(1, 2, 'second');
     * G.removeEdge(1, 2, 'second');
     * ```
     *
     * @see #removeEdgesFrom
     *
     * @param {Node} u
     * @param {Node} v
     * @param {(number|string)=} optKey
     *      Used to distinguish multiple edges between a pair of nodes.
     *      If null or undefined remove a single (arbitrary) edge between u and v.
     */
  }, {
    key: 'removeEdge',
    value: function removeEdge(u, v, optKey) {
      var keydict;
      var neightborsOfU = this.adj.get(u);
      if (neightborsOfU) {
        keydict = neightborsOfU.get(v);
      }
      if (keydict == null) {
        throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The edge %j-%j is not in the graph', u, v));
      }

      // remove the edge with specified data
      if (optKey == null) {
        for (var key in keydict) {
          delete keydict[key];
          break;
        }
      } else {
        if (!keydict[optKey]) {
          throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('The edge %j-%j with key %j is not in the graph', u, v, optKey));
        }
        delete keydict[optKey];
      }
      if (_Object$keys(keydict).length === 0) {
        // remove the key entries if last edge
        neightborsOfU['delete'](v);
        if (!(0, _internals.nodesAreEqual)(u, v)) {
          this.adj.get(v)['delete'](u);
        }
      }
    }

    /**
     * Remove all edges specified in `ebunch`.
     *
     * Will fail silently if an edge in `ebunch` is not in the graph.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * var ebunch = [[1,2], [2,3]];
     * G.removeEdgesFrom(ebunch);
     * ```
     *
     * Removing multiple copies of edges.
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdgesFrom([[1,2], [1,2]]);
     * G.edges();
     * // [[1,2]]
     * ```
     *
     * @see #removeEdge
     *
     * @param {?} ebunch list or container of edge tuples
     *      Each edge given in the list or container will be removed
     *      from the graph. The edges can be:
     *
     *        - 2-tuples (u,v) All edges between u and v are removed.
     *        - 3-tuples (u,v,key) The edge identified by key is removed.
     */
  }, {
    key: 'removeEdgesFrom',
    value: function removeEdgesFrom(ebunch) {
      // istanbul ignore next

      var _this2 = this;

      (0, _internals.forEach)(ebunch, function (edge) {
        try {
          _this2.removeEdge(edge[0], edge[1], edge[2]);
        } catch (ex) {
          if (!(ex instanceof _exceptionsJSNetworkXError2['default'])) {
            throw ex;
          }
        }
      });
    }

    /**
     * Return True if the graph has an edge between nodes u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.hasEdge(0,1);
     * // true
     * G.addEdge(0, 1, 'a');
     * G.hasEdge(0, 1, 'a');
     * // true
     * ```
     *
     * The following syntax are equivalent:
     *
     * ```
     * G.hasEdge(0, 1);
     * // true
     * G.get(0).has(1);
     * // true
     * ```
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {(string|number)=} optKey If specified return true only
     *      if the edge with key is found.
     *
     * @return {boolean} true if edge is in the graph, false otherwise.
     */
  }, {
    key: 'hasEdge',
    value: function hasEdge(u, v, optKey) {
      var neighborsOfU = this.adj.get(u);
      if (neighborsOfU) {
        return neighborsOfU.has(v) && (optKey == null || !!neighborsOfU.get(v)[optKey]);
      }
      return false;
    }

    /**
     * Return a list of edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * (node, neighbor, key, data).
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.edges();
     * // [[0,1], [1,2], [2,3]]
     * G.edges(true);
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * G.edges(false, true);
     * // [[0,1,0], [1,2,0], [2,3,0]]
     * G.edges(true, true);
     * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
     * G.edges([0,3]);
     * // [[0,1], [3, 2]]
     * G.edges(0);
     * // [[0,1]]
     * ```
     *
     * @see #edgesIter
     *
     * @param {?NodeContainer=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData (default=False)
     *      Return two tuples (u,v) (False) or three-tuples (u,v,data) (True).
     * @param {?boolean=} optKeys (default=False)
     *      Return two tuples (u,v) (False) or three-tuples (u,v,key) (True).
     *
     * @return {!Array} list of edge tuples
     *      Edges that are adjacent to any node in nbunch, or a list
     *      of all edges if nbunch is not specified.
     */
  }, {
    key: 'edges',
    value: function edges(optNbunch, optData, optKeys) {
      return _Array$from(this.edgesIter(optNbunch, optData, optKeys));
    }

    /**
     * Return an iterator over edges.
     *
     * Edges are returned as tuples with optional data and keys
     * in the order (node, neighbor, key, data).
     *
     * Nodes in nbunch that are not in the graph will be (quietly) ignored.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.edgesIter);
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edges(true));
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * Array.from(G.edges(false, true));
     * // [[0,1,0], [1,2,0], [2,3,0]]
     * Array.from(G.edges(true, true));
     * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
     * Array.from(G.edges([0,3]));
     * // [[0,1], [3, 2]]
     * Array.from(G.edges(0));
     * // [[0,1]]
     * ```
     *
     * @see #edges
     *
     * @param {?(NodeContainer|boolean)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData (default=False)
     *      If True, return edge attribute dict with each edge.
     * @param {?boolean=} optKeys (default=False)
     *      If True, return edge keys with each edge.
     *
     * @return {!Iterator}
     *      An iterator of (u,v), (u,v,d) or (u,v,key,d) tuples of edges.
     *
     * @override
     * @export
     */
  }, {
    key: 'edgesIter',
    value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var optData = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
      var optKeys = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

      var seen, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, n, nbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, nbr, keydict, key, tuple;

      return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
        // istanbul ignore next

        var _this3 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (typeof optNbunch === 'boolean') {
              optKeys = optData;
              optData = optNbunch;
              optNbunch = null;
            }

            seen = new _internals.Set();
            nodesNbrs = optNbunch == null ? this.adj : (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return (0, _internals.tuple2)(n, _this3.adj.get(n));
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            context$2$0.prev = 6;
            _iterator = _getIterator(nodesNbrs);

          case 8:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              context$2$0.next = 53;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2);
            n = _step$value[0];
            nbrs = _step$value[1];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            context$2$0.prev = 15;
            _iterator2 = _getIterator(nbrs);

          case 17:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              context$2$0.next = 36;
              break;
            }

            _step2$value = _slicedToArray(_step2.value, 2);
            nbr = _step2$value[0];
            keydict = _step2$value[1];

            if (seen.has(nbr)) {
              context$2$0.next = 33;
              break;
            }

            context$2$0.t0 = _regeneratorRuntime.keys(keydict);

          case 23:
            if ((context$2$0.t1 = context$2$0.t0()).done) {
              context$2$0.next = 32;
              break;
            }

            key = context$2$0.t1.value;
            tuple = [n, nbr];

            if (optKeys) {
              tuple[2] = key;
            }
            if (optData) {
              tuple.push(keydict[key]);
            }
            context$2$0.next = 30;
            return tuple;

          case 30:
            context$2$0.next = 23;
            break;

          case 32:
            seen.add(n);

          case 33:
            _iteratorNormalCompletion2 = true;
            context$2$0.next = 17;
            break;

          case 36:
            context$2$0.next = 42;
            break;

          case 38:
            context$2$0.prev = 38;
            context$2$0.t2 = context$2$0['catch'](15);
            _didIteratorError2 = true;
            _iteratorError2 = context$2$0.t2;

          case 42:
            context$2$0.prev = 42;
            context$2$0.prev = 43;

            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }

          case 45:
            context$2$0.prev = 45;

            if (!_didIteratorError2) {
              context$2$0.next = 48;
              break;
            }

            throw _iteratorError2;

          case 48:
            return context$2$0.finish(45);

          case 49:
            return context$2$0.finish(42);

          case 50:
            _iteratorNormalCompletion = true;
            context$2$0.next = 8;
            break;

          case 53:
            context$2$0.next = 59;
            break;

          case 55:
            context$2$0.prev = 55;
            context$2$0.t3 = context$2$0['catch'](6);
            _didIteratorError = true;
            _iteratorError = context$2$0.t3;

          case 59:
            context$2$0.prev = 59;
            context$2$0.prev = 60;

            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }

          case 62:
            context$2$0.prev = 62;

            if (!_didIteratorError) {
              context$2$0.next = 65;
              break;
            }

            throw _iteratorError;

          case 65:
            return context$2$0.finish(62);

          case 66:
            return context$2$0.finish(59);

          case 67:
          case 'end':
            return context$2$0.stop();
        }
      }, edgesIter, this, [[6, 55, 59, 67], [15, 38, 42, 50], [43,, 45, 49], [60,, 62, 66]]);
    })

    /**
     * Return the attribute dictionary associated with edge (u,v).
     *
     * ### Example
     *
     * ```
     * var G = jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.getEdgeData(0, 1);
     * // {0: {}}
     * G.getEdgeData('a', 'b', null, 0); // edge not in graph, return 0
     * // 0
     * ```
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {(string|number)=} optKey Return data only for the edge with
     *      specified key.
     * @param {T=} optDefault Value to return if the edge (u,v) is not found.
     *
     * @return {(Object|T)} The edge attribute dictionary.
     * @template T
     */
  }, {
    key: 'getEdgeData',
    value: function getEdgeData(u, v, optKey, optDefault) {
      var neightborsOfU = this.adj.get(u);
      if (neightborsOfU) {
        if (optKey == null) {
          return neightborsOfU.get(v) || optDefault;
        }
        return neightborsOfU.has(v) && neightborsOfU.get(v)[optKey] || optDefault;
      }
    }

    /**
     * Return an iterator for (node, degree).
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter(0));
     * // [[0,1]]  // node 0 with degree 1
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,2]]
     *
     * @see #degree
     *
     * @param {?(Node|NodeContainer)=} optNbunch  A container of nodes
     *      The container will be iterated through once.
     * @param {?string=} optWeight  The edge attribute that holds the numerical
     *      value used as a weight.  If undefined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     *
     * @return {!Iterator} The iterator returns two-tuples of (node, degree).
     */
  }, {
    key: 'degreeIter',
    value: _regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
      var nodesNbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, n, nbrs, deg, keydict, key;

      return _regeneratorRuntime.wrap(function degreeIter$(context$2$0) {
        // istanbul ignore next

        var _this4 = this;

        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            if (typeof optNbunch === 'string') {
              optWeight = optNbunch;
              optNbunch = null;
            }
            nodesNbrs = optNbunch == null ? this.adj : (0, _internals.mapIterator)(this.nbunchIter(optNbunch), function (n) {
              return (0, _internals.tuple2)(n, _this4.adj.get(n));
            });
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            context$2$0.prev = 5;
            _iterator3 = _getIterator(nodesNbrs);

          case 7:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              context$2$0.next = 25;
              break;
            }

            _step3$value = _slicedToArray(_step3.value, 2);
            n = _step3$value[0];
            nbrs = _step3$value[1];
            deg = 0;

            if (!(optWeight == null)) {
              context$2$0.next = 18;
              break;
            }

            nbrs.forEach(function (keydict) {
              return deg += _Object$keys(keydict).length;
            });
            context$2$0.next = 16;
            return [n, deg + +(nbrs.has(n) && _Object$keys(nbrs.get(n)).length)];

          case 16:
            context$2$0.next = 22;
            break;

          case 18:
            // edge weighted graph - degree is sum of nbr edge weights
            nbrs.forEach(function (keydict) {
              for (var key in keydict) {
                deg += (0, _internals.getDefault)(keydict[key][optWeight], 1);
              }
            });

            if (nbrs.has(n)) {
              keydict = nbrs.get(n);

              for (key in keydict) {
                deg += (0, _internals.getDefault)(keydict[key][optWeight], 1);
              }
            }

            context$2$0.next = 22;
            return [n, deg];

          case 22:
            _iteratorNormalCompletion3 = true;
            context$2$0.next = 7;
            break;

          case 25:
            context$2$0.next = 31;
            break;

          case 27:
            context$2$0.prev = 27;
            context$2$0.t0 = context$2$0['catch'](5);
            _didIteratorError3 = true;
            _iteratorError3 = context$2$0.t0;

          case 31:
            context$2$0.prev = 31;
            context$2$0.prev = 32;

            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }

          case 34:
            context$2$0.prev = 34;

            if (!_didIteratorError3) {
              context$2$0.next = 37;
              break;
            }

            throw _iteratorError3;

          case 37:
            return context$2$0.finish(34);

          case 38:
            return context$2$0.finish(31);

          case 39:
          case 'end':
            return context$2$0.stop();
        }
      }, degreeIter, this, [[5, 27, 31, 39], [32,, 34, 38]]);
    })

    /**
     * Return true if graph is a multigraph, false otherwise.
     *
     * @return {boolean} true if graph is a multigraph, false otherwise.
     */
  }, {
    key: 'isMultigraph',
    value: function isMultigraph() {
      return true;
    }

    /**
     * Return true if graph is directed, false otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */
  }, {
    key: 'isDirected',
    value: function isDirected() {
      return false;
    }

    /**
     * Return a directed representation of the graph.
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and graph attributes which
     * attempts to completely copy all of the data and references.
     *
     * This is in contrast to the similar D = DiGraph(G) which returns a shallow
     * copy of the data.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1], [1,0]]
     * ```
     *
     * If already directed, return a (deep) copy
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1]]
     * ```
     *
     * @return {!MultiDiGraph}
     *      A directed graph with the same name, same nodes, and with
     *      each edge (u,v,data) replaced by two directed edges
     *      (u,v,data) and (v,u,data).
     */
  }, {
    key: 'toDirected',
    value: function toDirected() {
      var G = new (require('./MultiDiGraph'))();
      G.addNodesFrom(this);
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = _getIterator(this.adjacencyIter()), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _step4$value = _slicedToArray(_step4.value, 2);

          var u = _step4$value[0];
          var nbrs = _step4$value[1];
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = _getIterator(nbrs), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var _step5$value = _slicedToArray(_step5.value, 2);

              var v = _step5$value[0];
              var keydict = _step5$value[1];

              for (var key in keydict) {
                G.addEdge(u, v, key, (0, _internals.deepcopy)(keydict[key]));
              }
            }
          } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                _iterator5['return']();
              }
            } finally {
              if (_didIteratorError5) {
                throw _iteratorError5;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4['return']) {
            _iterator4['return']();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      G.graph = (0, _internals.deepcopy)(this.graph);
      G.node = (0, _internals.deepcopy)(this.node);
      return G;
    }

    /**
     * Return a list of selfloop edges.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdge(1, 1);
     * G.addEdge(1, 2);
     * G.selfloopEdges();
     * // [[1,1]]
     * G.selfloopEdges(true);
     * // [[1,1,{}]]
     * G.selfloopEdges(false, true);
     * // [[1,1,0]]
     * G.selfloopEdges(true, true);
     * // [[1,1,0,{}]]
     * ```
     *
     * @see #nodesWithSelfloops
     * @see #numberOfSelfloops
     *
     *
     * @param {boolean=} optData  (default=False)
     *      Return selfloop edges as two tuples (u,v) (data=False)
     *      or three-tuples (u,v,data) (data=True)
     * @param {boolean=} optKeys  (default=False)
     *       If True, return edge keys with each edge
     *
     * @return {Array} A list of all selfloop edges
     */
  }, {
    key: 'selfloopEdges',
    value: function selfloopEdges() {
      var optData = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
      var optKeys = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

      var edges = [];
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = _getIterator(this.adj), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var _step6$value = _slicedToArray(_step6.value, 2);

          var n = _step6$value[0];
          var nbrs = _step6$value[1];

          if (nbrs.has(n)) {
            var keydict = nbrs.get(n);
            for (var key in keydict) {
              var edge = [n, n];
              if (optKeys) {
                edge[2] = key;
              }
              if (optData) {
                edge.push(keydict[key]);
              }
              edges.push(edge);
            }
          }
        }
      } catch (err) {
        _didIteratorError6 = true;
        _iteratorError6 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion6 && _iterator6['return']) {
            _iterator6['return']();
          }
        } finally {
          if (_didIteratorError6) {
            throw _iteratorError6;
          }
        }
      }

      return edges;
    }

    /**
     * Return the number of edges between two nodes.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.numberOfEdges();
     * // 3
     * G.numberOfEdges(0,1);
     * // 1
     * ```
     *
     * @see #size
     *
     * @param {Node=} optU node
     * @param {Node=} optV node
     *      If u and v are specified, return the number of edges between
     *      u and v. Otherwise return the total number of all edges.
     *
     * @return {number} The number of edges in the graph.
     *      If nodes u and v are specified return the number of edges between
     *      those nodes.
     */
  }, {
    key: 'numberOfEdges',
    value: function numberOfEdges(optU, optV) {
      if (optU == null || optV == null) {
        return this.size();
      }

      var neightborsOfU = this.get(optU);
      if (neightborsOfU) {
        return neightborsOfU.has(optV) ? _Object$keys(neightborsOfU.get(optV)).length : 0;
      }
      return 0;
    }

    /**
     * Return the subgraph induced on nodes in nbunch.
     *
     * The induced subgraph of the graph contains the nodes in nbunch and the
     * edges between those nodes.
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `jsnx.Graph(G.subgraph(nbunch))`
     *
     * If edge attributes are containers, a deep copy can be obtained using:
     * `G.subgraph(nbunch).copy()`.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {NodeContainer=} nbunch A container of nodes which will be
     *      iterated through once.
     * @return {MultiGraph} A subgraph of the graph with the same edge attributes.
     */
  }, {
    key: 'subgraph',
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch);
      // create new graph and copy subgraph into it
      var H = new this.constructor();
      // copy node and attribute dictionaries
      this.node.forEach(function (d, n) {
        return H.node.set(n, d);
      });
      // namespace shortcuts for speed
      var HAdj = H.adj,
          thisAdj = this.adj;

      // add nodes and edges (undirected method)
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (var _iterator7 = _getIterator(bunch), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
          var n = _step7.value;

          var Hnbrs = new _internals.Map();
          HAdj.set(n, Hnbrs);

          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (var _iterator8 = _getIterator(thisAdj.get(n)), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
              var _step8$value = _slicedToArray(_step8.value, 2);

              var nbr = _step8$value[0];
              var edgedict = _step8$value[1];

              if (HAdj.has(nbr)) {
                // add both representations of edge: n-nbr and nbr-n
                // they share the same edgedict
                var ed = (0, _internals.clone)(edgedict);
                Hnbrs.set(nbr, ed);
                HAdj.get(nbr).set(n, ed);
              }
            }
          } catch (err) {
            _didIteratorError8 = true;
            _iteratorError8 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                _iterator8['return']();
              }
            } finally {
              if (_didIteratorError8) {
                throw _iteratorError8;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7['return']) {
            _iterator7['return']();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      H.graph = this.graph;
      return H;
    }
  }], [{
    key: '__name__',
    get: function get() {
      return 'MultiGraph';
    }
  }]);

  return MultiGraph;
})(_Graph3['default']);

exports['default'] = MultiGraph;
module.exports = exports['default'];

/*eslint no-loop-func:0*/

},{"../_internals":20,"../exceptions/JSNetworkXError":73,"./Graph":61,"./MultiDiGraph":62,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/assign":92,"babel-runtime/core-js/object/create":93,"babel-runtime/core-js/object/keys":97,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],64:[function(require,module,exports){
'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Map = require('babel-runtime/core-js/map')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.nodes = nodes;
exports.nodesIter = nodesIter;
exports.edges = edges;
exports.edgesIter = edgesIter;
exports.degree = degree;
exports.neighbors = neighbors;
exports.numberOfNodes = numberOfNodes;
exports.numberOfEdges = numberOfEdges;
exports.density = density;
exports.degreeHistogram = degreeHistogram;
exports.isDirected = isDirected;
exports.freeze = freeze;
exports.isFrozen = isFrozen;
exports.subgraph = subgraph;
exports.createEmptyCopy = createEmptyCopy;
exports.info = info;
exports.setNodeAttributes = setNodeAttributes;
exports.getNodeAttributes = getNodeAttributes;
exports.setEdgeAttributes = setEdgeAttributes;
exports.getEdgeAttributes = getEdgeAttributes;

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _internals = require('../_internals');

/**
 * Return a copy of the graph nodes in a list.
 *
 * @param {Graph} G Graph
 * @return {Array} List of nodes
 */

function nodes(G) {
  return G.nodes();
}

/**
 * Return an iterator over the graph nodes.
 *
 * @param {Graph} G Graph
 * @return {Iterator} Iterator over graph nodes
 */

function nodesIter(G) {
  return G.nodesIter();
}

/**
 * Return a list of edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Array} List of edges
 */

function edges(G, optNbunch) {
  return G.edges(optNbunch);
}

/**
 * Return iterator over  edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Iterator} Iterator over edges
 */

function edgesIter(G, optNbunch) {
  return G.edgesIter(optNbunch);
}

/**
 * Return degree of single node or of nbunch of nodes.
 * If nbunch is omitted, then return degrees of *all* nodes.
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @param {string=} opt_weight Weight attribute name
 * @return {(number|Map)} Degree of node(s)
 */

function degree(G, optNbunch, optWeight) {
  return G.degree(optNbunch, optWeight);
}

/**
 * Return a list of nodes connected to node n.
 *
 * @param {Graph} G Graph
 * @param {Node} n Node
 * @return {Array} List of nodes
 */

function neighbors(G, n) {
  return G.neighbors(n);
}

/**
 * Return the number of nodes in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of nodes
 */

function numberOfNodes(G) {
  return G.numberOfNodes();
}

/**
 * Return the number of edges in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of edges
 */

function numberOfEdges(G) {
  return G.numberOfEdges();
}

/**
 * Return the density of a graph.
 * The density for undirected graphs is
 *
 * ```math
 * d = \frac{2m}{n(n-1)}
 * ```
 *
 * and for directed graphs is
 *
 * ```math
 * \frac{m}{n(n-1)}
 * ```
 *
 * where n is the number of nodes and m is the number of edges in G
 *
 * The density is 0 for an graph without edges and 1.0 for a complete graph.
 * The density of multigraphs can be higher than 1.
 *
 * @param {Graph} G Graph
 * @return {number} Density
 */

function density(G) {
  var n = G.numberOfNodes();
  var m = G.numberOfEdges();
  var d;

  if (m === 0) {
    // includes cases n === 0 and n === 1
    d = 0.0;
  } else {
    if (G.isDirected()) {
      d = m / (n * (n - 1));
    } else {
      d = m * 2 / (n * (n - 1));
    }
  }

  return d;
}

/**
 * Return a list of the frequency of each degree value.
 *
 * Note: the bins are width one, hence list.length can be large
 * (Order(number_of_edges))
 *
 *
 * @param {Graph} G Graph
 * @return {Array} A list of frequencies of degrees.
 *      The degree values are the index in the list.
 */

function degreeHistogram(G) {
  var degseq = _Array$from(G.degree().values());
  var dmax = Math.max.apply(Math, degseq) + 1;
  var freq = (0, _internals.fillArray)(dmax, 0);

  degseq.forEach(function (d) {
    freq[d] += 1;
  });

  return freq;
}

/**
 * Return True if graph is directed.
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is directed
 */

function isDirected(G) {
  return G.isDirected();
}

/**
 * Modify graph to prevent addition of nodes or edges.
 *
 * This does not prevent modification of edge data.
 * To "unfreeze" a graph you must make a copy.
 *
 * @see #is_frozen
 *
 * @param {Graph} G Graph
 * @return {Graph} A reference to the input graph
 */

function freeze(G) {
  function frozen() {
    throw new _exceptionsJSNetworkXError2['default']("Frozen graph can't be modified");
  }

  // This double assignment is necessary for the closure compiler
  G.addNode = frozen;
  G.addNodesFrom = frozen;
  G.removeNode = frozen;
  G.removeNodesFrom = frozen;
  G.addEdge = frozen;
  G.addEdgesFrom = frozen;
  G.removeEdge = frozen;
  G.removeEdgesFrom = frozen;
  G.clear = frozen;
  G.frozen = true;
  return G;
}

/**
 * Return True if graph is frozen.
 *
 * @see #freeze
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is frozen.
 */

function isFrozen(G) {
  return !!G.frozen;
}

/**
 * Return the subgraph induced on nodes in nbunch.
 *
 * Note:  subgraph(G) calls G.subgraph()
 *
 * @param {Graph} G Graph
 * @param {NodeContainer} nbunch
 *      A container of nodes that will be iterated through once (thus
 *      it should be an iterator or be iterable).  Each element of the
 *      container should be a valid node type: any hashable type except
 *      None.  If nbunch is None, return all edges data in the graph.
 *      Nodes in nbunch that are not in the graph will be (quietly)
 *      ignored.
 * @return {Graph} Subgraph
 */

function subgraph(G, nbunch) {
  return G.subgraph(nbunch);
}

/**
 * Return a copy of the graph G with all of the edges removed.
 *
 * Notes: Graph, node, and edge data is not propagated to the new graph.
 *
 * @param {Graph} G Graph
 * @param {boolean} opt_with_nodes (default=True)
 *      Include nodes.
 *
 * @return {Graph} A copy of the graph
 */

function createEmptyCopy(G) {
  var optWithNodes = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  var H = new G.constructor();
  if (optWithNodes) {
    H.addNodesFrom(G);
  }
  return H;
}

/**
 * Print short summary of information for the graph G or the node n.
 *
 * @param {Graph} G Graph
 * @param {Node=} opt_n A node in the graph G
 * @return {string} Info
 */

function info(G, optN) {
  var result = '';
  if (optN == null) {
    var template = 'Name: %s\n' + 'Type: %s\n' + 'Number of nodes: %s\n' + 'Number of edges: %s\n';
    var nnodes = G.numberOfNodes();
    result = (0, _internals.sprintf)(template, G.name, G.constructor.__name__, nnodes, G.numberOfEdges());
    if (nnodes > 0) {
      if (G.isDirected()) {
        var inDegree = 0;
        var outDegree = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _getIterator(G.inDegree().values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _degree = _step.value;

            inDegree += _degree;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _getIterator(G.outDegree().values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _degree2 = _step2.value;

            outDegree += _degree2;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        result += (0, _internals.sprintf)('Average in degree: %s\nAverage out degree: %s', (inDegree / nnodes).toFixed(4), (outDegree / nnodes).toFixed(4));
      } else {
        var sum = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _getIterator(G.degree().values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var v = _step3.value;

            sum += v;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
              _iterator3['return']();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        result += (0, _internals.sprintf)('Average degree: %s', (sum / nnodes).toFixed(4));
      }
    }
  } else {
    if (!G.hasNode(optN)) {
      throw new _exceptionsJSNetworkXError2['default']((0, _internals.sprintf)('Node %j not in graph.', optN));
    }
    result = (0, _internals.sprintf)('Node %j has the following properties:\nDegree: %s\nNeighbors: %s', optN, G.degree(optN), G.neighbors(optN).map(function (n) {
      return JSON.stringify(n);
    }).join(' '));
  }
  return result;
}

/**
 * Set node attributes from dictionary of nodes and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {(Object|Map)} attributes Dictionary of attributes keyed by node
 */

function setNodeAttributes(G, name, attributes) {
  if ((0, _internals.isMap)(attributes)) {
    attributes.forEach(function (value, node) {
      return G.node.get(node)[name] = value;
    });
  } else if ((0, _internals.isPlainObject)(attributes)) {
    for (var node in attributes) {
      node = isNaN(node) ? node : +node;
      G.node.get(node)[name] = attributes[node];
    }
  } else {
    throw new TypeError('Attributes must be a Map or a plain object');
  }
}

/**
 * Get node attributes from graph
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by node.
 */

function getNodeAttributes(G, name) {
  var dict = new _Map();
  G.node.forEach(function (node, data) {
    if (data.hasOwnProperty(name)) {
      dict.set(node, data[name]);
    }
  });
  return dict;
}

/**
 * Set edge attributes from dictionary of edge tuples and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {Map} attributes
 *    Dictionary of attributes keyed by edge (tuple).
 */

function setEdgeAttributes(G, name, attributes) {
  attributes.forEach(function (edge, value) {
    G.get(edge[0]).get(edge[1])[name] = value;
  });
}

/**
 * Get edge attributes from graph
 *
 * Since keys can only be strings in JavaScript, the edge is returned as
 * {@code "node1,node2"} string. You'd have to call {@code .split(',')} on
 * the keys to extract the actual node names.
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by edge.
 */

function getEdgeAttributes(G, name) {
  var dict = new _Map();
  G.edges(null, true).forEach(function (edged) {
    if (edged[2].hasOwnProperty(name)) {
      var value = edged[2][name];
      edged.length = 2; // cut of data
      dict.set(edged, value);
    }
  });
  return dict;
}

},{"../_internals":20,"../exceptions/JSNetworkXError":73,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/map":91,"babel-runtime/helpers/interop-require-default":109}],65:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _Graph = require('./Graph');

var _Graph2 = _interopRequireDefault(_Graph);

var _DiGraph = require('./DiGraph');

var _DiGraph2 = _interopRequireDefault(_DiGraph);

var _MultiGraph = require('./MultiGraph');

var _MultiGraph2 = _interopRequireDefault(_MultiGraph);

var _MultiDiGraph = require('./MultiDiGraph');

var _MultiDiGraph2 = _interopRequireDefault(_MultiDiGraph);

var _functions = require('./functions');

var functions = _interopRequireWildcard(_functions);

exports.Graph = _Graph2['default'];
exports.DiGraph = _DiGraph2['default'];
exports.MultiGraph = _MultiGraph2['default'];
exports.MultiDiGraph = _MultiDiGraph2['default'];
exports.functions = functions;

_defaults(exports, _interopExportWildcard(_functions, _defaults));

},{"./DiGraph":60,"./Graph":61,"./MultiDiGraph":62,"./MultiGraph":63,"./functions":64,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110}],66:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.toMapOfLists = toMapOfLists;
exports.fromMapOfLists = fromMapOfLists;
exports.toMapOfMaps = toMapOfMaps;
exports.fromMapOfMaps = fromMapOfMaps;

var _prepCreateUsing = require('./prepCreateUsing');

var _prepCreateUsing2 = _interopRequireDefault(_prepCreateUsing);

var _internals = require('../_internals');

/**
 * This module provides functions to convert JSNetworkX graphs to and from
 * non-NetworkX formats.
 */

/**
 * Return adjacency representation of graph as a map of lists.
 *
 * Completely ignores edge data for `MultiGraph` and `MultiDiGraph`.
 *
 * @param {Graph} G A graph
 * @param {Iterable=} optNodelist Use only nods specified in this list.
 *
 * @return {!Map}
 */

function toMapOfLists(G, optNodelist) {
  var map = new _internals.Map();

  if (optNodelist != null) {
    _Array$from(optNodelist).forEach(function (n) {
      return map.set(n, G.neighbors(n).filter(function (v) {
        return optNodelist.indexOf(v) > -1;
      }));
    });
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        map.set(n, G.neighbors(n));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return map;
}

/**
 * Return a graph from a map of lists.
 * *
 * @param {!Map} map A map of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 *
 * @return {!Graph}
 */

function fromMapOfLists(map, optCreateUsing) {
  var G = (0, _prepCreateUsing2['default'])(optCreateUsing);
  G.addNodesFrom(map.keys());

  if (G.isMultigraph() && !G.isDirected()) {
    // a map_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the map_of_lists.
    // So we need to treat this case separately.
    var seen = new _internals.Set();

    map.forEach(function (nbrlist, node) {
      nbrlist.forEach(function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    });
  } else {
      map.forEach(function (nbrlist, node) {
        nbrlist.forEach(function (nbr) {
          return G.addEdge(node, nbr);
        });
      });
    }

  return G;
}

/**
 * Return adjacency representation of graph as a map of maps.
 *
 * @param {Graph} G A jsnx Graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the map will be
 *      set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If optEdgeData is null or undefined, the edge data in G is used to
 *      fill the values.
 *      If G is a multigraph, the edge data is a dict for each pair (u,v).
 *
 * @return {!Map}
 */

function toMapOfMaps(G, optNodelist, optEdgeData) {
  var mapOfMaps = new _internals.Map();

  if (optNodelist != null) {
    optNodelist = _Array$from(optNodelist);
    optNodelist.forEach(function (u) {
      var mapOfU = mapOfMaps.set(u, new _internals.Map());
      G.get(u).forEach(function (v, data) {
        if (optNodelist.indexOf(v) > -1) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        }
      });
    });
  } else {
    // nodelist is undefined
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function () {
        var _step2$value = _slicedToArray(_step2.value, 2);

        var nbrmap = _step2$value[0];
        var u = _step2$value[1];

        /*eslint no-loop-func:0*/
        var mapOfU = mapOfMaps.set(u, new _internals.Map());
        nbrmap.forEach(function (data, v) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        });
      };

      for (var _iterator2 = _getIterator(G.adjacencyIter()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return mapOfMaps;
}

/**
 * Return a graph from a map of maps.
 *
 * @param {!Map} map A map of maps adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput (default=False)
 *      When True, the values of the inner dict are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */

function fromMapOfMaps(map, optCreateUsing, optMultigraphInput) {
  var G = (0, _prepCreateUsing2['default'])(optCreateUsing);
  var seen = new _internals.Set(); // don't add both directions of undirected graph
  G.addNodesFrom(map.keys());

  // is map a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw expection of not map (object)
          throw new TypeError('Value is not a map.');
        }
        nbrs.forEach(function (datadict, v) {
          for (var key in datadict) {
            var data = datadict[key];
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, data);
            } else {
              G.addEdge(u, v, data);
            }
          }
        });
      });
    } else {
      // undirected
      var isMultigraph = G.isMultigraph();
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not map
          throw new TypeError('Not a map');
        }
        nbrs.forEach(function (datadict, v) {
          // this works because sets convert the value to their string
          // representation
          if (!seen.has((0, _internals.tuple2)(u, v))) {
            for (var key in datadict) {
              var data = datadict[key];
              if (isMultigraph) {
                G.addEdge(u, v, key, data);
              } else {
                G.addEdge(u, v, data);
              }
            }
            seen.add((0, _internals.tuple2)(v, u));
          }
        });
      });
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // map can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Value is not a map');
        }
        nbrs.forEach(function (data, v) {
          if (!seen.has((0, _internals.tuple2)(u, v))) {
            G.addEdge(u, v, data);
            seen.add((0, _internals.tuple2)(v, u));
          }
        });
      });
    } else {
      map.forEach(function (nbrs, u) {
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Value is not a map');
        }
        nbrs.forEach(function (data, v) {
          G.addEdge(u, v, data);
        });
      });
    }
  }

  return G;
}

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":20,"./prepCreateUsing":68,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],67:[function(require,module,exports){
'use strict';

/**
 * A simple event object to any data can be added. It provides four methods:
 *
 * - stopPropagation to indicated that subsequent event handlers should not be
 *   executed.
 * - isPropgationStopped to test the status (internal only)
 * - preventDefault to prevent the default action
 * - isDefaultPrevented to test the status
 */

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.observe = observe;
exports.unobserve = unobserve;
exports.isObservable = isObservable;

var Event = (function () {

  /**
   * @param {string} type
   * @param {*} target
   */

  function Event(type, target) {
    _classCallCheck(this, Event);

    this.type = type;
    this.target = target;
    this._defaultAction = true;
    this._propagate = true;
  }

  /**
   * Makes a graph observable, i.e. external code can bind event handlers to
   * be notified about changes in the graph (adding or removing nodes or edges).
   *
   * @param {Graph} G The graph to make observable
   * @return {Graph} The same graph passed as argument (not a new graph)
   */

  /**
   * When called, should prevent the execution of subsequent handlers.
   */

  _createClass(Event, [{
    key: 'stopPropagation',
    value: function stopPropagation() {
      this._propagate = false;
    }

    /**
     * Tests whether the propagation should be stopped.
     * @return {boolean}
     */
  }, {
    key: 'isPropgationStopped',
    value: function isPropgationStopped() {
      return !this._propagate;
    }

    /**
     * When called, should prevent the default action.
     */
  }, {
    key: 'preventDefault',
    value: function preventDefault() {
      this._defaultAction = false;
    }

    /**
     * Tests whether the default action should be stopped.
     *
     * @return {boolean}
     */
  }, {
    key: 'isDefaultPrevented',
    value: function isDefaultPrevented() {
      return !this._defaultAction;
    }
  }]);

  return Event;
})();

function observe(G) {
  if (typeof G.on === 'function') {
    // graph is already observable, do nothing
    return G;
  }

  var eventHandlers = {
    'addNodes': [],
    'removeNodes': [],
    'addEdges': [],
    'removeEdges': [],
    'clear': []
  };
  var proto = G.constructor.prototype;

  /* eslint-disable no-shadow */
  function triggerHandlers(event, G, funcName, args) {
    /* eslint-enable no-shadow */
    var handlers = eventHandlers[event.type];
    if (!handlers) {
      return;
    }
    // run before handlers
    for (var i = 0, l = handlers.length; i < l && !event.isPropgationStopped(); i += 3) {
      if (handlers[i + 2]) {
        handlers[i].call(handlers[i + 1] || G, event);
      }
    }

    if (!event.isDefaultPrevented()) {
      if (args) {
        proto[funcName].apply(G, args);
      } else {
        proto[funcName].call(G);
      }
      if (!event.isPropgationStopped()) {
        // run after handlers
        for (i = 0, l = handlers.length; i < l && !event.isPropgationStopped(); i += 3) {
          if (!handlers[i + 2]) {
            handlers[i].call(handlers[i + 1] || G, event);
          }
        }
      }
    }
  }

  G.on = function (event, handler, thisObj, before) {
    if (!eventHandlers[event]) {
      throw new Error('Event "' + event + '" is not supported.');
    }
    eventHandlers[event].push(handler, thisObj, !!before);
  };

  G.off = function (event, handler, thisObj) {
    var handlers;
    var startIndex;
    var i;
    if (arguments.length === 1) {
      // Remove all event handlers
      eventHandlers[event].length = 0;
    } else if (arguments.length === 2) {
      // Remove particular handler or object only
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      if (typeof handler !== 'function') {
        startIndex += 1;
      }
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler) {
          handlers.splice(i, 3);
        }
      }
    } else {
      // Remove particular handler-object combination
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler && handlers[i + 1] === thisObj) {
          handlers.splice(i, 2);
        }
      }
    }
  };

  G.addNode = function (n) {
    var newNodes = G.hasNode(n) ? [] : [n];
    var event = new Event('addNodes', this);
    event.nodes = [n];
    event.newNodes = newNodes;

    triggerHandlers(event, this, 'addNode', arguments);
  };

  G.addNodesFrom = function (nbunch) {
    var nodes = [];
    var newNodes = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _getIterator(nbunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bunch = _step.value;

        var v = Array.isArray(bunch) ? bunch[0] : bunch;
        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
        if (!G.hasNode(v)) {
          newNodes.push(v);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var event = new Event('addNodes', this);
    event.nodes = nodes.filter(function (v) {
      return Array.isArray(v) ? v[0] : v;
    });
    event.newNodes = newNodes;

    var args = _Array$from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, 'addNodesFrom', args);
  };

  G.addEdge = function (u, v) {
    var edges = [[u, v]];
    var newEdges = this.hasEdge(u, v) ? [] : edges;

    var event = new Event('addEdges', this);
    event.edges = edges;
    event.newEdges = newEdges;

    triggerHandlers(event, this, 'addEdge', arguments);
  };

  G.addEdgesFrom = function (ebunch) {
    var edges = [];
    var newEdges = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(ebunch), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var bunch = _step2.value;

        edges.push(bunch.slice());
        if (!this.hasEdge(bunch[0], bunch[1])) {
          newEdges.push(bunch.slice(0, 2));
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var event = new Event('addEdges', this);
    event.edges = edges;
    event.newEdges = newEdges;

    var args = _Array$from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, 'addEdgesFrom', args);
  };

  G.removeNode = function (n) {
    var event = new Event('removeNodes', this);
    event.nodes = [n];

    triggerHandlers(event, this, 'removeNode', arguments);
  };

  G.removeNodesFrom = function (nbunch) {
    var nodes = [];
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = _getIterator(nbunch), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var bunch = _step3.value;

        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
          _iterator3['return']();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    var event = new Event('removeNodes', this);
    event.nodes = nodes;

    var args = _Array$from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, 'removeNodesFrom', args);
  };

  G.removeEdge = function (u, v) {
    var event = new Event('removeEdges', this);
    event.edges = [[u, v]];

    triggerHandlers(event, this, 'removeEdge', arguments);
  };

  G.removeEdgesFrom = function (ebunch) {
    var edges = [];
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (var _iterator4 = _getIterator(ebunch), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
        var bunch = _step4.value;

        edges.push(bunch.slice());
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
          _iterator4['return']();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }

    var event = new Event('removeEdges');
    event.edges = edges;

    var args = _Array$from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, 'removeEdgesFrom', args);
  };

  G.clear = function () {
    triggerHandlers(new Event('clear', this), this, 'clear');
  };

  return G;
}

/**
 * Removes the properties added to a graph for event handling.
 *
 * @param {Graph} G
 * @return {Graph} The graph passed to the function
 */

function unobserve(G) {
  var proto = G.constructor.prototype;

  if (typeof G.on !== 'function') {
    // nothing to do
    return G;
  }

  G.addNode = proto.addNode;
  G.addNodesFrome = proto.addNodesFrom;
  G.addEdge = proto.addEdge;
  G.addEdgesFrome = proto.addEdgesFrom;
  G.removeNode = proto.removeNode;
  G.removeEdge = proto.removeEdge;
  G.removeNodesFrom = proto.removeNodesFrom;
  G.removeEdgesFrom = proto.removeEdgesFrom;
  G.clear = proto.clear;

  delete G.on;
  delete G.off;

  return G;
}

/**
 * Tests whether the graph is observable.
 *
 * @param {Graph} G
 * @return {boolean}
 */

function isObservable(G) {
  return typeof G.on === 'function' && typeof G.off === 'function';
}

},{"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/create-class":103}],68:[function(require,module,exports){
'use strict';

/**
 * Return a graph object ready to be populated.
 *
 * If create_using is null or undefined return the default (just jsnx.Graph())
 * If create_using.clear() works, assume it returns a graph object.
 * Otherwise raise an exception because create_using is not a jsnx graph.
 *
 * @param {Graph=} opt_create_using
 * @return {Graph}
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = prepCreateUsing;

function prepCreateUsing(optCreateUsing) {
  var G;
  // can't use import statement because of circular dependency
  var Graph = require('../classes/Graph');

  if (optCreateUsing == null) {
    G = new Graph();
  } else {
    G = optCreateUsing;

    try {
      G.clear();
    } catch (e) {
      throw new TypeError('Input graph is not a jsnx graph type');
    }
  }
  return G;
}

module.exports = exports['default'];

},{"../classes/Graph":61}],69:[function(require,module,exports){
'use strict';
/**
 * This module provides functions to convert
 * NetworkX graphs to and from other formats.
 *
 * The preferred way of converting data to a NetworkX graph
 * is through the graph constuctor.  The constructor calls
 * the to_networkx_graph() function which attempts to guess the
 * input type and convert it automatically.
 */

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.toNetworkxGraph = toNetworkxGraph;
exports.convertToUndirected = convertToUndirected;
exports.convertToDirected = convertToDirected;
exports.toDictOfLists = toDictOfLists;
exports.fromDictOfLists = fromDictOfLists;
exports.toDictOfDicts = toDictOfDicts;
exports.fromDictOfDicts = fromDictOfDicts;
exports.toEdgelist = toEdgelist;
exports.fromEdgelist = fromEdgelist;

var _contribConvert = require('./contrib/convert');

var convertMap = _interopRequireWildcard(_contribConvert);

var _contribPrepCreateUsing = require('./contrib/prepCreateUsing');

var _contribPrepCreateUsing2 = _interopRequireDefault(_contribPrepCreateUsing);

var _lodashObjectMapValues = require('lodash/object/mapValues');

var _lodashObjectMapValues2 = _interopRequireDefault(_lodashObjectMapValues);

var _internals = require('./_internals');

var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Make a JSNetworkX graph from a known data structure.
 *
 * The preferred way to call this is automatically from the class constructor
 *
 * ```
 * var data = {0: {1 : {weight: 1}}} // object of objects single edge (0,1)
 * var G = new jsnx.Graph(d);
 * ```
 *
 * instead of the equivalent
 *
 * ```
 * var G = jsnx.fromDictOfDicts(d);
 * ```
 *
 * @param {?} data An object to be converted
 *   Current accepts types are:
 *
 *   - any JSNetworkX graph
 *   - object of objects
 *   - object of lists
 *   - list of edges
 *
 * @param {Graph=} optCreateUsing NetworkX graph
 *     Use specified graph for result.  Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *     If `true` and  `data` is an object of objects,
 *     try to create a multigraph assuming object of objects of lists
 *     If data and createUsing are both multigraphs then create
 *     a multigraph from a multigraph.
 * @return {Graph}
 */

function toNetworkxGraph(data, optCreateUsing) {
  var optMultigraphInput = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var result = null;

  // jsnx graph
  if (hasOwn.call(data, 'adj')) {
    try {
      result = convertMap.fromMapOfMaps(data.adj, optCreateUsing, data.isMultigraph());
      if (hasOwn.call(data, 'graph') && typeof data.graph === 'object') {
        result.graph = (0, _internals.clone)(data.graph);
      }
      if (hasOwn.call(data, 'node') && (0, _internals.isMap)(data.node)) {
        result.node = new _internals.Map();
        data.node.forEach(function (element, k) {
          return result.node.set(k, (0, _internals.clone)(element));
        });
      }
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  // map of maps / lists
  if ((0, _internals.isMap)(data)) {
    try {
      return convertMap.fromMapOfMaps(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return convertMap.fromMapOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error('Map data structure cannot be converted to a graph.');
      }
    }
  }

  // dict of dicts / lists
  if ((0, _internals.isPlainObject)(data)) {
    try {
      return fromDictOfDicts(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return fromDictOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error('Object data structure cannot be converted to a graph.');
      }
    }
  }

  // list of edges
  if ((0, _internals.isArrayLike)(data)) {
    try {
      return fromEdgelist(data, optCreateUsing);
    } catch (e) {
      throw new Error('Input is not a valid edge list');
    }
  }

  return result;
}

/**
 * Return a new undirected representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */

function convertToUndirected(G) {
  return G.toUndirected();
}

/**
 * Return a new directed representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */

function convertToDirected(G) {
  return G.toDirected();
}

/**
 * Return adjacency representation of graph as a dictionary of lists.
 *
 * Completely ignores edge data for MultiGraph and MultiDiGraph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 *
 * @return {!Object.<Array>}
 */

function toDictOfLists(G, optNodelist) {
  var contains = function contains(n) {
    return optNodelist.indexOf(n) > -1;
  };
  var d = _Object$create(null);

  if (optNodelist == null) {
    optNodelist = G;
    contains = function (n) {
      return optNodelist.hasNode(n);
    };
  } else {
    optNodelist = _Array$from(optNodelist);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(optNodelist), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var n = _step.value;

      d[n] = G.neighbors(n).filter(contains);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return d;
}

/**
 * Return a graph from a dictionary of lists.
 *
 * ### Examples
 *
 * ```
 * var data = {0: [1]}; // single edge (0,1)
 * var G = jsnx.fromDictOfLists(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<Array>} d A dictionary of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 * @return {!Graph}
 */

function fromDictOfLists(d, optCreateUsing) {
  var G = (0, _contribPrepCreateUsing2['default'])(optCreateUsing);

  // Convert numeric property names to numbers
  G.addNodesFrom(_regeneratorRuntime.mark(function callee$1$0() {
    var n;
    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _regeneratorRuntime.keys(d);

        case 1:
          if ((context$2$0.t1 = context$2$0.t0()).done) {
            context$2$0.next = 7;
            break;
          }

          n = context$2$0.t1.value;
          context$2$0.next = 5;
          return isNaN(n) ? n : +n;

        case 5:
          context$2$0.next = 1;
          break;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })());

  var node;
  var nbrlist;
  if (G.isMultigraph() && !G.isDirected()) {
    // a dict_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the dict_of_lists.
    // So we need to treat this case separately.
    var seen = new _internals.Set();

    for (node in d) {
      nbrlist = d[node];
      // treat numeric keys like numbers
      node = isNaN(node) ? node : +node;
      /*eslint no-loop-func:0*/
      (0, _internals.forEach)(nbrlist, function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    }
  } else {
      var edgeList = [];
      for (node in d) {
        nbrlist = d[node];
        // treat numeric keys like numbers
        node = isNaN(node) ? node : +node;
        (0, _internals.forEach)(nbrlist, function (nbr) {
          edgeList.push([node, nbr]);
        });
      }

      G.addEdgesFrom(edgeList);
    }

  return G;
}

/**
 * Return adjacency representation of graph as a dictionary of dictionaries.
 *
 * @param {Graph} G A jsnx Graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the dictionary will
 *      be set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If edgedata is null or undefined, the edgedata in G is used to fill
 *      the values.
 *      If G is a multigraph, the edgedata is a dict for each pair (u,v).
 * @return {!Object.<Object>}
 */

function toDictOfDicts(G, optNodelist, optEdgeData) {
  var dod = {};

  if (optNodelist != null) {
    optNodelist = _Array$from(optNodelist);
    if (optEdgeData != null) {
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = optEdgeData;
          }
        });
      });
    } else {
      // nodelist and edgeData are defined
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = data;
          }
        });
      });
    }
  } else {
    // nodelist is undefined
    if (optEdgeData != null) {
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _getIterator(G.adjacencyIter()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _slicedToArray(_step2.value, 2);

          var nbrdict = _step2$value[0];
          var u = _step2$value[1];

          /*jshint loopfunc:true*/
          dod[u] = (0, _lodashObjectMapValues2['default'])(nbrdict, function () {
            return optEdgeData;
          });
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    } else {
      // edge_data is defined
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _getIterator(G.adjacencyIter()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _step3$value = _slicedToArray(_step3.value, 2);

          var nbrdict = _step3$value[0];
          var u = _step3$value[1];

          dod[u] = (0, _internals.clone)(nbrdict);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3['return']) {
            _iterator3['return']();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }

  return dod;
}

/**
 * Return a graph from a dictionary of dictionaries.
 *
 *
 * ### Examples
 *
 * ```
 * var data = {0: {1: {weight: 1}}}; // single edge (0,1)
 * var G = jsnx.fromDictOfDicts(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<!Object>} d A dictionary of dictionaries adjacency
 *      representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *      When `true`, the values of the inner object are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */

function fromDictOfDicts(d, optCreateUsing) {
  var optMultigraphInput = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var G = (0, _contribPrepCreateUsing2['default'])(optCreateUsing);
  var seen = new _internals.Set();

  // Convert numeric property names to numbers
  G.addNodesFrom(_regeneratorRuntime.mark(function callee$1$0() {
    var n;
    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _regeneratorRuntime.keys(d);

        case 1:
          if ((context$2$0.t1 = context$2$0.t0()).done) {
            context$2$0.next = 7;
            break;
          }

          n = context$2$0.t1.value;
          context$2$0.next = 5;
          return isNaN(n) ? n : +n;

        case 5:
          context$2$0.next = 1;
          break;

        case 7:
        case 'end':
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })());

  // is dict a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          for (var key in datadict) {
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, datadict[key]);
            } else {
              G.addEdge(u, v, datadict[key]);
            }
          }
        }
      }
    } else {
      // undirected
      // don't add both directions of undirected graph
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            for (var key in datadict) {
              if (G.isMultigraph()) {
                G.addEdge(u, v, key, datadict[key]);
              } else {
                G.addEdge(u, v, datadict[key]);
              }
            }
            seen.add([v, u]);
          }
        }
      }
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // d can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            G.addEdge(u, v, data);
            seen.add([v, u]);
          }
        }
      }
    } else {
      for (var u in d) {
        var nbrs = d[u];
        if ((0, _internals.isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          G.addEdge(u, v, data);
        }
      }
    }
  }

  return G;
}

/**
 * Return a list of edges in the graph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @return {!Array}
 */

function toEdgelist(G, optNodelist) {
  if (optNodelist != null) {
    return G.edges(optNodelist, true);
  } else {
    return G.edges(null, true);
  }
}

/**
 * Return a graph from a list of edges.
 *
 * @param {Array.<Array>} edgelist Edge tuples
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @return {!Graph}
 */

function fromEdgelist(edgelist, optCreateUsing) {
  var G = (0, _contribPrepCreateUsing2['default'])(optCreateUsing);
  G.addEdgesFrom(edgelist);
  return G;
}

// NOT IMPLEMENTED

// to_numpy_matrix
// from_numpy_matrix
// to_numpy_recarray
// to_scipy_sparse_matrix
// from_scipy_sparse_matrix
// setup_module
// dn = [nbrdict, u]

},{"./_internals":20,"./contrib/convert":66,"./contrib/prepCreateUsing":68,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/object/create":93,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112,"lodash/object/mapValues":270}],70:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _svg = require('./svg');

var _svg2 = _interopRequireDefault(_svg);

exports.svg = _svg2['default'];

_defaults(exports, _interopExportWildcard(_svg, _defaults));

},{"./svg":71,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-default":109}],71:[function(require,module,exports){
(function (global){
'use strict';
/**
 * @fileoverview
 *
 * D3(http://mbostock.github.com/d3/) is a powerful library to associate data
 * with elements and provides various helpful methods to visualize the data,
 * such as color generators, layouts and DOM manipulation methods.
 *
 * Note: D3 must be included before running these functions
 */

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.draw = draw;

var _internals = require('../_internals');

var nullFunction = function nullFunction() {};

function angleFor(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

/**
 * Safely converts an iterator to an array. Because we often use tuples when
 * using generators internally, we have to be careful when converting the
 * generator to an array. Every element has to be converted explicitly.
 */
function toArray(iterator) {
  // shortcut. If the value is actually an array, we can just return it
  if (Array.isArray(iterator)) {
    return iterator;
  }
  var result = [];
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(iterator), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      result[i++] = Array.isArray(value) ? _Array$from(value) : value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

/**
 * Holds a reference to the last container element for convenience.
 *
 * @type {?(string|Element)}
 * @private
 */
var LAST_ELEMENT = null;

/**
 * Holds a reference to the last configuration for convenience.
 *
 * @type {Object}
 * @private
 */
var LAST_CONFIGURATION = null;

/**
 * A list of graph mutator methods.
 *
 * @type {Array.<string>}
 * @const
 * @private
 */
var MUTATOR_METHODS = ['addNode', 'addNodesFrom', 'addEdge', 'addEdgesFrom', 'removeNode', 'removeNodesFrom', 'removeEdge', 'removeEdgesFrom', 'clear'];

/**
 * The name of the attribute the D3 data is assigned to in the node and
 * edge data.
 *
 * @type {string}
 */
var D3_DATA_NAME = '__d3datum__';

/**
 * Keep a reference to d3.
 */
var d3 = global.d3;

/**
 * Draw graph G with D3.
 *
 * This method draws `G` with the provided `options`. If `optBind` is set to
 * `true`, changes to the graph structure will automatically update the
 * visualization.
 *
 * Returns the force layout used to compute the position of the nodes.
 *
 * The following options are available:
 *
 * - element (Element|String): This option is **required**. Specifies the
 *   container of the visualization. A string is interpreted as CSS selector.
 * - d3 (d3): Use to explicitly pass a reference to D3. If not present, the
 *   global variable d3 will be used instead.
 * - width (number): The width of the canvas in pixels. Defaults to the width
 *   of the container.
 * - height (number): The height of the canvas in pixels. Defaults to the
 *   height of the container.
 * - layoutAttr (Object): Layout options. The default layout is "force", so
 *   the options size, linkDistance, linkStrength, friction, charge, theta
 *   and gravity can be set. For example, setting `{linkDistance: 10}` will call
 *   `force.linkDistance(10)`.
 * - nodelist (Iterable): An iterable of nodes. If present, only nodes in that
 *   list will be drawn.
 * - nodeShape (string): The tag name of the SVG element to be used as nodes.
 *   Defaults to "circle".
 * - nodeAttr (Object): The attributes to set on the node SVG element. This
 *   object is passed along to D3's `.attr()` method.
 * - nodeStyle (Object): The style properties to set on the node SVG element.
 *   This object is passed along to D3's `.style()` method.
 * - edgeAttr (Object): The attributes to set on an edge SVG element. Edges are
 *   represented by SVG path elements.
 * - edgeStyle (Object): The style properties to set on the edge SVG element.
 *   Note: Even though the edge element is a SVG path element, you cannot set
 *   `stroke-width` to set the stroke width. Instead, the value of
 *   `stroke-width` is used as maximum value for the edge width.
 * - withLabels (boolean): Whether or not to draw node labels. SVG text elements
 *   are used for labels.
 * - labels (string|Object|function): The node labels to use.
 *   If `withLabels` is `true`, but `labels` is not present, defaults to the
 *   node itself.
 *   If a string is passed, the value of the property of the node data with the
 *   same name will be used.
 *   If an object is passed, the label is looked up in the object using the node
 *   as property name.
 *   If a function is passed, it gets called and passed the corresponding D3
 *   data object.
 * - labelAttr (Object): Like `nodeAttr` but for the label nodes. Labels are
 *   represented by SVG text nodes.
 * - labelStyle (Object): Like `nodeStyle` but for the label nodes. Labels are
 *   represented by SVG text nodes.
 * - withEdgeLabels (boolean): See `withLabels`, but for edges.
 * - edgeLabels (string|Object|function): See `labels`.
 * - edgeLabelAttr (Object): Like `labelAttr`.
 * - edgeLabelStyle (Object): Like `labelStyle`.
 * - weighted (boolean): Whether the edge width depends on the weight of the
 *   edge. The max and min weight are automatically computed. This is a
 *   convenience option so that you don't have to compute the edge weights
 *   yourself.
 * - weights (string|function): Specifies the weight for each edge.
 *   If `weighted` is `true` but `weights` is not present, defaults to
 *   `"weight"`.
 *   If a string is passed, the value of the property of the edge data with the
 *   same name is used as weight.
 *   If a function is passed, it gets called and passed the corresponding D3
 *   data object.
 * - edgeOffset (number|function): The distance in pixels between the edge start
 *   and the node. If not set and `nodeShape` is a `"circle"`, the offset will
 *   be automatically computed based on the radius.
 *   If a different shape for nodes is used it might be necessary to set the
 *   offset manually.
 * - edgeLabelOffset (number|function): By default edge labels are drawing in
 *   in the center of the edge. Can be used to adjust the position.
 * - panZoom (Object):
 *      - enabled (boolean): Enables panning and zooming of the canvas.
 *      - scale (boolean): Whether nodes and labels should keep their size
 *        when zooming or not.
 *
 * @param {jsnx.classes.Graph} G The graph to draw
 * @param {?Object=} config A dictionary of configuration parameters.
 * @param {?boolean=} optBind Set to true to automatically update
 *      the output upon graph manipulation. Only works for adding nodes or edges
 *      for now.
 * @return {d3.layout.force}
 */

function draw(G, config, optBind) {
  if (typeof config === 'boolean') {
    optBind = config;
    config = null;
  }

  config = config || LAST_CONFIGURATION || {};
  LAST_CONFIGURATION = config;
  if (config.d3) {
    d3 = config.d3;
  }
  config = (0, _internals.deepmerge)({}, DEFAULT_CONFIG, config);

  if (!d3) {
    throw new Error('D3 requried for draw()');
  }

  if (config.element == null && LAST_ELEMENT == null) {
    throw new Error('Output element required for draw()');
  }

  // initialize
  LAST_ELEMENT = config.element || LAST_ELEMENT;

  // remove any possible previous graph
  d3.select(LAST_ELEMENT).select('svg.jsnx').remove();

  // set up base elements
  var container = d3.select(LAST_ELEMENT);
  var d3nodes = [];
  var d3links = [];
  var canvas = container.append('svg').classed('jsnx', true).attr('pointer-events', 'all');
  var parentContainer = canvas.append('g');
  var edgeSelection = parentContainer.append('g').classed('edges', true).selectAll('g.edge');
  var nodeSelection = parentContainer.append('g').classed('nodes', true).selectAll('g.node');
  var force = d3.layout.force();
  var width = config.width || parseInt(container.style('width'), 10);
  var height = config.height || parseInt(container.style('height'), 10);
  var layoutAttr = config.layoutAttr;
  var nodelist = config.nodelist || null;
  var labelFunc;
  var edgeLabelFunc;
  var weightFunc;
  var directed = G.isDirected();
  var weighted = config.weighted;
  var selections = {
    nodeSelection: nodeSelection,
    edgeSelection: edgeSelection
  };

  // determine node label function
  if (config.withLabels) {
    var labels = config.labels;
    switch (typeof labels) {
      case 'object':
        labelFunc = function (d) {
          return (0, _internals.getDefault)(labels[d.node], '');
        };
        break;
      case 'function':
        labelFunc = labels;
        break;
      case 'string':
        labelFunc = function (d) {
          return d.data[labels];
        };
        break;
      default:
        labelFunc = function (d) {
          return d.node;
        };
    }
  }
  config.labels = labelFunc;

  // if the graph should be weighted, we need a weight function
  // these will be used as edge labels if no others are provided
  if (weighted) {
    var weights = config.weights;
    switch (typeof weights) {
      case 'object':
        weightFunc = function (d) {
          return (0, _internals.getDefault)(weights[d.node], 1);
        };
        break;
      case 'function':
        weightFunc = weights;
        break;
      case 'string':
        weightFunc = function (d) {
          if (d.data) {
            return d.data[weights];
          } else {
            return 1;
          }
        };
        break;
      default:
        weightFunc = function (d) {
          return 1;
        };
    }
  }

  // determine edge labels
  if (config.withEdgeLabels) {
    var elabels = config.edgeLabels;

    if (weighted && elabels == null) {
      edgeLabelFunc = weightFunc;
    } else {
      switch (typeof elabels) {
        case 'object':
          edgeLabelFunc = function (d) {
            return (0, _internals.getDefault)(labels[d.node], '');
          };
          break;
        case 'function':
          edgeLabelFunc = elabels;
          break;
        case 'string':
          edgeLabelFunc = function (d) {
            return d.data[elabels];
          };
          break;
        default:
          edgeLabelFunc = function (d) {
            return d.edge;
          };
      }
    }
    config.edgeLabels = edgeLabelFunc;
  }

  // scale the width of the edge according to the weight
  if (weighted && config.weightedStroke) {
    var maxWeight = 1;
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = _getIterator(G.edgesIter(null, true)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _step2$value = _step2.value;
        var u = _step2$value.u;
        var v = _step2$value.v;
        var data = _step2$value.data;

        var weight = weightFunc({ data: data });
        if (weight > maxWeight) {
          maxWeight = weight;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
          _iterator2['return']();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    var scale = d3.scale.linear().range([2, config.edgeStyle['stroke-width']]).domain([0, maxWeight]);

    config.edgeStyle['stroke-width'] = function (d) {
      return scale(weightFunc.call(this, d));
    };
  }

  // remove any possible previous graph
  canvas.select('svg.jsnx').remove();

  // set size and hide the wild movement of nodes at the beginning
  canvas.attr('width', width + 'px').attr('height', height + 'px').style('opacity', 1e-6).transition().duration(1000).style('opacity', 1);

  // initialize layout
  // don't let the user set these:
  var exclude = {
    size: true,
    nodes: true,
    links: true,
    start: true
  };

  for (var attr in layoutAttr) {
    if (exclude[attr] !== true) {
      force[attr](layoutAttr[attr]);
    }
  }
  force.nodes(d3nodes).links(d3links).size([width, height]);

  // set up zoom and pan behaviour
  var zoom = 1;
  var invScale = 1; // used to scale nodes and text accordingly

  if (config.panZoom.enabled) {
    (function () {
      var scaled = config.panZoom.scale;
      var zooming = false;
      var zoomStartScale = 1;
      var zoomStart = zoom;

      canvas.call(d3.behavior.zoom().on('zoom', function () {
        if (!d3.event.sourceEvent) {
          return;
        }
        var shiftKey = d3.event.sourceEvent.shiftKey,
            zoomed = scaled && shiftKey || !(scaled || shiftKey);

        // if the graph is zoomed, we have to keep track of the
        // ration it was zoomed by
        if (zoomed && !zooming) {
          zoomStartScale = d3.event.scale;
          zoomStart = zoom;
          zooming = true;
        } else if (!zoomed && zooming) {
          zooming = false;
        }

        zoom = zoomed ? zoomStart * (d3.event.scale / zoomStartScale) : zoom;
        invScale = !zoomed ? zoom / d3.event.scale : invScale;

        var tr = d3.event.translate;
        parentContainer.attr('transform', 'translate(' + tr[0] + ',' + tr[1] + ')scale(' + d3.event.scale + ')');
        redraw();
      }));
    })();
  }

  var updateEdgePosition = nullFunction;
  var offset = config.edgeOffset;
  var nodeRadius = config.nodeAttr.r;
  var nodeStrokeWidth = config.nodeStyle['stroke-width'];

  if (config.nodeShape === 'circle') {
    if (typeof nodeRadius !== 'function') {
      nodeRadius = function () {
        return config.nodeAttr.r;
      };
    }
    if (typeof nodeStrokeWidth !== 'function') {
      nodeStrokeWidth = function () {
        return config.nodeStyle['stroke-width'];
      };
    }
    offset = function (d) {
      return [nodeRadius(d.source) + nodeStrokeWidth(d.source), nodeRadius(d.target) + nodeStrokeWidth(d.target)];
    };
  } else {
    if (Array.isArray(offset)) {
      offset = function () {
        return config.edgeOffset;
      };
    } else if (typeof offset === 'number') {
      offset = function () {
        return [config.edgeOffset, config.edgeOffset];
      };
    }
  }
  var strw = config.edgeStyle['stroke-width'];
  if (typeof strw !== 'function') {
    strw = function () {
      return config.edgeStyle['stroke-width'];
    };
  }
  var labelOffset = config.edgeLabelOffset;

  if (directed) {
    // don't rotate labels and draw curvy lines
    updateEdgePosition = function () {
      selections.edgeSelection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var computedOffset = offset(d);
          computedOffset = [computedOffset[0] * invScale, computedOffset[1] * invScale];

          $this.attr('transform', ['translate(', x1, ',', y1, ')', 'rotate(', angle, ')'].join(''));

          var shift = strw(d) * invScale;
          var arrowStartPoint = dx - computedOffset[1] - 2 * shift;
          var halfShift = shift / 2;
          $this.select('.line').attr('d', ['M', computedOffset[0], 0, 'L', computedOffset[0], -halfShift, 'L', arrowStartPoint, -halfShift, 'L', arrowStartPoint, -shift, 'L', dx - computedOffset[1], 0, 'z'].join(' '));

          var edgeScale = 1 / invScale;
          $this.select('text').attr('x', labelOffset.x * edgeScale + computedOffset[0] + (dx * edgeScale - computedOffset[0] - computedOffset[1]) / 2).attr('y', -strw(d) / 2 + -labelOffset.y * edgeScale).attr('transform', 'scale(' + invScale + ')');
        }
      });
    };
  } else {
    updateEdgePosition = function () {
      selections.edgeSelection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var center = dx / 2;
          var computedOffset = offset(d);
          computedOffset = [computedOffset[0] * invScale, computedOffset[1] * invScale];

          var edgeScale = 1 / invScale;
          var shift = strw(d) * invScale;
          var flip = angle > 90 && angle < 279;
          $this.attr('transform', ['translate(', x1, ',', y1, ')', 'rotate(', angle, ')'].join(''));
          $this.select('.line').attr('d', ['M', computedOffset[0], shift / 4, 'L', computedOffset[0], -shift / 4, 'L', dx - computedOffset[1], -shift / 4, 'L', dx - computedOffset[1], shift / 4, 'z'].join(' '));
          if (config.withEdgeLabels) {
            $this.select('text').attr('x', (flip ? 1 : -1) * labelOffset.x * edgeScale + computedOffset[0] + (dx * edgeScale - computedOffset[0] - computedOffset[1]) / 2).attr('y', -strw(d) / 4 + -labelOffset.y * edgeScale).attr('transform', 'scale(' + invScale + ')' + (flip ? 'rotate(180,' + center * (1 / invScale) + ',0)' : ''));
          }
        }
      });
    };
  }

  var redraw = function redraw() {
    // update node position
    selections.nodeSelection.attr('transform', function (d) {
      return ['translate(', d.x, ',', d.y, ')', 'scale(', invScale, ')'].join('');
    });

    updateEdgePosition();
  };

  force.on('tick', redraw);

  var nodes = G.nodesIter();
  var edges = G.edgesIter();

  if (nodelist) {
    // limit drawn nodes, disable binding
    optBind = false;
    nodes = G.nbunch_iter(nodelist);
    edges = G.edges_iter(nodelist);
  }

  // update d3 node and link data
  selections.nodeSelection = addNodes(G, nodes, force, nodeSelection, config);

  selections.edgeSelection = addEdges(G, edges, force, edgeSelection, edgeLabelFunc);

  // apply attributes and styles
  updateNodeAttr(selections.nodeSelection, config);

  updateEdgeAttr(selections.edgeSelection, config, null, directed);

  if (optBind) {
    bind(G, force, config, selections);
  } else {
    if (isBound(G)) {
      unbind(G);
    } else {
      clean(G);
    }
  }

  force.start();

  return force;
}

/**
* Helper function to create new node objects for the force layout and
* create the necessary SVG elements.
*
* @param {Graph} G
* @param {Iterable} nodes The nodes to include from the Graph
*      default are all nodes
* @param {d3.layout.force} force The layout
* @param {d3.selection} selection D3 DOM node selection of nodes
* @param {Object} Drawing configuration
*
* @return {!d3.selection} The new selection of SVG elements.
*/
function addNodes(G, nodes, force, selection, config) {
  // Get current data
  var layoutNodes = force.nodes();
  // add new data
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _getIterator(nodes), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var node = _step3.value;

      var data = G.node.get(node);
      var nobj = { node: node, data: data, G: G };
      layoutNodes.push(nobj);
      data[D3_DATA_NAME] = nobj;
    }
    // update data join
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3['return']) {
        _iterator3['return']();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  selection = selection.data(layoutNodes, nodeKeyFunction);
  // create new elements
  var drag = force.drag().on('dragstart', function (d) {
    // Prevent pan if node is dragged
    d3.event.sourceEvent.stopPropagation();
    if (config.stickyDrag) {
      d.fixed = true;
      d3.select(this).classed('fixed', true);
    }
  });
  var nsel = selection.enter().append('g').classed('node', true).call(drag);

  nsel.append(config.nodeShape).classed('node-shape', true);

  if (config.labels) {
    nsel.append('text').text(config.labels);
  }

  return selection;
}

/**
* Helper function to create new edge objects for the force layout.
*
* @param {Graph} G
* @param {Iterable} edges The nodes to include from the Graph
*      default are all nodes
* @param {d3.layout.force} force
* @param {d3.selection} selection D3 DOM node selection of nodes
* @param {Function=} opt_label_func Function to extract text for labels
*
* @return {!d3.selection}
*/
function addEdges(G, edges, force, selection, optLabelFunc) {
  // Get current data
  var layoutLinks = force.links();
  // add new data
  var _iteratorNormalCompletion4 = true;
  var _didIteratorError4 = false;
  var _iteratorError4 = undefined;

  try {
    for (var _iterator4 = _getIterator(edges), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
      var _step4$value = _slicedToArray(_step4.value, 3);

      var u = _step4$value[0];
      var v = _step4$value[1];
      var data = _step4$value[2];

      data = data || G.getEdgeData(u, v);
      var eobj = {
        edge: [u, v],
        source: G.node.get(u)[D3_DATA_NAME],
        target: G.node.get(v)[D3_DATA_NAME],
        data: data,
        G: G
      };
      layoutLinks.push(eobj);
      data[D3_DATA_NAME] = eobj;
    }
    // update data join
  } catch (err) {
    _didIteratorError4 = true;
    _iteratorError4 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion4 && _iterator4['return']) {
        _iterator4['return']();
      }
    } finally {
      if (_didIteratorError4) {
        throw _iteratorError4;
      }
    }
  }

  selection = selection.data(layoutLinks, edgeKeyFunction);
  // create new elements
  var esel = selection.enter().append('g').classed('edge', true);
  esel.append('path').classed('line', true);

  if (optLabelFunc) {
    esel.append('text').text(optLabelFunc);
  }
  return selection;
}

/**
* Updates attributes of nodes.
*
* @param {d3.selection} selection
* @param {Object} config
* @param {Iterable=} opt_nodes a container of nodes. If set,
*      only update these nodes.
*/
function updateNodeAttr(selection, config, optNodes) {
  if (optNodes != null) {
    var newNodes = new _internals.Set();
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (var _iterator5 = _getIterator(optNodes), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
        var node = _step5.value;

        newNodes.add((0, _internals.isArrayLike)(node) ? node[0] : node);
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
          _iterator5['return']();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }

    selection = selection.filter(function (d) {
      return newNodes.has(d.node);
    });
  }
  selection.selectAll('.node-shape').attr(config.nodeAttr).style(config.nodeStyle);

  if (config.withLabels) {
    selection.selectAll('text').attr(config.labelAttr).style(config.labelStyle);
  }
}

/**
* Updates attributes of edges.
*
* @param {d3.selection} selection
* @param {Object} config
* @param {?=} optEdges If set, only updates the styles of the provided
*      edges
* @param {boolean=} optDirected
*/
function updateEdgeAttr(selection, config, optEdges, optDirected) {
  if (optEdges != null) {
    var newEdges = new _internals.Map();
    var _iteratorNormalCompletion6 = true;
    var _didIteratorError6 = false;
    var _iteratorError6 = undefined;

    try {
      for (var _iterator6 = _getIterator(optEdges), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
        var _step6$value = _slicedToArray(_step6.value, 2);

        var u = _step6$value[0];
        var v = _step6$value[1];

        newEdges.set(u, v);
      }
    } catch (err) {
      _didIteratorError6 = true;
      _iteratorError6 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
          _iterator6['return']();
        }
      } finally {
        if (_didIteratorError6) {
          throw _iteratorError6;
        }
      }
    }

    selection = selection.filter(function (_ref) {
      var edge = _ref.edge;
      return newEdges.get(edge[0]) === edge[1] || optDirected || newEdges.get(edge[1]) === edge[0];
    });
  }

  selection.selectAll('.line').attr(config.edgeAttr).style(config.edgeStyle).style('stroke-width', 0);

  if (config.withEdgeLabels) {
    selection.selectAll('text').attr(config.edgeLabelAttr).style(config.edgeLabelStyle);
  }
}

/**
* Key function to extract the join value for the SVG nodes and the data.
*
* @param {Object} d The current datum
* @return {Node}
*/
function nodeKeyFunction(d) {
  return d.node;
}

/**
* Key function to extract the join value for the SVG nodes and the data.
*
* @param {Object} d The current datum
* @return {Array}
*/
function edgeKeyFunction(d) {
  return d.edge;
}

/**
* Helper function to remove node objects for the force layout.
*
* @param {Graph} G
* @param {Iterable} nodes to remove from the graph
* @param {d3.layout.force} force The force the nodes are bound to
* @param {d3.selection} selection Selection of node elements
*
* @return {d3.selection} Updated selection
*/
function removeNodes(G, nodes, force, selection) {
  // get current data set
  var data = force.nodes();

  // remove items from data
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (var _iterator7 = _getIterator(G.nbunchIter(nodes)), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
      var node = _step7.value;

      var index = data.indexOf(G.node.get(node)[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }

    // rebind data
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7['return']) {
        _iterator7['return']();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  selection = selection.data(data, nodeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
* Helper function to remove edge objects for the force layout.
*
* @param {jsnx.classes.Graph} G
* @param {?} edges Edges to remove
* @param {d3.layout.force} force The force the edges are bound to
* @param {d3.selection} selection Selection of edge elements
*
* @return {!d3.selection} Updated selection
*/
function removeEdges(G, edges, force, selection) {
  // get current data set
  var data = force.links();
  // remove items from data
  var _iteratorNormalCompletion8 = true;
  var _didIteratorError8 = false;
  var _iteratorError8 = undefined;

  try {
    for (var _iterator8 = _getIterator(edges), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
      var _step8$value = _slicedToArray(_step8.value, 2);

      var u = _step8$value[0];
      var v = _step8$value[1];

      var index = data.indexOf(G.getEdgeData(u, v, {})[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
    // rebind data
  } catch (err) {
    _didIteratorError8 = true;
    _iteratorError8 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion8 && _iterator8['return']) {
        _iterator8['return']();
      }
    } finally {
      if (_didIteratorError8) {
        throw _iteratorError8;
      }
    }
  }

  selection = selection.data(data, edgeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
* Binds the output to the graph. This overrides mutator methods. To "free"
* the graph, you can call jsnx.unbind (which is public)
*
* @param {Graph} G A Graph
* @param {d3.layout.force} force Force layout
* @param {Object} config The configuration for the output
* @param {{nodeSelection:d3.selection, edgeSelection:d3.selection }} selections
*   Various D3 selections
*/
function bind(G, force, config, selections) {
  unbind(G, false);

  var proto = G.constructor.prototype;
  var edgeLabelFunc = config.edgeLabels;
  var directed = G.isDirected();

  G.addNode = function (n, optAttr) {
    var newNode = !this.hasNode(n);
    proto.addNode.call(this, n, optAttr);

    if (newNode) {
      selections.nodeSelection = addNodes(this, [n], force, selections.nodeSelection, config);
    }

    // update node attributes
    updateNodeAttr(selections.nodeSelection, config, [n]);

    force.start();
  };

  G.addNodesFrom = function (nbunch, optAttr) {
    // istanbul ignore next

    var _this = this;

    nbunch = toArray(nbunch);
    var newNodes = nbunch.filter(function (node) {
      return !_this.hasNode((0, _internals.isArrayLike)(node) ? node[0] : node);
    });

    proto.addNodesFrom.call(this, nbunch, optAttr);

    if (newNodes.length > 0) {
      // add new nodes and update
      selections.nodeSelection = addNodes(this, newNodes, force, selections.nodeSelection, config);
    }

    updateNodeAttr(selections.nodeSelection, config, nbunch);
    force.start();
  };

  G.addEdge = function (u, v, optAttr) {
    // istanbul ignore next

    var _this2 = this;

    var newEdge = !this.hasEdge(u, v);
    var edges = [[u, v]];
    var newNodes = newEdge ? (u === v ? [u] : edges[0]).filter(function (node) {
      return !_this2.hasNode(node);
    }) : [];
    proto.addEdge.call(G, u, v, optAttr);

    if (newNodes.length > 0) {
      selections.nodeSelection = addNodes(this, newNodes, force, selections.nodeSelection, config);

      updateNodeAttr(selections.nodeSelection, config, newNodes);
    }

    if (newEdge) {
      selections.edgeSelection = addEdges(this, edges, force, selections.edgeSelection, edgeLabelFunc);
    }

    updateEdgeAttr(selections.edgeSelection, config, edges, directed);
    force.start();
  };

  G.addEdgesFrom = function (ebunch, optAttr) {
    var newEdges = [];
    var newNodes = [];
    var seenEdges = new _internals.Map();
    var seenNodes = new _internals.Set();

    ebunch = toArray(ebunch);

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
      for (var _iterator9 = _getIterator(ebunch), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
        var _step9$value = _slicedToArray(_step9.value, 2);

        var u = _step9$value[0];
        var v = _step9$value[1];

        if (!this.hasEdge(u, v) && seenEdges.get(u) !== v && (directed || seenEdges.get(v) === u)) {
          newEdges.push([u, v]);
          seenEdges.set(u, v);
          if (!this.hasNode(u) && !seenNodes.has(u)) {
            newNodes.push(u);
            seenNodes.add(u);
          }
          if (!this.hasNode(v) && !seenNodes.has(v)) {
            newNodes.push(v);
            seenNodes.add(v);
          }
        }
      }
    } catch (err) {
      _didIteratorError9 = true;
      _iteratorError9 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
          _iterator9['return']();
        }
      } finally {
        if (_didIteratorError9) {
          throw _iteratorError9;
        }
      }
    }

    proto.addEdgesFrom.call(G, ebunch, optAttr);

    if (newNodes.length > 0) {
      selections.nodeSelection = addNodes(this, newNodes, force, selections.nodeSelection, config);

      updateNodeAttr(selections.nodeSelection, config, newNodes);
    }

    if (newEdges.length > 0) {
      selections.edgeSelection = addEdges(this, newEdges, force, selections.edgeSelection, edgeLabelFunc);
    }

    updateEdgeAttr(selections.edgeSelection, config, newEdges, directed);
    force.start();
  };

  G.removeNode = function (n) {
    if (this.hasNode(n)) {
      selections.nodeSelection = removeNodes(this, [n], force, selections.nodeSelection);
      var edges = this.edgesIter([n]);

      if (this.isDirected()) {
        edges = _regeneratorRuntime.mark(function callee$2$0(self, outEdges) {
          return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                return context$3$0.delegateYield(outEdges, 't0', 1);

              case 1:
                return context$3$0.delegateYield(self.inEdgesIter([n]), 't1', 2);

              case 2:
              case 'end':
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        })(this, edges);
      }

      selections.edgeSelection = removeEdges(this, edges, force, selections.edgeSelection);

      force.resume();
    }
    proto.removeNode.call(this, n);
  };

  G.removeNodesFrom = function (nbunch) {
    nbunch = toArray(nbunch);
    selections.nodeSelection = removeNodes(this, nbunch, force, selections.nodeSelection);

    var edges = this.edgesIter(nbunch);
    if (this.isDirected()) {
      edges = _regeneratorRuntime.mark(function callee$2$0(self, outEdges) {
        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              return context$3$0.delegateYield(outEdges, 't0', 1);

            case 1:
              return context$3$0.delegateYield(self.inEdgesIter(nbunch), 't1', 2);

            case 2:
            case 'end':
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      })(this, edges);
    }

    selections.edgeSelection = removeEdges(this, edges, force, selections.edgeSelection);

    force.resume();
    proto.removeNodesFrom.call(this, nbunch);
  };

  G.removeEdge = function (u, v) {
    selections.edgeSelection = removeEdges(this, [[u, v]], force, selections.edgeSelection);

    force.resume();
    proto.removeEdge.call(this, u, v);
  };

  G.removeEdgesFrom = function (ebunch) {
    ebunch = toArray(ebunch);
    selections.edgeSelection = removeEdges(this, ebunch, force, selections.edgeSelection);

    force.resume();
    proto.removeEdgesFrom.call(G, ebunch);
  };

  G.clear = function () {
    selections.nodeSelection = selections.nodeSelection.data([], nodeKeyFunction);
    selections.nodeSelection.exit().remove();
    selections.edgeSelection = selections.edgeSelection.data([], edgeKeyFunction);
    selections.edgeSelection.exit().remove();
    force.nodes([]).links([]).resume();
    proto.clear.call(this);
  };

  /**
   * @type boolean
   */
  G.bound = true;
}

/**
* Returns True if the graph is bound to an output.
*
* @param {Graph} G A Graph
* @return {boolean}
*/
function isBound(G) {
  return G.bound;
}

/**
* Resets mutator methods to the originals
*
* @param {} G graph
* @param {boolean=} opt_clean (default=True)
*    If true, all D3 data is removed from the graph
*/
function unbind(G) {
  var optClean = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

  if (isBound(G)) {
    var proto = G.constructor.prototype;
    MUTATOR_METHODS.forEach(function (m) {
      return G[m] = proto[m];
    });
    delete G.bound;
    if (optClean) {
      clean(G);
    }
  }
}

/**
* Removes any D3 data from the Graph.
*
* @param {Graph} G A Graph
*/
function clean(G) {
  /*eslint no-unused-vars:0*/
  var _iteratorNormalCompletion10 = true;
  var _didIteratorError10 = false;
  var _iteratorError10 = undefined;

  try {
    for (var _iterator10 = _getIterator(G.nodesIter(true)), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
      var _step10$value = _slicedToArray(_step10.value, 2);

      var _ = _step10$value[0];
      var data = _step10$value[1];

      delete data[D3_DATA_NAME];
    }
  } catch (err) {
    _didIteratorError10 = true;
    _iteratorError10 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion10 && _iterator10['return']) {
        _iterator10['return']();
      }
    } finally {
      if (_didIteratorError10) {
        throw _iteratorError10;
      }
    }
  }

  var _iteratorNormalCompletion11 = true;
  var _didIteratorError11 = false;
  var _iteratorError11 = undefined;

  try {
    for (var _iterator11 = _getIterator(G.edgesIter(null, true)), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
      var _step11$value = _slicedToArray(_step11.value, 3);

      var u = _step11$value[0];
      var v = _step11$value[1];
      var data = _step11$value[2];

      delete data[D3_DATA_NAME];
    }
  } catch (err) {
    _didIteratorError11 = true;
    _iteratorError11 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion11 && _iterator11['return']) {
        _iterator11['return']();
      }
    } finally {
      if (_didIteratorError11) {
        throw _iteratorError11;
      }
    }
  }
}

/**
* Default D3 configuration.
*
* @type Object
* @private
*/
var DEFAULT_CONFIG = {
  layoutAttr: {
    charge: -120,
    linkDistance: 60
  },
  nodeShape: 'circle',
  nodeAttr: {
    r: 10 // radius of 10
  },
  nodeStyle: {
    'stroke-width': 2,
    stroke: '#333',
    fill: '#999',
    cursor: 'pointer'
  },
  edgeAttr: {},
  edgeStyle: {
    fill: '#000',
    'stroke-width': 3
  },
  labelAttr: {},
  labelStyle: {
    'text-anchor': 'middle',
    'dominant-baseline': 'central',
    cursor: 'pointer',
    '-webkit-user-select': 'none',
    fill: '#000'
  },
  edgeLabelAttr: {},
  edgeLabelStyle: {
    'font-size': '0.8em',
    'text-anchor': 'middle',
    '-webkit-user-select': 'none'
  },
  edgeLabelOffset: {
    x: 0,
    y: 0.5
  },
  withLabels: false,
  withEdgeLabels: false,
  edgeOffset: 10,
  weighted: false,
  weights: 'weight',
  weightedStroke: true,
  panZoom: {
    enabled: true,
    scale: true
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../_internals":20,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/sliced-to-array":111,"babel-runtime/regenerator":112}],72:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _JSNetworkXException2 = require('./JSNetworkXException');

var _JSNetworkXException3 = _interopRequireDefault(_JSNetworkXException2);

/**
 * Exception for unexpected termination of algorithms.
 * @constructor
 * @extends {JSNetworkXException}
 */

var JSNetworkXAlgorithmError = (function (_JSNetworkXException) {
  _inherits(JSNetworkXAlgorithmError, _JSNetworkXException);

  function JSNetworkXAlgorithmError(message) {
    _classCallCheck(this, JSNetworkXAlgorithmError);

    _get(Object.getPrototypeOf(JSNetworkXAlgorithmError.prototype), 'constructor', this).call(this, message);
    this.name = 'JSNetworkXAlgorithmError';
  }

  return JSNetworkXAlgorithmError;
})(_JSNetworkXException3['default']);

exports['default'] = JSNetworkXAlgorithmError;
module.exports = exports['default'];

},{"./JSNetworkXException":74,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109}],73:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _JSNetworkXException2 = require('./JSNetworkXException');

var _JSNetworkXException3 = _interopRequireDefault(_JSNetworkXException2);

var JSNetworkXError = (function (_JSNetworkXException) {
  _inherits(JSNetworkXError, _JSNetworkXException);

  function JSNetworkXError(message) {
    _classCallCheck(this, JSNetworkXError);

    _get(Object.getPrototypeOf(JSNetworkXError.prototype), 'constructor', this).call(this, message);
    this.name = 'JSNetworkXError';
  }

  return JSNetworkXError;
})(_JSNetworkXException3['default']);

exports['default'] = JSNetworkXError;
module.exports = exports['default'];

},{"./JSNetworkXException":74,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109}],74:[function(require,module,exports){
'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var JSNetworkXException = function JSNetworkXException(message) {
  _classCallCheck(this, JSNetworkXException);

  this.name = 'JSNetworkXException';
  this.message = message;
};

exports['default'] = JSNetworkXException;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":102}],75:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _JSNetworkXUnfeasible2 = require('./JSNetworkXUnfeasible');

var _JSNetworkXUnfeasible3 = _interopRequireDefault(_JSNetworkXUnfeasible2);

/**
 * Exception for algorithms that should return a path when running
 * on graphs where such a path does not exist.
 */

var JSNetworkXNoPath = (function (_JSNetworkXUnfeasible) {
  _inherits(JSNetworkXNoPath, _JSNetworkXUnfeasible);

  function JSNetworkXNoPath(message) {
    _classCallCheck(this, JSNetworkXNoPath);

    _get(Object.getPrototypeOf(JSNetworkXNoPath.prototype), 'constructor', this).call(this, message);
    this.name = 'JSNetworkXNoPath';
  }

  return JSNetworkXNoPath;
})(_JSNetworkXUnfeasible3['default']);

exports['default'] = JSNetworkXNoPath;
module.exports = exports['default'];

},{"./JSNetworkXUnfeasible":76,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109}],76:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _JSNetworkXAlgorithmError2 = require('./JSNetworkXAlgorithmError');

var _JSNetworkXAlgorithmError3 = _interopRequireDefault(_JSNetworkXAlgorithmError2);

/**
 * Exception raised by algorithms trying to solve a problem
 * instance that has no feasible solution.
 * @constructor
 * @extends {JSNetworkXAlgorithmError}
 */

var JSNetworkXUnfeasible = (function (_JSNetworkXAlgorithmError) {
  _inherits(JSNetworkXUnfeasible, _JSNetworkXAlgorithmError);

  function JSNetworkXUnfeasible(message) {
    _classCallCheck(this, JSNetworkXUnfeasible);

    _get(Object.getPrototypeOf(JSNetworkXUnfeasible.prototype), 'constructor', this).call(this, message);
    this.name = 'JSNetworkXUnfeasible';
  }

  return JSNetworkXUnfeasible;
})(_JSNetworkXAlgorithmError3['default']);

exports['default'] = JSNetworkXUnfeasible;
module.exports = exports['default'];

},{"./JSNetworkXAlgorithmError":72,"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107,"babel-runtime/helpers/interop-require-default":109}],77:[function(require,module,exports){
'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var KeyError = (function (_Error) {
  _inherits(KeyError, _Error);

  function KeyError(message) {
    _classCallCheck(this, KeyError);

    _get(Object.getPrototypeOf(KeyError.prototype), 'constructor', this).call(this);
    this.name = 'KeyError';
    this.message = message;
  }

  return KeyError;
})(Error);

exports['default'] = KeyError;
module.exports = exports['default'];

},{"babel-runtime/helpers/class-call-check":102,"babel-runtime/helpers/get":106,"babel-runtime/helpers/inherits":107}],78:[function(require,module,exports){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _KeyError = require('./KeyError');

var _KeyError2 = _interopRequireDefault(_KeyError);

var _JSNetworkXAlgorithmError = require('./JSNetworkXAlgorithmError');

var _JSNetworkXAlgorithmError2 = _interopRequireDefault(_JSNetworkXAlgorithmError);

var _JSNetworkXError = require('./JSNetworkXError');

var _JSNetworkXError2 = _interopRequireDefault(_JSNetworkXError);

var _JSNetworkXException = require('./JSNetworkXException');

var _JSNetworkXException2 = _interopRequireDefault(_JSNetworkXException);

var _JSNetworkXNoPath = require('./JSNetworkXNoPath');

var _JSNetworkXNoPath2 = _interopRequireDefault(_JSNetworkXNoPath);

var _JSNetworkXUnfeasible = require('./JSNetworkXUnfeasible');

var _JSNetworkXUnfeasible2 = _interopRequireDefault(_JSNetworkXUnfeasible);

exports.KeyError = _KeyError2['default'];
exports.JSNetworkXAlgorithmError = _JSNetworkXAlgorithmError2['default'];
exports.JSNetworkXError = _JSNetworkXError2['default'];
exports.JSNetworkXException = _JSNetworkXException2['default'];
exports.JSNetworkXNoPath = _JSNetworkXNoPath2['default'];
exports.JSNetworkXUnfeasible = _JSNetworkXUnfeasible2['default'];

},{"./JSNetworkXAlgorithmError":72,"./JSNetworkXError":73,"./JSNetworkXException":74,"./JSNetworkXNoPath":75,"./JSNetworkXUnfeasible":76,"./KeyError":77,"babel-runtime/helpers/interop-require-default":109}],79:[function(require,module,exports){
'use strict';

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.fullRaryTree = fullRaryTree;
exports.balancedTree = balancedTree;
exports.completeGraph = completeGraph;
exports.cycleGraph = cycleGraph;
exports.emptyGraph = emptyGraph;
exports.grid2dGraph = grid2dGraph;
exports.nullGraph = nullGraph;
exports.pathGraph = pathGraph;
exports.trivialGraph = trivialGraph;
var marked0$0 = [treeEdges].map(_regeneratorRuntime.mark);

var _classesGraph = require('../classes/Graph');

var _classesGraph2 = _interopRequireDefault(_classesGraph);

var _internals = require('../_internals');

/**
 * @param {number} n nodes
 * @param {number} r breadth
 * @return {Iterator}
 */
function treeEdges(n, r) {
  var nodes, parents, source, i, target;
  return _regeneratorRuntime.wrap(function treeEdges$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        nodes = (0, _internals.genRange)(n);

        if (!(n === 0)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt('return');

      case 3:
        parents = [(0, _internals.next)(nodes)];

      case 4:
        if (!(parents.length > 0)) {
          context$1$0.next = 20;
          break;
        }

        source = parents.shift();
        i = 0;

      case 7:
        if (!(i < r)) {
          context$1$0.next = 18;
          break;
        }

        target = nodes.next();

        if (!target.done) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt('return');

      case 11:
        target = target.value;
        parents.push(target);
        context$1$0.next = 15;
        return (0, _internals.tuple2)(source, target);

      case 15:
        i++;
        context$1$0.next = 7;
        break;

      case 18:
        context$1$0.next = 4;
        break;

      case 20:
      case 'end':
        return context$1$0.stop();
    }
  }, marked0$0[0], this);
}

/**
 * Creates a full r-ary tree of n vertices.
 *
 * Sometimes called a k-ary, n-ary, or m-ary tree.  "... all non-leaf
 * vertices have exactly r children and all levels are full except
 * for some rightmost position of the bottom level (if a leaf at the
 * bottom level is missing, then so are all of the leaves to its
 * right." (1)
 *
 * ### References
 *
 * [1] An introduction to data structures and algorithms,
 *    James Andrew Storer,  Birkhauser Boston 2001, (page 225).
 *
 * @param {number} r branching factor of the tree
 * @param {number} n number of nodes in the tree
 * @param {Graph=} optCreateUsing
 *   Use specified type to construct graph
 * @return {Graph} An r-ary tree with n nodes.
 */

function fullRaryTree(r, n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
}

/**
 * Return the perfectly balanced r-tree of height h.
 *
 * This is the rooted tree where all leaves are at distance h from
 * the root. The root has degree r and all other internal nodes have
 * degree r+1.
 *
 * Node labels are the integers 0 (the root) up to  numberOfNodes - 1.
 *
 * Also referred to as a complete r-ary tree.
 *
 * @param {number} r  Branching factor of the tree
 * @param {number} h Height of the tree
 * @param {Graph} optCreateUsing
 *    Use specified type to construct graph
 * @return {Graph}
 */

function balancedTree(r, h, optCreateUsing) {
  var n = r === 1 ? h : Math.floor((1 - Math.pow(r, h + 1)) / (1 - r));
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
}

//TODO: barbell_graph

/**
 * Return the complete graph `$K_n$` with n nodes.
 *
 * Node labels are the integers 0 to n-1.
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function completeGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = 'complete_graph(' + n + ')';
  if (n > 1) {
    G.addEdgesFrom(G.isDirected() ? (0, _internals.genPermutations)((0, _internals.range)(n), 2) : (0, _internals.genCombinations)((0, _internals.range)(n), 2));
  }
  return G;
}

//TODO: complete_bipartite_graph
//TODO: circular_ladder_graph

/**
 * Return the cycle graph C_n over n nodes.
 *
 * `$C_n$` is the n-path with two end-nodes connected.
 *
 * Node labels are the integers 0 to n-1
 * If `optCreateUsing` is a DiGraph, the direction is in increasing order.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function cycleGraph(n, optCreateUsing) {
  var G = pathGraph(n, optCreateUsing);
  G.name = 'cycle_graph(' + n + ')';
  if (n > 1) {
    G.addEdge(n - 1, 0);
  }
  return G;
}

//TODO: dorogovtsev_goltsev_mendes_graph

/**
 * Return the empty graph with n nodes and zero edges.
 *
 * Node labels are the integers 0 to n-1
 *
 * ### Example
 *
 * ```
 * var G = jsnx.emptyGraph(10)
 * G.numberOfNodes()
 * // 10
 * G.numberOfEdges()
 * // 0
 * ```
 *
 * The variable `optCreateUsing` should point to a "graph"-like object that
 * will be cleaned (nodes and edges will be removed) and refitted as
 * an empty "graph" with n nodes with integer labels. This capability
 * is useful for specifying the class-nature of the resulting empty
 * "graph" (i.e. Graph, DiGraph, MyWeirdGraphClass, etc.).
 *
 * The variable `optCreateUsing` has two main uses:
 * Firstly, the variable `optCreateUsing` can be used to create an
 * empty digraph, network,etc.  For example,
 *
 * ```
 * var n = 10;
 * var G = jsnx.emptyGraph(n, new jsnx.DiGraph());
 * ```
 *
 * will create an empty digraph on n nodes.
 *
 * Secondly, one can pass an existing graph (digraph, pseudograph,
 * etc.) via `optCreateUsing`. For example, if `G` is an existing graph
 * (resp. digraph, pseudograph, etc.), then `emptyGraph(n,G)`
 * will empty G (i.e. delete all nodes and edges using `G.clear()` in
 * base) and then add n nodes and zero edges, and return the modified
 * graph (resp. digraph, pseudograph, etc.).
 *
 * @see createEmptyCopy
 *
 * @param {?number=} optN The number of nodes to add to the graph
 * @param {?Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function emptyGraph(optN, optCreateUsing) {
  if ((0, _internals.isGraph)(optN)) {
    optCreateUsing = optN;
    optN = null;
  }
  if (optN == null) {
    optN = 0;
  }

  var G;

  if (optCreateUsing == null) {
    // default empty graph is a simple graph
    G = new _classesGraph2['default']();
  } else {
    G = optCreateUsing;
    G.clear();
  }

  G.addNodesFrom((0, _internals.genRange)(optN));
  G.name = 'emptyGraph(' + optN + ')';
  return G;
}

/**
 * Return the 2d grid graph of mxn nodes,
 * each connected to its nearest neighbors.
 * Optional argument `optPeriodic` will connect
 * boundary nodes via periodic boundary conditions.
 *
 * @param {number} rows Number of rows
 * @param {number} columns Number of columns
 * @param {boolean=} optPeriodic
 * @param {Graph=} optCreateUsing
 * @return {Graph}
 */

function grid2dGraph(rows, columns) {
  var optPeriodic = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
  var optCreateUsing = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

  var G = emptyGraph(0, optCreateUsing);
  G.name = 'grid2dGraph';
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addNode([i, j]);
    }
  }
  for (i = 1; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addEdge([i, j], [i - 1, j]);
    }
  }
  for (i = 0; i < rows; i++) {
    for (j = 1; j < columns; j++) {
      G.addEdge([i, j], [i, j - 1]);
    }
  }
  if (G.isDirected()) {
    for (i = 0; i < rows - 1; i++) {
      for (j = 0; j < columns; j++) {
        G.addEdge([i, j], [i + 1, j]);
      }
    }
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns - 1; j++) {
        G.addEdge([i, j], [i, j + 1]);
      }
    }
  }

  if (optPeriodic) {
    if (columns > 2) {
      for (i = 0; i < rows; i++) {
        G.addEdge([i, 0], [i, columns - 1]);
      }
      if (G.isDirected()) {
        for (i = 0; i < rows; i++) {
          G.addEdge([i, columns - 1], [i, 0]);
        }
      }
    }
    if (rows > 2) {
      for (j = 0; j < columns; j++) {
        G.addEdge([0, j], [rows - 1, j]);
      }
      if (G.isDirected()) {
        for (j = 0; j < columns; j++) {
          G.addEdge([rows - 1, j], [0, j]);
        }
      }
    }
    G.name = 'periodicGrid2dGraph(' + rows + ', ' + columns + ')';
  }
  return G;
}

//TODO: grid_graph
//TODO: hypercube_graph
//TODO: ladder_graph
//TODO: lollipop_graph

/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function nullGraph(optCreateUsing) {
  var G = emptyGraph(0, optCreateUsing);
  G.name = 'nullGraph()';
  return G;
}

/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */

function pathGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = 'pathGraph(' + n + ')';
  G.addEdgesFrom((0, _internals.mapIterator)((0, _internals.genRange)(n - 1), function (v) {
    return (0, _internals.tuple2)(v, v + 1);
  }));
  return G;
}

//TODO: star_graph

/**
 * Return the Trivial graph with one node (with integer label 0) and no edges.
 *
 * @param {Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */

function trivialGraph(optCreateUsing) {
  var G = emptyGraph(1, optCreateUsing);
  G.name = 'nullGraph()';
  return G;
}

//TODO: wheel_graph

// helper function for trees
// yields edges in rooted tree at 0 with n nodes and branching ratio r

/*jshint unused:false*/

},{"../_internals":20,"../classes/Graph":61,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/regenerator":112}],80:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.havelHakimiGraph = havelHakimiGraph;
exports.genHavelHakimiGraph = genHavelHakimiGraph;

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _algorithmsGraphical = require('../algorithms/graphical');

var _classic = require('./classic');

var _internalsSprintf = require('../_internals/sprintf');

var _internalsSprintf2 = _interopRequireDefault(_internalsSprintf);

// TODO: configuration_model
// TODO: directed_configuration_model
// TODO: expected_degree_graph

/**
 * Return a simple graph with given degree sequence constructed
 * using the Havel-Hakimi algorithm.
 *
 * ### Notes
 *
 * The Havel-Hakimi algorithm constructs a simple graph by
 * successively connecting the node of highest degree to other nodes
 * of highest degree, resorting remaining nodes by degree, and
 * repeating the process. The resulting graph has a high
 * degree-associativity. Nodes are labeled `1,.., degreeSequence.length`,
 * corresponding to their position in `degreeSequence`.
 *
 * The basic algorithm is from Hakimi (1) and was generalized by
 * Kleitman and Wang (2).
 *
 * ### References
 *
 * [1] Hakimi S.,
 *   On Realizability of a Set of Integers as Degrees of the
 *   Vertices of a linear Graph. I,
 *   Journal of SIAM, 10(3), pp. 496-506 (1962)
 * [2] Kleitman D.J. and Wang D.L.
 *   Algorithms for Constructing Graphs and Digraphs with Given Valences and
 *   Factors,
 *   Discrete Mathematics, 6(1), pp. 79-88 (1973)
 *
 * @param {Iterable} degreeSequence list of integers
 *      Each integer corresponds to the degree of a node (need not be sorted).
 * @param {Graph} optCreateUsing
 *      Return graph of this type. The instance will be cleared.
 *      Directed graphs are not allowed.
 * @return {Graph}
 */
'use strict';

function havelHakimiGraph(degreeSequence, optCreateUsing) {
  degreeSequence = _Array$from(degreeSequence);
  if (!(0, _algorithmsGraphical.isValidDegreeSequence)(degreeSequence)) {
    throw new _exceptionsJSNetworkXError2['default']('Invalid degree sequence');
  }
  if (optCreateUsing != null) {
    if (optCreateUsing.isDirected()) {
      throw new _exceptionsJSNetworkXError2['default']('Directed Graph not supported');
    }
  }
  var numberOfNodes = degreeSequence.length;
  var G = (0, _classic.emptyGraph)(numberOfNodes, optCreateUsing);
  var numDegrees = new Array(numberOfNodes);
  for (var i = 0; i < numberOfNodes; i++) {
    numDegrees[i] = [];
  }

  var maxDegree = 0;
  var degreeSum = 0;
  var n = 0;

  for (i = 0; i < numberOfNodes; i++) {
    var degree = degreeSequence[i];
    // process only the non-zero integers
    if (degree > 0) {
      numDegrees[degree].push(n);
      maxDegree = Math.max(maxDegree, degree);
      degreeSum += degree;
      n += 1;
    }
  }

  // Return graph if no edges
  if (n === 0) {
    return G;
  }

  // form list of [stubs,name] for each node.
  var modstubs = new Array(maxDegree + 1);
  for (i = 0; i < maxDegree + 1; i++) {
    modstubs[i] = [0, 0];
  }
  // Successively reduce degree sequence by removing the maximum degree
  while (n > 0) {
    // Retrieve the maximum degree in the sequence
    while (numDegrees[maxDegree].length === 0) {
      maxDegree -= 1;
    }
    // If there are not enough stubs to connect to, then the sequence is not
    // graphical
    if (maxDegree > n - 1) {
      throw new _exceptionsJSNetworkXError2['default']('Non-graphical integer sequence');
    }
    // Remove largest stub in list
    var source = numDegrees[maxDegree].pop();
    n -= 1;
    // Reduce the next maxDegree largest stubs
    var mslen = 0;
    var k = maxDegree;
    for (i = 0; i < maxDegree; i++) {
      while (numDegrees[k].length === 0) {
        k -= 1;
      }
      var target = numDegrees[k].pop();
      G.addEdge(source, target);
      n -= 1;
      if (k > 1) {
        modstubs[mslen] = [k - 1, target];
        mslen += 1;
      }
    }
    // Add back to the list any nonzero stubs that were removed
    for (i = 0; i < mslen; i++) {
      var _modstubs$i = _slicedToArray(modstubs[i], 2);

      var stubval = _modstubs$i[0];
      var stubtarget = _modstubs$i[1];

      numDegrees[stubval].push(stubtarget);
      n += 1;
    }
  }

  G.name = (0, _internalsSprintf2['default'])('havelHakimiGraph %s nodes %d edges', G.order(), G.size());
  return G;
}

// TODO: directed_havel_hakimi_graph
// TODO: degree_sequence_tree
// TODO: random_degree_sequence_graph
// TODO: DegreeSequenceRandomGraph

function genHavelHakimiGraph(degreeSequence, optCreateUsing) {
  return (0, _internalsDelegate2['default'])('havelHakimiGraph', [degreeSequence, optCreateUsing]);
}

},{"../_internals/delegate":12,"../_internals/sprintf":38,"../algorithms/graphical":49,"../exceptions/JSNetworkXError":73,"./classic":79,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],81:[function(require,module,exports){
'use strict';

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _classic = require('./classic');

var classic = _interopRequireWildcard(_classic);

var _degreeSequence = require('./degreeSequence');

var degreeSequence = _interopRequireWildcard(_degreeSequence);

var _randomGraphs = require('./randomGraphs');

var randomGraphs = _interopRequireWildcard(_randomGraphs);

var _small = require('./small');

var small = _interopRequireWildcard(_small);

var _social = require('./social');

var social = _interopRequireWildcard(_social);

exports.classic = classic;
exports.degreeSequence = degreeSequence;
exports.randomGraphs = randomGraphs;
exports.small = small;
exports.social = social;

_defaults(exports, _interopExportWildcard(_classic, _defaults));

_defaults(exports, _interopExportWildcard(_degreeSequence, _defaults));

_defaults(exports, _interopExportWildcard(_randomGraphs, _defaults));

_defaults(exports, _interopExportWildcard(_small, _defaults));

_defaults(exports, _interopExportWildcard(_social, _defaults));

},{"./classic":79,"./degreeSequence":80,"./randomGraphs":82,"./small":83,"./social":84,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-wildcard":110}],82:[function(require,module,exports){
'use strict';

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.fastGnpRandomGraph = fastGnpRandomGraph;
exports.genFastGnpRandomGraph = genFastGnpRandomGraph;
exports.gnpRandomGraph = gnpRandomGraph;
exports.genGnpRandomGraph = genGnpRandomGraph;
exports.binomialGraph = binomialGraph;
exports.genBinomialGraph = genBinomialGraph;
exports.erdosRenyiGraph = erdosRenyiGraph;
exports.genErdosRenyiGraph = genErdosRenyiGraph;

var _internalsDelegate = require('../_internals/delegate');

var _internalsDelegate2 = _interopRequireDefault(_internalsDelegate);

var _classesDiGraph = require('../classes/DiGraph');

var _classesDiGraph2 = _interopRequireDefault(_classesDiGraph);

var _classesGraph = require('../classes/Graph');

var _classesGraph2 = _interopRequireDefault(_classesGraph);

var _classic = require('./classic');

var _internals = require('../_internals');

//
//-------------------------------------------------------------------------
//  Some Famous Random Graphs
//-------------------------------------------------------------------------

/**
 * Return a random graph `$G_{n,p}$` (Erdős-Rényi graph, binomial graph).
 *
 * The `$G_{n,p}$` graph algorithm chooses each of the `$[n(n-1)]/2$`
 * (undirected) or `$n(n-1)$` (directed) possible edges with probability `$p$`.
 *
 * This algorithm is `$O(n+m)$` where `$m$` is the expected number of
 * edges `$m = p*n*(n-1)/2$`.
 *
 * It should be faster than `gnpRandomGraph` when `p` is small and
 * the expected number of edges is small (sparse graph).
 *
 * ### References
 *
 * [1] Vladimir Batagelj and Ulrik Brandes,
 *     "Efficient generation of large random networks",
 *     Phys. Rev. E, 71, 036113, 2005.
 *
 * @param {number} n The number of nodes
 * @param {number} p Probability for edge creation
 * @param {boolean} optDirected If true return a directed graph
 * @return {Graph}
 */
'use strict';

function fastGnpRandomGraph(n, p) {
  var optDirected = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var G = (0, _classic.emptyGraph)(n);
  G.name = (0, _internals.sprintf)('fastGnpRandomGraph(%s, %s)', n, p);

  if (p <= 0 || p >= 1) {
    return gnpRandomGraph(n, p, optDirected);
  }
  var v;
  var w = -1;
  var lp = Math.log(1 - p);
  var lr;

  if (optDirected) {
    // Nodes in graph are from 0,n-1 (start with v as the first node index).
    v = 0;
    G = new _classesDiGraph2['default'](G);
    while (v < n) {
      lr = Math.log(1 - Math.random());
      w = w + 1 + Math.floor(lr / lp);
      if (v === w) {
        // avoid self loops
        w = w + 1;
      }
      while (w >= n && v < n) {
        w = w - n;
        v = v + 1;
        if (v === w) {
          // avoid self loops
          w = w + 1;
        }
      }
      if (v < n) {
        G.addEdge(v, w);
      }
    }
  } else {
    v = 1; // Nodes in graph are from 0, n-1 (this is the second node index).
    while (v < n) {
      lr = Math.log(1 - Math.random());
      w = w + 1 + Math.floor(lr / lp);
      while (w >= v && v < n) {
        w = w - v;
        v = v + 1;
      }
      if (v < n) {
        G.addEdge(v, w);
      }
    }
  }
  return G;
}

/**
 * Return a random graph `$G_{n,p}$` (Erdős-Rényi graph, binomial graph).
 *
 * Chooses each of the possible edges with probability `p.
 *
 * This is also called `binomialGraph` and `erdosRenyiGraph`.
 *
 * This is an `$O(n^2)$` algorithm.  For sparse graphs (small `$p$`) see
 * `fastGnpRandomGraph for a faster algorithm.
 *
 * @param {number} n The number of nodes
 * @param {number} p Probability for edge creation
 * @param {boolean} optDirected
 *  If true returns a directed graph
 * @return {Graph}
 */

function genFastGnpRandomGraph(n, p, optDirected) {
  return (0, _internalsDelegate2['default'])('fastGnpRandomGraph', [n, p, optDirected]);
}

function gnpRandomGraph(n, p) {
  var optDirected = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  var G = optDirected ? new _classesDiGraph2['default']() : new _classesGraph2['default']();
  var edges;
  var rangeN = (0, _internals.range)(n);

  G.addNodesFrom(rangeN);
  G.name = (0, _internals.sprintf)('gnpRandomGraph(%s, %s)', n, p);
  if (p <= 0) {
    return G;
  }
  if (p >= 1) {
    return (0, _classic.completeGraph)(n, G);
  }

  edges = G.isDirected() ? (0, _internals.genPermutations)(rangeN, 2) : (0, _internals.genCombinations)(rangeN, 2);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _getIterator(edges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var edge = _step.value;

      if (Math.random() < p) {
        G.addEdge(edge[0], edge[1]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return G;
}

/**
 * @alias gnpRandomGraph
 */

function genGnpRandomGraph(n, p, optDirected) {
  return (0, _internalsDelegate2['default'])('gnpRandomGraph', [n, p, optDirected]);
}

function binomialGraph(n, p, optDirected) {
  return gnpRandomGraph(n, p, optDirected);
}

/**
 * @alias gnpRandomGraph
 */

function genBinomialGraph(n, p, optDirected) {
  return (0, _internalsDelegate2['default'])('binomialGraph', [n, p, optDirected]);
}

function erdosRenyiGraph(n, p, optDirected) {
  return gnpRandomGraph(n, p, optDirected);
}

//TODO: newman_watts_strogatz_graph
//TODO: watts_strogatz_graph
//TODO: connected_watts_strogatz_graph
//TODO: random_regular_graph
//TODO: _random_subset
//TODO: barabasi_albert_graph
//TODO: powerlaw_cluster_graph
//TODO: random_lobster
//TODO: random_shell_graph
//TODO: random_powerlaw_tree
//TODO: random_powerlaw_tree_sequence

function genErdosRenyiGraph(n, p, optDirected) {
  return (0, _internalsDelegate2['default'])('erdosRenyiGraph', [n, p, optDirected]);
}

},{"../_internals":20,"../_internals/delegate":12,"../classes/DiGraph":60,"../classes/Graph":61,"./classic":79,"babel-runtime/core-js/get-iterator":89,"babel-runtime/helpers/interop-require-default":109}],83:[function(require,module,exports){
'use strict';

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.makeSmallUndirectedGraph = makeSmallUndirectedGraph;
exports.makeSmallGraph = makeSmallGraph;
exports.bullGraph = bullGraph;
exports.krackhardtKiteGraph = krackhardtKiteGraph;

var _exceptionsJSNetworkXError = require('../exceptions/JSNetworkXError');

var _exceptionsJSNetworkXError2 = _interopRequireDefault(_exceptionsJSNetworkXError);

var _classic = require('./classic');

var _internals = require('../_internals');

/**
 * Return a small undirected graph described by `graphDescription`.
 *
 * @see makeSmallGraph.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=}
 *    optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function makeSmallUndirectedGraph(graphDescription, optCreateUsing) {
  if (optCreateUsing != null && optCreateUsing.isDirected()) {
    throw new _exceptionsJSNetworkXError2['default']('Directed Graph not supported');
  }
  return makeSmallGraph(graphDescription, optCreateUsing);
}

/**
 * Return the small graph described by graph_description.
 *
 * `graphDescription` is a list of the form `{type, name, n, list}`.
 *
 * Here `ltype` is one of `"adjacencylist"` or `"edgelist"`,
 * `name` is the name of the graph and `n` the number of nodes.
 * This constructs a graph of `n` nodes with integer labels 0,..,n-1.
 *
 * If `ltype="adjacencylist"` then `xlist` is an adjacency list
 * with exactly `n` entries, in with the `j`'th entry (which can be empty)
 * specifies the nodes connected to vertex `j`.
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[1,3],[2,4],[1,3]]
 * });
 * ```
 *
 * or, since we do not need to add edges twice,
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[3],[4],[]]]
 * });
 * ```
 *
 * If `ltype="edgelist"` then `xlist` is an edge list written as
 * `[[v1,w2],[v2,w2],...,[vk,wk]]`, where `vj` and `wj` integers in the range
 * 1,..,n
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "edgelist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[1,2],[3,4],[2,3],[4,1]]]
 * });
 * ```
 *
 * Use the `optCreateUsing` argument to choose the graph class/type.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function makeSmallGraph(_ref, optCreateUsing) {
  var type = _ref.type;
  var name = _ref.name;
  var n = _ref.n;
  var list = _ref.list;

  var G = (0, _classic.emptyGraph)(n, optCreateUsing);
  var nodes = G.nodes();

  if (type === 'adjacencylist') {
    if (list.length !== n) {
      throw new _exceptionsJSNetworkXError2['default']('invalid graphDescription');
    }
    nodes.forEach(function (v) {
      (0, _internals.forEach)(list[v], function (u) {
        return G.addEdge(u - 1, v);
      });
    });
  } else if (type === 'edgelist') {
    (0, _internals.forEach)(list, function (_ref2) {
      var _ref22 = _slicedToArray(_ref2, 2);

      var v = _ref22[0];
      var u = _ref22[1];

      v -= 1;
      u -= 1;
      if (v < 0 || v > n - 1 || u < 0 || u > n - 1) {
        throw new _exceptionsJSNetworkXError2['default']('invalid graphDescription');
      } else {
        G.addEdge(v, u);
      }
    });
  }
  G.name = name;
  return G;
}

// TODO: LCF_graph

/**
 * Return the Bull graph.
 *
 * @param {Graph=} optCreateUsing  Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function bullGraph(optCreateUsing) {
  var type = 'adjacencylist';
  var name = 'Bull Graph';
  var n = 5;
  var list = [[2, 3], [1, 3, 4], [1, 2, 5], [2], [3]];

  return makeSmallUndirectedGraph({ type: type, name: name, n: n, list: list }, optCreateUsing);
}

// TODO: chvatal_graph
// TODO: cubical_graph
// TODO: desargues_graph
// TODO: diamond_graph
// TODO: dodecahedral_graph
// TODO: frucht_graph
// TODO: heawood_graph
// TODO: house_graph
// TODO: house_x_graph
// TODO: icosahedral_graph

/**
 * Return the Krackhardt Kite Social Network.
 *
 * A 10 actor social network introduced by David Krackhardt
 * to illustrate: degree, betweenness, centrality, closeness, etc.
 * The traditional labeling is:
 * Andre=1, Beverley=2, Carol=3, Diane=4,
 * Ed=5, Fernando=6, Garth=7, Heather=8, Ike=9, Jane=10.
 *
 * @param {Graph=} opt_create_using Graph instance to empty and add nodes to.
 * @return {Graph}
 */

function krackhardtKiteGraph(optCreateUsing) {
  var type = 'adjacencylist';
  var name = 'Krackhardt Kite Social Network';
  var n = 10;
  var list = [[2, 3, 4, 6], [1, 4, 5, 7], [1, 4, 6], [1, 2, 3, 5, 6, 7], [2, 4, 7], [1, 3, 4, 7, 8], [2, 4, 5, 6, 8], [6, 7, 9], [8, 10], [9]];

  return makeSmallUndirectedGraph({ type: type, name: name, n: n, list: list }, optCreateUsing);
}

// TODO: moebius_kantor_graph
// TODO: octahedral_graph
// TODO: pappus_graph
// TODO: petersen_graph
// TODO: sedgewick_maze_graph
// TODO: tetrahedral_graph
// TODO: truncated_cube_graph
// TODO: truncated_tetrahedron_graph
// TODO: tutte_graph

},{"../_internals":20,"../exceptions/JSNetworkXError":73,"./classic":79,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/sliced-to-array":111}],84:[function(require,module,exports){
'use strict';
/**
 * @fileoverview Famous social networkx
 */

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.karateClubGraph = karateClubGraph;
exports.davisSouthernWomenGraph = davisSouthernWomenGraph;
exports.florentineFamiliesGraph = florentineFamiliesGraph;

var _classesGraph = require('../classes/Graph');

var _classesGraph2 = _interopRequireDefault(_classesGraph);

var _internalsRange = require('../_internals/range');

var _internalsRange2 = _interopRequireDefault(_internalsRange);

/**
 * Return Zachary's Karate club graph.
 *
 * ### References
 *
 * [1] Zachary W.
 *     An information flow model for conflict and fission in small groups.
 *     Journal of Anthropological Research, 33, 452-473, (1977).
 *
 * [2] Data file from:
 *     <http://vlado.fmf.uni-lj.si/pub/networks/data/Ucinet/UciData.htm>
 *
 * @return {Graph}
 */

function karateClubGraph() {
  var G = new _classesGraph2['default']();
  G.addNodesFrom((0, _internalsRange2['default'])(34));
  G.name = "Zachary's Karate Club";

  var zacharyData = ['0 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0', '1 0 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0', '1 1 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0', '1 1 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1', '0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1', '1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 1 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 0 0', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1', '0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1', '0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1', '0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 1', '0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1', '1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1', '0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 0 1 0 1 1 0 0 0 0 0 1 1 1 0 1', '0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 1 0 0 1 1 1 0 1 1 0 0 1 1 1 1 1 1 1 0'];

  zacharyData.forEach(function (line, row) {
    var thisrow = line.split(' ');
    thisrow.forEach(function (val, col) {
      if (val === '1') {
        G.addEdge(row, col); // col goes from 0,33
      }
    });
  });

  G.addNodesFrom([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 16, 17, 19, 21], { club: 'Mr. Hi' });
  G.addNodesFrom([9, 14, 15, 18, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], { club: 'Officer' });

  return G;
}

/**
 * Return Davis Southern women social network.
 *
 * This is a bipartite graph.
 *
 * ### References
 *
 * [1] A. Davis, Gardner, B. B., Gardner, M. R., 1941. Deep South.
 * University of Chicago Press, Chicago, IL.
 *
 * @return {Graph}
 */

function davisSouthernWomenGraph() {
  var G = new _classesGraph2['default']();
  // top nodes
  G.addNodesFrom(['Evelyn Jefferson', 'Laura Mandeville', 'Theresa Anderson', 'Brenda Rogers', 'Charlotte McDowd', 'Frances Anderson', 'Eleanor Nye', 'Pearl Oglethorpe', 'Ruth DeSand', 'Verne Sanderson', 'Myra Liddel', 'Katherina Rogers', 'Sylvia Avondale', 'Nora Fayette', 'Helen Lloyd', 'Dorothy Murchison', 'Olivia Carleton', 'Flora Price'], { bipartite: 0 });

  // bottom nodes
  G.addNodesFrom(['E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14'], { bipartite: 1 });

  G.add_edges_from([['Evelyn Jefferson', 'E1'], ['Evelyn Jefferson', 'E2'], ['Evelyn Jefferson', 'E3'], ['Evelyn Jefferson', 'E4'], ['Evelyn Jefferson', 'E5'], ['Evelyn Jefferson', 'E6'], ['Evelyn Jefferson', 'E8'], ['Evelyn Jefferson', 'E9'], ['Laura Mandeville', 'E1'], ['Laura Mandeville', 'E2'], ['Laura Mandeville', 'E3'], ['Laura Mandeville', 'E5'], ['Laura Mandeville', 'E6'], ['Laura Mandeville', 'E7'], ['Laura Mandeville', 'E8'], ['Theresa Anderson', 'E2'], ['Theresa Anderson', 'E3'], ['Theresa Anderson', 'E4'], ['Theresa Anderson', 'E5'], ['Theresa Anderson', 'E6'], ['Theresa Anderson', 'E7'], ['Theresa Anderson', 'E8'], ['Theresa Anderson', 'E9'], ['Brenda Rogers', 'E1'], ['Brenda Rogers', 'E3'], ['Brenda Rogers', 'E4'], ['Brenda Rogers', 'E5'], ['Brenda Rogers', 'E6'], ['Brenda Rogers', 'E7'], ['Brenda Rogers', 'E8'], ['Charlotte McDowd', 'E3'], ['Charlotte McDowd', 'E4'], ['Charlotte McDowd', 'E5'], ['Charlotte McDowd', 'E7'], ['Frances Anderson', 'E3'], ['Frances Anderson', 'E5'], ['Frances Anderson', 'E6'], ['Frances Anderson', 'E8'], ['Eleanor Nye', 'E5'], ['Eleanor Nye', 'E6'], ['Eleanor Nye', 'E7'], ['Eleanor Nye', 'E8'], ['Pearl Oglethorpe', 'E6'], ['Pearl Oglethorpe', 'E8'], ['Pearl Oglethorpe', 'E9'], ['Ruth DeSand', 'E5'], ['Ruth DeSand', 'E7'], ['Ruth DeSand', 'E8'], ['Ruth DeSand', 'E9'], ['Verne Sanderson', 'E7'], ['Verne Sanderson', 'E8'], ['Verne Sanderson', 'E9'], ['Verne Sanderson', 'E12'], ['Myra Liddel', 'E8'], ['Myra Liddel', 'E9'], ['Myra Liddel', 'E10'], ['Myra Liddel', 'E12'], ['Katherina Rogers', 'E8'], ['Katherina Rogers', 'E9'], ['Katherina Rogers', 'E10'], ['Katherina Rogers', 'E12'], ['Katherina Rogers', 'E13'], ['Katherina Rogers', 'E14'], ['Sylvia Avondale', 'E7'], ['Sylvia Avondale', 'E8'], ['Sylvia Avondale', 'E9'], ['Sylvia Avondale', 'E10'], ['Sylvia Avondale', 'E12'], ['Sylvia Avondale', 'E13'], ['Sylvia Avondale', 'E14'], ['Nora Fayette', 'E6'], ['Nora Fayette', 'E7'], ['Nora Fayette', 'E9'], ['Nora Fayette', 'E10'], ['Nora Fayette', 'E11'], ['Nora Fayette', 'E12'], ['Nora Fayette', 'E13'], ['Nora Fayette', 'E14'], ['Helen Lloyd', 'E7'], ['Helen Lloyd', 'E8'], ['Helen Lloyd', 'E10'], ['Helen Lloyd', 'E11'], ['Helen Lloyd', 'E12'], ['Dorothy Murchison', 'E8'], ['Dorothy Murchison', 'E9'], ['Olivia Carleton', 'E9'], ['Olivia Carleton', 'E11'], ['Flora Price', 'E9'], ['Flora Price', 'E11']]);

  return G;
}

/**
 * Return Florentine families graph.
 *
 * ### References
 *
 * [1] Ronald L. Breiger and Philippa E. Pattison
 * Cumulated social roles: The duality of persons and their algebras,1
 * Social Networks, Volume 8, Issue 3, September 1986, Pages 215-256
 *
 * @return {Graph}
 */

function florentineFamiliesGraph() {
  var G = new _classesGraph2['default']();
  G.addEdge('Acciaiuoli', 'Medici');
  G.addEdge('Castellani', 'Peruzzi');
  G.addEdge('Castellani', 'Strozzi');
  G.addEdge('Castellani', 'Barbadori');
  G.addEdge('Medici', 'Barbadori');
  G.addEdge('Medici', 'Ridolfi');
  G.addEdge('Medici', 'Tornabuoni');
  G.addEdge('Medici', 'Albizzi');
  G.addEdge('Medici', 'Salviati');
  G.addEdge('Salviati', 'Pazzi');
  G.addEdge('Peruzzi', 'Strozzi');
  G.addEdge('Peruzzi', 'Bischeri');
  G.addEdge('Strozzi', 'Ridolfi');
  G.addEdge('Strozzi', 'Bischeri');
  G.addEdge('Ridolfi', 'Tornabuoni');
  G.addEdge('Tornabuoni', 'Guadagni');
  G.addEdge('Albizzi', 'Ginori');
  G.addEdge('Albizzi', 'Guadagni');
  G.addEdge('Bischeri', 'Guadagni');
  G.addEdge('Guadagni', 'Lamberteschi');
  return G;
}

},{"../_internals/range":35,"../classes/Graph":61,"babel-runtime/helpers/interop-require-default":109}],85:[function(require,module,exports){
'use strict';

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _defaults = require('babel-runtime/helpers/defaults')['default'];

var _interopExportWildcard = require('babel-runtime/helpers/interop-export-wildcard')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _algorithms = require('./algorithms');

var algorithms = _interopRequireWildcard(_algorithms);

var _classes = require('./classes');

var classes = _interopRequireWildcard(_classes);

var _convert = require('./convert');

var convert = _interopRequireWildcard(_convert);

var _drawing = require('./drawing');

var drawing = _interopRequireWildcard(_drawing);

var _exceptions = require('./exceptions');

var exceptions = _interopRequireWildcard(_exceptions);

var _generators = require('./generators');

var generators = _interopRequireWildcard(_generators);

var _relabel = require('./relabel');

var relabel = _interopRequireWildcard(_relabel);

var _internalsMap = require('./_internals/Map');

var _internalsMap2 = _interopRequireDefault(_internalsMap);

var _internalsSet = require('./_internals/Set');

var _internalsSet2 = _interopRequireDefault(_internalsSet);

var _internalsForEach = require('./_internals/forEach');

var _internalsForEach2 = _interopRequireDefault(_internalsForEach);

exports.Map = _internalsMap2['default'];
exports.Set = _internalsSet2['default'];
exports.forEach = _internalsForEach2['default'];
exports.algorithms = algorithms;
exports.classes = classes;
exports.convert = convert;
exports.drawing = drawing;
exports.exceptions = exceptions;
exports.generators = generators;
exports.relabel = relabel;
var toArray = _Array$from;
exports.toArray = toArray;

_defaults(exports, _interopExportWildcard(_algorithms, _defaults));

_defaults(exports, _interopExportWildcard(_classes, _defaults));

_defaults(exports, _interopExportWildcard(_convert, _defaults));

_defaults(exports, _interopExportWildcard(_drawing, _defaults));

var _contribObserver = require('./contrib/observer');

_defaults(exports, _interopExportWildcard(_contribObserver, _defaults));

_defaults(exports, _interopExportWildcard(_exceptions, _defaults));

_defaults(exports, _interopExportWildcard(_generators, _defaults));

_defaults(exports, _interopExportWildcard(_relabel, _defaults));

},{"./_internals/Map":3,"./_internals/Set":5,"./_internals/forEach":14,"./algorithms":50,"./classes":65,"./contrib/observer":67,"./convert":69,"./drawing":70,"./exceptions":78,"./generators":81,"./relabel":87,"babel-runtime/core-js/array/from":88,"babel-runtime/helpers/defaults":104,"babel-runtime/helpers/interop-export-wildcard":108,"babel-runtime/helpers/interop-require-default":109,"babel-runtime/helpers/interop-require-wildcard":110}],86:[function(require,module,exports){
(function (global){
'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = initializeBrowserWorker;

var _internalsMessage = require('./_internals/message');

var _WorkerSettings = require('./WorkerSettings');

var _WorkerSettings2 = _interopRequireDefault(_WorkerSettings);

/**
 * If this function is executed inside a Worker, it will listen to the
 * "message" event and use `WorkerSettings.methodLookupFunction` to get a
 * reference to the JSNetworkX method to executed.
 */

function initializeBrowserWorker() {
  if (!global.document) {
    // inside worker
    global.onmessage = function (event) {
      var args = event.data.args.map(_internalsMessage.deserialize);
      var result = _WorkerSettings2['default'].methodLookupFunction(event.data.method).apply(null, args);
      global.postMessage((0, _internalsMessage.serialize)(result));
      global.close();
    };
  }
}

module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./WorkerSettings":1,"./_internals/message":32,"babel-runtime/helpers/interop-require-default":109}],87:[function(require,module,exports){
'use strict';

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _Array$from = require('babel-runtime/core-js/array/from')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.relabelNodes = relabelNodes;
exports.convertNodeLabelsToIntegers = convertNodeLabelsToIntegers;

var _classesDiGraph = require('./classes/DiGraph');

var _classesDiGraph2 = _interopRequireDefault(_classesDiGraph);

var _exceptions = require('./exceptions');

var _internals = require('./_internals');

/**
 * Relabel the nodes of the graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(3);  // nodes 0-1-2
 * var mapping = {0: 'a', 1: 'b', 2: 'c'};
 * // var mapping = new Map([[0, 'a'], [1, 'b'], [2, 'c']]);
 * var H = jsnx.relabelNodes(G, mapping);
 * H.nodes();
 * // ['a', 'b', 'c']
 * ```
 *
 * Partial in-place mapping
 *
 * ```
 * var G = jsnx.pathGraph(3);  // nodes 0-1-2
 * var mapping = {0: 'a', 1: 'b'};
 * // var mapping = new Map([[0, 'a'], [1, 'b']]);
 * var H = jsnx.relabelNodes(G, mapping, false);
 * H.nodes();
 * // [2, 'b', 'c']
 * ```
 *
 * Mapping as function:
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.relabelNodes(G, x => Math.pow(x, 2));
 * H.nodes()
 * // [0, 1, 4]
 * ```
 *
 * ### Notes
 *
 * Only the nodes specified in the mapping will be relabeled.
 *
 * The setting `copy=false` modifies the graph in place.
 * This is not always possible if the mapping is circular.
 * In that case use copy=true.
 *
 * @see #convertNodeLabelsToIntegers
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {(Object|Map|function(Node):Node)} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 * @param {boolean=} optCopy
 *      If `true` return a copy or if `false` relabel the nodes in place.
 * @return {Graph}
 */

function relabelNodes(G, mapping) {
  var optCopy = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

  // you can pass a function f(oldLabel)->newLabel
  // but we'll just make a dictionary here regardless
  var m = mapping;
  if (typeof mapping !== 'function') {
    if (!(0, _internals.isMap)(m)) {
      m = new _internals.Map(m);
    }
  } else {
    m = new _internals.Map((0, _internals.mapIterator)(G.nodesIter(), function (n) {
      return (0, _internals.tuple2)(n, mapping(n));
    }));
  }

  return optCopy ? relabelCopy(G, m) : relabelInplace(G, m);
}

/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return .Graph}
 * @private
 */
function relabelInplace(G, mapping) {
  var oldLabels = new _internals.Set(mapping.keys());
  var nodes;

  if ((0, _internals.someIterator)(mapping.values(), function (v) {
    return oldLabels.has(v);
  })) {
    // labels sets overlap
    // can we topological sort and still do the relabeling?
    var D = new _classesDiGraph2['default'](mapping);
    D.removeEdgesFrom(D.selfloopEdges());
    try {
      nodes = (0, _internals.topologicalSort)(D);
    } catch (e) {
      if (e instanceof _exceptions.JSNetworkXUnfeasible) {
        throw new _exceptions.JSNetworkXUnfeasible('The node label sets are overlapping and' + ' no ordering can resolve the mapping.' + ' Use copy=True.');
      }
    }
    nodes.reverse(); // reverse topological order
  } else {
      // non-overlapping label sets
      nodes = oldLabels.values();
    }
  var multigraph = G.isMultigraph();
  var directed = G.isDirected();
  var newEdges;

  (0, _internals.forEach)(nodes, function (old) {
    var newMapping;
    if (mapping.has(old)) {
      newMapping = mapping.get(old);
    } else {
      return; // continue
    }

    if (!G.hasNode(old)) {
      throw new _exceptions.JSNetworkXError((0, _internals.sprintf)('Node %j is not in the graph.', old));
    }
    G.addNode(newMapping, G.node.get(old));
    if (multigraph) {
      newEdges = G.edges(old, true, true).map(function (d) {
        return (0, _internals.tuple4c)(newMapping, d[1], d[2], d[3], d);
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true, true).map(function (d) {
          return (0, _internals.tuple4c)(d[0], newMapping, d[2], d[3], d);
        }));
      }
    } else {
      newEdges = G.edges(old, true).map(function (d) {
        return (0, _internals.tuple3c)(newMapping, d[1], d[2], d);
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true).map(function (d) {
          return (0, _internals.tuple3c)(d[0], newMapping, d[2], d);
        }));
      }
    }
    G.removeNode(old);
    G.addEdgesFrom(newEdges);
  });
  return G;
}

/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return {Graph}
 * @private
 */
function relabelCopy(G, mapping) {
  var H = new G.constructor();
  H.name = '(' + G.name + ')';
  if (G.isMultigraph()) {
    H.addEdgesFrom((0, _internals.mapIterator)(G.edgesIter(null, true, true), function (d) {
      return (0, _internals.tuple4c)(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1], d[2], (0, _internals.clone)(d[3]), d);
    }));
  } else {
    H.addEdgesFrom((0, _internals.mapIterator)(G.edgesIter(null, true), function (d) {
      return (0, _internals.tuple3c)(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1], (0, _internals.clone)(d[3]), d);
    }));
  }
  G.node.forEach(function (data, n) {
    return H.addNode(mapping.has(n) ? mapping.get(n) : n, (0, _internals.clone)(data));
  });
  _Object$assign(H.graph, (0, _internals.clone)(G.graph));

  return H;
}

/**
 * Return a copy of G node labels replaced with integers.
 *
 * ### Notes
 *
 * Node and edge attribute data are copied to the new (relabeled) graph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {?number=} optFirstLabel
 *      An integer specifying the offset in numbering nodes.
 *      The n new integer labels are numbered firstLabel, ..., n-1+firstLabel.
 * @param {?string=} optOrdering
 *   - "default" : inherit node ordering from `G.nodes()`
 *   - "sorted"  : inherit node ordering from `G.nodes().sort()`
 *   - "increasing degree" : nodes are sorted by increasing degree
 *   - "decreasing degree" : nodes are sorted by decreasing degree
 * @param {?boolean=} optDiscardOldLabels
 *      If true discard old labels. If false, create a node attribute
 *      'oldLabel' to hold the old labels.
 * @return {Graph}
 */

function convertNodeLabelsToIntegers(G) {
  var optFirstLabel = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
  var optOrdering = arguments.length <= 2 || arguments[2] === undefined ? 'default' : arguments[2];
  var optDiscardOldLabels = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  //   This function strips information attached to the nodes and/or
  //   edges of a graph, and returns a graph with appropriate integer
  //   labels. One can view this as a re-labeling of the nodes. Be
  //   warned that the term "labeled graph" has a loaded meaning
  //   in graph theory. The fundamental issue is whether the names
  //   (labels) of the nodes (and edges) matter in deciding when two
  //   graphs are the same. For example, in problems of graph enumeration
  //   there is a distinct difference in techniques required when
  //   counting labeled vs. unlabeled graphs.
  //
  //   When implementing graph
  //   algorithms it is often convenient to strip off the original node
  //   and edge information and appropriately relabel the n nodes with
  //   the integer values 1,..,n. This is the purpose of this function,
  //   and it provides the option (see discardOldLabels variable) to either
  //   preserve the original labels in separate dicts (these are not
  //   returned but made an attribute of the new graph.

  if (typeof optOrdering === 'boolean') {
    optDiscardOldLabels = optOrdering;
    optOrdering = 'default';
  }

  switch (typeof optFirstLabel) {
    case 'string':
      optOrdering = optFirstLabel;
      optFirstLabel = 0;
      break;
    case 'boolean':
      optDiscardOldLabels = optFirstLabel;
      optFirstLabel = 0;
      break;
  }

  var mapping = new _internals.Map();
  var nodes;
  var dvPairs;
  var i;
  var j;
  var l;

  switch (optOrdering) {
    case 'default':
      nodes = G.nodes();
      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }
      break;
    case 'sorted':
      nodes = G.nodes();
      nodes.sort();
      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }
      break;
    case 'increasing degree':
      dvPairs = _Array$from(G.degreeIter());
      dvPairs.sort(function (a, b) {
        return a[1] - b[1];
      });
      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }
      break;
    case 'decreasing degree':
      dvPairs = _Array$from(G.degreeIter());
      dvPairs.sort(function (a, b) {
        return b[1] - a[1];
      });
      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }
      break;
    default:
      throw new _exceptions.JSNetworkXError((0, _internals.sprintf)('Unkown node ordering: "%s"', optOrdering));
  }

  var H = relabelNodes(G, mapping);
  H.name = '(' + G.name + ')WithIntLabels';
  if (!optDiscardOldLabels) {
    H.nodeLabels = mapping;
  }
  return H;
}

},{"./_internals":20,"./classes/DiGraph":60,"./exceptions":78,"babel-runtime/core-js/array/from":88,"babel-runtime/core-js/object/assign":92,"babel-runtime/helpers/interop-require-default":109}],88:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":114}],89:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":115}],90:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":116}],91:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/map"), __esModule: true };
},{"core-js/library/fn/map":117}],92:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":118}],93:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":119}],94:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":120}],95:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-descriptor"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-descriptor":121}],96:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-own-property-names"), __esModule: true };
},{"core-js/library/fn/object/get-own-property-names":122}],97:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":123}],98:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":124}],99:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":125}],100:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":126}],101:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":127}],102:[function(require,module,exports){
"use strict";

exports["default"] = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

exports.__esModule = true;
},{}],103:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;

      _Object$defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":94}],104:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyNames = require("babel-runtime/core-js/object/get-own-property-names")["default"];

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = function (obj, defaults) {
  var keys = _Object$getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    var value = _Object$getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      _Object$defineProperty(obj, key, value);
    }
  }

  return obj;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":94,"babel-runtime/core-js/object/get-own-property-descriptor":95,"babel-runtime/core-js/object/get-own-property-names":96}],105:[function(require,module,exports){
"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

exports["default"] = function (obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/define-property":94}],106:[function(require,module,exports){
"use strict";

var _Object$getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor")["default"];

exports["default"] = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;
    _again = false;
    if (object === null) object = Function.prototype;

    var desc = _Object$getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        desc = parent = undefined;
        continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/get-own-property-descriptor":95}],107:[function(require,module,exports){
"use strict";

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

exports["default"] = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = _Object$create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _Object$setPrototypeOf ? _Object$setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

exports.__esModule = true;
},{"babel-runtime/core-js/object/create":93,"babel-runtime/core-js/object/set-prototype-of":98}],108:[function(require,module,exports){
"use strict";

exports["default"] = function (obj, defaults) {
  var newObj = defaults({}, obj);
  delete newObj["default"];
  return newObj;
};

exports.__esModule = true;
},{}],109:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

exports.__esModule = true;
},{}],110:[function(require,module,exports){
"use strict";

exports["default"] = function (obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
};

exports.__esModule = true;
},{}],111:[function(require,module,exports){
"use strict";

var _getIterator = require("babel-runtime/core-js/get-iterator")["default"];

var _isIterable = require("babel-runtime/core-js/is-iterable")["default"];

exports["default"] = (function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = _getIterator(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (_isIterable(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
})();

exports.__esModule = true;
},{"babel-runtime/core-js/get-iterator":89,"babel-runtime/core-js/is-iterable":90}],112:[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this;

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./runtime":113}],113:[function(require,module,exports){
(function (process,global){
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

"use strict";

var _Symbol = require("babel-runtime/core-js/symbol")["default"];

var _Object$create = require("babel-runtime/core-js/object/create")["default"];

var _Object$setPrototypeOf = require("babel-runtime/core-js/object/set-prototype-of")["default"];

var _Promise = require("babel-runtime/core-js/promise")["default"];

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof _Symbol === "function" ? _Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided, then outerFn.prototype instanceof Generator.
    var generator = _Object$create((outerFn || Generator).prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (_Object$setPrototypeOf) {
      _Object$setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = _Object$create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `value instanceof AwaitArgument` to determine if the yielded value is
  // meant to be awaited. Some may consider the name of this method too
  // cutesy, but they are curmudgeons.
  runtime.awrap = function (arg) {
    return new AwaitArgument(arg);
  };

  function AwaitArgument(arg) {
    this.arg = arg;
  }

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value instanceof AwaitArgument) {
          return _Promise.resolve(value.arg).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return _Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof process === "object" && process.domain) {
      invoke = process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new _Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          if (method === "return" || method === "throw" && delegate.iterator[method] === undefined) {
            // A return or throw (when the delegate iterator has no throw
            // method) always terminates the yield* loop.
            context.delegate = null;

            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            var returnMethod = delegate.iterator["return"];
            if (returnMethod) {
              var record = tryCatch(returnMethod, delegate.iterator, arg);
              if (record.type === "throw") {
                // If the return method threw an exception, let that
                // exception prevail over the original return or throw.
                method = "throw";
                arg = record.arg;
                continue;
              }
            }

            if (method === "return") {
              // Continue with the outer return, now that the delegate
              // iterator has been terminated.
              continue;
            }
          }

          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;
            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            context.sent = undefined;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(arg) call above.
          method = "throw";
          arg = record.arg;
        }
      }
    };
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp[toStringTagSymbol] = "Generator";

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : undefined);
}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"_process":276,"babel-runtime/core-js/object/create":93,"babel-runtime/core-js/object/set-prototype-of":98,"babel-runtime/core-js/promise":99,"babel-runtime/core-js/symbol":100}],114:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/$.core').Array.from;
},{"../../modules/$.core":136,"../../modules/es6.array.from":188,"../../modules/es6.string.iterator":198}],115:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":186,"../modules/es6.string.iterator":198,"../modules/web.dom.iterable":201}],116:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":187,"../modules/es6.string.iterator":198,"../modules/web.dom.iterable":201}],117:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
module.exports = require('../modules/$.core').Map;
},{"../modules/$.core":136,"../modules/es6.map":190,"../modules/es6.object.to-string":196,"../modules/es6.string.iterator":198,"../modules/es7.map.to-json":200,"../modules/web.dom.iterable":201}],118:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/$.core').Object.assign;
},{"../../modules/$.core":136,"../../modules/es6.object.assign":191}],119:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function create(P, D){
  return $.create(P, D);
};
},{"../../modules/$":161}],120:[function(require,module,exports){
var $ = require('../../modules/$');
module.exports = function defineProperty(it, key, desc){
  return $.setDesc(it, key, desc);
};
},{"../../modules/$":161}],121:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.get-own-property-descriptor');
module.exports = function getOwnPropertyDescriptor(it, key){
  return $.getDesc(it, key);
};
},{"../../modules/$":161,"../../modules/es6.object.get-own-property-descriptor":192}],122:[function(require,module,exports){
var $ = require('../../modules/$');
require('../../modules/es6.object.get-own-property-names');
module.exports = function getOwnPropertyNames(it){
  return $.getNames(it);
};
},{"../../modules/$":161,"../../modules/es6.object.get-own-property-names":193}],123:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/$.core').Object.keys;
},{"../../modules/$.core":136,"../../modules/es6.object.keys":194}],124:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/$.core').Object.setPrototypeOf;
},{"../../modules/$.core":136,"../../modules/es6.object.set-prototype-of":195}],125:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
module.exports = require('../modules/$.core').Promise;
},{"../modules/$.core":136,"../modules/es6.object.to-string":196,"../modules/es6.promise":197,"../modules/es6.string.iterator":198,"../modules/web.dom.iterable":201}],126:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
module.exports = require('../../modules/$.core').Symbol;
},{"../../modules/$.core":136,"../../modules/es6.object.to-string":196,"../../modules/es6.symbol":199}],127:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/$.wks')('iterator');
},{"../../modules/$.wks":184,"../../modules/es6.string.iterator":198,"../../modules/web.dom.iterable":201}],128:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],129:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],130:[function(require,module,exports){
var isObject = require('./$.is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./$.is-object":154}],131:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./$.cof')
  , TAG = require('./$.wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = (O = Object(it))[TAG]) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./$.cof":132,"./$.wks":184}],132:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],133:[function(require,module,exports){
'use strict';
var $            = require('./$')
  , hide         = require('./$.hide')
  , redefineAll  = require('./$.redefine-all')
  , ctx          = require('./$.ctx')
  , strictNew    = require('./$.strict-new')
  , defined      = require('./$.defined')
  , forOf        = require('./$.for-of')
  , $iterDefine  = require('./$.iter-define')
  , step         = require('./$.iter-step')
  , ID           = require('./$.uid')('id')
  , $has         = require('./$.has')
  , isObject     = require('./$.is-object')
  , setSpecies   = require('./$.set-species')
  , DESCRIPTORS  = require('./$.descriptors')
  , isExtensible = Object.isExtensible || isObject
  , SIZE         = DESCRIPTORS ? '_s' : 'size'
  , id           = 0;

var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!$has(it, ID)){
    // can't set id to frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add id
    if(!create)return 'E';
    // add missing object id
    hide(it, ID, ++id);
  // return object id with prefix
  } return 'O' + it[ID];
};

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      strictNew(that, C, NAME);
      that._i = $.create(null); // index
      that._f = undefined;      // first entry
      that._l = undefined;      // last entry
      that[SIZE] = 0;           // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)$.setDesc(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
},{"./$":161,"./$.ctx":137,"./$.defined":138,"./$.descriptors":139,"./$.for-of":144,"./$.has":147,"./$.hide":148,"./$.is-object":154,"./$.iter-define":157,"./$.iter-step":159,"./$.redefine-all":168,"./$.set-species":172,"./$.strict-new":176,"./$.uid":183}],134:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var forOf   = require('./$.for-of')
  , classof = require('./$.classof');
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    var arr = [];
    forOf(this, false, arr.push, arr);
    return arr;
  };
};
},{"./$.classof":131,"./$.for-of":144}],135:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , global         = require('./$.global')
  , $export        = require('./$.export')
  , fails          = require('./$.fails')
  , hide           = require('./$.hide')
  , redefineAll    = require('./$.redefine-all')
  , forOf          = require('./$.for-of')
  , strictNew      = require('./$.strict-new')
  , isObject       = require('./$.is-object')
  , setToStringTag = require('./$.set-to-string-tag')
  , DESCRIPTORS    = require('./$.descriptors');

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  if(!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
  } else {
    C = wrapper(function(target, iterable){
      strictNew(target, C, NAME);
      target._c = new Base;
      if(iterable != undefined)forOf(iterable, IS_MAP, target[ADDER], target);
    });
    $.each.call('add,clear,delete,forEach,get,has,set,keys,values,entries'.split(','),function(KEY){
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if(KEY in proto && !(IS_WEAK && KEY == 'clear'))hide(C.prototype, KEY, function(a, b){
        if(!IS_ADDER && IS_WEAK && !isObject(a))return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    if('size' in proto)$.setDesc(C.prototype, 'size', {
      get: function(){
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};
},{"./$":161,"./$.descriptors":139,"./$.export":142,"./$.fails":143,"./$.for-of":144,"./$.global":146,"./$.hide":148,"./$.is-object":154,"./$.redefine-all":168,"./$.set-to-string-tag":173,"./$.strict-new":176}],136:[function(require,module,exports){
var core = module.exports = {version: '1.2.6'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],137:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./$.a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./$.a-function":128}],138:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],139:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./$.fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./$.fails":143}],140:[function(require,module,exports){
var isObject = require('./$.is-object')
  , document = require('./$.global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./$.global":146,"./$.is-object":154}],141:[function(require,module,exports){
// all enumerable object keys, includes symbols
var $ = require('./$');
module.exports = function(it){
  var keys       = $.getKeys(it)
    , getSymbols = $.getSymbols;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = $.isEnum
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))keys.push(key);
  }
  return keys;
};
},{"./$":161}],142:[function(require,module,exports){
var global    = require('./$.global')
  , core      = require('./$.core')
  , ctx       = require('./$.ctx')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && key in target;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(param){
        return this instanceof C ? new C(param) : C(param);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    if(IS_PROTO)(exports[PROTOTYPE] || (exports[PROTOTYPE] = {}))[key] = out;
  }
};
// type bitmap
$export.F = 1;  // forced
$export.G = 2;  // global
$export.S = 4;  // static
$export.P = 8;  // proto
$export.B = 16; // bind
$export.W = 32; // wrap
module.exports = $export;
},{"./$.core":136,"./$.ctx":137,"./$.global":146}],143:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],144:[function(require,module,exports){
var ctx         = require('./$.ctx')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , anObject    = require('./$.an-object')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
module.exports = function(iterable, entries, fn, that){
  var iterFn = getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    call(iterator, f, step.value, entries);
  }
};
},{"./$.an-object":130,"./$.ctx":137,"./$.is-array-iter":152,"./$.iter-call":155,"./$.to-length":181,"./core.get-iterator-method":185}],145:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./$.to-iobject')
  , getNames  = require('./$').getNames
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return getNames(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.get = function getOwnPropertyNames(it){
  if(windowNames && toString.call(it) == '[object Window]')return getWindowNames(it);
  return getNames(toIObject(it));
};
},{"./$":161,"./$.to-iobject":180}],146:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],147:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],148:[function(require,module,exports){
var $          = require('./$')
  , createDesc = require('./$.property-desc');
module.exports = require('./$.descriptors') ? function(object, key, value){
  return $.setDesc(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./$":161,"./$.descriptors":139,"./$.property-desc":167}],149:[function(require,module,exports){
module.exports = require('./$.global').document && document.documentElement;
},{"./$.global":146}],150:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};
},{}],151:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./$.cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./$.cof":132}],152:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./$.iterators')
  , ITERATOR   = require('./$.wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./$.iterators":160,"./$.wks":184}],153:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./$.cof');
module.exports = Array.isArray || function(arg){
  return cof(arg) == 'Array';
};
},{"./$.cof":132}],154:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],155:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./$.an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./$.an-object":130}],156:[function(require,module,exports){
'use strict';
var $              = require('./$')
  , descriptor     = require('./$.property-desc')
  , setToStringTag = require('./$.set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./$.hide')(IteratorPrototype, require('./$.wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = $.create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./$":161,"./$.hide":148,"./$.property-desc":167,"./$.set-to-string-tag":173,"./$.wks":184}],157:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./$.library')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , hide           = require('./$.hide')
  , has            = require('./$.has')
  , Iterators      = require('./$.iterators')
  , $iterCreate    = require('./$.iter-create')
  , setToStringTag = require('./$.set-to-string-tag')
  , getProto       = require('./$').getProto
  , ITERATOR       = require('./$.wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , methods, key;
  // Fix native
  if($native){
    var IteratorPrototype = getProto($default.call(new Base));
    // Set @@toStringTag to native iterators
    setToStringTag(IteratorPrototype, TAG, true);
    // FF fix
    if(!LIBRARY && has(proto, FF_ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    // fix Array#{values, @@iterator}.name in V8 / FF
    if(DEF_VALUES && $native.name !== VALUES){
      VALUES_BUG = true;
      $default = function values(){ return $native.call(this); };
    }
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES  ? $default : getMethod(VALUES),
      keys:    IS_SET      ? $default : getMethod(KEYS),
      entries: !DEF_VALUES ? $default : getMethod('entries')
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./$":161,"./$.export":142,"./$.has":147,"./$.hide":148,"./$.iter-create":156,"./$.iterators":160,"./$.library":163,"./$.redefine":169,"./$.set-to-string-tag":173,"./$.wks":184}],158:[function(require,module,exports){
var ITERATOR     = require('./$.wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./$.wks":184}],159:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],160:[function(require,module,exports){
module.exports = {};
},{}],161:[function(require,module,exports){
var $Object = Object;
module.exports = {
  create:     $Object.create,
  getProto:   $Object.getPrototypeOf,
  isEnum:     {}.propertyIsEnumerable,
  getDesc:    $Object.getOwnPropertyDescriptor,
  setDesc:    $Object.defineProperty,
  setDescs:   $Object.defineProperties,
  getKeys:    $Object.keys,
  getNames:   $Object.getOwnPropertyNames,
  getSymbols: $Object.getOwnPropertySymbols,
  each:       [].forEach
};
},{}],162:[function(require,module,exports){
var $         = require('./$')
  , toIObject = require('./$.to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = $.getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./$":161,"./$.to-iobject":180}],163:[function(require,module,exports){
module.exports = true;
},{}],164:[function(require,module,exports){
var global    = require('./$.global')
  , macrotask = require('./$.task').set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = require('./$.cof')(process) == 'process'
  , head, last, notify;

var flush = function(){
  var parent, domain, fn;
  if(isNode && (parent = process.domain)){
    process.domain = null;
    parent.exit();
  }
  while(head){
    domain = head.domain;
    fn     = head.fn;
    if(domain)domain.enter();
    fn(); // <- currently we use it only for Promise - try / catch not required
    if(domain)domain.exit();
    head = head.next;
  } last = undefined;
  if(parent)parent.enter();
};

// Node.js
if(isNode){
  notify = function(){
    process.nextTick(flush);
  };
// browsers with MutationObserver
} else if(Observer){
  var toggle = 1
    , node   = document.createTextNode('');
  new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
  notify = function(){
    node.data = toggle = -toggle;
  };
// environments with maybe non-completely correct, but existent Promise
} else if(Promise && Promise.resolve){
  notify = function(){
    Promise.resolve().then(flush);
  };
// for other environments - macrotask based on:
// - setImmediate
// - MessageChannel
// - window.postMessag
// - onreadystatechange
// - setTimeout
} else {
  notify = function(){
    // strange IE + webpack dev server bug - use .call(global)
    macrotask.call(global, flush);
  };
}

module.exports = function asap(fn){
  var task = {fn: fn, next: undefined, domain: isNode && process.domain};
  if(last)last.next = task;
  if(!head){
    head = task;
    notify();
  } last = task;
};
},{"./$.cof":132,"./$.global":146,"./$.task":178}],165:[function(require,module,exports){
// 19.1.2.1 Object.assign(target, source, ...)
var $        = require('./$')
  , toObject = require('./$.to-object')
  , IObject  = require('./$.iobject');

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = require('./$.fails')(function(){
  var a = Object.assign
    , A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return a({}, A)[S] != 7 || Object.keys(a({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , $$    = arguments
    , $$len = $$.length
    , index = 1
    , getKeys    = $.getKeys
    , getSymbols = $.getSymbols
    , isEnum     = $.isEnum;
  while($$len > index){
    var S      = IObject($$[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  }
  return T;
} : Object.assign;
},{"./$":161,"./$.fails":143,"./$.iobject":151,"./$.to-object":182}],166:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./$.export')
  , core    = require('./$.core')
  , fails   = require('./$.fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./$.core":136,"./$.export":142,"./$.fails":143}],167:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],168:[function(require,module,exports){
var redefine = require('./$.redefine');
module.exports = function(target, src){
  for(var key in src)redefine(target, key, src[key]);
  return target;
};
},{"./$.redefine":169}],169:[function(require,module,exports){
module.exports = require('./$.hide');
},{"./$.hide":148}],170:[function(require,module,exports){
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
},{}],171:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var getDesc  = require('./$').getDesc
  , isObject = require('./$.is-object')
  , anObject = require('./$.an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./$.ctx')(Function.call, getDesc(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./$":161,"./$.an-object":130,"./$.ctx":137,"./$.is-object":154}],172:[function(require,module,exports){
'use strict';
var core        = require('./$.core')
  , $           = require('./$')
  , DESCRIPTORS = require('./$.descriptors')
  , SPECIES     = require('./$.wks')('species');

module.exports = function(KEY){
  var C = core[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])$.setDesc(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};
},{"./$":161,"./$.core":136,"./$.descriptors":139,"./$.wks":184}],173:[function(require,module,exports){
var def = require('./$').setDesc
  , has = require('./$.has')
  , TAG = require('./$.wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./$":161,"./$.has":147,"./$.wks":184}],174:[function(require,module,exports){
var global = require('./$.global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./$.global":146}],175:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = require('./$.an-object')
  , aFunction = require('./$.a-function')
  , SPECIES   = require('./$.wks')('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
},{"./$.a-function":128,"./$.an-object":130,"./$.wks":184}],176:[function(require,module,exports){
module.exports = function(it, Constructor, name){
  if(!(it instanceof Constructor))throw TypeError(name + ": use the 'new' operator!");
  return it;
};
},{}],177:[function(require,module,exports){
var toInteger = require('./$.to-integer')
  , defined   = require('./$.defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./$.defined":138,"./$.to-integer":179}],178:[function(require,module,exports){
var ctx                = require('./$.ctx')
  , invoke             = require('./$.invoke')
  , html               = require('./$.html')
  , cel                = require('./$.dom-create')
  , global             = require('./$.global')
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listner = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(require('./$.cof')(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listner, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};
},{"./$.cof":132,"./$.ctx":137,"./$.dom-create":140,"./$.global":146,"./$.html":149,"./$.invoke":150}],179:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],180:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./$.iobject')
  , defined = require('./$.defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./$.defined":138,"./$.iobject":151}],181:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./$.to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./$.to-integer":179}],182:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./$.defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./$.defined":138}],183:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],184:[function(require,module,exports){
var store  = require('./$.shared')('wks')
  , uid    = require('./$.uid')
  , Symbol = require('./$.global').Symbol;
module.exports = function(name){
  return store[name] || (store[name] =
    Symbol && Symbol[name] || (Symbol || uid)('Symbol.' + name));
};
},{"./$.global":146,"./$.shared":174,"./$.uid":183}],185:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./$.classof":131,"./$.core":136,"./$.iterators":160,"./$.wks":184}],186:[function(require,module,exports){
var anObject = require('./$.an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./$.core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./$.an-object":130,"./$.core":136,"./core.get-iterator-method":185}],187:[function(require,module,exports){
var classof   = require('./$.classof')
  , ITERATOR  = require('./$.wks')('iterator')
  , Iterators = require('./$.iterators');
module.exports = require('./$.core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./$.classof":131,"./$.core":136,"./$.iterators":160,"./$.wks":184}],188:[function(require,module,exports){
'use strict';
var ctx         = require('./$.ctx')
  , $export     = require('./$.export')
  , toObject    = require('./$.to-object')
  , call        = require('./$.iter-call')
  , isArrayIter = require('./$.is-array-iter')
  , toLength    = require('./$.to-length')
  , getIterFn   = require('./core.get-iterator-method');
$export($export.S + $export.F * !require('./$.iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , $$      = arguments
      , $$len   = $$.length
      , mapfn   = $$len > 1 ? $$[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, $$len > 2 ? $$[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        result[index] = mapping ? call(iterator, mapfn, [step.value, index], true) : step.value;
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        result[index] = mapping ? mapfn(O[index], index) : O[index];
      }
    }
    result.length = index;
    return result;
  }
});

},{"./$.ctx":137,"./$.export":142,"./$.is-array-iter":152,"./$.iter-call":155,"./$.iter-detect":158,"./$.to-length":181,"./$.to-object":182,"./core.get-iterator-method":185}],189:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./$.add-to-unscopables')
  , step             = require('./$.iter-step')
  , Iterators        = require('./$.iterators')
  , toIObject        = require('./$.to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./$.iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./$.add-to-unscopables":129,"./$.iter-define":157,"./$.iter-step":159,"./$.iterators":160,"./$.to-iobject":180}],190:[function(require,module,exports){
'use strict';
var strong = require('./$.collection-strong');

// 23.1 Map Objects
require('./$.collection')('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);
},{"./$.collection":135,"./$.collection-strong":133}],191:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./$.export');

$export($export.S + $export.F, 'Object', {assign: require('./$.object-assign')});
},{"./$.export":142,"./$.object-assign":165}],192:[function(require,module,exports){
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./$.to-iobject');

require('./$.object-sap')('getOwnPropertyDescriptor', function($getOwnPropertyDescriptor){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
},{"./$.object-sap":166,"./$.to-iobject":180}],193:[function(require,module,exports){
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./$.object-sap')('getOwnPropertyNames', function(){
  return require('./$.get-names').get;
});
},{"./$.get-names":145,"./$.object-sap":166}],194:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./$.to-object');

require('./$.object-sap')('keys', function($keys){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./$.object-sap":166,"./$.to-object":182}],195:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./$.export');
$export($export.S, 'Object', {setPrototypeOf: require('./$.set-proto').set});
},{"./$.export":142,"./$.set-proto":171}],196:[function(require,module,exports){

},{}],197:[function(require,module,exports){
'use strict';
var $          = require('./$')
  , LIBRARY    = require('./$.library')
  , global     = require('./$.global')
  , ctx        = require('./$.ctx')
  , classof    = require('./$.classof')
  , $export    = require('./$.export')
  , isObject   = require('./$.is-object')
  , anObject   = require('./$.an-object')
  , aFunction  = require('./$.a-function')
  , strictNew  = require('./$.strict-new')
  , forOf      = require('./$.for-of')
  , setProto   = require('./$.set-proto').set
  , same       = require('./$.same-value')
  , SPECIES    = require('./$.wks')('species')
  , speciesConstructor = require('./$.species-constructor')
  , asap       = require('./$.microtask')
  , PROMISE    = 'Promise'
  , process    = global.process
  , isNode     = classof(process) == 'process'
  , P          = global[PROMISE]
  , empty      = function(){ /* empty */ }
  , Wrapper;

var testResolve = function(sub){
  var test = new P(empty), promise;
  if(sub)test.constructor = function(exec){
    exec(empty, empty);
  };
  (promise = P.resolve(test))['catch'](empty);
  return promise === test;
};

var USE_NATIVE = function(){
  var works = false;
  function P2(x){
    var self = new P(x);
    setProto(self, P2.prototype);
    return self;
  }
  try {
    works = P && P.resolve && testResolve();
    setProto(P2, P);
    P2.prototype = $.create(P.prototype, {constructor: {value: P2}});
    // actual Firefox has broken subclass support, test that
    if(!(P2.resolve(5).then(function(){}) instanceof P2)){
      works = false;
    }
    // actual V8 bug, https://code.google.com/p/v8/issues/detail?id=4162
    if(works && require('./$.descriptors')){
      var thenableThenGotten = false;
      P.resolve($.setDesc({}, 'then', {
        get: function(){ thenableThenGotten = true; }
      }));
      works = thenableThenGotten;
    }
  } catch(e){ works = false; }
  return works;
}();

// helpers
var sameConstructor = function(a, b){
  // library wrapper special case
  if(LIBRARY && a === P && b === Wrapper)return true;
  return same(a, b);
};
var getConstructor = function(C){
  var S = anObject(C)[SPECIES];
  return S != undefined ? S : C;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var PromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve),
  this.reject  = aFunction(reject)
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(record, isReject){
  if(record.n)return;
  record.n = true;
  var chain = record.c;
  asap(function(){
    var value = record.v
      , ok    = record.s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , result, then;
      try {
        if(handler){
          if(!ok)record.h = true;
          result = handler === true ? value : handler(value);
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    chain.length = 0;
    record.n = false;
    if(isReject)setTimeout(function(){
      var promise = record.p
        , handler, console;
      if(isUnhandled(promise)){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      } record.a = undefined;
    }, 1);
  });
};
var isUnhandled = function(promise){
  var record = promise._d
    , chain  = record.a || record.c
    , i      = 0
    , reaction;
  if(record.h)return false;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var $reject = function(value){
  var record = this;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  record.v = value;
  record.s = 2;
  record.a = record.c.slice();
  notify(record, true);
};
var $resolve = function(value){
  var record = this
    , then;
  if(record.d)return;
  record.d = true;
  record = record.r || record; // unwrap
  try {
    if(record.p === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      asap(function(){
        var wrapper = {r: record, d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      record.v = value;
      record.s = 1;
      notify(record, false);
    }
  } catch(e){
    $reject.call({r: record, d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  P = function Promise(executor){
    aFunction(executor);
    var record = this._d = {
      p: strictNew(this, P, PROMISE),         // <- promise
      c: [],                                  // <- awaiting reactions
      a: undefined,                           // <- checked in isUnhandled reactions
      s: 0,                                   // <- state
      d: false,                               // <- done
      v: undefined,                           // <- value
      h: false,                               // <- handled rejection
      n: false                                // <- notify
    };
    try {
      executor(ctx($resolve, record, 1), ctx($reject, record, 1));
    } catch(err){
      $reject.call(record, err);
    }
  };
  require('./$.redefine-all')(P.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction = new PromiseCapability(speciesConstructor(this, P))
        , promise  = reaction.promise
        , record   = this._d;
      reaction.ok   = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      record.c.push(reaction);
      if(record.a)record.a.push(reaction);
      if(record.s)notify(record, false);
      return promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: P});
require('./$.set-to-string-tag')(P, PROMISE);
require('./$.set-species')(PROMISE);
Wrapper = require('./$.core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = new PromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (!USE_NATIVE || testResolve(true)), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof P && sameConstructor(x.constructor, this))return x;
    var capability = new PromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./$.iter-detect')(function(iter){
  P.all(iter)['catch'](function(){});
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject
      , values     = [];
    var abrupt = perform(function(){
      forOf(iterable, false, values.push, values);
      var remaining = values.length
        , results   = Array(remaining);
      if(remaining)$.each.call(values, function(promise, index){
        var alreadyCalled = false;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled = true;
          results[index] = value;
          --remaining || resolve(results);
        }, reject);
      });
      else resolve(results);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = getConstructor(this)
      , capability = new PromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});
},{"./$":161,"./$.a-function":128,"./$.an-object":130,"./$.classof":131,"./$.core":136,"./$.ctx":137,"./$.descriptors":139,"./$.export":142,"./$.for-of":144,"./$.global":146,"./$.is-object":154,"./$.iter-detect":158,"./$.library":163,"./$.microtask":164,"./$.redefine-all":168,"./$.same-value":170,"./$.set-proto":171,"./$.set-species":172,"./$.set-to-string-tag":173,"./$.species-constructor":175,"./$.strict-new":176,"./$.wks":184}],198:[function(require,module,exports){
'use strict';
var $at  = require('./$.string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./$.iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./$.iter-define":157,"./$.string-at":177}],199:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var $              = require('./$')
  , global         = require('./$.global')
  , has            = require('./$.has')
  , DESCRIPTORS    = require('./$.descriptors')
  , $export        = require('./$.export')
  , redefine       = require('./$.redefine')
  , $fails         = require('./$.fails')
  , shared         = require('./$.shared')
  , setToStringTag = require('./$.set-to-string-tag')
  , uid            = require('./$.uid')
  , wks            = require('./$.wks')
  , keyOf          = require('./$.keyof')
  , $names         = require('./$.get-names')
  , enumKeys       = require('./$.enum-keys')
  , isArray        = require('./$.is-array')
  , anObject       = require('./$.an-object')
  , toIObject      = require('./$.to-iobject')
  , createDesc     = require('./$.property-desc')
  , getDesc        = $.getDesc
  , setDesc        = $.setDesc
  , _create        = $.create
  , getNames       = $names.get
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , setter         = false
  , HIDDEN         = wks('_hidden')
  , isEnum         = $.isEnum
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , useNative      = typeof $Symbol == 'function'
  , ObjectProto    = Object.prototype;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(setDesc({}, 'a', {
    get: function(){ return setDesc(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = getDesc(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  setDesc(it, key, D);
  if(protoDesc && it !== ObjectProto)setDesc(ObjectProto, key, protoDesc);
} : setDesc;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol.prototype);
  sym._k = tag;
  DESCRIPTORS && setter && setSymbolDesc(ObjectProto, tag, {
    configurable: true,
    set: function(value){
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    }
  });
  return sym;
};

var isSymbol = function(it){
  return typeof it == 'symbol';
};

var $defineProperty = function defineProperty(it, key, D){
  if(D && has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))setDesc(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return setDesc(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key);
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key]
    ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  var D = getDesc(it = toIObject(it), key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(!has(AllSymbols, key = names[i++]) && key != HIDDEN)result.push(key);
  return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var names  = getNames(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i)if(has(AllSymbols, key = names[i++]))result.push(AllSymbols[key]);
  return result;
};
var $stringify = function stringify(it){
  if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
  var args = [it]
    , i    = 1
    , $$   = arguments
    , replacer, $replacer;
  while($$.length > i)args.push($$[i++]);
  replacer = args[1];
  if(typeof replacer == 'function')$replacer = replacer;
  if($replacer || !isArray(replacer))replacer = function(key, value){
    if($replacer)value = $replacer.call(this, key, value);
    if(!isSymbol(value))return value;
  };
  args[1] = replacer;
  return _stringify.apply($JSON, args);
};
var buggyJSON = $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
});

// 19.4.1.1 Symbol([description])
if(!useNative){
  $Symbol = function Symbol(){
    if(isSymbol(this))throw TypeError('Symbol is not a constructor');
    return wrap(uid(arguments.length > 0 ? arguments[0] : undefined));
  };
  redefine($Symbol.prototype, 'toString', function toString(){
    return this._k;
  });

  isSymbol = function(it){
    return it instanceof $Symbol;
  };

  $.create     = $create;
  $.isEnum     = $propertyIsEnumerable;
  $.getDesc    = $getOwnPropertyDescriptor;
  $.setDesc    = $defineProperty;
  $.setDescs   = $defineProperties;
  $.getNames   = $names.get = $getOwnPropertyNames;
  $.getSymbols = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./$.library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }
}

var symbolStatics = {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    return keyOf(SymbolRegistry, key);
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
};
// 19.4.2.2 Symbol.hasInstance
// 19.4.2.3 Symbol.isConcatSpreadable
// 19.4.2.4 Symbol.iterator
// 19.4.2.6 Symbol.match
// 19.4.2.8 Symbol.replace
// 19.4.2.9 Symbol.search
// 19.4.2.10 Symbol.species
// 19.4.2.11 Symbol.split
// 19.4.2.12 Symbol.toPrimitive
// 19.4.2.13 Symbol.toStringTag
// 19.4.2.14 Symbol.unscopables
$.each.call((
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,' +
  'species,split,toPrimitive,toStringTag,unscopables'
).split(','), function(it){
  var sym = wks(it);
  symbolStatics[it] = useNative ? sym : wrap(sym);
});

setter = true;

$export($export.G + $export.W, {Symbol: $Symbol});

$export($export.S, 'Symbol', symbolStatics);

$export($export.S + $export.F * !useNative, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!useNative || buggyJSON), 'JSON', {stringify: $stringify});

// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./$":161,"./$.an-object":130,"./$.descriptors":139,"./$.enum-keys":141,"./$.export":142,"./$.fails":143,"./$.get-names":145,"./$.global":146,"./$.has":147,"./$.is-array":153,"./$.keyof":162,"./$.library":163,"./$.property-desc":167,"./$.redefine":169,"./$.set-to-string-tag":173,"./$.shared":174,"./$.to-iobject":180,"./$.uid":183,"./$.wks":184}],200:[function(require,module,exports){
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = require('./$.export');

$export($export.P, 'Map', {toJSON: require('./$.collection-to-json')('Map')});
},{"./$.collection-to-json":134,"./$.export":142}],201:[function(require,module,exports){
require('./es6.array.iterator');
var Iterators = require('./$.iterators');
Iterators.NodeList = Iterators.HTMLCollection = Iterators.Array;
},{"./$.iterators":160,"./es6.array.iterator":189}],202:[function(require,module,exports){
/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

module.exports = last;

},{}],203:[function(require,module,exports){
var baseRandom = require('../internal/baseRandom'),
    isIterateeCall = require('../internal/isIterateeCall'),
    toArray = require('../lang/toArray'),
    toIterable = require('../internal/toIterable');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Gets a random element or `n` random elements from a collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to sample.
 * @param {number} [n] The number of elements to sample.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {*} Returns the random sample(s).
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 *
 * _.sample([1, 2, 3, 4], 2);
 * // => [3, 1]
 */
function sample(collection, n, guard) {
  if (guard ? isIterateeCall(collection, n, guard) : n == null) {
    collection = toIterable(collection);
    var length = collection.length;
    return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
  }
  var index = -1,
      result = toArray(collection),
      length = result.length,
      lastIndex = length - 1;

  n = nativeMin(n < 0 ? 0 : (+n || 0), length);
  while (++index < n) {
    var rand = baseRandom(index, lastIndex),
        value = result[rand];

    result[rand] = result[index];
    result[index] = value;
  }
  result.length = n;
  return result;
}

module.exports = sample;

},{"../internal/baseRandom":227,"../internal/isIterateeCall":247,"../internal/toIterable":253,"../lang/toArray":266}],204:[function(require,module,exports){
var sample = require('./sample');

/** Used as references for `-Infinity` and `Infinity`. */
var POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

/**
 * Creates an array of shuffled values, using a version of the
 * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  return sample(collection, POSITIVE_INFINITY);
}

module.exports = shuffle;

},{"./sample":203}],205:[function(require,module,exports){
var getLength = require('../internal/getLength'),
    isLength = require('../internal/isLength'),
    keys = require('../object/keys');

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the size of `collection`.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? getLength(collection) : 0;
  return isLength(length) ? length : keys(collection).length;
}

module.exports = size;

},{"../internal/getLength":239,"../internal/isLength":249,"../object/keys":268}],206:[function(require,module,exports){
/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],207:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],208:[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],209:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],210:[function(require,module,exports){
var baseCopy = require('./baseCopy'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"../object/keys":268,"./baseCopy":213}],211:[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    property = require('../utility/property');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":274,"../utility/property":275,"./baseMatches":221,"./baseMatchesProperty":222,"./bindCallback":231}],212:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseAssign = require('./baseAssign'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseAssign(result, value);
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return its corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":258,"../lang/isObject":262,"./arrayCopy":207,"./arrayEach":208,"./baseAssign":210,"./baseForOwn":216,"./initCloneArray":242,"./initCloneByTag":243,"./initCloneObject":244}],213:[function(require,module,exports){
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],214:[function(require,module,exports){
var createBaseFor = require('./createBaseFor');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./createBaseFor":234}],215:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":269,"./baseFor":214}],216:[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":268,"./baseFor":214}],217:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

module.exports = baseGet;

},{"./toObject":254}],218:[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

module.exports = baseIsEqual;

},{"../lang/isObject":262,"./baseIsEqualDeep":219,"./isObjectLike":250}],219:[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":258,"../lang/isTypedArray":265,"./equalArrays":236,"./equalByTag":237,"./equalObjects":238}],220:[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":218,"./toObject":254}],221:[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    getMatchData = require('./getMatchData'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

module.exports = baseMatches;

},{"./baseIsMatch":220,"./getMatchData":240,"./toObject":254}],222:[function(require,module,exports){
var baseGet = require('./baseGet'),
    baseIsEqual = require('./baseIsEqual'),
    baseSlice = require('./baseSlice'),
    isArray = require('../lang/isArray'),
    isKey = require('./isKey'),
    isStrictComparable = require('./isStrictComparable'),
    last = require('../array/last'),
    toObject = require('./toObject'),
    toPath = require('./toPath');

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

module.exports = baseMatchesProperty;

},{"../array/last":202,"../lang/isArray":258,"./baseGet":217,"./baseIsEqual":218,"./baseSlice":228,"./isKey":248,"./isStrictComparable":251,"./toObject":254,"./toPath":255}],223:[function(require,module,exports){
var arrayEach = require('./arrayEach'),
    baseMergeDeep = require('./baseMergeDeep'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike'),
    isTypedArray = require('../lang/isTypedArray'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":258,"../lang/isObject":262,"../lang/isTypedArray":265,"../object/keys":268,"./arrayEach":208,"./baseMergeDeep":224,"./isArrayLike":245,"./isObjectLike":250}],224:[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isArrayLike = require('./isArrayLike'),
    isPlainObject = require('../lang/isPlainObject'),
    isTypedArray = require('../lang/isTypedArray'),
    toPlainObject = require('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":257,"../lang/isArray":258,"../lang/isPlainObject":263,"../lang/isTypedArray":265,"../lang/toPlainObject":267,"./arrayCopy":207,"./isArrayLike":245}],225:[function(require,module,exports){
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],226:[function(require,module,exports){
var baseGet = require('./baseGet'),
    toPath = require('./toPath');

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

module.exports = basePropertyDeep;

},{"./baseGet":217,"./toPath":255}],227:[function(require,module,exports){
/* Native method references for those with the same name as other `lodash` methods. */
var nativeFloor = Math.floor,
    nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for argument juggling
 * and returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns the random number.
 */
function baseRandom(min, max) {
  return min + nativeFloor(nativeRandom() * (max - min + 1));
}

module.exports = baseRandom;

},{}],228:[function(require,module,exports){
/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

module.exports = baseSlice;

},{}],229:[function(require,module,exports){
/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],230:[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],231:[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":274}],232:[function(require,module,exports){
(function (global){
/** Native method references. */
var ArrayBuffer = global.ArrayBuffer,
    Uint8Array = global.Uint8Array;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  var result = new ArrayBuffer(buffer.byteLength),
      view = new Uint8Array(result);

  view.set(new Uint8Array(buffer));
  return result;
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],233:[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall'),
    restParam = require('../function/restParam');

/**
 * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"../function/restParam":206,"./bindCallback":231,"./isIterateeCall":247}],234:[function(require,module,exports){
var toObject = require('./toObject');

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{"./toObject":254}],235:[function(require,module,exports){
var baseCallback = require('./baseCallback'),
    baseForOwn = require('./baseForOwn');

/**
 * Creates a function for `_.mapKeys` or `_.mapValues`.
 *
 * @private
 * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
 * @returns {Function} Returns the new map function.
 */
function createObjectMapper(isMapKeys) {
  return function(object, iteratee, thisArg) {
    var result = {};
    iteratee = baseCallback(iteratee, thisArg, 3);

    baseForOwn(object, function(value, key, object) {
      var mapped = iteratee(value, key, object);
      key = isMapKeys ? mapped : key;
      value = isMapKeys ? value : mapped;
      result[key] = value;
    });
    return result;
  };
}

module.exports = createObjectMapper;

},{"./baseCallback":211,"./baseForOwn":216}],236:[function(require,module,exports){
var arraySome = require('./arraySome');

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

module.exports = equalArrays;

},{"./arraySome":209}],237:[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],238:[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":268}],239:[function(require,module,exports){
var baseProperty = require('./baseProperty');

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

module.exports = getLength;

},{"./baseProperty":225}],240:[function(require,module,exports){
var isStrictComparable = require('./isStrictComparable'),
    pairs = require('../object/pairs');

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

module.exports = getMatchData;

},{"../object/pairs":272,"./isStrictComparable":251}],241:[function(require,module,exports){
var isNative = require('../lang/isNative');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

module.exports = getNative;

},{"../lang/isNative":261}],242:[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],243:[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":232}],244:[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],245:[function(require,module,exports){
var getLength = require('./getLength'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

module.exports = isArrayLike;

},{"./getLength":239,"./isLength":249}],246:[function(require,module,exports){
/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],247:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isIndex = require('./isIndex'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":262,"./isArrayLike":245,"./isIndex":246}],248:[function(require,module,exports){
var isArray = require('../lang/isArray'),
    toObject = require('./toObject');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

module.exports = isKey;

},{"../lang/isArray":258,"./toObject":254}],249:[function(require,module,exports){
/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],250:[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],251:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

module.exports = isStrictComparable;

},{"../lang/isObject":262}],252:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":257,"../lang/isArray":258,"../object/keysIn":269,"./isIndex":246,"./isLength":249}],253:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObject = require('../lang/isObject'),
    values = require('../object/values');

/**
 * Converts `value` to an array-like object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array|Object} Returns the array-like object.
 */
function toIterable(value) {
  if (value == null) {
    return [];
  }
  if (!isArrayLike(value)) {
    return values(value);
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toIterable;

},{"../lang/isObject":262,"../object/values":273,"./isArrayLike":245}],254:[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":262}],255:[function(require,module,exports){
var baseToString = require('./baseToString'),
    isArray = require('../lang/isArray');

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

module.exports = toPath;

},{"../lang/isArray":258,"./baseToString":229}],256:[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it's
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with up to three argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the
 * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  return typeof customizer == 'function'
    ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 3))
    : baseClone(value, isDeep);
}

module.exports = clone;

},{"../internal/baseClone":212,"../internal/bindCallback":231,"../internal/isIterateeCall":247}],257:[function(require,module,exports){
var isArrayLike = require('../internal/isArrayLike'),
    isObjectLike = require('../internal/isObjectLike');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{"../internal/isArrayLike":245,"../internal/isObjectLike":250}],258:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

module.exports = isArray;

},{"../internal/getNative":241,"../internal/isLength":249,"../internal/isObjectLike":250}],259:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
}

module.exports = isBoolean;

},{"../internal/isObjectLike":250}],260:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 which returns 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

module.exports = isFunction;

},{"./isObject":262}],261:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isObjectLike = require('../internal/isObjectLike');

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isNative;

},{"../internal/isObjectLike":250,"./isFunction":260}],262:[function(require,module,exports){
/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],263:[function(require,module,exports){
var baseForIn = require('../internal/baseForIn'),
    isArguments = require('./isArguments'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"../internal/baseForIn":215,"../internal/isObjectLike":250,"./isArguments":257}],264:[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
}

module.exports = isString;

},{"../internal/isObjectLike":250}],265:[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{"../internal/isLength":249,"../internal/isObjectLike":250}],266:[function(require,module,exports){
var arrayCopy = require('../internal/arrayCopy'),
    getLength = require('../internal/getLength'),
    isLength = require('../internal/isLength'),
    values = require('../object/values');

/**
 * Converts `value` to an array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Array} Returns the converted array.
 * @example
 *
 * (function() {
 *   return _.toArray(arguments).slice(1);
 * }(1, 2, 3));
 * // => [2, 3]
 */
function toArray(value) {
  var length = value ? getLength(value) : 0;
  if (!isLength(length)) {
    return values(value);
  }
  if (!length) {
    return [];
  }
  return arrayCopy(value);
}

module.exports = toArray;

},{"../internal/arrayCopy":207,"../internal/getLength":239,"../internal/isLength":249,"../object/values":273}],267:[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":213,"../object/keysIn":269}],268:[function(require,module,exports){
var getNative = require('../internal/getNative'),
    isArrayLike = require('../internal/isArrayLike'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/getNative":241,"../internal/isArrayLike":245,"../internal/shimKeys":252,"../lang/isObject":262}],269:[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":246,"../internal/isLength":249,"../lang/isArguments":257,"../lang/isArray":258,"../lang/isObject":262}],270:[function(require,module,exports){
var createObjectMapper = require('../internal/createObjectMapper');

/**
 * Creates an object with the same keys as `object` and values generated by
 * running each own enumerable property of `object` through `iteratee`. The
 * iteratee function is bound to `thisArg` and invoked with three arguments:
 * (value, key, object).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
 *   return n * 3;
 * });
 * // => { 'a': 3, 'b': 6 }
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * // using the `_.property` callback shorthand
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
var mapValues = createObjectMapper();

module.exports = mapValues;

},{"../internal/createObjectMapper":235}],271:[function(require,module,exports){
var baseMerge = require('../internal/baseMerge'),
    createAssigner = require('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it's invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":223,"../internal/createAssigner":233}],272:[function(require,module,exports){
var keys = require('./keys'),
    toObject = require('../internal/toObject');

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"../internal/toObject":254,"./keys":268}],273:[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":230,"./keys":268}],274:[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],275:[function(require,module,exports){
var baseProperty = require('../internal/baseProperty'),
    basePropertyDeep = require('../internal/basePropertyDeep'),
    isKey = require('../internal/isKey');

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = property;

},{"../internal/baseProperty":225,"../internal/basePropertyDeep":226,"../internal/isKey":248}],276:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],277:[function(require,module,exports){
/**
 * sprintf implementation. Get pretty indented monospace strings.
 * @param {String} str - the string to parse
 * @param {...*} args - arguments, used in order, or referenced by n$
 * @returns {String}
 * @example
 * // Type casting...
 * sprintf('%s', 10); // '10'
 * sprintf('%s', 'abc'); // 'abc'
 *
 * // Escape anything else
 * sprintf('%%', 1); // '%'
 * sprintf('%T', 'abc'); // 'T'
 *
 * // Limit length
 * sprintf("%.5s", 'abcdef'); // 'bcdef'
 * sprintf("%-.5s", 'abcdef'); // 'abcde'
 *
 * // Indent to length
 * sprintf("%5s", 'a'); // '    a'
 * sprintf("%-5s", 'a'); // 'a    '
 * sprintf("%5.4s", 'abc'); // ' abc'
 * sprintf("%-5.4s", 'abc'); // 'abc '
 *
 * // Use pad chars
 * sprintf("%04s", 10); // "0010"
 * sprintf("%'#4s", 10); // "##10"
 *
 * // Use arguments in order
 * sprintf("%1$s, %2$s, %2$s, %1$s!", 'left', 'right'); // 'left, right, right, left!'
 */

var undefined,
	/* method vars */
	r = /%(\+)?(\d+\$)?(0|'.)?(-)?(\d+)?(\.\d+)?(.)/g,
	s = function(str) {
		var value,
			index = 1,
			execMatch,
			tempVar1,
			tempVar2,
			tempVar3;
		while (execMatch = r.exec(str)) {
			value = execMatch[7];

			// arg from index
			if ((tempVar2 = execMatch[2]) && tempVar2[(tempVar1 = tempVar2.length - 1)] == "$") {
				tempVar2 = tempVar2.substr(0, tempVar1);
			}

			if (s[tempVar1 = value.toLowerCase()] &&
				(tempVar3 = s[tempVar1](arguments[tempVar2 || index], /[A-Z]/.test(value), execMatch[1])) !== undefined) {

				value=''+tempVar3;

				// pad char
				if (tempVar1 = execMatch[3]) {
					if (tempVar1[0] == "'") {
						tempVar1 = tempVar1[1];
					}
				} else {
					tempVar1 = ' ';
				}
				if (tempVar2 = execMatch[5]) while (value.length < tempVar2) {
					value = execMatch[4] ? (value + tempVar1) : (tempVar1 + value);
				}

				if ((tempVar1 = execMatch[6] && execMatch[6].substr(1)) && value.length > tempVar1) {
					value = execMatch[4] ? value.substr(0, tempVar1) : value.substr(value.length - tempVar1);
				}
				index++;
			}
			str = str.substr(0, tempVar1 = execMatch.index) + value + str.substr(r.lastIndex);
			r.lastIndex = value.length + tempVar1;
		}
		return str;
	};

/**
 * Returns string value only if lowercase s.
 * @param {*} value
 * @param {Boolean} caps
 * @returns {String|undefined}
 */
s.s=function(value, caps) {
	return caps ? undefined : value+'';
};

module.exports = s;
},{}]},{},[59])(59)
});
