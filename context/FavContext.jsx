import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavContext = createContext();

export default function FavProvider({ children }) {
  const [allFav, setAllFav] = useState([]);

  useEffect(() => {
    const loadFavs = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fav-ids");
        if (jsonValue != null) {
          setAllFav(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log("Error loading favs:", e);
      }
    };
    loadFavs();
  }, []);

  useEffect(() => {
    const saveFavs = async () => {
      try {
        const jsonValue = JSON.stringify(allFav);
        await AsyncStorage.setItem("fav-ids", jsonValue);
      } catch (e) {
        console.log("Error saving favs:", e);
      }
    };
    saveFavs();
  }, [allFav]);

  return (
    <FavContext.Provider value={{ allFav, setAllFav }}>
      {children}
    </FavContext.Provider>
  );
}
