import axiosRequest from 'axios';
import { BASE_API_URL } from '@/constants';

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImVtYWlsIjoibWFyc2hhbGxtdXN5aW1pQGdtYWlsLmNvbSIsInVzZXJuYW1lIjpudWxsLCJyb2xlIjoxLCJ0b2tlblZlcnNpb24iOm51bGwsImlhdCI6MTc0Mjc4OTQ0N30.nHjQbdAG9NAtRUfQS4ruBvnH2wC1utS8VlEtQtiL6IU';

export const axios = axiosRequest.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',Authorization: `Bearer ${TOKEN}`,
  }
});

export const axiosInstance = axios;
