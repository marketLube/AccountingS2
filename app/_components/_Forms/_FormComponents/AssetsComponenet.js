import BlueButton from "./BlueButton";
import FormInput from "./FormInput";
import RedButton from "./RedButton";
import SelectOption from "./SelectOption";

function AssetsComponenet() {
  return (
    <div>
      <div className="remindercard">
        <h2 className="remindertitle">New Assets</h2>

        <form className="reminderform">
          <FormInput />

          <div className="formrow">
            <SelectOption />
            <SelectOption />
          </div>

          <div className="formrow">
            <FormInput />
            <FormInput />
          </div>
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

export default AssetsComponenet;
