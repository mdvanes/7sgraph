import React from "react";
import GraphiQL from "graphiql";
import { FetcherParams } from "graphiql/dist/components/GraphiQL";

const graphQLFetcher = async (graphQLParams: FetcherParams) => {
  return (
    await fetch("http://localhost:8080/graphql", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      // mode: "cors",
      // credentials: "omit",
      body: JSON.stringify(graphQLParams),
    })
  ).json();
};

const GraphDebugger = () => {
  return (
    <>
      <p>test query:</p>
      <pre>
        {`{
  queryPerson {
    __typename
    personID
    name
  }
}

{
  queryStory {
    __typename
    title
  }
}
`}
      </pre>
      <GraphiQL fetcher={graphQLFetcher} />
    </>
  );
};

export default GraphDebugger;
