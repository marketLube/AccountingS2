import InvoiceCompanyDetails from "./InvoiceCompanyDetails";
import InvoiceDateSection from "./InvoiceDateSection";
import InvoiceFormFooter from "./InvoiceFormFooter";
import InvoiceFormHead from "./InvoiceFormHead";
import InvoiceFromTable from "./InvoiceTable/InvoiceFormTable";
import InvoiceTo from "./InvoiceTo";

function InvoiceForm({ ref, register, errors, setTableItems }) {
  return (
    <div ref={ref} className="invoice-form">
      <div className="invoice-form-content-box">
        <InvoiceFormHead />
        <div className="invoice-form-to-container">
          <InvoiceCompanyDetails register={register} errors={errors} />
          <InvoiceDateSection register={register} errors={errors} />
        </div>
        <InvoiceTo register={register} errors={errors} />
        <InvoiceFromTable
          register={register}
          errors={errors}
          setTableItems={setTableItems}
        />
        <InvoiceFormFooter register={register} errors={errors} />
      </div>
    </div>
  );
}

export default InvoiceForm;
