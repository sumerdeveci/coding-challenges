import { fireEvent, render, screen } from '@testing-library/react';
import { FC, useContext } from 'react';
import { DogContext, DogProvider } from '../index';

const BREED_APPENZELLER = 'appenzeller';
const IMAGE_URL_APPENZELLER = 'https://images.dog.ceo/breeds/appenzeller/n02107908_1030.jpg';

const DogProviderTestChild: FC = () => {
  const { breed, imageUrl, updateBreedAndImageUrl } = useContext(DogContext);

  const onButtonClick = () => updateBreedAndImageUrl({ breed: BREED_APPENZELLER, imageUrl: IMAGE_URL_APPENZELLER });

  return (
    <div className="dogProviderTestChild">
      <div data-testid="breed">{breed}</div>
      <div data-testid="imageUrl">{imageUrl}</div>
      <button data-testid="updateBreedAndImage" onClick={onButtonClick}>
        Update breed and image
      </button>
    </div>
  );
};

const setup = () => {
  const utils = render(
    <DogProvider>
      <DogProviderTestChild />
    </DogProvider>
  );
  const dogProviderTestChild = utils.container.querySelector('.dogProviderTestChild');
  return {
    dogProviderTestChild,
    ...utils,
  };
};

describe('DogProvider', () => {
  test('renders component', () => {
    const { dogProviderTestChild } = setup();
    expect(dogProviderTestChild).toBeInTheDocument();
  });

  test('Init context consists of empty strings and changing context works', () => {
    const { dogProviderTestChild } = setup();
    expect(dogProviderTestChild).toBeInTheDocument();

    expect(screen.getByTestId('breed').textContent).toBe('');
    expect(screen.getByTestId('imageUrl').textContent).toBe('');

    fireEvent.click(screen.getByTestId('updateBreedAndImage'));

    expect(screen.getByTestId('breed').textContent).toBe(BREED_APPENZELLER);
    expect(screen.getByTestId('imageUrl').textContent).toBe(IMAGE_URL_APPENZELLER);
  });
});
