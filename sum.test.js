// const sum = require('./sum')


// Test a value TO BE something
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

// Test a value NOT TO BE something
test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(a + b).not.toBe(0);
    }
  }
});

/* To be something:
  toBeNull - matches only null
  toBeUndefined - matches only undefined
  toBeDefined - is the opposite of toBeUndefined
  toBeTruthy - matches anything that an if statement treats as true
  toBeFalsy - matches anything that an if statement treats as false
 */

// Truthiness:
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

// Falsiness:
test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

// Numbers:
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
})


// For floating point equality, use toBeCloseTo instead of toEqual or toBe:
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);         This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

// Strings:
//(with Regular Expressions)
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

// Arrays:
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
});

// Callbacks:
// test('the data is peanut butter', done => {
//   function callback(data) {
//     expect(data).toBe('peanut butter');
//     done();
//   }
//
//   fetchData(callback);
// });

//If done() is never called, the test will fail, which is what you want to happen.
