// Comment.tsx
import React from 'react';
import { Review } from '../../../types/Review';
import {CardContent, Card } from '@mui/material';
import {
    Box,
    Typography,
    Rating
} from '@mui/material';

interface CommentProps {
    review: Review;
}

const CommentComponent: React.FC<CommentProps> = ({ review }) => {
    return (
        <Card sx={{ borderRadius: '16px', backgroundColor: '#f5f5f5',textAlign:"start"}}>
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Box display="flex" alignItems="center">
                <Rating value={review.rating ?? 0} readOnly precision={0.5} size="small" />
              </Box>
              <Typography variant="body2" color="textSecondary">
                {new Date(review.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
            <Typography variant="h6" component="div">
              {review.description.split('\n')[0]}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {review.description.split('\n')[1]}
            </Typography>
          </CardContent>
        </Card>
    );
};

export default CommentComponent;