import { PrismaClient } from "../src/app/generated/prisma";

const prisma = new PrismaClient();

const TRAVELERS = [
  "Doc Brown",
  "Marty McFly",
  "Sarah Connor",
  "The Doctor",
  "Bill S. Preston",
  "Ted Theodore Logan",
  "Hiro Nakamura",
  "James T. Kirk",
  "Kang the Conqueror",
  "Cable",
  "Bishop",
  "Booster Gold",
  "Sam Beckett",
  "Al Calavicci",
  "Phil Connors",
  "Old Biff Tannen",
  "H.G. Wells",
  "Rufus",
  "Donnie Darko",
  "Hermione Granger",
  "Barry Allen",
  "Eobard Thawne",
  "Nathan Drake",
  "Loki Laufeyson",
  "Nebula",
  "Cassie Lang",
  "John Connor",
  "Kyle Reese",
  "River Song",
  "Captain Jack Harkness",
];

const MISSIONS: { mission: string; yearRange: [number, number] }[] = [
  {
    mission: "Verify whether Shakespeare actually wrote Hamlet or was just a front",
    yearRange: [1599, 1603],
  },
  {
    mission: "Attend the original Woodstock and collect soil samples for temporal analysis",
    yearRange: [1969, 1969],
  },
  {
    mission: "Recover the lost Library of Alexandria scrolls before the fire",
    yearRange: [-48, -47],
  },
  {
    mission: "Observe the construction of the Great Pyramid — no interference allowed",
    yearRange: [-2580, -2560],
  },
  {
    mission: "Plant a temporal beacon at the signing of the Magna Carta",
    yearRange: [1215, 1215],
  },
  {
    mission: "Retrieve dinosaur DNA samples from the late Cretaceous period (sim-chamber)",
    yearRange: [-9999, -9000],
  },
  {
    mission: "Witness the eruption of Vesuvius and confirm Pliny the Elder's account",
    yearRange: [79, 79],
  },
  {
    mission: "Debug a Y2K-related temporal anomaly that leaked into 1999",
    yearRange: [1999, 2000],
  },
  {
    mission: "Photograph the construction of Stonehenge for the Temporal Archives",
    yearRange: [-3000, -2000],
  },
  {
    mission: "Taste the first coffee ever brewed and bring back beans for analysis",
    yearRange: [850, 900],
  },
  {
    mission: "Calibrate the flux capacitor using data from Tesla's Wardenclyffe Tower",
    yearRange: [1901, 1917],
  },
  {
    mission: "Confirm that Nero really did play the fiddle while Rome burned",
    yearRange: [64, 64],
  },
  {
    mission: "Retrieve Mozart's lost Requiem notes before they were scattered",
    yearRange: [1791, 1791],
  },
  {
    mission: "Scout forward position for temporal colony — assess habitability of year 3500",
    yearRange: [3400, 3600],
  },
  {
    mission: "Deliver paradox warning to the 2087 Temporal Research Lab before the incident",
    yearRange: [2085, 2087],
  },
  {
    mission: "Map the Viking settlement at Vinland before it was abandoned",
    yearRange: [1000, 1020],
  },
  {
    mission: "Observe the Big Bang shockwave from relay station Alpha — T+380,000 years",
    yearRange: [-9999, -9500],
  },
  {
    mission: "Rescue stranded chrononaut from the Jurassic — beacon last pinged in deep past",
    yearRange: [-8000, -7000],
  },
  {
    mission: "Install temporal dampeners around the Tunguska event to prevent echo cascades",
    yearRange: [1908, 1908],
  },
  {
    mission: "Attend Leonardo da Vinci's workshop and scan his unreleased blueprints",
    yearRange: [1490, 1519],
  },
  {
    mission: "Verify the exact date of the first controlled fire by early humans (sim-chamber)",
    yearRange: [-9000, -8500],
  },
  {
    mission: "Place monitoring equipment near Krakatoa, 48 hours before eruption",
    yearRange: [1883, 1883],
  },
  {
    mission: "Investigate temporal disturbance detected during the Moon landing broadcast",
    yearRange: [1969, 1969],
  },
  {
    mission: "Collect water samples from the pre-industrial Thames for pollution baseline",
    yearRange: [1650, 1700],
  },
  {
    mission: "Trade modern antibiotics recipe for Roman concrete formula — authorized barter",
    yearRange: [100, 200],
  },
  {
    mission: "Escort VIP historian to witness the fall of Constantinople",
    yearRange: [1453, 1453],
  },
  {
    mission: "Extract a mammoth tusk from Siberian permafrost circa 10,000 BCE",
    yearRange: [-12000, -8000],
  },
  {
    mission: "Set up relay beacon in 2250 for the Deep Future Communication Network",
    yearRange: [2240, 2260],
  },
  {
    mission: "Witness the first human-AI handshake — predicted to occur around 2045",
    yearRange: [2043, 2047],
  },
  {
    mission: "Recover black box from the temporal vessel lost during the 1943 Philadelphia Experiment",
    yearRange: [1943, 1943],
  },
  {
    mission: "Survey the far future — observe final stellar remnants in year 9999",
    yearRange: [9990, 9999],
  },
  {
    mission: "Verify that Cleopatra's beauty was real and not just Roman propaganda",
    yearRange: [-50, -30],
  },
  {
    mission: "Deliver maintenance parts to the stranded 2199 orbital station",
    yearRange: [2198, 2200],
  },
  {
    mission: "Record the sound of the first thunderstorm on Earth for the Temporal Audio Archive",
    yearRange: [-9500, -9200],
  },
  {
    mission: "Infiltrate the 1947 Roswell crash site and determine if alien tech was temporal in origin",
    yearRange: [1947, 1947],
  },
  {
    mission: "Run diagnostics on the paradox shield generators installed in 2312",
    yearRange: [2310, 2315],
  },
  {
    mission: "Observe the invention of the printing press — assess cultural shockwave radius",
    yearRange: [1440, 1450],
  },
  {
    mission: "Retrieve Amelia Earhart's flight recorder from the temporal pocket near Howland Island",
    yearRange: [1937, 1937],
  },
  {
    mission: "Bring back a jar of honey from an Egyptian tomb to test for temporal decay",
    yearRange: [-1300, -1200],
  },
  {
    mission: "Witness the first sunset seen by human eyes (deep-past expedition)",
    yearRange: [-7000, -6500],
  },
];

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomDate(daysBack: number): Date {
  const now = Date.now();
  const offset = Math.random() * daysBack * 24 * 60 * 60 * 1000;
  return new Date(now - offset);
}

async function main() {
  console.log("Seeding 100 time jumps...\n");

  const jumps = Array.from({ length: 100 }, function (_, i) {
    const traveler = pick(TRAVELERS);
    const missionEntry = MISSIONS[i % MISSIONS.length];
    const [lo, hi] = missionEntry.yearRange;
    const destinationYear = lo === hi ? lo : randomInt(lo, hi);
    const birthYear = randomInt(1940, 2010);
    const plutoniumCores = randomInt(1, 12);
    const suppressParadoxCheck = Math.random() < 0.2;

    return {
      travelerName: traveler,
      mission: missionEntry.mission,
      birthYear,
      destinationYear,
      plutoniumCores,
      suppressParadoxCheck,
      createdAt: randomDate(90),
    };
  });

  for (const jump of jumps) {
    await prisma.jumpRequest.create({ data: jump });
  }

  console.log(`Done — inserted ${jumps.length} jump requests.`);
}

main()
  .catch(function (e) {
    console.error(e);
    process.exit(1);
  })
  .finally(function () {
    return prisma.$disconnect();
  });
