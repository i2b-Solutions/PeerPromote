import React, { useState, ChangeEvent } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import styled from '@emotion/styled';
import { Colors } from '@theme/colors';
import AppButton from '@components/appButton/appButton';
import { UserTypes } from '@data/enums/userEnums';
import AppTextField from '@components/appTextField/appTextField';
import { InfluencerImage } from '@assets/images/images';
import { DidactGothicFontSizes, PoppinsFontSizes } from '@theme/fontSizes';
import { SearchTypes } from '@data/enums/searchEnums';
import { useTranslation } from 'react-i18next';

/**
 * Styled component for the SelectorContainer.
 */
const SelectorContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    background: Colors.main.lightGrey,
    marginBottom: '1rem',
    borderRadius: '0.4rem',
    border: `solid 0.05rem ${Colors.main.mediumGrey}`,
});

/**
 * Styled component for the UserSelectionButton.
 */
const UserTypeButton = styled(AppButton)({
    flex: 1,
    borderRadius: '0.4rem',
    padding: '0.5rem',
});

/**
 * Styled component for the SearchButton.
 */
const SearchButton = styled(AppButton)({
    width: '100%',
    padding: '1rem',
    borderRadius: '0.4rem',
});

/**
 * Component for the SelectionButton.
 * @param {Object} props - Component props.
 * @param {string} props.textValue - The text value displayed on the button.
 * @param {boolean} props.selected - Indicates if the button is selected.
 * @param {() => void} props.onClick - Click event handler for the button.
 */
const SelectionButton: React.FC<{ textValue: string; selected: boolean; onClick: () => void }> = ({ textValue, selected, onClick }) => {
    return (
        <UserTypeButton
            textColor={selected ? Colors.main.white : Colors.main.mediumGrey}
            backgroundColor={selected ? Colors.main.blue : Colors.main.lightGrey}
            onClick={onClick}
        >
            {textValue}
        </UserTypeButton>
    );
};

/**
 * Main Connect Section component with search functionality.
 */
const ConnectSection: React.FC = () => {
    const [userType, setUserType] = useState<UserTypes>(UserTypes.INFLUENCER);
    const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.NAME);
    const [name, setName] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const { t } = useTranslation();

    /**
     * Handles the change of user type.
     * @param {UserTypes} type - The selected user type.
     */
    const handleUserTypeChange = (type: UserTypes) => {
        setUserType(type);
    };

    /**
     * Handles the change of search type.
     * @param {SearchTypes} type - The selected search type.
     */
    const handleSearchTypeChange = (type: SearchTypes) => {
        setSearchType(type);
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
                            {t('main_page.connect')}
                        </Typography>
                        <Typography fontWeight={PoppinsFontSizes.BOLD} variant="h4" color={Colors.main.blue}>
                            {t('main_page.for_business')}
                        </Typography>
                        <Typography marginTop="2rem" marginBottom="2rem" variant="body1" color={Colors.main.darkBlue} sx={{ fontWeight: DidactGothicFontSizes.BOLD }}>
                            {userType === UserTypes.INFLUENCER ? t('main_page.influencer_look') : t('main_page.business_look')}
                        </Typography>
                        {/* User Type Selector Buttons */}
                        <SelectorContainer>
                            <SelectionButton textValue={t('influencer')} selected={userType === UserTypes.INFLUENCER} onClick={() => handleUserTypeChange(UserTypes.INFLUENCER)} />
                            <SelectionButton textValue={t('business')} selected={userType === UserTypes.BUSINESS} onClick={() => handleUserTypeChange(UserTypes.BUSINESS)} />
                        </SelectorContainer>

                        {/* User Type Selector Buttons */}
                        {userType === UserTypes.INFLUENCER && (
                            <SelectorContainer>
                                <SelectionButton textValue={t('name')} selected={searchType === SearchTypes.NAME} onClick={() => handleSearchTypeChange(SearchTypes.NAME)} />
                                <SelectionButton textValue={t('country')} selected={searchType === SearchTypes.COUNTRY} onClick={() => handleSearchTypeChange(SearchTypes.COUNTRY)} />
                            </SelectorContainer>
                        )}

                        {/* Additional fields based on user type */}
                        {userType === UserTypes.INFLUENCER && (
                            <>
                                {searchType === SearchTypes.NAME && (
                                    <AppTextField label={t('name')} variant="outlined" fullWidth value={name} onChange={handleNameChange} sx={{ mb: 2 }} />
                                )}
                                {searchType === SearchTypes.COUNTRY && (
                                    <AppTextField label={t('country')} variant="outlined" fullWidth value={country} onChange={handleCountryChange} sx={{ mb: 2 }} />
                                )}
                            </>
                        )}
                        {userType === UserTypes.BUSINESS && <AppTextField label={t('country')} variant="outlined" fullWidth value={country} onChange={handleCountryChange} sx={{ mb: 2 }} />}
                        {/* Button for user action */}
                        <SearchButton backgroundColor={Colors.main.black} textColor={Colors.main.white}>
                            {userType === UserTypes.BUSINESS
                                ? t('main_page.find_country')
                                : searchType === SearchTypes.NAME ? t('main_page.request_name') : t('main_page.request_country')}
                        </SearchButton>
                    </Box>
                </Grid>

                {/* Right column (visible only on medium and larger screens) */}
                <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'inherit' } }}>
                    <img src={InfluencerImage} alt="Influencer" style={{ width: '100%', height: '28.5rem', objectFit: 'contain' }} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConnectSection;
