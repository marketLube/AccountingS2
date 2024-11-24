function InvoiceDateSection({ register, errors }) {
  return (
    <div className="invoice-form-to-date">
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-id">Invoice #</label>
        <input
          id="invoice-id"
          placeholder="Enter Invoice ID"
          {...register("invoiceId")}
        />
        {errors.invoiceId && <span>{errors.invoiceId.message}</span>}
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-date">Invoice Date</label>
        <input id="invoice-date" type="date" {...register("invoiceDate")} />
        {errors.invoiceDate && <span>{errors.invoiceDate.message}</span>}
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-due-date">Due Date</label>
        <input
          id="invoice-due-date"
          type="date"
          {...register("invoiceDueDate")}
        />
        {errors.invoiceDueDate && <span>{errors.invoiceDueDate.message}</span>}
      </div>
      <div className="invoice-form-to-input-container">
        <label htmlFor="invoice-gst">GST</label>
        <input
          id="invoice-gst"
          type="text"
          placeholder="GST"
          {...register("billtoGst")}
        />
        {errors.billtoGst && <span>{errors.billtoGst.message}</span>}
      </div>
    </div>
  );
}

export default InvoiceDateSection;
