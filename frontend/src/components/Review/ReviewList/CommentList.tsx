import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { Review } from '../../../types/Review';
import CommentComponent from './Comment';

interface CommentListProps {
    comments: Review[];
}

const CommentList: React.FC<CommentListProps> = ({ comments = [] }) => {
    if (comments.length === 0) {
        return (
            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ my: 2 }}
            >
                Henüz yorum yapılmamış
            </Typography>
        );
    }
    console.log("yorumlar", comments);

    return (
        <Box sx={{ margin: '10px', padding: '24px' }}>
            <Grid  justifyContent="center" alignItems="center">
                {comments.map((comment) => (
                    <Grid item xs={12} sm={6} md={4} key={comment.id} >
                        <CommentComponent review={comment}   />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CommentList;
