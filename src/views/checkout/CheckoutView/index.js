import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

const API_URL = 'http://127.0.0.1:5000/items/ajax_data/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

// true if search bar is used
let search = false;

const ItemsListView = () => {
  /*
    ItemsListView component
    Loads all data in the warehouse
    Allows filtering
  */
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
    if (items === undefined || items.length === 0) {
      fetch(API_URL)
        .then((res) => res.json())
        .then((json) => {
          setAllItems(json.data);
          if (search === false) {
            setItems(json.data);
          }
        });
    }
  });

  const onChangeSearchField = (e) => {
    /* Filters */
    search = true;
    const { value } = e.target;
    const valueArr = value.toUpperCase().split(' ');

    const test = allItems.filter((item) => {
      return (valueArr.every((val) => {
        return item.barcode.toString()
          .concat(' ', item.name.toUpperCase())
          .includes(val);
      }));
    });
    setItems([...test]);
  };

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        <Toolbar onChangeSearchField={onChangeSearchField} />
        <Box mt={3}>
          <Results items={items} />
        </Box>
      </Container>
    </Page>
  );
};

export default ItemsListView;
