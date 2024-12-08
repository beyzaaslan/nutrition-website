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

const steps = [
  {
    label: "Adres",
    description: "Adres seçimi yaparak bir adım ilerleyin.",
  },
  {
    label: "Kargo",
    description: "Ücretsiz Kargo (16:00 öncesi siparişler aynı gün kargolanır)",
  },
  {
    label: "Siparişi Onayla",
    description: "Siparişinizi kontrol edin ve onaylayın.",
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);

  const handleNext = (address?: Address) => {
    if (activeStep === 0 && address) {
      setSelectedAddress(address);
      // Adres seçildikten sonra Kargo adımını atla, doğrudan Siparişi Onayla adımına geç
      setActiveStep(2); // 3. adım, yani Siparişi Onayla
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleReset = () => {
    setActiveStep(0);
    setSelectedAddress(null);
  };

  return (
    <Box sx={{ maxWidth: 700 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              <Typography variant="body1" sx={{ mb: 2 }}>
                {step.description} {/* Show the description */}
              </Typography>
              {index === 0 ? (
                <AddressSelection
                  onAddressSelect={(address) => handleNext(address)} // Adres seçildiğinde otomatik geçiş
                />
              ) : index === 1 ? (
                <Typography>{step.description}</Typography> // Kargo bilgisi (Atlanacak)
              ) : (
                <CreditCardForm /> // 3. adımda kredi kartı formunu ekle
              )}
            </StepContent>
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
