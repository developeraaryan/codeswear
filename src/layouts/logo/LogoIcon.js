import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import LogoDark from "../../../assets/images/logos/logo-dark.svg";
import bwLogo from '../../../public/assets/BW-LOGO-in-sqaure-shape.png'

const LogoIcon = () => {
  return (
    <Link href="/admin" className="flex no-underline">
      <Image src={bwLogo} alt={"LogoDark"} height={60} width={60} />
      <span className="text-center top-3 mx-4 relative text-black font-bold text-xl">BLACK WORN</span>
    </Link>
  );
};

export default LogoIcon;
