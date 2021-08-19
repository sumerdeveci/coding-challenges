import { render } from '@testing-library/react';
import { Row } from '../index';

const TestRow = () => <Row>Test row</Row>;

const setup = () => {
  const utils = render(<TestRow />);
  const row = utils.getByText('Test row');
  return {
    row,
    ...utils,
  };
};

describe('Row', () => {
  test('renders component', () => {
    const { row } = setup();

    expect(row).toBeInTheDocument();
  });
});
