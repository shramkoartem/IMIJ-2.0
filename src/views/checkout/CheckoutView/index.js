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

  const onClickAddButton = (item) => {
    /*
      Adds item to the basket
      - if item is not in the database, create a new obj for it
    */
    const value = item;
    if (value instanceof String) {
      console.log('Replace with modular');
    } else {
      const newBasket = basket;
      newBasket.push(item);
      setBasket([...newBasket]);
      console.log(basket);
    }
  };

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        <Toolbar
          basket={basket}
          items={allItems}
          onClickAddButton={onClickAddButton}
        />
        <Box mt={3}>
          <Results items={basket} />
        </Box>
      </Container>
    </Page>
  );
};

export default CheckoutView;
