import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {}
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {}
};
export const saveFavs = async (favIds) => {
  try {
    const jsonValue = JSON.stringify(favIds);
    await AsyncStorage.setItem("fav-ids", jsonValue);
  } catch (e) {
    console.log("Error saving favs:", e);
  }
};
export const getFavs = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("fav-ids");
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log("Error reading favs:", e);
    return [];
  }
};
