import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatPostChart from "./StatPostChart";
import StatPostTable from "./StatPostTable";
import StatPostChart2 from "./StatPostChart2";
import { Card } from "@/components/ui/card";
import H3 from "@/components/common/H3";

const StatPost = () => {
  return (
    <div>
      <Tabs defaultValue="chart">
      <div className="flex justify-between">
          <H3>Báo cáo thống kê bài đăng</H3>
          <TabsList className="grid grid-cols-2 w-[240px]">
            <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Bảng</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="chart">
          <div className="mt-10 flex gap-10 flex-wrap">
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatPostChart />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatPostChart2 />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatPostChart />
            </Card>
            <Card className="flex-1 flex items-end max-h-[320px] justify-center h-[400px]">
              <StatPostChart2 />
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <StatPostTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatPost;
