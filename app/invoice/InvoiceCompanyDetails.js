function InvoiceCompanyDetails() {
  return (
    <div className="invoice-form-from">
      <input
        type="text"
        value="Your Company"
        className="invoice-input input-head"
      />
      <input type="text" value="Your Name" className="invoice-input" />
      <input type="text" value="GST" className="invoice-input" />
      <input type="text" value="Address" className="invoice-input" />
      <input type="text" value="City" className="invoice-input" />
      <input type="text" value="State" className="invoice-input" />
      <input type="text" value="Country" className="invoice-input" />
    </div>
  );
}

export default InvoiceCompanyDetails;
