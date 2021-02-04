import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';

// const API_URL = 'http://127.0.0.1:5000/items/ajax_data/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CheckoutView = () => {
  /*
    ItemsListView component
    Loads all data in the warehouse
    Allows filtering
  */
  const [basket, setBasket] = useState([]);
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);

  const API_URL = 'http://127.0.0.1:5000/items/ajax_data/';
  useEffect(() => {
    console.log('mounted');
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setAllItems(json.data);
      });
  }, []);

  const onChangeSearchField = (e) => {
    /* Filters */
    // search = true;
    const { value } = e.target;
    console.log(value);
    const valueArr = value.toUpperCase().split(' ');
    if (value.length === 0) {
      setBasket([]);
    }

    const selectedItems = allItems.filter((item) => {
      return (valueArr.every((val) => {
        return item.barcode.toString()
          .concat(' ', item.name.toUpperCase())
          .includes(val);
      }));
    });
    setItems([...selectedItems]);
    setBasket([...selectedItems]);
  };

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        <Toolbar
          onChangeSearchField={onChangeSearchField}
          basket={basket}
          items={allItems}
        />
        <Box mt={3}>
          <Results items={items} />
        </Box>
      </Container>
    </Page>
  );
};

export default CheckoutView;
