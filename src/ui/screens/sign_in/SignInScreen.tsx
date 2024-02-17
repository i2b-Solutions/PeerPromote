import AppButton from "@components/appButton/appButton";
import AppClickableText from "@components/appClickableText/appClickableText";
import AppTextField from "@components/appTextField/appTextField";
import styled from "@emotion/styled";
import { Box, Container, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { useTranslation } from "react-i18next";

/**
 * Styled component for the sign-in button.
 */
const SignInButton = styled(AppButton)({
    width: '100%',
    padding: '1rem',
    borderRadius: '0.4rem',
    marginTop: '1rem',
    color: Colors.main.white
});

// SignInScreen component for rendering the sign-in screen
const SignInScreen = () => {
    const { t } = useTranslation(); // Translation hook

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
                    <Typography variant="h5" fontWeight={PoppinsFontWeights.SEMIBOLD} color={Colors.main.blue} sx={{ mb: '2.5rem' }}>
                        {'Bienvenido a PeerPromote'}
                    </Typography>

                    {/* Email input field */}
                    <AppTextField label={t('email')} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />

                    {/* Password input field */}
                    <AppTextField label={t('password')} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />

                    {/* Forgot password link */}
                    <AppClickableText text={t('sign_in_screen.forgot_password')} onClick={() => { }} />

                    {/* Sign-in button */}
                    <SignInButton backgroundColor={Colors.main.black}>
                        {t('sign_in')}
                    </SignInButton>

                    {/* Informational text with terms link */}
                    <Typography variant="body2" color={Colors.main.darkBlue} sx={{ fontWeight: PoppinsFontWeights.REGULAR, mt: '1rem' }}>
                        {t('sign_in_screen.by_clicking')}
                        <AppClickableText onClick={() => { }} text={t('sign_in_screen.terms')} />
                    </Typography>

                    {/* Create account button */}
                    <SignInButton backgroundColor={Colors.main.blue} sx={{ mt: '2rem' }}>
                        {t('sign_in_screen.create_account')}
                    </SignInButton>
                </Grid>
            </Grid>
        </Container>
    );
}

export default SignInScreen; // Export the SignInScreen component for use in other files
