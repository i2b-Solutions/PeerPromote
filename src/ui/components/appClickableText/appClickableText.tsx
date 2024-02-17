import React from 'react';
import Typography from '@mui/material/Typography';
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from '@theme/fontWeights';

// Define the properties for the AppClickableText component
interface AppClickableTextProps {
    text: string;
    onClick: () => void;
}

// AppClickableText 
const AppClickableText: React.FC<AppClickableTextProps> = ({ text, onClick }) => {
    return (
        <Typography
            variant="body2"
            fontWeight={PoppinsFontWeights.MEDIUM}
            color={Colors.main.blue}
            component="a"
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            {text}
        </Typography>
    );
}

export default AppClickableText;
