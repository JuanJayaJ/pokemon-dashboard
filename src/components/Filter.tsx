import type { Dispatch, SetStateAction } from "react";

const types = [
  "all","normal","fire","water","grass","electric","ice",
  "fighting","poison","ground","flying","psychic","bug",
  "rock","ghost","dark","dragon","steel","fairy"
];

type Props = {
  typeFilter: string;
  setTypeFilter: Dispatch<SetStateAction<string>>;
};

export default function Filter({ typeFilter, setTypeFilter }: Props) {
  return (
    <select
      value={typeFilter}
      onChange={(e) => setTypeFilter(e.target.value)}
      className="p-2 border rounded"
    >
      {types.map((t) => (
        <option key={t} value={t}>
          {t.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
