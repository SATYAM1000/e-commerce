import { ShoppingCart } from "lucide-react";
import { useAppContext } from "../../context/Context";
import toast from "react-hot-toast";
export default function Card({ product }) {
  const { dispatch, state } = useAppContext();
  const addProductToCart = () => {
    const isProductAlreadyInCart = state.cart.find(
      (item) => item.id === product.id
    );
    if (isProductAlreadyInCart) {
      if (isProductAlreadyInCart.qty >= product.maxPurchaseLimit) {
        toast.error("You've reached the maximum quantity for this product");
        return;
      }
    }
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success("Product added to cart");
  };
  return (
    <div className="w-full md:max-w-[300px] h-auto p-2 flex flex-col gap-3">
      {/* ----- image part---- */}
      <div className="w-full rounded-lg relative">
        <img
          src={product?.image}
          alt="image"
          className="w-full object-cover h-[250px] object-center rounded-xl"
        />
        <button
          onClick={() => {
            if (product?.isOutOfStock) {
              toast.error("Product is out of stock");
              return;
            }
            addProductToCart();
          }}
          className={`absolute bottom-0 left-1/2 translate-x-[-50%] translate-y-1/2 flex items-center gap-2 px-5 py-2.5 rounded-full  border border-orange-700/20 whitespace-nowrap hover:scale-110 transform-all duration-300 ${
            product?.isOutOfStock ? "bg-gray-100" : "bg-white"
          }`}
        >
          {product?.isOutOfStock ? (
            <span className="text-base font-medium">Out of Stock</span>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 stroke-orange-700" />
              <span className="text-base font-medium">Add to Cart</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 w-full flex flex-col gap-1">
        <p className="text-[13px] text-amber-800 font-medium">
          {product?.category}
        </p>

        <p className="text-xl font-bold text-amber-900">{product?.name}</p>
        <p className="font-semibold text-base text-amber-600">
          ${product?.price}
        </p>
      </div>
    </div>
  );
}
