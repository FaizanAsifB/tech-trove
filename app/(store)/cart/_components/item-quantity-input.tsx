import { Input } from "@/components/ui/input";

const disallowedSymbols = ["e", "+", "-", ".", "E", ","];

type ItemQuantityInputProps = {
  quantity: number;
  setQuantity: (id: string, quantity: number) => void;
  id: string;
};

const ItemQuantityInput = ({
  quantity,
  setQuantity,
  id,
}: ItemQuantityInputProps) => {
  return (
    <Input
      inputMode="numeric"
      type="number"
      className="border-none px-12 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      value={quantity}
      onChange={(e) => setQuantity(id, Number(e.target.value))}
      min="1"
      step="1"
      onPaste={(e) => e.preventDefault()}
      onKeyDown={(e) => {
        if (e.key === "Backspace" || (e.key === "Delete" && quantity < 10)) {
          e.preventDefault();
          setQuantity(id, 1);
        }
        disallowedSymbols.includes(e.key) && e.preventDefault();
      }}
    />
  );
};

export default ItemQuantityInput;
