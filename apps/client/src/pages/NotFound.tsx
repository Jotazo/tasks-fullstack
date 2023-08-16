import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.section
      key="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      className="container-centered-layout flex-col"
    >
      <h1 className="text-7xl font-bold block">404</h1>
      <p className="text-slate-300 my-5 text-3xl">Page not found</p>
    </motion.section>
  );
};

export default NotFound;
