"use babel";

const plugin = {
  id: "sidebar-position",
  keySidebarPosition: "sidebarPosition",
  keyNoteListBarPosition: "noteListBarPosition",
};

const config = {
  [plugin.keySidebarPosition]: {
    title: "Sidebar Position",
    type: "string",
    default: "left",
    enum: ["left", "right"],
  },
  [plugin.keyNoteListBarPosition]: {
    title: "Note List Bar Position",
    type: "string",
    default: "left",
    enum: ["left", "right"],
  },
};

function setLayout({ sidebarPosition, noteListBarPosition }) {
  console.log("XXX", sidebarPosition, noteListBarPosition);
  const { layouts } = inkdrop;

  if (sidebarPosition === "right" && noteListBarPosition === "right") {
    layouts.setLayout("main:slim", [
      "ModalLayout",
      "EditorLayout",
      "NoteListBarLayout",
    ]);
    layouts.setLayout("main:full", [
      "ModalLayout",
      "EditorLayout",
      "NoteListBarLayout",
      "SideBarLayout",
    ]);
    return;
  } else if (sidebarPosition === "right" && noteListBarPosition === "left") {
    layouts.setLayout("main:slim", [
      "NoteListBarLayout",
      "ModalLayout",
      "EditorLayout",
    ]);
    layouts.setLayout("main:full", [
      "NoteListBarLayout",
      "ModalLayout",
      "EditorLayout",
      "SideBarLayout",
    ]);
    return;
  } else if (sidebarPosition === "left" && noteListBarPosition === "right") {
    layouts.setLayout("main:slim", [
      "ModalLayout",
      "EditorLayout",
      "NoteListBarLayout",
    ]);
    layouts.setLayout("main:full", [
      "SideBarLayout",
      "ModalLayout",
      "EditorLayout",
      "NoteListBarLayout",
    ]);
    return;
  } else if (sidebarPosition === "left" && noteListBarPosition === "left") {
    layouts.setLayout("main:slim", [
      "NoteListBarLayout",
      "ModalLayout",
      "EditorLayout",
    ]);
    layouts.setLayout("main:full", [
      "SideBarLayout",
      "NoteListBarLayout",
      "ModalLayout",
      "EditorLayout",
    ]);
    return;
  }
}

function updateSidebarPosition({ plugin }) {
  return (sidebarPosition) => {
    const noteListBarPosition = inkdrop.config.get(
      `${plugin.id}.${plugin.keyNoteListBarPosition}`
    );

    setLayout({ sidebarPosition, noteListBarPosition });
  };
}

function updateNoteListBarPosition({ plugin }) {
  return (noteListBarPosition) => {
    const sidebarPosition = inkdrop.config.get(
      `${plugin.id}.${plugin.keySidebarPosition}`
    );

    setLayout({ sidebarPosition, noteListBarPosition });
  };
}

function activate() {
  inkdrop.config.observe(
    `${plugin.id}.${plugin.keySidebarPosition}`,
    updateSidebarPosition({ plugin })
  );

  inkdrop.config.observe(
    `${plugin.id}.${plugin.keyNoteListBarPosition}`,
    updateNoteListBarPosition({ plugin })
  );
}

function deactivate() {
  /* noop */
}

module.exports = {
  config,
  activate,
  deactivate,
};
