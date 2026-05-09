export type AdminContentType = "home" | "companeros" | "jbk" | "about";

export type EditableSection = {
  key: string;
  label: string;
  description?: string;
};

export type EditableContentEntry = {
  title: string;
  sections: EditableSection[];
};

export type EditableSectionsPayload = Record<string, unknown>;
