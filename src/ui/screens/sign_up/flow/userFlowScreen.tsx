import AppSquareButton from "@components/appButton/squareButton";
import AppDropSelector from "@components/appDropSelector/appDropSelector";
import AppTextField from "@components/appTextField/appTextField";
import { SUPPORTED_COUNTRIES } from "@domain/constants/domainConstants";
import { getCountryStates } from "@domain/helpers/countryHelpers";
import { Autocomplete, Chip, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontSizes } from "@theme/fontSizes";
import { useRegistrationStore } from "@ui/stores/registrationStore";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const UserFlowScreen = ({ onNext, onBack }: { onNext: () => void, onBack: () => void }) => {
    const { t } = useTranslation();

    const registrationStore = useRegistrationStore();
    const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

    return (
        <Grid container spacing={1} textAlign={'left'}>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: '1rem' }}>
                    1. {'Información de Usuario'}
                </Typography>
                <Typography variant="body1" color={Colors.main.darkBlue} sx={{ mb: '1.5rem' }}>
                    {"Registrate como creador y descubre marcas para colaborar"}
                </Typography>
                <AppTextField label={'Usuario'} variant="outlined" fullWidth value={registrationStore.username} onChange={(e) => { registrationStore.setUsername(e.target.value) }} sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
                <AppTextField value={registrationStore.password} type="password" label={'Contraseña'} variant="outlined" fullWidth onChange={(e) => {registrationStore.setPassword(e.target.value) }} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={12} md={6}>
                <AppTextField type="password" label={'Confirmar contraseña'} variant="outlined" fullWidth onChange={() => { }} sx={{ mb: 2 }} />
            </Grid>

            <Grid item xs={12} md={6}>
                <AppDropSelector select value={registrationStore.countryId} label={'País'} sx={{ mb: 2 }}
                    onChange={(e) => {registrationStore.setCountryId(e.target.value)}} fullWidth>
                    <MenuItem value={registrationStore.countryId} disabled>
                        País
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
                <AppDropSelector select value={registrationStore.stateId} label={'Departamento'} sx={{ mb: 2 }}
                    onChange={(e) => {registrationStore.setStateId(e.target.value)}} fullWidth>
                    <MenuItem value={registrationStore.stateId} disabled>
                        Departamento
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
                    multiple
                    id="tags-outlined"
                    options={['English', 'Español']}
                    value={selectedLanguages}
                    onChange={(event, newValue) => {
                        setSelectedLanguages(newValue);
                    }}
                    sx={{ backgroundColor: Colors.main.lightGrey }}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                label={option}
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
                            label="Idioma(s)"
                            placeholder=""
                        />
                    )}
                />
            </Grid>

            <Grid item xs={12}>
                <Typography variant="h5" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: '1rem', mt: '1rem' }}>
                    2. {'Fecha de nacimiento'}
                </Typography>
            </Grid>

            <Grid item xs={3} >
                <AppTextField value={registrationStore.birthdate.day} type="number" label={'Día'} variant="outlined" fullWidth 
                onChange={(e) => { registrationStore.setBirthDay(parseInt(e.target.value))}} sx={{ mb: 2 }} />
            </Grid>
            <Grid item xs={3} >
                <AppTextField value={registrationStore.birthdate.month} type="number" label={'Mes'} variant="outlined" fullWidth 
                onChange={(e) => { registrationStore.setBirthMonth(parseInt(e.target.value))}} />
            </Grid>
            <Grid item xs={6}>
                <AppTextField value={registrationStore.birthdate.year} type="number" label={'Año'} variant="outlined" fullWidth 
                onChange={(e) => { registrationStore.setBirthYear(parseInt(e.target.value))}} />
            </Grid>

            <Grid container spacing={2} mt={'0.1rem'}>
                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={onBack} variation="outline">
                        Anterior
                    </AppSquareButton>
                </Grid>

                <Grid item xs={12} md={6}>
                    <AppSquareButton onClick={() =>{
                        console.log(registrationStore)
                        onNext()}} variation="fill">
                        Siguiente
                    </AppSquareButton>
                </Grid>
            </Grid>

        </Grid>
    )
}

export default UserFlowScreen;