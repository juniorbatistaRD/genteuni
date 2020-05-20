import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ children }) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={docco}
      customStyle={{ margin: "20px" }}
    >
      {children}
    </SyntaxHighlighter>
  );
};

export default Code;
