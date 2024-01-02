// Import necessary components from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import the screens for your routes
import AppMainWrapper from '@components/appMainWrapper/appMainWrapper';
import { MainRoutes } from '@data/enums/routeEnums';
import SignInScreen from '@ui/screens/sign_in/SignInScreen';
import MainScreen from '@ui/screens/main/mainScreen';
import LauncherScreen from '@ui/screens/launcher/launcherScreen';

// Define the RoutesComponent functional component
const RoutesComponent = () => {
  return (
    // Use BrowserRouter as the router container
    <Router basename={process.env.REACT_APP_PUBLIC_PATH}>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Define a route for the main path ('/') rendering MainScreen */}
        <Route path={MainRoutes.HOME} element={<AppMainWrapper topBarPath={MainRoutes.HOME}><MainScreen /></AppMainWrapper>} />

        {/* Define a route for the login path ('/sign-in') rendering SignInScreen */}
        <Route path={MainRoutes.SIGN_IN} element={<AppMainWrapper topBarPath={MainRoutes.SIGN_IN}><SignInScreen /></AppMainWrapper>} />

        {/* Define a route for the '/launcher' path rendering LauncherScreen */}
        <Route path='/launcher' element={<LauncherScreen />} />
      </Routes>
    </Router>
  );
};

// Export the RoutesComponent as the default export
export default RoutesComponent;
