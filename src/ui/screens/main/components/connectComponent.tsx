import { useState, ChangeEvent } from 'react';
import {
    Typography,
    Container,
    Grid,
    Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { Colors } from '@theme/colors';
import AppButton from '@components/appButton/appButton';
import { UserTypes } from '@data/enums/userEnums';
import AppTextField from '@components/appTextField/appTextField';
import { InfluencerImage } from '@assets/images/images';

// Styled component for the UserTypeSelectorContainer
const UserTypeSelectorContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    background: Colors.main.lightGrey,
    marginBottom: '1rem',
    borderRadius: '0.4rem',
    border: `solid 0.05rem ${Colors.main.mediumGrey}`
});

// Styled component for the UserSelectionButton
const UserTypeButton = styled(AppButton)({
    flex: 1,
    borderRadius: '0.4rem',
    fontSize: '1rem',
    padding: '0.5rem',
});

// Styled component for the SearchButton
const SearchButton = styled(AppButton)({
    width: "100%",
    padding: '1rem',
    borderRadius: '0.4rem',
});

// Component for the SelectionButton
const UserSelectionButton = ({ type, currentSelection, onClick }: { type: UserTypes, currentSelection: UserTypes, onClick: (type: UserTypes) => void }) => {
    const isSelected = currentSelection === type;
    return (
        <UserTypeButton textColor={isSelected ? Colors.main.white : Colors.main.mediumGrey} backgroundColor={isSelected ? Colors.main.blue : Colors.main.lightGrey} onClick={() => onClick(type)}>
            {type}
        </UserTypeButton>
    );
};

/**
 * Main Connect Section component with search functionality.
 */
const ConnectSection = () => {
    const [userType, setUserType] = useState(UserTypes.INFLUENCER);
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');

    /**
     * Handles the change of user type.
     * @param {UserTypes} type - The selected user type.
     */
    const handleUserTypeChange = (type: UserTypes) => {
        setUserType(type);
    };

    /**
     * Handles the change of the name input.
     * @param {ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    /**
     * Handles the change of the country input.
     * @param {ChangeEvent<HTMLInputElement>} event - The input change event.
     */
    const handleCountryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Grid container spacing={3}>
                {/* Left column (visible on all screen sizes) */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <Typography variant="h4" color={Colors.main.blue}>
                            Connect the ideal influencer
                        </Typography>
                        <Typography fontWeight="700" variant="h4" color={Colors.main.blue}>
                            for your business.
                        </Typography>
                        <Typography marginTop="2rem" marginBottom="2rem" variant="body1">
                            {userType === UserTypes.INFLUENCER
                                ? 'Are you a business? Discover the perfect influencers to elevate your brand!'
                                : 'Are you an influencer? Discover exciting collaborations with businesses!'
                            }
                        </Typography>
                        {/* User Type Selector Buttons */}
                        <UserTypeSelectorContainer>
                            <UserSelectionButton currentSelection={userType} type={UserTypes.INFLUENCER} onClick={handleUserTypeChange} />
                            <UserSelectionButton currentSelection={userType} type={UserTypes.BUSINESS} onClick={handleUserTypeChange} />
                        </UserTypeSelectorContainer>
                        {/* Additional fields based on user type */}
                        {userType === UserTypes.INFLUENCER && (
                            <>
                                <AppTextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    value={name}
                                    onChange={handleNameChange}
                                    sx={{ mb: 2 }}
                                />
                                <AppTextField
                                    label="Country"
                                    variant="outlined"
                                    fullWidth
                                    value={country}
                                    onChange={handleCountryChange}
                                    sx={{ mb: 2 }}
                                />
                            </>
                        )}
                        {userType === UserTypes.BUSINESS && (
                            <AppTextField
                                label="Country"
                                variant="outlined"
                                fullWidth
                                value={country}
                                onChange={handleCountryChange}
                                sx={{ mb: 2 }}
                            />
                        )}
                        {/* Button for user action */}
                        <SearchButton backgroundColor={Colors.main.black} textColor={Colors.main.white}>
                            {userType === UserTypes.BUSINESS ? 'Find' : 'Request'}
                        </SearchButton>
                    </Box>
                </Grid>

                {/* Right column (visible only on medium and larger screens) */}
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'inherit' } }}>
                    <img src={InfluencerImage} alt='Influencer' style={{ width: '100%', height: '28.5rem', objectFit: 'contain' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConnectSection;
