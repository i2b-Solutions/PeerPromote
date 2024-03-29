import AppSquareButton from "@components/appButton/squareButton";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";
import useRegistrationStore from "@ui/stores/registrationStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const WelcomeFlowScreen = ({ onNext }: { onNext: () => void }) => {
  const { t } = useTranslation();
  const registrationStore = useRegistrationStore();

  const handleOnNext = (isCompany: boolean) => {
    registrationStore.setIsCompany(isCompany);
    onNext();
  };

  useEffect(() => {
    registrationStore.resetStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box textAlign={"left"}>
      <Typography
        variant="h5"
        fontWeight={PoppinsFontWeights.BOLD}
        color={Colors.main.blue}
        sx={{ mb: "1rem" }}
      >
        {t("sign_up_screen.welcome")}
      </Typography>
      <Typography variant="body1" color={Colors.main.darkBlue}>
        {t("sign_up_screen.we_are")}
      </Typography>
      <Typography
        component={"span"}
        fontWeight={PoppinsFontWeights.BOLD}
        color={Colors.main.blue}
      >
        {t("sign_up_screen.will_take")}
      </Typography>

      <Grid container spacing={2} mt={"2rem"}>
        <Grid item xs={12} md={6}>
          <AppSquareButton
            onClick={() => {
              handleOnNext(false);
            }}
            variation="outline"
          >
            {t("sign_up_screen.as_creator")}
          </AppSquareButton>
        </Grid>

        <Grid item xs={12} md={6}>
          <AppSquareButton
            onClick={() => {
              handleOnNext(true);
            }}
            variation="outline"
          >
            {t("sign_up_screen.as_business")}
          </AppSquareButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeFlowScreen;
