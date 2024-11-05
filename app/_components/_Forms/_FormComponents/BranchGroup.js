import { toggleBranch } from "@/app/_services/helpers";
import BranchesSelector from "./BranchSelector";

function BranchGroup({ setSelectedBranches, clearErrors, selectedBranches }) {
  const branches = ["Corporate", "Kannur", "Kozhikode", "Manjeri"];
  return (
    <div className="form-group">
      <div htmlFor="Branches" className="branch-label">
        Branches
      </div>
      <div className="branch-group">
        {branches.slice(1).map((branch) => (
          <BranchesSelector
            key={branch}
            isActive={selectedBranches.includes(branch)}
            onClick={() =>
              toggleBranch(
                branch,
                setSelectedBranches,
                clearErrors,
                selectedBranches.length
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
