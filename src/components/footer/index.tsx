import {
  Box, Link, Typography, useMediaQuery, Theme,
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import {
  BoxContainer,
  BoxContainerFooter,
  TypographyBody1,
  TypographyH3,
  BoxCopy,
  TypographyBody2,
} from './classes';
import Logo from '../logo';

const Footer = () => {
  const isSmallScreen = useMediaQuery((theme:Theme) => theme.breakpoints.down('sm'));

  return (
    <footer>
      <Box sx={BoxContainer}>
        <Box sx={BoxContainerFooter} flexDirection={isSmallScreen ? 'column' : 'row'}>
          <Box sx={{ flexBasis: '50%' }}>
            <Box sx={{ textAlign: 'center' }}>
              <Logo />
            </Box>
            <Typography variant="body1" sx={{ ...TypographyBody1, px: '0.5rem' }}>
              We&apos;re committed to delivering life-changing anxiety
              and depression care to everyone who needs it.
            </Typography>
          </Box>
          <Box sx={{ flexBasis: '50%' }}>
            <Box sx={{ mt: isSmallScreen ? 3 : 0 }}>
              <Typography variant="h3" sx={TypographyH3}>
                CONTACT US
              </Typography>
            </Box>
            <Typography variant="body1" sx={TypographyBody2}>
              <Link href="https://mail.google.com" sx={{ color: '#fff' }}>
                ntherapypro@gmail.com
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '22px' }}>
              <Link
                href="/"
                sx={{
                  marginRight: '8px',
                }}
              >
                <Facebook fontSize="small" sx={{ color: '#fff' }} />
              </Link>
              <Link href="/" sx={{ marginRight: '8px' }}>
                <Twitter fontSize="small" sx={{ color: '#fff' }} />
              </Link>
              <Link href="/">
                <Instagram fontSize="small" sx={{ color: '#fff' }} />
              </Link>
            </Box>
            <Typography variant="body1" sx={TypographyBody2}>
              <RouterLink to="/bug-report">
                Report a bug
              </RouterLink>
            </Typography>

          </Box>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: '#5885ff', padding: '15px 0' }}>
        <Box sx={BoxCopy}>
          <Typography
            variant="body1"
            sx={{
              color: '#fff',
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            &copy;
            {new Date().getFullYear()}
            . All rights reserved.
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
