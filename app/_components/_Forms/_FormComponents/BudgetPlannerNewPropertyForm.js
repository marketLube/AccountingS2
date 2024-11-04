import FormInput from "./FormInput";
import SelectOption from "./SelectOption";
import RedButton from "./RedButton";
import BlueButton from "./BlueButton";

function BudgetPlannerNewPropertyForm() {
  return (
    <div className="remindercard">
      <h2 className="remindertitle">Self Transaction</h2>

      <form className="reminderform">
        <FormInput />
        <div className="formrow">
          <FormInput />
          <SelectOption />
        </div>
        <div className="buttongroup">
          <RedButton />
          <BlueButton />
        </div>
      </form>
    </div>
  );
}

export default BudgetPlannerNewPropertyForm;
