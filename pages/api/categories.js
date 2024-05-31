import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/category";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handler(req, res){
    const {method} = req;

    await mongooseConnect();
    // await isAdminRequest(req, res);

    if (method === "POST"){
        const {name, parentCat} = req.body;
        const CategoryDoc = await Category.create({name, parent:parentCat});
        res.json(CategoryDoc);
    }

    if (method === "GET"){
        const CategoryDoc = await Category.find().populate('parent');
        res.json(CategoryDoc);
    }

    if (method === "PUT"){
        const {name, parentCat, _id } = req.body;
        await Category.updateOne({_id}, {name, parentCat});
        res.json(true);
        }

    if (method === "DELETE"){
        await Category.deleteOne({_id: req.query.id});
        res.json('ok');
    }

}