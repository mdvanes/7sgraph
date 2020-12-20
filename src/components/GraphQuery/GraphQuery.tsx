import { Maybe, Person, useQuery } from "../../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/graphql",
});

function withDefault<T>(v: Maybe<T>, defaultVal: T): T {
  return v || defaultVal;
}

const GraphQuery = () => {
  const { data /*, loading, error */ } = useQuery({
    client,
  });
  console.log(data);
  return (
    <ul>
      {data?.queryPerson
        ?.map((mp) => withDefault<Person>(mp, { personID: "0" }))
        .filter((p) => p.personID !== "0")
        .map(({ personID, name }) => (
          <li key={personID}>{name}</li>
        ))}
    </ul>
  );
};

export default GraphQuery;
