# 7sgraph

| Graph of characters from the Seven Sisters books

Stack:

* CRA TypeScript
* react-d3-graph
* graphql-codegen
* graphql-request
* DGraph
* GraphiQL

TODO Ratel has a "Geo" tab, use that!

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

Create a schema:

curl -X POST localhost:8080/admin/schema --data-binary '@schema.graphql'

Populate with mutation query (in GraphiQL):

mutation {
  addProduct(input: [
    { name: "GraphQL on Dgraph"},
    { name: "Dgraph: The GraphQL Database"}
  ]) {
    product {
      productID
      name
    }
  }
  addCustomer(input: [{ username: "Michael"}]) {
    customer {
      username
    }
  }
}

and retrieve them (in GraphiQL):

query {
  queryProduct {
    name
  }
}


// TODO fix this:
Populate the database with ./populate.sh

In Ratel, try 

```
{
 me(func: has(starring)) {
   name
  }
}
```

or run on terminal:

```
curl -i -H "Content-Type: application/dql" "localhost:8080/query" -XPOST -d $'
{
 me(func: has(starring)) {
   name
  }
}
' 
```