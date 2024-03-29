import AppDropSelector from "@components/appDropSelector/appDropSelector";
import AppTextField from "@components/appTextField/appTextField";
import { SUPPORTED_LANGUAGES } from "@domain/constants/domainConstants";
import {
  Autocomplete,
  Chip,
  Grid,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { Colors } from "@theme/colors";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SignUpNavButtons from "../components/navButtons";
import { calculateAge, isValidDate } from "@ui/helpers/dateHelpers";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { SUPPORTED_COUNTRIES } from "@ui/constants/locationConstants";
import { Country, CountryState } from "@domain/entities/country";
import { CountryController } from "@domain/controllers/countryController/countryController";
import { SignUpController } from "@domain/controllers/signUpController/signUpController";
import { ERROR_TYPES, STATUS } from "@domain/entities/status";

const currentYear: number = new Date().getFullYear();

enum FieldNames {
  USER = "username",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  COUNTRY = "countryId",
  STATE = "stateId",
  LANGUAGES = "languages",
  DAY = "day",
  MONTH = "month",
  YEAR = "year",
  BIRTHDATE = "birthdate",
  UNSET = "unset"
}

const initialFieldErrors = {
  username: "",
  password: "",
  confirmPassword: "",
  countryId: "",
  stateId: "",
  languages: "",
  day: "",
  month: "",
  year: "",
  birthdate: "",
  submit: ""
};

const UserFlowScreen = ({
  onNext,
  onBack
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { t } = useTranslation();

  const registrationStore = useRegistrationStore();
  const [fieldError, setFieldError] = useState({ ...initialFieldErrors });
  const [canAdvance, setCanAdvance] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [states, setStates] = useState<CountryState[]>([]);

  const checkForm = (field: FieldNames = FieldNames.UNSET) => {
    let newFieldError = { ...fieldError };

    switch (field) {
      case FieldNames.UNSET:
        const {
          username,
          password,
          confirmPassword,
          location,
          languages,
          birthdate
        } = registrationStore;
        const { day, month, year } = birthdate;
        const { countryId, stateId } = location;

        let isDateValid = false;

        if (year > 1000) {
          isDateValid = isValidDate(
            day,
            month,
            year,
            currentYear - 100,
            currentYear
          );

          newFieldError.birthdate = isDateValid
            ? ""
            : "field_errors.invalid_date";

          if (isDateValid) {
            const isAdult = calculateAge(birthdate) >= 18;
            isDateValid = isAdult;

            newFieldError.birthdate = isAdult ? "" : "field_errors.underage";
          }
        }

        const isBirthdateValid =
          (!!day && !!month && !!year && isDateValid) ||
          registrationStore.isCompany;

        const shouldAdvance =
          !!username &&
          !!password &&
          !!confirmPassword &&
          password === confirmPassword &&
          !!countryId &&
          !!stateId &&
          !!languages.length &&
          isBirthdateValid;

        setCanAdvance(shouldAdvance);
        if (shouldAdvance) setFieldError({ ...initialFieldErrors });

        break;
      case FieldNames.USER:
      case FieldNames.PASSWORD:
      case FieldNames.CONFIRM_PASSWORD:
        newFieldError[field] = !registrationStore[field]
          ? "field_errors.empty"
          : field === FieldNames.CONFIRM_PASSWORD &&
              registrationStore.confirmPassword !== registrationStore.password
            ? "field_errors.password_match"
            : "";
        break;
      case FieldNames.LANGUAGES:
        newFieldError[field] = !registrationStore[field].length
          ? "field_errors.empty"
          : "";
        break;
      case FieldNames.COUNTRY:
      case FieldNames.STATE:
        newFieldError[field] = !registrationStore.location[field]
          ? "field_errors.empty"
          : "";
        break;
      case FieldNames.DAY:
      case FieldNames.MONTH:
      case FieldNames.YEAR:
        newFieldError[field] = !registrationStore.birthdate[field]
          ? "field_errors.empty"
          : "";
        break;
      default:
        break;
    }

    setFieldError(newFieldError);
  };

  const handleBirthChange = (newValue: string, field: FieldNames) => {
    const parsedValue = parseInt(newValue) || 0;

    switch (field) {
      case FieldNames.DAY:
        registrationStore.setBirthDay(Math.min(parsedValue, 31));
        break;
      case FieldNames.MONTH:
        registrationStore.setBirthMonth(Math.min(parsedValue, 12));
        break;
      case FieldNames.YEAR:
        registrationStore.setBirthYear(Math.min(parsedValue, currentYear));
        break;
      default:
        break;
    }
  };

  const handleOnNext = async () => {
    setLoading(true);
    setFieldError((prevFieldError) => ({
      ...prevFieldError,
      submit: ""
    }));

    const response = await SignUpController.isUserAvailable(
      registrationStore.username
    );

    if (response.status === STATUS.OK && response.data.isAvailable) {
      onNext();
    } else {
      if (response.errorType === ERROR_TYPES.NONE) {
        setFieldError((prevFieldError) => ({
          ...prevFieldError,
          username: "errors.user_exists"
        }));
      } else {
        setFieldError((prevFieldError) => ({
          ...prevFieldError,
          submit: "errors.try_again"
        }));
      }
    }

    setLoading(false);
  };

  const updateStates = (selectedCountry: string) => {
    setStates(
      countries.find(
        (countryItem) => countryItem.iso2.toLowerCase() === selectedCountry
      )?.states || []
    );
  };

  const handleCountryChange = (id: string) => {
    const countryName =
      countries.find((country) => country.iso2.toLowerCase() === id)?.name ||
      "";
    registrationStore.setCountry(id, countryName);
    registrationStore.setState(0, "");
  };

  const handleStateChange = (id: number) => {
    const stateName = states.find((state) => state.id === id)?.name || "";
    registrationStore.setState(id, stateName);
  };

  const loadCountries = async () => {
    const supportedCountries = (
      await CountryController.getCountries()
    ).data.filter((country) =>
      SUPPORTED_COUNTRIES.includes(country.iso2.toLowerCase())
    );
    setCountries(supportedCountries);
  };

  useEffect(() => {
    loadCountries();
  }, []);

  useEffect(() => {
    updateStates(registrationStore.location.countryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationStore.location.countryId, countries]);

  useEffect(() => {
    checkForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationStore]);

  return (
    <Grid container spacing={1} textAlign={"left"}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          fontWeight={PoppinsFontWeights.BOLD}
          color={Colors.main.blue}
          sx={{ mb: "1rem" }}
        >
          1. {t("sign_up_screen.user_info")}
        </Typography>
        <Typography
          variant="body1"
          color={Colors.main.darkBlue}
          sx={{ mb: "1.5rem" }}
        >
          {t(
            registrationStore.isCompany
              ? "sign_up_screen.register_as_business"
              : "sign_up_screen.register_as_creator"
          )}
        </Typography>
        <AppTextField
          value={registrationStore.username}
          onBlur={() => {
            checkForm(FieldNames.USER);
          }}
          error={!!fieldError.username}
          helperText={t(fieldError.username)}
          label={t("fields.user")}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            registrationStore.setUsername(e.target.value);
          }}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <AppTextField
          value={registrationStore.password}
          onBlur={() => {
            checkForm(FieldNames.PASSWORD);
          }}
          error={!!fieldError.password}
          helperText={t(fieldError.password)}
          type="password"
          label={t("fields.password")}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            registrationStore.setPassword(e.target.value);
          }}
          sx={{ mb: 2 }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <AppTextField
          value={registrationStore.confirmPassword}
          onBlur={() => {
            checkForm(FieldNames.CONFIRM_PASSWORD);
          }}
          error={!!fieldError.confirmPassword}
          helperText={t(fieldError.confirmPassword)}
          type="password"
          label={t("fields.confirm_password")}
          variant="outlined"
          fullWidth
          onChange={(e) => {
            registrationStore.setConfirmPassword(e.target.value);
          }}
          sx={{ mb: 2 }}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <AppDropSelector
          onBlur={() => {
            checkForm(FieldNames.COUNTRY);
          }}
          error={!!fieldError.countryId}
          helperText={t(fieldError.countryId)}
          select
          value={registrationStore.location.countryId}
          label={t("fields.country")}
          sx={{ mb: 2 }}
          onChange={(e) => {
            handleCountryChange(e.target.value);
          }}
          fullWidth
        >
          <MenuItem value={registrationStore.location.countryId} disabled>
            {t("fields.country")}
          </MenuItem>
          {countries.map((country) => {
            return (
              <MenuItem
                value={country.iso2.toLowerCase()}
                key={country.iso2.toLowerCase()}
              >
                {country.name}
              </MenuItem>
            );
          })}
        </AppDropSelector>
      </Grid>

      <Grid item xs={12} md={6}>
        <AppDropSelector
          onBlur={() => {
            checkForm(FieldNames.STATE);
          }}
          error={!!fieldError.stateId}
          helperText={t(fieldError.stateId)}
          select
          value={registrationStore.location.stateId || ""}
          label={t("fields.location")}
          sx={{ mb: 2 }}
          onChange={(e) => {
            handleStateChange(parseInt(e.target.value, 10) || 0);
          }}
          fullWidth
        >
          <MenuItem value={registrationStore.location.stateId} disabled>
            {t("fields.location")}
          </MenuItem>
          {states.map((stateItem) => {
            return (
              <MenuItem value={stateItem.id} key={stateItem.id}>
                {stateItem.name}
              </MenuItem>
            );
          })}
        </AppDropSelector>
      </Grid>

      <Grid item xs={12}>
        <Autocomplete
          onBlur={() => {
            checkForm(FieldNames.LANGUAGES);
          }}
          multiple
          id="tags-outlined"
          options={SUPPORTED_LANGUAGES}
          getOptionLabel={(option) => option.name}
          value={registrationStore.languages}
          onChange={(event, newValue) => {
            registrationStore.setLanguages(newValue);
          }}
          sx={{
            backgroundColor: Colors.main.lightGrey,
            "& .MuiFormHelperText-root": {
              margin: 0,
              backgroundColor: Colors.main.white,
              paddingTop: "0.25rem",
              paddingLeft: "0.3rem",
              paddingRight: "0.3rem"
            }
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option.name}
                {...getTagProps({ index })}
                style={{
                  margin: "4px",
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
              label={t("fields.languages")}
              placeholder=""
              error={!!fieldError.languages}
              helperText={t(fieldError.languages)}
            />
          )}
        />
      </Grid>

      {!registrationStore.isCompany && (
        <>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              fontWeight={PoppinsFontWeights.BOLD}
              color={Colors.main.blue}
              sx={{ mb: "1rem", mt: "1rem" }}
            >
              2. {t("sign_up_screen.birthdate")}
            </Typography>
          </Grid>

          <Grid item xs={3}>
            <AppTextField
              value={registrationStore.birthdate.day || ""}
              onBlur={() => {
                checkForm(FieldNames.DAY);
              }}
              error={!!fieldError.day}
              type="tel"
              label={t("fields.day")}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                handleBirthChange(e.target.value, FieldNames.DAY);
              }}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={3}>
            <AppTextField
              value={registrationStore.birthdate.month || ""}
              onBlur={() => {
                checkForm(FieldNames.MONTH);
              }}
              error={!!fieldError.month}
              type="tel"
              label={t("fields.month")}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                handleBirthChange(e.target.value, FieldNames.MONTH);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <AppTextField
              value={registrationStore.birthdate.year || ""}
              onBlur={() => {
                checkForm(FieldNames.YEAR);
              }}
              error={!!fieldError.year}
              type="tel"
              label={t("fields.year")}
              variant="outlined"
              fullWidth
              onChange={(e) => {
                handleBirthChange(e.target.value, FieldNames.YEAR);
              }}
            />
          </Grid>
        </>
      )}

      {!!fieldError.birthdate && (
        <Typography
          variant="body2"
          color={Colors.main.red}
          sx={{
            mt: "0.75eslintrc rem",
            mb: "1rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}
        >
          {t(fieldError.birthdate)}
        </Typography>
      )}

      {!!fieldError.submit && (
        <Typography
          variant="body2"
          color={Colors.main.red}
          sx={{
            mb: "1rem",
            mt: "1rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}
        >
          {t(fieldError.submit)}
        </Typography>
      )}

      <SignUpNavButtons
        onBack={onBack}
        onNext={handleOnNext}
        disabled={!canAdvance}
        loading={loading}
      />
    </Grid>
  );
};

export default UserFlowScreen;
