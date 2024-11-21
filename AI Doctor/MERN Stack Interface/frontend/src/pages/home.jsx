import "../App.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Someinfo from "../components/someInfo";
import Research from "../components/researchBacked";
import Attributes from "../components/attributes";
import Nav from "../components/nav";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <motion.div
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:1}}
      exit={{opacity:0}}
      >
        <Hero />
        <Someinfo />
        <Research />
        <Attributes />
      </motion.div> 
    </>
  );
}
