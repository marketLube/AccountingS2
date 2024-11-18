function InvoicePaymentInfo({ register }) {
  return (
    <div className="invoice-form-payment">
      <div className="input-head">Payment Information</div>
      <input
        placeholder="Receiver Name"
        className="invoice-input"
        {...register("receiverName")}
      />
      <input
        placeholder="Account Number"
        className="invoice-input"
        {...register("accountNumber")}
      />
      <input
        placeholder="IFSC"
        className="invoice-input"
        {...register("ifsc")}
      />
      <input
        placeholder="Branch"
        className="invoice-input"
        {...register("branch")}
      />
    </div>
  );
}

export default InvoicePaymentInfo;
