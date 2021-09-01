import * as _ from 'lodash';

const a_collection = [1, 'two', 3];

// *Yasi - This is as consise as you can get on a fat-arrow predicate .. no
// brackets around the function body and an implicit return value.. You will see
// this occasionally from JS cognoscenti - note in JS you don't need the parens 
// around the function arg .. but TS wants them and a explicity any type
const is_a_string = (v: any) => typeof v === 'string' || v instanceof String;

// *Yasi - this is a more explicit version of the same predicate
// tslint:disable-next-line:arrow-return-shorthand
const is_a_string2 = (arg: any) => { return (typeof arg === 'string' || arg instanceof String); };

describe('lodash smoke tests', () => {

test('Test reject', () => {
    const v1 = _.reject(a_collection, is_a_string);
    const v2 = _.reject(a_collection, is_a_string2);
    // *final form of predicate is inline 
    const v3 = _.reject(a_collection, (v: any) => typeof v === 'string' || v instanceof String);
    expect(v1).toEqual([1, 3]);
    expect(v2).toEqual([1, 3]);
    expect(v3).toEqual([1, 3]);
  });

});

