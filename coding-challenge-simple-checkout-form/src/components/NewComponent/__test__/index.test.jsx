import { render } from '@testing-library/react';
import { NewComponent } from '../index';

const TestNewComponent = () => <NewComponent>Test newComponent</NewComponent>;

const setup = () => {
  const utils = render(<TestNewComponent />);
  const newComponent = utils.getByText('Test newComponent');
  return {
    newComponent,
    ...utils,
  };
};

describe('NewComponent', () => {
  test('renders component', () => {
    const { newComponent } = setup();

    expect(newComponent).toBeInTheDocument();
  });
});
