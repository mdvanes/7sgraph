import { Maybe, Person, useGetAllPersonsQuery } from "../../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/graphql",
});

function withDefault<T>(v: Maybe<T>, defaultVal: T): T {
  return v || defaultVal;
}

const DefaultPerson: Person = {
    personID: "0"
}

const GraphQuery = () => {
  const { data /*, loading, error */ } = useGetAllPersonsQuery({
    client,
  });
  console.log(data);
  return (
    <ul>
      {data?.queryPerson
        ?.map((mp) => withDefault<Person>(mp as any, DefaultPerson))
        .filter((p) => p.personID !== "0")
        .map(({ personID, name }) => (
          <li key={personID}>{name}</li>
        ))}
    </ul>
  );
};

export default GraphQuery;
