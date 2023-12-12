import { useState } from 'react';
import { Typography, FormControl, Select, MenuItem, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Functional component representing the Launcher Screen.
 * @returns {JSX.Element} Launcher Screen component.
 */
const LauncherScreen = (): JSX.Element => {
    // Hook to navigate
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
        console.log(`Launching ${selectedOption} screen...`);
        navigate(selectedOption);
    };

    return (
        <div className="launcher-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
            <div>
                {/* Typography for the title */}
                <Typography variant="h3" gutterBottom>
                    Launcher
                </Typography>
                {/* FormControl for the dropdown */}
                <FormControl>
                    <Select value={selectedOption} onChange={(event) => handleChange(event.target.value)}>
                        {/* MenuItem for Main Page option */}
                        <MenuItem value="/">Main Page</MenuItem>
                        {/* MenuItem for Login option */}
                        <MenuItem value="/login">Login</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div style={{ marginTop: '1rem' }}>
                {/* Button to launch the selected screen */}
                <Button variant="contained" color="primary" onClick={handleLaunchScreen}>
                    Launch Screen
                </Button>
            </div>
        </div>
    );
};

export default LauncherScreen;
