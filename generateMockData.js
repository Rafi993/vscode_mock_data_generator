const { times, mergeAll, type, keys, take} = require('ramda')
const tracery = require('tracery-grammar')
// TODO: clean up the code remove unwanted if
/**
 * Generates mock data for given schema
 * @param {Array} schema Array of objects
 * @param {Number} n Number of times to be repeated
 */
const generateMockData = (schema, n) =>{

  const grammar = {
    hero: ['human', 'alien', 'saitama', 'goku', 'vegeta', 'kakarot', 'one punch man', 'rat', 'cat', 'dog'],
    story: '#hero# is so #strength# that #takes# #type# #action# #connective# #hero# #tense# #action# defeated #hero#',
    connective: ['and', 'yet', 'but', 'inspite of', 'eventhough', 'moreover', 'also', 'as well as', 'furthermore', 'next', 'then', 'because', 'therefore', 'so'],
    takes: ['all it takes is', 'it is not enough to have just'],
    tense: ['did', 'did not', 'did"nt', 'could not', 'could'],
    type: ['one', 'serious', 'consecutive', 'rage'],
    action: ['punch', 'kick', 'kamehameha', 'transformation', 'burger', 'sandwich'],
    strength: ['strong', 'weak', 'fast', 'slow', 'fat', 'thin', 'dead', 'alive', 'fly']
  }

  if(Array.isArray(schema)){
    // Only first element is used to generate data
    const firstElement = schema[0];

    // If the schema is array of objects
    if(type(firstElement) === 'Object' ) {
      const mockData = times(() =>
         mergeAll(keys(firstElement).map(key => {
          let val = {
            'String': take(firstElement[key].length, tracery.createGrammar(grammar).flatten('#story#')),
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