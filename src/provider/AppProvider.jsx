import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { AppLSInstance, readSetting, saveSetting } from '../utils/localStorage';

const SHOW_GIF_KEY = 'showGifSetting';
const REMOVE_NAME_KEY = 'removeNameSetting';

const AppContext = createContext([]);

export function AppProvider({ children }) {
  const [showGif, setShowGif] = useState(() => readSetting(SHOW_GIF_KEY, true));
  const [removeNameAfterPicking, setRemoveNameAfterPicking] = useState(() => readSetting(REMOVE_NAME_KEY, true));
  const [list, setList] = useState(() => AppLSInstance.read());

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

  const toggleShowGif = useCallback(() => {
    setShowGif((prev) => {
      const newValue = !prev;
      saveSetting(SHOW_GIF_KEY, newValue);
      return newValue;
    });
  }, []);

  const toggleRemoveNameAfterPicking = useCallback(() => {
    setRemoveNameAfterPicking((prev) => {
      const newValue = !prev;
      saveSetting(REMOVE_NAME_KEY, newValue);
      return newValue;
    });
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
      showGif,
      toggleShowGif,
      removeNameAfterPicking,
      toggleRemoveNameAfterPicking,
    }),
    [list, showGif, removeNameAfterPicking],
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
