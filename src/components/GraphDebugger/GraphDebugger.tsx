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
      <GraphiQL fetcher={graphQLFetcher} />
      <p>test query:</p>
      <pre>
        {`// Get any person
{
  queryPerson {
    __typename
    personID
    name
  }
}

// Get any story
{
  queryStory {
    __typename
    title
  }
}

// Get any person with related stories and persons
query getAllPersons {
  queryPerson {
    __typename
    personID
    name
    nickNames
    story {
      title
    }
    parent {
      __typename
      name
      personID
    }
  }
}

// Get a specific person by name and related persons sorted by name
query getPersonByName($name: String!) {
  queryPerson(filter: { name: {allofterms: $name}}) {
    __typename
    personID
    name
    nonBioParent(order: { asc: name }, first: 15) {
      name
    }
    parent(order: { asc: name }, first: 15) {
      name
    }
  }
}
+
{
  "name": "Pa"
}

// TODO Get persons by related story title
// See https://discuss.dgraph.io/t/filtering-by-relation/5757/2
{
  queryPersonWithStory(func: has(Person.story)) {
    Person.uid
    Person.name
    Person.story @filter(eq(Story.title, "The Storm Sister")) {
      Story.title 
    }
  }
}

query getPersonsByStoryTitle($title: String!) {
  queryPerson(filter: { has:story}) {
    __typename
    personID
    name
    story(filter: { title: {allofterms: $title} }) {
      title
    }
  }
}
+
{
  "title": "Storm"
}

# Test query inverse relation
{
  queryPerson {
    __typename
    personID
    name
    children {
      name
    }
    parents {
      name
    }
    nonBioChildren {
      name
    }
    nonBioParents {
      name
    }
  }
}
`}
      </pre>
    </>
  );
};

export default GraphDebugger;
