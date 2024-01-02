import { Box } from '@mui/material';
import styled from '@emotion/styled';
import ConnectSection from './components/connectComponent';
import StatisticsSection from './components/statisticsComponent';
import TopInfluencersSection from './components/topInfluencersComponent';
import { Colors } from '@theme/colors';
import AppMainContainer from '@components/appMainContainer/appMainContainer';

// Styled component for the top influencers container
export const TopInfluencesContainer = styled(Box)({
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

      {/* Top Influences Section */}
      <TopInfluencesContainer>
        <AppMainContainer>
          <TopInfluencersSection />
        </AppMainContainer>
      </TopInfluencesContainer>
    </>
  );
};

export default MainScreen;
