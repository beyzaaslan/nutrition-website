import { Box, TextField, Button, Rating } from "@mui/material";
import { Review } from "../../types/Review";
import { Dispatch, SetStateAction } from "react";

const ReviewForm = ({
  onSubmit,
  loading,
  productId,
  onReset,
  rating,
  description,
  setRating,
  setDescription,
}: {
  onSubmit: (review: Omit<Review, "id" | "createdAt" | "updatedAt">) => void;
  loading: boolean;
  productId: number | null;
  onReset?: () => void;
  rating: number | null;
  description: string;
  setRating: Dispatch<SetStateAction<number | null>>;
  setDescription: Dispatch<SetStateAction<string>>;
}) => {
  const handleSubmit = () => {
    if (productId && rating !== null && description.trim()) {
      onSubmit({ productId: Number(productId), rating, description });
      if (onReset) {
        onReset();
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "40%",
        alignItems: "start",
      }}
    >
      <Rating
        value={rating}
        onChange={(_, newValue) => setRating(newValue)}
        precision={0.5}
        size="large"
      />
      <TextField
        placeholder="Yorumunuz"
        multiline
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        variant="outlined"
        fullWidth
        required
        sx={{
          marginBottom: "2px",
          backgroundColor: "#F7F7F7",
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#E5E5E5" },
          },
        }}
      />
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={loading || !productId || rating === null || !description.trim()}
        sx={{backgroundColor: "black", color: "white", fontWeight: "bold"}} 
      >
        Gönder
      </Button>
    </Box>
  );
};

export default ReviewForm;
