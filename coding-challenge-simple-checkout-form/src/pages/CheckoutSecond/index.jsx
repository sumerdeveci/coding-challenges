import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { ButtonPrimary } from '../../components/button/ButtonPrimary';
import { ButtonSecondary } from '../../components/button/ButtonSecondary';
import { CheckboxField } from '../../components/form/CheckboxField';
import { InputField } from '../../components/form/InputField';
import { Column } from '../../components/organization/column/Column';
import { Row } from '../../components/organization/row/Row';
import { CheckoutFormContext } from '../../providers/CheckoutFormProvider';
import { isStringEmpty } from '../../utils/string';
import style from './style.module.sass';

export const CheckoutSecondPage = ({ pageOutAnimationAndExitPage }) => {
  const history = useHistory();
  const { formValues, updateFormValues } = useContext(CheckoutFormContext);

  const validate = (values) => {
    const errors = {};
    if (!values.isAgreedTerms) {
      errors.isAgreedTerms = 'You need to agree to the terms';
    }
    if (isStringEmpty(values.email)) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  // Put the provided data to the `CheckoutFormContext`
  const submit = (values, { setSubmitting }) => {
    updateFormValues(values);
    setSubmitting(false);
    pageOutAnimationAndExitPage(() => history.push('/profile'));
  };

  /**
   * Disabled if either:
   *  - There are errors
   *  - Or some input field is not touched while there is no data for that field in the form context
   *  - Or submitting is in progress
   */
  const isSubmitDisabled = (isSubmitting, isValid, dirty) =>
    isSubmitting || !isValid || (!dirty && (isStringEmpty(formValues.email) || !formValues.isAgreedTerms));

  const goBack = () => {
    pageOutAnimationAndExitPage(() => history.goBack());
  };

  return (
    <Column className={style.checkoutSecondPage}>
      <Formik
        initialValues={{
          email: formValues.email,
          isAgreedTerms: formValues.isAgreedTerms,
        }}
        validate={validate}
        onSubmit={submit}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form>
            <InputField
              type="email"
              name="email"
              label="Email"
              placeholder="matthew.anderson@gmail.com"
              error={errors.email && touched.email ? errors.email : false}
            />
            <CheckboxField
              name="isAgreedTerms"
              label="Agree with terms and services"
              error={errors.isAgreedTerms && touched.isAgreedTerms ? errors.isAgreedTerms : false}
            />
            <Row className={style.actions}>
              <ButtonSecondary onClick={goBack}>Back</ButtonSecondary>
              <ButtonPrimary type="submit" disabled={isSubmitDisabled(isSubmitting, isValid, dirty)}>
                Finish
              </ButtonPrimary>
            </Row>
          </Form>
        )}
      </Formik>
    </Column>
  );
};
