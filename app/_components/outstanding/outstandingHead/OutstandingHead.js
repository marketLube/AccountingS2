import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";

function OutstandingHead() {
  return (
    <LayoutHead>
      <>
        <Button>+ New Entri</Button>
        <Button type="secondary">Edit</Button>
        <Button type="thertiary">Log</Button>
      </>
    </LayoutHead>
  );
}

export default OutstandingHead;
