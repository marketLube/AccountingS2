import { RxCross2 } from "react-icons/rx";

function InvoiceTableItems({ onRemove }) {
  return (
    <div className="invoice-form-table-item flex items-center justify-between p-2 border rounded">
      <div>Item</div>

      <RxCross2 className="icons" color="red" onClick={onRemove} />
    </div>
  );
}

export default InvoiceTableItems;
