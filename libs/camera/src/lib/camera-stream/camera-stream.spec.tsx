import { render } from '@testing-library/react';

import CameraStream from './camera-stream';

describe('CameraStream', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CameraStream />);
    expect(baseElement).toBeTruthy();
  });
});
