import { render } from '@testing-library/react';
import { ThreeDotsLoader } from '../index';

const setup = () => {
  const utils = render(<ThreeDotsLoader />);
  const threeDotsLoader = utils.container.querySelector('.threeDotsLoader');
  return {
    threeDotsLoader,
    ...utils,
  };
};

describe('ThreeDotsLoader', () => {
  test('renders component', () => {
    const { threeDotsLoader } = setup();
    expect(threeDotsLoader).toBeInTheDocument();
  });
});
