import Image from "next/image";
import React from "react";

export default function ProfileIcon() {
  return (
    <div>
      <Image src={"/images/user.png"} alt="" width={25} height={40}></Image> 
    </div>
  );
}
