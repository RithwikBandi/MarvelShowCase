export interface MCUEntry {
  id: number;
  chronological_order: number;
  title: string;
  release_date: string;
  type: 'Movie' | 'Series' | 'Special';
  phase: string;
  description: string;
  plot: string;
  ott_platforms: string[];
  poster?: string;
  releaseOrder?: number;
  images: {
    poster: string;
    backdrop: string;
    logo?: string;
    slideshow?: string;
  };
  cast?: string[];
  director?: string;
  rating?: number;
}

export const mcuTimeline: MCUEntry[] = [
  {
    id: 1,
    chronological_order: 3,
    title: "Iron Man",
    release_date: "2008-05-02",
    type: "Movie",
    phase: "Phase 1",
    description: "Tony Stark builds a high-tech suit of armor and becomes Iron Man to fight against terrorism and corporate corruption.",
    plot: "After being kidnapped by terrorists in Afghanistan, billionaire engineer Tony Stark constructs a powerful suit of armor to escape. On returning home, he perfects the suit and becomes Iron Man — determined to take down those who misuse his weapons, even if they are from his own company. Stark's transformation from weapons manufacturer to superhero marks the beginning of the Marvel Cinematic Universe.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "iron-man-poster.jpg",
      backdrop: "iron-man-backdrop.jpg",
      slideshow: "iron-man-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Gwyneth Paltrow", "Jeff Bridges", "Terrence Howard"],
    director: "Jon Favreau",
    rating: 5
  },
  {
    id: 2,
    chronological_order: 5,
    title: "The Incredible Hulk",
    release_date: "2008-06-13",
    type: "Movie",
    phase: "Phase 1",
    description: "Bruce Banner seeks a cure for his condition while being hunted by the military and a new threat.",
    plot: "Dr. Bruce Banner, on the run from the U.S. Government, must find a cure for the monster he turns into whenever he loses his temper. However, Banner then must fight a soldier whom unleashes a more powerful creature than him. Living in shadows, Banner searches for a way to control his transformations while evading General Ross and confronting his past.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-incredible-hulk-poster.jpg",
      backdrop: "the-incredible-hulk-backdrop.jpg",
      slideshow: "the-incredible-hulk-slide.jpg"
    },
    cast: ["Edward Norton", "Liv Tyler", "Tim Roth", "William Hurt"],
    director: "Louis Leterrier",
    rating: 3
  },
  {
    id: 3,
    chronological_order: 4,
    title: "Iron Man 2",
    release_date: "2010-05-07",
    type: "Movie",
    phase: "Phase 1",
    description: "Tony Stark faces new threats from rival inventor Ivan Vanko and government pressure to share his technology.",
    plot: "With the world now aware of his dual identity as the armored superhero Iron Man, inventor Tony Stark faces pressure from the government, the press, and the public to share his technology. Unwilling to divulge the secrets behind the Iron Man armor, Stark must forge new alliances and confront powerful new forces threatening his life and livelihood.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "iron-man-2-poster.jpg",
      backdrop: "iron-man-2-backdrop.jpg",
      slideshow: "iron-man-2-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Mickey Rourke", "Gwyneth Paltrow", "Don Cheadle"],
    director: "Jon Favreau",
    rating: 4
  },
  {
    id: 4,
    chronological_order: 6,
    title: "Thor",
    release_date: "2011-05-06",
    type: "Movie",
    phase: "Phase 1",
    description: "The arrogant god Thor is banished to Earth and must prove himself worthy to reclaim his powers.",
    plot: "The powerful but arrogant god Thor is cast out of Asgard to live amongst humans in Midgard (Earth), where he soon becomes one of their finest defenders. Stripped of his powers and hammer Mjolnir, Thor must learn humility and prove himself worthy while his brother Loki schemes to take the throne of Asgard.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "thor-poster.jpg",
      backdrop: "thor-backdrop.jpg",
      slideshow: "thor-slide.jpg"
    },
    cast: ["Chris Hemsworth", "Natalie Portman", "Tom Hiddleston", "Anthony Hopkins"],
    director: "Kenneth Branagh",
    rating: 4
  },
  {
    id: 5,
    chronological_order: 1,
    title: "Captain America: The First Avenger",
    release_date: "2011-07-22",
    type: "Movie",
    phase: "Phase 1",
    description: "Steve Rogers transforms into Captain America during World War II to fight against the Nazi organization Hydra.",
    plot: "During World War II, Steve Rogers, a frail man from Brooklyn, is transformed into super-soldier Captain America to aid in the war effort. Rogers must stop the Red Skull – Adolf Hitler's ruthless head of weaponry, and the leader of an organization that intends to use a mysterious device of untold powers for world domination.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "captain-america-the-first-avenger-poster.jpg",
      backdrop: "captain-america-the-first-avenger-backdrop.jpg",
      slideshow: "captain-america-the-first-avenger-slide.jpg"
    },
    cast: ["Chris Evans", "Hayley Atwell", "Sebastian Stan", "Hugo Weaving", "Tommy Lee Jones"],
    director: "Joe Johnston",
    rating: 4
  },
  {
    id: 6,
    chronological_order: 7,
    title: "The Avengers",
    release_date: "2012-05-04",
    type: "Movie",
    phase: "Phase 1",
    description: "Earth's mightiest heroes unite for the first time to stop Loki and his alien army invasion.",
    plot: "When an unexpected enemy emerges that threatens global safety and security, Nick Fury, Director of the international peacekeeping agency known as S.H.I.E.L.D., finds himself in need of a team to pull the world back from the brink of disaster. Spanning the globe, a daring recruitment effort begins as Iron Man, Captain America, Thor, Hulk, Black Widow and Hawkeye assemble.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-avengers-poster.jpg",
      backdrop: "the-avengers-backdrop.jpg",
      slideshow: "the-avengers-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo", "Scarlett Johansson", "Jeremy Renner", "Tom Hiddleston"],
    director: "Joss Whedon",
    rating: 5
  },
  {
    id: 7,
    chronological_order: 9,
    title: "Iron Man 3",
    release_date: "2013-05-03",
    type: "Movie",
    phase: "Phase 2",
    description: "Tony Stark confronts a terrorist called the Mandarin while dealing with anxiety and PTSD from recent events.",
    plot: "When Tony Stark's world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution. Plagued with worry and sleepless nights following the events in New York, Tony builds more suits while confronting his deepest fears. With his back against the wall, Stark is left to survive by his own devices.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "iron-man-3-poster.jpg",
      backdrop: "iron-man-3-backdrop.jpg",
      slideshow: "iron-man-3-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Gwyneth Paltrow", "Don Cheadle", "Guy Pearce", "Rebecca Hall", "Ben Kingsley"],
    director: "Shane Black",
    rating: 4
  },
  {
    id: 8,
    chronological_order: 8,
    title: "Thor: The Dark World",
    release_date: "2013-11-08",
    type: "Movie",
    phase: "Phase 2",
    description: "Thor must save the universe from the Dark Elves while dealing with Jane Foster's mysterious condition.",
    plot: "Thor fights to restore order across the cosmos, but an ancient race led by the vengeful Malekith returns to plunge the universe back into darkness. Faced with an enemy that even Odin and Asgard cannot withstand, Thor must embark on his most perilous and personal journey yet, one that will reunite him with Jane Foster.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "thor-the-dark-world-poster.jpg",
      backdrop: "thor-the-dark-world-backdrop.jpg",
      slideshow: "thor-the-dark-world-slide.jpg"
    },
    cast: ["Chris Hemsworth", "Natalie Portman", "Tom Hiddleston", "Christopher Eccleston", "Anthony Hopkins", "Rene Russo"],
    director: "Alan Taylor",
    rating: 3
  },
  {
    id: 9,
    chronological_order: 10,
    title: "Captain America: The Winter Soldier",
    release_date: "2014-04-04",
    type: "Movie",
    phase: "Phase 2",
    description: "Steve Rogers discovers a conspiracy within S.H.I.E.L.D. while facing a mysterious assassin from his past.",
    plot: "After the cataclysmic events in New York with The Avengers, Steve Rogers, aka Captain America, is living quietly in Washington D.C. and trying to adjust to the modern world. But when a S.H.I.E.L.D. colleague comes under attack, Steve becomes embroiled in a web of intrigue that threatens to put the world at risk and faces his most dangerous enemy yet.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "captain-america-the-winter-soldier-poster.jpg",
      backdrop: "captain-america-the-winter-soldier-backdrop.jpg",
      slideshow: "captain-america-the-winter-soldier-slide.jpg"
    },
    cast: ["Chris Evans", "Scarlett Johansson", "Sebastian Stan", "Anthony Mackie", "Robert Redford", "Samuel L. Jackson"],
    director: "Anthony Russo, Joe Russo",
    rating: 5
  },
  {
    id: 10,
    chronological_order: 11,
    title: "Guardians of the Galaxy",
    release_date: "2014-08-01",
    type: "Movie",
    phase: "Phase 2",
    description: "A group of intergalactic misfits must work together to stop a fanatical warrior from destroying the galaxy.",
    plot: "Light years from Earth, 26 years after being abducted, Peter Quill finds himself the prime target of a manhunt after discovering an orb wanted by Ronan the Accuser. To evade the ever-persistent Ronan, Quill is forced into an uneasy truce with a quartet of disparate misfits. But when Quill discovers the true power of the orb, he must rally his ragtag rivals.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "guardians-of-the-galaxy-poster.jpg",
      backdrop: "guardians-of-the-galaxy-backdrop.jpg",
      slideshow: "guardians-of-the-galaxy-slide.jpg"
    },
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper", "Lee Pace", "Michael Rooker"],
    director: "James Gunn",
    rating: 5
  },
  {
    id: 11,
    chronological_order: 13,
    title: "Avengers: Age of Ultron",
    release_date: "2015-05-01",
    type: "Movie",
    phase: "Phase 2",
    description: "The Avengers face Ultron, an artificial intelligence bent on human extinction, while new heroes emerge.",
    plot: "When Tony Stark tries to jumpstart a dormant peacekeeping program, things go awry and Earth's Mightiest Heroes are put to the ultimate test as the fate of the planet hangs in the balance. As the villainous Ultron emerges, it is up to The Avengers to stop him from enacting his terrible plans, and soon uneasy alliances and unexpected action pave the way.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "avengers-age-of-ultron-poster.jpg",
      backdrop: "avengers-age-of-ultron-backdrop.jpg",
      slideshow: "avengers-age-of-ultron-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Chris Evans", "Chris Hemsworth", "Mark Ruffalo", "Scarlett Johansson", "Jeremy Renner", "James Spader", "Elizabeth Olsen", "Aaron Taylor-Johnson"],
    director: "Joss Whedon",
    rating: 4
  },
  {
    id: 12,
    chronological_order: 14,
    title: "Ant-Man",
    release_date: "2015-07-17",
    type: "Movie",
    phase: "Phase 2",
    description: "Scott Lang becomes the size-changing superhero Ant-Man to help prevent dangerous technology from falling into wrong hands.",
    plot: "Armed with the astonishing ability to shrink in scale but increase in strength, master thief Scott Lang must embrace his inner-hero and help his mentor, Dr. Hank Pym, protect the secret behind his spectacular Ant-Man suit from a new generation of towering threats. Against seemingly insurmountable obstacles, Pym and Lang must plan and pull off a heist.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "ant-man-poster.jpg",
      backdrop: "ant-man-backdrop.jpg",
      slideshow: "ant-man-slide.jpg"
    },
    cast: ["Paul Rudd", "Michael Douglas", "Evangeline Lilly", "Corey Stoll"],
    director: "Peyton Reed",
    rating: 4
  },
  {
    id: 13,
    chronological_order: 15,
    title: "Captain America: Civil War",
    release_date: "2016-05-06",
    type: "Movie",
    phase: "Phase 3",
    description: "Political interference divides the Avengers as they face consequences for their actions and a new enemy.",
    plot: "Political pressure mounts to install a system of accountability when the actions of the Avengers lead to collateral damage. The new status quo deeply divides members of the team. Captain America and Iron Man find themselves on opposite sides, while a mysterious figure from the past threatens to tear the team apart permanently. Friendships are tested as heroes become enemies.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "captain-america-civil-war-poster.jpg",
      backdrop: "captain-america-civil-war-backdrop.jpg",
      slideshow: "captain-america-civil-war-slide.jpg"
    },
    cast: ["Chris Evans", "Robert Downey Jr.", "Scarlett Johansson", "Sebastian Stan", "Anthony Mackie", "Don Cheadle", "Jeremy Renner"],
    director: "Anthony Russo, Joe Russo",
    rating: 5
  },
  {
    id: 14,
    chronological_order: 19,
    title: "Doctor Strange",
    release_date: "2016-11-04",
    type: "Movie",
    phase: "Phase 3",
    description: "A neurosurgeon discovers the mystic arts after a career-ending accident and becomes Earth's magical protector.",
    plot: "After his career is destroyed, a brilliant but arrogant surgeon gets a new lease on life when a sorcerer takes him under her wing and trains him to defend the world against evil. Dr. Stephen Strange's journey from skeptic to believer opens his eyes to a hidden world of magic and alternate dimensions, transforming him into the Master of the Mystic Arts.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "doctor-strange-poster.jpg",
      backdrop: "doctor-strange-backdrop.jpg",
      slideshow: "doctor-strange-slide.jpg"
    },
    cast: ["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams", "Tilda Swinton"],
    director: "Scott Derrickson",
    rating: 4
  },
  {
    id: 15,
    chronological_order: 12,
    title: "Guardians of the Galaxy Vol. 2",
    release_date: "2017-05-05",
    type: "Movie",
    phase: "Phase 3",
    description: "The Guardians discover Peter Quill's parentage while facing internal conflicts and a cosmic threat to the universe.",
    plot: "The Guardians must fight to keep their newfound family together as they unravel the mystery of Peter Quill's true parentage. Old foes become new allies and fan-favorite characters from the classic comics will come to our heroes' aid as the Marvel Cinematic Universe continues to expand. The team faces challenges that test their bonds while discovering the true meaning of family.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "guardians-of-the-galaxy-vol-2-poster.jpg",
      backdrop: "guardians-of-the-galaxy-vol-2-backdrop.jpg",
      slideshow: "guardians-of-the-galaxy-vol-2-slide.jpg"
    },
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper", "Michael Rooker", "Karen Gillan"],
    director: "James Gunn",
    rating: 5
  },
  {
    id: 16,
    chronological_order: 18,
    title: "Spider-Man: Homecoming",
    release_date: "2017-07-07",
    type: "Movie",
    phase: "Phase 3",
    description: "Young Peter Parker balances high school life with his new Spider-Man responsibilities while facing the Vulture.",
    plot: "A young Peter Parker/Spider-Man begins to navigate his newfound identity as the web-slinging superhero. Thrilled by his experience with the Avengers, Peter returns home where he lives with his Aunt May, under the watchful eye of mentor Tony Stark. Peter tries to fall back into his normal daily routine but is interrupted by the Vulture emerging as a new villain.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "spider-man-homecoming-poster.jpg",
      backdrop: "spider-man-homecoming-backdrop.jpg",
      slideshow: "spider-man-homecoming-slide.jpg"
    },
    cast: ["Tom Holland", "Michael Keaton", "Robert Downey Jr.", "Marisa Tomei"],
    director: "Jon Watts",
    rating: 4
  },
  {
    id: 17,
    chronological_order: 20,
    title: "Thor: Ragnarok",
    release_date: "2017-11-03",
    type: "Movie",
    phase: "Phase 3",
    description: "Thor must escape an alien planet and return to Asgard to prevent Ragnarok from destroying his home world.",
    plot: "Thor is imprisoned on the other side of the universe and finds himself in a race against time to get back to Asgard to stop Ragnarok, the destruction of his homeworld and the end of Asgardian civilization, at the hands of an all-powerful new threat, the ruthless Hela. First, he must survive a deadly gladiatorial contest against his former ally and fellow Avenger, the Hulk.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "thor-ragnarok-poster.jpg",
      backdrop: "thor-ragnarok-backdrop.jpg",
      slideshow: "thor-ragnarok-slide.jpg"
    },
    cast: ["Chris Hemsworth", "Tom Hiddleston", "Mark Ruffalo", "Cate Blanchett"],
    director: "Taika Waititi",
    rating: 5
  },
  {
    id: 18,
    chronological_order: 17,
    title: "Black Panther",
    release_date: "2018-02-16",
    type: "Movie",
    phase: "Phase 3",
    description: "T'Challa returns to Wakanda to assume the throne but faces challenges to his rule and kingdom.",
    plot: "After the death of his father, T'Challa returns home to the African nation of Wakanda to take his rightful place as king. When a powerful old enemy reappears, T'Challa's mettle as king and Black Panther is tested when he is drawn into a formidable conflict that puts the fate of Wakanda and the entire world at risk. He must unite his allies and release Black Panther's full power.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "black-panther-poster.jpg",
      backdrop: "black-panther-backdrop.jpg",
      slideshow: "black-panther-slide.jpg"
    },
    cast: ["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira"],
    director: "Ryan Coogler",
    rating: 5
  },
  {
    id: 19,
    chronological_order: 22,
    title: "Avengers: Infinity War",
    release_date: "2018-04-27",
    type: "Movie",
    phase: "Phase 3",
    description: "The Avengers unite with cosmic allies to stop Thanos from collecting all Infinity Stones and destroying half the universe.",
    plot: "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones and use them to inflict his twisted will on all of reality. The fate of Earth has never been more uncertain.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "avengers-infinity-war-poster.jpg",
      backdrop: "avengers-infinity-war-backdrop.jpg",
      slideshow: "avengers-infinity-war-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson", "Benedict Cumberbatch", "Tom Hiddleston"],
    director: "Anthony Russo, Joe Russo",
    rating: 5
  },
  {
    id: 20,
    chronological_order: 21,
    title: "Ant-Man and the Wasp",
    release_date: "2018-07-06",
    type: "Movie",
    phase: "Phase 3",
    description: "Scott Lang teams up with Hope van Dyne to rescue Janet van Dyne from the quantum realm.",
    plot: "Scott Lang grapples with the consequences of his choices as both a superhero and a father. As he struggles to rebalance his home life with his responsibilities as Ant-Man, he's confronted by Hope van Dyne and Dr. Hank Pym with an urgent new mission to rescue Janet van Dyne from the Quantum Realm before she's lost forever. The heroes must push beyond their limits.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "ant-man-and-the-wasp-poster.jpg",
      backdrop: "ant-man-and-the-wasp-backdrop.jpg",
      slideshow: "ant-man-and-the-wasp-slide.jpg"
    },
    cast: ["Paul Rudd", "Evangeline Lilly", "Michael Douglas", "Michael Peña"],
    director: "Peyton Reed",
    rating: 4
  },
  {
    id: 21,
    chronological_order: 2,
    title: "Captain Marvel",
    release_date: "2019-03-08",
    type: "Movie",
    phase: "Phase 3",
    description: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in a galactic war.",
    plot: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races. Set in the 1990s, the film tells the story of Danvers as she becomes Captain Marvel after Earth is caught in a galactic conflict. With help from Nick Fury, she discovers her past and true potential while facing the shape-shifting Skrulls.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "captain-marvel-poster.jpg",
      backdrop: "captain-marvel-backdrop.jpg",
      slideshow: "captain-marvel-slide.jpg"
    },
    cast: ["Brie Larson", "Samuel L. Jackson", "Ben Mendelsohn", "Jude Law"],
    director: "Anna Boden, Ryan Fleck",
    rating: 4
  },
  {
    id: 22,
    chronological_order: 23,
    title: "Avengers: Endgame",
    release_date: "2019-04-26",
    type: "Movie",
    phase: "Phase 3",
    description: "The surviving Avengers assemble one final time to undo Thanos' snap and restore the universe.",
    plot: "After the devastating events of Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all. The grave course of events set in motion by Thanos leads to the ultimate climactic battle.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "avengers-endgame-poster.jpg",
      backdrop: "avengers-endgame-backdrop.jpg",
      slideshow: "avengers-endgame-slide.jpg"
    },
    cast: ["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson", "Benedict Cumberbatch", "Tom Hiddleston"],
    director: "Anthony Russo, Joe Russo",
    rating: 5
  },
  {
    id: 23,
    chronological_order: 31,
    title: "Spider-Man: Far From Home",
    release_date: "2019-07-02",
    type: "Movie",
    phase: "Phase 3",
    description: "Peter Parker faces new threats while on a European vacation in a post-Endgame world.",
    plot: "Following the events of Endgame, Spider-Man must step up to take on new threats in a world that has changed forever. Peter Parker and his friends go on a summer trip to Europe, but their vacation is interrupted when Nick Fury recruits Peter to help Mysterio battle the Elementals. However, not everything is as it seems as Peter faces one of his greatest challenges yet.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "spider-man-far-from-home-poster.jpg",
      backdrop: "spider-man-far-from-home-backdrop.jpg",
      slideshow: "spider-man-far-from-home-slide.jpg"
    },
    cast: ["Tom Holland", "Samuel L. Jackson", "Jake Gyllenhaal", "Marisa Tomei"],
    director: "Jon Watts",
    rating: 4
  },
  {
    id: 24,
    chronological_order: 27,
    title: "WandaVision",
    release_date: "2021-01-15",
    type: "Series",
    phase: "Phase 4",
    description: "Wanda Maximoff and Vision live idealized suburban lives while strange events suggest everything is not as it seems.",
    plot: "Blends the style of classic sitcoms with the Marvel Cinematic Universe in which Wanda Maximoff and Vision, two super-powered beings living their ideal suburban lives, begin to suspect that everything is not as it seems. The series explores Wanda's grief and trauma following the events of Endgame, revealing how her powers have created an alternate reality where she can live happily with Vision.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "wanda-vision-poster.jpg",
      backdrop: "wanda-vision-backdrop.jpg",
      slideshow: "wanda-vision-slide.jpg"
    },
    cast: ["Elizabeth Olsen", "Paul Bettany"],
    director: "Matt Shakman",
    rating: 5
  },
  {
    id: 25,
    chronological_order: 28,
    title: "The Falcon and the Winter Soldier",
    release_date: "2021-03-19",
    type: "Series",
    phase: "Phase 4",
    description: "Sam Wilson and Bucky Barnes team up for a global adventure that tests their abilities and patience.",
    plot: "Following the events of Endgame, Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities and their patience. Sam struggles with the legacy of Captain America's shield while Bucky seeks redemption for his past as the Winter Soldier. Together they face new threats including the Flag Smashers and uncover a conspiracy that challenges their worldview.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-falcon-and-the-winter-soldier-poster.jpg",
      backdrop: "the-falcon-and-the-winter-soldier-backdrop.jpg",
      slideshow: "the-falcon-and-the-winter-soldier-slide.jpg"
    },
    cast: ["Anthony Mackie", "Sebastian Stan", "Erin Kellyman", "Emily VanCamp"],
    director: "Kari Skogland",
    rating: 5
  },
  {
    id: 26,
    chronological_order: 24,
    title: "Loki",
    release_date: "2021-06-09",
    type: "Series",
    phase: "Phase 4",
    description: "The God of Mischief steps out of his brother's shadow to help fix the broken timeline.",
    plot: "After stealing the Tesseract during the events of Endgame, Loki finds himself brought before the Time Variance Authority, a bureaucratic organization that monitors the timeline. Faced with being erased from existence due to being a time variant, Loki must help fix the timeline and prevent greater threats. The series explores themes of destiny, identity, and redemption across multiple timelines.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "loki-poster.jpg",
      backdrop: "loki-backdrop.jpg",
      slideshow: "loki-slide.jpg"
    },
    cast: ["Tom Hiddleston", "Gwyneth Paltrow", "Owen Wilson", "Wunmi Mosaku"],
    director: "Michael Waldron",
    rating: 5
  },
  {
    id: 27,
    chronological_order: 16,
    title: "Black Widow",
    release_date: "2021-07-09",
    type: "Movie",
    phase: "Phase 4",
    description: "Natasha Romanoff confronts her past and the spy program that made her while being pursued by a dangerous assassin.",
    plot: "Natasha Romanoff finds herself alone and forced to confront her past as a spy and the broken relationships left in her wake long before she became an Avenger. Pursued by a dangerous assassin and forced to face her history, Natasha must reconcile with her former life as a spy and the broken relationships she left behind. Set between Civil War and Infinity War.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "black-widow-poster.jpg",
      backdrop: "black-widow-backdrop.jpg",
      slideshow: "black-widow-slide.jpg"
    },
    cast: ["Scarlett Johansson", "Florence Pugh", "David Harbour", "Ray Winstone"],
    director: "Cate Shortland",
    rating: 4
  },
  {
    id: 28,
    chronological_order: 26,
    title: "What If...?",
    release_date: "2021-08-11",
    type: "Series",
    phase: "Phase 4",
    description: "An anthology series exploring alternate timelines in the Marvel Cinematic Universe with different outcomes.",
    plot: "The series explores alternate timelines in the multiverse that show what would happen if major moments from the Marvel Cinematic Universe occurred differently. Each episode features different characters and scenarios, from T'Challa becoming Star-Lord to Peggy Carter receiving the super soldier serum. The Watcher observes these realities while maintaining his oath of non-interference, until a greater threat emerges.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "what-if-poster.jpg",
      backdrop: "what-if-backdrop.jpg",
      slideshow: "what-if-slide.jpg"
    },
    cast: ["Tom Hiddleston", "Elizabeth Olsen", "Paul Bettany"],
    director: "Kari Skogland",
    rating: 5
  },
  {
    id: 29,
    chronological_order: 29,
    title: "Shang-Chi and the Legend of the Ten Rings",
    release_date: "2021-09-03",
    type: "Movie",
    phase: "Phase 4",
    description: "Shang-Chi confronts his past and the Ten Rings organization led by his father, the Mandarin.",
    plot: "Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization. Living a quiet life in San Francisco, Shang-Chi is forced to face his father, the powerful leader of the Ten Rings, and confront the legacy of his family. The film explores themes of family, identity, and accepting one's destiny while showcasing martial arts action.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "shang-chi-and-the-legend-of-the-ten-rings-poster.jpg",
      backdrop: "shang-chi-and-the-legend-of-the-ten-rings-backdrop.jpg",
      slideshow: "shang-chi-and-the-legend-of-the-ten-rings-slide.jpg"
    },
    cast: ["Simu Liu", "Awkwafina", "Tony Leung", "Meng'er Zhang"],
    director: "Destin Daniel Cretton",
    rating: 4
  },
  {
    id: 30,
    chronological_order: 30,
    title: "Eternals",
    release_date: "2021-11-05",
    type: "Movie",
    phase: "Phase 4",
    description: "Ancient immortal beings emerge from hiding to protect Earth against their evil counterparts, the Deviants.",
    plot: "The Eternals, an immortal alien race created by the Celestials who have secretly lived on Earth for over 7,000 years, reunite to protect humanity from their evil counterparts, the Deviants. Following the events of Endgame, the emergence begins and the Eternals must come together despite their differences to save Earth. The film explores their relationships and the moral complexities of their mission.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "eternals-poster.jpg",
      backdrop: "eternals-backdrop.jpg",
      slideshow: "eternals-slide.jpg"
    },
    cast: ["Gemma Chan", "Richard Madden", "Kumail Nanjiani", "Salma Hayek"],
    director: "Chloé Zhao",
    rating: 4
  },
  {
    id: 31,
    chronological_order: 34,
    title: "Hawkeye",
    release_date: "2021-11-24",
    type: "Series",
    phase: "Phase 4",
    description: "Clint Barton teams up with Kate Bishop to confront enemies from his past during the holiday season.",
    plot: "Set during the holiday season, former Avenger Clint Barton has a seemingly simple mission: get back to his family for Christmas. But when a threat from his past shows up, Hawkeye reluctantly teams up with Kate Bishop, a 22-year-old archer with dreams of becoming a superhero, to unravel a criminal conspiracy. The series explores legacy, family, and the consequences of Hawkeye's vigilante past.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "hawkeye-poster.jpg",
      backdrop: "hawkeye-backdrop.jpg",
      slideshow: "hawkeye-slide.jpg"
    },
    cast: ["Jeremy Renner", "Hailee Steinfeld", "Florence Pugh", "Vera Farmiga"],
    director: "Rhys Thomas",
    rating: 4
  },
  {
    id: 32,
    chronological_order: 32,
    title: "Spider-Man: No Way Home",
    release_date: "2021-12-17",
    type: "Movie",
    phase: "Phase 4",
    description: "Peter Parker's identity is revealed, leading to multiverse chaos as villains from other Spider-Man universes appear.",
    plot: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man. The film brings together villains and heroes from previous Spider-Man films, testing Peter's resolve and forcing him to make difficult sacrifices for the greater good.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "spider-man-no-way-home-poster.jpg",
      backdrop: "spider-man-no-way-home-backdrop.jpg",
      slideshow: "spider-man-no-way-home-slide.jpg"
    },
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jon Favreau"],
    director: "Jon Watts",
    rating: 5
  },
  {
    id: 33,
    chronological_order: 35,
    title: "Moon Knight",
    release_date: "2022-03-30",
    type: "Series",
    phase: "Phase 4",
    description: "Steven Grant discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector.",
    plot: "Steven Grant, a mild-mannered gift-shop employee, becomes plagued with blackouts and memories of another life. Steven discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector. As Steven/Marc's enemies converge upon them, they must navigate their complex identities while thrust into a deadly mystery among the powerful gods of Egypt. Ancient mythology meets modern psychology in this supernatural thriller.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "moon-knight-poster.jpg",
      backdrop: "moon-knight-backdrop.jpg",
      slideshow: "moon-knight-slide.jpg"
    },
    cast: ["Oscar Isaac", "Ethan Hawke", "Maya Hawke", "F. Murray Abraham"],
    director: "Muhammad Diyab",
    rating: 4
  },
  {
    id: 34,
    chronological_order: 33,
    title: "Doctor Strange in the Multiverse of Madness",
    release_date: "2022-05-06",
    type: "Movie",
    phase: "Phase 4",
    description: "Doctor Strange travels through the multiverse to protect America Chavez while facing the Scarlet Witch.",
    plot: "Doctor Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff. Strange must team up with America Chavez, a teenager with the power to travel between dimensions, while confronting a Wanda corrupted by the Darkhold seeking to reunite with her children.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "doctor-strange-in-the-multiverse-of-madness-poster.jpg",
      backdrop: "doctor-strange-in-the-multiverse-of-madness-backdrop.jpg",
      slideshow: "doctor-strange-in-the-multiverse-of-madness-slide.jpg"
    },
    cast: ["Benedict Cumberbatch", "Elizabeth Olsen", "Chiwetel Ejiofor", "Xochitl Gomez"],
    director: "Sam Raimi",
    rating: 4
  },
  {
    id: 35,
    chronological_order: 36,
    title: "Ms. Marvel",
    release_date: "2022-06-08",
    type: "Series",
    phase: "Phase 4",
    description: "Kamala Khan, a Muslim American teenager, gains cosmic powers and becomes the superhero Ms. Marvel.",
    plot: "Kamala Khan, a Muslim American teenager growing up in Jersey City, is a super fan of the Avengers and particularly Captain Marvel. She feels like she doesn't fit in at school and sometimes even at home, until she gets superpowers like the heroes she's always looked up to. Life becomes easier and more complicated as she learns to navigate her newfound abilities, family expectations, and superhero responsibilities.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "ms-marvel-poster.jpg",
      backdrop: "ms-marvel-backdrop.jpg",
      slideshow: "ms-marvel-slide.jpg"
    },
    cast: ["Iman Vellani", "Zoe Saldaña", "Brie Larson", "Kamala Khan"],
    director: "Adil & Bilall",
    rating: 4
  },
  {
    id: 36,
    chronological_order: 38,
    title: "Thor: Love and Thunder",
    release_date: "2022-07-08",
    type: "Movie",
    phase: "Phase 4",
    description: "Thor reunites with Jane Foster, now wielding Mjolnir, to stop Gorr the God Butcher's rampage.",
    plot: "Thor embarks on a journey unlike anything he's ever faced – a quest for inner peace. But his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods. To combat the threat, Thor enlists the help of King Valkyrie, Korg and ex-girlfriend Jane Foster, who inexplicably wields his magical hammer, Mjolnir, as the Mighty Thor. Together, they venture into the cosmic adventure.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "thor-love-and-thunder-poster.jpg",
      backdrop: "thor-love-and-thunder-backdrop.jpg",
      slideshow: "thor-love-and-thunder-slide.jpg"
    },
    cast: ["Chris Hemsworth", "Natalie Portman", "Tessa Thompson", "Christian Bale"],
    director: "Taika Waititi",
    rating: 4
  },
  {
    id: 37,
    chronological_order: 37,
    title: "She-Hulk: Attorney at Law",
    release_date: "2022-08-18",
    type: "Series",
    phase: "Phase 4",
    description: "Jennifer Walters gains Hulk powers and must balance her legal career with her new superhero abilities.",
    plot: "Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk. After a car accident results in her receiving a blood transfusion from her cousin Bruce Banner, Jennifer must learn to control her new abilities while maintaining her legal practice. The series combines legal comedy with superhero action as she represents superhuman clients.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "she-hulk-attorney-at-law-poster.jpg",
      backdrop: "she-hulk-attorney-at-law-backdrop.jpg",
      slideshow: "she-hulk-attorney-at-law-slide.jpg"
    },
    cast: ["Tatiana Maslany", "Jameela Jamil", "Renée Elise Goldsberry", "Josh Segarra"],
    director: "Kat Coiro",
    rating: 4
  },
  {
    id: 38,
    chronological_order: 38,
    title: "Werewolf by Night",
    release_date: "2022-10-07",
    type: "Special",
    phase: "Phase 4",
    description: "A Halloween special introducing supernatural elements with monster hunters competing for a powerful relic.",
    plot: "On a dark and somber night, a secret cabal of monster hunters emerge from the shadows and gather at the foreboding Bloodstone Temple following the death of their leader. In a strange and macabre memorial to the leader's life, the attendees are thrust into a mysterious and deadly competition for a powerful relic. The black-and-white special introduces supernatural horror elements to the MCU with classic monster movie aesthetics.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "werewolf-by-night-poster.jpg",
      backdrop: "werewolf-by-night-backdrop.jpg",
      slideshow: "werewolf-by-night-slide.jpg"
    },
    cast: ["Gael García Bernal", "Laura Donnelly", "Ethan Hawke", "Anna Diop"],
    director: "Michael Giacchino",
    rating: 4
  },
  {
    id: 39,
    chronological_order: 39,
    title: "Black Panther: Wakanda Forever",
    release_date: "2022-11-11",
    type: "Movie",
    phase: "Phase 4",
    description: "Wakanda mourns T'Challa while facing a new threat from the underwater kingdom of Talokan.",
    plot: "Queen Ramonda, Shuri, M'Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T'Challa's death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda. The film honors Chadwick Boseman's legacy while introducing new threats.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "black-panther-wakanda-forever-poster.jpg",
      backdrop: "black-panther-wakanda-forever-backdrop.jpg",
      slideshow: "black-panther-wakanda-forever-slide.jpg"
    },
    cast: ["Letitia Wright", "Angela Bassett", "Michael B. Jordan", "Rihanna"],
    director: "Ryan Coogler",
    rating: 4
  },
  {
    id: 40,
    chronological_order: 39,
    title: "The Guardians of the Galaxy Holiday Special",
    release_date: "2022-11-25",
    type: "Special",
    phase: "Phase 4",
    description: "The Guardians plan to give Peter Quill the perfect Christmas by kidnapping his hero Kevin Bacon.",
    plot: "Star-Lord, Drax, Rocket, Groot and Mantis set out to give Peter Quill the perfect Christmas after learning about the holiday traditions on Earth. Their plan involves traveling to Earth and kidnapping Peter's childhood hero, Kevin Bacon. The special combines holiday cheer with the Guardians' signature humor while exploring themes of family and friendship during the Christmas season in a lighthearted adventure.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-guardians-of-the-galaxy-holiday-special-poster.jpg",
      backdrop: "the-guardians-of-the-galaxy-holiday-special-backdrop.jpg",
      slideshow: "the-guardians-of-the-galaxy-holiday-special-slide.jpg"
    },
    cast: ["Chris Pratt", "Dave Bautista", "Bradley Cooper", "Vin Diesel"],
    director: "James Gunn",
    rating: 5
  },
  {
    id: 41,
    chronological_order: 40,
    title: "Ant-Man and the Wasp: Quantumania",
    release_date: "2023-02-17",
    type: "Movie",
    phase: "Phase 5",
    description: "The Ant-Man family explores the Quantum Realm and faces Kang the Conqueror in a multiverse-threatening adventure.",
    plot: "Scott Lang and Hope Van Dyne, along with Hank Pym and Janet Van Dyne, explore the Quantum Realm, where they interact with strange creatures and embark on an adventure that pushes them beyond the limits of what they thought was possible. The family encounters Kang the Conqueror, a time-traveling villain who threatens not just their reality but the entire multiverse. Janet's past in the Quantum Realm comes back to haunt them.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "ant-man-and-the-wasp-quantumania-poster.jpg",
      backdrop: "ant-man-and-the-wasp-quantumania-backdrop.jpg",
      slideshow: "ant-man-and-the-wasp-quantumania-slide.jpg"
    },
    cast: ["Paul Rudd", "Evangeline Lilly", "Michael Douglas", "Kathryn Newton"],
    director: "Peyton Reed",
    rating: 4
  },
  {
    id: 42,
    chronological_order: 41,
    title: "Guardians of the Galaxy Vol. 3",
    release_date: "2023-05-05",
    type: "Movie",
    phase: "Phase 5",
    description: "The Guardians embark on a final mission to save Rocket's life while uncovering his tragic origin story.",
    plot: "Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and protect one of their own. If the mission is not completely successful, it could possibly lead to the end of the Guardians as we know them. The film explores Rocket's tragic backstory and his creator, the High Evolutionary, while the team faces their most emotional and dangerous mission yet, testing the bonds of their chosen family.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "guardians-of-the-galaxy-vol-3-poster.jpg",
      backdrop: "guardians-of-the-galaxy-vol-3-backdrop.jpg",
      slideshow: "guardians-of-the-galaxy-vol-3-slide.jpg"
    },
    cast: ["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Bradley Cooper", "Vin Diesel"],
    director: "James Gunn",
    rating: 5
  },
  {
    id: 43,
    chronological_order: 42,
    title: "Secret Invasion",
    release_date: "2023-06-21",
    type: "Series",
    phase: "Phase 5",
    description: "Nick Fury uncovers a secret invasion of shape-shifting Skrulls who have infiltrated Earth's governments.",
    plot: "Nick Fury learns of a clandestine invasion of Earth by a faction of shapeshifting Skrulls. Fury joins his allies, including Everett Ross, Maria Hill, and the Skrull Talos, who has made a life for himself on Earth. Together they race against time to thwart an imminent Skrull invasion and save humanity. The series explores themes of trust, identity, and the consequences of broken promises.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "secret-invasion-poster.jpg",
      backdrop: "secret-invasion-backdrop.jpg",
      slideshow: "secret-invasion-slide.jpg"
    },
    cast: ["Nick Fury", "Everett Ross", "Maria Hill", "Talos"],
    director: "Kari Skogland",
    rating: 4
  },
  {
    id: 44,
    chronological_order: 25,
    title: "Loki Season 2",
    release_date: "2023-10-05",
    type: "Series",
    phase: "Phase 5",
    description: "Loki struggles with time-slipping while the TVA faces collapse, threatening the multiverse's stability.",
    plot: "After the events of the first season, Loki finds himself lost in time and experiencing time-slipping, bouncing between past and future uncontrollably. The Time Variance Authority is in disarray following He Who Remains' death, and the multiverse is spiraling toward chaos. Loki must work with Mobius, Sylvie, and other allies to stabilize the timeline while discovering the true cost of free will and the burden of protecting infinite realities.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "loki-season-2-poster.jpg",
      backdrop: "loki-season-2-backdrop.jpg",
      slideshow: "loki-season-2-slide.jpg"
    },
    cast: ["Tom Hiddleston", "Gwyneth Paltrow", "Owen Wilson", "Wunmi Mosaku"],
    director: "Michael Waldron",
    rating: 5
  },
  {
    id: 45,
    chronological_order: 43,
    title: "The Marvels",
    release_date: "2023-11-10",
    type: "Movie",
    phase: "Phase 5",
    description: "Captain Marvel, Ms. Marvel, and Monica Rambeau team up when their powers become mysteriously entangled.",
    plot: "Carol Danvers aka Captain Marvel has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole, her powers become entangled with Jersey City super-fan Kamala Khan aka Ms. Marvel, and Carol's estranged niece Monica Rambeau. Together, this unlikely trio must team up.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-marvels-poster.jpg",
      backdrop: "the-marvels-backdrop.jpg",
      slideshow: "the-marvels-slide.jpg"
    },
    cast: ["Brie Larson", "Iman Vellani", "Teyonah Parris", "Tina Majorino"],
    director: "Nia DaCosta",
    rating: 4
  },
  {
    id: 46,
    chronological_order: 44,
    title: "What If...? Season 2",
    release_date: "2023-12-22",
    type: "Series",
    phase: "Phase 5",
    description: "The Watcher returns with new stories exploring alternate realities and possibilities across the multiverse.",
    plot: "The anthology series returns with new stories that examine alternate timelines in the multiverse where pivotal moments unfold differently. The Watcher continues to observe these realities while grappling with his oath of non-interference. New episodes explore different characters and scenarios, showcasing how small changes can lead to vastly different outcomes. The season builds toward larger multiversal threats that may require the Watcher's intervention once again.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "what-if-season-2-poster.jpg",
      backdrop: "what-if-season-2-backdrop.jpg",
      slideshow: "what-if-season-2-slide.jpg"
    },
    cast: ["Tom Hiddleston", "Elizabeth Olsen", "Paul Bettany"],
    director: "Kari Skogland",
    rating: 5
  },
  {
    id: 47,
    chronological_order: 45,
    title: "Echo",
    release_date: "2024-01-09",
    type: "Series",
    phase: "Phase 5",
    description: "Maya Lopez returns to her hometown to confront her past and reconnect with her Native American heritage.",
    plot: "Maya Lopez must face her past, reconnect with her Native American roots and embrace the meaning of family and community if she ever hopes to move forward. After the events of Hawkeye, Maya returns to her hometown where she must confront her family's history and the legacy of violence that has shaped her life. The series explores themes of identity, family, and healing while showcasing Native American culture and spirituality.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "echo-poster.jpg",
      backdrop: "echo-backdrop.jpg",
      slideshow: "echo-slide.jpg"
    },
    cast: ["Alaqua Cox", "Eme Ikwuakor", "Danny Ramirez", "Ariana DeBose"],
    director: "Kari Skogland",
    rating: 4
  },
  {
    id: 48,
    chronological_order: 47,
    title: "X-Men '97",
    release_date: "2024-03-20",
    type: "Series",
    phase: "Phase 5",
    description: "The X-Men continue their fight for a world that hates and fears them in this animated continuation.",
    plot: "The X-Men, a band of mutants who use their uncanny gifts to protect a world that hates and fears them, are challenged like never before, forced to face a dangerous and unexpected new future. Following the events of the original animated series, the team deals with Professor Xavier's apparent death while facing new threats to mutant-human relations. The series explores themes of prejudice, identity, and what it means to be different.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "x-men-97-poster.jpg",
      backdrop: "x-men-97-backdrop.jpg",
      slideshow: "x-men-97-slide.jpg"
    },
    cast: ["Hugh Jackman", "Patrick Stewart", "Ian McKellen", "Halle Berry"],
    director: "Bob Hoskins",
    rating: 5
  },
  {
    id: 49,
    chronological_order: 46,
    title: "Deadpool & Wolverine",
    release_date: "2024-07-26",
    type: "Movie",
    phase: "Phase 5",
    description: "Deadpool teams up with Wolverine in a multiverse adventure that brings the X-Men into the MCU.",
    plot: "Wade Wilson lives a quiet life, leaving his days as the morally flexible Deadpool behind him, until his world is threatened. Reluctantly, he teams up with an equally reluctant Wolverine on a mission that will change the history of the MCU. The film serves as both a sequel to previous Deadpool films and an introduction to the X-Men universe within the MCU, featuring multiverse elements and trademark irreverent humor.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "deadpool-and-wolverine-poster.jpg",
      backdrop: "deadpool-and-wolverine-backdrop.jpg",
      slideshow: "deadpool-and-wolverine-slide.jpg"
    },
    cast: ["Ryan Reynolds", "Hugh Jackman", "Dafne Keen", "Zazie Beetz"],
    director: "David Leitch",
    rating: 4
  },
  {
    id: 50,
    chronological_order: 48,
    title: "Agatha All Along",
    release_date: "2024-09-18",
    type: "Series",
    phase: "Phase 5",
    description: "Agatha Harkness embarks on a perilous journey down the Witches' Road to regain her lost powers.",
    plot: "The infamous Agatha Harkness finds herself down and out of power after a suspicious goth Teen helps break her free from a distorted spell. Her interest is piqued when he begs her to take him on the legendary Witches' Road, a magical gauntlet of trials that, if survived, rewards a witch with what they're missing. Together, Agatha and this mysterious Teen pull together a desperate coven and set off down the Road.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "agatha-all-along-poster.jpg",
      backdrop: "agatha-all-along-backdrop.jpg",
      slideshow: "agatha-all-along-slide.jpg"
    },
    cast: ["Elizabeth Olsen", "Kerry Condon", "Micah Stock", "Mason McNulty"],
    director: "Karyn Kusama",
    rating: 4
  },
  {
    id: 51,
    chronological_order: 49,
    title: "Captain America: Brave New World",
    release_date: "2025-02-14",
    type: "Movie",
    phase: "Phase 5",
    description: "Sam Wilson steps into his role as the new Captain America.",
    plot: "Following the legacy of Steve Rogers, Sam Wilson embraces his new mantle as Captain America. Facing modern challenges and adversaries, Sam strives to uphold the ideals and values that the shield represents while navigating his own path as a hero.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "captain-america-brave-new-world-poster.jpg",
      backdrop: "captain-america-brave-new-world-backdrop.jpg",
      slideshow: "captain-america-brave-new-world-slide.jpg"
    },
    cast: ["Anthony Mackie", "Sebastian Stan", "Danny Ramirez", "Carl Lumbly"],
    director: "Kari Skogland",
    rating: 4
  },
  {
    id: 52,
    chronological_order: 50,
    title: "Thunderbolts",
    release_date: "2025-05-02",
    type: "Movie",
    phase: "Phase 5",
    description: "A team of antiheroes are brought together for a mission.",
    plot: "A group of morally ambiguous characters, many of whom have been villains or antiheroes, are assembled for a high-stakes mission that tests their loyalties and abilities. This team must work together to confront threats that ordinary heroes cannot handle.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "thunderbolts-poster.jpg",
      backdrop: "thunderbolts-backdrop.jpg",
      slideshow: "thunderbolts-slide.jpg"
    },
    cast: ["Florence Pugh", "David Harbour", "Owen Wilson", "Sebastian Stan"],
    director: "Kari Skogland",
    rating: 4
  },
  {
    id: 53,
    chronological_order: 51,
    title: "Ironheart",
    release_date: "2025-06-24",
    type: "Series",
    phase: "Phase 5",
    description: "Riri Williams returns home to Chicago, discovering secrets that pit technology against magic.",
    plot: "Genius inventor Riri Williams creates a powerful suit of armor to become Ironheart. Returning to her hometown, she uncovers hidden threats where cutting-edge technology and ancient magic collide, forcing her to balance science and sorcery to protect those she loves.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "ironheart-poster.jpg",
      backdrop: "ironheart-backdrop.jpg",
      slideshow: "ironheart-slide.jpg"
    },
    cast: ["Dominique Thorne", "Angela Bassett", "Mikhaila Pocknee", "Teyonah Parris"],
    director: "Kari Skogland",
    rating: 4
  },
  {
    id: 54,
    chronological_order: 52,
    title: "The Fantastic Four: First Steps",
    release_date: "2025-07-25",
    type: "Movie",
    phase: "Phase 5",
    description: "The iconic superhero team makes their MCU debut.",
    plot: "The Fantastic Four come together for the first time as they navigate the challenges of their new powers and relationships. Facing a mysterious cosmic threat, the team must learn to work as one to protect Earth and the universe.",
    ott_platforms: ["Disney+"],
    images: {
      poster: "the-fantastic-four-first-steps-poster.jpg",
      backdrop: "the-fantastic-four-first-steps-backdrop.jpg",
      slideshow: "the-fantastic-four-first-steps-slide.jpg"
    },
    cast: ["John Krasinski", "Miles Teller", "Kate Mara", "Jamie Bell"],
    director: "John Francis Daley, Jonathan Goldstein",
    rating: 4
  }
];

export interface MCUItem {
  id: number;
  chronological_order: number;
  title: string;
  release_date: string;
  type: 'Movie' | 'Series' | 'Special';
  phase: string;
  description: string;
  plot: string;
  ott_platforms: string[];
  poster?: string;
  releaseOrder: number;
}

export type TimelineMode = 'story' | 'release';

export const mcuData = {
  story: mcuTimeline
    .map((item, index) => ({
      ...item,
      releaseOrder: index + 1
    }))
    .sort((a, b) => a.chronological_order - b.chronological_order),
  
  release: mcuTimeline
    .map((item, index) => ({
      ...item,
      releaseOrder: index + 1
    }))
    .sort((a, b) => new Date(a.release_date).getTime() - new Date(b.release_date).getTime())
};

const getImagePath = (id: number, type: 'poster' | 'backdrop') => {
  return `/images/mcu/${id}-${type}.jpg`;
};