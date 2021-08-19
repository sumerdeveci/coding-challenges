import { render } from '@testing-library/react';
import { Title } from '../index';

const setup = () => {
  const utils = render(<Title />);
  const titleComponent = utils.container.querySelector('.title');
  return {
    titleComponent,
    ...utils,
  };
};

describe('Title', () => {
  test('renders component', () => {
    const { titleComponent } = setup();
    expect(titleComponent).toBeInTheDocument();
  });
});
