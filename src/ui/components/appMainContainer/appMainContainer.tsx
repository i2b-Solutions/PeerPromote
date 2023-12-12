import styled from "@emotion/styled";
import { Container } from "@mui/material";
import { ReactNode } from "react";

/**
 * Styled main container component with customized styling.
 *
 * @component
 * @example
 * // Example usage with child components
 * <AppMainContainer>
 *   <ChildComponent />
 * </AppMainContainer>
 *
 * @param {ReactNode} children - The child components to be rendered inside the container.
 */
const AppMainContainerStyle = styled(Container)({
    textAlign: 'center',
    padding: 0,
});

const AppMainContainer = ({ children }: { children: ReactNode }) => {
    return (
        <AppMainContainerStyle maxWidth='lg'>
            {children}
        </AppMainContainerStyle>
    );
};

export default AppMainContainer;
