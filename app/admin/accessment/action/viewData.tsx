"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Assessment } from "../columns";
import EditForm from "./editForm";

interface ViewDataProps {
    data: Assessment;
}

export default function ViewData({ data }: ViewDataProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="h-4 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">Maklumat Penilaian</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div><span className="font-semibold">Nama:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
                    <div><span className="font-semibold">Tarikh Mula:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.startDate}</div>
                    <div><span className="font-semibold">Tarikh Tamat:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.endDate}</div>
                    <div><span className="font-semibold">Deskripsi:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.description}</div>
                    
                    <div><span className="font-semibold">weightageSelf:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.weightageSelf}</div>
                    <div><span className="font-semibold">weightageSuperior:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.weightageSuperior}</div>
                    <div><span className="font-semibold">weightagePeer:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.weightagePeer}</div>                    
                    <div className="flex justify-end items-center gap-2">
                        <span className="font-semibold text-primary">Action:</span>
                        <EditForm data={data} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}