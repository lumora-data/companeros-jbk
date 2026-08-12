"use client";

import { useEffect, useMemo, useState } from "react";
import EditorCanvas from "./EditorCanvas";
import EditorInspector from "./EditorInspector";
import EditorSidebar from "./EditorSidebar";
import EditorTopbar from "./EditorTopbar";
import type { DeviceMode, EditorSection } from "./utils";

type VisualEditorProps = {
  type: "companeros" | "jbk";
  title: string;
  sections: Record<string, unknown>;
  initialSections: Record<string, unknown>;
  definitions: EditorSection[];
  saving: boolean;
  onSectionsChange: (next: Record<string, unknown>) => void;
  onSave: () => void;
  onReload: () => void;
  onUpload: (file: File) => Promise<string>;
};

const HISTORY_LIMIT = 40;

export default function VisualEditor({
  type,
  title,
  sections,
  initialSections,
  definitions,
  saving,
  onSectionsChange,
  onSave,
  onReload,
  onUpload,
}: VisualEditorProps) {
  const [selectedKey, setSelectedKey] = useState(definitions[0]?.key || "");
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [past, setPast] = useState<Record<string, unknown>[]>([]);
  const [future, setFuture] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    setSelectedKey((current) => (definitions.some((definition) => definition.key === current) ? current : definitions[0]?.key || ""));
    setPast([]);
    setFuture([]);
  }, [definitions, type]);

  const changedKeys = useMemo(
    () =>
      definitions
        .filter((definition) => JSON.stringify(sections[definition.key]) !== JSON.stringify(initialSections[definition.key]))
        .map((definition) => definition.key),
    [definitions, initialSections, sections],
  );
  const changedSet = useMemo(() => new Set(changedKeys), [changedKeys]);
  const selectedDefinition = definitions.find((definition) => definition.key === selectedKey);
  const hasChanges = changedKeys.length > 0;

  function commitSections(next: Record<string, unknown>) {
    setPast((previous) => [...previous.slice(-HISTORY_LIMIT + 1), structuredClone(sections)]);
    setFuture([]);
    onSectionsChange(next);
  }

  function updateSelectedSection(nextValue: unknown) {
    if (!selectedKey) return;
    commitSections({ ...sections, [selectedKey]: nextValue });
  }

  function undo() {
    const previous = past[past.length - 1];
    if (!previous) return;
    setPast((items) => items.slice(0, -1));
    setFuture((items) => [structuredClone(sections), ...items].slice(0, HISTORY_LIMIT));
    onSectionsChange(previous);
  }

  function redo() {
    const next = future[0];
    if (!next) return;
    setFuture((items) => items.slice(1));
    setPast((items) => [...items.slice(-HISTORY_LIMIT + 1), structuredClone(sections)]);
    onSectionsChange(next);
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const command = event.metaKey || event.ctrlKey;
      if (!command) return;
      if (event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (hasChanges && !saving) onSave();
      }
      if (event.key.toLowerCase() === "z" && event.shiftKey) {
        event.preventDefault();
        redo();
      } else if (event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  useEffect(() => {
    function beforeUnload(event: BeforeUnloadEvent) {
      if (!hasChanges) return;
      event.preventDefault();
      event.returnValue = "";
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => window.removeEventListener("beforeunload", beforeUnload);
  }, [hasChanges]);

  return (
    <div className="space-y-4">
      <EditorTopbar
        title={title}
        device={device}
        hasChanges={hasChanges}
        changedCount={changedKeys.length}
        saving={saving}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
        onDeviceChange={setDevice}
        onSave={onSave}
        onReload={onReload}
        onUndo={undo}
        onRedo={redo}
      />
      <div className="grid gap-4 xl:flex xl:items-start">
        <EditorSidebar type={type} sections={definitions} selectedKey={selectedKey} changedKeys={changedSet} onSelect={setSelectedKey} />
        <EditorCanvas sections={definitions} values={sections} selectedKey={selectedKey} device={device} onSelect={setSelectedKey} />
        <EditorInspector
          section={selectedDefinition}
          value={selectedKey ? sections[selectedKey] : undefined}
          onChange={updateSelectedSection}
          onUpload={onUpload}
        />
      </div>
    </div>
  );
}
