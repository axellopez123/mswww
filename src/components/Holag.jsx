import "./Holag.css";
import { cn } from "../lib/utils";
import { motion } from "framer-motion";
import TextLogo from "./TextLogo";
import Logo from "./Logo";

export default function App() {
    const animate = true;
    const words = `Optimiza tu vida`;
    const variants = {
        initial: {
            backgroundPosition: "0 50%",
        },
        animate: {
            backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
        },
    };
    return (
        <div className={`a  h-screen bg-hero-pattern bg-cover`}>
            <motion.div className="flex justify-center items-center w-full h-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <motion.div className={cn(
                    " inset-0 rounded-3xl z-[1] w-5/6 h-5/6 bg-white p-4",
                    " bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)]"
                )} variants={animate ? variants : undefined}
                    initial={animate ? "initial" : undefined}
                    animate={animate ? "animate" : undefined}
                    transition={
                        animate
                            ? {
                                duration: 5,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }
                            : undefined
                    }
                    style={{
                        backgroundSize: animate ? "400% 400%" : undefined,
                    }}>
                        <div className="w-full h-full bg-white/50 rounded-[22px] flex justify-center items-center">
                            <div className="w-2/4">
                                <Logo className="text-black gb-blue-500" text="MSWWW"/>
                                <TextLogo words={words} className="flex justify-center items-center " />
                            </div>
                        </div> 
                    </motion.div>
            </motion.div>
        </div>
    );
}
