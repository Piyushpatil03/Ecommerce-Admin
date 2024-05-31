import Layout from "@/components/layout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

export default function DeleteProduct(){
    const router = useRouter();
    const {id} = router.query;
    function deleteprod(){
        axios.delete("/api/products?id="+id);
        goback();
    }

    function goback(){
        router.push("/products");
    }
    return (
        <Layout>
            <h2>Do you want to really delete this product?</h2>
            <div className="mt-5 flex gap-2">
                <button onClick={deleteprod} className="bg-blue-900 px-6 py-2 text-white rounded-lg">Yes</button>
                <button onClick={goback} className="bg-blue-900 px-6 py-2 text-white rounded-lg">No</button>
            </div>
        </Layout>
    )
}