"use client";

import { useState } from "react";
import InvoiceFormTableHead from "./InvoiceFormTableHead";
import InvoiceTableItems from "./InvoiceTableItems";

function InvoiceFromTable() {
  const [items, setItems] = useState([{ id: 1 }]); // Initialize items as an array of objects

  // Function to add more items
  const handleAddMore = () => {
    setItems((prevItems) => [...prevItems, { id: prevItems.length + 1 }]);
  };

  // Function to remove an item by index
  const handleRemove = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="invoice-form-table-container  bg-white rounded-lg shadow-md">
      <InvoiceFormTableHead />
      <div className="invoice-form-table-itemContainer">
        {items.map((item, index) => (
          <InvoiceTableItems
            key={item.id}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>

      <button
        onClick={handleAddMore}
        className="mt-4 mb-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 ease-in-out"
      >
        Add More
      </button>
    </div>
  );
}

export default InvoiceFromTable;
