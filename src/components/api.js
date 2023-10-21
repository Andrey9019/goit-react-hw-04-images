import axios from 'axios';

const API_KEY = '39268708-5279c748fba761d3085ad3b24';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const featchItem = async (page, query) => {
  const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: '12',
    q: query,
    page: page,
  });

  const response = await axios.get(`?${params}`);
  return response.data;
};
