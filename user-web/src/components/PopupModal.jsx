import logo from "../assets/logo.jpeg";
import { CheckCircle, XCircle } from "lucide-react";

const PopupModal = ({ type = "success", message, onClose }) => {
  if (!message) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl px-10 py-8 max-w-sm w-full mx-4 text-center animate-fade-in">

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="Logo" className="h-20 object-contain" />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {isSuccess ? (
            <CheckCircle size={64} className="text-green-500" />
          ) : (
            <XCircle size={64} className="text-red-500" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-2">
          {isSuccess ? "Success!" : "Oops!"}
        </h2>

        {/* Message */}
        <p className="text-gray-500 text-sm mb-6">{message}</p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className={`w-full py-2.5 rounded-lg text-white font-semibold transition
            ${isSuccess ? "bg-green-500 hover:bg-green-600" : "bg-red-600 hover:bg-black"}`}
        >
          {isSuccess ? "Continue" : "Try Again"}
        </button>

      </div>
    </div>
  );
};

export default PopupModal;