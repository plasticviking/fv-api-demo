import React from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import store, {history} from './store';
import ArchiveList from './components/ArchiveList';
import ArchiveDetail from './components/ArchiveDetail';
import PageLayout from './PageLayout';
import SharedList from "./components/SharedList";
import UserDetail from "./components/UserDetail";

const Router = props => (
  <Provider store={store}>
    <ConnectedRouter history={history} key={Math.random()}>
      <PageLayout>
        <Switch>
          <Route
            path="/archives"
            exact
            component={withRouter(ArchiveList)}
          />
          <Route
            path="/archives/:id"
            component={withRouter(ArchiveDetail)}
          />
          <Route
            path="/shared"
            component={withRouter(SharedList)}
          />
          <Route
            path="/vocabularies"
            render={() => (<p>vocabularies</p>)}
          />
          <Route
            path="/user"
            component={withRouter(UserDetail)}
          />
        </Switch>
      </PageLayout>
    </ConnectedRouter>
  </Provider>
);


export default Router;
