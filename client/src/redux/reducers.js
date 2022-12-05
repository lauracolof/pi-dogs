import { filterByName } from "./actions";

const initialState = {
  dogs: [],
  dogsAll: [],
  temperaments: [],
  detail: []
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_DOGS':
      return {
        ...state,
        dogs: action.payload,
        dogsAll: action.payload
      }
    case 'FILTER_BY_WEIGHT':
      let weightFiltered = [...state.dogs]
      if (action.payload === 'LightWeight') {
        weightFiltered.sort((a, b) => {
          return parseInt(a.weight) - parseInt(b.weight);
        });
      }
      if (action.payload === 'HeavyWeight') {
        weightFiltered.sort((a, b) => {
          return parseInt(b.weight) - parseInt(a.weight);
        });
      }
      return {
        ...state,
        dogs: weightFiltered,
      };
    case 'FILTER_DOGS_BY_TEMPERAMENT':
      const allDogs = state.dogsAll
      const tempDogs = allDogs.filter(dog => {
        if (dog.temperaments) {
          const temperament = dog.temperaments.map(dog => dog.name)
          return temperament.includes(action.payload)
        }
        if (dog.temperament) {
          return dog.temperament.includes(action.payload)
        }
        return null
      })
      return {
        ...state,
        dogs: action.payload === 'Temps' ? allDogs : tempDogs
      };
    case 'FILTER_BY_CREATED':
      const allDogTemp = state.dogsAll;
      const createdFilter =
        action.payload === 'AllDogs'
          ? allDogTemp
          : allDogTemp.filter((e) => {
            if (action.payload === 'Created') {
              if (e.createdAtDb) {
                return e;
              }
            } else if (action.payload === 'Api') {
              if (!e.createdAtDb) {
                return e;
              }
            }
          });
      return {
        ...state,
        dogs: createdFilter
      };
    case 'ORDER_BY_NAME':
      const dogsSorted =
        action.payload === 'Asc'
          ? state.dogs.sort(function (a, b) {
            if (a.name > b.name) return 1;
            if (a.name < b.name) return -1;
            else return 0;
          })
          : state.dogs.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            else return 0;
          })
      return {
        ...state,
        dogs: dogsSorted
      }
    case 'GET_DOGS_NAME':
      return {
        ...state,
        dogs: action.payload
      }
    case 'POST_DOG':
      return {
        ...state
      }
    case 'GET_DOGS_TEMPERAMENT':
      return {
        ...state,
        temperaments: action.payload
      }
    case 'GET_DETAIL':
      return {
        ...state,
        detail: action.payload
      }
    default:
      return state;
  };
};

export default rootReducer;