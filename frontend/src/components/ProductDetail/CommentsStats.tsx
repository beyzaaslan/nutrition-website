/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Grid } from "@mui/material";

const calculateReviewStats = (comments: any[]) => {
  const totalReviews = comments.length;
  const ratingCounts = [0, 0, 0, 0, 0]; // To store counts of 1-star to 5-star reviews

  comments.forEach((comment: { rating: number }) => {
    ratingCounts[comment.rating - 1] += 1; // Increment the respective rating count
  });

  const averageRating =
    comments.reduce(
      (sum: any, comment: { rating: any }) => sum + comment.rating,
      0
    ) / totalReviews;

  return {
    totalReviews,
    ratingCounts,
    averageRating: averageRating.toFixed(1),
  };
};

interface Comment {
  rating: number;
  // Add other properties of the comment if needed
}

interface ReviewStatsProps {
  comments: Comment[];
}

const ReviewStats = ({ comments }: ReviewStatsProps) => {
  const { totalReviews, ratingCounts, averageRating } =
    calculateReviewStats(comments);

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      sx={{ marginBottom: 4, maxWidth: "600px" }}
    >
      {/* Left: Main Rating */}
      <Grid item xs={4} textAlign="center">
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {averageRating}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#666",
            marginBottom: 1,
          }}
        >
          {totalReviews} Yoruma Göre
        </Typography>
      </Grid>

      {/* Right: Rating Breakdown */}
      <Grid item xs={8}>
        {ratingCounts.map((count, index) => (
          <Box
            key={5 - index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: 1,
            }}
          >
            {/* Star Rating */}
            <Typography
              variant="body2"
              sx={{ width: "10%", textAlign: "right", marginRight: 1 }}
            >
              {5 - index} ★
            </Typography>
            {/* Progress Bar */}
            <Box
              sx={{
                flexGrow: 1,
                height: "10px",
                backgroundColor: "#eee",
                borderRadius: "5px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  width: `${((count / totalReviews) * 100).toFixed(1)}%`,
                  height: "100%",
                  backgroundColor: "#007AFF",
                }}
              />
            </Box>
            {/* Count */}
            <Typography
              variant="body2"
              sx={{ width: "10%", marginLeft: 1, textAlign: "left" }}
            >
              ({count})
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );
};

export default ReviewStats;
