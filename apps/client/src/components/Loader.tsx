import styles from "./Loader.module.css";
import { motion } from "framer-motion";

interface Props {
  message?: string;
}

const Loader: React.FC<Props> = () => {
  return (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: -1000 }}
      transition={{ ease: "easeInOut", duration: 2 }}
      className="container-centered-layout"
    >
      <span className={styles.loader}>Loading...</span>
    </motion.div>
  );
};

export default Loader;
