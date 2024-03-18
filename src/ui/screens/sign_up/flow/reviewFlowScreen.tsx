import { Box, Typography, Grid } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useTranslation } from "react-i18next";
import SignUpNavButtons from "../components/navButtons";
import { calculateAge } from "@ui/helpers/dateHelpers";
import { resizeImage } from "@ui/helpers/assetHelpers";
import { useState } from "react";
import { SignUpController } from "@domain/controllers/signUpController/signUpController";
import { RegisterUserRequest } from "@domain/entities/signUpEntities";
import { STATUS } from "@domain/entities/status";
import useSessionStore from "@ui/stores/sessionStore";

const TitleValue = ({ title, value }: { title: string; value: string }) => {
  return (
    <>
      <Typography variant="body1" color={Colors.main.mediumGrey}>
        {title}
      </Typography>
      <Typography
        variant="body1"
        color={Colors.main.darkBlue}
        fontWeight={PoppinsFontWeights.MEDIUM}
        mb={"1rem"}
      >
        {value}
      </Typography>
    </>
  );
};

const SelfieImage = ({ selfie }: { selfie?: File }) => {
  if (!selfie) return null;

  return (
    <Box textAlign="center">
      {" "}
      <img
        src={URL.createObjectURL(selfie)}
        alt="Selfie"
        style={{
          width: "7rem",
          height: "7rem",
          borderRadius: "50%",
          objectFit: "cover",
          border: `0.2rem solid ${Colors.main.darkBlue}`
        }}
      />
    </Box>
  );
};

const ReviewFlowScreen = ({
  onNext,
  onBack
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { t } = useTranslation();
  const registrationStore = useRegistrationStore();
  const sessionStore = useSessionStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleOnNext = async () => {
    setLoading(true);
    setError(false);

    const resizedSelfie = await resizeImage(registrationStore.selfie);

    const payload: RegisterUserRequest = {
      username: registrationStore.username,
      password: registrationStore.password,
      confirmPassword: registrationStore.confirmPassword,
      isCompany: registrationStore.isCompany,
      countryId: registrationStore.location.countryId,
      stateId: registrationStore.location.stateId,
      languages: registrationStore.languages,
      birthdate: registrationStore.birthdate,
      email: registrationStore.email,
      area: registrationStore.area,
      phone: registrationStore.phone,
      selfie: resizedSelfie.data
    };

    const response = await SignUpController.registerUser(payload);

    if (response.status === STATUS.OK) {
      onNext();
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <Box textAlign={"left"}>
      <Typography
        variant="h5"
        fontWeight={PoppinsFontWeights.BOLD}
        color={Colors.main.blue}
        sx={{ mb: "1rem" }}
      >
        {registrationStore.isCompany ? 4 : 5}. {t("sign_up_screen.verify")}
      </Typography>
      <Typography
        variant="body1"
        color={Colors.main.darkBlue}
        sx={{ mb: "1.5rem" }}
      >
        {t("sign_up_screen.all_ready")}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box>
            <TitleValue
              title={t("fields.user")}
              value={registrationStore.username}
            />
            {!registrationStore.isCompany && (
              <TitleValue
                title={t("fields.age")}
                value={calculateAge(registrationStore.birthdate).toFixed(0)}
              />
            )}
            <Grid container>
              <Grid item xs={12} md={6}>
                <TitleValue
                  title={t("fields.country")}
                  value={registrationStore.location.countryName}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TitleValue
                  title={t("fields.location")}
                  value={registrationStore.location.stateName}
                />
              </Grid>
            </Grid>
            <TitleValue
              title={t("fields.email")}
              value={registrationStore.email}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <SelfieImage selfie={registrationStore.selfie} />
        </Grid>
      </Grid>

      {error && (
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

      <SignUpNavButtons
        onBack={onBack}
        onNext={handleOnNext}
        nextValue={"finish"}
        loading={loading}
      />
    </Box>
  );
};

export default ReviewFlowScreen;
