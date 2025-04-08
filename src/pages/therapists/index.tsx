import {
  useState, useEffect, ChangeEvent, useContext,
} from 'react';
import {
  Container, InputBase, Box, Grid,
  Pagination, InputLabel,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { TherapistList } from '../../components';
import { axiosInstance } from '../../utils/apis';
import { SearchBoxStyle, SelectInputStyle } from './classes';
import { ThemeContext } from '../../context';

const TherapistPage = () => {
  const [therapists, setTherapists] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      const getTherapistData = async () => {
        try {
          setLoading(true);
          const response = await axiosInstance.get('/therapists', {
            params: {
              q: searchQuery,
              page: currentPage,
              minPrice,
              maxPrice,
            },
          });
          setTherapists(response.data.rows);
          setTotalPages(response.data.pagination.totalPages);
          setLoading(false);
        } catch (error) {
          if (error instanceof AxiosError) {
            enqueueSnackbar(error.message, { variant: 'error' });
            setLoading(false);
          } else {
            const { message } = error as AxiosError;
            enqueueSnackbar(message, { variant: 'error' });
            setLoading(false);
          }
        }
      };
      getTherapistData();
    },
    [currentPage, maxPrice, minPrice, searchQuery],
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    if (page === currentPage) return;
    setTherapists([]);
    setCurrentPage(page);
  };
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
    setCurrentPage(1);
  };
  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
    setCurrentPage(1);
  };
  const themes = useContext(ThemeContext);

  return (
    <div style={{ backgroundColor: themes?.themeMode === 'dark' ? '#181A1B' : '' }}>
      <Box sx={{ flexGrow: 1 }}>
        <Container>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pt: 4,
            }}
          >

            <Box sx={{ width: '100%', maxWidth: '700px' }}>
              <InputBase
                placeholder="Search By Name..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearch}
                style={SearchBoxStyle}
                sx={{
                  '& .MuiInputBase-input': {
                    fontSize: '1rem',
                    color: themes?.themeMode === 'dark' ? 'black' : 'inherit',
                    padding: '10px 12px',
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: '#999',
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <Box sx={{ width: '100%', maxWidth: '700px' }}>
              <InputLabel id="price-filter-label" sx={{ mr: 2, mb: '10px' }}> Filter Price :</InputLabel>
              <Box display="flex" sx={{ gap: '0.5rem' }}>

                <InputBase
                  placeholder="Enter min"
                  inputProps={{ 'aria-label': 'price-filter' }}
                  value={minPrice}
                  style={SelectInputStyle}
                  onChange={handleMinPriceChange}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      color: themes?.themeMode === 'dark' ? 'black' : 'inherit',
                      padding: '10px 12px',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#999',
                      opacity: 1,
                    },
                  }}
                />

                <InputBase
                  placeholder=" Enter max"
                  inputProps={{ 'aria-label': 'price-filter' }}
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  style={SelectInputStyle}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '1rem',
                      color: themes?.themeMode === 'dark' ? 'black' : 'inherit',
                      padding: '10px 12px',
                    },
                    '& .MuiInputBase-input::placeholder': {
                      color: '#999',
                      opacity: 1,
                    },
                  }}
                />
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
      <Container sx={{ pb: 4 }}>
        <TherapistList therapists={therapists} loading={loading} />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            disabled={totalPages === 1}
          />
        </Box>
      </Container>
    </div>
  );
};

export default TherapistPage;
