import { render } from '@testing-library/react';

import Povs from './povs';

describe('Povs', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Povs />);
    expect(baseElement).toBeTruthy();
  });
});
