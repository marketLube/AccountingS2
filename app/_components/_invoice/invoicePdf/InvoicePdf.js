import React, { useRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const InvoicePdf = React.forwardRef((_, ref) => {
  const cardRef = useRef(null);

  // Expose downloadPDF function to the parent via ref
  useImperativeHandle(ref, () => ({
    downloadPDF: async () => {
      if (cardRef.current) {
        const canvas = await html2canvas(cardRef.current, { scale: 2 });

        const cardWidth = cardRef.current.offsetWidth;
        const cardHeight = cardRef.current.offsetHeight;

        const cardWidthInMM = (cardWidth * 25.4) / 96; // Convert px to mm
        const cardHeightInMM = (cardHeight * 25.4) / 96; // Convert px to mm

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: cardWidthInMM > cardHeightInMM ? "landscape" : "portrait",
          unit: "mm",
          format: [cardWidthInMM, cardHeightInMM], // PDF size should match card dimensions
        });

        pdf.addImage(imgData, "PNG", 0, 0, cardWidthInMM, cardHeightInMM);
        pdf.save("invoice.pdf");
      }
    },
  }));

  return (
    <div>
      {/* This div will contain the invoice details and is the content to be converted to a PDF */}
      <div ref={cardRef}>
        <h1>TAX INVOICE</h1>
        <p>Notes: Some notes about the invoice</p>
        <p>Terms: Some terms and conditions</p>
        {/* Add all other fields you need to render in the PDF here */}
      </div>
    </div>
  );
});


export default InvoicePdf