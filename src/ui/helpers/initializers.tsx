import { LanguageController } from "@domain/controllers/languageController/languageController";
import { useLanguageStore } from "@ui/stores/languageStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const InitializeLanguage = () => {
  const languageStore = useLanguageStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    const languageData = LanguageController.getAppLanguage();
    languageStore.setLanguage(languageData.language);
    languageStore.setOpenLanguageModal(languageData.openModal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    i18n.changeLanguage(languageStore.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languageStore.language]);

  return null;
};

const InitializeServices = () => {
  return (
    <>
      <InitializeLanguage />
    </>
  );
};

export default InitializeServices;
