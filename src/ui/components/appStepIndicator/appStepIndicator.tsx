import React from "react";
import { Box, Step, StepLabel, Stepper } from "@mui/material";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
}

const AppStepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={currentStep - 1} alternativeLabel>
        {Array.from({ length: totalSteps }, (_, index) => (
          <Step key={index}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default AppStepIndicator;
