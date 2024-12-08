import * as React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";

const CreditCardForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = React.useState<
    "credit_card" | "cash" | "none"
  >("none");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value as "credit_card" | "cash" | "none";

    // Reset the checkbox state if the payment method is toggled
    setAgreeTerms(false);

    // If the selected method is already the current one, reset it (deselect it)
    setPaymentMethod((prev) => (prev === value ? "none" : value));
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(event.target.checked);
  };

  return (
    <Box sx={{ maxWidth: 400, backgroundColor: "red" }}>
      {/* Accordion, Kredi Kartı Seçildiğinde Açılacak */}
      <Accordion
        expanded={paymentMethod === "credit_card"}
        sx={{ border: "1px solid #ccc", borderRadius: 1, background: "yellow" }}
      >
        <AccordionSummary
          aria-controls="credit-card-content"
          id="credit-card-header"
          sx={{
            borderBottom: "1px solid #ccc",
            background: "pink",
          }}
        >
          <FormControlLabel
            sx={{ background: "green" }}
            control={
              <Radio
                checked={paymentMethod === "credit_card"}
                onChange={handlePaymentMethodChange}
                value="credit_card"
                name="payment-method"
              />
            }
            label="Kredi Kartı ile Ödeme"
          />
        </AccordionSummary>
        <AccordionDetails sx={{ background: "purple" }}>
          <TextField
            fullWidth
            label="Kart Numarası"
            variant="outlined"
            sx={{
              backgroundColor: "cyan",
              borderColor: "#ccc", // Border color for TextField
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc", // Gray border
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Kart Üzerindeki İsim"
            variant="outlined"
            margin="normal"
            sx={{
              backgroundColor: "cyan",

              borderColor: "#ccc",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="Ay / Yıl"
            variant="outlined"
            margin="normal"
            sx={{
              backgroundColor: "cyan",

              borderColor: "#ccc",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
              },
            }}
          />
          <TextField
            fullWidth
            label="CVC"
            variant="outlined"
            margin="normal"
            sx={{
              backgroundColor: "cyan",

              borderColor: "#ccc",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ccc",
                },
              },
            }}
          />
        </AccordionDetails>
      </Accordion>

      {/* Kapıda Ödeme Seçenekleri */}
      <Box mt={2} sx={{ border: "3px solid #ccc", borderRadius: 1 }}>
        <FormControlLabel
          control={
            <Radio
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
              value="cash"
              name="payment-method"
            />
          }
          label="Kapıda Ödeme (Nakit)"
          sx={{
            width: "95%",
            padding: "10px",
          }}
        />
      </Box>
      <Box mt={2} sx={{ border: "3px solid #ccc" }}>
        <FormControlLabel
          control={
            <Radio
              checked={paymentMethod === "none"}
              onChange={handlePaymentMethodChange}
              value="none"
              name="payment-method"
            />
          }
          label="Kapıda Ödeme (Kredi)"
          sx={{
            borderRadius: 1,
            width: "95%",
            padding: "10px",
          }}
        />
      </Box>

      {/* Gizlilik Sözleşmesi Onayı */}
      <FormControlLabel
        control={<Checkbox checked={agreeTerms} onChange={handleTermsChange} />}
        label="Gizlilik Sözleşmesini ve Satış Sözleşmesini okudum, onaylıyorum."
      />

      {/* Ödeme Tamamlama Butonu */}
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          disabled={!agreeTerms || paymentMethod === "none"}
        >
          Ödemeyi Tamamla
        </Button>
      </Box>
    </Box>
  );
};

export default CreditCardForm;
