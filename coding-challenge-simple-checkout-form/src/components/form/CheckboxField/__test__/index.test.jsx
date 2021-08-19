import { fireEvent, render } from '@testing-library/react';
import { Form, Formik } from 'formik';
import { CheckboxField } from '../index';

const TestForm = () => (
  <Formik
    initialValues={{
      testName: false,
    }}
  >
    {() => (
      <Form>
        <CheckboxField name="testName" label="testLabel" error="errorText" />
      </Form>
    )}
  </Formik>
);

const setup = () => {
  const utils = render(<TestForm />);
  const checkboxField = utils.getByLabelText('testLabel');
  return {
    checkboxField,
    ...utils,
  };
};

describe('CheckboxField', () => {
  test('renders component', () => {
    const { checkboxField } = setup();

    expect(checkboxField).toBeInTheDocument();
  });

  test('clikcing on the checkbox works', () => {
    const { checkboxField } = setup();

    fireEvent.click(checkboxField);
    expect(checkboxField.value).toBe('true');
  });
});
