import { render, screen, waitFor } from '@testing-library/react';
import { DogImageGallery } from '../index';
import { DogProvider } from '../../../providers/DogProvider';

const BREED_APPENZELLER = 'appenzeller';
const IMAGE_URL_APPENZELLER = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1030.jpg';

const setup = ({
  breedInitial,
  imageUrlInitial,
  container,
}: {
  breedInitial: string;
  imageUrlInitial: string;
  container?: HTMLElement;
}) => {
  // Ignore the error: ```Rendering components directly into document.body is discouraged```
  // Need to set container to document.body in some cases, to be able to test the ReactDOM.createPortal components such as modals
  const utils = render(
    <DogProvider breedInitial={breedInitial} imageUrlInitial={imageUrlInitial}>
      <DogImageGallery />
    </DogProvider>,
    container ? { container } : {}
  );
  const dogImageGallery = utils.container.querySelector('.dogImageGallery');
  return {
    dogImageGallery,
    ...utils,
  };
};

describe('DogImageGallery', () => {
  test('renders component without given breed and image', () => {
    const { dogImageGallery } = setup({ breedInitial: '', imageUrlInitial: '' });

    expect(dogImageGallery).toBeInTheDocument();
  });

  test('renders component for given breed and image', () => {
    const { dogImageGallery } = setup({ breedInitial: BREED_APPENZELLER, imageUrlInitial: IMAGE_URL_APPENZELLER });

    expect(dogImageGallery).toBeInTheDocument();
  });

  test('Shows welcome message if breed is empty', () => {
    // imageInitial should not matter in this case
    const { dogImageGallery } = setup({ breedInitial: '', imageUrlInitial: IMAGE_URL_APPENZELLER });

    expect(dogImageGallery).toBeInTheDocument();
    // Assume that the rest of the text will be there too, did not want to put it here and overload the test statement
    expect(screen.getByText('Welcome to Find Dogs!')).toBeInTheDocument();
  });

  test('Show error if breed is invalid', async () => {
    const { dogImageGallery } = setup({
      breedInitial: 'invalid breed',
      imageUrlInitial: IMAGE_URL_APPENZELLER,
    });

    expect(dogImageGallery).toBeInTheDocument();

    // Check for error message
    await waitFor(() => expect(dogImageGallery?.querySelector('.errorPrimary')).toBeInTheDocument(), {
      timeout: 10000,
    });
  }, 15000);

  test("Don't show the preview image if there is no image given", () => {
    const { dogImageGallery } = setup({ breedInitial: BREED_APPENZELLER, imageUrlInitial: '' });

    expect(dogImageGallery).toBeInTheDocument();
    expect(dogImageGallery?.querySelector('img')).not.toBeInTheDocument();
  });

  test(`Full check of component in case of proper input data`, async () => {
    const { dogImageGallery, unmount, container } = setup({
      breedInitial: BREED_APPENZELLER,
      imageUrlInitial: IMAGE_URL_APPENZELLER,
      container: document.body,
    });

    expect(dogImageGallery).toBeInTheDocument();

    // Check for loading state
    expect(container?.querySelector('.fullPageLoader')).toBeInTheDocument();

    // Check for preview image
    expect(dogImageGallery?.querySelector('.selectedDogImage')).toBeInTheDocument();

    // Check for loaded dog images data being shown
    await waitFor(() => expect(dogImageGallery?.querySelector('.imageGallery img')).toBeInTheDocument(), {
      timeout: 10000,
    });

    unmount();
  }, 15000);
});
