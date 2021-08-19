import { render } from '@testing-library/react';
import { MainLayout } from '../index';

const setup = () => {
  const utils = render(<MainLayout>Test mainLayout</MainLayout>);
  const mainLayout = utils.container.querySelector('.mainLayout');
  return {
    mainLayout,
    ...utils,
  };
};

describe('MainLayout', () => {
  test('renders component', () => {
    const { mainLayout } = setup();

    expect(mainLayout).toBeInTheDocument();
  });
});
