import React from "react";

const OrderConfirmationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white rounded-lg shadow-lg p-12 w-full max-w-screen-sm flex flex-col text-left">
        <div className="flex flex-col ">
          <h2 className="text-3xl font-bold mb-4">Order Confirmed </h2>
          <p className="text-sm font-medium text-amber-600">
            We hope you enjoyed shopping with us. Your order has been placed
            successfully!
          </p>
        </div>

        <button
          onClick={onClose}
          className="bg-orange-600 text-white text-lg font-semibold  px-4 py-3 rounded-full hover:bg-orange-700 transition-all duration-300 mt-12"
        >
          Start new order
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
