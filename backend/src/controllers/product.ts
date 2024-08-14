import mongoose from "mongoose";
import { Request, Response } from "express";
import {
  Category,
  Product,
  Color,
  Specifics,
  ShoppingInfo,
} from "../Models/schemas";

const addProduct = async (req: Request, res: Response): Promise<void> => {
  const {
    category,
    brand,
    name,
    product_desc,
    product_type,
    amount,
    tax,
    size,
    colors,
    specifics,
    shoppingInfo,
  } = req.body;
  try {
    if (!category) {
      res.status(400).json({ message: "Category not found" });
      return;
    }

    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(category as string);
    const findval = await Category.find({
      name: { $regex: searchRgx, $options: "i" },
    });
    let newCategory;
    if (!findval.length) {
      newCategory = new Category({ name: category });
      await newCategory.save();
    } else {
      newCategory = findval[0];
    }

    if (
      !name ||
      !product_desc ||
      !brand ||
      !product_type ||
      !amount ||
      !tax ||
      !size
    ) {
      res.status(400).json({ message: "Incomplete data" });
      return;
    }
    const newProduct = new Product({
      name,
      brand,
      product_desc,
      product_type,
      amount,
      tax,
      size,
      category: newCategory._id,
    });
    await newProduct.save();
    newCategory.products.push(newProduct._id);
    await newCategory.save();

    if (colors && colors.length > 0) {
      const newColors = await Color.insertMany(
        colors.map(
          (color: { name: string; hex: string; images: Array<string> }) => ({
            ...color,
            product: newProduct._id,
          })
        )
      );
      newProduct.colors = newColors.map((color) => color._id);
    }

    if (specifics) {
      const newSpecifics = new Specifics({
        product: newProduct._id,
        details: specifics,
      });
      await newSpecifics.save();
      newProduct.specifics = newSpecifics._id;
    }
    if (shoppingInfo) {
      const newShoppingInfo = new ShoppingInfo({
        product: newProduct._id,
        info: shoppingInfo.info,
        additionalInfo: shoppingInfo.additionalInfo,
      });
      await newShoppingInfo.save();
      newProduct.shoppingInfo = newShoppingInfo._id;
    }
    await newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully", data: newProduct });
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

interface ProductQuery {
  brand?: Object;
  order?: number;
  amount?: Object;
}

const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, brand, order, price, priceh, pricel } = req.query;
    const query: ProductQuery = {};
    if (brand) query["brand"] = { $regex: new RegExp(brand as string, "i") };
    if (price) query["amount"] = { $lte: parseInt(price as string) };
    if (priceh || pricel) {
      const result = await Product.aggregate([
        {
          $group: {
            _id: null, // Grouping all documents together
            averagePrice: { $avg: "$amount" }, // Calculating the average of the "price" field
          },
        },
      ]);

      if (priceh) {
        query["amount"] = { $gte: parseInt(result[0].averagePrice) };
      } else {
        query["amount"] = { $lte: parseInt(result[0].averagePrice) };
      }
    }
    // console.log(query);

    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search as string);

    const findval = (
      await Category.find({
        name: { $regex: searchRgx, $options: "i" },
      })
    ).map((cat) => cat._id);
    // console.log(findval);
    // console.log(order);

    if (findval.length) {
      const products = await Product.find({
        $and: [{ category: { $in: findval } }, query],
      })
        .sort({ amount: order === "desc" ? -1 : 1 })
        .limit(10)
        .populate("colors")
        .populate("reviews")
        .populate("category");

      res.status(200).json(products);
      return;
    }

    const products = await Product.find({
      $and: [
        {
          $or: [
            { name: { $regex: searchRgx, $options: "i" } },
            { brand: { $regex: searchRgx, $options: "i" } },
            { product_type: { $regex: searchRgx, $options: "i" } },
            { product_desc: { $regex: searchRgx, $options: "i" } },
          ],
        },
        query,
      ],
    })
      .sort({ amount: order === "desc" ? -1 : 1 })
      .limit(10)
      .populate("colors")
      .populate("reviews")
      .populate("category");
    // console.log("Sort Order:", order);
    // console.log("Sort Parameter:", { price: order === "desc" ? -1 : 1 });
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    const product = await Product.findById(id)
      .populate("colors")
      .populate("category")
      .populate("reviews");
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const getSpecifics = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    const specifics = await Specifics.findOne({ product: id });
    res.status(200).json(specifics);
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const getShoppingInfo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: "Product ID is required" });
      return;
    }
    const shoppingInfo = await ShoppingInfo.findOne({ product: id });
    res.status(200).json(shoppingInfo);
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

const searchProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { search } = req.query;
    const rgx = (pattern: string) => new RegExp(`.*${pattern}.*`);
    const searchRgx = rgx(search as string);
    const findval = (
      await Category.find({
        name: { $regex: searchRgx, $options: "i" },
      })
    ).map((cat) => cat._id);

    if (findval.length) {
      const products = await Product.find({
        category: { $in: findval },
      }).limit(10);

      res.status(200).json(products);
      return;
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: searchRgx, $options: "i" } },
        { brand: { $regex: searchRgx, $options: "i" } },
        { product_type: { $regex: searchRgx, $options: "i" } },
        { product_desc: { $regex: searchRgx, $options: "i" } },
      ],
    }).limit(10);

    // console.log(products);
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: "Error processing Request" });
    console.log(err);
  }
};

export {
  addProduct,
  getProducts,
  getProductById,
  searchProduct,
  getShoppingInfo,
  getSpecifics,
};
