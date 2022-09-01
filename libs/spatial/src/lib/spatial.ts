import { useDeviceOrientation } from './device-orientation';
import { useLocation } from './location';

export function useSpatial() {
  // TODO Use Profiler to see if orientation is causing everything to rerender too often
  const orientation = useDeviceOrientation();
  const location = useLocation();

  return {
    orientation,
    location,
  };
}
