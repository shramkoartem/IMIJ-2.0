import React, { useState } from 'react';
import {
  Box,
  Container,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';

import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
// import data from './data';

let data = [];
axios.get('http://127.0.0.1:5000/items/ajax_data/').then((response) => {
  if (response.data && response.data.data.length > 0) {
    console.log(response.data.data[0]);
    data = [...response.data.data];
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ItemsListView = () => {
  const classes = useStyles();
  const [items] = useState(data);
  console.log(items);

  return (
    <Page
      className={classes.root}
      title="Items"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results items={items} />
        </Box>
      </Container>
    </Page>
  );
};

export default ItemsListView;
