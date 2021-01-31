import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  // Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  // Typography,
  makeStyles
} from '@material-ui/core';
// import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, items, ...rest }) => {
  const classes = useStyles();
  const [selectedItemIds, setSelectedItemIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedItemIds;

    if (event.target.checked) {
      newSelectedItemIds = items.map((item) => item.id);
    } else {
      newSelectedItemIds = [];
    }

    setSelectedItemIds(newSelectedItemIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedItemIds.indexOf(id);
    let newSelectedItemIds = [];

    if (selectedIndex === -1) {
      newSelectedItemIds = newSelectedItemIds.concat(selectedItemIds, id);
    } else if (selectedIndex === 0) {
      newSelectedItemIds = newSelectedItemIds.concat(selectedItemIds.slice(1));
    } else if (selectedIndex === selectedItemIds.length - 1) {
      newSelectedItemIds = newSelectedItemIds.concat(selectedItemIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItemIds = newSelectedItemIds.concat(
        selectedItemIds.slice(0, selectedIndex),
        selectedItemIds.slice(selectedIndex + 1)
      );
    }

    setSelectedItemIds(newSelectedItemIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedItemIds.length === items.length}
                    color="primary"
                    indeterminate={
                      selectedItemIds.length > 0
                      && selectedItemIds.length < items.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Barcode
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Cost
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.slice(page * limit, page * limit + limit).map((item) => (
                <TableRow
                  hover
                  key={item.id}
                  selected={selectedItemIds.indexOf(item.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItemIds.indexOf(item.id) !== -1}
                      onChange={(event) => handleSelectOne(event, item.id)}
                      value="true"
                    />
                  </TableCell>
                  {/* Barcode */}
                  <TableCell>
                    {item.barcode}
                  </TableCell>
                  {/* Name */}
                  <TableCell>
                    {item.name}
                  </TableCell>
                  {/* Cost */}
                  <TableCell>
                    {item.cost}
                  </TableCell>
                  {/* Price */}
                  <TableCell>
                    {item.price}
                  </TableCell>
                  {/* Amount */}
                  <TableCell>
                    {item.amount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={items.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default Results;
