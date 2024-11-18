function InvoiceFormFooter({ tableItems }) {
  if (!tableItems?.length) return null;

  // Safely calculate total amount
  const total = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.amount) || 0),
    0
  );

  // Calculate total SGST percentage from table items
  const totalSgstPercent = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.sgst) || 0),
    0
  );

  // Calculate total CGST percentage from table items
  const totalCgstPercent = tableItems?.reduce(
    (acc, item) => acc + (parseFloat(item?.cgst) || 0),
    0
  );

  // Calculate GST amounts based on percentages
  const totalSgst = total * (totalSgstPercent / 100);
  const totalCgst = total * (totalCgstPercent / 100);

  // Calculate grand total
  const grandTotal = total + totalSgst + totalCgst;

  return (
    <div className="invoice-form-footer">
      <div></div>
      <div className="invoice-total-container">
        <div className="invoice-total-item">
          <label>Total Amount</label>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="invoice-total-item">
          <label>SGST</label>
          <span>
            ₹{totalSgst.toFixed(2)} ({totalSgstPercent.toFixed(2)}%)
          </span>
        </div>
        <div className="invoice-total-item">
          <label>CGST</label>
          <span>
            ₹{totalCgst.toFixed(2)} ({totalCgstPercent.toFixed(2)}%)
          </span>
        </div>
        <div className="invoice-all-sum">
          <strong>Grand Total:</strong>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceFormFooter;
