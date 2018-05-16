
function createStore (reducer){
  // 1. the state
  // 2. get the state
  // 3. listen to changes
  // 4. update the state
  let state
  let listeners = []

  const getState = () => state

  const subscribe = (listener) => {
    listeners.push(listener)
    return () => listeners = listers.filter((l) => l !== listener)
  }

  const dispatch = (action) => {
    // call reducer
    state = reducer(state, action)
    // invoke listeners
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

/*
Characteristics of a pure function:
1. always returns the same value for the same arguments
2. only depend on the arguments passed to them
3. never produce any side effects
*/

//Reducer functions

//actions:
const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'
const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

function todos(state = [], action){
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);

    case REMOVE_TODO:
      return state.filter(item => item.id !== action.id);

    case TOGGLE_TODO:
      return state.map(item => (item.id !== action.id ? item : Object.assign(
                {},
                item,
                { complete: !item.complete }
              )));

    default:
      return state;
  }
}

function goals(state = [], action){
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);

    case REMOVE_GOAL:
      return state.filter(item => item.id !== action.id);

    default:
      return state;
  }
}

function App(state = {}, action){
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action)
  }
}