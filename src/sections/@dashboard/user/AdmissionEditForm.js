import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  TextareaAutosize,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import { toast } from 'react-toastify';
import CheckIcon from '@mui/icons-material/Check';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const AdmissionEditForm = (props) => {
  // console.log(props.editrow.row);

  const [subject, setsubject] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/subject').then((r) => {
      setsubject(r.data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const [data, setdata] = useState({
    name: '',
    parentsname: '',
    birthdate: '',
    education: '',
    gender: '',
    email: '',
    studentmobile: '',
    parentmobile: '',
    whatsapp: '',
    fees: '',
    address: '',
    city: '',
    inquirydate: '',
    takenby: '',
    leadsource: '',
    course: '',
  });

  useEffect(() => {
    // Destructure props.editrow.row and extract everything except 'course'
    const { course, ...rowDataWithoutCourse } = props.editrow.row;
    setdata({ ...rowDataWithoutCourse });
  }, [props.editrow.row]);

  const handleChange = (e) => {
    e.persist();
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  // const handleChangeasspdf = (e) => {
  //   // Handle file input change correctly
  //   setdata({ ...data, asspdf: e.target.files[0] });
  // };

  const handleSubmit = (e, _id) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/students/${data._id}`, data).then((r) => {
      setOpen(props.handleEditClose);
      console.log(r.data);
      props.changeEdit(r.data._id);
    });

    setdata((e.target.value = ''));
  };

  const dat = () => {
    const d = new Date(data.birthdate);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={8}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Student Details
            </h4>

            <TextField
              type="text"
              name="name"
              id="standard-basic"
              value={data.name || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
              label="Student Name "
              validators={['required']}
            />

            <TextField
              type="text"
              name="parentsname"
              label="Parents Name"
              onChange={handleChange}
              value={data.parentsname || ''}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              name="birthdate"
              label="Birth Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={dat() || ''}
              onChange={handleChange}
              errorMessages={['this field is required']}
            />
            <TextField
              type="text"
              name="education"
              value={data.education || ''}
              label="Education"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <RadioGroup row name="gender" sx={{ mb: 2 }} value={data.gender || ''} onChange={handleChange}>
              <FormControlLabel value="Male" label="Male" labelPlacement="end" control={<Radio color="secondary" />} />

              <FormControlLabel
                value="Female"
                label="Female"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />

              <FormControlLabel
                value="Others"
                label="Others"
                labelPlacement="end"
                control={<Radio color="secondary" />}
              />
            </RadioGroup>
          </Grid>
          {/* ================================================================================== */}

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Student Contact Details
            </h4>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={data.email || ''}
              onChange={handleChange}
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            <TextField
              type="number"
              name="studentmobile"
              value={data.studentmobile || ''}
              label="Student Mobile Nubmer"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="number"
              name="parentmobile"
              value={data.parentmobile || ''}
              label="Parent Mobile Nubmer"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
            <TextField
              type="number"
              name="whatsapp"
              value={data.whatsapp || ''}
              label="Whatsapp Nubmer"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextareaAutosize
              name="address"
              aria-label="empty textarea"
              onChange={handleChange}
              validators={['required']}
              value={data.address || ''}
              minRows={3}
              placeholder="Address..."
              style={{ width: '100%' }}
            />
            <TextField
              type="text"
              name="city"
              value={data.city || ''}
              label="City"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>

          {/* ================================================================================== */}

          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Admission Details
            </h4>
            <TextField
              name="inquirydate"
              label="Admission Date"
              InputLabelProps={{ shrink: true }}
              type="date"
              value={dat() || ''}
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />

            <TextField
              label="Taken By"
              select
              variant="filled"
              value={data.takenby || ''}
              helperText="Please Select your taken BY"
              onChange={handleChange}
              name="takenby"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Counsellor Vadodara</option>
              <option>Counsellor Aanand</option>
              <option>Counsellor Ahmedabad</option>
              <option>Counsellor Bhavnagar</option>
            </TextField>

            <TextField
              label="Lead Source "
              select
              value={data.leadsource || ''}
              variant="filled"
              helperText="Please Select your lead source"
              onChange={handleChange}
              name="leadsource"
              SelectProps={{
                native: 'true',
              }}
            >
              <option />
              <option>Discount Coupon</option>
              <option>Facebook</option>
              <option>Google</option>
              <option>Just Dial</option>
              <option>News Paper</option>
              <option>Reference</option>
              <option>Other</option>
            </TextField>

            <Autocomplete
              multiple
              id="tags-standard"
              options={subject.map((val) => {
                return val.subject;
              })}
              value={data.course || []} // Ensure it's an array or set a default empty array
              getOptionLabel={(option) => option}
              disableCloseOnSelect
              renderOption={(props, option, { selected }) => (
                <MenuItem key={option} value={option} sx={{ justifyContent: 'space-between' }} {...props}>
                  {option}
                  {selected ? <CheckIcon color="info" /> : null}
                </MenuItem>
              )}
              onChange={(event, value) => setdata({ ...data, course: value || [] })} // Ensure value is an array or default empty array
              renderInput={(params) => <TextField {...params} variant="outlined" />}
            />
            <TextField
              type="number"
              name="fees"
              value={data.fees || ''}
              label="Fees"
              onChange={handleChange}
              validators={['required']}
              errorMessages={['this field is required']}
            />
          </Grid>
          {/* <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
              Documents
            </h4>
            <TextField
              name="sphoto"
              label="Student Photo"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handleChangeasspdf}
            />
            <TextField
              name="adhar"
              label="Aadhar card"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handleChangeasspdf}
            />
            <TextField
              name="marksheet"
              label="Previous year marksheet"
              InputLabelProps={{ shrink: true }}
              type="file"
              onChange={handleChangeasspdf}
            />
          </Grid> */}
        </Grid>

        <Button
          color="error"
          className="mx-2"
          variant="contained"
          type="submit"
          onClick={() => {
            setdata('');
          }}
        >
          <DeleteIcon />
          <span> Clear</span>
        </Button>

        <Button color="primary" className="mx-2" variant="contained" type="submit">
          <SendIcon />
          <span> Submit</span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default AdmissionEditForm;
