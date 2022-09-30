import { useEffect } from 'react';

export function useData(fetchRequest: () => void) {
  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);
}

export default useData;
