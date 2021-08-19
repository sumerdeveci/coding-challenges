import { render, screen } from '@testing-library/react';
import { ImageGallery } from '../index';

const setup = ({ rowHeight }: { rowHeight?: number }) => {
  const utils = render(
    <ImageGallery
      images={[
        { url: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg', alt: 'Hound 1' },
        { url: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1007.jpg', alt: 'Hound 2' },
      ]}
      rowHeight={rowHeight}
    />
  );

  const imageGallery = utils.container.querySelector('.imageGallery');
  return {
    imageGallery,
    ...utils,
  };
};

describe('ImageGallery', () => {
  test('renders component', () => {
    const { imageGallery } = setup({});
    expect(imageGallery).toBeInTheDocument();
  });

  test('displays images', () => {
    setup({});
    expect(screen.getByAltText('Hound 1')).toBeInTheDocument();
    expect(screen.getByAltText('Hound 2')).toBeInTheDocument();
  });

  test('Set custom row height correctly', () => {
    setup({ rowHeight: 220 });
    expect(screen.getByAltText('Hound 1')).toBeInTheDocument();
    expect(screen.getByAltText('Hound 1').style.height).toBe("220px");
    expect(screen.getByAltText('Hound 2')).toBeInTheDocument();
    expect(screen.getByAltText('Hound 2').style.height).toBe("220px");
  });
});
