import { Table as TableMiu, TableContainer } from '@mui/material';

import Paper from '@mui/material/Paper';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}
const Table = ({ children }: Props) => (
  <TableContainer component={Paper}>
    <TableMiu sx={{ minWidth: 650 }} aria-label="simple table">
      {children}
    </TableMiu>
  </TableContainer>
);

export default Table;
