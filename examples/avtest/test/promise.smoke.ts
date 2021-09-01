// tslint:disable: arrow-parens

class TinyStaticClass {
  public static async test_method() {
    return new Promise((resolve, reject) => {
      // in 1 sec resolve the promise
      setTimeout(() => {
        resolve('promise resolved');
      }, 1000);
    });
  }
}

const a_func_that_returns_promise_that_resolves = () => {
  return new Promise((resolve, reject) => {
    // in 1 sec resolve the promise
    setTimeout(() => {
      resolve('promise resolved');
    }, 1000);
  });
};

const a_func_that_returns_promise_that_rejects = () => {
  return new Promise((resolve, reject) => {
    // in 1 sec reject the promise
    setTimeout(() => {
      reject('promise rejected');
    }, 1000);
  });
};

describe('Smoking smoke tests', () => {

  test('TestTinyStaticClass', async done => {
      const rval = await TinyStaticClass.test_method();
      expect(rval).toBe('promise resolved');
      done();
    });

  test('TestPromisesResolved', async done => {
      // with then and .catch
      a_func_that_returns_promise_that_resolves().then((rval) => {
        expect(rval).toBe('promise resolved');
      }).catch(() => {
        throw new Error('this should not happen');
      });
      // with async/await
      try {
        const rval2 = await a_func_that_returns_promise_that_resolves();
        expect(rval2).toBe('promise resolved');
      } catch (e) {
        throw new Error('this should not happen');
      }
      done();
    });

    // done is a jest-ism
  test('TestPromisesRejected', async done => {
      // with then and .catch
      a_func_that_returns_promise_that_rejects().then((rval) => {
        throw new Error('this should not happen');
      }).catch((err) => {
        expect(err).toBe('promise rejected');
      });

      // with async/await
      try {
        const rval2 = await a_func_that_returns_promise_that_rejects();
        throw new Error('this should not happen');
      } catch (err) {
        expect(err).toBe('promise rejected');
        // This done() is a jest-ism - nothing to do with promises or async/await 
        // Simply tells jest to wait until the asynchronus test finishes or times
        // out before quitting
        done();
      }
    });

    // ToDo: #245 - Yasi - write a test that loops over these functions collects
    // the promises and then waits for them all to resolve
  test('Gather All Promises', async (done) => {
      const array_that_rejects = [a_func_that_returns_promise_that_rejects(),
      a_func_that_returns_promise_that_resolves()];
      try {
        const responses = await Promise.all(array_that_rejects);
      } catch (err) {
        console.log('one of the promises rejected');
      }
      const array_that_resolves = [a_func_that_returns_promise_that_resolves(),
      a_func_that_returns_promise_that_resolves()];
      try {
        const responses = await Promise.all(array_that_resolves);
        console.log('woot! all promises resolve');
      } catch (err) {
        console.log('this should not happen');
      }
      done();
    });


  test('Return type of function', async done => {
      // const promise = new Promise((resolve, reject) => {resolve(2);} )
      const rval2 = await a_func_that_returns_promise_that_resolves();
      expect(typeof rval2).toBe('string');
      done();
    });

  // // the promises and then waits for them all to resolve
  test('Gathering Promises', async done => {
      const promises = [a_func_that_returns_promise_that_resolves(), a_func_that_returns_promise_that_rejects(),
      ].map(prom => prom.catch(err => err));

      await Promise.all(promises).then(values => {
        expect(values).toEqual(['promise resolved', 'promise rejected']);
      });
      done();
    });
});

