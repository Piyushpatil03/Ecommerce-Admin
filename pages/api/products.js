import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/product";

export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({_id: req.query.id}));
    } else {
      const Products = await Product.find();
      res.json(Products);
    }
  }

  if (method === "POST") {
    const { name, catValue, description, price, images } = req.body;
    const ProductDoc = await Product.create({ name, catValue, description, price, images });

    res.json(ProductDoc);
  }

  if (method === "PUT"){
    const {name, catValue, description, price, images, _id} = req.body;
    await Product.updateOne({_id}, {name, catValue, description, price, images});
    res.json(true)
  }

  if (method === "DELETE"){
    await Product.deleteOne({_id:req.query.id});
  }
}
