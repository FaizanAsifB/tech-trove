import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCart from "@/hooks/useCart";
import { DISALLOWED_SYMBOLS } from "@/utils/constants";
import { Minus, Plus } from "lucide-react";

type ItemQuantityInputProps = {
  quantity: number;
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ItemQuantityInput = ({
  quantity,
  id,
  setIsOpen,
}: ItemQuantityInputProps) => {
  const setQuantity = useCart((state) => state.setQuantity);
  const incrementItem = useCart((state) => state.incrementItem);
  const decrementItem = useCart((state) => state.decrementItem);

  return (
    <div className="relative flex max-w-32 items-center rounded-md border border-foreground">
      <Button
        onClick={() => {
          if (quantity === 1) {
            setIsOpen(true);
          }
          if (quantity > 1) {
            decrementItem(id);
          }
        }}
        variant={"ghost"}
        size={"icon"}
        className="absolute left-0 "
      >
        <Minus />
      </Button>
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
          DISALLOWED_SYMBOLS.includes(e.key) && e.preventDefault();
        }}
      />
      <Button
        onClick={() => incrementItem(id)}
        variant={"ghost"}
        size={"icon"}
        className="absolute right-0"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default ItemQuantityInput;
