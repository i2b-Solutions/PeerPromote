import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, SelectChangeEvent, ListItemIcon } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguageStore } from '@ui/stores/languageStore';
import { useTranslation } from 'react-i18next';
import { setStoredLanguage } from '@domain/controllers/languageController/languageController';
import { SYSTEM_LANGUAGES } from '@domain/enums/domainEnums';

const supportedLanguages = [
    { name: 'English', id: SYSTEM_LANGUAGES.EN },
    { name: 'Español', id: SYSTEM_LANGUAGES.ES },
]

const AppLanguageModal = () => {
    const { t, i18n } = useTranslation();
    const languageStore = useLanguageStore();

    const handleLanguageChange = (event: SelectChangeEvent<string>) => {
        i18n.changeLanguage(event.target.value)
        languageStore.setLanguage(event.target.value as SYSTEM_LANGUAGES);
    };

    const handleContinue = () => {
        setStoredLanguage(languageStore.language);
        languageStore.setOpenLanguageModal(false);
    };

    return (
        <Dialog open={languageStore.openLanguageModal} fullWidth maxWidth="xs" sx={{ backdropFilter: 'blur(5px)' }}>
            <DialogTitle>{languageStore.userTrigger ? t('language') : t('language_modal.continue_in')}</DialogTitle>
            <DialogContent>
                <Select sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center' } }}
                    value={languageStore.language} onChange={handleLanguageChange} fullWidth>
                    {supportedLanguages.map((language) => {
                        return (
                            <MenuItem value={language.id} key={language.id}>
                                <ListItemIcon>
                                    <LanguageIcon />
                                </ListItemIcon>{language.name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </DialogContent>
            <DialogActions>
                <Button sx={{ textTransform: 'none' }} onClick={handleContinue} color="primary">
                    {t('continue')}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AppLanguageModal;