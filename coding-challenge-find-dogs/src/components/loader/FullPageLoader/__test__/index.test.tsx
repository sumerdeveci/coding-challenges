import { render, screen } from '@testing-library/react';
import { FullPageLoader } from '../index';

const setup = ({ visible, message }: { visible: boolean; message?: string }) => {
  // Ignore the error: ```Rendering components directly into document.body is discouraged```
  // Need to set conatiner to document.body, to be able to test the ReactDOM.createPortal components
  const utils = render(<FullPageLoader visible={visible} message={message} />, { container: document.body });
  const fullPageLoader = utils.container.querySelector('.fullPageLoader');
  return {
    fullPageLoader,
    ...utils,
    // Added as extra too, becuase it should be called in each test at the end, should not forget to add this at the end of each test.
    // And afterEach would not work, as this is returned in the tests, not test suites
    unmount: utils.unmount,
  };
};

describe('FullPageLoader', () => {
  test('renders component', () => {
    const { fullPageLoader, unmount } = setup({ visible: true });
    expect(fullPageLoader).toBeInTheDocument();
    unmount();
  });

  test('Shows custom loading message correctly', () => {
    const { unmount } = setup({ visible: true, message: 'Loading message..' });
    expect(screen.getByText('Loading message..')).toBeInTheDocument();
    unmount();
  });

  test("Don't show the loader if visible is false", () => {
    const { fullPageLoader, unmount } = setup({ visible: false });
    expect(fullPageLoader).not.toBeInTheDocument();
    unmount();
  });
});
