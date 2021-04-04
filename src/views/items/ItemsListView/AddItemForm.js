import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles(() => ({
  root: {},
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50px'
  },
}));

// Add Item functional component
const AddItemForm = ({
  className,
  handleModalClose,
  handleModalSubmit,
  ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    barcode: '',
    name: '',
    price: '',
    amount: ''
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  function isEmpty(object) {
    return !Object.values(object).every((x) => (x !== null && x !== ''));
  }

  return (
    <div className={clsx(classes.modal)}>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className, classes.modal)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="Please enter product details"
            title="Add new product"
            action={(
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            )}
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* barcode */}
                <TextField
                  fullWidth
                  helperText="Please specify the barcode of the product"
                  label="Barcode"
                  name="barcode"
                  onChange={handleChange}
                  required
                  value={values.barcode}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                {/* product name */}
                <TextField
                  fullWidth
                  label="Product name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Price"
                  name="price"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.price}
                  variant="outlined"
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  onChange={handleChange}
                  type="number"
                  required
                  value={values.amount}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <Button
              disabled={(isEmpty(values))}
              color="primary"
              variant="contained"
              onClick={() => handleModalSubmit(values)}
            >
              Submit
            </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};

AddItemForm.propTypes = {
  className: PropTypes.string,
  handleModalClose: PropTypes.func,
  handleModalSubmit: PropTypes.func
};

export default AddItemForm;
