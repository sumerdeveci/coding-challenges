import { Formik, Form } from 'formik';
import { useContext } from 'react';
import { useHistory } from 'react-router';
import { ButtonPrimary } from '../../components/button/ButtonPrimary';
import { ButtonSecondary } from '../../components/button/ButtonSecondary';
import { InputField } from '../../components/form/InputField';
import { Column } from '../../components/organization/column/Column';
import { Row } from '../../components/organization/row/Row';
import { CheckoutFormContext } from '../../providers/CheckoutFormProvider';
import { isStringEmpty } from '../../utils/string';
import style from './style.module.sass';

export const CheckoutFirstPage = ({ pageOutAnimationAndExitPage }) => {
  const history = useHistory();
  const { formValues, updateFormValues } = useContext(CheckoutFormContext);

  const validate = (values) => {
    const errors = {};
    if (isStringEmpty(values.firstName)) {
      errors.firstName = 'First name is required';
    }
    if (isStringEmpty(values.lastName)) {
      errors.lastName = 'Last name is required';
    }
    if (isStringEmpty(values.githubUsername)) {
      errors.githubUsername = 'Github username is required';
    }
    return errors;
  };

  // Put the provided data to the `CheckoutFormContext`
  const submit = (values, { setSubmitting }) => {
    updateFormValues(values);
    setSubmitting(false);
    pageOutAnimationAndExitPage(() => history.push('/checkout-second'));
  };

  /**
   * Disabled if either:
   *  - There are errors
   *  - Or some input field is not touched while there is no data for that field in the form context
   *  - Or submitting is in progress
   */
  const isSubmitDisabled = (isSubmitting, isValid, dirty) =>
    isSubmitting ||
    !isValid ||
    (!dirty &&
      (isStringEmpty(formValues.firstName) ||
        isStringEmpty(formValues.lastName) ||
        isStringEmpty(formValues.githubUsername)));

  const goBack = () => {
    pageOutAnimationAndExitPage(() => history.goBack());
  };

  return (
    <Column className={style.checkoutFirstPage}>
      <Formik
        initialValues={{
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          githubUsername: formValues.githubUsername,
        }}
        validate={validate}
        onSubmit={submit}
      >
        {({ isSubmitting, errors, touched, isValid, dirty }) => (
          <Form>
            <InputField
              name="firstName"
              label="First name"
              placeholder="Matthew"
              error={errors.firstName && touched.firstName ? errors.firstName : false}
            />
            <InputField
              name="lastName"
              label="Last name"
              placeholder="Anderson"
              error={errors.lastName && touched.lastName ? errors.lastName : false}
            />
            <InputField
              name="githubUsername"
              label="Github username"
              error={errors.githubUsername && touched.githubUsername ? errors.githubUsername : false}
            />
            <Row className={style.actions}>
              <ButtonSecondary onClick={goBack}>Back</ButtonSecondary>
              <ButtonPrimary type="submit" disabled={isSubmitDisabled(isSubmitting, isValid, dirty)}>
                Next
              </ButtonPrimary>
            </Row>
          </Form>
        )}
      </Formik>
    </Column>
  );
};
