import { generateMockData } from '../generateMockData';

// The module 'assert' provides assertion methods from node
const assert = require('assert');

suite('Generating mock data',()=>{

  const schema = [{
    'name': 'sam',
    'age': 100,
    user: [1,2]
  }]

  test('check if generate mock data works for array of objects', ()=>{
    assert(generateMockData(schema, 5).length === 5)
  })

  test('check if generate mock data works for objects', ()=>{
    assert(Object.keys(generateMockData(schema[0], 5)).length === Object.keys(schema).length)
  })

})