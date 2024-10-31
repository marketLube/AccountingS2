"use client";

import LayoutHead from "@/components/layouts/LayoutHead";
import Button from "@/components/utils/Button";

function DaybookHead() {
  return (
    <LayoutHead>
      <>
        <Button>+ New Entri</Button>
        <Button>+ Bank to Bank</Button>
        <Button type="secondary">Edit</Button>
        <Button type="thertiary">Log</Button>
      </>
    </LayoutHead>
  );
}

export default DaybookHead;
