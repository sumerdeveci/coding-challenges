import { render, waitFor } from '@testing-library/react';
import { DogImageUpload } from '../index';
import { DogProvider } from '../../../providers/DogProvider';
import { Simulate } from 'react-dom/test-utils';

const setup = ({ container }: { container?: HTMLElement }) => {
  // Ignore the error: ```Rendering components directly into document.body is discouraged```
  // Need to set container to document.body in some cases, to be able to test the ReactDOM.createPortal components such as modals
  const utils = render(
    <DogProvider>
      <DogImageUpload />
    </DogProvider>,
    container ? { container } : {}
  );
  const dogImageUpload = utils.container.querySelector('.dogImageUpload');
  return {
    dogImageUpload,
    ...utils,
  };
};

describe('DogImageUpload', () => {
  test('renders component', () => {
    const { dogImageUpload } = setup({});
    expect(dogImageUpload).toBeInTheDocument();
  });

  test('Includes the necessary html elements', () => {
    const { dogImageUpload } = setup({});
    expect(dogImageUpload?.querySelector('input[type="file"]')).toBeInTheDocument();
    expect(dogImageUpload?.querySelector('label')).toBeInTheDocument();
  });

  test('Successfully uploads an image', async () => {
    const { dogImageUpload, unmount, container } = setup({ container: document.body });
    expect(dogImageUpload).toBeInTheDocument();

    // First no loading state
    expect(container.querySelector('.fullPageLoader')).not.toBeInTheDocument();

    // Download a sample image and then upload it via the component
    const response = await fetch('https://images.dog.ceo/breeds/appenzeller/n02107908_1030.jpg');
    const imageBlob = await response.blob();
    const file = new File([imageBlob], 'appenzeller-doggo.jpg', { type: 'image/jpg' });

    const imageInput = dogImageUpload?.querySelector('input[type="file"]');
    // @ts-ignore
    Simulate.change(imageInput, { target: { files: [file] } });

    // Loading state after selecting a file (a valid file)
    expect(container.querySelector('.fullPageLoader')).toBeInTheDocument();

    // Wait for loading state to be gone, indicator of operations being done
    await waitFor(() => expect(container.querySelector('.fullPageLoader')).not.toBeInTheDocument(), { timeout: 10000 });

    unmount();
  }, 15000);
});
