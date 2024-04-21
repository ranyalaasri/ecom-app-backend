const Product = require("../models/product.js");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const { productName, description, price } = req.body;
    console.log("bodyy", req.body);
    const numericPrice = parseFloat(price);
    // Continue with the image uploading logic
    // const imageUrlPromise = new Promise((resolve, reject) => {
    //   cloudinary.uploader.upload(req.file.path, (err, result) => {
    //     if (err) {
    //       reject(err);
    //     } else {
    //       resolve(result.secure_url);
    //     }
    //   });
    // });

    // const imageUrl = await imageUrlPromise;

    const newProduct = await Product.create({
      productName,
      description,
      price: numericPrice,
      // productImage: imageUrl,
    });

    if (!newProduct) return res.status(500).json("Something bad Happened");

    res.status(200).json("newProduct Created successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).limit(req.query._end);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProductData = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const updatedProduct = {
      productName,
      description,
      price,
    };
    const productUpdated = await Product.findOneAndUpdate(
      { _id: id },
      updatedProduct,
      {
        upsert: false,
        new: true,
      }
    );
    res.status(200).json("Project Updated successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const productDeleted = await Product.findByIdAndDelete(id);
    res.status(200).json("product Deleted successfully.");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
