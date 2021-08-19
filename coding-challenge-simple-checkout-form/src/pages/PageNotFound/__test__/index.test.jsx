import { render } from '@testing-library/react';
import { PageNotFoundPage } from '../index';

const TestPageNotFoundPage = () => <PageNotFoundPage />;

const setup = () => {
  const utils = render(<TestPageNotFoundPage />);
  const pageNotFoundPage = utils.container.querySelector('.pageNotFoundPage');
  return {
    pageNotFoundPage,
    ...utils,
  };
};

describe('PageNotFoundPage', () => {
  test('renders component', () => {
    const { pageNotFoundPage } = setup();
    expect(pageNotFoundPage).toBeInTheDocument();
  });
});
