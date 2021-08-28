import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { products } from "../mock.js";
import { ErrorCode, ErrorMessage } from "../../errors";
import schema from "./schema";

const getProductsById: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const { productId } = event.pathParameters || 0;
    if (!productId) {
      return formatJSONResponse(
        { message: ErrorMessage.BAD_REQUEST },
        ErrorCode.BAD_REQUEST
      );
    }
    const selectedProduct = products.find((item) => item.id === productId);

    console.log(`selectedProduct: ${selectedProduct}`);

    const response = selectedProduct
      ? formatJSONResponse(selectedProduct)
      : formatJSONResponse(
          { message: ErrorMessage.NOT_FOUND },
          ErrorCode.NOT_FOUND
        );
    return response;
  };

export const main = middyfy(getProductsById);
