import { useState } from 'react';
import { Container, Grid, Slide } from '@mui/material';
import AppButton from '@components/appButton/appButton';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import WelcomeFlowScreen from './flow/welcomeFlowScreen';
import UserFlowScreen from './flow/userFlowScreen';
import ContactFlowScreen from './flow/contactFlowScreen';
import ReviewFlowScreen from './flow/reviewFlowScreen';

const NavigationButton = styled(AppButton)({
    width: '100%',
    padding: '1rem',
    borderRadius: '0.4rem',
    marginTop: '1rem',
});

const totalScreens = 4;

const SlideWrapper = ({ slideKey, children }: {
    slideKey: string;
    children: React.ReactElement<any, any>;
}) => {
    return (
        <Slide key={slideKey} direction="up" in mountOnEnter unmountOnExit timeout={400}>
            <Container sx={{ padding: 0 }}>
                {children}
            </Container>
        </Slide>
    );
}

const GenerateSlide = ({ component, key }: { component: JSX.Element, key: string }) => {
    return (
        <SlideWrapper slideKey={key}>
            {component}
        </SlideWrapper>
    )
}

const ScreenNavigator = ({ screen, onBack, onNext }: { screen: number, onBack: () => void, onNext: () => void }) => {
    switch (screen) {
        case 1:
            return <GenerateSlide key='welcome-slide' component={<WelcomeFlowScreen onNext={onNext} />} />
        case 2:
            return <GenerateSlide key='user-slide' component={<UserFlowScreen onNext={onNext} onBack={onBack} />} />
        case 3:
            return <GenerateSlide key='contact-slide' component={<ContactFlowScreen onNext={onNext} onBack={onBack} />} />
        case 4:
            return <GenerateSlide key='review-slide' component={<ReviewFlowScreen onNext={onNext} onBack={onBack} />} />
        default:
            return <></>;
    }
};

const SignUpScreen = () => {
    const { t } = useTranslation();
    const [currentScreen, setCurrentScreen] = useState(1);

    const goToNextScreen = () => {
        setCurrentScreen((prevScreen) => (prevScreen < totalScreens ? prevScreen + 1 : 1));
    };

    const goToPreviousScreen = () => {
        setCurrentScreen((prevScreen) => (prevScreen > 1 ? prevScreen - 1 : totalScreens));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container>
                <Grid item xs={12} md={6} sx={{ textAlign: 'center', paddingBottom: '1rem' }}>
                    <ScreenNavigator screen={currentScreen} onBack={goToPreviousScreen} onNext={goToNextScreen} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default SignUpScreen;
