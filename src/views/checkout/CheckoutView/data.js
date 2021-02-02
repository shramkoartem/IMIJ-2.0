import axios from 'axios';

let items = [];

async function getData() {
  try {
    /* Retrieves all ITEMS data from DB */
    const res = await axios({
      url: 'http://127.0.0.1:5000/items/ajax_data/',
      method: 'get',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (res.status === 200) {
      console.log(res.status);
    }
    console.log([...res.data.data]);
    return [...res.data.data];
  } catch (err) {
    console.error(err);
  }
  console.log('empty');
  return [];
}
items = getData();
const data = items;

export default data;
