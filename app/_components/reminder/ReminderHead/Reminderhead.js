"use client";
import LayoutHead from "../../layouts/LayoutHead";
import Button from "../../utils/Button";

function Reminderhead() {
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

export default Reminderhead;
