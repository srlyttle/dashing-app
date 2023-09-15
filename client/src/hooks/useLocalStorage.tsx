import { useState } from "react";

type StorageDataType<T> = T | null;

const useLocalStorage = <T,>(
  key: string
): [StorageDataType<T>, (data: StorageDataType<T>) => void] => {
  const [data, setData] = useState<StorageDataType<T>>(() => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  });

  const updateData = (newData: StorageDataType<T>) => {
    setData(newData);
    if (newData) {
      localStorage.setItem(key, JSON.stringify(newData));
    } else {
      localStorage.removeItem(key);
    }
  };

  return [data, updateData];
};

export default useLocalStorage;
