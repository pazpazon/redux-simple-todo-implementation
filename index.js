
function createStore (){
  // 1. the state
  // 2. get the state
  // 3. listen to changes
  // 4. update the state
  let state
  let listeners = []

  const getState = () => state

  const subcribe = (listener) => {
    listeners.push(listener)
    return () => listeners = listers.filter((fn) => fn !== listener)
  }

  const dispatch = (action) => {
    // call reducer
    state = todos(state, action)
    // invoke listeners w. new state
    listeners.forEach((listener) => listener())
  }

  return {
    getState,
    subscirbe,
    dispatch
  }
}

/*
Characteristics of a pure function:
1. always returns the same value for the same arguments
2. only depend on the arguments passed to them
3. never produce any side effects
*/

function todos(state = [], action){
  if (action.type === 'ADD_TODO'){
    return state.concat([action.todo])
  }

  return state
}