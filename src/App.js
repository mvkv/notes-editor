import Navbar from './components/Navbar';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './components/Loading';
import { Switch, Route } from 'react-router';
import Home from './components/Home';
import Notes from './components/notes/Notes'
import ProtectedRoute from './components/auth/ProtectedRoute';

import globalStyles from "./css/App.module.css"

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
    <div className={globalStyles.App}>
      <Navbar />
      <Loading />
    </div>
    );
  };

  return (
    <div className={globalStyles.App}>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home} />
        <ProtectedRoute path="/notes" component={Notes} />
      </Switch>
    </div>
  );
}

export default App;
