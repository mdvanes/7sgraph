import React from "react";
import { Graph, GraphData, GraphLink } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  convertPersonsToGraphData,
  isJustVal,
} from "./convertPersonsToGraphData";
import GraphTools from "../GraphTools/GraphTools";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import GraphDetails from "../GraphDetails/GraphDetails";

const client = new GraphQLClient(process.env["REACT_APP_GRAPHQL_URL"] || "", {
  headers: {},
});

const filterUniqueLinks = (links: GraphLink[]): GraphLink[] => {
  const compoundIdsToLinks: [string, GraphLink][] = links.map((l) => [
    `${l.source},${l.target}`,
    l,
  ]);
  const uniqueByCompoundId = Object.values(
    Object.fromEntries(compoundIdsToLinks)
  );
  return uniqueByCompoundId;
};

const getMaybePersons = async (searchByBook: string) => {
  const { getStartNodes, getStoryById } = getSdk(client);
  if (searchByBook) {
    const { getStory } = await getStoryById({ id: searchByBook });
    return getStory?.persons;
  } else {
    const { queryPerson } = await getStartNodes();
    return queryPerson;
  }
}

const GraphQuery: FC = () => {
  const {
    state: { searchByBook },
  } = useGraphSettingsContext();
  const [graphData, setGraphData] = useState<GraphData<CustomNode, GraphLink>>({
    nodes: [],
    links: [],
  });
  const { getPersonByUid } = getSdk(client);
  const graphRef = useRef();

  const memoizedInitialize = useCallback(async () => {
    try {
      const maybePersons = await getMaybePersons(searchByBook);
      const justPersons = maybePersons?.filter(isJustVal) ?? [];
      const [nodes, links] = convertPersonsToGraphData(justPersons);

      setGraphData({
        nodes,
        links: filterUniqueLinks(links),
      });

      const getElem = document.getElementById(
        "graph-id-graph-container-zoomable"
      );
      if (getElem) {
        const graphInst = graphRef.current;
        const hi = 630;
        const wi = 1862;
        const { width, height } = { width: 200, height: 100 }; // TODO doesn't work because the dimensions are not done yet. getElem.getBoundingClientRect();
        const xOffset = Math.round(wi / 2 - width / 2);
        const yOffset = Math.round(hi / 2 - height / 2);
        const transformationConfig = `translate(${xOffset},${yOffset}) scale(1)`;
        (graphInst as any).state.focusTransformation = transformationConfig;
      } else {
        console.log("no elem");
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchByBook]);

  useEffect(() => {
    memoizedInitialize();
  }, [memoizedInitialize]);

  const onClickNode = (uid: string, originNode: CustomNode) => {
    // getConnectedToNameDQL(name);

    (async () => {
      try {
        const { getPerson } = await getPersonByUid({ uid });
        const persons = getPerson ? [getPerson].filter(isJustVal) : [];
        const [nodes, links] = persons
          ? convertPersonsToGraphData(persons, originNode)
          : [[], []];

        setGraphData({
          nodes: graphData?.nodes ? graphData.nodes.concat(nodes) : [],
          links: filterUniqueLinks(
            graphData?.links ? graphData.links.concat(links) : []
          ),
        });
      } catch (err) {
        console.error(err);
      }
    })();
  };

  return (
    <>
      <GraphTools />
      <GraphDetails name="e.g. Pa Salt ♂️" />
      {graphData && graphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          ref={graphRef as any}
          data={{ ...graphData }}
          config={appGraphConfig(
            window.innerWidth,
            window.innerHeight - 64 - 5
          )}
          onClickNode={onClickNode as any}
        />
      )}
    </>
  );
};

export default GraphQuery;
