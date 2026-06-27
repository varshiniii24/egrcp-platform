import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import Modal from '../../components/common/Modal';

const schema = yup.object({
  name:     yup.string().required('Vendor name is required').min(3, 'Min 3 characters'),
  category: yup.string().required('Category is required'),
  country:  yup.string().required('Country is required'),
  contact:  yup.string().email('Must be valid email').required('Contact email is required'),
  rating:   yup.number().typeError('Must be a number').min(1).max(5).required('Rating is required'),
});

const CATEGORIES = ['Technology','Supplies','Facilities','Marketing','Legal','HR','Security'];

export default function AddVendorModal({ open, onClose, onSubmit }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: '', category: '', country: '', contact: '', rating: '' },
  });

  useEffect(() => { if (!open) reset(); }, [open, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Vendor"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit((data) => { onSubmit(data); reset(); })} variant="contained">
            Add Vendor
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <Controller name="name" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Vendor Name" error={!!errors.name} helperText={errors.name?.message} />
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="category" control={control} render={({ field }) => (
            <TextField {...field} fullWidth select label="Category" error={!!errors.category} helperText={errors.category?.message}>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="country" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Country" error={!!errors.country} helperText={errors.country?.message} />
          )} />
        </Grid>
        <Grid item xs={8}>
          <Controller name="contact" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Contact Email" error={!!errors.contact} helperText={errors.contact?.message} />
          )} />
        </Grid>
        <Grid item xs={4}>
          <Controller name="rating" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Rating (1-5)" type="number" error={!!errors.rating} helperText={errors.rating?.message} />
          )} />
        </Grid>
      </Grid>
    </Modal>
  );
}