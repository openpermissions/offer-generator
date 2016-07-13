/**
 * Copyright 2016 Open Permissions Platform Coalition
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/*global describe, it*/
/*jshint -W030 */
var should = require('should'),
    util = require('../src/util');

describe('util', function () {
  describe('valuesFor', function () {
    it('should return values from the object', function () {
      var obj = {'a': 1, 'c': 2, 'b': 3, 'd': 4};
      var func = util.valuesFor(['a', 'b', 'c']);
      func(obj).should.eql([1, 3, 2]);
    });

    it('should return undefined if a key is missing', function () {
      var obj = {'a': 1, 'c': 2, 'b': 3, 'd': 4};
      var func = util.valuesFor(['a', 'b', 'e']);
      func(obj).should.eql([1, 3, undefined]);
    });

    it('should return an empty list if no keys given', function () {
      var obj = {'a': 1, 'c': 2, 'b': 3, 'd': 4};
      var func = util.valuesFor([]);
      func(obj).should.eql([]);
    });
  });
});
