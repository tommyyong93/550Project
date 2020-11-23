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
							path="/state"
							render={() => (
								<StateStats />
							)}
      />
						<Route
							path="/search"
							render={(props) => (
								<SearchFeature {...props}/>
							)}
      />
            <Route
              path="/profile/:id"
              render={(props) => (
                <NursingHomeProfile {...props}/>
              )}
            />
					</Switch>
				</Router>
			</div>
    );
  }
}