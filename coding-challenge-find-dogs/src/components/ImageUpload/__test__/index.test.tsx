import { render, screen } from '@testing-library/react';
import { Simulate } from 'react-dom/test-utils';
import { ImageUpload } from '../index';

const setup = ({ text, onChange = jest.fn() }: { text?: string; onChange?: (e: any) => {} }) => {
  const utils = render(<ImageUpload text={text} onChange={onChange} />);
  const imageUpload = utils.container.querySelector('.imageUpload');
  return {
    imageUpload,
    ...utils,
  };
};

describe('ImageUpload', () => {
  test('renders component', () => {
    const { imageUpload } = setup({});
    expect(imageUpload).toBeInTheDocument();
  });
  test('Includes the necessary html elements', () => {
    const { imageUpload } = setup({});
    expect(imageUpload?.querySelector('input[type="file"]')).toBeInTheDocument();
    expect(imageUpload?.querySelector('label')).toBeInTheDocument();
  });
  test('Show custom upload image text correctly', () => {
    setup({ text: 'Custom upload image text' });
    expect(screen.getByText('Custom upload image text')).toBeInTheDocument();
  });
  test('Run onChange when image uploaded', () => {
    const onChange = jest.fn();
    setup({ onChange, text: 'Upload image' });

    const file = new File(['(⌐□_□)'], 'face.png', { type: 'image/png' });
    const imageInput = screen.getByLabelText('Upload image');
    // @ts-ignore
    Simulate.change(imageInput, { target: { files: [file] } });

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
