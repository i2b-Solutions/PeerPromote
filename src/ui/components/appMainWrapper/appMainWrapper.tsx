import { MainMobileAppBar } from "@components/appBar/appBar";
import { MainRoutes } from "@ui/enums/routeEnums";
import { ReactNode } from "react";

/**
 * Main wrapper component for the application.
 */
const AppMainWrapper = ({ topBarPath, children }: { topBarPath?: MainRoutes, children: ReactNode }) => {
    return (
        <>
            {/* Mobile App Bar */}
            {topBarPath && <MainMobileAppBar currentPath={topBarPath} />}
            {/* Main Content */}
            {children}
            {/* Footer */}
        </>
    );
}

export default AppMainWrapper;
