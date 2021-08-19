import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Router, Switch } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { PageAnimation } from '../../../components/animation/PageAnimation';
import { MainLayout } from '../../../layouts/MainLayout';
import { IntroductionPage } from '../index';

const TestIntroductionPage = ({ history }) => (
  <Router history={history}>
    <MainLayout>
      <Switch>
        <Route path="/" render={() => <PageAnimation PageComponent={IntroductionPage} />} />
      </Switch>
    </MainLayout>
  </Router>
);

const setup = () => {
  const history = createMemoryHistory();
  history.push('/');

  const utils = render(<TestIntroductionPage history={history} />);
  const introductionPage = utils.container.querySelector('.introductionPage');

  return {
    introductionPage,
    history,
    ...utils,
  };
};

describe('IntroductionPage', () => {
  test('renders component', () => {
    const { introductionPage } = setup();
    expect(introductionPage).toBeInTheDocument();
  });

  test('start button moves you forward', async () => {
    const { history } = setup();
    expect(screen.getByText('Start')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Start'));

    // Wait for the animation and passing over to the new route
    await waitFor(() => new Promise((res, rej) => setTimeout(() => res(), 800)));
    expect(history.location.pathname).toBe('/checkout-first');
  });
});
