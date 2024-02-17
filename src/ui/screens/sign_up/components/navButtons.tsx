import AppSquareButton from "@components/appButton/squareButton";
import { Grid, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

type NavButtonProps = {
    onNext: () => void,
    onBack: () => void,
    disabled?: boolean,
    loading?: boolean;
    nextValue?: string;
}

const SignUpNavButtons = ({ onNext, onBack, disabled = false, loading = false, nextValue = 'next' }: NavButtonProps) => {
    const { t } = useTranslation();
    return (
        <Grid container spacing={2} mt={'0.1rem'}>
            <Grid item xs={12} md={6}>
                <AppSquareButton onClick={onBack} variation="outline">
                    {t('previous')}
                </AppSquareButton>
            </Grid>

            <Grid item xs={12} md={6}>
                <AppSquareButton
                    onClick={onNext}
                    variation="fill"
                    disabled={disabled || loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        t(nextValue)
                    )}
                </AppSquareButton>
            </Grid>
        </Grid>
    )
}

export default SignUpNavButtons;
