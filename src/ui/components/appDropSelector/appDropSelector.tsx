import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Colors } from "@theme/colors";

const AppDropSelector = styled(TextField)({
    background: Colors.main.lightGrey,
    width: "100%",
    '& .MuiSelect-select': { display: 'flex', alignItems: 'center' }
});

export default AppDropSelector;