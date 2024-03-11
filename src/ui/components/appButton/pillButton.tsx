import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontWeights } from "@theme/fontWeights";

type ButtonPalette = "primary" | "secondary";
type ButtonVariation = "fill" | "clear" | "outline";

type AppPillButtonProps = {
  palette?: ButtonPalette;
  variation?: ButtonVariation;
  disabled?: boolean;
};

const getStyle = (
  palette: ButtonPalette,
  variation: ButtonVariation,
  disabled: boolean
) => {
  if (disabled)
    return {
      backgroundColor: Colors.main.lightGrey,
      borderColor: Colors.main.lightGrey
    };

  if (palette === "primary" && variation === "fill") {
    return {
      backgroundColor: Colors.main.blue,
      color: Colors.main.white,
      // borderColor: Colors.main.blue,
      "&:hover": {
        opacity: "0.6",
        backgroundColor: Colors.main.blue
      }
    };
  }

  if (palette === "primary" && variation === "clear") {
    return {
      backgroundColor: Colors.main.white,
      color: Colors.main.darkBlue,
      "&:hover": {
        backgroundColor: Colors.main.lightGrey
      }
    };
  }

  return {};
};

const AppPillButton = styled(Button)<AppPillButtonProps>(
  ({ palette = "primary", variation = "fill", disabled = false }) => ({
    transition: "opacity 0.3s ease",
    borderRadius: "2rem",
    fontWeight: PoppinsFontWeights.REGULAR,
    textTransform: "none",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    ...getStyle(palette, variation, disabled)
  })
);

export default AppPillButton;
