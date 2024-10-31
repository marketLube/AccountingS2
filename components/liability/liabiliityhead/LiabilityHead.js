import LayoutHead from "@/components/layouts/LayoutHead";
import Button from "@/components/utils/Button";

function LiabilityHead() {
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

export default LiabilityHead;
