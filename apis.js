const apis = () => {
  const baseUrl = "http://localhost:4242/";
  const live = "http://ecom.borgfy.com:4242/";
  const list = {
    // admin side products apis
    addNewProduct: `${live}admin/product/add`,
    getProductList: `${live}admin/product/get/list`,
    addNewProductCategory: `${live}admin/product/category/add`,
    addNewProductBrand: `${live}admin/product/brand/add`,
    getProductBrandList: `${live}admin/product/brand/get/list`,
    getProductCategoryList: `${live}admin/product/category/get/list`,
    uploadProductImages: `${live}admin/product/image/add`,
    updateProduct: `${live}admin/product/update`,

    // client side routing
    getFilteredProductList: `${live}client/product/list`,
    getProductDetailById: `${live}client/product/detail`,
    registerNewUser: `${live}user/register`,
    loginUser: `${live}user/login`,

    // cart apis
    addToCart: `${live}item/add/cart`,
  };

  return list;
};

export default apis;
