import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import products from "../products.json";

const getProductList = async () => {
  return formatJSONResponse(products);
};

export const main = middyfy(getProductList);
