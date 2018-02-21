/*

*/

const collection = [
  { name: 'Ivan', age: 20, id: 1 },
  { name: 'Elena', age: 20, id: 2 },
  { name: 'Andrey', age: 20, id: 3 },
];

const indexByID = {
  1: collection[0],
  2: collection[1],
  3: collection[2],
};

const indexByName = {
  Ivan: collection[0]
}

indexByID[2]
