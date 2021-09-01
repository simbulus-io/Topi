import { AVTestUtil } from '../src/util/avtest_util';
import {UAParser} from 'ua-parser-js';

beforeEach( () => {
  // ToDo: remove this hack
  ParserUtils.parser = new UAParser();
});

describe('Smoking smoke tests', () => {

  test('Test AVTestUtil.test_return_true', () => {
    console.log('blah blah blah');
    expect(AVTestUtil.test_return_true()).toBeTruthy();
  });

  test('Test AVTestUtil.test_return_false', () => {
    expect(AVTestUtil.test_return_false()).toBeFalsy();
  });

});


