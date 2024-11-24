/* eslint-disable @typescript-eslint/no-unused-vars */
// CommentForm.tsx
import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { 
  Box,
  TextField,
  Button,
  Rating,
  Modal,
} from '@mui/material';

interface CommentFormProps {
  onSubmit: (rating: number, description: string) => Promise<void>;
}

const CommentForm: React.FC<CommentFormProps> = ({onSubmit }) => {
    const [rating, setRating] = useState<number | null>(0);
    const [description, setDescription] = useState<string>('');
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      if (!rating) {
        setError('Lütfen bir puan seçin.');
        return;
      }
  
      if (description.trim().length < 10) {
        setError('Yorum en az 10 karakter olmalıdır.');
        return;
      }
  
      try {
        await onSubmit(rating, description);
        setRating(1); // Başarılı olursa sıfırlama
        setDescription('');
        setError('');
      } catch (err) {
        setError('Yorum gönderilirken bir hata oluştu.');
      }
    };

    if (rating === null) {
        setOpenModal(true);
        return;
      }
    return (
        <Box   component="form"
        onSubmit={handleSubmit}
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          maxWidth: "500px",
          mx: "auto",}} >
                <Rating
        name="rating"
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
        size="large"
        sx={{ mb: 2 }}
      /> 
      <TextField
        label="Yorumunuz"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        multiline
        rows={4}
        variant="outlined"
        sx={{
          marginBottom: "2px",
          backgroundColor: "#F7F7F7",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#E5E5E5" },
          },
        }}
      />
       <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#000", color: "#fff", marginTop: "25px" }}
        >
          Yorum Yap
        </Button>
        </Box>
        <Modal
        open={openModal}
        aria-labelledby="rating-modal-title"
        aria-describedby="rating-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="rating-modal-title" variant="h6" component="h2">
            Lütfen Puan Verin
          </Typography>
          <Typography id="rating-modal-description" sx={{ mt: 2 }}>
            Yorum yapabilmek için lütfen puan vermeyi unutmayın.
          </Typography>
          <Rating
            name="rating"
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            precision={0.5}
            size="large"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            sx={{ marginTop: "8px", textAlign: "end" }}
          >
            Kapat
          </Button>
        </Box>
      </Modal>
  </Box>

    );
}

  
export default  CommentForm;