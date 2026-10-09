const BASE_URL = '/api';

//GET-запрос
export const getData = async (path) => {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }

  return response.json();
};

//POST-запрос
export const postData = async (path, body) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }

  return response;
};

//запросы к бэкенду
export const fetchTopSales = () => getData('/top-sales');
export const fetchCategories = () => getData('/categories');

export const fetchItems = ({ categoryId, offset = 0, q = '' } = {}) => {
  const params = new URLSearchParams();
  if (categoryId) params.set('categoryId', categoryId);
  if (offset) params.set('offset', offset);
  if (q) params.set('q', q);
  const query = params.toString();
  return getData(`/items${query ? `?${query}` : ''}`);
};

export const fetchItemById = (id) => getData(`/items/${id}`);
export const sendOrder = (order) => postData('/order', order);