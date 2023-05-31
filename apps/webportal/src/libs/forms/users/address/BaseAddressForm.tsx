import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Prisma } from 'database';
import React, { useState } from 'react';
import { divisions, districts, upazillas, unions } from 'bd-geojs';

type Address = Omit<Prisma.AddressCreateInput, 'user'>;

export interface BaseAddressFormProps {
  onSubmit?: (address: Address) => void;
  loading?: boolean;
  initialValues?: Address;
}

const selectValue = 'select';

export const BaseAddressForm: React.FC<BaseAddressFormProps> = ({
  loading,
  initialValues,
  onSubmit,
}) => {
  const [division, setDivision] = useState<string>(
    divisions.find(d => d.name === initialValues?.division)?.id ?? selectValue,
  );
  const [district, setDistrict] = useState<string>(
    districts.find(ds => ds.name === initialValues?.district)?.id ??
      selectValue,
  );
  const [upazilla, setUpazilla] = useState<string>(
    upazillas.find(up => up.name === initialValues?.upazilla)?.id ??
      selectValue,
  );
  const [union, setUnion] = useState<string>(
    unions.find(u => u.name === initialValues?.union)?.id ?? selectValue,
  );
  const [village, setVillage] = useState<string>(initialValues?.village ?? '');
  const [zipCode, setZipCode] = useState<string>(
    initialValues?.zip?.toString() ?? '',
  );

  const handleSubmit = () => {
    const shouldReturn =
      upazilla === selectValue ||
      division === selectValue ||
      district === selectValue ||
      union === selectValue ||
      village === '' ||
      zipCode === '0' ||
      zipCode === '';
    if (shouldReturn) return;

    const data: Address = {
      upazilla: upazillas.find(up => up.id === upazilla)?.name!,
      division: divisions.find(d => d.id === division)?.name!,
      district: districts.find(ds => ds.id === district)?.name!,
      union: unions.find(u => u.id === union)?.name!,
      village: village,
      zip: +zipCode,
    };
    onSubmit?.(data);
  };

  return (
    <Box component='form'>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='division-select'>Division</InputLabel>
        <Select
          label='Division'
          labelId='division-select'
          value={division}
          onChange={e => setDivision(e.target.value)}>
          <MenuItem value={selectValue}>
            <Typography sx={{ textTransform: 'capitalize' }}>
              Select Division
            </Typography>
          </MenuItem>
          {divisions.map(d => (
            <MenuItem key={d.name} value={d.id}>
              <Typography sx={{ textTransform: 'capitalize' }}>
                {d.name}
              </Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='district-select'>District</InputLabel>
        <Select
          disabled={!division || division === selectValue}
          label='District'
          labelId='district-select'
          value={district}
          onChange={e => setDistrict(e.target.value)}>
          <MenuItem value={selectValue}>
            <Typography sx={{ textTransform: 'capitalize' }}>
              Select District
            </Typography>
          </MenuItem>
          {districts
            .filter(ds => ds.division_id === division)
            .map(d => (
              <MenuItem key={d.name} value={d.id}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {d.name}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='upazilla-select'>upazilla</InputLabel>
        <Select
          disabled={!district || district === selectValue}
          label='upazilla'
          labelId='upazilla-select'
          value={upazilla}
          onChange={e => setUpazilla(e.target.value)}>
          <MenuItem value={selectValue}>
            <Typography sx={{ textTransform: 'capitalize' }}>
              Select upazilla
            </Typography>
          </MenuItem>
          {upazillas
            .filter(up => up.district_id === district)
            .map(up => (
              <MenuItem key={up.name} value={up.id}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {up.name}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <InputLabel id='union-select'>Union</InputLabel>
        <Select
          disabled={!upazilla || upazilla === selectValue}
          label='Union'
          labelId='union-select'
          value={union}
          onChange={e => setUnion(e.target.value)}>
          <MenuItem value={selectValue}>
            <Typography sx={{ textTransform: 'capitalize' }}>
              Select union
            </Typography>
          </MenuItem>
          {unions
            .filter(up => up.upazilla_id === upazilla)
            .map(u => (
              <MenuItem key={u.name} value={u.id}>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {u.name}
                </Typography>
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='Village'
          placeholder='Village'
          value={village}
          onChange={e => setVillage(e.target.value)}
        />
      </FormControl>
      <FormControl fullWidth margin='normal'>
        <TextField
          label='Zip/Postal Code'
          placeholder='Zup/Postal Code'
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          type='number'
        />
      </FormControl>
      <FormControl margin='normal'>
        <Button
          variant='contained'
          onClick={loading ? undefined : handleSubmit}>
          {loading ? (
            <CircularProgress color='inherit' size={24} />
          ) : !initialValues ? (
            'Add address'
          ) : (
            'Edit address'
          )}
        </Button>
      </FormControl>
    </Box>
  );
};
