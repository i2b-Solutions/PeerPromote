import React, { useState } from 'react';
import {
    Typography,
    AppBar,
    Toolbar,
    Button,
    Select,
    MenuItem,
    TextField,
    FormControl,
    InputLabel,
    Container,
    Grid,
    Box,
} from '@mui/material';

const MainScreenOld = () => {
    const [userType, setUserType] = useState('Business');
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    const handleUserTypeChange = (event:any) => {
        setUserType(event.target.value);
    };

    const handleNameChange = (event:any) => {
        setName(event.target.value);
    };

    const handleCountryChange = (event:any) => {
        setCountry(event.target.value);
    };

    const handleButtonClick = () => {
        if (userType === 'Business') {
            // Business logic
            console.log('Find button clicked');
        } else {
            // Influencer logic
            console.log('Request button clicked');
        }
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        PeerPromote
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit">Pricing</Button>
                    <Button color="inherit">About Us</Button>
                    <Button color="inherit">Sign Up</Button>
                    <Button color="inherit">Sign In</Button>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                {/* Connect Section */}
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="h4">
                                Connect the ideal influencer for your business
                            </Typography>
                            <Typography variant="body1" gutterBottom>
                                Find influencers based on your business needs.
                            </Typography>
                            <FormControl fullWidth sx={{ mb: 2 }}>
                                <InputLabel id="user-type-label">User Type</InputLabel>
                                <Select
                                    labelId="user-type-label"
                                    id="user-type"
                                    value={userType}
                                    label="User Type"
                                    onChange={handleUserTypeChange}
                                >
                                    <MenuItem value="Business">Business</MenuItem>
                                    <MenuItem value="Influencer">Influencer</MenuItem>
                                </Select>
                            </FormControl>
                            {userType === 'Influencer' && (
                                <>
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        fullWidth
                                        value={name}
                                        onChange={handleNameChange}
                                        sx={{ mb: 2 }}
                                    />
                                    <TextField
                                        label="Country"
                                        variant="outlined"
                                        fullWidth
                                        value={country}
                                        onChange={handleCountryChange}
                                        sx={{ mb: 2 }}
                                    />
                                </>
                            )}
                            {userType === 'Business' && (
                                <TextField
                                    label="Country"
                                    variant="outlined"
                                    fullWidth
                                    value={country}
                                    onChange={handleCountryChange}
                                    sx={{ mb: 2 }}
                                />
                            )}
                            <Button variant="contained" onClick={handleButtonClick}>
                                {userType === 'Business' ? 'Find' : 'Request'}
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                            <Typography variant="body1">
                                Image for testing
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                {/* Statistics Section */}
                <Grid container spacing={3}>
                    {['Business', 'Influencers', 'Contracts', 'Followers'].map((title) => (
                        <Grid item xs={3} key={title}>
                            <Box>
                                <Typography variant="h5">{title}</Typography>
                                <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                                    300K+
                                </Typography>
                                <Typography variant="body2">
                                    Text related to {title.toLowerCase()}...
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>

                {/* Top Influencers Section */}
                <Box sx={{ mt: 4, bgcolor: 'black', color: 'white', p: 2 }}>
                    <Typography variant="h4">Top Influencers</Typography>
                    <Grid container spacing={2}>
                        {[1, 2, 3].map((item) => (
                            <Grid item xs={4} key={item}>
                                <Box>
                                    <div className="profile-circle">Profile Image</div>
                                    <Typography variant="h6">Random Name</Typography>
                                    <Typography variant="body1" color="primary">
                                        35M
                                    </Typography>
                                    <Button variant="contained" color="inherit">
                                        Contact
                                    </Button>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </div>
    );
};

export default MainScreenOld;
