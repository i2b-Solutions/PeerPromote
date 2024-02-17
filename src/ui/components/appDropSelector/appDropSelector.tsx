import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { Colors } from "@theme/colors";

const AppDropSelector = styled(TextField)({
    background: Colors.main.lightGrey,
    width: "100%",
    '& .MuiSelect-select': { display: 'flex', alignItems: 'center' },
    "& .MuiFormHelperText-root": {
        margin: 0,
        backgroundColor: Colors.main.white,
        paddingTop: '0.25rem',
        paddingLeft: '0.3rem',
        paddingRight: '0.3rem'
    }
});

export default AppDropSelector;