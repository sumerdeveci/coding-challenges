import { render } from '@testing-library/react';
import { Column } from '../index';

const TestColumn = () => <Column>Test column</Column>;

const setup = () => {
  const utils = render(<TestColumn />);
  const column = utils.getByText('Test column');
  return {
    column,
    ...utils,
  };
};

describe('Column', () => {
  test('renders component', () => {
    const { column } = setup();

    expect(column).toBeInTheDocument();
  });
});
