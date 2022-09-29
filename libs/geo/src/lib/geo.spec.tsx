import { render } from '@testing-library/react';

import Geo from './geo';

describe('Geo', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Geo />);
    expect(baseElement).toBeTruthy();
  });
});
