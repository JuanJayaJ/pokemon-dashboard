import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PokemonChart from "./PokemonChart";
import type { Pokemon } from "../types/pokemon";
import { typeColors } from "@/utils/typeColors";

type Props = {
  pokemon: Pokemon | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function PokemonModal({
  pokemon,
  onClose,
  onPrev,
  onNext,
}: Props) {
  return (
    <Dialog open={!!pokemon} onOpenChange={onClose}>
      <DialogContent
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 
                   rounded-xl bg-white text-black dark:bg-gray-900 dark:text-white shadow-2xl"
      >
        {pokemon ? (
          <>
            {/* Navigation buttons di luar kotak popup */}
            <button
              onClick={onPrev}
              className="absolute -left-14 top-1/2 -translate-y-1/2 bg-black/40 
                         text-white p-3 rounded-full hover:bg-black/60 transition"
            >
              ◀
            </button>
            <button
              onClick={onNext}
              className="absolute -right-14 top-1/2 -translate-y-1/2 bg-black/40 
                         text-white p-3 rounded-full hover:bg-black/60 transition"
            >
              ▶
            </button>

            {/* Header */}
            <DialogHeader>
              <DialogTitle className="capitalize text-xl font-bold">
                {pokemon.name}{" "}
                <span className="text-gray-500">
                  #{pokemon.id.toString().padStart(3, "0")}
                </span>
              </DialogTitle>
              <DialogDescription>
                Detailed information and base stats
              </DialogDescription>
            </DialogHeader>

            {/* Content */}
            <Card className="bg-transparent shadow-none">
              <CardContent className="flex flex-col gap-4 p-4">
                {/* Image */}
                <div className="flex justify-center">
                  <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    className="w-32 h-32 drop-shadow-lg"
                  />
                </div>

                {/* Types */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {pokemon.types.map((t) => {
                    const color =
                      typeColors[t] || "from-gray-200 to-gray-400 text-black";
                    return (
                      <span
                        key={t}
                        className={`px-3 py-1 text-xs rounded-full bg-gradient-to-r ${color} shadow-sm`}
                      >
                        {t}
                      </span>
                    );
                  })}
                </div>

                {/* Description */}
                <p className="text-sm opacity-90">{pokemon.description}</p>

                {/* Extra Info */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>
                    <strong>Height:</strong> {pokemon.height}
                  </p>
                  <p>
                    <strong>Weight:</strong> {pokemon.weight}
                  </p>
                  <p className="col-span-2">
                    <strong>Abilities:</strong> {pokemon.abilities.join(", ")}
                  </p>
                </div>

                {/* Stats Chart */}
                <PokemonChart stats={pokemon.stats} />
              </CardContent>
            </Card>

            {/* Close Button */}
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
