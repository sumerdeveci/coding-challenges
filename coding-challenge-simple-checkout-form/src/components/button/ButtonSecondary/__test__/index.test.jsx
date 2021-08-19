import { fireEvent, render } from '@testing-library/react';

import { ButtonSecondary } from '../index';

const TestButtonSecondary = ({ onClick = () => {} }) => (
  <ButtonSecondary onClick={onClick}>Test buttonSecondary</ButtonSecondary>
);

const setup = (onClick = () => {}) => {
  const utils = render(<TestButtonSecondary onClick={onClick} />);
  const buttonSecondary = utils.getByText('Test buttonSecondary');
  return {
    buttonSecondary,
    ...utils,
  };
};

describe('ButtonSecondary', () => {
  test('renders component', () => {
    const { buttonSecondary } = setup();

    expect(buttonSecondary).toBeInTheDocument();
  });

  test('onClick works', () => {
    let testVar = 'not clicked';
    const onClick = () => (testVar = 'clicked');

    const { buttonSecondary } = setup(onClick);

    fireEvent.click(buttonSecondary);
    expect(testVar).toBe('clicked');
  });
});
