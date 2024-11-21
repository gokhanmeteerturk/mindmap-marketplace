import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import MindmapPreview from '../components/MindmapPreview';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [mindmaps, setMindmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMindmaps = async () => {
      try {
        const response = await axiosInstance.get('/mindmap/');
        setMindmaps(response.data);
      } catch (err) {
        setError('Failed to fetch mindmaps. Please try again later.');
        console.error('Error fetching mindmaps:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMindmaps();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ m: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Typography variant="h4" gutterBottom component="h1" sx={{ mb: 4 }}>
        Available Mindmaps
      </Typography>

      {mindmaps.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          No mindmaps available yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {mindmaps.map((mindmap) => (
            <Grid item xs={12} sm={12} md={12} lg={6} xl={4} key={mindmap.name}>
<Card 
  elevation={3}
  sx={{
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      boxShadow: 6
    }
  }}
>
  <CardContent sx={{ flexGrow: 1 }}>
    <Typography variant="h6" component="h2" gutterBottom>
      {mindmap.name}
    </Typography>
    
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <AccountCircle sx={{ mr: 1, fontSize: '0.9rem', color: 'text.secondary' }} />
      <Typography variant="body2" color="text.secondary">
        {mindmap.author}
      </Typography>
    </Box>

    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
      Published: {formatDate(mindmap.added_date)}
    </Typography>

    {/* Add the preview here */}
    <Box sx={{ mb: 2 }}>
      <MindmapPreview nodes={mindmap.nodes} edges={mindmap.edges} />
    </Box>

    <Typography variant="body2" sx={{ mb: 2 }}>
      {mindmap.description.length > 150
        ? `${mindmap.description.substring(0, 150)}...`
        : mindmap.description}
    </Typography>

    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      <Chip 
        label={`${JSON.parse(mindmap.nodes || "[]").length} nodes`}
        size="small"
        color="primary"
        variant="outlined"
      />
    </Box>
  </CardContent>
  
  <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Typography variant="body1" sx={{ mt: 0, fontWeight: 'bold', color: '#52abff' }}>
    {mindmap.price_gbp} GBP
  </Typography>
<Button 
  size="medium" 
  variant="contained"
  onClick={() => {
    addToCart(mindmap);
    // Optional: Add a success notification here
  }}
>
  ADD TO CART
</Button>
</CardActions>

</Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Home;