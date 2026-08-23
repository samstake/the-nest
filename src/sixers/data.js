export const roster = [
  { id: "embiid", num: "21", name: "Joel Embiid", role: "C · Captain", note: "2023 MVP. The Process personified." },
  { id: "maxey", num: "0", name: "Tyrese Maxey", role: "PG", note: "Fastest guard in the East. Maxey for three." },
  { id: "george", num: "8", name: "Paul George", role: "F", note: "PG-13 homecoming. Two-way wing." },
  { id: "oden", num: "35", name: "Andre Drummond", role: "C", note: "Boards and bruises off the bench." },
  { id: "bane", num: "45", name: "Dominick Barlow", role: "F", note: "Young wing with length." },
  { id: "edge", num: "25", name: "Quentin Grimes", role: "G", note: "Three-and-D spark." },
];

export const schedule = [
  { week: "OCT 22", opponent: "Milwaukee Bucks", when: "Tue · 7:30 PM · NBCS", loc: "home", tags: ["home"] },
  { week: "OCT 25", opponent: "Charlotte Hornets", when: "Fri · 7:00 PM · NBCS", loc: "away", tags: ["away"] },
  { week: "OCT 27", opponent: "Indiana Pacers", when: "Sun · 6:00 PM · NBCS", loc: "home", tags: ["home"] },
  { week: "OCT 30", opponent: "Boston Celtics", when: "Wed · 7:30 PM · ESPN", loc: "away", tags: ["away", "prime"] },
  { week: "NOV 2", opponent: "Brooklyn Nets", when: "Sat · 7:00 PM · NBCS", loc: "home", tags: ["home"] },
  { week: "NOV 4", opponent: "Cleveland Cavaliers", when: "Mon · 7:00 PM · NBCS", loc: "away", tags: ["away"] },
  { week: "NOV 8", opponent: "Los Angeles Lakers", when: "Fri · 7:30 PM · ESPN", loc: "home", tags: ["home", "prime"] },
  { week: "NOV 10", opponent: "Bye stretch", when: "Recovery week", loc: "bye", tags: [] },
];

export const legends = [
  { name: "Julius Erving", era: "1976–1987", note: "Dr. J. The ABA merger icon. Above the rim before above the rim was cool." },
  { name: "Allen Iverson", era: "1996–2006", note: "The Answer. MVP 2001. We talkin' about practice." },
  { name: "Wilt Chamberlain", era: "1959–1965", note: "100 points. 55 boards. Philly's original force of nature." },
  { name: "Moses Malone", era: "1982–1986", note: "Fo', fo', fo'. 1983 champion. The Chairman of the Boards." },
  { name: "Charles Barkley", era: "1984–1992", note: "The Round Mound of Rebound. MVP 1993." },
  { name: "Hal Greer", era: "1958–1973", note: "1967 champion. The original Sixers superstar." },
];

/** LeBron James games at / vs Philadelphia — the shrine */
export const lebronGames = [
  {
    id: "2008-49",
    date: "Mar 18, 2008",
    venue: "Wells Fargo Center",
    line: "49 PTS · 8 REB · 6 AST",
    headline: "49 in South Philly",
    note: "Cleveland LeBron dropped 49 on the Sixers. The building knew before the stat sheet printed.",
    videoId: "Dpjq3MwrOWI",
    videoTitle: "LeBron says Trust the Process — crowd erupts",
  },
  {
    id: "2012-triple",
    date: "Apr 5, 2012",
    venue: "Wells Fargo Center",
    line: "28 PTS · 11 REB · 10 AST",
    headline: "Triple-double coronation",
    note: "Another night, another LeBron masterclass. Philly fans booed and applauded in the same breath.",
    videoId: "hJBwL3i8xYI",
    videoTitle: "LeBron, Jaylen Brown, and Maxey dunk showcase",
  },
  {
    id: "2018-39",
    date: "Jan 27, 2018",
    venue: "Wells Fargo Center",
    line: "39 PTS · 7 REB · 8 AST",
    headline: "Process vs King",
    note: "Embiid's era rising. LeBron still ruled the night. Cavs 130, Sixers 114.",
    videoId: "QRYrE5wAJxw",
    videoTitle: "Trust the Process chant fills Wells Fargo Center",
  },
  {
    id: "2022-37",
    date: "Feb 25, 2022",
    venue: "Wells Fargo Center",
    line: "37 PTS · 8 REB · 5 AST",
    headline: "Lakers purple at the Center",
    note: "Late-career LeBron carving the Sixers. Still the most feared man in the building.",
    videoId: "6GtTB2ZH3zg",
    videoTitle: "76ers 2026–27 lineup — LeBron joins Philly",
  },
  {
    id: "2023-31",
    date: "Dec 4, 2023",
    venue: "Wells Fargo Center",
    line: "31 PTS · 7 REB · 9 AST",
    headline: "Year 21 in Philadelphia",
    note: "The King in his third decade. Wells Fargo on its feet even when he's the villain.",
    videoId: "lOT1w3RwWO4",
    videoTitle: "Jaylen Brown working out with LeBron",
  },
  {
    id: "2026-signing",
    date: "Jul 26, 2026",
    venue: "Xfinity Mobile Arena",
    line: "Year 24 · Sixers blue",
    headline: "The King becomes a Sixer",
    note: "Two-year deal. Banner 17 talk. South Broad gets the most famous visitor-turned-teammate in franchise history.",
    videoId: "6GtTB2ZH3zg",
    videoTitle: "Official 2026–27 Sixers lineup with LeBron",
  },
  {
    id: "2016-playoff",
    date: "Playoffs 2016",
    venue: "First Round · Game 4",
    line: "32 PTS · 10 REB · 7 AST",
    headline: "Playoff King visits Philly",
    note: "Cleveland en route to the title. Philly got the full playoff LeBron experience.",
    videoId: "q1anWd5Irac",
    videoTitle: "Sixers teammates locked in",
  },
  {
    id: "2015-34",
    date: "Mar 19, 2015",
    venue: "Wells Fargo Center",
    line: "34 PTS · 9 REB · 6 AST",
    headline: "South Broad takeover",
    note: "The pre-Process era Sixers still couldn't slow him. Nobody could.",
    videoId: "Dpjq3MwrOWI",
    videoTitle: "LeBron and the Process — Philly reaction",
  },
];

export const chants = {
  calls: {
    process: "Trust the Process!",
    maxey: "Maxey for three! Maxey for three!",
    embiid: "M-V-P! M-V-P!",
    bell: "Ring the bell! Ring the bell!",
  },
  tracks: {
    process: {
      id: "QRYrE5wAJxw",
      title: "Trust the Process chant — Wells Fargo Center",
    },
    maxey: {
      id: "inpnEbumi2I",
      title: "Tyrese Maxey 2025–26 season highlights",
    },
    embiid: {
      id: "s22qobYYRrk",
      title: "Joel Embiid wins the 2023 NBA MVP",
    },
    bell: {
      id: "6GtTB2ZH3zg",
      title: "76ers 2026–27 lineup — LeBron & Jaylen Brown",
    },
  },
};
