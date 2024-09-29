/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import BuildTree from "./data/data";
import SoftButton from "components/SoftButton";
import { Box } from "@mui/system";

const CustomNode = ({ nodeDatum, toggleNode }) => {
  const boxWidth = 170;
  const boxHeight = 70;
  const maxLength = 50;

  // Helper function to truncate text
  const truncateText = (text, maxLength) => {

    return text?.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <g onClick={toggleNode} cursor="pointer">
      <rect
        width={boxWidth}
        height={boxHeight}
        x={-boxWidth / 2}
        y={-boxHeight / 2}
        fill="#2b4b7c"
        stroke="white"
        strokeWidth="1"
        rx="10"
        ry="10"
      />
      <foreignObject
        x={-boxWidth / 2 + 10}
        y={-boxHeight / 2 + 10}
        width={boxWidth - 20}
        height={boxHeight - 20}
      >
        <div
          style={{
            color: "white",
            fontSize: "14px",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "5px",
          }}
        >

          <>
            {truncateText(nodeDatum.name, maxLength)}
            <p style={{ fontSize: "12px" }}>( {nodeDatum.userId} )</p>
          </>
        </div>
      </foreignObject>
    </g>
  );
};

const TreeComponent = ({ data }) => {
  const [treeData, setTreeData] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [view, setView] = useState("sponsor"); // Add state to track current view

  useEffect(() => {
    const formattedData = BuildTree(data, view);
    setTreeData(formattedData);
  }, [data, view]);

  const toggleNode = (nodeId) => {
    setExpandedNodes((prevExpandedNodes) => ({
      ...prevExpandedNodes,
      [nodeId]: !prevExpandedNodes[nodeId],
    }));
  };

  const renderCustomNodeElement = ({ nodeDatum }) => (
    <CustomNode nodeDatum={nodeDatum} toggleNode={() => toggleNode(nodeDatum.id)} />
  );

  const filterTreeData = (nodes) => {
    return nodes.map((node) => ({
      ...node,
      children: expandedNodes[node.id] && node.children ? filterTreeData(node.children) : [],
    }));
  };

  const containerStyle = {
    width: "100%",
    height: "80dvh",
    padding: "24px",
  };

  // Calculate initial translate values
  const containerWidth = parseInt(containerStyle.width);
  const containerHeight = parseInt(containerStyle.height);
  const translate = {
    x: (containerWidth + (window.innerWidth - containerWidth)) / 2.5,
    y: containerHeight / 2,
  };

  return (
    <>
      <Box style={containerStyle}>
        <SoftButton
          variant="gradient"
          sx={{ float: "right" }}
          color="dark"
          onClick={() => setView(view === "sponsor" ? "placement" : "sponsor")}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}s View
        </SoftButton>
        {treeData.length > 0 && (
          <Tree
            data={filterTreeData(treeData)}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNodeElement}
            nodeSize={{ x: 300, y: 150 }}
            separation={{ siblings: 1, nonSiblings: 1.5 }}
            translate={translate}
          />
        )}
      </Box>
    </>
  );
};

export default TreeComponent;
