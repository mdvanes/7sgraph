import { Graph, GraphData, GraphLink } from "react-d3-graph";
import { getSdk } from "../../generated/graphql";
import appGraphConfig, { CustomNode } from "./appGraphConfig";
import { GraphQLClient } from "graphql-request";
import { FC, useEffect, useRef, useState } from "react";
import {
  convertPersonsToGraphData,
  isJustVal,
} from "./convertPersonsToGraphData";
import GraphTools from "./GraphTools";
// import getConnectedToNameDQL from "../../dql/getPersonsByRelation";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   uri: "http://localhost:8080/graphql",
// });

const client = new GraphQLClient(process.env["REACT_APP_GRAPHQL_URL"] || "", {
  headers: {},
});

const filterUniqueLinks = (links: GraphLink[]): GraphLink[] => {
  const uniqueByCompoundId = Object.values(Object.fromEntries(links.map(l => ([`${l.source},${l.target}`, l]))));
  console.log("filterUniqueLinks", uniqueByCompoundId);
  return uniqueByCompoundId;
};

const GraphQuery: FC = () => {
  const [graphData, setGraphData] = useState<GraphData<CustomNode, GraphLink>>({
    nodes: [],
    links: [],
  });
  const { getPersonByUid, getStartNodes } = getSdk(client);
  const graphRef = useRef();

  const initialize = async () => {
    try {
      const { queryPerson } = await getStartNodes();

      const justPersons = queryPerson?.filter(isJustVal) ?? [];

      const [nodes, links] = convertPersonsToGraphData(justPersons);

      setGraphData({
        nodes,
        links: filterUniqueLinks(links),
      });

      const getElem = document.getElementById(
        "graph-id-graph-container-zoomable"
      );
      if (getElem) {
        // const graphInst = graphRef.current;
        // if (graphInst) {
        //   (graphRef.current as any).focusAnimationTimeout = 1000;
        //   console.log("graphref", graphRef.current);
        //   // (graphInst as any).resetNodesPositions();
        //   // (graphRef.current as any).restartSimulation();
        // }        console.log("elem found");
        // TODO focusedNodeId does not work with async, but this does. Fix to use ref instead of getElementById. Also calculate translate based on canvas size.
        // TODO also fix when dragging
        getElem.setAttribute("transform", "translate(790,334) scale(1)");
      } else {
        console.log("no elem");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

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
          links: filterUniqueLinks(graphData?.links ? graphData.links.concat(links) : []),
        });

        // const graphInst = graphRef.current;
        // if (graphInst) {
        //   console.log("graphref", graphRef.current);
        //   // (graphInst as any).resetNodesPositions();
        // }
      } catch (err) {
        console.error(err);
      }
    })();
  };

  useEffect(() => {
    console.log(graphData);
    // TODO deduplicate nodes and edges
  }, [graphData]);

  return (
    <>
      {/* <div className={classes.root}>
        <Typography id="range-slider" gutterBottom>
          Time range
        </Typography>
        <Slider
          value={value}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          getAriaValueText={valuetext}
        />
      </div> */}
      <GraphTools />
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
          onClickGraph={() => {
            console.log("click");
          }}
          //   onClickLink={onClickLink}
          // onNodePositionChange={(n, x, y) => {
          //   console.log(`Node ${n} moved to ${x},${y}`);
          // }}
        />
      )}
    </>
  );
};

export default GraphQuery;
