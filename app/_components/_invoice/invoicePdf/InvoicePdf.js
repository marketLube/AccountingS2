
const InvoicePdf = ({ data }) => {
    if (!data) return null;
  return (
    <div>
        <h1>{data.header}</h1>
      <p>Invoice Number: {data.invoice}</p>
      <p>Invoice Date: {data.date}</p>
      <p>Due Date: {data.DueDate}</p>
      <img src={data.imgData} alt="Invoice" />
    </div>
  )
}

export default InvoicePdf