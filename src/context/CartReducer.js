export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingProduct = state.cart.find(
        (c) => c.id === action.payload.id
      );
      if (existingProduct) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((c) =>
          c.id === action.payload.id ? (c.qty = action.payload.qty) : c.qty
        ),
      };

    case "EMPTY_CART":
      return { ...state, cart: [] };
    case "INCREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
        ),
      };
    case "DECREMENT":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.payload.id ? { ...item, qty: item.qty - 1 } : item
        ),
      };
      case "REMOVE_ITEM":
        return {
          ...state,
          cart: state.cart.filter((item) => item.id !== action.payload.id),
        };
          
    default:
      return state;
  }
};
