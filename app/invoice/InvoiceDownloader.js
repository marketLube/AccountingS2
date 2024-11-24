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
import apiClient from "@/lib/axiosInstance";
import toast from "react-hot-toast";

function InvoiceDownloader() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
      invoiceDate: today(),
      invoiceDueDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .split("T")[0],
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
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("invoice.pdf");
  };

  const onSubmit = async (data) => {
    data.items = tableItems;
    try {
      setIsLoading(true);
      const res = await apiClient.post("/invoice", data);
      console.log(res, "res");
      toast.success("Success");
    } catch (e) {
      console.log(e, "e");
      toast.error("Failed");
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="invoice-actions-back-btn">
            <BackButton onClick={() => dispatch(setIsInvoice(false))} />
          </div>

          <div className="invoice-actions-btns">
            <Button
              onClick={handleSubmit(onSubmit)}
              style={isLoading ? { opacity: "0.5" } : { opacity: "1" }}
            >
              {!isLoading ? "Save invoice" : "Saving.."}
            </Button>
            <Button onClick={handleDownloadPdf}>Download Invoice</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceDownloader;
