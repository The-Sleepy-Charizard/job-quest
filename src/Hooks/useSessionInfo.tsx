import { useEffect } from 'react';
import { EntryState } from '../../types';

const useSessionInfo = (key: string, setFunc: React.Dispatch<React.SetStateAction<EntryState>>) => {
  useEffect(() => {
    if (sessionStorage.getItem(key)) {
      setFunc(JSON.parse(sessionStorage.getItem(key) as string))
    }
  })
}

export default useSessionInfo;