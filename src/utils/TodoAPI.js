import axios from 'axios';

export const postTodo = async (todo) => post('todos', todo);
export const postTag = async (tag) => post('tags', tag);
export const getTodo = async () => get('todos');
export const getTags = async () => get('tags');
export const delTodo = async (id) => del('todos', id);
export const delTag = async (id) => del('tags', id);

const get = async (type) => {
    const response = await axios.get(`http://localhost:3001/${type}`)
    return response.data;
}

const post = async (type, data) => {
    axios.post(`http://localhost:3001/${type}`, data)
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

const del = async (type, id) => {
    axios.delete(`http://localhost:3001/${type}/${id}`)
        .then(function (response) {
            //console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}