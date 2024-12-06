const InvoicePdf = ({ invoiceData, onClose }) => {
  const handleDownloadPdf = () => {
    const doc = new jsPDF();
    doc.text(`Invoice Number: ${invoiceData.invoice}`, 10, 10);
    doc.text(`Date: ${invoiceData.date}`, 10, 20);
    doc.text(`Due Date: ${invoiceData.DueDate}`, 10, 30);
    doc.text(`Notes: ${invoiceData.notes}`, 10, 40);
    doc.text(`Terms: ${invoiceData.terms}`, 10, 50);
    doc.text(`Business Text: ${invoiceData.businessText}`, 10, 60);
    doc.text(`Payment Text: ${invoiceData.paymentText}`, 10, 70);
    doc.save('invoice.pdf');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-xl font-bold mb-4">Invoice Details</h2>
        <div>
          <p><strong>Invoice Number:</strong> {invoiceData.invoiceNumber}</p>
          <p><strong>Date:</strong> {invoiceData.date}</p>
          <p><strong>Due Date:</strong> {invoiceData.dueDate}</p>
          <p><strong>Notes:</strong> {invoiceData.notes}</p>
          <p><strong>Terms:</strong> {invoiceData.terms}</p>
          <p><strong>Business Text:</strong> {invoiceData.businessText}</p>
          <p><strong>Payment Text:</strong> {invoiceData.paymentText}</p>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={handleDownloadPdf} className="bg-blue-500 text-white py-2 px-4 rounded mr-2">
            Download PDF
          </button>
          <button onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export default InvoicePdf;