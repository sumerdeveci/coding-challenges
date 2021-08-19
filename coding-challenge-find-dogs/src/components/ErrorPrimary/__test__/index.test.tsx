import { render, screen } from '@testing-library/react';
import { ErrorPrimary } from '../index';

const setup = ({ message }: { message?: string }) => {
  const utils = render(<ErrorPrimary message={message} />);
  const errorPrimary = utils.container.querySelector('.errorPrimary');
  return {
    errorPrimary,
    ...utils,
  };
};

describe('ErrorPrimary', () => {
  test('renders component', () => {
    const { errorPrimary } = setup({});
    expect(errorPrimary).toBeInTheDocument();
  });
  test('displays message', () => {
    setup({ message: 'This is test error message!' });
    expect(screen.getByText('This is test error message!')).toBeInTheDocument();
  });
});
