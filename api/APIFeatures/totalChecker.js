import { getAssetsTotal } from "../Aggregation/assetsGrandTotal.js";
import { budgetPlannerTotal } from "../Aggregation/budgetPlannerTotal.js";
import { getCapitalGrandTotal } from "../Aggregation/capitalGrandTotal.js";
import { commissionGrandTotal } from "../Aggregation/commissionGrandTotal.js";
import { getLiabilityOutstandingTotal } from "../Aggregation/liabiilityOutstandingGrandTotal.js";
import { getReminderGrandTotal } from "../Aggregation/reminderGrandTotal.js";
import { getTransactionTotal } from "../Aggregation/transactionGrandTotal.js";

export default async function totalChecker(Model, req) {
  if (Model.modelName === "Transaction") {
    return await getTransactionTotal(req);
  } else if (Model.modelName === "Liability and outstanding") {
    return await getLiabilityOutstandingTotal(req);
  } else if (Model.modelName === "Reminder") {
    return await getReminderGrandTotal(req);
  } else if (Model.modelName === "Asset") {
    return await getAssetsTotal(req);
  } else if (Model.modelName === "Capital") {
    return await getCapitalGrandTotal(req);
  } else if (Model.modelName === "Events") {
    return await budgetPlannerTotal(req);
  } else if (Model.modelName === "University") {
    return await commissionGrandTotal(req);
  }
  return {};
}
