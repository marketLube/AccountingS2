// InvoiceTableItems.jsx
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function InvoiceTableItems({ onRemove, index, updateTableItem }) {
  const [isRemove, setIsRemove] = useState(false);

  // Define state for each field
  const [desc, setDesc] = useState("");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [sgst, setSgst] = useState("");
  const [cgst, setCgst] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    updateTableItem(index, {
      desc,
      qty,
      rate,
      sgst,
      cgst,
      amount,
    });
  }, [desc, qty, rate, sgst, cgst, amount, index, updateTableItem]);

  return (
    <div
      className="invoice-form-table-item-content"
      onMouseEnter={() => setIsRemove(true)}
      onMouseLeave={() => setIsRemove(false)}
    >
      <div className="invoice-form-table-item-box i-item-desc">
        <textarea
          className="invoice-table-head-item"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Item Description"
        />
      </div>
      <div className="invoice-form-table-item-box i-qty">
        <input
          className="invoice-table-head-item"
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          placeholder="Qty"
        />
      </div>
      <div className="invoice-form-table-item-box i-rate">
        <input
          className="invoice-table-head-item"
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          placeholder="Rate"
        />
      </div>
      <div className="invoice-form-table-item-box i-sgst">
        <input
          className="invoice-table-head-item"
          type="number"
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
          placeholder="SGST"
        />
      </div>
      <div className="invoice-form-table-item-box i-cgst">
        <input
          className="invoice-table-head-item"
          type="number"
          value={cgst}
          onChange={(e) => setCgst(e.target.value)}
          placeholder="CGST"
        />
      </div>
      <div className="invoice-form-table-item-box i-amount">
        <input
          className="invoice-table-head-item"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
        />
      </div>
      {isRemove && (
        <RxCross2
          className="icons"
          color="red"
          onClick={onRemove}
          size="16px"
        />
      )}
    </div>
  );
}

export default InvoiceTableItems;
