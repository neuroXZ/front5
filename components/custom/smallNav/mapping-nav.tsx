import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { OrganizationNav } from './organization-nav';

const MappingNav = () => {
    return (
        <div className="overflow-hidden p-5 rounded-md border self-start mb-4 gap-1 flex flex-col">
            <span className="font-semibold mb-4">Step in Creating Mapping Structure</span>
            <Link href="/admin/mapping/competency" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Competency Mapping
                </Button>
            </Link>
            <Link href="/admin/mapping/training" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Training Mapping
                </Button>
            </Link>
            <Link href="/admin/mapping/assessor" className="w-full">
                <Button variant="outline" className="w-full bg-primary text-white">
                    Assessor Mapping
                </Button>
            </Link>
            
        </div>
    )
}

export default MappingNav
export { MappingNav }