import {
  Container, Typography, Grid, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { online, online2, group } from '../../assets';
import { userDataContext, ThemeContext } from '../../context';

const OnlineMedical = () => {
  const userContext = useContext(userDataContext);
  const themes = useContext(ThemeContext);

  return (
    <>
      <Container>
        <Grid container spacing={2} mt={5} >
          <Grid item xs={12} md={6} sx={{ mt: 5 }}>
            <img
              src={online}
              alt="online"
              style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', height: '100%', width: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12} md={5} sx={{ mt: 5, ml: 5 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
              DISCOVER YOUR SELF
            </Typography>
            <Typography sx={{
              mb: 4, mt: 3, color: '#90AAB9', fontSize: 15,
            }}
            >
              Join Us to get goodd with the tops and support you need to
              manage your memory health and lead a health
            </Typography>
            {!userContext?.userData
              && (
              <Link to="/signup" style={{ textDecoration: 'none', color: 'red' }}>
                <Button variant="contained" sx={{ borderColor: 'primary.main' }}>

                  SIGN UP

                </Button>
              </Link>
              )}

          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12} md={5} sx={{ mt: 5, ml: 5 }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
              BE ONE OF THE TEAM
            </Typography>
            <Typography sx={{
              mb: 4, mt: 3, color: '#90AAB9', fontSize: 15,
            }}
            >
              Join us and informality, Improving Communication,
              Enhanceed Collaboration, and it can also help to Reduce Costs,
              and Improve Client Service.
            </Typography>
            {!userContext?.userData && (
            <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
              <Button variant="contained" sx={{ borderColor: 'primary.main' }}>

                JOIN US

              </Button>
            </Link>
            )}

          </Grid>
          <Grid item xs={12} md={6} sx={{ mt: 5 }}>
            <img
              src={online2}
              alt="online"
              style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'cover', height: '100%', width: '100%',
              }}
            />
          </Grid>
        </Grid>
      </Container>
      <Container sx={{
        backgroundColor: themes?.themeMode === 'dark' ? '#181A1B' : '#F4F7FF',
        '@media (max-width: 600px)': {
          textAlign: 'center',
        },
      }}
      >
        <Grid container spacing={2} mt={5} sx={{ alignItems: 'center' }}>
          <Grid item xs={12} sm={6}>
            <img
              src={group}
              alt="group"
              style={{
                maxWidth: '100%', maxHeight: '100%', objectFit: 'cover',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} sx={{ p: '1rem' }}>
            <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', pb: '0.5rem' }}>
              Come on
              <br />
              book your appointment
            </Typography>
            <Button variant="contained" sx={{ borderColor: 'primary.main' }}>
              <Link to="/therapists" style={{ textDecoration: 'none', color: 'white' }}>
                Discover our therapists
              </Link>
            </Button>
          </Grid>

        </Grid>
      </Container>
    </>
  );
};

export default OnlineMedical;
