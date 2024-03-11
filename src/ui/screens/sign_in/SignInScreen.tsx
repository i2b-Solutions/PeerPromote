import AppButton from "@components/appButton/appButton";
import AppSquareButton from "@components/appButton/squareButton";
import AppClickableText from "@components/appClickableText/appClickableText";
import AppTextField from "@components/appTextField/appTextField";
import { STATUS } from "@domain/entities/status";
import { signInUserUseCase } from "@domain/useCases/signInUseCases";
import styled from "@emotion/styled";
import { CircularProgress, Container, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { MainRoutes } from "@ui/enums/routeEnums";
import useSessionStore from "@ui/stores/sessionStore";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

enum FieldNames {
  USERNAME = "username",
  PASSWORD = "password"
}

const InitialFieldValues = {
  username: {
    value: "",
    error: ""
  },
  password: {
    value: "",
    error: ""
  }
};

/**
 * Styled component for the sign-in button.
 */
const SignInButton = styled(AppButton)({
  width: "100%",
  padding: "1rem",
  borderRadius: "0.4rem",
  marginTop: "1rem",
  color: Colors.main.white
});

// SignInScreen component for rendering the sign-in screen
const SignInScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [fieldValues, setFieldValues] = useState(InitialFieldValues);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [shouldAdvance, setShouldAdvance] = useState(false);
  const sessionStore = useSessionStore();

  const handleLogin = async () => {
    if (status === STATUS.LOADING) return;
    setStatus(STATUS.LOADING);

    const response = await signInUserUseCase({
      pass: fieldValues.password.value,
      user: fieldValues.username.value
    });

    if (response.status === STATUS.OK) {
      sessionStore.setValue({
        userId: response.data.userId,
        username: response.data.username
      });
      navigate(MainRoutes.OFFERS);
    } else {
      setStatus(STATUS.ERROR);
    }
  };

  const handleFieldChange = (fieldName: FieldNames, value: string) => {
    const currentValues = { ...fieldValues };
    const currentField = currentValues[fieldName];
    currentField.error = "";
    currentField.value = value;
    setFieldValues(currentValues);
  };

  const handleFieldBlur = (fieldName: FieldNames) => {
    const currentValues = { ...fieldValues };
    const currentField = currentValues[fieldName];
    if (!currentField.value) currentField.error = "field_errors.empty";
    setFieldValues(currentValues);
  };

  useEffect(() => {
    setShouldAdvance(
      !!fieldValues.username.value && !!fieldValues.password.value
    );
  }, [fieldValues]);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} sx={{ textAlign: "center" }}>
          <Typography
            variant="h5"
            fontWeight={PoppinsFontWeights.SEMIBOLD}
            color={Colors.main.blue}
            sx={{ mb: "2.5rem" }}
          >
            {t("sign_up_screen.welcome")}
          </Typography>

          {/* Email input field */}
          <AppTextField
            value={fieldValues.username.value}
            error={!!fieldValues.username.error}
            helperText={t(fieldValues.username.error)}
            onBlur={() => {
              handleFieldBlur(FieldNames.USERNAME);
            }}
            label={t("username")}
            variant="outlined"
            fullWidth
            onChange={(e) => {
              handleFieldChange(FieldNames.USERNAME, e.target.value);
            }}
            sx={{ mb: 2 }}
          />

          {/* Password input field */}
          <AppTextField
            value={fieldValues.password.value}
            error={!!fieldValues.password.error}
            helperText={t(fieldValues.password.error)}
            onBlur={() => {
              handleFieldBlur(FieldNames.PASSWORD);
            }}
            label={t("password")}
            type="password"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              handleFieldChange(FieldNames.PASSWORD, e.target.value);
            }}
            sx={{ mb: 2 }}
          />

          {/* Forgot password link */}
          <AppClickableText
            text={t("sign_in_screen.forgot_password")}
            onClick={() => {}}
          />

          {/* Sign-in button */}
          <AppSquareButton
            sx={{ mt: "1rem", color: Colors.main.white }}
            onClick={handleLogin}
            disabled={!shouldAdvance || status === STATUS.LOADING}
            palette="custom"
            customPalette={{ mainColor: Colors.main.black }}
          >
            {status === STATUS.LOADING ? (
              <CircularProgress
                size={24}
                sx={{ color: Colors.main.mediumGrey }}
              />
            ) : (
              t("sign_in")
            )}
          </AppSquareButton>

          {/* Informational text with terms link */}
          <Typography
            variant="body2"
            color={Colors.main.darkBlue}
            sx={{ fontWeight: PoppinsFontWeights.REGULAR, mt: "1rem" }}
          >
            {t("sign_in_screen.by_clicking")}
            <AppClickableText
              onClick={() => {}}
              text={t("sign_in_screen.terms")}
            />
          </Typography>

          {status === STATUS.ERROR && (
            <Typography
              variant="body2"
              color={Colors.main.red}
              sx={{
                mb: "1rem",
                mt: "1rem",
                width: "100%",
                textAlign: "center"
              }}
            >
              {t("errors.try_again")}
            </Typography>
          )}

          {/* Create account button */}
          <AppSquareButton
            onClick={() => {
              navigate(MainRoutes.SIGN_UP);
            }}
            palette="custom"
            variation="fill"
            customPalette={{ mainColor: Colors.main.blue }}
            sx={{ mt: "1rem", color: Colors.main.white }}
          >
            {t("sign_in_screen.create_account")}
          </AppSquareButton>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignInScreen; // Export the SignInScreen component for use in other files
