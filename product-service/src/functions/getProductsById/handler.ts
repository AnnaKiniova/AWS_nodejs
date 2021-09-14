import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";
import { ErrorCode, ErrorMessage } from "../../errors";

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
const dbOptions = {
  host: PG_HOST,
  port: PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000,
};

const getProductsById = async (event) => {
  let productId: string;
  console.log(event);
  try {
    productId = event.pathParameters.productId;
  } catch {
    return formatJSONResponse(
      { message: ErrorMessage.BAD_REQUEST },
      ErrorCode.BAD_REQUEST
    );
  }
  const client = new Client(dbOptions);
  try {
    await client.connect();
    console.log("Successfully connected");
  } catch (err) {
    return formatJSONResponse(err, ErrorCode.SERVER_ERROR);
  }

  try {
    console.log(productId);
    const { rows: selectedProduct } = await client.query(
      `SELECT * 
      FROM products AS T1 
        LEFT JOIN stock AS T2 ON
          T1.id = T2.product_id
      WHERE T1.id = $1`,
      [productId]
    );

    const response =
      Object.keys(selectedProduct).length === 0
        ? formatJSONResponse(
            { message: ErrorMessage.NOT_FOUND },
            ErrorCode.NOT_FOUND
          )
        : formatJSONResponse(selectedProduct[0]);
    return response;
  } catch (err) {
    return formatJSONResponse(err.message, ErrorCode.SERVER_ERROR);
  } finally {
    client.end();
  }
};

export const main = middyfy(getProductsById);
