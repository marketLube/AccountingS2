function InvoiceFormFooter() {
  return (
    <div className="invoice-form-footer">
      <div></div>
      <div className="invoice-total-container">
        <div className="invoice-total-item">
          <label>Total</label>
          <span>938589.29</span>
        </div>
        <div className="invoice-total-item">
          <label>SGST</label>
          <span>927538</span>
        </div>
        <div className="invoice-total-item">
          <label>CGST</label>
          <span>927538</span>
        </div>
      </div>
    </div>
  );
}

export default InvoiceFormFooter;
