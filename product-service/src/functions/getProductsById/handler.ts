import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import products from "../products.json";
import { ErrorCode, ErrorMessage } from "../../errors";

const getProductsById = async (event) => {
  let productId: string;
  try {
    productId = event.pathParameters.productId;
  } catch {
    return formatJSONResponse(
      { message: ErrorMessage.BAD_REQUEST },
      ErrorCode.BAD_REQUEST
    );
  }

  const selectedProduct = products.find((item) => item.id === productId);

  const response = selectedProduct
    ? formatJSONResponse(selectedProduct)
    : formatJSONResponse(
        { message: ErrorMessage.NOT_FOUND },
        ErrorCode.NOT_FOUND
      );
  return response;
};

export const main = middyfy(getProductsById);
