export * from './locale';
export * from './system';

export * from './errorCode';
export * from './permission';

export * from './route';
export * from './menu';

export function getCurrentDomain(): string {
  const hostname = window.location.hostname;
  switch (hostname) {
    case 'localhost':
      return 'https://chapchap.marshsoft.org';
    default:
      return 'https://chapchap.marshsoft.org';
  }
}

export const VUE_BASE_PATH = process.env.VUE_BASE_PATH ?? '/';

export const BASE_API_URL = process.env.BASE_API_URL ?? getCurrentDomain(); 

export const SOCKET_IO_URL = process.env.SOCKET_IO_URL ?? getCurrentDomain() + ':9001'; 


