import { render } from '@testing-library/react';
import ListRoute from './list';

describe('ListRoute', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListRoute />);
    expect(baseElement).toBeTruthy();
  });
});
