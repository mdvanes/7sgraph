const { getIntrospectionQuery } = require("graphql/utilities");
const sortSchema = require("sort-graphql-schema");
const got = require("got");
const fs = require("fs");

// call with: node getSortedSchema.js http://localhost:8080/graphql schema.graphql.json
const introspectionPayload = {
  query: getIntrospectionQuery(),
};

const run = async (schemaUrl, outputPath) => {
  try {
    const response = await got.post(schemaUrl, {
      json: introspectionPayload,
      responseType: "json",
    });
    const sortedSchema = sortSchema(response.body.data);
    const jsonString = JSON.stringify(sortedSchema, null, 2);
    fs.writeFile(outputPath, jsonString, "utf8", () => {
      console.log(`Response written to ${outputPath}`);
    });
  } catch (err) {
    console.log(err);
    throw new Error("failed" + err);
  }
};

run(process.argv[2], process.argv[3]);
