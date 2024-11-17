"use client";

import { useRef, useState } from "react";
import Button from "../_components/utils/Button";
import InvoiceForm from "./InvoiceForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useForm } from "react-hook-form";
import { today } from "../_services/helpers";

function InvoiceDownloader() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      date: today(),
      itemDescription: "Item Description",
      quantity: "Qty",
      rate: "Rate",
      sgst: "SGST",
      cgst: "CGST",
      amount: "Amount",
      companyName2: "Bill To",
    },
  });
  const formRef = useRef();
  const [tableItems, setTableItems] = useState([]);
  const handleDownloadPdf = async () => {
    const element = formRef.current;

    // Capture the component as a canvas
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    // Create a new PDF document
    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };

  const onSubmit = async (data) => {
    data.items = tableItems;
    console.log(data, "data");
  };

  return (
    <div className="invoice-container">
      <div className="invoice-body">
        <InvoiceForm
          ref={formRef}
          register={register}
          errors={errors}
          setTableItems={setTableItems}
        />
        <div className="invoice-actions">
          <Button onClick={handleDownloadPdf}>Download Invoice</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save invoice</Button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDownloader;
