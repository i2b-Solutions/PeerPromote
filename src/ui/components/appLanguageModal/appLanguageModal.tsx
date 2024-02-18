import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  SelectChangeEvent,
  ListItemIcon,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useLanguageStore } from "@ui/stores/languageStore";
import { useTranslation } from "react-i18next";
import { SYSTEM_LANGUAGES } from "@domain/enums/domainEnums";
import { SUPPORTED_LANGUAGES } from "@domain/constants/domainConstants";
import { LanguageController } from "@domain/controllers/languageController/languageController";

const AppLanguageModal = () => {
  const { t } = useTranslation();
  const languageStore = useLanguageStore();

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    languageStore.setLanguage(event.target.value as SYSTEM_LANGUAGES);
  };

  const handleContinue = () => {
    LanguageController.setStoredLanguage(languageStore.language);
    languageStore.setOpenLanguageModal(false);
  };

  return (
    <Dialog
      open={languageStore.openLanguageModal}
      fullWidth
      maxWidth="xs"
      sx={{ backdropFilter: "blur(5px)" }}
    >
      <DialogTitle>
        {languageStore.userTrigger
          ? t("language")
          : t("language_modal.continue_in")}
      </DialogTitle>
      <DialogContent>
        <Select
          sx={{
            "& .MuiSelect-select": { display: "flex", alignItems: "center" },
          }}
          value={languageStore.language}
          onChange={handleLanguageChange}
          fullWidth
        >
          {SUPPORTED_LANGUAGES.map((language) => {
            return (
              <MenuItem value={language.id} key={language.id}>
                <ListItemIcon>
                  <LanguageIcon />
                </ListItemIcon>
                {language.name}
              </MenuItem>
            );
          })}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button
          sx={{ textTransform: "none" }}
          onClick={handleContinue}
          color="primary"
        >
          {t("continue")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppLanguageModal;
