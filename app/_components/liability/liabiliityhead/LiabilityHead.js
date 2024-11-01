import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

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
