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
import InvoiceDownldForm from "./InvoiceDownldForm";

function InvoiceDownloader() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    watch,
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
  const data = watch();
  const formRef = useRef();
  const [tableItems, setTableItems] = useState([]);
  const downloadRef = useRef(null);
  // const handleDownloadPdf = async (data) => {
  //   console.log(data, "000000");
  //   // const element = formRef.current;

  //   // // Capture the component as a canvas
  //   // const canvas = await html2canvas(element);
  //   // const data = canvas.toDataURL("image/png");

  //   // // Create a new PDF document
  //   // const pdf = new jsPDF("p", "mm", "a4");
  //   // const imgWidth = 210;
  //   // const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //   // pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
  //   // pdf.save("invoice.pdf");
  // };
  const handleDownloadPdf = async () => {
    const element = downloadRef.current;
    if (!element) return;

    element.style.display = "block"; // Make sure the element is visible for rendering

    try {
      // Capture the content of the component as a canvas
      const canvas = await html2canvas(element, {
        scale: 2, // Increase resolution for better image quality
        useCORS: true, // Allow cross-origin images
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const pdf = new jsPDF("p", "mm", "a4");

      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;

      // Calculate the height of the image after scaling
      const imgHeight = (pdfWidth / canvasWidth) * canvasHeight;

      let position = 0; // Track the position on the page

      // First page
      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, imgHeight);

      position += pdfHeight;

      // Add subsequent pages if the content overflows
      while (position < imgHeight) {
        const remainingHeight = imgHeight - position;

        // Add the remaining content to the next page
        pdf.addImage(
          imgData,
          "JPEG",
          0,
          0,
          pdfWidth,
          Math.min(pdfHeight, remainingHeight)
        );

        position += pdfHeight; // Move to the next page
        if (position < imgHeight) {
          pdf.addPage(); // Only add a new page if there's more content
        }
      }

      pdf.save("invoice.pdf"); // Save the PDF
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      element.style.display = "none"; // Hide the element after rendering
    }
  };

  const onSubmit = async (data) => {
    console.log(data, ".........");
    data.items = tableItems;
    try {
      setIsLoading(true);
      const res = await apiClient.post("/invoice", data);

      toast.success("Success");
    } catch (e) {
      console.log(e, "e");
      toast.error("Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
      <div ref={downloadRef}>
        <InvoiceDownldForm data={data} tableItems={tableItems} />
      </div>
    </>
  );
}

export default InvoiceDownloader;
