"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function NavBar() {
	const {data, status} = useSession({required: true});
  if (status === "loading") {
    return (<>loading</>)
  }
	return (
		<div className="overflow-hidden bg-red-100 p-1">
			<div className="h-12 w-12 overflow-hidden rounded-lg">
				<Image src={data?.user?.image as string} alt="profile picture" width={100} height={100} />
			</div>
      <div>
        {data?.user?.email}
      </div>
		</div>
	);
}
