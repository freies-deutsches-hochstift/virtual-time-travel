import { useDeviceOrientation } from './device-orientation';

describe('useDeviceOrientation', () => {
  const deviceOrientation = useDeviceOrientation();
  it('should start in unknown state', () => {
    expect(deviceOrientation.state).toEqual('unknown');
  });
  //   it('should report availability', () => {
  //     expect(deviceOrientation.available)
  //   });
});
