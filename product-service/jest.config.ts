export default {
  name: "product-service",
  displayName: "Product service tests",
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@libs/(.*)$": `${__dirname}/src/libs/$1`,
  },
};
