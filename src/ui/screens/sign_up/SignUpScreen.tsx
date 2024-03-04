import { useState } from "react";
import { Container, Grid, Hidden, Slide } from "@mui/material";
import WelcomeFlowScreen from "./flow/welcomeFlowScreen";
import UserFlowScreen from "./flow/userFlowScreen";
import ContactFlowScreen from "./flow/contactFlowScreen";
import ReviewFlowScreen from "./flow/reviewFlowScreen";
import AppStepIndicator from "@components/appStepIndicator/appStepIndicator";
import ReadyFlowScreen from "./flow/readyFlowScreen";
import { AppImageWithText } from "@components/appImage/appImage";

const totalScreens = 5;

const getTextForScreen = (currentScreen: number): string => {
  switch (currentScreen) {
    case 2:
      return "sign_up_screen.your_manager";
    case 3:
      return "sign_up_screen.connect";
    case 4:
      return "sign_up_screen.discover";
    default:
      return "";
  }
};

const SlideWrapper = ({
  slideKey,
  children,
}: {
  slideKey: string;
  children: React.ReactElement<any, any>;
}) => {
  return (
    <Slide
      key={slideKey}
      direction="up"
      in
      mountOnEnter
      unmountOnExit
      timeout={400}
    >
      <Container sx={{ padding: 0 }}>{children}</Container>
    </Slide>
  );
};

const GenerateSlide = ({
  component,
  slideKey,
}: {
  component: JSX.Element;
  slideKey: string;
}) => {
  return <SlideWrapper slideKey={slideKey}>{component}</SlideWrapper>;
};

const ScreenNavigator = ({
  screen,
  onBack,
  onNext,
}: {
  screen: number;
  onBack: () => void;
  onNext: () => void;
}) => {
  switch (screen) {
    case 1:
      return (
        <GenerateSlide
          slideKey="welcome-slide"
          component={<WelcomeFlowScreen onNext={onNext} />}
        />
      );
    case 2:
      return (
        <GenerateSlide
          slideKey="user-slide"
          component={<UserFlowScreen onNext={onNext} onBack={onBack} />}
        />
      );
    case 3:
      return (
        <GenerateSlide
          slideKey="contact-slide"
          component={<ContactFlowScreen onNext={onNext} onBack={onBack} />}
        />
      );
    case 4:
      return (
        <GenerateSlide
          slideKey="review-slide"
          component={<ReviewFlowScreen onNext={onNext} onBack={onBack} />}
        />
      );
    case 5:
      return (
        <GenerateSlide slideKey="ready-slide" component={<ReadyFlowScreen />} />
      );
    default:
      return <></>;
  }
};

const SignUpScreen = () => {
  const [currentScreen, setCurrentScreen] = useState(1);

  const goToNextScreen = () => {
    setCurrentScreen((prevScreen) =>
      prevScreen < totalScreens ? prevScreen + 1 : 1
    );
  };

  const goToPreviousScreen = () => {
    setCurrentScreen((prevScreen) =>
      prevScreen > 1 ? prevScreen - 1 : totalScreens
    );
  };

  const invertItems = currentScreen === totalScreens;

  return (
    <Container sx={{ mt: 3 }}>
      <AppStepIndicator currentStep={currentScreen} totalSteps={totalScreens} />
      <Grid container sx={{ mt: "2rem" }}>
        <Grid
          order={invertItems ? 2 : 1}
          item
          xs={12}
          md={6}
          sx={{ textAlign: "center", paddingBottom: "1rem" }}
        >
          <ScreenNavigator
            screen={currentScreen}
            onBack={goToPreviousScreen}
            onNext={goToNextScreen}
          />
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} md={6} order={invertItems ? 1 : 2}>
            <AppImageWithText
              url={`/sign_up/step${currentScreen}.png`}
              style={{ width: "100%" }}
              textVariant={currentScreen === 4 ? "h3" : "h2"}
              text={getTextForScreen(currentScreen)}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Container>
  );
};

export default SignUpScreen;
