import ProductManager from "../dao/classes/productManagerMongo.js";

const productsService = new ProductManager();

const getProducts = async (req, res) => {
  try {
    let result = await productsService.getProducts();
    res.send({ status: "success", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Error" });
  }
};

const getProductById = async (req, res) => {
  const { pid } = req.params;
  console.log(pid);
  try {
    let product = await productsService.getProductById(pid);
    res.send({ status: "success", result: product });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Error" });
  }
};

/*const addProduct = async (req, res) => {
    let result = await productsService.addProduct();
    res.send ({status:"succes", result: result})

}*/

const updateProduct = async (req, res) => {
  const { pid } = req.params;
  const updatedProduct = req.body;

  try {
    let result = await productsService.updateProduct(pid, updatedProduct);
    res.send({ status: "success", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Error" });
  }
};


const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    let result = await productsService.deleteProduct(pid);
    res.send({ status: "success", result: result });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: "error", error: "Error" });
  }
};

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
