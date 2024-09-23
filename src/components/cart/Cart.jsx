import React, { useState } from "react";
import OrderConfirmationModal from "../modal/ConfirmOrderModal";
import { useAppContext } from "../../context/Context";
import cartImage from "../../assets/cart.png";
export default function Cart() {
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  console.log("your cart is ", cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);

  const totalQuantity = cart.reduce((acc, curr) => {
    return acc + curr.qty;
  }, 0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch({ type: "EMPTY_CART" });
  };

  return (
    <div className="w-full p-6 bg-white h-fit rounded-2xl ">
      <p className="text-2xl font-bold text-amber-700">
        Your Cart ({totalQuantity})
      </p>

      <div className="flex flex-col mt-6 font-medium text-center">
        {/* ----------- cart products container-------- */}
        <div className="flex flex-col w-full gap-8">
          {cart.length > 0 ? (
            <>
              {cart.map((product) => (
                <div
                  key={product.id}
                  product={product}
                  className="flex items-center w-full gap-8"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-16 h-16 rounded-lg"
                  />
                  <div className="w-[70%] flex flex-col text-left">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-sm font-medium text-amber-700">
                        ${product.price}
                      </p>
                      <p className="text-sm font-medium text-amber-700">
                        Qty: {product.qty}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: product })
                        }
                        className="text-sm font-medium text-amber-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col w-full gap-2">
                <div className="w-full mt-6">
                  <p className="text-xl font-bold text-amber-700">
                    Total Amount: ₹{totalAmount}
                  </p>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="px-4 py-2 text-white transition-all duration-300 rounded-full bg-amber-700 hover:bg-amber-800"
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={cartImage} alt="cart" className="w-1/2 mx-auto" />
                <p>Your cart is currently empty.</p>
              </div>
            </>
          )}
        </div>

        <OrderConfirmationModal
          isOpen={isModalOpen}
          totalAmount={totalAmount}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}
