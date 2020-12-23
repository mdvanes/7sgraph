import { DgraphClient, DgraphClientStub } from "dgraph-js-http";
import { Person } from "../generated/graphql";

// TODO not needed? remove dgraph-js-http dependency. Also does not benefit from the generated types.

const getPersonsByRelation = async (personName: Person["name"]) => {
  const clientStub = new DgraphClientStub("http://localhost:8080");
  const dgraphClient = new DgraphClient(clientStub);

  const query = `{
      getPersonsByRelation(func: eq(Person.name, "${personName}")) {
        uid
        expand(_all_) {
          uid
          expand(_all_)
        }
      }
    }`;
  const response: { data: any } = await dgraphClient.newTxn().query(query);
  (response.data.getPersonsByRelation as Person[]).map(p => console.log(p));
  // console.log("Response: ", JSON.stringify(response.data, null, 2));
};

export default getPersonsByRelation;
