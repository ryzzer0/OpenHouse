import OpenHouseLogo from "../public/OpenHouse.ai-logo.png"
import Image from "next/image";
import { ModeToggle } from "./mode-toggle";

export default function Navbar(){
    return(
        <div className="flex flex-row justify-between max-w-[1300px] items-center m-auto px-4">
            <Image src={OpenHouseLogo} alt="OpenHouse Logo" className="w-24" />
            <ModeToggle />
        </div>
    );
}