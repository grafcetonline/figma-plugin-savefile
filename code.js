let selections = figma.currentPage.selection;
// check selection
if (selections.length > 0) {
  // - get content
  // - save to file

  // with selection 0
  let selection = selections[0];
  // - get content depending on type of selection
  let content;
  if (selection.type == "CODE_BLOCK") {
    content = selection.code;
  } else {
    content = selection.text.characters;
  }

  figma.ui.onmessage = async (msg) => {
    if (msg == "filesaved") {
      figma.notify("no selection", { error: true });
      figma.closePlugin();
    }
  };
  figma.showUI(__html__, { visible: false });
  // save to file
  figma.ui.postMessage({
    type: "savefile",
    fileName: "code.js",
    content: content
  });
} else {
  figma.notify("no selection", { error: true });
  figma.closePlugin();
}
