"use babel";

const plugin = {
  id: "sidebar-position",
  keySidebarPosition: "sidebarPosition",
};

const config = {
  [plugin.keySidebarPosition]: {
    title: "Sidebar Position",
    type: "string",
    default: "left",
    enum: ["left", "right"],
  },
};

/**
 *
 * @param {*} sidebarPosition
 */
function getCssVariables(sidebarPosition) {
  return [
    {
      name: "direction",
      value: sidebarPosition === "right" ? "row-reverse" : "row",
    },
  ];
}

function setCssVariable(variable) {
  document.documentElement.style.setProperty(
    `--inkdrop-${plugin.id}-${variable.name}`,
    variable.value
  );
}

function update() {
  const sidebarPosition = inkdrop.config.get(
    `${plugin.id}.${plugin.keySidebarPosition}`
  );

  const variables = getCssVariables(sidebarPosition);

  variables.forEach(setCssVariable);
}

function activate() {
  inkdrop.config.observe(`${plugin.id}.${plugin.keySidebarPosition}`, update);
}

function deactivate() {
  /* noop */
}

module.exports = {
  config,
  activate,
  deactivate,
};
