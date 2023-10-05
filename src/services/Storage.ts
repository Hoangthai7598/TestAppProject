import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error('Error storing data: ', error);
    }
};

export const retrieveData = async (key: string) => {
    try {
        const data = await AsyncStorage.getItem('key');
        if (data !== null) {
            return data
        } else {
            return null
        }
    } catch (error) {
        console.error('Error retrieving data: ', error);
    }
};
