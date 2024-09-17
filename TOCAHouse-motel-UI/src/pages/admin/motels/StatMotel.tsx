import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import StatMotelChart from "./StatMotelChart";
import StatMotelChart2 from "./StatMotelChart2";
import StatMotelTable from "./StatMotelTable";
import H3 from "@/components/common/H3";

const StatMotel = () => {
  return (
    <div>
      <Tabs defaultValue="chart">
        <div className="flex justify-between">
          <H3>Báo cáo thống kê nhà trọ</H3>
          <TabsList className="grid grid-cols-2 w-[240px]">
            <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Bảng</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="chart">
          <div className="mt-10 flex gap-10 flex-wrap">
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatMotelChart2 />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatMotelChart2 />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatMotelChart />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatMotelChart2 />
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <StatMotelTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatMotel;
