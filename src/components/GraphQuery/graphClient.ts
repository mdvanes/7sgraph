import { GraphQLClient } from "graphql-request";

const url = process.env["REACT_APP_GRAPHQL_URL"] || "";

const client = new GraphQLClient(url, {
  headers: {},
});

export const isLiteMode = url.indexOf(".json") > 0;

export default client;
