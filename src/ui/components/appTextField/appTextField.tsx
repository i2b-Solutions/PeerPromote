import styled from "@emotion/styled";
import { TextField, TextFieldProps } from "@mui/material";
import { Colors } from "@theme/colors";

/**
 * Styled TextField component with customized styling.
 *
 * @component
 * @example
 * // Example usage with additional TextField props
 * <AppTextField label="Username" variant="outlined" fullWidth />
 *
 * @param {TextFieldProps} props - Additional TextField props.
 */
const AppTextField = styled(TextField)<TextFieldProps>({
    background: Colors.main.lightGrey,
    color: Colors.main.mediumGrey
});

export default AppTextField;