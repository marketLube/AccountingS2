"use client";
import { toggleBranch } from "@/app/_services/helpers";
import BranchesSelector from "./BranchSelector";
import { useSelector } from "react-redux";

function BranchGroup({ setSelectedBranches, clearErrors, selectedBranches }) {
  const { branches } = useSelector((state) => state.general);

  return (
    <div className="form-group">
      <div htmlFor="Branches" className="form-group-formlabel">
        Branches
      </div>
      <div
        className="branch-group"
        style={{ width: branches.length > 3 ? "100%" : "70%" }}
      >
        {branches?.map(({ name: branch }) => (
          <BranchesSelector
            key={branch}
            isActive={selectedBranches?.includes(branch)}
            onClick={() =>
              toggleBranch(
                branch,
                setSelectedBranches,
                clearErrors,
                selectedBranches?.length
              )
            }
          >
            {branch}
          </BranchesSelector>
        ))}
      </div>
    </div>
  );
}

export default BranchGroup;
