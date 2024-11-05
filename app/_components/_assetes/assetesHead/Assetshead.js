"use client";
import LayoutHead from "@/app/_components/layouts/LayoutHead";
import Button from "@/app/_components/utils/Button";

import { GiSettingsKnobs } from "react-icons/gi";
import Search from "../../utils/Search";

function Assetshead() {
  return (
    <LayoutHead>
      <>
        <Button>+ New Entri</Button>
        <Button type="secondary">Edit</Button>
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

export default Assetshead;