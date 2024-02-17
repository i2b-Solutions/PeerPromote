import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { Colors } from "@theme/colors"

type SquareButtonPalette = 'secondary' | 'default';
type SquareButtonVariation = 'fill' | 'outline';

type AppSquareButtonProps = {
    palette?: SquareButtonPalette,
    variation?: SquareButtonVariation,
    disabled?: boolean
}

const getStyle = (palette: SquareButtonPalette, variation: SquareButtonVariation, disabled: boolean) => {

    if (disabled) return {
        backgroundColor: Colors.main.lightGrey,
        borderColor: Colors.main.lightGrey
    }

    if (palette === "secondary" && variation === "fill") {
        return {
            backgroundColor: Colors.main.purple,
            color: Colors.main.white,
            borderColor: Colors.main.purple,
            '&:hover': {
                opacity: '0.6',
                backgroundColor: Colors.main.purple
            },
        }
    }

    if (palette === 'secondary' && variation === 'outline') {
        return {
            borderRadius: '0.5rem',
            color: Colors.main.purple,
            borderColor: Colors.main.purple,
            backgroundColor: 'transparent',
            '&:hover': {
                opacity: '0.6',
                backgroundColor: 'transparent'
            },
        }
    }

    return {};
}

const AppSquareButton = styled(Button)(({ palette = 'secondary', variation = 'fill', disabled = false }: AppSquareButtonProps) => ({
    width: '100%',
    border: '0.2rem solid',
    transition: 'opacity 0.3s ease',
    ...getStyle(palette, variation, disabled)
}));

export default AppSquareButton;
