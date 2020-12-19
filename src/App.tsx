import React from "react";
import GraphiQL from "graphiql";
import logo from "./armillarysphere.svg";
import { FetcherParams } from "graphiql/dist/components/GraphiQL";
import "./App.css";
import "graphiql/graphiql.css";

const hackyTest = async () => {
  const response = (
    await fetch("http://localhost:8080/query", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "omit",
      body: JSON.stringify({
        query: `me(func: has(starring)) {
        name
       }
     `,
        variables: {},
      }),
    })
  ).json();
  // const response = (
  //   await fetch("http://localhost:8080/query", {
  //     method: "post",
  //     headers: { "Content-Type": "application/json" },
  //     mode: "cors",
  //     credentials: "omit",
  //     body: JSON.stringify({
  //       query: `me(func: has(starring)) {
  //       name
  //      }
  //    `,
  //       variables: {},
  //     }),
  //   })
  // ).json();
  console.log(response);
};

const graphQLFetcher = async (graphQLParams: FetcherParams) => {
  return (
    await fetch("http://localhost:8080/graphql", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "omit",
      body: JSON.stringify(graphQLParams),
    })
  ).json();
};

function App() {
  // hackyTest();
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <p>test query:</p>
      <pre>
        {`{
 me(func: has(starring)) {
   name
  }
}`}
      </pre>
      <GraphiQL fetcher={graphQLFetcher} />
    </div>
  );
}

export default App;
