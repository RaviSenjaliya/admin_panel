import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import {
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import FeesDetailed from '../sections/@dashboard/Fees/FeesDetailed';
import FeesDialog from '../sections/@dashboard/Fees/FeesDialog';

export default function Fees() {
  const styles = {
    img: {
      color: '#e6e6e6',
      font: '40px Impact',
      backgroundColor: 'red',
    },
  };
  const comPDF = useRef();
  const PrintPDF = useReactToPrint({
    content: () => comPDF.current,
    documentTitle: 'UserFees',
  });
  const [edit, setEdit] = useState(-1);
  const [editRow, seteditRew] = useState({});
  const [userdet, setuserdet] = useState({});

  // ========================================================
  const [open, setOpen] = React.useState(false);
  const handleEditClick = (id) => () => {
    seteditRew(id);
    setOpen(true);
  };
  const handleEditClose = () => {
    setOpen(false);
  };

  const [openuserDetail, setOpenuserDetail] = React.useState(false);
  const handleShowClick = (id) => () => {
    setuserdet(id.row._id);
    setOpenuserDetail(true);
  };

  const handleShowClose = () => {
    setOpenuserDetail(false);
  };
  // ========================================================

  const columns = [
    { field: 'name', headerName: 'name', width: 130 },
    { field: 'as1', headerName: 'as1', width: 130 },
    { field: 'as2', headerName: 'as2', width: 130 },

    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: (row) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleShowClick(row)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/students').then((r) => {
      const d = r.data.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(d);
      console.log(r);
    });
  }, [edit]);
  console.log(rows);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student/Trainee/Lead Info
          </Typography>
          <FeesDialog changeEdit={setEdit} />
        </Stack>

        {/* =========================(fees info )==================================================== */}

        <Dialog
          open={openuserDetail}
          onClose={handleShowClose}
          // fullScreen
          fullWidth
          maxWidth="lg"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Question & Answer'}</DialogTitle>
          <DialogContent>
            {/* ============================================================================= */}

            <FeesDetailed handleShowClose={handleShowClose} userdet={userdet} />

            {/* ============================================================================= */}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleShowClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        {/* ========================================================================== */}
        <Card
          ref={comPDF}
          style={{ height: '1000px', width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <h1>hello</h1>
          {rows.map((val, index) => {
            return (
              <tr key={index}>
                <td>
                  <img
                    src={require(`./img/${val.img}`)}
                    alt="pdf"
                    // width="30%"
                    onError={(e) => {
                      e.target.src = require('./img/imgpdf.png'); // Provide the path to your alternate image
                      e.target.alt = 'Alternate Image';
                    }}
                  />
                  <a href={require(`./img/${val.img}`)} download className="btn text-white btn-info">
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </Card>
        <Button variant="contained" onClick={PrintPDF}>
          Print
        </Button>
      </Container>
    </>
  );
}
