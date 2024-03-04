import AppSquareButton from "@components/appButton/squareButton";
import { Box, Typography, styled } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import { MainRoutes } from "@ui/enums/routeEnums";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Wrapper = styled(Box)(({ theme }) => ({
  paddingLeft: 0,
  paddingRight: 0,

  [theme.breakpoints.up("md")]: {
    paddingLeft: "4rem",
    paddingRight: "4rem",
  },
}));

const ReadyFlowScreen = () => {
  const { t } = useTranslation();
  const registrationStore = useRegistrationStore();
  const navigate = useNavigate();

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
        {t("sign_up_screen.complete")}
      </Typography>

      <AppSquareButton
        onClick={() => {
          navigate(MainRoutes.OFFERS);
        }}
        variation="outline"
        sx={{ marginTop: "2rem" }}
      >
        {t("sign_up_screen.see_offers")}
      </AppSquareButton>
    </Wrapper>
  );
};

export default ReadyFlowScreen;
