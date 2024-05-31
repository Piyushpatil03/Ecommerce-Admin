import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Spinner from "./spinner";

export default function Productform({
  _id,
  name: existing_name,
  catValue: existing_cat,
  description: existing_description,
  price: existing_price,
  images: existing_image,
}) {
  const [name, setName] = useState(existing_name || "");
  const [description, setDescription] = useState(existing_description || "");
  const [price, setPrice] = useState(existing_price || "");
  const [images, setImages] = useState(existing_image || []);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catValue, setCatValue] = useState(existing_cat || "");

  const [redirect, setRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);

  async function productsubmit(ev) {
    ev.preventDefault();

    const data = { name, catValue, description, price, images };

    if (_id) {
      // update the product information
      await axios.put("/api/products", { ...data, _id });
    } else {
      // create new product
      const response = await axios.post("/api/products", data);
    }

    setRedirect(true);
  }

  if (redirect) {
    router.push("/products");
  }

  async function uploadImage(ev) {
    ev.preventDefault();

    setUploading(true);
    const files = ev.target?.files;

    if (files?.length > 0) {
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("file", files[i]); // Append each file to FormData with the same key "file"
      }

      const res = await axios.post("/api/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImages((oldimages) => {
        return [...oldimages, ...res.data.links];
      });

      setUploading(false);
    }
  }

  return (
    <form onSubmit={productsubmit}>
      <label>Product Name</label>
      <input
        type="text"
        placeholder="product name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />

      <label>Category</label>
      <select value={catValue} onChange={(ev) => setCatValue(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length &&
          categories.map((c) => <option value={c._id}>{c.name}</option>)}
      </select>

      <label>Photos</label>
      <div className="mb-2 flex flex-wrap gap-2">
        {!!images?.length &&
          images.map((link) => (
            <div key={link}>
              <img src={link} className="h-24" />
            </div>
          ))}

        {uploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <div>
          <label className="bg-gray-200 w-24 h-24 flex flex-col justify-center items-center cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input
              type="file"
              onChange={uploadImage}
              className="hidden"
            ></input>
          </label>
        </div>
      </div>

      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />

      <label>Price (in USD)</label>
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(ev) => setPrice(ev.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-900 text-white px-3 py-2 rounded-lg"
      >
        Save
      </button>
    </form>
  );
}
