"use client";
import { GiSettingsKnobs } from "react-icons/gi";
import LayoutHead from "@/components/layouts/LayoutHead";
import Button from "@/components/utils/Button";
import Search from "@/components/utils/Search";
import { useState, useEffect } from "react";

function DaybookHead() {
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await fetch("/v1/banks");
        const data = await response.json();
        setBanks(data.docs);
      } catch (error) {
        console.error("Error fetching banks:", error);
      }
    };

    fetchBanks();
  }, []);

  console.log(banks, "banks");
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
