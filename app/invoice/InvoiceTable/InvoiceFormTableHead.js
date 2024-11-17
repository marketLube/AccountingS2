function InvoiceFormTableHead({ register, errors }) {
  return (
    <div className="invoice-form-table-head">
      <div className="invoice-form-table-item-box i-item-desc">
        <input
          className="invoice-table-head-item"
          {...register("itemDescription")}
          placeholder="Item Description"
        />
        {errors.itemDescription && (
          <span className="error-text">{errors.itemDescription.message}</span>
        )}
      </div>
      <div className="invoice-form-table-item-box i-qty">
        <input
          className="invoice-table-head-item"
          {...register("quantity")}
          placeholder="Qty"
        />
        {errors.quantity && (
          <span className="error-text">{errors.quantity.message}</span>
        )}
      </div>
      <div className="invoice-form-table-item-box i-rate">
        <input
          className="invoice-table-head-item"
          {...register("rate")}
          placeholder="Rate"
        />
        {errors.rate && (
          <span className="error-text">{errors.rate.message}</span>
        )}
      </div>
      <div className="invoice-form-table-item-box i-sgst">
        <input
          className="invoice-table-head-item"
          {...register("sgst")}
          placeholder="SGST"
        />
        {errors.sgst && (
          <span className="error-text">{errors.sgst.message}</span>
        )}
      </div>
      <div className="invoice-form-table-item-box i-cgst">
        <input
          className="invoice-table-head-item"
          {...register("cgst")}
          placeholder="CGST"
        />
        {errors.cgst && (
          <span className="error-text">{errors.cgst.message}</span>
        )}
      </div>
      <div className="invoice-form-table-item-box i-amount">
        <input
          className="invoice-table-head-item"
          {...register("amount")}
          placeholder="Amount"
        />
        {errors.amount && (
          <span className="error-text">{errors.amount.message}</span>
        )}
      </div>
    </div>
  );
}

export default InvoiceFormTableHead;
