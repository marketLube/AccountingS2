"use client";

import { useRef, useState } from "react";
import Button from "../_components/utils/Button";
import InvoiceForm from "./InvoiceForm";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useForm } from "react-hook-form";
import { today } from "../_services/helpers";
import BackButton from "../_components/utils/BackButton";
import { useDispatch } from "react-redux";
import { setIsInvoice } from "@/lib/slices/invoiceSlice";

function InvoiceDownloader() {
  const dispatch = useDispatch();
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
      gst: "",
      rate: "Rate",
      sgst: "SGST",
      cgst: "CGST",
      amount: "Amount",
      address: "",
      city: "",
      name: "",
      state: "",
      country: "",
      companyName: "Skymark",
      companyName2: "Bill To",
      receiverName: "",
      accountNumber: "",
      ifsc: "",
      branch: "",
      invoiceId: "",
      invoiceDate: "",
      invoiceDueDate: "",
      billtoGst: "",
      name2: "",
      gst2: "",
      address2: "",
      city2: "",
      state2: "",
      country2: "",
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
  console.log(tableItems, "tableItems");
  return (
    <div className="invoice-container">
      <div className="invoice-body">
        <InvoiceForm
          ref={formRef}
          register={register}
          errors={errors}
          setTableItems={setTableItems}
          tableItems={tableItems}
        />
        <div className="invoice-actions">
          <BackButton onClick={() => dispatch(setIsInvoice(false))} />
          <Button onClick={handleDownloadPdf}>Download Invoice</Button>
          <Button onClick={handleSubmit(onSubmit)}>Save invoice</Button>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDownloader;
