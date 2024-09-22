import React, { useState } from "react";
import OrderConfirmationModal from "../modal/ConfirmOrderModal";
import { useAppContext } from "../../context/Context";
import Card from "../card/Card";

export default function Cart() {
  const { state, dispatch } = useAppContext();
  const { cart } = state;

  console.log("your cart is ", cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const totalAmount = cart.reduce((acc, curr) => {
    return acc + curr.price * curr.qty;
  }, 0);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-1/3 h-fit bg-white rounded-2xl p-6">
      <p className="text-2xl font-bold text-amber-700">
        Your Cart ({cart.length})
      </p>

      <div className="mt-6 flex flex-col text-center font-medium">
        {/* ----------- cart products container-------- */}
        <div className="w-full flex flex-col gap-8">
          {cart.length > 0 ? (
            <>
              {cart.map((product) => (
                <div
                  key={product.id}
                  product={product}
                  className="w-full flex items-center gap-8"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="w-[70%] flex flex-col text-left">
                    <p className="text-lg font-semibold">{product.name}</p>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-amber-700 text-sm font-medium">
                        ${product.price}
                      </p>
                      <p className="text-sm text-amber-700 font-medium">
                        Qty: {product.qty}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <button
                        onClick={() =>
                          dispatch({ type: "REMOVE_ITEM", payload: product })
                        }
                        className="text-amber-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="w-full flex flex-col gap-2">
                <div className="w-full mt-6">
                  <p className="text-xl font-bold text-amber-700">
                    Total Amount: ${totalAmount}
                  </p>
                </div>

                <button
                  onClick={handleOpenModal}
                  className="bg-amber-700 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition-all duration-300"
                >
                  Place Order
                </button>
              </div>
            </>
          ) : (
            <p>Your cart is currently empty.</p>
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
