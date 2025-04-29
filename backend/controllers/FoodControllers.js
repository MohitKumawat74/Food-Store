const Food = require("../models/Food");

exports.admininsertpage = async (req, res) => {
  const { name, description, price, quantity, status, category } = req.body;
  const filename = req.file ? req.file.filename : null;

  try {
    const record = new Food({
      fName: name,
      fDescription: description,
      fImage: filename,
      fPrice: price,
      fQuantity: quantity,
      fStatus: status,
      fCategory: category,
    });

    await record.save();
    res.status(201).json({ message: "Product added successfully!", data: record });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.showdatapage = async (req, res) => {
  try {
    const records = await Food.find();
    res.status(200).json({ apiData: records, message: "Data retrieved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deletepage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await Food.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    res.status(200).json({ status: 200, message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Food.findById(id);

    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    res.status(200).json({ status: 200, data: product });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.editpage = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, status, category } = req.body;

    let updatedData = {
      fName: name,
      fDescription: description,
      fPrice: price,
      fQuantity: quantity,
      fStatus: status,
      fCategory: category,
    };

    if (req.file) {
      updatedData.fImage = req.file.filename;
    }

    const updatedRecord = await Food.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: updatedRecord,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

exports.landingpage = async (req, res) => {
  try {
    const AvailableProduct = await Food.find({ fStatus: "Available" });
    res.status(200).json({
      status: 200,
      apiData: AvailableProduct,
      message: "Available Products retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
