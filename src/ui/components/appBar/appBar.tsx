import styled from "@emotion/styled";
import { AppBar, Box, Container, Hidden, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Colors } from "@theme/colors";
import AppButton from "@components/appButton/appButton";
import { PeerPromoteVariationTwo } from "@assets/logos/logos";
import { MainRoutes } from "@ui/enums/routeEnums";
import { useTranslation } from 'react-i18next';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguageStore } from "@ui/stores/languageStore";

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
    { name: 'home', route: MainRoutes.HOME },
    { name: 'pricing', route: MainRoutes.PRICING },
    { name: 'about_us', route: MainRoutes.ABOUT_US },
];

/**
 * Navigation buttons component for the mobile app bar.
 */
const NavigationButtons = ({ currentPath, onClick }: { currentPath?: MainRoutes, onClick: (route: string) => void }) => {
    const { t } = useTranslation();
    const languageStore = useLanguageStore();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
            {/* Generate navigation buttons based on routes */}
            {mainRoutes.map(({ name, route }) => (
                <AppButton
                    key={name}
                    underLight={currentPath === route}
                    onClick={() => onClick(route)}
                >
                    {t(name)}
                </AppButton>
            ))}
            <AppButton
                onClick={() => { languageStore.setOpenLanguageModal(true) }}
            >
                <LanguageIcon sx={{ fontSize: '1.25rem', color: Colors.main.blue, mr: '0.2rem' }} />
                {languageStore.language.toUpperCase()}
            </AppButton>
        </Box>
    )
}

/**
 * Main mobile app bar component.
 */
export const MainMobileAppBar = ({ currentPath }: { currentPath?: MainRoutes }) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

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
                        <NavigationButtons currentPath={currentPath} onClick={handleButtonClick} />
                    </Hidden>
                    {/* Sign Up Button */}
                    <AppButton onClick={() => { handleButtonClick(MainRoutes.SIGN_UP) }} round style={{ marginRight: '0.25rem' }}>
                        {t('sign_up')}
                    </AppButton>
                    {/* Sign In Button */}
                    <AppButton onClick={() => { handleButtonClick(MainRoutes.SIGN_IN) }} round backgroundColor={Colors.main.blue} textColor={Colors.main.white}>
                        {t('sign_in')}
                    </AppButton>
                </UpperMobileToolbar>
                {/* Lower Mobile Toolbar (Hidden on Medium Screens and Smaller) */}
                <Hidden mdUp>
                    <LowerMobileToolbar>
                        {/* Navigation Buttons */}
                        <NavigationButtons currentPath={currentPath} onClick={handleButtonClick} />
                    </LowerMobileToolbar>
                </Hidden>
            </Container>
        </AppBar>
    )
}
