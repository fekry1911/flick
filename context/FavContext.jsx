import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavContext = createContext();

export default function FavProvider({ children }) {
  const [allFav, setAllFav] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadFavs = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("fav-ids");
        if (jsonValue != null && mounted) {
          setAllFav(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.log("Error loading favs:", e);
      } finally {
        setIsReady(true);
      }
    };

    loadFavs();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const saveFavs = async () => {
      try {
        await AsyncStorage.setItem("fav-ids", JSON.stringify(allFav));
      } catch (e) {
        console.log("Error saving favs:", e);
      }
    };
    saveFavs();
  }, [allFav, isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <FavContext.Provider value={{ allFav, setAllFav }}>
      {children}
    </FavContext.Provider>
  );
}
