import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import AuthClient from '../../Api/Auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  inviteToken: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
    inviteToken: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    AuthClient.register({
      displayName: formData.displayName,
      email: formData.email,
      password: formData.password,
      inviteToken: formData.inviteToken
    }).then(() => {
      // @TODO: Handle notification and error
      return navigate('/login');
    });
  };

  return (
    <Container component="main" maxWidth="xs" style={{ marginTop: '4rem' }}>
      <Typography component="h1" variant="h5">
        Create your account
      </Typography>
      <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="displayName"
          label="DIsplay Name"
          name="displayName"
          autoComplete="displayName"
          autoFocus
          value={formData.displayName}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="inviteToken"
          label="Invite Token"
          type="text"
          id="inviteToken"
          autoComplete="inviteToken"
          value={formData.inviteToken}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '2rem 0 2rem' }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
