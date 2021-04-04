import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  makeStyles,
  Modal
} from '@material-ui/core';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import AddItemForm from './AddItemForm';

const API_URL = 'http://127.0.0.1:5000/items/ajax_data/';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ItemsListView = () => {
  /*
    ItemsListView component
    Loads all data in the warehouse
    Allows filtering
  */
  const classes = useStyles();
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  // true if search bar is used
  let search = false;

  useEffect(() => {
    if (items === undefined || items.length === 0) {
      console.log('GET request');
      fetch(API_URL)
        .then((res) => res.json())
        .then((json) => {
          setAllItems(json.data);
          if (search === false) {
            setItems(json.data);
          }
        });
    }
  }, []);

  const onChangeSearchField = (e) => {
    /* Filters */
    search = true;
    const { value } = e.target;
    const valueArr = value.toUpperCase().split(' ');

    const selectedItems = allItems.filter((item) => {
      return (valueArr.every((val) => {
        return item.barcode.toString()
          .concat(' ', item.name.toUpperCase())
          .includes(val);
      }));
    });
    setItems([...selectedItems]);
    search = false;
  };

  function handleModalOpen() {
    setModalOpen(true);
  }

  function handleModalClose() {
    setModalOpen(false);
  }

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        <Toolbar
          onChangeSearchField={onChangeSearchField}
          handleModalOpen={handleModalOpen}
        />
        <Box mt={3}>
          <Results items={items} />
          <Modal
            open={modalOpen}
            onClose={handleModalClose}
          >
            <AddItemForm
              handleModalClose={handleModalClose}
            />
          </Modal>
        </Box>
      </Container>
    </Page>
  );
};

export default ItemsListView;
