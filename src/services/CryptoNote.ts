import CryptoJS from 'crypto-js';
import SInfo from 'react-native-sensitive-info';
import { Platform } from 'react-native';

const encryptionKey = 'YourEncryptionKey';
export interface Encrypted {
    key: string
    service: string
    value: string
}

export const storeNote = async (noteText: string, index: number) => {
    try {

        const encryptedNote = await SInfo.setItem(index.toString(), encryptNote(noteText), {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        console.log('Note stored securely:', encryptedNote);
    } catch (error) {
        console.error('Error storing note:', error);
    }
};

export const retrieveNote = async (key: string) => {
    try {
        const encryptedNote = await SInfo.getItem(key, {
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        if (encryptedNote) {
            console.log('Encrypted Note:', encryptedNote);
            decryptNote(encryptNote)
        } else {
            console.log('Note not found.');
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
    }
};
export const retrieveAllNote = async () => {
    try {
        const encryptedNote = await SInfo.getAllItems({
            sharedPreferencesName: 'mySharedPrefs',
            keychainService: 'myKeychain'
        });
        console.log('ttttt retrieveAllNote', encryptedNote);
        if (encryptedNote) {
            return Platform.OS === 'ios'
                ? encryptedNote[0]
                : Object.entries(encryptedNote)?.map((secureItem) => {
                    const [key, value] = secureItem;
                    return { key: key, value: value };
                });
        } else {
            console.log('Note not found.');
        }
    } catch (error) {
        console.error('Error retrieving note:', error);
    }
};


export const encryptNote = (noteText: string) => {
    const encryptedNote = CryptoJS.AES.encrypt(noteText, encryptionKey).toString();
    return encryptedNote;
}

export const decryptNote = (encryptedNote: any) => {
    const decryptedNoteBytes = CryptoJS.AES.decrypt(encryptedNote, encryptionKey);
    const decryptedNote = decryptedNoteBytes.toString(CryptoJS.enc.Utf8);
    return decryptedNote;
}