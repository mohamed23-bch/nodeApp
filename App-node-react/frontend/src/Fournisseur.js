import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MiniDrawer from './components/MiniDrawer';
import Navbar from './components/Navbar';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  TableHead,
  IconButton,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import './Dash.css';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Fournisseur() {
  const [Fournisseur, setFournisseur] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get('http://localhost:8082/')
      .then((res) => setFournisseur(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleted = async (id) => {
    try {
      await axios.delete('http://localhost:8082/fournisseur/' + id);
      setFournisseur((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Fournisseur.length) : 0;

  return (
    <>
      <div className="bgcolor">
        <Navbar />
        <MiniDrawer />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: 2,
          }}
        >
          <Paper elevation={3} sx={{ width: '70%', padding: 3 }}>
            <Link to="/create" className="btn btn-success">
              Add +
            </Link>
            <TableContainer component={Paper} className="mt-3">
              <Table sx={{ minWidth: 500 }} aria-label="Fournisseur Table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>CIN</TableCell>
                    <TableCell>Âge</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? Fournisseur.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : Fournisseur
                  ).map((data) => (
                    <TableRow key={data.id}>
                      <TableCell>{data.nom}</TableCell>
                      <TableCell>{data.prenom}</TableCell>
                      <TableCell>{data.CIN}</TableCell>
                      <TableCell>{data.age}</TableCell>
                      <TableCell>{data.Email}</TableCell>
                      <TableCell>
                        <Link to={`/update/${data.id}`} style={{ textDecoration: 'none' }}>
                          <Button variant="contained" color="primary" size="small">
                            Mise à Jour
                          </Button>
                        </Link>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          onClick={() => handleDeleted(data.id)}
                          style={{ marginLeft: '8px' }}
                        >
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={6}
                      count={Fournisseur.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
      </div>
    </>
  );
}
