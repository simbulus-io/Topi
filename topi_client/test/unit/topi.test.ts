

// This is a suite of tests
describe('Test Topi', () => {

  beforeEach(() => {
  });

  // Nothing change in paths blob build should skip
  test('hello_mines_2021', () => {
    console.log('hello world');
    // trivial expectation
    expect(true).toBeTruthy();
  });

  test('this_will_fail', () => {
    // trivial expectation
    expect(false).toBeTruthy();
  });

});
