# 7sgraph

> Graph of characters from the Seven Sisters books

Stack:

* CRA TypeScript
* react-d3-graph
* graphql-codegen
* graphql-request
* DGraph
* GraphiQL
* https://github.com/graphql/vscode-graphql

TODO

* fix stable positions when adding nodes
* add Material UI slider for time selection (see GraphQuery)
* when the schema is stable: script to convert JSON to addMutation CURL statements to be able to bulk update
* fix codegen for graphql-request
* fix should this not for tail too? in convertPersonsToGraphData
* filter by story does not seem to work well, still returns all nodes that have a story even though Story.title is filtered correctly
* show details on node (right) click
* filter/query by story/date/geo
* Try out Geo tab in Ratel


## Set up the backend

mkdir dgraph

map outside:inside port if needed

Persistent data:
docker run --rm -it \
    -p 8080:8080 \
    -p 9080:9080 \
    -p 8001:8000 \
    -v $(pwd)/dgraph:/dgraph \
    dgraph/standalone:v20.11.0

Non persistent data:
docker run --rm -it \
    -p 8080:8080 \
    -p 9080:9080 \
    -p 8001:8000 \
    dgraph/standalone:v20.11.0


Visit http://localhost:8001 for Ratel UI
Visit http://localhost:3011/ for web UI

Create a schema:

curl -X POST localhost:8080/admin/schema --data-binary '@prepare_schema.graphql'

Populate with mutation query (in GraphiQL):

mutation {
  addPerson(input: [
    { name: "Pa Salt"},
    { name: "Maia"}
  ]) {
    person {
      personID
      name
    }
  }
  addStory(input: [{ title: "The Seven Sisters"}]) {
    story {
      title
    }
  }
}

and retrieve them (in GraphiQL):

query {
  queryPerson {
    name
  }
}

Populate the database with ./populate.sh

In Ratel, try 

```
query {
  Person(func: has(Person.name)) {
    Person.name
  }
}

or

{
  foo(func: has(dgraph.type)) {
    Person.name
    Story.title
  }
}
```

/* TODO fix: this works in debugger
{
  queryStory {
    __typename
    title
  }
}

but this gives (correct?) nodes in Ratel, but without labels:

{
  foo(func: has(Story.title)) {

    Story.title
  }
}
*/

or run on terminal:

```
curl -i -H "Content-Type: application/dql" "localhost:8080/query" -XPOST -d $'
query {
  Person(func: has(name)) {
    name
  }
}
' 
```


This works, but required @reverse on nonBioParent:

{
  getRelatedNodesByUid(func: anyofterms(Person.name, "Maia")) {
    uid
    ~Person.nonBioParent {
      uid
      Person.name
    }
    expand(_all_) {
      uid
      expand(_all_)
    }
  }
}

@hasInverse only works when adding with "mutation" not with RDF

mutation {
  addPerson(input: [
    { name: "TestPerson1", story: { storyID: "0xa" } },
    { name: "TestPerson2", story: { storyID: "0xa" } }
  ]) {
    person {
      personID
      name
      story
    }
  }
}

and 

{
  queryStory {
    __typename
    title
    persons {
      name
    }
  }
}

mutation {
  addPerson(input: [
    { name: "TestPerson4", story: { storyID: "0xa" } },
    { name: "TestPerson5", story: { storyID: "0xa" } }
  ]) {
    person {
      personID
      name
      story
    }
  }
}