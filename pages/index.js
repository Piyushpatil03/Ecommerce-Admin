import { Inter, La_Belle_Aurore } from "next/font/google";
import Layout from "@/components/layout";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();

  // logged in
  return (
    <Layout>
      <div className="text-blue-900 flex justify-between p-4">
        <h2>
          Hello, {session?.user?.name}
        </h2>

        <div className="flex gap-2 me-5">
          <img src={session?.user?.image} className="w-8 h-8 rounded-xl " />
          <b>{session?.user?.name}</b>
        </div>
      </div>
    </Layout>
  );
}
