/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals, employees, prices, hours } = require('./data');
// const data = require('./data');

function animalsByIds(...ids) {
  return ids.map((element) => animals.find((animal) => animal.id === element));
}

function animalsOlderThan(specie, age) {
  const species = animals.filter((animal) => animal.name === specie);
  return species[0].residents.every((element) => element.age > age);
}

function employeeByName(employeeName) {
  return employees.reduce((accumulator, employee) => (employee.firstName === employeeName
  || employee.lastName === employeeName
    ? employee : accumulator), {});
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
}

function isManager(id) {
  return employees
    .map((employee) => employee.managers)
    .reduce((accumulator, manager) => accumulator.concat(manager), [])
    .some((manager) => manager === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
}

function animalCount(species) {
  const numbSpecies = () => animals.find((animal) => animal.name === species).residents.length;
  const allSpecies = () => animals.reduce((accumulator, animal) => (
    { ...accumulator, [animal.name]: animal.residents.length }), {});

  return (species !== undefined ? numbSpecies() : allSpecies());
}

function entryCalculator(entrants) {
  const totalPrice = () => {
    const { Adult = 0, Child = 0, Senior = 0 } = entrants;
    return ((prices.Adult * Adult) + (prices.Child * Child) + (prices.Senior * Senior));
  };
  return (entrants === undefined || entrants === {}
    ? 0
    : totalPrice());
}

// ANIMAL MAP v//

const createLocationsObj = () => (
  {
    NE: [],
    NW: [],
    SE: [],
    SW: [],
  }
);

const noParam = () => {
  const obj = createLocationsObj();
  const locations = Object.keys(obj);
  locations.forEach((location) => animals.forEach((animal) => {
    if (animal.location === location) {
      obj[location].push(animal.name);
    }
  }));
  return obj;
};

const setSex = (array, animal, sex) => {
  animal.residents.forEach((resident) => {
    if (resident.sex === sex) {
      array.push(resident.name);
    }
  });
};

const namedAnimal = (animal, param) => {
  const { sex = 'none', sorted = false } = param;
  const animalResidents = [];
  if (sex === 'none') {
    animal.residents.forEach((resident) => animalResidents.push(resident.name));
  } else {
    setSex(animalResidents, animal, sex);
  }
  return (sorted === false ? { [animal.name]: animalResidents }
    : { [animal.name]: animalResidents.sort() });
};

const displayAnimals = (param) => {
  const obj = createLocationsObj();
  const locations = Object.keys(obj);
  locations.forEach((location) => animals.forEach((animal) => {
    if (animal.location === location) {
      obj[location].push(namedAnimal(animal, param));
    }
  }));
  return obj;
};

const withParam = (param) => {
  const { includeNames = false } = param;
  return (includeNames === false ? noParam() : displayAnimals(param));
};

function animalMap(options) {
  return (options === undefined ? noParam() : withParam(options));
}

// ANIMAL MAP ^ //

function schedule(dayName) {
  const { Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday } = hours;
  const days = {
    Tuesday: `Open from ${Tuesday.open}am until ${Tuesday.close - 12}pm`,
    Wednesday: `Open from ${Wednesday.open}am until ${Wednesday.close - 12}pm`,
    Thursday: `Open from ${Thursday.open}am until ${Thursday.close - 12}pm`,
    Friday: `Open from ${Friday.open}am until ${Friday.close - 12}pm`,
    Saturday: `Open from ${Saturday.open}am until ${Saturday.close - 12}pm`,
    Sunday: `Open from ${Sunday.open}am until ${Sunday.close - 12}pm`,
    Monday: 'CLOSED',
  };
  const entries = Object.entries(days);
  const singleDayArray = entries.find((element) => element[0] === dayName);
  return (dayName === undefined ? days
    : { [singleDayArray[0]]: singleDayArray[1] });
}

function oldestFromFirstSpecies(employeeId) {
  const employeeObj = employees.find((employee) => employeeId === employee.id);
  const firstSpecieId = employeeObj.responsibleFor[0];
  const firstSpecie = animals.find((animal) => animal.id === firstSpecieId);
  const oldest = firstSpecie.residents
    .sort((residentA, residentB) => residentB.age - residentA.age)[0];
  return Object.values(oldest);
}

function increasePrices(percentage) {
  const increase = ((percentage / 100) + 1);
  const keys = Object.keys(prices);
  keys.forEach((key) => {
    prices[key] = Math.round(prices[key] * increase * 100) / 100;
  });
}

// EMPLOYEE COVERAGE

const getAnimalName = (arrayIds) => arrayIds.map((id) => {
  const animalObj = animalsByIds(id);
  return animalObj[0].name;
});

const allEmployees = () => employees
  .reduce((accumulator, employee) =>
    ({ ...accumulator,
      [`${employee.firstName} ${employee.lastName}`]:
        getAnimalName(employee.responsibleFor) }), {});

const oneEmployee = (idOrName) => {
  const selectedEmployee = employees.find((employee) => employee.id === idOrName
  || employee.firstName === idOrName
  || employee.lastName === idOrName);
  const { firstName, lastName, responsibleFor } = selectedEmployee;
  return { [`${firstName} ${lastName}`]: getAnimalName(responsibleFor) };
};

function employeeCoverage(idOrName) {
  return (idOrName === undefined) ? allEmployees() : oneEmployee(idOrName);
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
