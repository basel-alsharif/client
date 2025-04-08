import {
  Container, Typography, Grid, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Worldimg } from '../../assets';

const World = () => (
  <Container>
    <Grid container spacing={2} mt={5} pb={10}>

      <Grid
        item
        xs={12}
        sm={6}
        sx={{
          mt: 5,
          '@media (max-width: 600px)': {
            textAlign: 'center',
          },
        }}
      >
        <Typography variant="h5" color="primary" sx={{ fontWeight: 'bold', mb: 2, mt: 3 }}>
          World-class providers.
          <br />
          Top-notch care.

        </Typography>
        <Typography sx={{
          mb: 4, mt: 3, color: '#90AAB9', fontSize: 15,
        }}
        >
          Connect with expert therapists & psychiatric providers
          <br />
          who put you first. Our nationwide network ensures you
          <br />
          receive the best of the best in mental health care.
        </Typography>
        <Button variant="contained" sx={{ borderColor: 'primary.main' }}>
          <Link to="/therapists" style={{ textDecoration: 'none', color: 'white' }}>
            Book an appointment
          </Link>
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} sx={{ mt: 5, display: 'flex', alignItems: 'center' }}>
        <img
          src={Worldimg}
          alt="Worldimg"
          style={{
            objectFit: 'cover', width: '100%',
          }}
        />
      </Grid>
    </Grid>
  </Container>
);

export default World;
