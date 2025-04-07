import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* <Navbar /> */}
      <div className="h-screen"> {children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default layout;
