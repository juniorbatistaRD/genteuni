import Embed from "@editorjs/embed";
// import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import List from "@editorjs/list";
// import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
// import LinkTool from "@editorjs/link";
// import Image from "@editorjs/image";
// import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
// import Marker from "@editorjs/marker";
// import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import SimpleImage from "@editorjs/simple-image";

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  code: Code,
  header: {
    class: Header,
    config: {
      placeholder: "Escribe Encabezado",
      levels: [1, 2, 3, 4],
      defaultLevel: 1,
    },
  },
  quote: Quote,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
