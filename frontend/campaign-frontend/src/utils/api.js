// src/utils/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const addCustomer = (data) => axios.post(`${API_URL}/data/customer`, data);
export const addOrder = (data) => axios.post(`${API_URL}/data/order`, data);
export const createCampaign = (data) => axios.post(`${API_URL}/campaigns/campaign`, data);
