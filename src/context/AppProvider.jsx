import { useReducer } from "react";
import { types } from "../types/types";
import { addToNameList, getNameList } from "../utils/localStorage";
import { AppContext } from "./AppContext";
import { appReducer } from "./appReducer";

const init = () => {
  const nameList = getNameList() || [];

  return {
    nameList,
  };
};

export const AppProvider = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, {}, init);

  const addName = (name = "") => {
    const action = {
      type: types.addName,
      payload: name,
    };

    addToNameList(name);
    dispatch(action);
  };

  const removeName = (name = "") => {
    const action = {
      type: types.removeName,
      payload: name,
    };

    dispatch(action);
  };

  const clearNameList = () => {
    const action = {
      type: types.clearNameList,
    };

    clearNameList();
    dispatch(action);
  };

  return (
    <AppContext.Provider
      value={{ ...appState, addName, removeName, clearNameList }}
    >
      {children}
    </AppContext.Provider>
  );
};
