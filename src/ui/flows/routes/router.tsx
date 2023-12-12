import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LauncherScreen from '../../screens/launcher/launcherScreen';
import MainScreen from '../../screens/main/mainScreen';


const RoutesComponent = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path='/launcher' element={<LauncherScreen />} />
            </Routes>
        </Router>
    );
};

export default RoutesComponent;
