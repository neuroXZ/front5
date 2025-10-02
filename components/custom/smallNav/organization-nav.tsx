import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";

const OrganizationNav = () => {
  return (
    <div className="overflow-hidden p-5 rounded-md border self-start mb-4 gap-1 flex flex-col">
      <span className="font-semibold mb-4">Step in Creating Structure</span>
      <Link href="/admin/unit-type" className="w-full">
        <Button variant="outline" className="w-full bg-primary text-white">
          Organization Type
        </Button>
      </Link>
      <Link href="/admin/department" className="w-full">
        <Button variant="outline" className="w-full bg-primary text-white">
          Structure
        </Button>
      </Link>
      <Link href="/admin/job-profile" className="w-full">
        <Button variant="outline" className="w-full bg-primary text-white">
          Position
        </Button>
      </Link>
      <Link href="/admin/employee" className="w-full">
        <Button variant="outline" className="w-full bg-primary text-white">
          Employee
        </Button>
      </Link>
    </div>
  )
}

export default OrganizationNav
export { OrganizationNav }