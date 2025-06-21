import ExcelJS from "exceljs";

const transactionFields = [
  "Particulars",
  "Purpose",
  "Date",
  "Type",
  "Bank",
  "Amount",
  "Remark",
  "Branch",
  "GST Type",
  "GST Amount",
  "TDS Type",
  "TDS",
];

export const downloadExcelReport = async (
  filteredTransaction,
  res,
  startDate,
  endDate
) => {
  try {
    // Create a new workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Transaction Report");

    // Set column widths
    worksheet.columns = [
      { header: "Particulars", key: "particular", width: 25 },
      { header: "Purpose", key: "purpose", width: 25 },
      { header: "Date", key: "date", width: 15 },
      { header: "Type", key: "type", width: 12 },
      { header: "Bank", key: "bank", width: 15 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Remark", key: "remark", width: 20 },
      { header: "Branch", key: "branch", width: 15 },
      { header: "GST Type", key: "gstType", width: 12 },
      { header: "GST Amount", key: "gstAmount", width: 12 },
      { header: "TDS Type", key: "tdsType", width: 12 },
      { header: "TDS", key: "tds", width: 12 },
    ];

    // Add title
    worksheet.mergeCells("A1:E1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "Transaction Report";
    titleCell.font = { size: 18, bold: true };
    titleCell.alignment = { horizontal: "center" };

    // Add date range
    worksheet.mergeCells("A2:E2");
    const dateRangeCell = worksheet.getCell("A2");
    dateRangeCell.value = `Date Range: ${startDate} to ${endDate}`;
    dateRangeCell.font = { size: 12 };
    dateRangeCell.alignment = { horizontal: "center" };

    // Add empty row
    worksheet.addRow([]);

    // Add headers with styling
    const headerRow = worksheet.addRow(transactionFields);
    headerRow.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "4472C4" },
      };
      cell.alignment = { horizontal: "center" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Initialize totals
    let totalCredit = 0;
    let totalDebit = 0;
    let currentRow = 5;

    // Add transaction data
    filteredTransaction.forEach((transaction) => {
      const row = worksheet.addRow([
        transaction.particular,
        transaction.purpose || "",
        transaction.formattedDate || transaction.date,
        transaction.type,
        transaction.bank,
        transaction.amount,
        transaction.remark || "",
        transaction.branches?.[0]?.branch?.name || transaction.branch,
        transaction.gstType === "excl"
          ? `${transaction.gstPercent}%`
          : transaction.gstType || "no-gst",
        transaction.gstAmount || "0%",
        transaction.tdsType === "no tds"
          ? "no-gst"
          : transaction.tdsType || "no-gst",
        transaction.tdsAmount || "0%",
      ]);

      // Add borders to data cells
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Color code based on transaction type
      if (transaction.type === "Credit") {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "C6EFCE" }, // Light green
        };
        totalCredit += transaction.amount;
      } else {
        row.getCell(4).fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFC7CE" }, // Light red
        };
        totalDebit += transaction.amount;
      }

      // Format amount cell
      row.getCell(6).numFmt = "#,##0.00";

      currentRow++;
    });

    // Add empty rows before totals
    worksheet.addRow([]);
    worksheet.addRow([]);

    // Add totals section
    const totalCreditRow = worksheet.addRow([
      "",
      "",
      "",
      "Total Credit:",
      totalCredit,
    ]);
    const totalDebitRow = worksheet.addRow([
      "",
      "",
      "",
      "Total Debit:",
      totalDebit,
    ]);
    const netBalanceRow = worksheet.addRow([
      "",
      "",
      "",
      "Net Balance:",
      totalCredit - totalDebit,
    ]);

    // Style totals section
    [totalCreditRow, totalDebitRow, netBalanceRow].forEach((row) => {
      row.getCell(4).font = { bold: true };
      row.getCell(5).font = { bold: true };
      row.getCell(5).numFmt = "#,##0.00";

      // Add borders to totals
      row.getCell(4).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      row.getCell(5).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    // Highlight net balance
    if (totalCredit - totalDebit > 0) {
      netBalanceRow.getCell(5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "C6EFCE" }, // Light green for positive balance
      };
    } else if (totalCredit - totalDebit < 0) {
      netBalanceRow.getCell(5).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFC7CE" }, // Light red for negative balance
      };
    }

    // Set response headers for Excel download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="transaction-report-${startDate}-to-${endDate}.xlsx"`
    );

    // Write to response
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel report:", error);
    res.status(500).json({
      status: "error",
      message: "Failed to generate Excel report",
      error: error.message,
    });
  }
};
