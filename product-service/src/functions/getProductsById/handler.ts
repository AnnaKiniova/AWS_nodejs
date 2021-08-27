import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { products } from "../mock.js";

import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    console.log("query", event.queryStringParameters);
    console.log("event", event);
    console.log("path", event.path);
    console.log("body", JSON.parse(event.body.productId));

    const selectedProduct = products.find((item) => item.id === event);
    console.log(`selectedProduct: ${selectedProduct}`);
    return formatJSONResponse({
      selectedProduct,
    });
  };

export const main = middyfy(getProductsById);
