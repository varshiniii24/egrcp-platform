import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Grid, TextField, Button, MenuItem } from '@mui/material';
import Modal from '../../components/common/Modal';

const schema = yup.object({
  title:      yup.string().required('Title is required').min(5, 'Min 5 characters'),
  category:   yup.string().required('Category is required'),
  severity:   yup.string().required('Severity is required'),
  likelihood: yup.string().required('Likelihood is required'),
  impact:     yup.string().required('Impact is required'),
  owner:      yup.string().required('Owner is required'),
});

const CATEGORIES  = ['Cybersecurity','Operational','Compliance','Financial','HR','Legal'];
const SEVERITIES  = ['critical','high','medium','low'];
const LIKELIHOODS = ['High','Medium','Low'];
const IMPACTS     = ['Critical','High','Medium','Low'];

export default function AddRiskModal({ open, onClose, onSubmit }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { title: '', category: '', severity: '', likelihood: '', impact: '', owner: '' },
  });

  useEffect(() => { if (!open) reset(); }, [open, reset]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Register New Risk"
      maxWidth="sm"
      actions={
        <>
          <Button onClick={onClose} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit((data) => { onSubmit(data); reset(); })} variant="contained" color="error">
            Register Risk
          </Button>
        </>
      }
    >
      <Grid container spacing={2} sx={{ pt: 1 }}>
        <Grid item xs={12}>
          <Controller name="title" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Risk Title" error={!!errors.title} helperText={errors.title?.message} />
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
          <Controller name="severity" control={control} render={({ field }) => (
            <TextField {...field} fullWidth select label="Severity" error={!!errors.severity} helperText={errors.severity?.message}>
              {SEVERITIES.map((s) => <MenuItem key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</MenuItem>)}
            </TextField>
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="likelihood" control={control} render={({ field }) => (
            <TextField {...field} fullWidth select label="Likelihood" error={!!errors.likelihood} helperText={errors.likelihood?.message}>
              {LIKELIHOODS.map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}
            </TextField>
          )} />
        </Grid>
        <Grid item xs={6}>
          <Controller name="impact" control={control} render={({ field }) => (
            <TextField {...field} fullWidth select label="Impact" error={!!errors.impact} helperText={errors.impact?.message}>
              {IMPACTS.map((i) => <MenuItem key={i} value={i}>{i}</MenuItem>)}
            </TextField>
          )} />
        </Grid>
        <Grid item xs={12}>
          <Controller name="owner" control={control} render={({ field }) => (
            <TextField {...field} fullWidth label="Risk Owner (Dept)" error={!!errors.owner} helperText={errors.owner?.message} />
          )} />
        </Grid>
      </Grid>
    </Modal>
  );
}