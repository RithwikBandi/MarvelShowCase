export interface Hero {
  id: number;
  name: string;
  realName?: string;
  image: string;
  backdrop?: string;
  description: string;
  powers: string[];
  affiliation: string[];
  firstAppearance: string;
  actor?: string;
  status: 'active' | 'retired' | 'deceased';
  category: 'hero' | 'antihero' | 'villain' | 'supporting';
  phase: string;
  rating: number;
}

export const heroImages: Hero[] = [
  {
    id: 1,
    name: 'Iron Man',
    realName: 'Tony Stark',
    image: '/images/heroes/iron-man-temp.jpg',
    description: 'Genius billionaire Tony Stark, who uses his suit of armor to protect the world.',
    powers: ['Powered Armor', 'Genius Intelligence', 'Repulsor Technology', 'Flight'],
    affiliation: ['Avengers', 'Stark Industries', 'S.H.I.E.L.D.'],
    firstAppearance: 'Iron Man (2008)',
    actor: 'Robert Downey Jr.',
    status: 'active',
    category: 'hero',
    phase: 'Phase 1',
    rating: 5
  },
  {
    id: 2,
    name: 'Captain America',
    realName: 'Steve Rogers',
    image: '/images/heroes/captain-america-temp.jpg',
    description: 'Super-soldier Steve Rogers, the First Avenger and symbol of hope.',
    powers: ['Superhuman Strength', 'Enhanced Speed', 'Shield Mastery', 'Leadership'],
    affiliation: ['Avengers', 'S.H.I.E.L.D.', 'U.S. Army'],
    firstAppearance: 'Captain America: The First Avenger (2011)',
    actor: 'Chris Evans',
    status: 'active',
    category: 'hero',
    phase: 'Phase 1',
    rating: 5
  },
  {
    id: 3,
    name: 'Thor',
    realName: 'Thor Odinson',
    image: '/images/heroes/thor-temp.jpg',
    description: 'The God of Thunder from Asgard, wielding the mighty Mjolnir.',
    powers: ['Lightning Control', 'Superhuman Strength', 'Mjolnir Mastery', 'Immortality'],
    affiliation: ['Avengers', 'Asgard', 'Guardians of the Galaxy'],
    firstAppearance: 'Thor (2011)',
    actor: 'Chris Hemsworth',
    status: 'active',
    category: 'hero',
    phase: 'Phase 1',
    rating: 5
  },
  {
    id: 4,
    name: 'Hulk',
    realName: 'Bruce Banner',
    image: '/images/heroes/hulk-temp.jpg',
    description: 'Dr. Bruce Banner transforms into the incredible Hulk when angered.',
    powers: ['Superhuman Strength', 'Regeneration', 'Gamma Radiation', 'Rage Enhancement'],
    affiliation: ['Avengers', 'S.H.I.E.L.D.', 'Gamma Lab'],
    firstAppearance: 'The Incredible Hulk (2008)',
    actor: 'Mark Ruffalo',
    status: 'active',
    category: 'hero',
    phase: 'Phase 1',
    rating: 4
  },
  {
    id: 5,
    name: 'Black Widow',
    realName: 'Natasha Romanoff',
    image: '/images/heroes/black-widow-temp.jpg',
    description: 'Former Russian spy turned Avenger, master of espionage and combat.',
    powers: ['Espionage', 'Combat Mastery', 'Acrobatics', 'Intelligence'],
    affiliation: ['Avengers', 'S.H.I.E.L.D.', 'Red Room'],
    firstAppearance: 'Iron Man 2 (2010)',
    actor: 'Scarlett Johansson',
    status: 'deceased',
    category: 'hero',
    phase: 'Phase 1',
    rating: 4
  },
  {
    id: 6,
    name: 'Hawkeye',
    realName: 'Clint Barton',
    image: '/images/heroes/hawkeye-temp.jpg',
    description: 'Master archer and former S.H.I.E.L.D. agent with perfect aim.',
    powers: ['Archery Mastery', 'Combat Training', 'Tactical Intelligence', 'Stealth'],
    affiliation: ['Avengers', 'S.H.I.E.L.D.', 'Family'],
    firstAppearance: 'Thor (2011)',
    actor: 'Jeremy Renner',
    status: 'active',
    category: 'hero',
    phase: 'Phase 1',
    rating: 4
  },
  {
    id: 7,
    name: 'Spider-Man',
    realName: 'Peter Parker',
    image: '/images/heroes/spider-man-temp.jpg',
    description: 'Young hero with spider-like abilities and a strong sense of responsibility.',
    powers: ['Spider-Sense', 'Wall-Crawling', 'Web-Slinging', 'Superhuman Agility'],
    affiliation: ['Avengers', 'Stark Industries', 'Midtown High'],
    firstAppearance: 'Captain America: Civil War (2016)',
    actor: 'Tom Holland',
    status: 'active',
    category: 'hero',
    phase: 'Phase 3',
    rating: 5
  },
  {
    id: 8,
    name: 'Doctor Strange',
    realName: 'Stephen Strange',
    image: '/images/heroes/doctor-strange-temp.jpg',
    description: 'Former neurosurgeon turned Master of the Mystic Arts.',
    powers: ['Mystic Arts', 'Reality Manipulation', 'Time Stone', 'Dimensional Travel'],
    affiliation: ['Avengers', 'Masters of the Mystic Arts', 'Sanctum Sanctorum'],
    firstAppearance: 'Doctor Strange (2016)',
    actor: 'Benedict Cumberbatch',
    status: 'active',
    category: 'hero',
    phase: 'Phase 3',
    rating: 5
  },
  {
    id: 9,
    name: 'Black Panther',
    realName: 'T\'Challa',
    image: '/images/heroes/black-panther-temp.jpg',
    description: 'King of Wakanda and protector of his people with advanced technology.',
    powers: ['Vibranium Suit', 'Enhanced Strength', 'Combat Mastery', 'Leadership'],
    affiliation: ['Avengers', 'Wakanda', 'United Nations'],
    firstAppearance: 'Captain America: Civil War (2016)',
    actor: 'Chadwick Boseman',
    status: 'deceased',
    category: 'hero',
    phase: 'Phase 3',
    rating: 5
  },
  {
    id: 10,
    name: 'Captain Marvel',
    realName: 'Carol Danvers',
    image: '/images/heroes/captain-marvel-temp.jpg',
    description: 'Former Air Force pilot with cosmic powers from the Kree.',
    powers: ['Cosmic Energy', 'Flight', 'Superhuman Strength', 'Energy Projection'],
    affiliation: ['Avengers', 'U.S. Air Force', 'Kree Empire'],
    firstAppearance: 'Captain Marvel (2019)',
    actor: 'Brie Larson',
    status: 'active',
    category: 'hero',
    phase: 'Phase 3',
    rating: 4
  }
]; 