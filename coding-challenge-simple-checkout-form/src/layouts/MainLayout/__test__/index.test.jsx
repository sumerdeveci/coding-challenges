import { render } from '@testing-library/react';
import { MainLayout } from '../index';

const TestMainLayout = () => <MainLayout>Test mainLayout</MainLayout>;

const setup = () => {
  const utils = render(<TestMainLayout />);
  const mainLayout = utils.getByText('Test mainLayout');
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
