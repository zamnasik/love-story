/**
 * ALL WORDS OF THE STORY LIVE HERE, in story order.
 * Edit this file to change any sentence. Each string in an array is shown as its own line.
 * The short "poems" are the added poetic words: simple, quiet verses that sit beside the story.
 */

export const TITLE = 'The Love I Saved for You';
export const SUBTITLE = 'A story that began with a meeting, grew through hope, and found a new meaning.';

/** Scenes in order. Used by the progress indicator and navigation. */
export const SCENES = [
  { id: 'intro', label: 'Assalamu Alaikum' },
  { id: 'boy', label: 'The Boy I Was' },
  { id: 'building', label: 'A Life I Am Still Building' },
  { id: 'never-felt', label: 'The Love I Never Knew I Was Waiting For' },
  { id: 'before', label: 'Before I Saw You' },
  { id: 'first-sight', label: 'The First Time I Saw You' },
  { id: 'talking', label: 'Our First Conversation' },
  { id: 'that-night', label: 'That Night, We Were Thinking About Each Other' },
  { id: 'saved', label: 'The Love I Saved for You' },
  { id: 'castle', label: 'The Castle We Can Build Together' },
  { id: 'dua', label: 'A Dua for Us' },
  { id: 'confession', label: 'The Words I Have Not Said Yet' },
  { id: 'closing', label: 'Our Story Is Just Beginning' },
] as const;

export type SceneId = (typeof SCENES)[number]['id'];

/* ---------------------------------------------------------------- 1. OPENING */
export const intro = {
  greeting: 'Assalamu Alaikum',
  name: 'Musliha',
  me: "It's me, Nasik.",
  keeping: 'I have something special I have been keeping in my heart.',
  button: 'Shall I tell you our story?',
  skip: 'Skip intro',
};

/* ---------------------------------------------------------------- 2. THE BOY I WAS */
export const boy = {
  eyebrow: 'The Boy I Was',
  heading: 'Before I tell you about us, let me tell you a little about me.',
  body: [
    'I am Nasik.',
    'I grew up in a simple family, with simple beginnings and big dreams.',
    'My life has not always been easy. I lost my father when I was young, and my mother became my greatest strength. She has carried so much for our family, and my brother has also been an important part of my journey.',
    'I learned that life does not always give us everything we wish for. Sometimes, we have to work for the things we dream about.',
    'So I kept learning. I kept trying. And I kept moving forward.',
    'I may have started with very little, but I have never wanted to stop growing.',
  ],
  cards: [
    { title: 'My Mother', subtitle: 'My Strength', icon: 'heart' },
    { title: 'My Brother', subtitle: 'My Support', icon: 'users' },
    { title: 'My Dreams', subtitle: 'My Direction', icon: 'compass' },
    { title: 'My Faith', subtitle: 'My Hope', icon: 'moon' },
  ] as const,
  poem: [
    'A small house. An early light.',
    "A mother's dua carried me through the night.",
    'I started with very little,',
    'but I never stopped walking towards the morning.',
  ],
};

/* ---------------------------------------------------------------- 3. A LIFE I AM STILL BUILDING */
export const building = {
  eyebrow: 'A Life I Am Still Building',
  heading: 'My world has always been about building.',
  body: [
    'I spend my days writing code, working with electronics, building projects, solving problems, and learning new things.',
    'Sometimes, I spend hours trying to make one little thing work. Sometimes, I face difficulties and have to start again.',
    'But I have learned something from all of it.',
    'You do not build something meaningful in a single day.',
    'You build it slowly. With patience. With effort. With mistakes, lessons, and the courage to try again.',
    'That is how I have been building my life.',
    'I am still learning. I am still growing. I am still working towards the dreams I carry in my heart.',
    'I am not perfect, Musliha. I still have a long way to go.',
    'But I know that I want to keep becoming a better person, a better son, a better brother, and one day, if Allah wills, a good husband too.',
  ],
  path: ['Learning', 'Working', 'Growing', 'Building', 'Becoming'],
  poem: [
    'Line by line, and wire by wire,',
    'the small things slowly become something.',
    'Nothing worth keeping is built in a day,',
    'only with patience, and a little hope.',
  ],
  handwritten: 'My story is not finished yet. Some of its most beautiful chapters may still be waiting for me.',
};

/* ---------------------------------------------------------------- 4. THE LOVE I NEVER KNEW I WAS WAITING FOR */
export const neverFelt = {
  eyebrow: 'The Love I Never Knew I Was Waiting For',
  heading: 'For 27 years, I had never felt this way.',
  body: [
    'I have met many people in my life.',
    'I have spoken to girls.',
    "But there was never that special feeling that made me think, 'This is someone I want to share my life with.'",
    'I never knew when that feeling would come. I never knew who the person would be.',
    'I simply lived my life, worked towards my dreams, and kept moving forward.',
    'And somewhere inside me, there was a kind of love I had never given to anyone.',
    'Not because I was waiting for a perfect girl.',
    'But because I had never met someone who made me feel that I wanted to open my heart in this way.',
  ],
  highlight: 'Twenty-seven years of an ordinary life. And then, one unexpected beginning.',
  poem: [
    'For twenty-seven years my heart was a quiet room,',
    'a small lamp left burning for someone I had not met.',
    'I did not know the name of the light I was keeping.',
    'I only knew it was never meant to burn alone.',
  ],
};

/* ---------------------------------------------------------------- 5. BEFORE I SAW YOU */
export const before = {
  eyebrow: 'Before I Saw You',
  heading: 'Then my brother told me about you.',
  body: [
    'One day, my brother told me about a girl and a possible proposal.',
    'I heard good things about you, Musliha.',
    'I wanted to know a little more, so I quietly asked people I trusted who knew you.',
    'They spoke about your beauty, your humility, your kindness, your innocence, and your lovely voice.',
    'And something beautiful began in my imagination.',
    'Before I had even seen your photograph, I started wondering what kind of person you were.',
    'I started imagining someone gentle, someone caring, someone with a beautiful heart.',
    'I began to feel excited about meeting you.',
    'I did not even know your smile yet. I did not know the sound of your voice. I did not know what our first conversation would be like.',
    'But somehow, the thought of meeting you had already become special to me.',
  ],
  words: ['Kindness', 'Humility', 'Gentleness', 'Beauty', 'A lovely voice'],
  wordsCaption: 'Words I had only heard about you, and the person I hoped to discover.',
  closing: 'Before I knew your face, I was already curious about your heart.',
  poem: [
    'I had not yet heard your voice,',
    'but I had heard of its softness.',
    'I had not yet seen your smile,',
    'but I already hoped to know it.',
  ],
};

/* ---------------------------------------------------------------- 6. THE FIRST TIME I SAW YOU */
export const firstSight = {
  eyebrow: 'The First Time I Saw You',
  heading: 'And then, the day finally came.',
  body: [
    'My family and I came to your home.',
    'Your family welcomed us so kindly. I remember how comfortable and warm everything felt.',
    'Your father was so kind to me. Your mother welcomed us with warmth, and your brothers were so friendly.',
    'That kindness meant more to me than I can fully explain.',
    'Then my mother asked me to come into the room and meet you.',
    'I walked in.',
    'And there you were.',
    'I remember your green salwar and the brown shawl around you.',
    'I remember looking at you and thinking how beautiful you were.',
    'I had seen your photograph before, but seeing you in person was different.',
    'For a moment, I did not need anything complicated to happen.',
    'I was simply happy to see you.',
  ],
  memory:
    'I remember what you wore that day, Musliha. Not because clothes are what matter most, but because that was the day a person who had only existed in my imagination became someone I had finally met.',
  poem: [
    'A green like new leaves after rain,',
    'a brown like warm earth in the sun,',
    'and in one quiet room,',
    'a name I had carried became a person.',
  ],
};

/* ---------------------------------------------------------------- 7. OUR FIRST CONVERSATION */
export const talking = {
  eyebrow: 'Our First Conversation',
  heading: 'We sat together and started talking.',
  body: [
    'We spoke about your medical studies, your dreams, and your plans.',
    'I asked you about your future and your thoughts about higher studies. You told me about what mattered to you and what you hoped for.',
    'We shared personal thoughts and started learning about each other.',
    'I was not looking for a perfect answer to every question.',
    'I wanted to know the person behind the beautiful face.',
    'I wanted to know what makes you happy, what you dream about, what matters to you, and how you see your future.',
    'And while we were talking, there was something I wanted to say but did not say out loud.',
    'I wanted to tell you that I already had a special feeling for you.',
    'But I kept that feeling in my heart.',
  ],
  handwritten: 'Some words are not spoken immediately. Sometimes, they wait for the right moment.',
  poem: [
    'Words crossed the room softly,',
    'the way light moves across a floor.',
    'And the one word I carried',
    'stayed folded in my heart, waiting.',
  ],
};

/* ---------------------------------------------------------------- 8. THAT NIGHT */
export const thatNight = {
  eyebrow: 'That Night, We Were Thinking About Each Other',
  heading: 'Little did I know, you were thinking about me too.',
  body: [
    'After I returned home, I told my brother that I was happy with the proposal.',
    'Our families continued speaking, and everything moved forward.',
    'Then, after we started messaging, you told me something I will remember.',
    'You told me that on the night I came to your home, you were wondering whether I would say yes.',
    'And when I heard that, I smiled.',
    'Because I had been thinking about you too.',
    'Two people, in two different homes, wondering about the same new beginning.',
    'Neither of us knew exactly what would happen next.',
    'But both of us had a little hope in our hearts.',
  ],
  closing: 'Alhamdulillah. Sometimes, a beautiful beginning arrives more quietly than we expect.',
  poem: [
    'Two homes. Two windows. One moon.',
    'Two quiet hearts, hoping the same small hope.',
    'Some nights do not need to say anything.',
    'They only need two people, thinking kindly of each other.',
  ],
};

/* ---------------------------------------------------------------- 9. THE LOVE I SAVED FOR YOU */
export const saved = {
  eyebrow: 'The Love I Saved for You',
  heading: 'Musliha, there is something I want you to know.',
  lines: [
    'For 27 years, I had never told a girl that I loved her.',
    'I had never felt this particular kind of love.',
    'I had never looked at someone and imagined sharing so many little things with her.',
    'The ordinary days.',
    'The difficult days.',
    'The happy moments.',
    'The quiet conversations.',
    'The dreams that take years to achieve.',
    'And the simple comfort of knowing that someone is beside you.',
    'Then you came into my life.',
    'I am still getting to know you. There is still so much for us to discover about each other.',
    'But for the first time, I have found someone I genuinely want to give my heart to.',
    'Someone whose happiness I want to care about.',
    'Someone whose dreams I want to support.',
    'Someone with whom I want to share the life I am working so hard to build.',
    'I do not know how to describe everything I feel in perfect words.',
    'But I know that what I feel is special to me.',
    'And I wanted you to know that.',
  ],
  /** Highlighted after the last line. */
  highlight: 'You are the first girl who has made me want to say these words with my whole heart.',
  poem: [
    'I kept this love the way the night keeps its stars,',
    'quietly, and with patience,',
    'until someone looked up.',
  ],
};

/* ---------------------------------------------------------------- 10. THE CASTLE */
export const castle = {
  eyebrow: 'The Castle We Can Build Together',
  heading: 'I am still building my life. Maybe we can build our future together.',
  body: [
    'Musliha, I want to tell you something honestly.',
    'I am still building my life.',
    'I came from a simple background, and I have worked hard to reach where I am today.',
    'I am proud of how far I have come, but I know that I still have a long journey ahead.',
    'I have dreams I want to achieve. I have skills I want to improve. I have responsibilities I want to fulfil.',
    'I can promise that I will keep trying to become a better person.',
    'I want to work hard, grow in my career, support my family, and build a future with purpose.',
    'And if Allah wills that you become my wife, I would love for us to build that future together.',
  ],
  home: [
    'Not a castle made of gold.',
    'A home made of kindness.',
    'A home where we listen to each other.',
    'A home where both our dreams matter.',
    'A home where we support one another when life becomes difficult.',
    "A home where we laugh over little things, forgive each other's mistakes, and never stop learning about each other.",
    'A home where faith gives us direction and love gives us warmth.',
  ],
  afterHome: [
    'I want to see you achieve your dreams too.',
    'I want to celebrate your achievements, support your ambitions, and respect the person you are becoming.',
    'We do not have to have everything figured out today.',
    'We can grow, learn, work, and build, one day at a time.',
  ],
  pillars: ['Faith', 'Trust', 'Respect', 'Patience', 'Love'],
  closing:
    'Perhaps the most beautiful thing we can build is not a house or a castle, but a life in which both of us feel loved, respected, and at peace.',
  poem: [
    'Not walls of gold, not towers high,',
    'but a lamp, a prayer, a quiet sky.',
    'A door that opens to kindness,',
    'and two hearts learning to build slowly.',
  ],
};

/* ---------------------------------------------------------------- 11. A DUA FOR US */
export const dua = {
  eyebrow: 'A Dua for Us',
  heading: 'Before I ask for anything, I want to make dua.',
  /** A personal dua written by Nasik. It is not a Quranic verse or a hadith. */
  lines: [
    'Ya Allah,',
    'You know what is in our hearts, even the words we cannot express.',
    'Guide us towards what is good for our dunya and our Akhirah.',
    'If we are written for one another, place barakah in our journey.',
    'Help us understand each other with patience, kindness, honesty, and mercy.',
    'Make us people who support one another in times of difficulty and remain grateful in times of ease.',
    'Bless our families, our ambitions, our efforts, and the home we hope to build one day.',
    'Protect us from hurting one another through carelessness, pride, or misunderstanding.',
    'And guide every step we take towards what is best.',
    'Ameen.',
  ],
};

/* ---------------------------------------------------------------- 12. THE WORDS I HAVE NOT SAID YET */
export const confession = {
  eyebrow: 'The Words I Have Not Said Yet',
  sequence: [
    'Musliha...',
    'For 27 years, I lived my life without knowing who I was waiting for.',
    'Then I met you.',
    'And now, for the first time, I have someone I want to give all this love to.',
    'I have so much I want to tell you, so many dreams I want to share, and so many little moments I hope we can experience together.',
    'I want to know you more deeply, support you sincerely, and build a future with you if Allah wills.',
  ],
  love: 'Musliha, I love you.',
  after:
    "You are the first girl I have ever felt this way about. I don't want these words to be just something beautiful I say today. I hope, if we are blessed to build a life together, I can show you their meaning through my actions every day.",
  gentle: "I don't expect you to find perfect words to answer me. I simply wanted you to know what is in my heart.",
  poem: ['Like the moon, I do not ask the night to answer.', 'I only hope to give a little light.'],
  skip: 'Show everything',
  replay: 'Watch this part again',
};

/* ---------------------------------------------------------------- 13. FINAL SCENE */
export const closing = {
  eyebrow: 'Our Story Is Just Beginning',
  heading: 'Thank you for becoming part of my story, Musliha.',
  body: [
    'I do not know every chapter that lies ahead.',
    'But I am grateful that our paths have crossed.',
    'Thank you for being part of this beginning.',
    'May Allah make our future beautiful, guide our decisions, and bless us with whatever is best.',
    'And if Allah wills that we walk through life together, I hope we can look back one day and smile at how our story began.',
    'Until then, let us keep learning about each other, supporting each other, and moving forward with sincerity.',
  ],
  poem: [
    'Every long road begins with one quiet step.',
    'May ours be gentle, and may it be blessed.',
  ],
  signatureLead: 'With a heart full of hope,',
  signatureName: 'Nasik',
  signatureEmoji: '🤍',
  footer: 'Made with love, patience, and a thousand little thoughts of you.',
  button: 'Read Our Story Again',
};
