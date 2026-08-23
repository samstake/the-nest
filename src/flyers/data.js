export const schedule = [
  { week: "OCT 8", opponent: "New Jersey Devils", when: "Wed · 7:00 PM · NBCSP", loc: "home", tags: ["home"] },
  { week: "OCT 10", opponent: "Washington Capitals", when: "Fri · 7:00 PM · NBCSP", loc: "away", tags: ["away"] },
  { week: "OCT 14", opponent: "Edmonton Oilers", when: "Tue · 7:00 PM · TNT", loc: "home", tags: ["home", "prime"] },
  { week: "OCT 17", opponent: "Vancouver Canucks", when: "Fri · 7:00 PM · NBCSP", loc: "home", tags: ["home"] },
  { week: "OCT 19", opponent: "Minnesota Wild", when: "Sun · 5:00 PM · NHLN", loc: "away", tags: ["away"] },
  { week: "OCT 22", opponent: "Pittsburgh Penguins", when: "Wed · 7:00 PM · ESPN", loc: "home", tags: ["home", "prime"] },
  { week: "OCT 26", opponent: "New York Rangers", when: "Sun · 7:00 PM · ABC", loc: "away", tags: ["away", "prime"] },
  { week: "NOV 1", opponent: "Boston Bruins", when: "Sat · 7:00 PM · NBCSP", loc: "home", tags: ["home"] },
  { week: "NOV 8", opponent: "Carolina Hurricanes", when: "Sat · 7:00 PM · ESPN", loc: "away", tags: ["away", "prime"] },
  { week: "NOV 15", opponent: "Toronto Maple Leafs", when: "Sat · 7:00 PM · NHLN", loc: "home", tags: ["home"] },
  { week: "DEC 6", opponent: "Pittsburgh Penguins", when: "Sat · 7:00 PM · NBCSP", loc: "away", tags: ["away"] },
  { week: "DEC 31", opponent: "New York Islanders", when: "Wed · 1:00 PM · NBCSP", loc: "home", tags: ["home"] },
  { week: "JAN 10", opponent: "Tampa Bay Lightning", when: "Sat · 7:00 PM · ABC", loc: "home", tags: ["home", "prime"] },
  { week: "FEB 14", opponent: "Pittsburgh Penguins", when: "Sat · 7:00 PM · NBCSP", loc: "home", tags: ["home", "prime"] },
  { week: "MAR 7", opponent: "Carolina Hurricanes", when: "Sat · 7:00 PM · ESPN", loc: "home", tags: ["home", "prime"] },
  { week: "APR 11", opponent: "Regular season finale", when: "Sat · TBD · NBCSP", loc: "away", tags: ["away"] },
];

export const playoffRun = {
  headline: "The 2026 run",
  subhead: "First playoff series win since 2012. Orange storm through Round 1. Heartbreak in Round 2.",
  rounds: [
    {
      title: "Round 1 · vs Pittsburgh Penguins",
      result: "Flyers win 4–2",
      note: "Dan Vladar stole Game 6 with 42 saves. Cam York ended it in overtime. Porter Martone scored game-winners in Games 1 and 2 — the first teenager in NHL history to do that in his first two playoff games.",
    },
    {
      title: "Round 2 · vs Carolina Hurricanes",
      result: "Hurricanes win 4–0",
      note: "The run ended on Broad Street, but the city felt it. Trevor Zegras and Travis Konecny kept the offense alive. Matvei Michkov flashed star power. The orange was back.",
    },
  ],
  moments: [
    {
      title: "Martone makes history",
      detail: "Teenager Porter Martone — GWG in Games 1 and 2 vs Pittsburgh. The Wells Fargo Center lost its mind twice.",
    },
    {
      title: "York in overtime",
      detail: "Cam York's series-clinching OT goal in Game 6. The blue line became Broad Street legend.",
    },
    {
      title: "Vladar's wall",
      detail: "42 saves in the closeout. Dan Vladar went from backup to playoff hero overnight.",
    },
  ],
};

export const bullies = [
  { name: "Dave Schultz", stat: "472 PIM · 1974", note: "The Hammer. Enforcer of the Bullies dynasty." },
  { name: "Bobby Clarke", stat: "2× Cup · MVP", note: "Toothless grin, ruthless compete. The soul of Broad Street." },
  { name: "Bernie Parent", stat: "2× Vezina · 2× Cup", note: "Only the Lord saves more than Bernie." },
  { name: "Bill Barber", stat: "422 goals", note: "The Chief. Power forward before the term existed." },
];

export const cups = [
  { year: "1974", note: "First Cup. Broad Street Bullies shock the hockey world.", vs: "Boston Bruins" },
  { year: "1975", note: "Back-to-back. Repeat Bullies. Philadelphia owns hockey.", vs: "Buffalo Sabres" },
];

export const chants = {
  calls: {
    lgf: "Let's go Flyers! Let's go Flyers!",
    bullies: "BROAD STREET! BROAD STREET!",
    siren: "Penalty kill siren — hold the line!",
    orange: "ORANGE CRUSH! ORANGE CRUSH!",
  },
  tracks: {
    lgf: { id: "1RV36KTBeJc", title: "Let's Go Flyers — 2026 playoff home chant" },
    bullies: { id: "pBJdwgQBUGY", title: "Flyers vs Penguins — 2026 playoff Game 1" },
    siren: { id: "69tFiCjdAfo", title: "Philadelphia Flyers 2026 goal horn" },
    orange: { id: "0CafTNq7ykQ", title: "Flyers vs Penguins — 2026 playoff Game 2" },
  },
};
