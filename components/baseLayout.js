import { ReactNode } from "react";
import Navbar from "./Navbar";

interface Props {
    children: ReactNode | ReactNode[];
}

export default function BaseLayout({ children }: Props)