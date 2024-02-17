import { SelfieImage } from "@assets/images/images";
import AppButton from "@components/appButton/appButton";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { useTranslation } from 'react-i18next';
import { PoppinsFontWeights } from '@theme/fontWeights';

// Styled component for the circular image container
const ImageContainer = styled(Box)({
    width: '6rem',
    height: '6rem',
    background: Colors.main.white,
    display: "inline-block",
    borderRadius: '100%',
    overflow: 'hidden',
    border: 'solid 0.2rem',
    borderColor: Colors.main.white
});

// Styled component for the contact button
const ContactButton = styled(AppButton)({
    borderRadius: '0.5rem',
    color: Colors.main.darkBlue,
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem'
});

// Sample data for top content creators
const contentCreatorsData = [
    { name: 'Maria', followers: '60M+' },
    { name: 'David', followers: '55M+' },
    { name: 'John', followers: '50M+' },
    { name: 'Alex', followers: '45M+' },
    { name: 'Amy', followers: '40M+' },
    { name: 'Ben', followers: '35M+' }
];

/**
 * Component displaying the top content creators section.
 */
const TopContentCreatorsSection = () => {
    const { t } = useTranslation();

    return (
        <Box sx={{ mt: 4, bgcolor: Colors.main.darkBlue, color: 'white', p: 2 }}>
            {/* Section Title */}
            <Typography variant="h4" fontWeight={PoppinsFontWeights.MEDIUM} color={Colors.main.white} sx={{ mt: 1, mb: 8, flexGrow: 1 }}>
                Top {t('content_creators')}
            </Typography>
            {/* Grid of content creators */}
            <Grid container spacing={2}>
                {contentCreatorsData.map((item) => (
                    <Grid item xs={6} md={4} lg={2} key={item.name}>
                        <Box>
                            {/* Circular Image Container */}
                            <ImageContainer>
                                <img src={SelfieImage} alt="Content creator" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </ImageContainer>
                            {/* Content Creator Name */}
                            <Typography variant="h6" color={Colors.main.white}>{item.name}</Typography>
                            {/* Followers Count */}
                            <Typography variant="body1" fontWeight={PoppinsFontWeights.BOLD} color={Colors.main.lightBlue}>
                                {item.followers}
                            </Typography>
                            {/* Contact Button */}
                            <ContactButton sx={{ mt: 1, mb: 2 }} variant="contained">
                                {t('connect')}
                            </ContactButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TopContentCreatorsSection;
