import React from "react";
import {
  Graph,
  GraphConfiguration,
  GraphLink,
  GraphNode,
} from "react-d3-graph";
import { Maybe, useGetAllPersonsQuery } from "../../generated/graphql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/graphql",
});

// type Maybe1<T> = Maybe<T> | undefined;

// function withDefault<T>(v: Maybe<T>, defaultVal: T): T {
//   return v ? v : defaultVal;
// }

function isJustVal<T>(val: Maybe<T>): val is T {
  return Boolean(val);
}

interface CustomNode extends GraphNode {
  name: string;
}

// the graph configuration, just override the ones you need
const myConfig: GraphConfiguration<CustomNode, GraphLink> = {
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  //   freezeAllDragEvents: false,
  height: 400,
  highlightDegree: 2,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 12,
  minZoom: 0.05,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: false,
  width: 800,
  d3: {
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 2,
    disableLinkForce: false,
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 10,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 14,
    highlightFontWeight: "bold",
    highlightStrokeColor: "red",
    highlightStrokeWidth: 1.5,
    mouseCursor: "crosshair",
    opacity: 0.9,
    renderLabel: true,
    size: 200,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle",
    labelProperty: (n: { name: string }) => n.name,
  },
  link: {
    color: "lightgray",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    // labelProperty: "label",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: true,
    strokeWidth: 3,
    markerHeight: 6,
    markerWidth: 6,
    // strokeDasharray: 0,
    // strokeDashoffset: 0,
    // strokeLinecap: "butt",
  },
};

// const fakeData = {
//   nodes: [
//     { id: "Maia" },
//     { id: "Alcyone" },
//     { id: "Asterope" },
//     { id: "Pa Salt" },
//   ],
//   links: [
//     {
//       source: "Pa Salt",
//       target: "Maia",
//     },
//   ],
// };

const GraphQuery = () => {
  const { data /*, loading, error */ } = useGetAllPersonsQuery({
    client,
  });

  const justPersons = data?.queryPerson?.filter(isJustVal) ?? [];

  const graphData = {
    nodes:
      justPersons.map(({ personID, name }) => ({
        id: personID || "a",
        name: name || "",
      })),
    links:
      justPersons.flatMap(({ personID, related }) => {
        return (
          related?.filter(isJustVal).map((relatedPerson) => ({
            source: personID,
            target: relatedPerson?.personID ?? "",
          })) ?? []
        );
      }),
  };

  return (
    <>
      <ul>
        {justPersons.map(({ personID, name }) => (
          <li key={personID}>{name}</li>
        ))}
      </ul>
      <div style={{ border: "1px solid black" }}>
        {graphData.nodes.length > 0 && (
          <Graph
            id="graph-id" // id is mandatory
            data={graphData}
            config={myConfig}
            //   onClickNode={onClickNode}
            //   onClickLink={onClickLink}
          />
        )}
      </div>
    </>
  );
};

export default GraphQuery;
