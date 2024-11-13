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
                <div className="w-2/4">
                    <Logo className="text-black dark:text-white " text="MSW" />
                    <TextLogo words={words} className="flex justify-center items-center " />
                </div>
            </div>
        </VortexProps>
    );
}
