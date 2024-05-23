import { Separator } from "./separator";

type HeadingProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const Heading = ({ title, description, children }: HeadingProps) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>
      <Separator className="my-2" />
    </div>
  );
};
