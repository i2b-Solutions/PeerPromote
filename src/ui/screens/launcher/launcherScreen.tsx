import { useState } from 'react';
import { Typography, FormControl, Select, MenuItem, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styled from "@emotion/styled";
import { MainRoutes } from '@ui/enums/routeEnums';

// Styled component for the main container
const MainContainer = styled(Container)({
    marginTop: '2rem',
    textAlign: 'center'
});

/**
 * Functional component representing the Launcher Screen.
 * @returns {JSX.Element} Launcher Screen component.
 */
const LauncherScreen = (): JSX.Element => {
    // Hook to navigate to different screens
    const navigate = useNavigate();

    // State to track the selected option
    const [selectedOption, setSelectedOption] = useState('/');

    /**
     * Handles the change of the selected option in the dropdown.
     * @param {string} value - The selected value.
     */
    const handleChange = (value: string) => {
        setSelectedOption(value);
    };

    /**
     * Handles the launch of the screen based on the selected option.
     * Contains logic to launch the screen.
     */
    const handleLaunchScreen = () => {
        // Navigate to the selected screen
        navigate(selectedOption);
    };

    return (
        <MainContainer maxWidth="lg">
            <div>
                {/* Typography for the title */}
                <Typography variant="h3" gutterBottom>
                    Launcher
                </Typography>
                {/* FormControl for the dropdown */}
                <FormControl>
                    <Select value={selectedOption} onChange={(event) => handleChange(event.target.value)}>
                        {/* MenuItem for Main Page option */}
                        <MenuItem value={MainRoutes.HOME}>Main Page</MenuItem>
                        {/* MenuItem for Sign In option */}
                        <MenuItem value={MainRoutes.SIGN_IN}>Sign In</MenuItem>
                        {/* MenuItem for Sign Up option */}
                        <MenuItem value={MainRoutes.SIGN_UP}>Sign Up</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ marginTop: '1rem' }}>
                {/* Button to launch the selected screen */}
                <Button variant="contained" color="primary" onClick={handleLaunchScreen}>
                    Launch Screen
                </Button>
            </div>
        </MainContainer>
    );
};

export default LauncherScreen;
