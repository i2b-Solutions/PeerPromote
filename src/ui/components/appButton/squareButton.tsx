import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { Colors } from "@theme/colors";
import React from "react";

type SquareButtonPalette = "secondary" | "default" | "custom";
type SquareButtonVariation = "fill" | "outline";
type SquareButtonCustomPalette = {
  mainColor?: string;
  secondaryColor?: string;
};

type AppSquareButtonProps = ButtonProps & {
  palette?: SquareButtonPalette;
  variation?: SquareButtonVariation;
  disabled?: boolean;
  customPalette?: SquareButtonCustomPalette;
  loading?: boolean;
  children: React.ReactNode;
};

const getStyle = (
  palette: SquareButtonPalette,
  variation: SquareButtonVariation,
  disabled: boolean,
  customPalette: SquareButtonCustomPalette
) => {
  if (disabled)
    return {
      backgroundColor: Colors.main.lightGrey,
      borderColor: Colors.main.lightGrey,
      border: "none",
      color: Colors.main.mediumGrey
    };

  if (palette === "secondary" && variation === "fill") {
    return {
      backgroundColor: Colors.main.purple,
      color: Colors.main.white,
      borderColor: Colors.main.purple,
      "&:hover": {
        opacity: "0.6",
        backgroundColor: Colors.main.purple
      }
    };
  }

  if (palette === "secondary" && variation === "outline") {
    return {
      color: Colors.main.purple,
      borderColor: Colors.main.purple,
      backgroundColor: "transparent",
      "&:hover": {
        opacity: "0.6",
        backgroundColor: "transparent"
      }
    };
  }

  if (palette === "custom" && variation === "fill") {
    return {
      backgroundColor: customPalette.mainColor || Colors.main.blue,
      borderColor: customPalette.mainColor || Colors.main.blue,
      "&:hover": {
        opacity: "0.6",
        backgroundColor: customPalette.mainColor || Colors.main.blue
      }
    };
  }

  return {};
};

const AppSquareButton: React.FC<AppSquareButtonProps> = ({
  palette = "secondary",
  variation = "fill",
  disabled = false,
  customPalette = {
    mainColor: Colors.main.blue,
    secondaryColor: Colors.main.purple
  },
  loading = false,
  children,
  sx,
  ...props
}) => {
  const isDisabled = disabled || loading;
  const customStyle = getStyle(palette, variation, isDisabled, customPalette);
  return (
    <Button
      disableRipple
      disabled={isDisabled}
      sx={{
        width: "100%",
        minHeight: "3.2rem",
        transition: "opacity 0.3s ease",
        border: "0.2rem solid",
        borderRadius: "0.4rem",
        ...customStyle,
        ...sx
      }}
      {...props}
    >
      {loading ? (
        <CircularProgress size={24} sx={{ color: customStyle.color }} />
      ) : (
        children
      )}
    </Button>
  );
};

export default AppSquareButton;
