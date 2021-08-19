import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { PageNotFoundPage } from './pages/PageNotFound';
import { HomePage } from './pages/Home';

const routes = [
  {
    path: '/',
    Component: () => <HomePage />,
    exact: true,
  },
  {
    Component: () => <PageNotFoundPage />,
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
