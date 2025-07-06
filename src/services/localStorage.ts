import { Locales } from '@/constants';
import { Authentication, System } from '@/constants';
import CryptoJS from 'crypto-js';

const secretKey = 'D(R@V@v/iB;vv!bhu_RL)Z7s_~!<~(yRLA';

function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}

function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export const getBearerToken = (): string => {
  return `Basic ${getAccessToken()}`;
};

export const getAccessToken = (): string | null => {
  const encryptedToken = localStorage.getItem(Authentication.AccessToken);
  if (encryptedToken) {
    try {
      return decryptData(encryptedToken);
    } catch (error) {
      console.error('Failed to decrypt access token:', error);
      return null;
    }
  }
  return null;
};

export const setAccessToken = (accessToken: string | undefined): void => {
  if (accessToken) {
    const encryptedAccessToken = encryptData(accessToken);

    localStorage.setItem(Authentication.AccessToken, encryptedAccessToken);
  }
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(Authentication.RefreshToken);
};

export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem(Authentication.RefreshToken, refreshToken);
};

export const getExpiryIn = (): string | null => {
  return localStorage.getItem(Authentication.ExpiryIn);
};

export const setExpiryIn = (expiryIn: string): void => {
  localStorage.setItem(Authentication.ExpiryIn, expiryIn);
};

export const getDeviceId = (): string | null => {
  return localStorage.getItem(Authentication.DeviceId);
};

export const setDeviceId = (deviceId: string) => {
  localStorage.setItem(Authentication.DeviceId, deviceId);
};

export const saveToken = (accessToken: string | undefined): void => {
  setAccessToken(accessToken);
  // setRefreshToken(refreshToken);
  // setExpiryIn(expiryIn);
  // setDeviceId(deviceId);
};

export const destroySensitiveInfo = (): void => {
  localStorage.removeItem(Authentication.AccessToken);
  localStorage.removeItem(Authentication.RefreshToken);
  localStorage.removeItem(Authentication.ExpiryIn);
};

export const getLocale = (): string => {
  return localStorage.getItem(System.Locale) || Locales.EN;
};

export const setLocale = (locale: string): void => {
  localStorage.setItem(System.Locale, locale);
};
