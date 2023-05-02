export const Reducer = (state = {
    isloggedin : localStorage.getItem('token') ? true : false}, action) => {
  switch (action.type) {
    case "LOGIN": {
      state = { ...state }
      state.isloggedin = true
      return state
    }
    case "CARTCOUNT":{
        state = {...state}
        state.cartCount = action.payload
        return state
    }
    case "SET_ADDRESS":{
      state = {...state}
      state.setAddress = action.payload
      return state
    }
    case "TOTAL_AMOUNT":{
      state = {...state}
      state.finalAmount = action.payload
      return state
    }

    default : return state
  }
};
