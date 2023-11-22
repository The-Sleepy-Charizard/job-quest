import { useEffect } from 'react';
import { EntryState } from '../../types';

type StorageSetter = (key: string, setFunc: React.Dispatch<React.SetStateAction<EntryState>>) => void;

const useSessionInfo: StorageSetter = (key, setFunc) => {
  useEffect(() => {
    if (sessionStorage.getItem(key)) {
      setFunc(JSON.parse(sessionStorage.getItem(key) as string))
    }
  }, [key, setFunc])
}

export default useSessionInfo;