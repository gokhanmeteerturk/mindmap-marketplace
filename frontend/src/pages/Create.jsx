import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      description: '',
      nodes: '',
      edges: ''
    }
  });

  // Validate JSON string
  const isValidJSON = (str) => {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  };

  const onSubmit = async (data) => {
    try {
      setError('');
      setIsLoading(true);
      
      // Validate JSON fields before submission
      if (!isValidJSON(data.nodes)) {
        setError('Nodes field must contain valid JSON');
        return;
      }
      if (!isValidJSON(data.edges)) {
        setError('Edges field must contain valid JSON');
        return;
      }

      await axiosInstance.post('/mindmap/', data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create mindmap. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh'
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Create New Mindmap
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters'
              }
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Description"
            multiline
            rows={3}
            {...register('description', {
              required: 'Description is required'
            })}
            error={!!errors.description}
            helperText={errors.description?.message}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Nodes (JSON)"
            multiline
            rows={4}
            {...register('nodes', {
              required: 'Nodes are required',
              validate: {
                isValidJSON: value => isValidJSON(value) || 'Must be valid JSON'
              }
            })}
            error={!!errors.nodes}
            helperText={errors.nodes?.message || 'Enter nodes data as valid JSON'}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Edges (JSON)"
            multiline
            rows={4}
            {...register('edges', {
              required: 'Edges are required',
              validate: {
                isValidJSON: value => isValidJSON(value) || 'Must be valid JSON'
              }
            })}
            error={!!errors.edges}
            helperText={errors.edges?.message || 'Enter edges data as valid JSON'}
            disabled={isLoading}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Create Mindmap'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Create;