import React, { useState } from 'react';

const initialFormValues = {
  firstName: '',
  lastName: '',
  githubUsername: '',
  email: '',
  isAgreedTerms: false,
};

const CheckoutFormContext = React.createContext({
  formValues: initialFormValues,
  updateFormValues: () => {},
});

const CheckoutFormProvider = ({ children }) => {
  const [formValues, setFormValues] = useState(initialFormValues);

  // Adds the new form values on top of the existing ones
  const updateFormValues = (newFormValues) => {
    setFormValues({
      ...formValues,
      ...newFormValues,
    });
  };

  // Even though creating the context object within the component (not in state) is not a best practice,
  // we shoul do it here in tis case because we need to include a component function in the context as well.
  const context = {
    formValues,
    updateFormValues,
  };

  return <CheckoutFormContext.Provider value={context}>{children}</CheckoutFormContext.Provider>;
};

export { CheckoutFormContext };
export default CheckoutFormProvider;
