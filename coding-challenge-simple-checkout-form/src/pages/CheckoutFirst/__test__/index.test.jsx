import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PageAnimation } from '../../../components/animation/PageAnimation';
import { MainLayout } from '../../../layouts/MainLayout';
import { CheckoutFirstPage } from '../index';
import CheckoutFormProvider from '../../../providers/CheckoutFormProvider';

const TestCheckoutFirstPage = ({ history }) => (
  <CheckoutFormProvider>
    <Router history={history}>
      <MainLayout>
        <Switch>
          <Route path="/checkout-first" render={() => <PageAnimation PageComponent={CheckoutFirstPage} />} />
        </Switch>
      </MainLayout>
    </Router>
  </CheckoutFormProvider>
);

const setup = () => {
  const history = createMemoryHistory();
  history.push('/checkout-first');

  const utils = render(<TestCheckoutFirstPage history={history} />);
  const checkoutFirstPage = utils.container.querySelector('.checkoutFirstPage');

  return {
    checkoutFirstPage,
    history,
    ...utils,
  };
};

const fillAllFields = () => {
  expect(screen.getByLabelText('First name')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('First name'), { target: { value: 'Matthew' } });

  expect(screen.getByLabelText('Last name')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Last name'), { target: { value: 'Anderson' } });

  expect(screen.getByLabelText('Github username')).toBeInTheDocument();
  fireEvent.change(screen.getByLabelText('Github username'), { target: { value: 'sumerdeveci' } });
};

describe('CheckoutFirstPage', () => {
  test('renders component', () => {
    const { checkoutFirstPage } = setup();
    expect(checkoutFirstPage).toBeInTheDocument();
  });

  /**
   * Checking only the case of no field is filled though
   */
  test('Next button is disabled if fields are not valid', () => {
    setup();
    expect(screen.getByText('Next')).toBeDisabled();
  });

  test('Next button is enabled if all the fields are valid', () => {
    setup();
    fillAllFields();
    expect(screen.getByText('Next')).not.toBeDisabled();
  });

  test('Next button forwards to the next step', async () => {
    const { history } = setup();
    fillAllFields();

    fireEvent.click(screen.getByText('Next'));
    // Wait for the animation and passing over to the new route
    await waitFor(() => new Promise((res, rej) => setTimeout(() => res(), 800)));

    expect(history.location.pathname).toBe('/checkout-second');
  });
});
