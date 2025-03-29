import { Table, TableContainer } from '@mui/material';
import TableBody from './BodyTable';
import TableHeader from './TableHeader';
import { tableContainer } from './classes';

const TherapistTable = ({ therapists, loading }: {therapists: null | [], loading: boolean}) => (
  <TableContainer sx={tableContainer}>
    <Table sx={{ minHeight: '400px' }}>
      <TableHeader />
      <TableBody therapists={therapists} loading={loading} />
    </Table>
  </TableContainer>
);

export default TherapistTable;
