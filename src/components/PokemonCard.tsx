import { typeColors } from "@/utils/typeColors";

type Props = {
  id: number;
  name: string;
  image: string;
  types: string[];
  onClick: () => void;
  selected?: boolean;
};

export default function PokemonCard({
  id,
  name,
  image,
  types,
  onClick,
  selected = false,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-xl p-4 flex flex-col items-center gap-2 transition 
        hover:shadow-lg hover:scale-105
        ${
          selected
            ? "ring-2 ring-blue-500 dark:ring-yellow-400"
            : "bg-gray-50 dark:bg-gray-800 shadow-sm"
        }
      `}
    >
      {/* Pokémon Image */}
      <img src={image} alt={name} className="w-20 h-20 object-contain" />

      {/* Name */}
      <h2 className="capitalize font-semibold text-gray-900 dark:text-gray-100">
        {name}{" "}
        <span className="text-gray-500 dark:text-gray-300">
          #{id.toString().padStart(3, "0")}
        </span>
      </h2>

      {/* Types */}
      <div className="flex gap-2 flex-wrap justify-center">
        {types.map((t) => {
          const color =
            typeColors[t] || "from-gray-200 to-gray-400 text-black";
          return (
            <span
              key={t}
              className={`px-2 py-1 text-xs rounded-full bg-gradient-to-r ${color} shadow-sm`}
            >
              {t}
            </span>
          );
        })}
      </div>
    </div>
  );
}
