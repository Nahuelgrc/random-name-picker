import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { AppLSInstance } from "../utils/localStorage.js";

const AppContext = createContext([]);

export function AppProvider({ children }) {
  const [list, setList] = useState(AppLSInstance.read());

  const addToList = useCallback((el) => {
    setList((prev) => {
      if (prev.indexOf(el) === -1) {
        prev.push(el);
        AppLSInstance.save([el]);
      }
      return [...prev];
    });
  }, []);

  const addBulkToList = useCallback((arr) => {
    setList((prev) => {
      const total = [...prev, ...arr];
      AppLSInstance.save(arr);
      return total;
    });
  }, []);

  const cleanList = useCallback(() => {
    setList([]);
    AppLSInstance.clean();
  }, []);

  const removeElement = useCallback(() => {
    setList((prev) => {
      const index = prev.indexOf(el);

      if (index >= 0) {
        prev.splice(index, 1);
      }
      return [...prev];
    });
  }, []);

  const value = useMemo(
    () => ({
      list,
      addToList,
      addBulkToList,
      removeElement,
      cleanList,
    }),
    [list]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppProvider() {
  const provider = useContext(AppContext);

  if (!provider) {
    throw new Error("provider is undefined");
  }

  return provider;
}
