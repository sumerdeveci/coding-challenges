import { render } from '@testing-library/react';
import { PageAnimation } from '../index';

const TestPageAnimation = () => <PageAnimation PageComponent={() => <div></div>} />;

const setup = () => {
  const utils = render(<TestPageAnimation />);
  const pageAnimation = utils.container.querySelector('.pageAnimation');
  return {
    pageAnimation,
    ...utils,
  };
};

describe('PageAnimation', () => {
  test('renders component', () => {
    const { pageAnimation } = setup();

    expect(pageAnimation).toBeInTheDocument();
  });
});
