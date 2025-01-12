import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// The encryption key should be the same used for encrypting the sessionInfo
const encryptionKey = process.env.REACT_APP_ENCRYPTION_KEY;

export const getSessionInfo = () => {
  const encryptedSessionInfo = Cookies.get('sessionInfo');

  if (!encryptedSessionInfo) {
    return null;
  }

  try {
    // Split the encrypted session info by '&' to get each encrypted value
    const [encryptedEmpId, encryptedFirstName, encryptedLastName, encryptedDesignation] = encryptedSessionInfo.split('&');

    // Decrypt each value
    const empId = CryptoJS.AES.decrypt(encryptedEmpId, encryptionKey).toString(CryptoJS.enc.Utf8);
    const firstName = CryptoJS.AES.decrypt(encryptedFirstName, encryptionKey).toString(CryptoJS.enc.Utf8);
    const lastName = CryptoJS.AES.decrypt(encryptedLastName, encryptionKey).toString(CryptoJS.enc.Utf8);
    const designation = CryptoJS.AES.decrypt(encryptedDesignation, encryptionKey).toString(CryptoJS.enc.Utf8);

    const sessionInfo = { empId, firstName, lastName, designation };

    return sessionInfo;
  } catch (error) {
    console.error('Error decrypting session info:', error);
    return null;
  }
};
