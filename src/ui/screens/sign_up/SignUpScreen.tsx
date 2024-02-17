import { useState } from 'react';
import { Container, Grid, Slide } from '@mui/material';
import WelcomeFlowScreen from './flow/welcomeFlowScreen';
import UserFlowScreen from './flow/userFlowScreen';
import ContactFlowScreen from './flow/contactFlowScreen';
import ReviewFlowScreen from './flow/reviewFlowScreen';
import useRegistrationStore from '@ui/stores/registrationStore';

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

const GenerateSlide = ({ component, slideKey }: { component: JSX.Element, slideKey: string }) => {
    return (
        <SlideWrapper slideKey={slideKey}>
            {component}
        </SlideWrapper>
    )
}

const ScreenNavigator = ({ screen, onBack, onNext }: { screen: number, onBack: () => void, onNext: () => void }) => {
    switch (screen) {
        case 1:
            return <GenerateSlide slideKey='welcome-slide' component={<WelcomeFlowScreen onNext={onNext} />} />
        case 2:
            return <GenerateSlide slideKey='user-slide' component={<UserFlowScreen onNext={onNext} onBack={onBack} />} />
        case 3:
            return <GenerateSlide slideKey='contact-slide' component={<ContactFlowScreen onNext={onNext} onBack={onBack} />} />
        case 4:
            return <GenerateSlide slideKey='review-slide' component={<ReviewFlowScreen onNext={onNext} onBack={onBack} />} />
        default:
            return <></>;
    }
};

const SignUpScreen = () => {
    const [currentScreen, setCurrentScreen] = useState(1);
    const registrationStore = useRegistrationStore();

    const goToNextScreen = () => {
        if (currentScreen === totalScreens) {
            console.log(registrationStore);
            console.log(JSON.stringify(registrationStore));
        }
        else {
            setCurrentScreen((prevScreen) => (prevScreen < totalScreens ? prevScreen + 1 : 1));
        }
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
