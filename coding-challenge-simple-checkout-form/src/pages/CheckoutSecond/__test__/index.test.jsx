import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PageAnimation } from '../../../components/animation/PageAnimation';
import { MainLayout } from '../../../layouts/MainLayout';
import { CheckoutSecondPage } from '../index';
import CheckoutFormProvider from '../../../providers/CheckoutFormProvider';

const TestCheckoutSecondPage = ({ history }) => (
  <CheckoutFormProvider>
    <Router history={history}>
      <MainLayout>
        <Switch>
          <Route path="/checkout-first" render={() => <PageAnimation PageComponent={CheckoutSecondPage} />} />
        </Switch>
      </MainLayout>
    </Router>
  </CheckoutFormProvider>
);

const setup = () => {
  const history = createMemoryHistory();
  history.push('/checkout-first');

  const utils = render(<TestCheckoutSecondPage history={history} />);
  const checkoutSecondPage = utils.container.querySelector('.checkoutSecondPage');

  return {
    checkoutSecondPage,
    history,
    ...utils,
  };
};

const fillAllFields = () => {
  expect(screen.getByLabelText('Email')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'tahasumer.devec@gmail.com' } });

  expect(screen.getByLabelText('Agree with terms and services')).toBeInTheDocument();
  fireEvent.click(screen.getByLabelText('Agree with terms and services'));
};

describe('CheckoutSecondPage', () => {
  test('renders component', () => {
    const { checkoutSecondPage } = setup();
    expect(checkoutSecondPage).toBeInTheDocument();
  });

  /**
   * Checking only the case of no field is filled though
   */
  test('Finish button is disabled if fields are not valid', () => {
    setup();
    expect(screen.getByText('Finish')).toBeDisabled();
  });

  test('Finish button is enabled if all the fields are valid', () => {
    setup();
    fillAllFields();
    expect(screen.getByText('Finish')).not.toBeDisabled();
  });

  test('Finish button forwards to the next step', async () => {
    const { history } = setup();
    fillAllFields();

    fireEvent.click(screen.getByText('Finish'));
    // Wait for the animation and passing over to the new route
    await waitFor(() => new Promise((res, rej) => setTimeout(() => res(), 800)));

    expect(history.location.pathname).toBe('/profile');
  });
});
