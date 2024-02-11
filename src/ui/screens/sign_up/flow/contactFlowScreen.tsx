import AppSquareButton from "@components/appButton/squareButton";
import AppTextField from "@components/appTextField/appTextField";
import FileUploadArea from "@components/appUploadArea/appUploadArea";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontSizes } from "@theme/fontSizes";
import { useTranslation } from "react-i18next";

const ContactFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();

    const handleFileSelect = (file: File) => {
        console.log('Archivo seleccionado:', file);
    };

    return (
        <Grid container spacing={1} textAlign={'left'}>
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                    3. {'Información de Contacto'}
                </Typography>
                <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                    {"Para ayudarte a conectar con marcas, necesitamos completar tu información de contacto"}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <AppTextField label={'Correo'} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={3}>
                <AppTextField 
                InputProps={{
                    startAdornment: <InputAdornment position="start">+</InputAdornment>,
                }} 
                type="number" label={'Área'} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={9}>
                <AppTextField 
                type="number" label={'Celular'} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: '1rem', mt: '1rem' }}>
                    4. {'Foto de Perfil'}
                </Typography>
                <FileUploadArea onFileSelect={handleFileSelect} />
            </Grid>

            <Grid container spacing={2} mt={'1.5rem'}>
                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onBack} variation="outline">
                        Anterior
                    </AppSquareButton>
                </Grid>

                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onNext} variation="fill">
                        Siguiente
                    </AppSquareButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default ContactFlowScreen;