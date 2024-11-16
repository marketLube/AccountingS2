function InvoiceDateSection() {
  return (
    <div className="invoice-form-to-date">
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-id">Invoice #</label>
        <input id="invoice-id" placeholder="Enter Invoice ID" />
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-date">Invoice Date</label>
        <input id="invoice-date" type="date" />
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-due-date">Due Date</label>
        <input id="invoice-due-date" type="date" />
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-gst">GST</label>
        <input id="invoice-gst" type="text" placeholder="GST" />
      </div>
    </div>
  );
}

export default InvoiceDateSection;
