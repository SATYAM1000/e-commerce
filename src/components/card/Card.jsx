import { CircleMinus, CirclePlus, ShoppingCart } from "lucide-react";
import { useAppContext } from "../../context/Context";
import toast from "react-hot-toast";

export default function Card({ product }) {
  const { dispatch, state } = useAppContext();

  // Find the product in the cart
  const productInCart = state.cart.find((item) => item.id === product.id);
  const productQuantity = productInCart ? productInCart.qty : 0; 

  // Add product to cart
  const addProductToCart = () => {
    if (productQuantity >= product.maxPurchaseLimit) {
      toast.error("You've reached the maximum quantity for this product");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Product added to cart");
  };

  // Increment product quantity
  const incrementProduct = () => {
    if (productQuantity >= product.maxPurchaseLimit) {
      toast.error("You've reached the maximum quantity for this product");
      return;
    }
    dispatch({ type: "INCREMENT", payload: product });
  };

  // Decrement product quantity
  const decrementProduct = () => {
    if (productQuantity === 1) {
      dispatch({ type: "REMOVE_ITEM", payload: product }); // Remove product from cart if quantity is 1
    } else {
      dispatch({ type: "DECREMENT", payload: product });
    }
  };

  return (
    <div className="w-full md:max-w-[300px] h-auto p-2 flex flex-col gap-3">
      {/* ----- image part---- */}
      <div className="relative w-full rounded-lg">
        <img
          src={product?.image}
          alt="image"
          className="w-full object-cover h-[250px] object-center rounded-xl"
        />
        <div
          className={`absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full border border-orange-700/20 whitespace-nowrap hover:scale-110 transform-all duration-300 ${
            product?.isOutOfStock ? "bg-gray-100" : "bg-white"
          }`}
        >
          {productInCart ? (
            <button className="flex items-center justify-between w-full gap-6">
              <CircleMinus
                onClick={decrementProduct}
                className="cursor-pointer stroke-amber-600"
              />
              <span>{productQuantity}</span>{" "}
              {/* Show actual quantity in cart */}
              <CirclePlus
                onClick={incrementProduct}
                className="cursor-pointer stroke-amber-600"
              />
            </button>
          ) : (
            <button
              onClick={addProductToCart}
              className="flex items-center justify-between w-full gap-4"
            >
              <ShoppingCart className="w-5 h-5 stroke-orange-700" />
              <span className="text-base font-medium">Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full gap-1 mt-6">
        <p className="text-[13px] text-amber-800 font-medium">
          {product?.category}
        </p>

        <p className="text-xl font-bold text-amber-900">{product?.name}</p>
        <p className="text-base font-semibold text-amber-600">
          ₹{product?.price}
        </p>
      </div>
    </div>
  );
}
