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
};

const GraphQuery: FC = () => {
  const {
    dispatch,
    state: { searchByBook, detailsFor },
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

      console.log(nodes[nodes.length - 1])
      const lastNode = nodes[nodes.length - 1];

      setGraphData({
        nodes,
        links: filterUniqueLinks(links),
        focusedNodeId: lastNode.id
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

      // const test = [
      //   { id: "pasalt", x: 143.37941937218255, y: 95.64324753402214 },
      //   { id: "maia", x: 95.46599894316034, y: -66.37937718877299 },
      //   { id: "alcyone", x: 282.55778648375406, y: -14.437604568957937 },
      //   { id: "asterope", x: -10.334345578019622, y: 79.24242054601132 },
      //   { id: "celeano", x: 275.13568867186984, y: 121.28544631708857 },
      //   { id: "taygete", x: -15.43622677379011, y: 191.18814121748528 },
      //   { id: "electra", x: 333.1187367418578, y: 203.90522441465885 },
      //   { id: "merope", x: 139.64217485563643, y: 257.8713581651615 },
      //   { id: "zedjr", x: 99.67764208725814, y: -132.15066242785937 },
      //   { id: "cristinacarvalho", x: -10.735214197328105, y: -119.21877143961831 },
      //   { id: "zed", x: 190.5833974204404, y: -123.94777334567428 },
      //   { id: "florianoquintelas", x: -54.80631505973065, y: -28.108250987180682 },
      //   { id: "kreeg", x: 190.74323155940067, y: -186.2139442768826 },
      //   { id: "theofalyskings", x: 270.9684433965274, y: -148.899282119852 },
      //   { id: "valentinaquintelas", x: -52.905878143046685, y: -102.86614748269014 },
      //   { id: "motherofvalentina", x: -174.87455821412755, y: -73.81944611880274 },
      //   { id: "beatrizac", x: -108.01295851700723, y: -156.59797227075157 },
      //   { id: "evandrocarvalho", x: -12.070334844648954, y: -190.54297746465926 },
      //   { id: "izabela", x: -331.2830388259747, y: -139.71683866270772 },
      //   { id: "laurentbrouilly", x: -222.19244002388712, y: -175.60083828350878 },
      //   { id: "gustavoac", x: -383.1619137979127, y: -66.91881734909123 },
      //   { id: "yaracanterino", x: -144.35958601018137, y: -203.99322819015424 },
      //   { id: "luizaac", x: -532.2032409739666, y: -25.718574338413475 },
      //   { id: "mauricioac", x: -488.9807380658985, y: 11.013688397852036 },
      //   { id: "antoniobonifacio", x: -526.3790711613892, y: -124.45112817800123 },
      //   { id: "carlabonifacio", x: -509.1397354433733, y: -84.86354569730506 },
      //   { id: "loenfagundes", x: -325.3757759247781, y: -219.65517124689882 },
      //   { id: "mariaelisadsc", x: -667.5578184740689, y: -169.72379260054302 },
      //   { id: "heitordsc", x: -672.5657877697449, y: -218.8593737696422 },
      //   { id: "brunocanterino", x: -396.48557601097366, y: -160.88150464496783 },
      //   { id: "fabianacanterino", x: -413.56760528613336, y: -216.6226321579264 },
      //   { id: "sandrocanterino", x: -456.199822816918, y: -202.28283240290259 },
      //   { id: "bear", x: 178.16115689974794, y: 13.53239317801178 },
      //   { id: "martha", x: 360.3978326021927, y: -103.11077249957833 },
      //   { id: "felixmhalvorsen", x: 370.8676789736711, y: -36.86633007479051 },
      //   { id: "thomfhalvorsen", x: 288.9455632389319, y: -61.87225826461295 },
      //   { id: "karinerosenblum", x: 393.2593821066296, y: -147.36038636149686 },
      //   { id: "piphalvorsen", x: 442.3185697375979, y: 63.18595573779973 },
      //   { id: "astridthorsen", x: 567.4407858045583, y: 27.666939872648058 },
      //   { id: "edvardhalvorsen", x: 489.1212593118445, y: -59.37561100340156 },
      //   { id: "annalandvik", x: 585.4555751239442, y: -147.6746690233786 },
      //   { id: "edvardgrieg", x: 503.69116318339456, y: -175.6865588640361 },
      //   { id: "jenshalvorsen", x: 649.985216659303, y: -80.35759617851511 },
      //   { id: "solveighalvorsen", x: 607.8130331851104, y: -22.78575336870003 },
      //   { id: "margaretetrolle", x: 777.2302482881735, y: -121.87675969045827 },
      //   { id: "jonashalvorsen", x: 787.9432537638105, y: -49.425221419422556 },
      //   { id: "beritlandvik", x: 673.947359478187, y: -183.8830464453238 },
      //   { id: "anderslandvik", x: 687.8367712207979, y: -136.2438401130496 },
      //   { id: "marina", x: 180.44517283612993, y: 222.3129597475458 },
      //   { id: "claudia", x: 167.77078746270058, y: 189.1170909328535 },
      //   { id: "georghoffman", x: 253.76835795360307, y: 234.0969152869901 },
      //   { id: "christian", x: 195.4307232975308, y: 172.76993630097786 },
      // ];
      // console.log(test.map(
      //   ({ id, x, y }: any) => `${id},${x},${y}`
      // ).join("\n"));
    } else {
      console.log("no elem");
    }
  };

  return (
    <>
      <GraphTools />
      <GraphDetails uid={detailsFor} />
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
          onClickGraph={dumpData}
        />
      )}
    </>
  );
};

export default GraphQuery;
