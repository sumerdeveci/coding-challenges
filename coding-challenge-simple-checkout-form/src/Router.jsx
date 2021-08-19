import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { PageNotFoundPage } from './pages/PageNotFound';
import { IntroductionPage } from './pages/Introduction';
import { CheckoutFirstPage } from './pages/CheckoutFirst';
import { CheckoutSecondPage } from './pages/CheckoutSecond';
import { ProfilePage } from './pages/Profile';
import { PageAnimation } from './components/animation/PageAnimation';

const routes = [
  {
    path: '/',
    Component: () => <PageAnimation PageComponent={IntroductionPage} />,
    exact: true,
  },
  {
    path: '/checkout-first',
    Component: () => <PageAnimation PageComponent={CheckoutFirstPage} />,
    exact: true,
  },
  {
    path: '/checkout-second',
    Component: () => <PageAnimation PageComponent={CheckoutSecondPage} />,
    exact: true,
  },
  {
    path: '/profile',
    Component: () => <PageAnimation PageComponent={ProfilePage} />,
    exact: true,
  },
  {
    Component: PageNotFoundPage,
    exact: false,
  },
];

export const Router = () => (
  <BrowserRouter>
    <MainLayout>
      <Switch>
        {routes.map(({ path, Component, exact }) => (
          <Route path={path} render={Component} exact={exact} key={path ?? Math.random()} />
        ))}
      </Switch>
    </MainLayout>
  </BrowserRouter>
);
