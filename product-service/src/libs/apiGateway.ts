export const formatJSONResponse = (
  response: Object,
  statusCode: number = 200
) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode,
    body: JSON.stringify(response),
  };
};
