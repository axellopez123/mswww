import "./Holag.css";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import TextLogo from "./TextLogo";
import Logo from "./Logo";
import { VortexProps } from "./VortexProps";

export default function Holag() {
    const words = `Optimiza tu vida`;
    
    return (
        <VortexProps className="w-full h-full ">
            <div className="w-full h-full rounded-[22px] flex justify-center items-center">
                <div className="w-screen px-4 md:px-0 md:w-2/4">
                    <Logo className="text-white " text="ARWAX" />
                    <TextLogo words={words} className="flex justify-center items-center" />
                </div>
            </div>
        </VortexProps>
    );
}
