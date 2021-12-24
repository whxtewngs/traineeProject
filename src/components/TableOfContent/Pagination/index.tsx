import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {ruRU} from '@mui/material/locale';

interface IProps {
  count: number
  pageNumber: number
  setPagination: React.Dispatch<React.SetStateAction<{
    minIndex: number;
    maxIndex: number;
  }>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination(
  {
    count,
    pageNumber,
    setPagination,
    setPage
  } : IProps
) {
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPagination({minIndex: newPage * 10, maxIndex: newPage * 10 + 9})
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider
        theme={(outerTheme) => createTheme(outerTheme, ruRU)}
      >
      <TablePagination
        component="div"
        count={count}
        page={pageNumber}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        labelRowsPerPage=''
        rowsPerPageOptions={[]}
        //onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </ThemeProvider>
  );
}