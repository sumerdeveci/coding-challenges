import { render, screen } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PageAnimation } from '../../../components/animation/PageAnimation';
import { MainLayout } from '../../../layouts/MainLayout';
import { ProfilePage } from '../index';
import CheckoutFormProvider from '../../../providers/CheckoutFormProvider';

const TestProfilePage = ({ history }) => (
  <CheckoutFormProvider>
    <Router history={history}>
      <MainLayout>
        <Switch>
          <Route path="/profile" render={() => <PageAnimation PageComponent={ProfilePage} />} />
        </Switch>
      </MainLayout>
    </Router>
  </CheckoutFormProvider>
);

const setup = () => {
  const history = createMemoryHistory();
  history.push('/profile');

  const utils = render(<TestProfilePage history={history} />);
  const profilePage = utils.container.querySelector('.profilePage');

  return {
    profilePage,
    history,
    ...utils,
  };
};

describe('ProfilePage', () => {
  test('renders component', () => {
    const { profilePage } = setup();
    expect(profilePage).toBeInTheDocument();
  });
});
