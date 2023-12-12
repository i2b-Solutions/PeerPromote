import React from 'react';
import styled from "@emotion/styled";
import { AppBar, Box, Container, Hidden, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "@theme/colors";
import AppButton from "@components/appButton/appButton";
import { PeerPromoteVariationTwo } from "@assets/logos/logos";
import { MainRoutes } from "@data/enums/routeEnums";

/**
 * Styled component for the upper mobile toolbar.
 */
const UpperMobileToolbar = styled(Toolbar)({
    background: Colors.main.white,
    color: Colors.main.black
});

/**
 * Styled component for the lower mobile toolbar.
 */
const LowerMobileToolbar = styled(Toolbar)<{ center?: boolean }>(
    ({ center }) => ({
        background: Colors.main.white,
        color: Colors.main.black,
        justifyContent: center ? 'initial' : 'center',
    })
);

// Definition of main routes
const mainRoutes = [
    { name: 'Home', route: MainRoutes.HOME },
    { name: 'Pricing', route: MainRoutes.PRICING },
    { name: 'About Us', route: MainRoutes.ABOUT_US },
];

/**
 * Navigation buttons component for the mobile app bar.
 */
const NavigationButtons = ({ currentScreen, onClick }: { currentScreen?: string, onClick: (route: string) => void }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            {/* Generate navigation buttons based on routes */}
            {mainRoutes.map(({ name, route }) => (
                <AppButton
                    key={name}
                    underLight={currentScreen === name}
                    onClick={() => onClick(route)}
                >
                    {name}
                </AppButton>
            ))}
        </Box>
    )
}

/**
 * Main mobile app bar component.
 */
export const MainMobileAppBar = ({ currentScreen }: { currentScreen?: string }) => {
    const navigate = useNavigate();

    /**
     * Handle button click and navigate to the specified route.
     * @param route - The route to navigate to.
     */
    const handleButtonClick = (route: string) => {
        navigate(route);
    };

    return (
        <AppBar position="sticky" elevation={1} style={{ background: Colors.main.white }}>
            <Container maxWidth={'lg'}>
                {/* Upper Mobile Toolbar */}
                <UpperMobileToolbar>
                    <Box
                        component="div"
                        sx={{
                            flexGrow: { xs: 1, md: 0 },
                            display: 'flex',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        {/* Logo */}
                        <img src={PeerPromoteVariationTwo} alt={'PeerPromote Logo'} style={{ width: '7rem', height: '100%' }} />
                    </Box>
                    {/* Navigation Buttons (Hidden on Medium and Larger Screens) */}
                    <Hidden mdDown>
                        <NavigationButtons currentScreen={currentScreen} onClick={handleButtonClick} />
                    </Hidden>
                    {/* Sign Up Button */}
                    <AppButton round style={{ marginRight: '0.25rem' }}>
                        Sign Up
                    </AppButton>
                    {/* Sign In Button */}
                    <AppButton round backgroundColor={Colors.main.blue} textColor={Colors.main.white}>
                        Sign In
                    </AppButton>
                </UpperMobileToolbar>
                {/* Lower Mobile Toolbar (Hidden on Medium Screens and Smaller) */}
                <Hidden mdUp>
                    <LowerMobileToolbar>
                        {/* Navigation Buttons */}
                        <NavigationButtons currentScreen={currentScreen} onClick={handleButtonClick} />
                    </LowerMobileToolbar>
                </Hidden>
            </Container>
        </AppBar>
    )
}
