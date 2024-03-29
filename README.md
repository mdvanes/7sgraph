# 7sgraph

## ⚠️ OUTDATED, see the new graph [here](https://mdworld.nl/cytocom/?gedcomPath=%2Fcytocom%2F7sisters.ged&layout=cola) ([source](https://github.com/mdvanes/cytocom)) ⚠️

> Graph of characters from The Seven Sisters series of books

**Spoiler alert**: this app contains spoilers for The Seven Sisters series of books.

I do not own any rights to these characters or books. For more information about the series of books see [the site by the author, Lucinda Riley](http://lucindariley.co.uk/seven-sisters-series/).

## Lite Mode

When the application is running in Lite Mode, limited features are available.

Lite Mode exists to be able to run without a dynamic back-end. To have a dynamic back-end, I need a public facing host for the Dgraph Docker container, that persists data.

To run in Normal Mode, clone this repo and follow the instructions below to run the application locally. Lite Mode will only be enabled in production builds from `yarn build`, because it will retrieve the endpoint URL from the REACT_APP_GRAPHQL_URL environmental variable.

## TODO

- Try out Geo tab in Ratel
- filter/query by geo
- fix should this not for tail too? in convertPersonsToGraphData
- add interests: e.g. Botany, Singing, Modelling
- implement removing/hiding nodes
- Fix alignment by replacing by react-d3-graph by https://github.com/vasturiano/react-force-graph ? 
- Deploy backend to private server. Disable mutations with `dgraph alpha --mutations disallow`, does this work for standalone?
  https://dgraph.io/docs/deploy/dgraph-administration/#restricting-mutation-operations or see https://dgraph.io/docs/graphql/authorization/directive/#public-data -> so do `yarn schema:push`, `./populate.sh`, and secure by enabling @auth in prepare_schema.graphql and `yarn schema:push` again


## Set up the backend

- Clean checkout of repo
- mkdir dgraph
- Create Docker container:

map outside:inside port if needed

Persistent data:

```
docker run --rm -it \
    -p 8080:8080 \
    -p 9080:9080 \
    -p 8001:8000 \
    -v $(pwd)/dgraph:/dgraph \
    dgraph/standalone:v20.11.0
```

Non persistent (volatile) data:

```
docker run --rm -it \
    -p 8080:8080 \
    -p 9080:9080 \
    -p 8001:8000 \
    dgraph/standalone:v20.11.0
```

Visit http://localhost:8001 for Ratel UI
Visit http://localhost:3011/ for web UI

- Create a schema: `yarn schema:push`
- Seed database with data from persons.csv: `yarn populate && ./populate.sh`
- Start client: `yarn start`

## Deploying to local server

The front-end is deployed to Github pages with the workflow defined in .github/workflows

The back-end can be deployed to local server:

- log in to server with SSH
- mkdir 7sgraph-data
- run & deploy:

```
docker run -d \
    --name dgraph \
    -p 8088:8080 \
    -v $(pwd)/7sgraph-data:/dgraph \
    dgraph/standalone:v20.11.0
```

- get IP with ifconfig, this will be referred to as CONTAINER_IP in following steps
- push schema: `curl -X POST http://CONTAINER_IP:8088/admin/schema --data-binary '@prepare_schema.graphql'`
- populate: replace `localhost:8080/` by `CONTAINER_IP:8088/` in populate.sh and run `./populate.sh`
- set CONTAINER_IP in `.env` and push front-end
- it might be needed to set up a reverse proxy to refer a hostname to the CONTAINER_IP inside a network

## Deploying to Azure

The front-end is deployed to Github pages with the workflow defined in .github/workflows

The back-end can be deployed to Azure ACI:

- install Docker ACI Integration CLI for Linux https://docs.docker.com/engine/context/aci-integration/#install-the-docker-compose-cli-on-linux
    - now integrated in Docker Compose CLI
    - https://docs.docker.com/engine/context/aci-integration/#install-script
    - restart terminal
- docker login azure
    - browser should pop up to select account
- docker context create aci mdworldacicontext
    - e.g. select AzureFunctionsQuickstart-rg
- docker context ls (manual switching with `docker context use mdworldacicontext`)
- run & deploy (-p port mappings are not supported on ACI):

```
docker --context mdworldacicontext run \
    --name dgraph \
    -p 8080:8080 \
    dgraph/standalone:v20.11.0
```

- get IP from https://portal.azure.com > Container instances > dgraph > IP address, this will be referred to as CONTAINER_IP in following steps
- push schema: `curl -X POST http://CONTAINER_IP:8080/admin/schema --data-binary '@prepare_schema.graphql'`
- populate: replace `localhost:8080/` by `CONTAINER_IP:8080/` in populate.sh and run `./populate.sh`
- set CONTAINER_IP in `.env` and push front-end

## Technical stack

- [CRA TypeScript](https://create-react-app.dev/) for setting up a React app
- [react-d3-graph](https://danielcaldas.github.io/react-d3-graph/docs/index.html) graph visualisation library
- [graphql-codegen](https://graphql-code-generator.com/docs/getting-started/installation) GraphQL code generator
- [graphql-request](https://github.com/prisma-labs/graphql-request) to query a Graphql backend from React
- [DGraph](https://dgraph.io/docs/graphql/quick-start/) graph database with automatic GraphQL endpoint
- [GraphiQL](https://github.com/graphql/graphiql/blob/main/packages/graphiql/README.md) GraphQL query debugger
- [VSCode GraphQL extension](https://github.com/graphql/vscode-graphql) for Graphql syntax highlighting


## Notes

Create a schema:

`yarn schema:push`
or
`curl -X POST localhost:8080/admin/schema --data-binary '@prepare_schema.graphql'`

Populate with mutation query (in GraphiQL):

```
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
```

and retrieve them (in GraphiQL):

```
query {
  queryPerson {
    name
  }
}
```

Populate the database with ./populate.sh

In Ratel (DQL), try 

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

DQL automatic recurse:

{
  node(func: anyofterms(Person.name, "Maia")) @recurse(depth: 3) {
    uid
    expand(_all_) {
      
    }
  }
}