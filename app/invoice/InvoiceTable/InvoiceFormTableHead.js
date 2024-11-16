function InvoiceFormTableHead() {
  return (
    <div className="invoice-form-table-head">
      <div className="invoice-form-table-item-box i-item-desc">
        <input className="invoice-table-head-item" />
      </div>
      <div className="invoice-form-table-item-box i-qty">
        <input className="invoice-table-head-item" />
      </div>
      <div className="invoice-form-table-item-box i-rate">
        <input className="invoice-table-head-item" />
      </div>
      <div className="invoice-form-table-item-box i-sgst">
        <input className="invoice-table-head-item" />
      </div>
      <div className="invoice-form-table-item-box i-cgst">
        <input className="invoice-table-head-item" />
      </div>
      <div className="invoice-form-table-item-box i-amount">
        <input className="invoice-table-head-item " />
      </div>
    </div>
  );
}

export default InvoiceFormTableHead;
