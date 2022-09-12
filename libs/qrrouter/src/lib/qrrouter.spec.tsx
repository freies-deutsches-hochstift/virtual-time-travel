import { render } from '@testing-library/react';

import Qrrouter from './qrrouter';

describe('Qrrouter', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Qrrouter />);
    expect(baseElement).toBeTruthy();
  });
});
