import AppSquareButton from "@components/appButton/squareButton";
import { STATUS } from "@domain/entities/status";
import { signInUserUseCase } from "@domain/useCases/signInUseCases";
import { Box, Typography, styled } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { MainRoutes } from "@ui/enums/routeEnums";
import useRegistrationStore from "@ui/stores/registrationStore";
import useSessionStore from "@ui/stores/sessionStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,

  [theme.breakpoints.up("md")]: {
    paddingLeft: "4rem",
    paddingRight: "4rem"
  }
}));

const ReadyFlowScreen = () => {
  const { t } = useTranslation();
  const registrationStore = useRegistrationStore();
  const sessionStore = useSessionStore();
  const navigate = useNavigate();
  const [status, setStatus] = useState(STATUS.INITIAL);

  const handleRedirection = async () => {
    if (status === STATUS.LOADING) return;
    setStatus(STATUS.LOADING);

    const response = await signInUserUseCase({
      pass: registrationStore.password,
      user: registrationStore.username
    });

    if (response.status === STATUS.OK) {
      sessionStore.setValue({
        userId: response.data.userId,
        username: response.data.username,
        loggedIn: response.data.loggedIn,
        isCompany: response.data.isCompany
      });
      registrationStore.resetStore();
      navigate(MainRoutes.OFFERS);
    } else {
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <Wrapper>
      <Typography
        variant="h3"
        fontWeight={PoppinsFontWeights.BOLD}
        color={Colors.main.purple}
        sx={{ mb: "1rem" }}
      >
        {t("sign_up_screen.ready")}
      </Typography>
      <Typography variant="body1" color={Colors.main.darkBlue}>
        {registrationStore.username}
        {t(
          registrationStore.isCompany
            ? "sign_up_screen.complete_company"
            : "sign_up_screen.complete"
        )}
      </Typography>

      {status === STATUS.ERROR && (
        <Typography
          variant="body2"
          color={Colors.main.red}
          sx={{
            mt: "1rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}
        >
          {t("errors.try_again")}
        </Typography>
      )}

      <AppSquareButton
        loading={status === STATUS.LOADING}
        onClick={handleRedirection}
        variation="outline"
        sx={{ marginTop: "2rem" }}
      >
        {t("sign_up_screen.see_offers")}
      </AppSquareButton>
    </Wrapper>
  );
};

export default ReadyFlowScreen;
