export type MethodTone = "signal" | "system" | "decision" | "echo";

export type MethodBeat = {
  id: string;
  index: string;
  code: string;
  title: string;
  lead: string;
  body: string;
  tone: MethodTone;
};

export const METHOD_CURATOR_LINE =
  "Direction before execution. Four moves when the brief is still noise.";

export const methodBeats: MethodBeat[] = [
  {
    id: "read-signal",
    index: "01",
    code: "METHOD 01",
    title: "Read the signal",
    lead: "Business need, audience, and constraint — before any channel or tool.",
    body: "What is the actual decision? Who pays the cost of being wrong?",
    tone: "signal",
  },
  {
    id: "map-system",
    index: "02",
    code: "METHOD 02",
    title: "Map the system",
    lead: "CRM, channels, data, and operations as one field — not siloed deliverables.",
    body: "Where does information stall? What loop is broken between teams?",
    tone: "system",
  },
  {
    id: "choose-move",
    index: "03",
    code: "METHOD 03",
    title: "Choose the move",
    lead: "One strategic direction with a clear trade-off — not a deck of options.",
    body: "What do we stop doing? What gets measured in the next thirty days?",
    tone: "decision",
  },
  {
    id: "measure-echo",
    index: "04",
    code: "METHOD 04",
    title: "Measure the echo",
    lead: "Outcomes with context — lift, retention, cost, clarity — not vanity metrics.",
    body: "Did the system change, or did the report change? What would you repeat?",
    tone: "echo",
  },
];
