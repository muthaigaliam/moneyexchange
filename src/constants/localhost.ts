export * from './locale';
export * from './system';

export * from './errorCode';
export * from './permission';

export * from './route';
export * from './menu';

export const VUE_BASE_PATH = process.env.VUE_BASE_PATH ?? '/';

export const BASE_API_URL = process.env.BASE_API_URL ?? 'http://127.0.0.1/api/method';

// 'https://hmis-v15.tiberbu.health/api/method'; // ?? 'https://dev.tiberbu.health/api/method/';

export const SOCKET_IO_URL = process.env.SOCKET_IO_URL ?? 'http://127.0.0.1:9001';
//'http://35.178.156.187:9001'; // ?? 'https://dev.tiberbu.health:9001';

export const HIE_OTP_ENDPOINT =
  process.env.HIE_OTP_ENDPOINT ?? 'https://hie.paperless.co.ke/tiberbu-send-otp';

export const HIE_OTP_USERNAME = process.env.HIE_OTP_USERNAME ?? '';

export const HIE_OTP_PASSWORD = process.env.HIE_OTP_PASSWORD ?? '';

export const HIE_OTP_VALIDATION_ENDPOINT =
  process.env.HIE_OTP_VALIDATION_ENDPOINT ?? 'https://hie.paperless.co.ke/tiberbu-validate-otp';
