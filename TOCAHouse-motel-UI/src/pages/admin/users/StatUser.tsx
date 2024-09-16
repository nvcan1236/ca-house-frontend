import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StatUser = () => {
  return (
    <div>
      <Tabs defaultValue="chart" className="w-[240px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
          <TabsTrigger value="table">Bảng</TabsTrigger>
        </TabsList>
        <TabsContent value="chart">Chart</TabsContent>
        <TabsContent value="table">Table</TabsContent>
      </Tabs>
    </div>
  );
};

export default StatUser;
