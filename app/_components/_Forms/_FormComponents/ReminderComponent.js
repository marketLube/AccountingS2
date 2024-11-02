import BlueButton from "./BlueButton";
import FormInput from "./FormInput";
import RedButton from "./RedButton";
import SelectOption from "./SelectOption";

function ReminderComponent() {
  return (
    <div>
      <div className="remindercard">
        <h2 className="remindertitle">New Reminder</h2>

        <form className="reminderform">
          <div className="formrow">
            <SelectOption />
            <SelectOption />
          </div>

          <div className="formrow">
            <FormInput />
          </div>

          <div className="formrow">
            <FormInput />
            <FormInput />
          </div>
          <FormInput />
          <FormInput />

          <div className="buttongroup">
            <RedButton />
            <BlueButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReminderComponent;
