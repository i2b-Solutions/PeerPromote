import AppDropSelector from "@components/appDropSelector/appDropSelector";
import AppTextField from "@components/appTextField/appTextField";
import { SUPPORTED_COUNTRIES, SUPPORTED_LANGUAGES } from "@domain/constants/domainConstants";
import { getCountryStates } from "@domain/helpers/countryHelpers";
import { Autocomplete, Chip, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SignUpNavButtons from "../components/navButtons";
import { isValidDate } from "@ui/helpers/dateHelpers";
import { PoppinsFontWeights } from "@theme/fontWeights";

enum FieldNames {
    USER = 'username',
    PASSWORD = 'password',
    CONFIRM_PASSWORD = 'confirmPassword',
    COUNTRY = 'countryId',
    STATE = 'stateId',
    LANGUAGES = 'languages',
    DAY = 'day',
    MONTH = 'month',
    YEAR = 'year',
    BIRTHDATE = 'birthdate',
    UNSET = 'unset'
}

const FielErrorNames = {
    username: '',
    password: '',
    confirmPassword: '',
    countryId: '',
    stateId: '',
    languages: '',
    day: '',
    month: '',
    year: '',
    birthdate: ''
}

const UserFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();

    const registrationStore = useRegistrationStore();
    const [fieldError, setFieldError] = useState(FielErrorNames)
    const [canAdvance, setCanAdvance] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkForm = (field: FieldNames = FieldNames.UNSET) => {
        let newFieldError = { ...fieldError };

        switch (field) {
            case FieldNames.UNSET:
                const { username, password, confirmPassword, countryId, stateId, languages, birthdate } = registrationStore;
                const { day, month, year } = birthdate;

                if (!day || !month || !year) {
                    newFieldError.birthdate = '';
                    break;
                }

                const isDateValid = isValidDate(day, month, year);
                newFieldError.birthdate = isDateValid ? '' : 'field_errors.invalid_date';
                setCanAdvance(
                    !!username &&
                    !!password &&
                    !!confirmPassword &&
                    (password === confirmPassword) &&
                    !!countryId &&
                    !!stateId &&
                    !!languages.length &&
                    !!day &&
                    !!month &&
                    !!year &&
                    isDateValid
                );
                break;
            case FieldNames.USER:
            case FieldNames.PASSWORD:
            case FieldNames.CONFIRM_PASSWORD:
            case FieldNames.COUNTRY:
            case FieldNames.STATE:
                newFieldError[field] = !registrationStore[field] ? 'field_errors.empty' :
                    (field === FieldNames.CONFIRM_PASSWORD && registrationStore.confirmPassword !== registrationStore.password ? 'field_errors.password_match' : '');
                break;
            case FieldNames.LANGUAGES:
                newFieldError[field] = !registrationStore[field].length ? 'field_errors.empty' : '';
                break;
            case FieldNames.DAY:
            case FieldNames.MONTH:
            case FieldNames.YEAR:
                newFieldError[field] = !registrationStore.birthdate[field] ? 'field_errors.empty' : '';
                break;
            default:
                break;
        }

        setFieldError(newFieldError);
    }


    const handleBirthChange = (newValue: string, field: FieldNames) => {
        const parsedValue = parseInt(newValue) || 0;
        switch (field) {
            case FieldNames.DAY:
                registrationStore.setBirthDay(parsedValue);
                break;
            case FieldNames.MONTH:
                registrationStore.setBirthMonth(parsedValue);
                break;
            case FieldNames.YEAR:
                registrationStore.setBirthYear(parsedValue);
                break;
            default:
                break;
        }
    }

    const handleOnNext = () => {
        setLoading(true);
        onNext();
    }

    useEffect(() => {
        checkForm();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [registrationStore])

    return (
        <Grid container spacing={1} textAlign={'left'}>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                    1. {t('sign_up_screen.user_info')}
                </Typography>
                <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                    {t('sign_up_screen.register_as_creator')}
                </Typography>
                <AppTextField
                    value={registrationStore.username}
                    onBlur={() => { checkForm(FieldNames.USER) }}
                    error={!!fieldError.username}
                    helperText={t(fieldError.username)}
                    label={t('fields.user')} variant="outlined"
                    fullWidth
                    onChange={(e) => { registrationStore.setUsername(e.target.value) }}
                    sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
                <AppTextField value={registrationStore.password} onBlur={() => { checkForm(FieldNames.PASSWORD) }} error={!!fieldError.password} helperText={t(fieldError.password)} type="password" label={t('fields.password')} variant="outlined" fullWidth onChange={(e) => { registrationStore.setPassword(e.target.value) }} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <AppTextField value={registrationStore.confirmPassword} onBlur={() => { checkForm(FieldNames.CONFIRM_PASSWORD) }} error={!!fieldError.confirmPassword} helperText={t(fieldError.confirmPassword)} type="password" label={t('fields.confirm_password')} variant="outlined" fullWidth onChange={(e) => { registrationStore.setConfirmPassword(e.target.value) }} sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
                <AppDropSelector onBlur={() => { checkForm(FieldNames.COUNTRY) }} error={!!fieldError.countryId} helperText={t(fieldError.countryId)} select value={registrationStore.countryId} label={t('fields.country')} sx={{ mb: 2 }}
                    onChange={(e) => { registrationStore.setCountryId(e.target.value) }} fullWidth>
                    <MenuItem value={registrationStore.countryId} disabled>
                        {t('fields.country')}
                    </MenuItem>
                    {SUPPORTED_COUNTRIES.map((country) => {
                        return (
                            <MenuItem value={country.id} key={country.id}>
                                {country.name}
                            </MenuItem>
                        )
                    })}
                </AppDropSelector>
            </Grid>

            <Grid item xs={12} md={6}>
                <AppDropSelector onBlur={() => { checkForm(FieldNames.STATE) }} error={!!fieldError.stateId} helperText={t(fieldError.stateId)} select value={registrationStore.stateId} label={t('fields.location')} sx={{ mb: 2 }}
                    onChange={(e) => { registrationStore.setStateId(e.target.value) }} fullWidth>
                    <MenuItem value={registrationStore.stateId} disabled>
                        {t('fields.location')}
                    </MenuItem>
                    {getCountryStates(registrationStore.countryId).map((stateItem) => {
                        return (
                            <MenuItem value={stateItem.id} key={stateItem.id}>
                                {stateItem.name}
                            </MenuItem>
                        )
                    })}
                </AppDropSelector>
            </Grid>

            <Grid item xs={12}>
                <Autocomplete
                    onBlur={() => { checkForm(FieldNames.LANGUAGES) }}
                    multiple
                    id="tags-outlined"
                    options={SUPPORTED_LANGUAGES}
                    getOptionLabel={(option) => option.name}
                    value={registrationStore.languages}
                    onChange={(event, newValue) => {
                        registrationStore.setLanguages(newValue);
                    }}
                    sx={{
                        backgroundColor: Colors.main.lightGrey, "& .MuiFormHelperText-root": {
                            margin: 0,
                            backgroundColor: Colors.main.white,
                            paddingTop: '0.25rem',
                            paddingLeft: '0.3rem',
                            paddingRight: '0.3rem'
                        }
                    }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option.name}
                                {...getTagProps({ index })}
                                style={{
                                    margin: '4px',
                                    backgroundColor: Colors.main.purple,
                                    color: Colors.main.white
                                }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label={t('fields.languages')}
                            placeholder=""
                            error={!!fieldError.languages}
                            helperText={t(fieldError.languages)}
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.blue} sx={{ mb: '1rem', mt: '1rem' }}>
                    2. {t('sign_up_screen.birthdate')}
                </Typography>
            </Grid>

            <Grid item xs={3} >
                <AppTextField value={registrationStore.birthdate.day || ''} onBlur={() => { checkForm(FieldNames.DAY) }} error={!!fieldError.day} type="number" label={t('fields.day')} variant="outlined" fullWidth
                    onChange={(e) => { handleBirthChange(e.target.value, FieldNames.DAY) }} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={3} >
                <AppTextField value={registrationStore.birthdate.month || ''} onBlur={() => { checkForm(FieldNames.MONTH) }} error={!!fieldError.month} type="number" label={t('fields.month')} variant="outlined" fullWidth
                    onChange={(e) => { handleBirthChange(e.target.value, FieldNames.MONTH) }} />
            </Grid>
            <Grid item xs={6}>
                <AppTextField value={registrationStore.birthdate.year || ''} onBlur={() => { checkForm(FieldNames.YEAR) }} error={!!fieldError.year} type="number" label={t('fields.year')} variant="outlined" fullWidth
                    onChange={(e) => { handleBirthChange(e.target.value, FieldNames.YEAR) }} />
            </Grid>

            {
                !!fieldError.birthdate &&
                <Typography variant="body2" color={Colors.main.red} sx={{ mb: '1rem', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}>
                    {t(fieldError.birthdate)}
                </Typography>
            }

            <SignUpNavButtons
                onBack={onBack}
                onNext={handleOnNext}
                disabled={!canAdvance}
                loading={loading}
            />

        </Grid>
    )
}

export default UserFlowScreen;