import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "./CartReducer";
const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await fetch(
          "https://run.mocky.io/v3/7c54e42a-d8ef-4fbe-a117-463eb86e75fb"
        );

        const data = await response.json();

        if (data.success) {
          setAllProducts(data.products);
        }
      } catch (error) {
        console.log("Error while fetching data from server", error);
      } finally {
        setLoading(false);
      }
    };
    getAllProducts();
  }, []);

  const [state, dispatch] = useReducer(cartReducer, {
    allProducts: allProducts,
    cart: [],
  });

  return (
    <AppContext.Provider
      value={{ loading, setLoading, allProducts, state, dispatch }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  return context;
};

export { AppProvider, useAppContext };
