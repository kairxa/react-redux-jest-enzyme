import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Header from './components/Header';
import Footer from './components/Footer';

const KreasiKamu = props => (
  <main>
    <Header />
    {props.children}
    <Footer />
  </main>
);

KreasiKamu.propTypes = {
  children: React.PropTypes.node,
};

const Routes = (
  <Route path="/" component={KreasiKamu}>
    <IndexRoute
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Dashboard').default,
          });
        });
      }}
    />
    <Route path="series">
      <IndexRoute
        getComponents={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, {
              children: require('./SeriesList').default,
            });
          });
        }}
      />
      <Route
        path=":id"
        getComponents={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, {
              children: require('./SeriesSingle').default,
            });
          });
        }}
      />
    </Route>
    <Route
      path="announcements"
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Announcements').default,
          });
        });
      }}
    />
    <Route
      path="wallet"
      getComponents={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, {
            children: require('./Wallet').default,
          });
        });
      }}
    />
  </Route>
);

export default Routes;
