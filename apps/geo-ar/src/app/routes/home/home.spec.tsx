import { render } from '@testing-library/react';
import HomeRoute from './home';

describe('HomeRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HomeRoute />);
    expect(baseElement).toBeTruthy();
  });
});
