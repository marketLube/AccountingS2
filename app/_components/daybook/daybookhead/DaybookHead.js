"use client";

import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";
import Search from "../../utils/Search";

function DaybookHead() {
  return (
    <LayoutHead>
      <>
        <Button>+ New Entri</Button>
        <Button>+ Bank to Bank</Button>
        <Button type="secondary">Edit</Button>
        <Button type="thertiary">Log</Button>
      </>
      <>
        <Search />
        <Button type="filter">
          <GiSettingsKnobs />
        </Button>
      </>
    </LayoutHead>
  );
}

export default DaybookHead;
