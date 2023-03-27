import { types } from "../types/types";

export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case types.addName:
      console.log('state.nameList', state.nameList);
      
      state.nameList.push(action.payload);
      console.log('new state', state);
      
      return state;
    case types.removeName:
      return {
        ...state,
      };
    case types.clearNameList:
      return {
        ...state
      };
    default:
      return state;
  }
};
