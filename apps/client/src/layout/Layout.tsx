import Navbar from "../components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactElement;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="mx-auto px-5 mt-4 md:max-w-[90%]">{children}</main>
      <ToastContainer />
    </>
  );
};

export default Layout;
