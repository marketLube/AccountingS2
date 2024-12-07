import React from "react";
import jsPDF from "jspdf";

const InvoicePdf = (invoiceData) => {
  const generatePDF = (doc) => {
    let yPosition = 20;

    // Add the logo if it exists
    if (invoiceData.logo) {
      const img = new Image();
      img.src = invoiceData.logo;
      img.onload = () => {
        doc.addImage(img, "PNG", 10, yPosition, 50, 30);
        yPosition += 40;

        // Continue with the PDF content
        addInvoiceContent(doc, invoiceData, yPosition);
      };
    } else {
      // Skip logo and directly add the rest of the content
      addInvoiceContent(doc, invoiceData, yPosition);
    }
  };

  const addInvoiceContent = (doc, invoiceData, yPosition) => {
    // Add the header and details
    doc.setFontSize(18);
    doc.text(invoiceData.header || "Invoice", 105, yPosition, { align: "center" });
    yPosition += 20;

    // Company details (Your company)
    doc.setFontSize(12);
    doc.text(`Your Company: ${invoiceData.yourCompany || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Your Name: ${invoiceData.yourName || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Company GSTIN: ${invoiceData.companyGstin || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Company Address: ${invoiceData.companyAddress || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${invoiceData.city || ""}, ${invoiceData.companySelectedState || ""}, ${invoiceData.companySelectedCountry || ""}`, 10, yPosition);
    yPosition += 20;

    // Bill To (Client details)
    doc.text("Bill To:", 10, yPosition);
    yPosition += 10;
    doc.text(`Client Company: ${invoiceData.clientCompany || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Client GSTIN: ${invoiceData.clientGstin || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Client Address: ${invoiceData.clientAddress || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${invoiceData.clientCity || ""}, ${invoiceData.clientState || ""}, ${invoiceData.clientCountry || ""}`, 10, yPosition);
    yPosition += 20;

    // Invoice details
    doc.text(`Invoice Number: ${invoiceData.invoice || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Date: ${invoiceData.date || ""}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Due Date: ${invoiceData.DueDate || ""}`, 10, yPosition);
    yPosition += 20;

    // Notes and terms
    doc.text("Notes:", 10, yPosition);
    yPosition += 10;
    doc.text(invoiceData.notes || "", 10, yPosition);
    yPosition += 20;

    doc.text("Terms and Conditions:", 10, yPosition);
    yPosition += 10;
    doc.text(invoiceData.terms || "", 10, yPosition);
    yPosition += 20;

    // Business and payment text
    doc.text("Business Text:", 10, yPosition);
    yPosition += 10;
    doc.text(invoiceData.businessText || "", 10, yPosition);
    yPosition += 20;

    doc.text("Payment Instructions:", 10, yPosition);
    yPosition += 10;
    doc.text(invoiceData.paymentText || "", 10, yPosition);

    // Save the PDF
    doc.save("invoice.pdf");
  };

  return { generatePDF };
};

export default InvoicePdf;
