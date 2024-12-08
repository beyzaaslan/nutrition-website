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
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Checkmark icon

const CreditCardForm: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = React.useState<"credit_card" | "cash" | "none">("none");
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as "credit_card" | "cash" | "none";
    setAgreeTerms(false);
    setPaymentMethod((prev) => (prev === value ? "none" : value));
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgreeTerms(event.target.checked);
  };

  return (
    <Box sx={{ maxWidth: 400, borderRadius: "4px" }}>
      {/* Accordion, Kredi Kartı Seçildiğinde Açılacak */}
      <Accordion
        expanded={paymentMethod === "credit_card"}
        sx={{
          border: paymentMethod === "credit_card" ? "2px solid blue" : "2px solid #ccc",
          background: paymentMethod === "credit_card" ? "#f7f7f9" : "#fff",
        }}
      >
        <AccordionSummary
          aria-controls="credit-card-content"
          id="credit-card-header"
          onChange={handlePaymentMethodChange}
        >
          <FormControlLabel
            control={
              <Radio
                checked={paymentMethod === "credit_card"}
                value="credit_card"
                name="payment-method"
                icon={<CheckCircleIcon />}  // Custom icon when not selected
                checkedIcon={<CheckCircleIcon sx={{ color: "blue" }} />}  // Icon when selected (blue color)
              />
            }
            label="Kredi Kartı"
          />
        </AccordionSummary>
        <AccordionDetails sx={{ background: "#f7f7f9" }}>
          <TextField
            fullWidth
            placeholder="Kart Numarası"
            variant="outlined"
            sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
              },
            }}
          />
          <TextField
            fullWidth
            placeholder="Kart Üzerindeki İsim"
            variant="outlined"
            margin="normal"
            sx={{
              backgroundColor: "#fff",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#ccc" },
              },
            }}
          />

          {/* Ay/Yıl ve CVC Yan Yana */}
          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <TextField
              fullWidth
              placeholder="Ay / Yıl"
              variant="outlined"
              margin="normal"
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                },
              }}
            />
            <TextField
              fullWidth
              placeholder="CVC"
              variant="outlined"
              margin="normal"
              sx={{
                backgroundColor: "#fff",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#ccc" },
                },
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Kapıda Ödeme (Nakit) */}
      <Box
        mt={2}
        sx={{
          border: paymentMethod === "cash" ? "3px solid blue" : "3px solid #ccc",
          background: paymentMethod === "cash" ? "#f7f7f9" : "#fff",
          borderRadius: 1,
        }}
      >
        <FormControlLabel
          control={
            <Radio
              checked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
              value="cash"
              name="payment-method"
              icon={<CheckCircleIcon />}  // Custom icon when not selected
              checkedIcon={<CheckCircleIcon sx={{ color: "blue" }} />}  // Icon when selected (blue color)
            />
          }
          label="Kapıda Ödeme (Nakit)"
          sx={{
            width: "95%",
            padding: "10px",
          }}
        />
      </Box>

      {/* Kapıda Ödeme (Kredi) */}
      <Box
        mt={2}
        sx={{
          border: paymentMethod === "none" ? "3px solid blue" : "3px solid #ccc",
          background: paymentMethod === "none" ? "#f7f7f9" : "#fff",
          borderRadius: 1,
        }}
      >
        <FormControlLabel
          control={
            <Radio
              checked={paymentMethod === "none"}
              onChange={handlePaymentMethodChange}
              value="none"
              name="payment-method"
              icon={<CheckCircleIcon />}  // Custom icon when not selected
              checkedIcon={<CheckCircleIcon sx={{ color: "blue" }} />}  // Icon when selected (blue color)
            />
          }
          label="Kapıda Ödeme (Kredi)"
          sx={{
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