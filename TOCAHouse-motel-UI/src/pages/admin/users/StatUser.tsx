import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatUserPeriodChart from "./StatUserPeriodChart";
import StatUserTable from "./StatUserTable";
import StatUserRoleChart from "./StatUserRoleChart";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import H3 from "@/components/common/H3";
import { useGetUserStatQuery } from "@/stores/api/userApi";
import { Input } from "@/components/ui/input";
import SelectBox from "@/components/common/SelectBox";
import { useState } from "react";
import { Label } from "@/components/ui/label";

const StatUser = () => {
  const [filter, setFilter] = useState({
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    period: "MONTH",
  });
  const { data } = useGetUserStatQuery({
    startDate: filter.startDate,
    endDate: filter.endDate,
    period: filter.period,
  });

  return (
    <div>
      <Tabs defaultValue="chart">
        <div className="flex justify-between">
          <H3>Báo cáo thống kê người dùng</H3>
          <TabsList className="grid grid-cols-2 w-[240px]">
            <TabsTrigger value="chart">Biểu đồ</TabsTrigger>
            <TabsTrigger value="table">Bảng</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex gap-4 mt-6 ">
          <div>
            <Label htmlFor="startDate">Từ ngày:</Label>
            <Input
              type="date"
              id="startDate"
              onChange={(e) =>
                setFilter({ ...filter, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="endDate">Đến ngày:</Label>
            <Input
              type="date"
              id="endDate"
              onChange={(e) =>
                setFilter({ ...filter, endDate: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Thống kê theo:</Label>
            <SelectBox
              options={[
                { label: "Tháng", value: "MONTH" },
                { label: "Năm", value: "MONTH" },
                { label: "Quý", value: "QUARTER" },
              ]}
              onSelectChange={(value) => {
                setFilter({ ...filter, period: value });
              }}
            ></SelectBox>
          </div>
        </div>
        <TabsContent value="chart">
          <div className="mt-10 grid gap-10 lg:grid-cols-2 grid-cols-1">
            <Card>
              <CardContent className="pt-10">
                <StatUserPeriodChart data={data?.result.byPeriod || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo loại bài đăng
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardContent className="pt-10">
                <StatUserRoleChart data={data?.result.byRole || []} />
              </CardContent>
              <CardFooter>
                <p className="font-medium text-center w-full">
                  Thống kê theo loại bài đăng
                </p>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="table">
          <StatUserTable data={data?.result} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StatUser;
