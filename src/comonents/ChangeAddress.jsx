import { useState } from "react";

function ChangeAddress({ setAddress, setIsModalOpen }) {
  const [newAddress, setNewAddress] = useState("");

  function onClose(){
 setAddress(newAddress)
 setIsModalOpen(false);
  }
  return (
    <div>
      <input
        type="text"
        placeholder="Enter new address"
        onChange={(e) => setNewAddress(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
        >
          Cancel
        </button>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white py-2 px-4 rounded "
        >
          {" "}
          Save Address
        </button>
      </div>
    </div>
  );
}

export default ChangeAddress;
