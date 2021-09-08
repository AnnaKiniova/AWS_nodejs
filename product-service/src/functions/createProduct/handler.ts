import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { Client } from "pg";
import { ErrorCode, ErrorMessage } from "../../errors";

import { v4 as uuidv4 } from "uuid";

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

const createProduct = async (event) => {
  console.log(event);
  // Validate incoming parameters

  const title = event.body.title || "";
  const description = event.body.description || "";
  const price = event.body.price || "";
  const count = event.body.count || "";

  if (!title || !count || count < 0) {
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
    formatJSONResponse(err, ErrorCode.SERVER_ERROR);
  }

  try {
    const id = uuidv4();
    await client.query("BEGIN"); // start transaction

    await client.query(
      `INSERT INTO products (id, title, description, price)
        VALUES ($1, $2, $3, $4)`,
      [id, title, description, price]
    );
    await client.query(
      `INSERT INTO stock (product_id, count)
        VALUES ($1, $2)`,
      [id, count]
    );
    await client.query("COMMIT"); // end successful transaction
    formatJSONResponse("Created", 200);
  } catch (err) {
    await client.query("ROLLBACK"); // end successful transaction
    formatJSONResponse(
      `Rollback transaction due to ${err.message}`,
      ErrorCode.SERVER_ERROR
    );
  } finally {
    client.end();
  }
};

export const main = middyfy(createProduct);
