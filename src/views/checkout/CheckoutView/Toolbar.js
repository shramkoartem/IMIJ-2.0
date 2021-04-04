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

function Toolbar({
  className, onClickAddButton, handleModalOpen, basket, items, ...rest
}) {
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
            <Box maxWidth={700} display="flex" flexDirection="row">
              <Autocomplete
                id="autocomplete-field"
                freeSolo
                onChange={(event, value) => { selectedItem = value; }}
                options={items}
                getOptionLabel={(item) => item.barcode.toString()
                  .concat(' ', item.name)}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} fullWidth label="Search" variant="outlined" />}
              />
              <Box
                marginLeft="10px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => onClickAddButton(selectedItem)}
                >
                  Add item
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

Toolbar.propTypes = {
  className: PropTypes.string,
  onClickAddButton: PropTypes.func,
  handleModalOpen: PropTypes.func,
  basket: PropTypes.array,
  items: PropTypes.array
};

export default Toolbar;
