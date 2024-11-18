import InvoiceCompanyDetails from "./InvoiceCompanyDetails";
import InvoiceDateSection from "./InvoiceDateSection";
import InvoiceFormFooter from "./InvoiceFormFooter";
import InvoiceFormHead from "./InvoiceFormHead";
import InvoicePaymentInfo from "./InvoicePaymentInfo";
import InvoiceFromTable from "./InvoiceTable/InvoiceFormTable";
import InvoiceTo from "./InvoiceTo";

function InvoiceForm({ ref, register, errors, setTableItems, tableItems }) {
  return (
    <div ref={ref} className="invoice-form">
      <div className="invoice-form-content-box">
        <InvoiceFormHead />
        <div className="invoice-form-to-container">
          <InvoiceCompanyDetails register={register} errors={errors} />
          <InvoiceDateSection register={register} errors={errors} />
        </div>
        <div className="invoice-form-to-container">
          <InvoiceTo register={register} errors={errors} />
          <InvoicePaymentInfo register={register} errors={errors} />
        </div>
        <InvoiceFromTable
          register={register}
          errors={errors}
          setTableItems={setTableItems}
        />
        {tableItems?.length > 0 && tableItems[0]?.amount && (
          <InvoiceFormFooter
            register={register}
            errors={errors}
            tableItems={tableItems}
          />
        )}
      </div>
    </div>
  );
}

export default InvoiceForm;
