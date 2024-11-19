import { getLiabilityOutstandingTotal } from "../Aggregation/liabiilityOutstandingGrandTotal.js";
import { getTransactionTotal } from "../Aggregation/transactionGrandTotal.js";

export default async function totalChecker(Model, req) {
  console.log(Model.modelName, "modelname");
  if (Model.modelName === "Transaction") {
    return await getTransactionTotal(req);
  } else if (Model.modelName === "Liability and outstanding") {
    return await getLiabilityOutstandingTotal(req);
  } else return {};
}
