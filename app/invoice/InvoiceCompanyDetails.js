import { useSelector } from "react-redux";

function InvoiceCompanyDetails({ register, errors }) {
  return (
    <div className="invoice-form-from">
      {/* Company Name */}
      <input
        type="text"
        {...register("companyName")}
        className={`invoice-input input-head ${
          errors.companyName ? "input-error" : ""
        }`}
        placeholder="Your Company"
      />
      {errors.companyName && (
        <span className="error-text">{errors.companyName.message}</span>
      )}

      {/* Client Name */}
      <input
        type="text"
        {...register("name")}
        className={`invoice-input ${errors.name ? "input-error" : ""}`}
        placeholder="Your Name"
      />
      {errors.name && <span className="error-text">{errors.name.message}</span>}

      {/* GST */}
      <input
        type="text"
        {...register("gst")}
        className={`invoice-input ${errors.gst ? "input-error" : ""}`}
        placeholder="GST"
      />
      {errors.gst && <span className="error-text">{errors.gst.message}</span>}

      {/* Address */}
      <input
        type="text"
        {...register("address")}
        className={`invoice-input ${errors.address ? "input-error" : ""}`}
        placeholder="Address"
      />
      {errors.address && (
        <span className="error-text">{errors.address.message}</span>
      )}

      {/* City */}
      <input
        type="text"
        {...register("city")}
        className={`invoice-input ${errors.city ? "input-error" : ""}`}
        placeholder="City"
      />
      {errors.city && <span className="error-text">{errors.city.message}</span>}

      {/* State */}
      <input
        type="text"
        {...register("state")}
        className={`invoice-input ${errors.state ? "input-error" : ""}`}
        placeholder="State"
      />
      {errors.state && (
        <span className="error-text">{errors.state.message}</span>
      )}

      {/* Country */}
      <input
        type="text"
        {...register("country")}
        className={`invoice-input ${errors.country ? "input-error" : ""}`}
        placeholder="Country"
      />
      {errors.country && (
        <span className="error-text">{errors.country.message}</span>
      )}
    </div>
  );
}

export default InvoiceCompanyDetails;
