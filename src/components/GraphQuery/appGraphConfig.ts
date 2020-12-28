import { GraphConfiguration, GraphLink, GraphNode } from "react-d3-graph";

export interface CustomNode extends GraphNode {
  name: string;
  x?: number,
  y?: number,
}

// the graph configuration, just override the ones you need
const appGraphConfig = (width: number, height: number): GraphConfiguration<CustomNode, GraphLink> => ({
  automaticRearrangeAfterDropNode: false,
  collapsible: false,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  //   freezeAllDragEvents: false,
  height,
  highlightDegree: 2,
  highlightOpacity: 0.2,
  linkHighlightBehavior: false,
  maxZoom: 12,
  minZoom: 0.05,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: true,
  width,
  d3: {
    alphaTarget: 0.05,
    gravity: -50,
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
    // labelProperty: (x) => x.source,
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: true,
    semanticStrokeWidth: true,
    strokeWidth: 3,
    markerHeight: 6,
    markerWidth: 6,
    // strokeDasharray: 0,
    // strokeDashoffset: 0,
    // strokeLinecap: "butt",
  },
});

export default appGraphConfig;
