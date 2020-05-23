import React from "react";
import P from "./components/P";
import H from "./components/H";
import Code from "./components/Code";
import Delimiter from "./components/Delimiter";
import List from "./components/List";

const RenderHTML = ({ json }) => {
  const renderElement = (element, index) => {
    switch (element.type) {
      case "paragraph":
        return (
          <P key={index} element={element}>
            {element.data.text}
          </P>
        );
      case "code":
        return <Code key={index}>{element.data.code}</Code>;
      case "header":
        return <H key={index} element={element} />;
      case "simpleImage":
        return (
          <img
            key={index}
            width="100%"
            alt={element.data.caption}
            src={element.data.url}
          />
        );
      case "embed":
        return (
          <iframe
            key={index}
            title={element.data.caption}
            height={element.data.height}
            width="100%"
            src={element.data.embed}
          />
        );

      case "quote":
        return <q key={index}>{element.data.text}</q>;

      case "list":
        return <List element={element} key={index} />;
      case "delimiter":
        return <Delimiter key={index} />;

      default:
        return <h1 key={index}> *** </h1>;
    }
  };

  return (
    <div>
      {json.content.blocks.map((element, index) =>
        renderElement(element, index)
      )}
    </div>
  );
};

export default RenderHTML;
