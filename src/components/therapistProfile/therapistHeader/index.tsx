import {
  Container, Box, Typography, Skeleton, Button,
  Grid,
} from '@mui/material';
import React, {
  useState, useEffect, useContext,
} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { SessionReservationModal, AppointmentsModal } from '../..';
import { BoxStyle, ButtonStyle, TypographyStyle } from './classes';
import { axiosInstance } from '../../../utils/apis';
import { BioEditor, ChangePhoto, EditableTextField } from '..';
import { TherapistData, Props } from './types';
import { userDataContext, ThemeContext } from '../../../context';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const TherapistHeader: React.FC<Props> = ({ isProfileOwner, setError }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [dataFromTherapist, setDataFromTherapist] = useState<TherapistData | null>(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const userContext = useContext(userDataContext);
  const userData = userContext?.userData;
  const themes = useContext(ThemeContext);

  const handleShowReservationModal = () => {
    if (!userData) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      setShowReservationModal(true);
    }
  };
  const [openAppointmentsModal, setOpenAppointmentsModal] = useState(false);
  const handleOpenAppointmentsModal = () => setOpenAppointmentsModal(true);
  const handleCloseAppointmentsModal = () => setOpenAppointmentsModal(false);
  const [hover, setHover] = useState(false);
  const [photoTimestamp, setPhotoTimestamp] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<TherapistData>(`therapists/${id}`);
        const { data } = response;
        setDataFromTherapist(data);
      } catch (err) {
        setError(true);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleChange = (key: string) => (value: string | number | object) => {
    setDataFromTherapist((prevData) => {
      if (prevData) {
        if (key === 'user.fullName' && value) {
          return {
            ...prevData,
            user: { ...prevData.user, fullName: value as string },
          };
        }
        return {
          ...prevData,
          [key]: value,
        };
      }
      return prevData;
    });
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (file) {
        setIsUploading(true);
        const uploadURL = await axiosInstance.get('therapists/profile_img');
        await axios.put(uploadURL.data.url, file, {
          headers: {
            'Content-Type': file.type,
          },
        });
        setPhotoTimestamp(Date.now());
        setIsUploading(false);
      }
    } catch (err) {
      const error = err as AxiosError;
      enqueueSnackbar(`Error uploading image: ${error.message}`, { variant: 'error' });
    }
  };

  return (
    <Container sx={{ mb: 6 }}>

      {dataFromTherapist ? (
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
          <Grid
            container
            sx={{
              backgroundColor: themes?.themeMode === 'dark' ? '#191A1B' : '',
              border: '2px solid #ddd',
              borderRadius: '8px',
              boxShadow: '1px 4px 6px rgba(0, 0, 0, 0.1)',
              padding: '16px',
              width: '100%',
              maxWidth: '100%',
            }}
          >

            {!isUploading
            && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ChangePhoto
                  isProfileOwner={isProfileOwner}
                  onChange={handleFileChange}
                  hover={hover}
                  setHover={setHover}
                  imgUrl={`${dataFromTherapist.profileImg}?timestamp=${photoTimestamp}`}
                />
              </Grid>
            )}
            {isUploading && (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                sx={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width="80%"
                  height="80%"
                  sx={{
                    borderRadius: '8px',
                  }}
                />
              </Grid>
            ) }
            <Grid item xs={12} sm={6} md={8}>
              <EditableTextField
                value={dataFromTherapist.user.fullName}
                dataType="fullName"
                onChange={handleChange('user.fullName')}
                isProfileOwner={isProfileOwner}
                themeMode={themes?.themeMode}
              />

              <EditableTextField
                value={dataFromTherapist.major}
                dataType="major"
                onChange={handleChange('major')}
                isProfileOwner={isProfileOwner}
                themeMode={themes?.themeMode}
              />

              <Box sx={{ ...BoxStyle, justifyContent: 'center', width: '100%' }}>
                <Typography sx={{
                  fontWeight: 'bold',
                  mb: 1,
                  fontSize: '18px',
                  color: themes?.themeMode === 'dark' ? '#eeee' : '#000',
                  minWidth: '135px',
                }}
                >
                  session price: $
                </Typography>
                <EditableTextField
                  value={dataFromTherapist.hourlyRate}
                  dataType="hourlyRate"
                  onChange={handleChange('hourlyRate')}
                  isProfileOwner={isProfileOwner}
                  themeMode={themes?.themeMode}
                />
              </Box>
              {isProfileOwner
                ? (
                  <Button
                    variant="contained"
                    style={ButtonStyle}
                    onClick={handleOpenAppointmentsModal}
                  >
                    Add Availability
                  </Button>
                )
                : (
                  <Button
                    variant="contained"
                    style={ButtonStyle}
                    onClick={handleShowReservationModal}

                  >
                    Reserve a Session
                  </Button>
                )}
              <SessionReservationModal
                open={showReservationModal}
                setOpen={setShowReservationModal}
                hourlyRate={dataFromTherapist.hourlyRate}
              />
              {openAppointmentsModal && (
              <AppointmentsModal
                handleClose={handleCloseAppointmentsModal}
                open={openAppointmentsModal}
                setOpenAppointmentsModal={setOpenAppointmentsModal}
              />
              )}
            </Grid>
            <Grid item xs={12} sx={{ width: '100%', maxWidth: '100%' }}>
              <Box
                component="div"
                sx={{
                  padding: '20px',
                  borderRadius: '8px',
                  width: '100%',
                  maxWidth: '100%',
                  display: 'flex',
                  ...(isProfileOwner ? { justifyContent: 'space-between' } : { justifyContent: 'start' }),
                  gap: '0.75rem',
                }}
              >
                <Typography
                  component="h1"
                  variant="h5"
                  sx={TypographyStyle}
                >
                  bio:
                </Typography>
                {
                  isProfileOwner ? (
                    <BioEditor
                      textBio={dataFromTherapist.bio}
                      handleChangeTextBio={handleChange('bio')}
                      themeMode={themes?.themeMode}
                    />
                  ) : (
                    <div
                      dangerouslySetInnerHTML={{ __html: dataFromTherapist.bio }}
                      style={{
                        marginTop: '50px',
                        color: themes?.themeMode === 'dark' ? '#eeee' : '#000',
                      }}
                    />
                  )
            }

              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <>
          <div style={{ display: 'flex' }}>
            <Skeleton variant="rectangular" width="30%" height={300} />
            <Skeleton variant="text" sx={{ ml: 4, width: '50%' }} />
          </div>
          <Skeleton variant="rectangular" width="90%" height={300} sx={{ mt: 5 }} />
        </>
      )}
    </Container>
  );
};

export default TherapistHeader;
