import { render } from '@testing-library/react';

import Csvtojson from './csvtojson';

describe('Csvtojson', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Csvtojson />);
    expect(baseElement).toBeTruthy();
  });
});
