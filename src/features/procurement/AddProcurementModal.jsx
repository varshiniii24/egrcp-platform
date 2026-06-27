import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box, TextField, Button, Grid, MenuItem,
} from '@mui/material';
import Modal from '../../components/common/Modal';

const schema = yup.object({
  title:    yup.string().required('Title is required').min(5, 'Min 5 characters'),
  vendor:   yup.string().required('Vendor is required'),
  amount:   yup.number().typeError('Must be a number').positive('Must be positive').required('Amount is required'),
  category: yup.string().required('Category is required'),
  date:     yup.string().required('Date is required'),
});

const CATEGORIES = ['Supplies','Technology','Facilities','Marketing','Legal','HR','Security'];

export default function AddProcurementModal({ open, onClose, onSubmit }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', vendor: '', amount: '', category: '', date: '' },
  });

  useEffect(() => { if (!open) reset(); }, [open, reset]);

  const onFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="New Purchase Order"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit(onFormSubmit)} variant="contained">Submit PO</Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <Controller name="title" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="PO Title" error={!!errors.title} helperText={errors.title?.message} />
          )} />
        </Grid>
        <Grid item xs={12}>
          <Controller name="vendor" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Vendor Name" error={!!errors.vendor} helperText={errors.vendor?.message} />
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="amount" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Amount (₹)" type="number" error={!!errors.amount} helperText={errors.amount?.message} />
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="category" control={control} render={({ field }) => (
            <TextField {...field} fullWidth select label="Category" error={!!errors.category} helperText={errors.category?.message}>
              {CATEGORIES.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
            </TextField>
          )} />
        </Grid>
        <Grid item xs={12}>
          <Controller name="date" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Date" type="date" InputLabelProps={{ shrink: true }} error={!!errors.date} helperText={errors.date?.message} />
          )} />
        </Grid>
      </Grid>
    </Modal>
  );
}