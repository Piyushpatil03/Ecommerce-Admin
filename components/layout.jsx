import { signIn, useSession } from "next-auth/react";
import Navbar from "./navbar";

const Layout = ({children}) => {
  const { data: session } = useSession();

  // if not logged in
  if (!session) {
    return (
      <div className="bg-blue-900 w-screen h-screen">
        <button
          onClick={() => signIn("google")}
          className="bg-white px-2 py-2 rounded-xl"
        >
          Signin with Google
        </button>
      </div>
    );
  }

  // logged in
  return (
    <div className="w-screen h-screen flex">
      <Navbar/>
      <div className="bg-white rounded flex-grow p-4 my-2">
        {children}
      </div>
    </div>
  );
};

export default Layout;
