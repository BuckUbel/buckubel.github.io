export enum LocalStorageKeys {
  COLOR_PALETTES = 'COLOR_PALETTES'
}

export const useSimpleLocalStorage = <T>(key: LocalStorageKeys, defaultData: T[] = []) => {
  const serData = localStorage.getItem(key);
  if (!serData) localStorage.setItem(key, JSON.stringify(defaultData));
  const getData = (): T[] => {
    const serData = localStorage.getItem(key);
    if (!serData) return defaultData;
    return JSON.parse(serData);
  };
  const setData = (data: T[]) => {
    const newSerData = JSON.stringify(data);
    localStorage.setItem(key, newSerData);
  };
  const getItem = (index: number): T | undefined => {
    const serDataString = localStorage.getItem(key);
    if (!serDataString) return undefined;
    const serData = JSON.parse(serDataString);
    if (!serData[index]) return undefined;
    return serData[index];
  };
  const setItem = (index: number, data: T) => {
    const serDataString = localStorage.getItem(key);
    if (!serDataString) localStorage.setItem(key, '[]');
    const serData = JSON.parse(localStorage.getItem(key) as string);
    serData[index] = data;
    const newSerData = JSON.stringify(data);
    localStorage.setItem(key, newSerData);
  };

  return {getData, setData, getItem, setItem};

};
