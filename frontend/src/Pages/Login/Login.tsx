import React, { useContext, useState } from 'react';
import { TextField, Button, Container, Grid, Link } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../../Context/MessageContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { push } = useContext(MessageContext);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password })
      .catch(err => {
        push(err.message, 'error');
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img src="/logo.png" alt="OnlyMemes Logo" style={{ width: '100%', margin: '1rem 0' }} />
        <form style={{ width: '100%', marginTop: '1rem' }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ margin: '3rem 0 2rem' }}
          >
            Log In
          </Button>
        </form>
        <Grid container justifyContent={'space-between'}>
          <Grid item>
            <Link onClick={() => alert('Not implemented yet :(')} style={{ cursor: 'pointer' }}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link style={{ cursor: 'pointer' }} onClick={() => navigate('/register')}>
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
