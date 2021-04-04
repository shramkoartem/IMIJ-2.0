import React, { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Container,
  makeStyles
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import AddItemForm from '../../items/ItemsListView/AddItemForm';

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

  // STATE //
  const [basket, setBasket] = useState([]);
  const classes = useStyles();
  const [allItems, setAllItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const API_URL = 'http://127.0.0.1:5000/items/ajax_data/';
  useEffect(() => {
    console.log('mounted');
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setAllItems(json.data);
      });
  }, []);

  function isEmpty(object) {
    return !Object.values(object).some((x) => (x !== null && x !== ''));
  }

  const onClickAddButton = (item) => {
    /*
      Adds item to the basket
      - if item is not in the database, create a new obj for it
    */
    const value = item;
    if (typeof value === 'object' && !isEmpty(value)) {
      const newBasket = basket;
      newBasket.push(item);
      setBasket([...newBasket]);
      console.log(basket);
    } else {
      console.log('Replace with modular');
      setModalOpen(true);
    }
  };

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  function handleModalSubmit(newItem) {
    setModalOpen(false);
    console.log('Child state:');
    console.log(newItem);
    const newBasket = basket;
    newBasket.push(newItem);
    setBasket([...newBasket]);
  }

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        {/* show pop up conditionally */}
        <Toolbar
          basket={basket}
          items={allItems}
          onClickAddButton={onClickAddButton}
          handleModalOpen={handleModalOpen}
        />
        <Box mt={3}>
          <Results items={basket} />
        </Box>
        <Modal
          open={modalOpen}
          onClose={handleModalClose}
        >
          <AddItemForm
            handleModalClose={handleModalClose}
            handleModalSubmit={handleModalSubmit}
          />
        </Modal>
      </Container>
    </Page>
  );
};

export default CheckoutView;
