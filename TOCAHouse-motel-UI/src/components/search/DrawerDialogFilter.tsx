import * as React from "react";

import { cn } from "@/lib/utils";
import useMediaQuery from "@custom-react-hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import H3 from "../common/H3";
import { SlidersHorizontalIcon } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function DrawerDialogFilter() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"ghost"}>
            <SlidersHorizontalIcon size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-10 min-w-[800px]">
          <DialogHeader>
            <DialogTitle>Tìm kiếm nhanh hơn với bộ lọc</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <div>
              <H3>Loại phòng</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">
                <div className="h-20 bg-slate-400"></div>
                <div className="h-20 bg-slate-400"></div>
                <div className="h-20 bg-slate-400"></div>
                <div className="h-20 bg-slate-400"></div>
              </div>
            </div>

            <div>
              <H3>Khu vực</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
            </div>

            <div>
              <H3>Khoảng giá</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
            </div>

            <div className="flex">
              <div className="flex-1">
                <H3>Dịch vụ</H3>
                <div className="ml-3 mt-1">
                  <div>
                    <Checkbox /> <Label>An ninh</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>Giặt ủi</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>PCCC</Label>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <H3>Nội thất</H3>
                <div className="ml-3 mt-1">
                  <div>
                    <Checkbox /> <Label>An ninh</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>Giặt ủi</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>PCCC</Label>
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <H3>Tiện ích xung quanh</H3>
                <div className="ml-3 mt-1">
                  <div>
                    <Checkbox /> <Label>An ninh</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>Giặt ủi</Label>
                  </div>
                  <div>
                    <Checkbox /> <Label>PCCC</Label>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Button className="block ml-auto mt-6 px-10">Áp dụng</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size={"icon"} variant={"ghost"}>
          <SlidersHorizontalIcon className="size-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="p-6">
        <DrawerHeader className="text-left">
          <DrawerTitle>Tìm kiếm nhanh hơn với bộ lọc</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4">
          <div>
            <H3>Loại phòng</H3>
            <div className="grid grid-cols-4 gap-2 mt-1">
              <div className="h-20 bg-slate-400"></div>
              <div className="h-20 bg-slate-400"></div>
              <div className="h-20 bg-slate-400"></div>
              <div className="h-20 bg-slate-400"></div>
            </div>
          </div>

          <div>
            <H3>Khu vực</H3>
            <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
          </div>

          <div>
            <H3>Khoảng giá</H3>
            <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
          </div>

          <div className="flex">
            <div>
              <H3>Dịch vụ</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
            </div>

            <div>
              <H3>Nội thất</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
            </div>

            <div>
              <H3>Tiện ích xung quanh</H3>
              <div className="grid grid-cols-4 gap-2 mt-1">123 -456</div>
            </div>
          </div>
        </div>
        <DrawerFooter className="pt-6">
          <div className="flex gap-3 ">
            <DrawerClose asChild className="w-1/2">
              <Button variant="secondary">Huỷ</Button>
            </DrawerClose>
            <Button className="w-1/2">Áp dụng</Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
