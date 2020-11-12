import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import FrontPage from './FrontPage'
import StateStats from './StateStats';
import SearchFeature from './SearchFeature';
import NursingHomeProfile from './NursingHomeProfile';
import "@blueprintjs/core/lib/css/blueprint.css"

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<FrontPage />
							)}
      />
						<Route
							exact
							path="/featureone"
							render={() => (
								<FrontPage />
							)}
      />
						<Route
							path="/featuretwo"
							render={() => (
								<FrontPage />
							)}
      />
						<Route
							path="/state"
							render={() => (
								<StateStats />
							)}
      />
						<Route
							path="/search"
							render={() => (
								<SearchFeature />
							)}
      />
            <Route
              path="/profile"
              render={() => (
                <NursingHomeProfile />
              )}
            />
					</Switch>
				</Router>
			</div>
    );
  }
}