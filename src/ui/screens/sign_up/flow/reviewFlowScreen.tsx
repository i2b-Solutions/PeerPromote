import { Box, Typography, Grid } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useTranslation } from "react-i18next";
import SignUpNavButtons from "../components/navButtons";
import { useState } from "react";
import { calculateAge } from "@ui/helpers/dateHelpers";

const TitleValue = ({ title, value }: { title: string, value: string }) => {
    return (
        <>
            <Typography variant="body1" color={Colors.main.mediumGrey}>
                {title}
            </Typography>
            <Typography
                variant="body1"
                color={Colors.main.darkBlue}
                fontWeight={PoppinsFontWeights.MEDIUM}
                mb={'1rem'}
            >
                {value}
            </Typography>
        </>
    )
}

const SelfieImage = ({ selfie }: { selfie?: File }) => {
    if (!selfie) return null;

    return (
        <Box textAlign="center"> {/* Añade esta línea */}
            <img
                src={URL.createObjectURL(selfie)}
                alt="Selfie"
                style={{
                    width: '7rem',
                    height: '7rem',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: `0.2rem solid ${Colors.main.darkBlue}`
                }}
            />
        </Box>
    );
};

const ReviewFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const registrationStore = useRegistrationStore();

    const handleOnNext = () => {
        onNext();
    }

    return (
        <Box textAlign={'left'}>
            <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                5. {'Verifica tu Información'}
            </Typography>
            <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                {"Todo listo, verifica tu información para continuar"}
            </Typography>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Box>
                        <TitleValue title={'Usuario'} value={registrationStore.username} />
                        <TitleValue title={'Edad'} value={calculateAge(registrationStore.birthdate).toFixed(0)} />
                        <Grid container >
                            <Grid item xs={12} md={6}>
                                <TitleValue title={'País'} value={registrationStore.countryId} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TitleValue title={'Departamento'} value={registrationStore.stateId} />
                            </Grid>
                        </Grid>
                        <TitleValue title={'Correo'} value={registrationStore.email} />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <SelfieImage selfie={registrationStore.selfie} />
                </Grid>
            </Grid>

            <SignUpNavButtons
                onBack={onBack}
                onNext={handleOnNext}
                nextValue={'Finalizar'}
                loading={loading}
            />

        </Box>
    )
}

export default ReviewFlowScreen;
