import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";
import { ErrorCode, ErrorMessage } from "src/errors";

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

export const getProductList = async () => {
  const client = new Client(dbOptions);
  try {
    await client.connect();
    console.log("Successfully connected");
  } catch (err) {
    formatJSONResponse(err, ErrorCode.SERVER_ERROR);
  }

  try {
    const { rows: products } = await client.query(
      `SELECT * 
        FROM products AS T1 
          JOIN stock AS T2 ON
            T1.id = T2.product_id`
    );

    return formatJSONResponse(products);
  } catch (err) {
    formatJSONResponse(ErrorMessage.SERVER_ERROR, ErrorCode.SERVER_ERROR);
  } finally {
    client.end();
  }
};

export const main = middyfy(getProductList);
