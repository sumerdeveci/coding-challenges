import { render } from '@testing-library/react';
import { Title } from '../index';

const TestTitle = () => <Title>Test title</Title>;

const setup = () => {
  const utils = render(<TestTitle />);
  const title = utils.getByText('Test title');
  return {
    title,
    ...utils,
  };
};

describe('Title', () => {
  test('renders component', () => {
    const { title } = setup();

    expect(title).toBeInTheDocument();
  });
});
