import { truncate } from "@/app/_services/helpers";

function ParticularNameShower({ particular, data }) {
  return (
    <div>
      <span> {truncate(particular?.name, 30)}</span>
      <span className="small-text table-small-text">
        {truncate(data?.purpose, 30)}
      </span>
    </div>
  );
}

export default ParticularNameShower;
