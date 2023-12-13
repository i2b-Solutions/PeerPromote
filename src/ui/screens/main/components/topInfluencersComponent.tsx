import React from 'react';
import { SelfieImage } from "@assets/images/images";
import AppButton from "@components/appButton/appButton";
import styled from "@emotion/styled";
import { Box, Grid, Typography } from "@mui/material";
import { Colors } from "@theme/colors";
import { DidactGothicFontSizes, PoppinsFontSizes } from '@theme/fontSizes';

// Styled component for the circular image container
const ImageContainer = styled(Box)({
    width: '6rem',
    height: '6rem',
    background: Colors.main.white,
    display: "inline-block",
    borderRadius: '100%',
    overflow: 'hidden'
});

// Styled component for the contact button
const ContactButton = styled(AppButton)({
    borderRadius: '0.5rem'
});

// Sample data for top influencers
const influencersData = [
    { name: 'Maria', followers: '60M+' },
    { name: 'David', followers: '55M+' },
    { name: 'John', followers: '50M+' },
    { name: 'Alex', followers: '45M+' },
    { name: 'Amy', followers: '40M+' },
    { name: 'Ben', followers: '35M+' }
];

/**
 * Component displaying the top influencers section.
 */
const TopInfluencersSection = () => {
    return (
        <Box sx={{ mt: 4, bgcolor: Colors.main.darkBlue, color: 'white', p: 2 }}>
            {/* Section Title */}
            <Typography variant="h4" fontWeight={PoppinsFontSizes.MEDIUM} sx={{ mt: 1, mb: 8, flexGrow: 1 }}>
                Top Influencers
            </Typography>
            {/* Grid of influencers */}
            <Grid container spacing={2}>
                {influencersData.map((item) => (
                    <Grid item xs={6} md={4} lg={2} key={item.name}>
                        <Box>
                            {/* Circular Image Container */}
                            <ImageContainer>
                                <img src={SelfieImage} alt="Influencer" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                            </ImageContainer>
                            {/* Influencer Name */}
                            <Typography variant="h6">{item.name}</Typography>
                            {/* Followers Count */}
                            <Typography variant="body1" fontWeight={DidactGothicFontSizes.BOLD} color={Colors.main.lightBlue}>
                                {item.followers}
                            </Typography>
                            {/* Contact Button */}
                            <ContactButton sx={{ mt: 1, mb: 2 }} variant="contained">
                                Contact
                            </ContactButton>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default TopInfluencersSection;
