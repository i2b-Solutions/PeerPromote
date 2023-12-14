import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { DidactGothicFontSizes, PoppinsFontSizes } from "@theme/fontSizes";

// Styled component for the StatisticsContainer
const StatisticsContainer = styled(Grid)({
    marginTop: '2rem',
    marginBottom: '4rem'
});

// Sample statistics data
const statisticsData = [
    {
        name: 'Influencers',
        value: 300
    },
    {
        name: 'Followers',
        value: 200
    },
    {
        name: 'Business',
        value: 300
    },
    {
        name: 'Contracts',
        value: 200
    }
];

/**
 * Statistics section component displaying industry statistics.
 */
const StatisticsSection = () => {
    return (
        <StatisticsContainer container spacing={3}>
            <Grid item xs={12}>
                {/* Title */}
                <Typography variant="h4" color={Colors.main.darkBlue} style={{ flexGrow: 1 }}>
                    We are industry
                </Typography>
                <Typography variant="h4" fontWeight={700} color={Colors.main.darkBlue} style={{ flexGrow: 1, marginBottom: '2rem' }}>
                    trailblazers
                </Typography>
            </Grid>
            {/* Displaying statistics */}
            {statisticsData.map((data) => (
                <Grid item xs={6} md={3} key={data.name}>
                    <Box>
                        {/* Statistic Value */}
                        <Typography variant="h4" fontWeight={PoppinsFontSizes.BOLD} color={Colors.main.blue} sx={{ mb: 1 }}>
                            {`${data.value}K+`}
                        </Typography>
                        {/* Statistic Name */}
                        <Typography variant="body1" fontWeight={DidactGothicFontSizes.BOLD} color={Colors.main.mediumGrey}>
                            {data.name}
                        </Typography>
                    </Box>
                </Grid>
            ))}
        </StatisticsContainer>
    );
};

export default StatisticsSection;
