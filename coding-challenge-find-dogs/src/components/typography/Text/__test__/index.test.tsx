import { render } from '@testing-library/react';
import { Text } from '../index';

const setup = () => {
  const utils = render(<Text />);
  const textComponent = utils.container.querySelector('.text');
  return {
    textComponent,
    ...utils,
  };
};

describe('Text', () => {
  test('renders component', () => {
    const { textComponent } = setup();
    expect(textComponent).toBeInTheDocument();
  });
});
