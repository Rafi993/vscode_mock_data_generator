const { times, mergeAll, type, keys} = require('ramda')

// TODO: clean up the code remove unwanted if
/**
 * Generates mock data for given schema
 * @param {Array} schema Array of objects
 * @param {Number} n Number of times to be repeated
 */
const generateMockData = (schema, n) =>{
  if(Array.isArray(schema)){
    // Only first element is used to generate data
    const firstElement = schema[0];

    // If the schema is array of objects
    if(type(firstElement) === 'Object' ) {
      const mockData = times(() =>
         mergeAll(keys(firstElement).map(key => {
          let val = {
            'String':  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            'Object': generateMockData([firstElement[key]], 1)[0],
            'Array': generateMockData(firstElement[key], firstElement[key].length),
            'Undefined': '',
            'Number': Math.floor(Math.random())
            }[type(firstElement[key])]
          return {[key]: val}
          }
        )), n);
      
      return mockData;
    } else if(type(firstElement)=== 'String' || type(firstElement) === 'Number'){
      
      // If the array is just a flat list
      return Array(n + 1).join(firstElement).split('')
    }
  } else {
     // If the mock data is empty or just an object or primitive type
      return schema;
  }
}


exports.generateMockData = generateMockData;