export const gstCalculator = (transaction) => {
  const gstPercent = parseFloat(transaction.gstPercent.replace("%", "")); // Convert "18%" to 0.18
  const { gstType, amount } = transaction;
  const validAmount = parseFloat(amount);
  if (!amount || !gstType || isNaN(gstPercent)) {
    throw new Error("Invalid transaction data for GST calculation.");
  }

  let gstAmount = 0;

  if (gstType === "incl") {
    // Inclusive GST: GST is already included in the amount
    gstAmount = (validAmount * gstPercent) / (100 + gstPercent);
  } else if (gstType === "excl") {
    // Exclusive GST: GST is added to the amount
    gstAmount = (validAmount * gstPercent) / 100;
  }

  return {
    gstAmount,
  };
};
