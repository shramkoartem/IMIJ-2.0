import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  makeStyles
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));
const Toolbar = ({
  className, onChangeSearchField, basket, items, ...rest
}) => {
  const classes = useStyles();
  let selectedItem = [];

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <Autocomplete
                id="autocomplete-field"
                freeSolo
                onChange={(event, value) => { selectedItem = value; console.log(selectedItem); }}
                options={items}
                getOptionLabel={(item) => item.barcode.toString()
                  .concat(' ', item.name)}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} fullWidth label="Search" variant="outlined" />}
              />
            </Box>
            <Box
              display="flex"
              justifyContent="flex-end"
            >
              <Button
                color="primary"
                variant="contained"
              >
                Add item
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  onChangeSearchField: PropTypes.func,
  basket: PropTypes.array,
  items: PropTypes.array
};

export default Toolbar;
