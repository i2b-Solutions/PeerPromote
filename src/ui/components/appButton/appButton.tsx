import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Colors } from "@theme/colors";
import { PoppinsFontSizes } from "@theme/fontSizes";

/**
 * Styled button component with customizable styling.
 *
 * @component
 * @example
 * // Example usage with custom background and text color
 * <AppButton backgroundColor="#FF5733" textColor="#FFFFFF">
 *   Click me
 * </AppButton>
 *
 * @param {string} [backgroundColor] - Background color of the button.
 * @param {string} [textColor] - Text color of the button.
 * @param {boolean} [underLight] - Indicates whether the button should have underline.
 * @param {boolean} [borderLight] - Indicates whether the button border should be solid.
 * @param {boolean} [round] - Indicates whether the button should have rounded corners (chip).
 */
const AppButton = styled(Button)<{
    backgroundColor?: string;
    textColor?: string;
    underLight?: boolean;
    borderLight?: boolean;
    round?: boolean;
}>(
    ({ backgroundColor, textColor, underLight, borderLight, round }) => ({
        background: backgroundColor || Colors.main.white,
        color: textColor || Colors.main.black,
        fontWeight: PoppinsFontSizes.REGULAR,
        textTransform: "none",
        paddingLeft: '1rem',
        borderRadius: round ? '20rem' : '0',
        paddingRight: '1rem',
        transition: "opacity 0.3s ease",
        border: borderLight ? `0.1rem solid ${Colors.main.blue}` : 'none',
        borderBottom: underLight || borderLight ? `0.1rem solid ${Colors.main.blue}` : 'none',
        "&:hover": {
            opacity: 0.7,
            background: backgroundColor || Colors.main.white
        },
    })
);

export default AppButton;
