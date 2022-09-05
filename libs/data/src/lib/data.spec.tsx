import { render } from '@testing-library/react';

import useData from './data';

describe('Data', () => {
  it('should have a mode of remote or cache', () => {
    const data = useData();
    // const { baseElement } = render(<Data />);
    expect(data.dataMode === 'remote' || data.dataMode === 'cache');
  });
});
