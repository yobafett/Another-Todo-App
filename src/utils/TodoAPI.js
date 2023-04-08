import axios from 'axios';

export const postTodo = async (todo) => post('todos', todo);
export const postTag = async (tag) => post('tags', tag);
export const getTodo = async () => get('todos');
export const getTags = async () => get('tags');
export const delTodo = async (id) => del('todos', id);
export const delTag = async (id) => del('tags', id);
export const patchTodo = async (id, data) => patch('todos', id, data);

export const switchTodoComplete = async (id) => {
  const todo = await getById('todos', id);
  patchTodo(id, { complete: !todo.complete});
};

const get = async (type) => {
  const response = await axios.get(`http://localhost:3001/${type}`);
  return response.data;
};

const getById = async (type, id) => {
  const response = await axios.get(`http://localhost:3001/${type}/${id}`);
  return response.data;
};

const patch = async (type, id, data) => await axios.patch(`http://localhost:3001/${type}/${id}`, data);
const post = async (type, data) => axios.post(`http://localhost:3001/${type}`, data);
const del = async (type, id) => axios.delete(`http://localhost:3001/${type}/${id}`);



