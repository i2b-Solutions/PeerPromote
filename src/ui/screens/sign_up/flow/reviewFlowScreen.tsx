import AppSquareButton from "@components/appButton/squareButton";
import AppTextField from "@components/appTextField/appTextField";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontSizes } from "@theme/fontSizes";
import { useTranslation } from "react-i18next";

const ReviewFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();

    return (
        <Box textAlign={'left'}>
            <Typography variant="h5" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                4. {'Verifica tu Información'}
            </Typography>
            <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                {"Todo listo, verifica tu información para continuar"}
            </Typography>

            <Grid container spacing={2} mt={'0.1rem'}>
                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onBack} variation="outline">
                        Anterior
                    </AppSquareButton>
                </Grid>

                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onNext} variation="fill">
                        Finalizar
                    </AppSquareButton>
                </Grid>
            </Grid>

        </Box>
    )
}

export default ReviewFlowScreen;