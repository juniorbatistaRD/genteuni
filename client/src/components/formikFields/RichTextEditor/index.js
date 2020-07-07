import React from "react";
import EditorJs from "react-editor-js";
import { EDITOR_JS_TOOLS } from "./tool";

const RichTextEditor = ({ setFieldValue, name }) => {
  return (
    <EditorJs
      onChange={(e) => setFieldValue(name, e.saver)}
      tools={EDITOR_JS_TOOLS}
    />
  );
};

export default RichTextEditor;
