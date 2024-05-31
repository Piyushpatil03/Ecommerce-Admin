import Layout from "@/components/layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [parentCat, setparentCat] = useState("");
  const [editedCat, seteditedCat] = useState(null);

  useEffect(() => {
    getCategories();
  }, []);

  function getCategories() {
    axios.get("/api/categories").then((response) => {
      setCategories(response.data);
    });
  }

  async function saveCategory(ev) {
    ev.preventDefault();

    if (editedCat) {
      // to EDIT the category
      await axios.put("/api/categories", {
        name,
        parentCat,
        _id: editedCat._id,
      });
      seteditedCat(null);
    } else {
      // to SAVE the category
      await axios.post("/api/categories", { name, parentCat });
    }

    setName("");
    setparentCat("");
    getCategories();
  }

  function editCategory(category) {
    seteditedCat(category);
    setName(category.name);
    setparentCat(category?.parent?._id);
  }

  async function deleteCategory(category){
    const { _id } = category;
    await axios.delete("/api/categories?id="+_id); 
    getCategories();
  }

  return (
    <Layout>
      <h2>Categories</h2>
      {editedCat ? (
        <label>Edit Category</label>
      ) : (
        <label>New Category Name</label>
      )}

      <form onSubmit={saveCategory} className="flex gap-1">
        <input
          typeof="text"
          placeholder="category name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
        ></input>

        <select
          value={parentCat}
          onChange={(ev) => setparentCat(ev.target.value)}
        >
          <option value="">Select Parent Category</option>
          {categories.length &&
            categories.map((c) => <option value={c._id}>{c.name}</option>)}
        </select>

        <button
          type="submit"
          className="bg-blue-900 text-white px-5 mb-2 mt-2 rounded-lg"
        >
          Save
        </button>
      </form>

      <table className="basic">
        <thead>
          <tr>
            <th>Categories</th>
            <th>Parent Category</th>
            <th>Function</th>
          </tr>
        </thead>

        <tbody>
          {categories.length > 0 &&
            categories.map((c) => (
              <tr>
                <td>{c.name}</td>
                <td>{c?.parent?.name}</td>
                <td className="flex gap-2">
                  <button className="basic" onClick={() => editCategory(c)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-4 h-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                    Edit
                  </button>

                  <button className="basic" onClick={() => deleteCategory(c)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
