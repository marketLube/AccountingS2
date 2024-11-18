function InvoiceTo({ register, errors }) {
  return (
    <div className="invoice-form-from">
      <input
        type="text"
        placeholder="Your Company"
        className="invoice-input input-head"
        {...register("companyName2", { required: "Company Name is required" })}
      />
      {errors.companyName && <span>{errors.companyName.message}</span>}

      <input
        type="text"
        placeholder="Your Name"
        className="invoice-input"
        {...register("name2", { required: "Name is required" })}
      />
      {errors.contactName && <span>{errors.contactName.message}</span>}

      <input
        type="text"
        placeholder="GST"
        className="invoice-input"
        {...register("gst2", { required: "GST is required" })}
      />
      {errors.gst && <span>{errors.gst.message}</span>}

      <input
        type="text"
        placeholder="Address"
        className="invoice-input"
        {...register("address2", { required: "Address is required" })}
      />
      {errors.address && <span>{errors.address.message}</span>}

      <input
        type="text"
        placeholder="City"
        className="invoice-input"
        {...register("city2", { required: "City is required" })}
      />
      {errors.city && <span>{errors.city.message}</span>}

      <input
        type="text"
        placeholder="State"
        className="invoice-input"
        {...register("state2", { required: "State is required" })}
      />
      {errors.state && <span>{errors.state.message}</span>}

      <input
        type="text"
        placeholder="Country"
        className="invoice-input"
        {...register("country2", { required: "Country is required" })}
      />
      {errors.country && <span>{errors.country.message}</span>}
    </div>
  );
}

export default InvoiceTo;
