import { useEffect, useRef, useState } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import InvoiceTable from "./InvoiceTable";
import Logo from '../../../../public/logo1.png';
import CountryDropdown from "../invoiceData/CountryDropdown";
import StateDropdown from "../invoiceData/StateDropdown";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from "@material-tailwind/react";
import InvoicePdf from "../invoicePdf/InvoicePdf";



const Invoice = () => {
  const [logo, setLogo] = useState(null); // To store the logo image URL
  const [imageError, setImageError] = useState(""); // To store error message if image is too large
  const [isUploaded, setIsUploaded] = useState(false);

  const [notes, setNotes] = useState("Notes");
  const [terms, setTerms] = useState("Terms and conditions");
  const [businessText, setBusinessText] = useState(
    "It was great doing business with you"
  );
  const [paymentText, setPaymentText] = useState(
    "Please make the payment by the due date"
  );
  const [header, setHeader] = useState("TAX INVOICE");
  const [invoice, setInvoice] = useState("#Invoice");
  const [date, setDate] = useState("Invoice Date");
  const [DueDate, setDueDate] = useState("Due Date");

  // Handlers for editable fields
  const handleNotesChange = (e) => setNotes(e.target.value);
  const handleTermsChange = (e) => setTerms(e.target.value);
  const handleheaderChange = (e) => setHeader(e.target.value);
  const handleInvoice = (e) => setInvoice(e.target.value);
  const handleDate = (e) => setDate(e.target.value);
  const handleDueDate = (e) => setDueDate(e.target.value);

  const invoiceDateInputRef = useRef(null); 
  const dueDateInputRef = useRef(null); 
  const calendarIconRefInvoice = useRef(null); 
  const calendarIconRefDue = useRef(null); 




  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const [selectedCountry, setSelectedCountry] = useState("India");

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    // Initialize flatpickr for both inputs
    flatpickr(invoiceDateInputRef.current, {
      dateFormat: "Y-m-d",
    });
    flatpickr(dueDateInputRef.current, {
      dateFormat: "Y-m-d",
    });

    // Set the current date as the default value
    const currentDate = new Date().toISOString().split("T")[0]; // Get current date in 'YYYY-MM-DD' format
    if (invoiceDateInputRef.current) {
      invoiceDateInputRef.current.value = currentDate; // Set the value of the invoice date input
    }

    // Open the calendar when clicking the calendar icon for Invoice Date
    if (calendarIconRefInvoice.current) {
      calendarIconRefInvoice.current.addEventListener("click", () => {
        invoiceDateInputRef.current._flatpickr.open(); // Open the calendar for Invoice Date
      });
    }

    // Open the calendar when clicking the calendar icon for Due Date
    if (calendarIconRefDue.current) {
      calendarIconRefDue.current.addEventListener("click", () => {
        dueDateInputRef.current._flatpickr.open(); // Open the calendar for Due Date
      });
    }

    // Clean up event listeners on component unmount
    return () => {
      if (calendarIconRefInvoice.current) {
        calendarIconRefInvoice.current.removeEventListener("click", () => {});
      }
      if (calendarIconRefDue.current) {
        calendarIconRefDue.current.removeEventListener("click", () => {});
      }
    };
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
  
    const invoiceData = {
      notes,
      terms,
      businessText,
      paymentText,
      header,
      invoice,
      date,
      DueDate
    };
  
    // Save invoice data to localStorage
    localStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  
    // Generate PDF
    const doc = new jsPDF();
  
    doc.text(`Invoice Number: ${invoiceData.invoice}`, 10, 10);
    doc.text(`Date: ${invoiceData.date}`, 10, 20);
    doc.text(`Due Date: ${invoiceData.DueDate}`, 10, 30);
    doc.text(`Notes: ${invoiceData.notes}`, 10, 40);
    doc.text(`Terms: ${invoiceData.terms}`, 10, 50);
    doc.text(`Business Text: ${invoiceData.businessText}`, 10, 60);
    doc.text(`Payment Text: ${invoiceData.paymentText}`, 10, 70);
  
    // Save PDF to disk
    doc.save('invoice.pdf');
  
    // Navigate to the display page
    // navigate('/display');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Get the file

    if (file) {
      const fileSize = file.size / 1024 / 1024; // Convert size to MB

      // Check if the file size is greater than 1MB
      if (fileSize > 1) {
        setImageError("File size must be less than 1MB");
        setIsUploaded(false); // Set uploaded flag to false
        setLogo(null); // Clear the logo URL state
      } else {
        setImageError(""); // Clear any previous errors
        setLogo(URL.createObjectURL(file)); // Set the logo image URL
        setIsUploaded(true); // Set uploaded flag to true
      }
    }
  };

  
  const cardRef = useRef(null);
  const downloadCardAsPDF = async () => {
    if (cardRef.current) {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });

      // Get the actual width and height of the card
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;

      // Convert the width and height to mm (for jsPDF)
      const cardWidthInMM = (cardWidth * 25.4) / 96; // 1px = 25.4/96 mm
      const cardHeightInMM = (cardHeight * 25.4) / 96;

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: cardWidthInMM > cardHeightInMM ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [cardWidthInMM, cardHeightInMM], // Set PDF size to match card dimensions
      });

      pdf.addImage(imgData, 'PNG', 0, 0, cardWidthInMM, cardHeightInMM);
      pdf.save('card.pdf');
    }
  };


  return (
    <>
      <div className="flex justify-between items-center ">
        <button onClick={downloadCardAsPDF} >Download PDF</button>
        <form className="invoice p-4" onSubmit={handleSubmit}>
          <div className="flex mb-2">
            {isUploaded && logo ? (
              <div className="flex items-center justify-center">
                <img
                  src={logo}
                  alt="Uploaded Logo"
                  className="w-[80px] h-[80px] object-cover"
                />
              </div>
            ) : (
              <label
                htmlFor="dropzone-file"
                className="items-center justify-center w-[129.24px] h-[86.2px] border-gray-300 border-[1px dashed] rounded-lg cursor-pointer dark:border-gray- bg-[#fbfcff]"
                style={{ border: "1px dashed #dbe8fd" }}
              >
                <div className="pb-4 text-center mt-1">
                  <div className="flex flex-col items-center">
                    {/* Check if the logo exists, else show the default placeholder */}
                    <img
                      src={Logo ? Logo : "path/to/default-logo.png"}
                      alt="Logo"
                      className="w-[80px]"
                    />
                    <div className="text-[#5B9AFE] font-zoho font-semibold">
                      Upload
                    </div>
                  </div>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload} // Trigger the image upload handler
                />
              </label>
            )}

            {/* Conditionally render the upload instructions and error message */}
            {!isUploaded && (
              <div className="ml-4 mt-[19px] m-[15px_20px]">
                <div className="text-[14px] text-[#333333]">Upload Logo</div>
                <div className="text-[10px] text-[#676767] p-[5px_0px_0px]">
                  240 x 240 pixels @ 72 DPI, <br /> Maximum size of 1MB
                </div>
              </div>
            )}

            {/* Display the error message if the image size is too large */}
            {imageError && (
              <p className="text-red-500 text-sm mt-2">{imageError}</p>
            )}
            <div className="flex items-center w-[8px] h-[106.2px] ml-3">
              <input
                type="text"
                value={header}
                onChange={handleheaderChange}
                className="flex fle mx-[27px] mb-[2px] 
                          border-none bg-transparent outline-none text-inherit 
                            focus:ring-1 focus:ring-[#5B9AFF] 
                          hover:ring-1 rounded-[5px] text-[50px] text-[#333333]  mt-4"
              />
            </div>
          </div>

          {/* INPUT SECTION OF THE COMPANY */}
          <div className="w-[647.06px] h-[216px] mb-14">
            <div className="w-full flex flex-wrap">
              <input
                type="text"
                placeholder="Your Company"
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-your-company"
              />
              <input
                type="text"
                placeholder="Your Name"
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-your-name"
              />
              <input
                type="text"
                placeholder="Company's GSTIN"
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-gstin"
              />
              <input
                type="text"
                placeholder="Company's Address"
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-address"
              />
              <input
                type="text"
                placeholder="City"
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-city"
              />

              <CountryDropdown
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
              />
              <StateDropdown
                country={selectedCountry}
                state={selectedState}
                onChange={handleStateChange}
                className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
              />
            </div>
          </div>

          {/*END  INPUT SECTION OF THE COMPANY */}

          {/* USER INPUT SECTION */}
          <div className="w-[647.06px] h-[191px] flex">
            {/* Left Side Inputs */}
            <div className="w-1/2">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Bill To"
                  className=" w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#000] input-country font-bold"
                />
                <input
                  type="text"
                  placeholder="Your Client's Company"
                  className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
                />
                <input
                  type="text"
                  placeholder="Client's GSTIN"
                  className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
                />
                <input
                  type="text"
                  placeholder="Client's Address"
                  className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
                />
                {/* <input
              type="text"
              placeholder="State"
              className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
            /> */}
                {/* <input
              type="text"
              placeholder="India"
              className="w-[350px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] input-country"
            /> */}
                <CountryDropdown
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  className="mr-0"
                />
                <StateDropdown
                  country={selectedCountry}
                  state={selectedState}
                  onChange={handleStateChange}
                />
              </div>
            </div>

            {/* Right Side Inputs */}
            <div className="w-1/2 pl-6">
              <div className="flex flex-col space-y-4">
                {/* Row 1: Invoice# and Current Date */}
                <div className="flex space-x-4 ">
                  <input
                    type="text"
                    value={invoice}
                    onChange={handleInvoice}
                    className="font-bold text-[#524f4ffe] w-[150px] p-[2px] rounded-[3px] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 text-bold"
                  />
                  <input
                    type="text"
                    placeholder="INV 12"
                    value="INV-12"
                    className="w-[150px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                    readOnly
                  />
                </div>
                {/* Row 2: Invoice Date and Calendar Icon */}
                <div className="flex space-x-4">
                  <input
                    ref={invoiceDateInputRef}
                    type="text"
                    value={date}
                    onChange={handleDate}
                    className="font-bold text-[#524f4ffe] w-[150px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                  />
                  <div className="relative">
                    <input
                      ref={invoiceDateInputRef}
                      type="text"
                      placeholder="Select Date"
                      className="w-[150px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                    <span
                      ref={calendarIconRefInvoice}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 12.586l2.293-3.293a1 1 0 111.414 1.414l-3 4a1 1 0 01-1.414 0l-3-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Row 3: Due Date and Calendar Icon */}
                <div className="flex space-x-4">
                  <input
                    ref={dueDateInputRef}
                    type="text"
                    value={DueDate}
                    onChange={handleDueDate}
                    className="font-bold text-[#524f4ffe] w-[150px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                  />
                  <div className="relative">
                    <input
                      ref={dueDateInputRef}
                      type="text"
                      placeholder="Select Date"
                      className="w-[150px] p-[2px] rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
                      defaultValue={new Date().toISOString().split("T")[0]}
                    />
                    <span
                      ref={calendarIconRefDue}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.293 9.293a1 1 0 011.414 0L10 12.586l2.293-3.293a1 1 0 111.414 1.414l-3 4a1 1 0 01-1.414 0l-3-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END USER INPUT SECTION */}
          <InvoiceTable />

          {/* Editable Notes Field */}
          <div className="form-group mb-1 -mt-64">
            <input
              type="text"
              id="notes"
              value={notes}
              onChange={handleNotesChange}
              className="text-[#333333] text-[15px] font-semibold rounded-[2px]  border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] h-[25px] editable-input w-full p-2  "
            />
          </div>

          {/* Resizable Business Text Field */}
          <div className="form-group mb-4">
            <textarea
              id="businessText"
              value={businessText}
              onChange={(e) => setBusinessText(e.target.value)}
              className="text-[13px] h-[48px] resizable-input w-full p-2  rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] resize-y"
              rows="3"
            />
          </div>

          {/* Editable Terms Field */}
          <div className="text-[#333333] text-[15px] font-semibold ">
            <input
              type="text"
              id="terms"
              value={terms}
              onChange={handleTermsChange}
              className="h-[25px] editable-input w-full p-2  rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767]"
            />
          </div>

          {/* Resizable Payment Text Field */}
          <div className="form-group mb-4">
            <textarea
              id="paymentText"
              value={paymentText}
              onChange={(e) => setPaymentText(e.target.value)}
              className="text-[13px] h-[48px] resizable-input w-full p-2  rounded-[3px] text-[#615454] border-none bg-transparent outline-none text-inherit focus:ring-1 focus:ring-[#5B9AFF] hover:ring-1 placeholder:text-[#676767] resize-y"
              rows="3"
            />

          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Invoice;
