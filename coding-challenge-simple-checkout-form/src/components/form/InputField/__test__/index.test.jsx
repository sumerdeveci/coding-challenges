import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Formik } from 'formik';

import { InputField } from '../index';

const TestForm = () => (
  <Formik initialValues={{ testName: '' }}>
    {() => (
      <Form>
        <InputField name="testName" label="testLabel" error="errorText" />
      </Form>
    )}
  </Formik>
);

const setup = () => {
  const utils = render(<TestForm />);
  const input = utils.getByLabelText('testLabel');
  return {
    input,
    ...utils,
  };
};

describe('InputField', () => {
  test('renders component', () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
  });

  test('Error state works', () => {
    setup();

    expect(screen.getByText('errorText')).toBeInTheDocument();
  });

  test('Filling the input works', () => {
    const { input } = setup();

    fireEvent.change(input, { target: { value: '123abc' } });
    expect(input.value).toBe('123abc');
  });
});
