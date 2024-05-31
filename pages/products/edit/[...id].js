import Productform from "@/components/Productform";
import Layout from "@/components/layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      setData(response.data);
    });
  }, [id]);

  console.log(data);


  return <Layout>{data && <Productform {...data} />}</Layout>;
}
