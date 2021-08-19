import { fireEvent, render, screen } from '@testing-library/react';

import { ButtonPrimary } from '../index';

describe('ButtonPrimary', () => {
  test('renders component', () => {
    render(<ButtonPrimary>Test button</ButtonPrimary>);

    expect(screen.getByText('Test button')).toBeInTheDocument();
  });

  test('onClick works', () => {
    let testVar = 'not clicked';
    const onClick = () => testVar = 'clicked';

    render(<ButtonPrimary onClick={onClick}>Test button</ButtonPrimary>);

    fireEvent.click(screen.getByText('Test button'));
    expect(testVar).toBe('clicked')
  });
});
