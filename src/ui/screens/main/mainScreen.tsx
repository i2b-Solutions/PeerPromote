import { Box } from '@mui/material';
import styled from "@emotion/styled";
import ConnectSection from './components/connectComponent';
import StatisticsSection from './components/statisticsComponent';
import { Colors } from '@theme/colors';
import AppMainContainer from '@components/appMainContainer/appMainContainer';
import TopContentCreatorsSection from './components/topContentCreatorsComponent';

// Styled component for the top content creators container
export const TopContentCreatorsContainer = styled(Box)({
    width: '100%',
    backgroundColor: Colors.main.darkBlue,
  });

const MainScreen = () => {
  return (
    <>
      {/* Main Content */}
      <AppMainContainer>

        {/* Connect Section */}
        <ConnectSection />

        {/* Statistics Section */}
        <StatisticsSection />

      </AppMainContainer>

      {/* Top Content Creators Section */}
      <TopContentCreatorsContainer>
        <AppMainContainer>
          <TopContentCreatorsSection />
        </AppMainContainer>
      </TopContentCreatorsContainer>
    </>
  );
};

export default MainScreen;
