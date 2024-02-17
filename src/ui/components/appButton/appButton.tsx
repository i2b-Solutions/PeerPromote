import React from 'react';
import { Button, ButtonProps } from "@mui/material";
import { Colors } from "@theme/colors";
import { SxProps } from '@mui/system';
import { Theme } from '@mui/material/styles';
import { PoppinsFontWeights } from '@theme/fontWeights';

interface AppButtonProps extends ButtonProps {
    underlight?: boolean;
    backgroundColor?: string;
    sx?: SxProps<Theme> | undefined;
}

const AppButton: React.FC<AppButtonProps> = ({ children, underlight, backgroundColor, sx, ...props }) => {
    const defaultStyles: SxProps<Theme> = {
        borderRadius: 0,
        backgroundColor: backgroundColor || Colors.main.white,
        fontWeight: PoppinsFontWeights.REGULAR,
        textTransform: "none",
        padding: '0 1rem',
        transition: "opacity 0.3s ease",
        borderBottom: underlight ? `0.1rem solid ${Colors.main.blue}` : 'none',
        '&:hover': {
            backgroundColor: backgroundColor || Colors.main.white,
            opacity: '0.7'
        }
    };

    return (
        <Button sx={{ ...defaultStyles, ...sx }} {...props}>
            {children}
        </Button>
    );
};

export default AppButton;
