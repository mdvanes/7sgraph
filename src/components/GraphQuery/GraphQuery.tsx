import React from "react";
import { Graph, GraphData, GraphLink } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import {
  convertPersonsToGraphData,
  isJustVal,
} from "./convertPersonsToGraphData";
import GraphTools from "../GraphTools/GraphTools";
import { useGraphSettingsContext } from "../../context/GraphSettingsContext";
import GraphDetails from "../GraphDetails/GraphDetails";
import { SET_DETAILS_FOR } from "../../context/actions";
import client from "./graphClient";
import { getIsAliveAfterStart, getIsBornBeforeEnd } from "./parseDate";
import { filterUniqueLinks, getMaybePersons } from "./graphQueryUtils";

const GraphQuery: FC = () => {
  const {
    dispatch,
    state: { searchByBook, detailsFor, timeRange },
  } = useGraphSettingsContext();
  const [graphData, setGraphData] = useState<GraphData<CustomNode, GraphLink>>({
    nodes: [],
    links: [],
  });

  const [filteredGraphData, setFilteredGraphData] = useState<
    GraphData<CustomNode, GraphLink>
  >({
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

      const lastNode = nodes[nodes.length - 1];

      setGraphData({
        nodes,
        links: filterUniqueLinks(links),
        focusedNodeId: lastNode.id,
      });

      // const getElem = document.getElementById(
      //   "graph-id-graph-container-zoomable"
      // );
      // if (getElem) {
      //   const graphInst = graphRef.current;
      //   const hi = 630;
      //   const wi = 1862;
      //   const { width, height } = { width: 200, height: 100 }; // TODO doesn't work because the dimensions are not done yet. getElem.getBoundingClientRect();
      //   const xOffset = Math.round(wi / 2 - width / 2);
      //   const yOffset = Math.round(hi / 2 - height / 2);
      //   const transformationConfig = `translate(${xOffset},${yOffset}) scale(1)`;
      //   (graphInst as any).state.focusTransformation = transformationConfig;
      // } else {
      //   console.log("no elem");
      // }
    } catch (err) {
      console.error(err);
    }
  }, [searchByBook]);

  useEffect(() => {
    memoizedInitialize();
  }, [memoizedInitialize]);

  useEffect(() => {
    // console.log("timerange is now", timeRange); TODO fix rerenderings/choppy slider?

    const [startDate, endDate] = timeRange;
    const { nodes, links } = graphData;

    const filteredNodes = nodes.filter((node) => {
      const isBornBeforeEnd = getIsBornBeforeEnd(endDate, node.dateOfBirth);
      const isAliveAfterStart = getIsAliveAfterStart(startDate, node.dateOfDeath);
      return isAliveAfterStart && isBornBeforeEnd;
    });

    const linksToExistingNodes = links.filter(
      (link) =>
        filteredNodes.some((n) => n.id === link.source) &&
        filteredNodes.some((n) => n.id === link.target)
    );

    setFilteredGraphData({
      nodes: filteredNodes,
      links: linksToExistingNodes,
    });
  }, [timeRange, graphData]);

  const onClickNode = (uid: string, originNode: CustomNode) => {
    // getConnectedToNameDQL(name);

    dispatch({
      type: SET_DETAILS_FOR,
      payload: uid,
    });

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

  const dumpData = () => {
    const getElem = document.getElementById(
      "graph-id-graph-container-zoomable"
    );
    if (getElem) {
      const graphInst = graphRef.current;
      const nodeCoords = Object.values((graphInst as any).state.nodes).map(
        ({ id, x, y }: any) => `${id},${x},${y}`
      );
      // console.table(nodeCoords);
      console.log(nodeCoords.join("\n"));
    } else {
      console.log("no elem");
    }
  };

  return (
    <>
      <GraphTools />
      <GraphDetails uid={detailsFor} />
      {filteredGraphData && filteredGraphData.nodes.length > 0 && (
        <Graph
          id="graph-id" // id is mandatory
          ref={graphRef as any}
          data={{ ...filteredGraphData }}
          config={appGraphConfig(
            window.innerWidth,
            window.innerHeight - 64 - 5
          )}
          onClickNode={onClickNode as any}
          onClickGraph={dumpData}
        />
      )}
    </>
  );
};

export default GraphQuery;
