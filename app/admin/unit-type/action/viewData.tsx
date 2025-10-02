"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { UnitType } from "../columns";
import EditForm from "./editForm";

interface ViewDataProps {
    data: UnitType;
}

export default function ViewData({ data }: ViewDataProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="h-4 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">Maklumat Unit Type </DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div><span className="font-semibold">Nama:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
                    <div><span className="font-semibold">Deskripsi:</span> </div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.description}</div>
                    <div className="flex justify-end items-center gap-2">
                        <span className="font-semibold text-primary">Action:</span>
                        <EditForm data={data} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}