export const getNameList = (key = "names") => {
  return JSON.parse(localStorage.getItem(key));
};

export const addToNameList = (newName, key = "names") => {
  const currentNames = JSON.parse(localStorage.getItem(key)) || [];
  const nameList = currentNames === null ? nameList = [currentNames] : [...currentNames, newName];
  localStorage.setItem(key, JSON.stringify(nameList));
};

export const removeNameFromList = (name = "") => {
    
}

export const clearNameList = (key = "names") => {
    localStorage.setItem(key, []);
}