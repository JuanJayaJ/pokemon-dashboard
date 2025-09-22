import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PokemonStat } from "../types/pokemon";

type Props = {
  stats: PokemonStat[];
};

export default function PokemonChart({ stats }: Props) {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <RadarChart data={stats}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis dataKey="name" stroke="#888" />
          <PolarRadiusAxis angle={30} domain={[0, 150]} stroke="#888" />
          <Tooltip />
          <Radar
            name="Base Stats"
            dataKey="value"
            stroke="#4f46e5"
            fill="#4f46e5"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
