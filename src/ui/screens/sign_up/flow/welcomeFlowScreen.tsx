import AppButton from "@components/appButton/appButton";
import AppSquareButton from "@components/appButton/squareButton";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";

const WelcomeFlowScreen = ({ onNext }: { onNext: () => void }) => {
    return (
        <Box textAlign={'left'}>
            <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                {'Bienvenido a PeerPromote'}
            </Typography>
            <Typography variant="body1" color={Colors.main.darkBlue}>
                {"En PeerPromote, somos tu gestor digital que te ayudará a conectarte con marcas que buscan tu contenido. Completa tu perfil de usuario para acceder a las ofertas disponibles. "}
            </Typography>
            <Typography component={'span'} fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue}>
                {"¡Solo te llevará 3 minutos!"}
            </Typography>

            <Grid container spacing={2} mt={'2rem'}>
                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onNext} variation="outline">
                        Registrarse como creador
                    </AppSquareButton>
                </Grid>

                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onNext} variation="outline">
                        Registrarse como comercio
                    </AppSquareButton>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WelcomeFlowScreen;