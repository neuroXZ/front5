"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Cluster } from "../columns";
import EditForm from "./editForm";

interface ViewDataProps {
    data: Cluster;
}

export default function ViewData({ data }: ViewDataProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Eye className="h-4 w-4 cursor-pointer" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-primary">Maklumat Cluster</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                    <div><span className="font-semibold">Nama:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.name}</div>
                    
                    <div><span className="font-semibold">Deskripsi:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.description}</div>
                    
                    <div><span className="font-semibold">Level:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted">{data.level}</div>
                    
                    <div><span className="font-semibold">Warna:</span></div>
                    <div className="w-full rounded-md border px-3 py-2 bg-muted flex items-center gap-2">
                        <span>{data.color}</span>
                        <span
                            className="inline-block w-6 h-6 rounded-full border"
                            style={{ backgroundColor: data.color }}
                        />
                    </div>
                    
                    <div className="flex justify-end items-center gap-2">
                        <span className="font-semibold text-primary">Action:</span>
                        <EditForm data={data} />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}