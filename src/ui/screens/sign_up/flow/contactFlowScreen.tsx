import AppTextField from "@components/appTextField/appTextField";
import FileUploadArea from "@components/appUploadArea/appUploadArea";
import { Box, Grid, InputAdornment, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SignUpNavButtons from "../components/navButtons";
import { PoppinsFontWeights } from "@theme/fontWeights";

enum FieldNames {
    EMAIL = 'email',
    AREA = 'area',
    PHONE = 'phone',
    UNSET = 'unset'
}

const FieldErrorNames = {
    email: '',
    area: '',
    phone: ''
}

const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const ContactFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();
    const registrationStore = useRegistrationStore();
    const [fieldError, setFieldError] = useState({ ...FieldErrorNames })
    const [canAdvance, setCanAdvance] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleFileSelect = (file: File) => {
        registrationStore.setSelfie(file);
    };

    const checkForm = (field: FieldNames = FieldNames.UNSET) => {
        let newFieldError = { ...fieldError };
        const { email, area, phone, selfie } = registrationStore;

        switch (field) {
            case FieldNames.UNSET:
                const isValidEmail = validateEmail(email);
                newFieldError.email = !isValidEmail && !!email ? 'field_errors.invalid_email' : '';

                const shouldAdvance = !!email && !!isValidEmail && !!area && !!phone && !!selfie;
                setCanAdvance(shouldAdvance);
                if (shouldAdvance) setFieldError({ ...FieldErrorNames })
                break;
            case FieldNames.EMAIL:
            case FieldNames.AREA:
            case FieldNames.PHONE:
                newFieldError[field] = !registrationStore[field] ? 'field_errors.empty' : '';
                if (field === FieldNames.EMAIL) {
                    const isValidEmail = validateEmail(email);
                    newFieldError[field] = !isValidEmail && !!email ? 'field_errors.invalid_email' : newFieldError[field];
                }
                break;
            default:
                break;
        }

        setFieldError(newFieldError);
    };

    const handleOnNext = () => {
        setLoading(true);
        onNext();
    }

    useEffect(() => {
        checkForm();
    }, [registrationStore])

    return (
        <Grid container spacing={1} textAlign={'left'}>
            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                    3. {t('sign_up_screen.contact_info')}
                </Typography>
                <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                    {t('sign_up_screen.complete_info')}
                </Typography>
            </Grid>

            <Grid item xs={12}>
                <AppTextField
                    value={registrationStore.email}
                    error={!!fieldError.email}
                    helperText={t(fieldError.email)}
                    onBlur={() => { checkForm(FieldNames.EMAIL) }}
                    onChange={(e) => { registrationStore.setEmail(e.target.value) }}
                    label={t('fields.email')} variant="outlined" fullWidth sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={3}>
                <AppTextField
                    value={registrationStore.area}
                    error={!!fieldError.area}
                    helperText={t(fieldError.area)}
                    onBlur={() => { checkForm(FieldNames.AREA) }}
                    onChange={(e) => { registrationStore.setArea(e.target.value) }}
                    InputProps={{
                        startAdornment: <InputAdornment position="start">+</InputAdornment>,
                    }}
                    type="number" label={t('fields.area')} variant="outlined" fullWidth sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={9}>
                <AppTextField
                    value={registrationStore.phone}
                    error={!!fieldError.phone}
                    helperText={t(fieldError.phone)}
                    onBlur={() => { checkForm(FieldNames.PHONE) }}
                    onChange={(e) => { registrationStore.setPhone(e.target.value) }}
                    type="number" label={t('fields.phone')} variant="outlined" fullWidth sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mt: '1rem', mb: '1rem' }}>
                    4. {t('sign_up_screen.profile_pic')}
                </Typography>
                <FileUploadArea
                    style={{ marginBottom: '1rem' }}
                    onFileSelect={handleFileSelect}
                    file={registrationStore.selfie}
                    onClear={() => { registrationStore.setSelfie(undefined) }}
                />
            </Grid>

            <SignUpNavButtons
                onBack={onBack}
                onNext={handleOnNext}
                disabled={!canAdvance}
                loading={loading}
            />
        </Grid>
    )
}

export default ContactFlowScreen;