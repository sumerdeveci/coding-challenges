import { render } from '@testing-library/react';
import { RowResponsive } from '../index';

const TestRowResponsive = () => <RowResponsive>Test rowResponsive</RowResponsive>;

const setup = () => {
  const utils = render(<TestRowResponsive />);
  const rowResponsive = utils.getByText('Test rowResponsive');
  return {
    rowResponsive,
    ...utils,
  };
};

describe('RowResponsive', () => {
  test('renders component', () => {
    const { rowResponsive } = setup();

    expect(rowResponsive).toBeInTheDocument();
  });
});
