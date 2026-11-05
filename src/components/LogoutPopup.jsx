const LogoutPopup = ({ onCancel, onConfirm }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

      <div className="relative bg-white w-80 rounded-xl shadow-2xl p-6 text-center animate-fadeIn">
        <h2 className="text-lg font-semibold text-gray-800">Confirm Logout</h2>

        <p className="text-sm text-gray-500 mt-2">
          Are you sure you want to log out?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
