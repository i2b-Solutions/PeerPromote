// Import necessary components from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import the screens for your routes
import LauncherScreen from '../../screens/launcher/launcherScreen';
import MainScreen from '../../screens/main/mainScreen';

// Define the RoutesComponent functional component
const RoutesComponent = () => {
  return (
    // Use BrowserRouter as the router container
    <Router>
      {/* Define the routes using the Routes component */}
      <Routes>
        {/* Define a route for the main path ('/') rendering MainScreen */}
        <Route path='/' element={<MainScreen />} />
        
        {/* Define a route for the '/launcher' path rendering LauncherScreen */}
        <Route path='/launcher' element={<LauncherScreen />} />
      </Routes>
    </Router>
  );
};

// Export the RoutesComponent as the default export
export default RoutesComponent;
