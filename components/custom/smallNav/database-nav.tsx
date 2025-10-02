import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { OrganizationNav } from './organization-nav';

const DatabaseNav = () => {
    return (
        <div className="overflow-hidden p-5 rounded-md border self-start mb-4 gap-1 flex flex-col">
            <span className="font-semibold mb-4">Step in Creating Database Structure</span>
            <Link href="/admin/cluster" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Cluster
                </Button>
            </Link>
            <Link href="/admin/competency" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Competency
                </Button>
            </Link>
            <Link href="/admin/training" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Training
                </Button>
            </Link>
            
        </div>
    )
}

export default DatabaseNav
export { DatabaseNav }