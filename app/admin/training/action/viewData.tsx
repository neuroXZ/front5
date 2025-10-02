"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Training } from "../columns";
import EditForm from "./editForm";

interface ViewDataProps {
    data: Training;
}

export default function ViewData({ data }: ViewDataProps) {
    // Format date for display
    const formatDate = (value?: string) => {
        if (!value) return "";
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return `${day}-${month}-${year} ${hour}:${minute}`;
    };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="h-4 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">Maklumat Training</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div><span className="font-semibold">Nama:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
                    <div><span className="font-semibold">Deskripsi:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.description}</div>
                    <div><span className="font-semibold">Tarikh Mula:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{formatDate(data.startDate)}</div>
                    <div><span className="font-semibold">Tarikh Tamat:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{formatDate(data.endDate)}</div>
                    <div className="flex justify-end items-center gap-2">
                        <span className="font-semibold text-primary">Action:</span>
                        <EditForm data={data} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}