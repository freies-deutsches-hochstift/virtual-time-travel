import { render } from '@testing-library/react';

import Examples from './examples';

describe('Examples', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Examples />);
    expect(baseElement).toBeTruthy();
  });
});
