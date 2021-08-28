import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import products from "../products.json";

import schema from "./schema";

const getProductList: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async () => {
    return formatJSONResponse(products);
  };

export const main = middyfy(getProductList);
