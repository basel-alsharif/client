import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

import { DateP } from '../table/types';

const DatePick = ({
  setDate, date,
}: DateP) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DatePicker']}>
      <DatePicker
        format="DD-MM-YYYY"
        sx={{ position: 'absolute', top: -54, right: '30px' }}
        onChange={(newValue) => {
          setDate(dayjs(newValue));
        }}
        value={date}
        label="Appointments Calender"
      />
    </DemoContainer>
  </LocalizationProvider>
);

export default DatePick;
