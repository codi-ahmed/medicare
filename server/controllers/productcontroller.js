const Product = require('../model/productmodel');

const addProduct = async (req , res) => {


        const {name , type ,company, size , price , quantity } = req.body;
        const existingProduct = await Product.findOne({name});
        if(existingProduct){
            res.status(200).json({massage : "Product Already exist}"});

        }

        const newProduct = new Product({name , type ,company, size , price , quantity});
        await newProduct.save();

        res.status(201).json({
            massage: 'Product Added Succesfuly'
        })
    
    

};   

const updateProductQuantity = async (req, res) => {
    try {
      const { productId, newQuantity } = req.body;
  
      const updated = await Product.findByIdAndUpdate(productId, { quantity: newQuantity }, { new: true });
  
      if (!updated) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Quantity updated successfully', data: updated });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

  const getProducts = async (req, res) => {
    try {
      const products = await Product.find(); 
  
      res.status(200).json({
        message: 'Products fetched successfully',
        data: products,
      });
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Server error while fetching products' });
    }
  }; 

  
const updatePrice = async (req, res) => {
    try {
      const { productId, newPrice } = req.body;
  
      if (!productId || newPrice === undefined) {
        return res.status(400).json({ message: "Product ID and new price are required." });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found." });
      }
  
      product.price = newPrice;
      await product.save();
  
      res.status(200).json({ message: "Price updated successfully." });
    } catch (error) {
      res.status(500).json({ message: "Server error while updating price.", error });
    }
  };


module.exports= {addProduct , getProducts ,updateProductQuantity , updatePrice};