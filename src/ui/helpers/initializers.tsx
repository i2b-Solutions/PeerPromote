import { useLanguageStore } from "@ui/stores/languageStore";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const InitializeLanguage = () => {
    const languageStore = useLanguageStore();
    const { i18n } = useTranslation();

    useEffect(() => {
        i18n.changeLanguage(languageStore.language);
    }, [])

    return null;
}

const InitializeServices = () => {
    return (
        <>
            <InitializeLanguage />
        </>
    )
}

export default InitializeServices;