import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AddressSelection from "./AddressSelectionStep";
import CreditCardForm from "./CreditCardForm"; // Import CreditCardForm
import { Address } from "./../../types/Address";
import Divider from '@mui/material/Divider';

const steps = [
  {
    label: "Adres",
    description: "Teslimat Adresi",
  },
  {
    label: "Kargo",
    description: "Ücretsiz Kargo (16:00 öncesi siparişler aynı gün kargolanır).",
  },
  {
    label: "Ödeme",
    description: "Siparişinizi kontrol edin ve onaylayın.",
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);

  const handleNext = (address?: Address) => {
    if (activeStep === 0 && address) {
      setSelectedAddress(address);
      setActiveStep(2);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedAddress(null);
  };

  return (
    <Box sx={{ maxWidth: 400, overflowY: "auto" }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          "& .MuiStep-root": {
            "& .MuiStepContent-root": {
              marginTop: 2,
              borderLeft: "none", // Remove the vertical line
            },
          },
          "& .MuiStepConnector-lineVertical": {
            display: "none", // Hide vertical line
          },
          "& .MuiStepConnector-line": {
            height: 2, // Make the line horizontal
          },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label} sx={{ marginTop: "10px" }}>
            <StepLabel>
              <Typography variant="h6">{step.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </StepLabel>
            <StepContent>
              {index === 0 ? (
                <AddressSelection
                  onAddressSelect={(address) => handleNext(address)}
                />
              ) : index === 1 ? (
                <Typography>{step.description}</Typography>
              ) : (
                <CreditCardForm />
              )}
            </StepContent>
            {index < steps.length - 1 && <Divider />}
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Tüm adımlar tamamlandı - İşlemi bitirdiniz.</Typography>
          {selectedAddress && (
            <Typography sx={{ mt: 2 }}>
              Seçilen Adres:{" "}
              {selectedAddress.address_line1 || "Bilinmeyen Adres"}
            </Typography>
          )}
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Sıfırla
          </Button>
        </Paper>
      )}
    </Box>
  );
}
