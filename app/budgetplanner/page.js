import BudgetplannerFooter from "../_components/_budgetplanner/budgetFooter/BudgetplannerFooter";
import Budgetplannerhead from "../_components/_budgetplanner/budgetHead/Budgetplannerhead";
import BudgetplannerTable from "../_components/_budgetplanner/budgetTable/BudgetplannerTable";

function page() {
  return (
    <div className={`layout assetes`}>
      <h1 className={`main-head`}>Budget Planner</h1>
      <div className={`layout-body`}>
        <Budgetplannerhead />
        <BudgetplannerTable />
        <BudgetplannerFooter />
      </div>
    </div>
  );
}

export default page;
