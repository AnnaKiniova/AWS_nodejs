import { getProductList } from "../functions/getProductList/handler";

describe("Should return correct array of products", () => {
  it("should return list of products", async () => {
    const productList = await getProductList();

    expect(productList.body.length).toBeGreaterThan(0);
    expect(productList).toHaveProperty("headers");
    expect(productList.statusCode).toBe(200);
  });
});
