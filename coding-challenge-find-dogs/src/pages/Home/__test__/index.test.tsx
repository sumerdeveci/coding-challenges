import { render, waitFor } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { HomePage } from '../index';

const setup = ({ container }: { container?: HTMLElement }) => {
  // Ignore the error: ```Rendering components directly into document.body is discouraged```
  // Need to set container to document.body in some cases, to be able to test the ReactDOM.createPortal components such as modals
  const utils = render(<HomePage />, container ? { container } : {});
  const homePage = utils.container.querySelector('.homePage');
  return {
    homePage,
    ...utils,
  };
};

describe('HomePage', () => {
  test('renders component', () => {
    const { homePage } = setup({});
    expect(homePage).toBeInTheDocument();
  });

  test('Successfully upload and image and show the images of the dogs of the same breed', async () => {
    const { homePage, unmount, container } = setup({ container: document.body });
    expect(homePage).toBeInTheDocument();

    // Main parts of the page exists (controllers)
    expect(homePage?.querySelector('.dogImageGallery')).toBeInTheDocument();
    expect(homePage?.querySelector('.dogImageUpload')).toBeInTheDocument();

    // First no loading state
    expect(container.querySelector('.fullPageLoader')).not.toBeInTheDocument();

    // Download a sample image and then upload it
    const response = await fetch('https://images.dog.ceo/breeds/appenzeller/n02107908_1030.jpg');
    const imageBlob = await response.blob();
    const file = new File([imageBlob], 'appenzeller-doggo.jpg', { type: 'image/jpg' });

    const imageInput = homePage?.querySelector('input[type="file"]');
    // @ts-ignore
    Simulate.change(imageInput, { target: { files: [file] } });

    // Loading state after selecting a file (a valid file)
    expect(container.querySelector('.fullPageLoader')).toBeInTheDocument();

    // Wait for loading state to be gone, indicator of operations being done
    // (both image upload AND new images fetch (1000ms should be enough for transition in-between, it is not the best solution though))
    await waitFor(() => expect(container.querySelector('.fullPageLoader')).not.toBeInTheDocument(), {
      timeout: 10000,
      interval: 1000,
    });

    // Check for preview image
    expect(homePage?.querySelector('.selectedDogImage')).toBeInTheDocument();

    // Check for loaded dog images data being shown
    await waitFor(() => expect(homePage?.querySelector('.imageGallery img')).toBeInTheDocument(), {
      timeout: 10000,
    });

    unmount();
  }, 35000);
});
