import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { AppLSInstance } from '../utils/localStorage';

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
      const reducedArr = arr.reduce((accumulator, currentValue) => {
        if (
          currentValue.length !== 0
          && accumulator.indexOf(currentValue) === -1
        ) {
          accumulator.push(currentValue);
        }

        return accumulator;
      }, []);

      const total = [...prev, ...reducedArr];
      AppLSInstance.save(reducedArr);
      return total;
    });
  }, []);

  const cleanList = useCallback(() => {
    setList([]);
    AppLSInstance.clean();
  }, []);

  const removeElement = useCallback((el) => {
    setList((prev) => {
      const index = prev.indexOf(el);

      if (index >= 0) {
        AppLSInstance.remove(el);
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
    [list],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppProvider() {
  const provider = useContext(AppContext);

  if (!provider) {
    throw new Error('provider is undefined');
  }

  return provider;
}
