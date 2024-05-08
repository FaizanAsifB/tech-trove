import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DashboardDataCardProps = {
  title: string;
  data: number | string | JSX.Element;
  icon?: JSX.Element;
};

const DashboardDataCard = ({ title, data, icon }: DashboardDataCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between text-xl">
          {title}
          {icon}
        </CardTitle>
      </CardHeader>
      <CardContent>{data}</CardContent>
    </Card>
  );
};

export default DashboardDataCard;
