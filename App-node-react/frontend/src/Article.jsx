import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Navbar from "./components/Navbar";
import MiniDrawer from "./components/MiniDrawer";

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Article() {
  const [Article, setArticle] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get("http://localhost:8082/articles")
      .then((res) => setArticle(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDeleted = async (id) => {
    try {
      await axios.delete("http://localhost:8082/deletearticle/" + id);
      setArticle((prev) => prev.filter((item) => item.id !== id));
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Article.length) : 0;

  return (
    <div className="bgcolor">
      <Navbar />
      <MiniDrawer />
      
      <Box sx={{ padding: 2 }}>
       
        <TableContainer
          component={Paper}
          sx={{ width: "10%", minWidth: 1200, margin: "0 auto" }}
          
        >
            
        <Link to="/createarticle" className="btn btn-success" style={{ marginBottom: 15 }}>
          Add +
        </Link>
             
          <Table size="small">
            
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Image</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Titre</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Prix</TableCell>
                <TableCell sx={{ fontWeight: "bold", width: "20%" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? Article.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : Article
              ).map((data) => (
                <TableRow key={data.id}>
                  <TableCell>
                    {data.image && (
                      <img
                        src={`http://localhost:8082/uploads/${data.image}`}
                        alt="Article"
                        style={{
                          width: "40px",
                          height: "40px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{data.titer}</TableCell>
                  <TableCell>{data.date}</TableCell>
                  <TableCell>{data.prix}</TableCell>
                  <TableCell>
                    <Link to={`/updatearticle/${data.id}`} style={{ textDecoration: "none" }}>
                      <Button variant="contained" color="primary" size="small">
                      Mise à Jour
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDeleted(data.id)}
                      sx={{ marginLeft: 1 }}
                    >
                      Supprimer
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 40 * emptyRows }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10]}
                  count={Article.length}
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
      </Box>
    
    </div>
  );
}
