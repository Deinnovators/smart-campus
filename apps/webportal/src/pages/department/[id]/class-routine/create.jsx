import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const cellStyle = {
  borderRight: '.5px solid #515151',
  borderBottom: '.5px solid #515151',
  borderTop: '.5px solid #515151',
};
const borderLeftStyle = {
  borderLeft: '.5px solid #515151',
};

const level = ['I', 'II'];
const semester = ['one', 'two'];
const section = ['a', 'b', 'c'];
const Create = () => {
  const [tableData, setTableData] = useState([
    ['SUN', '', '', '', '', '', '', '', '', ''],
    ['MON', '', '', '', '', '', '', '', '', ''],
    ['TUE', '', '', '', '', '', '', '', '', ''],
    ['WED', '', '', '', '', '', '', '', '', ''],
    ['THU', '', '', '', '', '', '', '', '', ''],
  ]);
  const [data, setData] = useState({
    academicYear: '',
    level: '',
    semester: '',
    section: '',
    session: '',
  });

  console.log(tableData);
  const [toggleTable, setToggleTable] = useState(true);
  function handleInputChange(event, idx, uIdx) {
    const newValue = event.target.value;

    // Create a copy of the nested array we want to modify
    const newArray = [...tableData[idx]];

    // Update the value at index 1 of the nested array
    newArray[uIdx] = newValue;

    // Create a copy of the entire state array
    const newStateArray = [...tableData];

    // Update the nested array within the new state array
    newStateArray[idx] = newArray;

    // Call the setter function with the updated state
    setTableData(newStateArray);
  }
  return (
    <Container>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '24px 0px',
          flexWrap: 'wrap-reverse',
        }}>
        <Typography variant='h4'> Create Routines</Typography>
      </div>

      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12}>
          <TextField
            required
            id='academicYear'
            label='academicYear'
            variant='outlined'
            sx={{ width: '100%', mb: 2 }}
            value={data.academicYear}
            onChange={e =>
              setData({
                ...data,
                academicYear: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mb: 2, width: '100%' }}>
            <InputLabel id='levelLabel'>Level</InputLabel>
            <Select
              labelId='levelLabel'
              label='level'
              value={data.level}
              onChange={e =>
                setData({
                  ...data,
                  level: e.target.value,
                })
              }>
              {level.map((dt, idx) => (
                <MenuItem
                  value={dt}
                  key={idx}
                  selected={data.level === dt ? true : false}>
                  {dt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mb: 2, width: '100%' }}>
            <InputLabel id='levelLabel'>Semester</InputLabel>
            <Select
              labelId='semester'
              label='semester'
              value={data.semester}
              onChange={e =>
                setData({
                  ...data,
                  semester: e.target.value,
                })
              }>
              {semester.map((dt, idx) => (
                <MenuItem
                  value={dt}
                  key={idx}
                  selected={data.level === dt ? true : false}>
                  {dt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl sx={{ mb: 2, width: '100%' }}>
            <InputLabel id='section'>Section</InputLabel>
            <Select
              labelId='section'
              label='section'
              value={data.section}
              onChange={e =>
                setData({
                  ...data,
                  section: e.target.value,
                })
              }>
              {section.map((dt, idx) => (
                <MenuItem
                  value={dt}
                  key={idx}
                  selected={data.level === dt ? true : false}>
                  {dt}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id='Session'
            label='Session'
            variant='outlined'
            sx={{ width: '100%', mb: 7 }}
            value={data.session}
            onChange={e =>
              setData({
                ...data,
                session: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          padding: '24px 0px',
          flexWrap: 'wrap-reverse',
        }}>
        <Typography variant='h5'> Edit Routine Table</Typography>
        <Button
          variant='contained'
          onClick={() => {
            setToggleTable(!toggleTable);
          }}>
          {toggleTable ? 'save' : 'edit'}
        </Button>
      </div>
      <Table component={Paper} sx={{ borderCollapse: 'collapse' }}>
        <TableHead>
          <TableRow align='center'>
            <TableCell sx={{ border: '.5px solid #515151' }}>Day</TableCell>
            <TableCell align='center' sx={cellStyle}>
              Degree
            </TableCell>
            <TableCell sx={cellStyle} align='center'>
              1st <br /> 09-9:50am
            </TableCell>
            <TableCell sx={cellStyle} align='center'>
              2nd <br /> 9:55-10:45am
            </TableCell>{' '}
            <TableCell sx={cellStyle} align='center'>
              3rd <br /> 10:50-11:40am
            </TableCell>{' '}
            <TableCell sx={cellStyle} align='center'>
              4th <br /> 11:45-12:35pm
            </TableCell>{' '}
            <TableCell sx={cellStyle} align='center'>
              5th <br />
              12:40-1:30pm
            </TableCell>{' '}
            <TableCell sx={cellStyle} align='center'>
              Break <br /> 1:30-2:00pm
            </TableCell>
            <TableCell sx={cellStyle} align='center'>
              6th <br /> 2:05-255pm
            </TableCell>{' '}
            <TableCell sx={cellStyle} align='center'>
              7th <br /> 3:00-350px
            </TableCell>{' '}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((dt, idx) => (
            <TableRow>
              <TableCell sx={{ ...cellStyle, ...borderLeftStyle }}>
                {dt[0]}
              </TableCell>
              {idx === 0 && (
                <TableCell sx={cellStyle} rowSpan={5} align='center'>
                  {!toggleTable ? (
                    dt[1]
                  ) : (
                    <TextField
                      value={dt[1]}
                      rows={4}
                      multiline
                      onChange={e => handleInputChange(e, idx, 1)}
                    />
                  )}
                </TableCell>
              )}
              <TableCell sx={cellStyle} align='center'>
                {!toggleTable ? (
                  dt[2]
                ) : (
                  <TextField
                    value={dt[2]}
                    onChange={e => handleInputChange(e, idx, 2)}
                  />
                )}
              </TableCell>
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[3]
                ) : (
                  <TextField
                    value={dt[3]}
                    onChange={e => handleInputChange(e, idx, 3)}
                  />
                )}
              </TableCell>
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[4]
                ) : (
                  <TextField
                    value={dt[4]}
                    onChange={e => handleInputChange(e, idx, 4)}
                  />
                )}{' '}
              </TableCell>
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[5]
                ) : (
                  <TextField
                    value={dt[5]}
                    onChange={e => handleInputChange(e, idx, 5)}
                  />
                )}
              </TableCell>
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[6]
                ) : (
                  <TextField
                    value={dt[6]}
                    onChange={e => handleInputChange(e, idx, 6)}
                  />
                )}
              </TableCell>
              {idx === 0 && (
                <TableCell sx={cellStyle} rowSpan={5} align='center'>
                  Break
                </TableCell>
              )}
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[8]
                ) : (
                  <TextField
                    value={dt[8]}
                    onChange={e => handleInputChange(e, idx, 8)}
                  />
                )}
              </TableCell>
              <TableCell sx={cellStyle} align='center'>
                {' '}
                {!toggleTable ? (
                  dt[9]
                ) : (
                  <TextField
                    value={dt[9]}
                    onChange={e => handleInputChange(e, idx, 9)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          padding: '32px 0px',
        }}>
        <Button
          variant='contained'
          disabled={toggleTable ? true : false}
          onClick={() => {
            setToggleTable(!toggleTable);
          }}>
          Create routine
        </Button>
      </div>
    </Container>
  );
};

export default Create;
