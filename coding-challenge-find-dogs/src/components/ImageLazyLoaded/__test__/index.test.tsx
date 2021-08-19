import { render, screen } from '@testing-library/react';
import { ImageLazyLoaded } from '../index';

const setup = ({ height }: { height?: number }) => {
  const utils = render(
    <ImageLazyLoaded src="https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg" alt="Hound" height={height} />
  );

  const imageLazyLoaded = utils.container.querySelector('.imageLazyLoaded');
  return {
    imageLazyLoaded,
    ...utils,
  };
};

describe('ImageLazyLoaded', () => {
  test('renders component', () => {
    const { imageLazyLoaded } = setup({});
    expect(imageLazyLoaded).toBeInTheDocument();
  });

  test('displays image', () => {
    setup({});
    expect(screen.getByAltText('Hound')).toBeInTheDocument();
  });

  test('Set custom row height correctly', () => {
    setup({ height: 220 });
    expect(screen.getByAltText('Hound')).toBeInTheDocument();
    expect(screen.getByAltText('Hound').style.height).toBe('220px');
  });
});
