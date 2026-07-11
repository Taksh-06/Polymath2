const fs = require('fs');
const path = require('path');

const schema = [
  {
    id: 'science', title: 'Science', description: 'Understand the universe.', accentColor: '#2EC4B6', iconName: 'Atom',
    pathways: [
      { id: 'physics', title: 'Physics Fundamentals', description: 'The laws of nature.', topics: ['Classical mechanics', 'Thermodynamics', 'Electromagnetism', 'Quantum mechanics', 'Theory of relativity'] },
      { id: 'biology', title: 'Cellular Biology', description: 'The building blocks of life.', topics: ['Cell (biology)', 'DNA', 'Protein', 'Mitochondrion', 'Gene'] },
      { id: 'astronomy', title: 'Cosmic Wonders', description: 'Stars, galaxies, and beyond.', topics: ['Star', 'Black hole', 'Galaxy', 'Exoplanet', 'Big Bang'] }
    ]
  },
  {
    id: 'history', title: 'History', description: 'Learn from the past.', accentColor: '#FFC857', iconName: 'Landmark',
    pathways: [
      { id: 'rome', title: 'Ancient Rome', description: 'The rise and fall of an empire.', topics: ['Roman Republic', 'Julius Caesar', 'Augustus', 'Colosseum', 'Fall of the Western Roman Empire'] },
      { id: 'ww2', title: 'World War II', description: 'The global conflict.', topics: ['World War II', 'Winston Churchill', 'Franklin D. Roosevelt', 'Battle of Stalingrad', 'Normandy landings'] },
      { id: 'renaissance', title: 'The Renaissance', description: 'Rebirth of art and science.', topics: ['Renaissance', 'Leonardo da Vinci', 'Michelangelo', 'Galileo Galilei', 'Printing press'] }
    ]
  },
  {
    id: 'psychology', title: 'Psychology', description: 'How the mind works.', accentColor: '#FF6B6B', iconName: 'Brain',
    pathways: [
      { id: 'biases', title: 'Cognitive Biases', description: 'Why we make irrational choices.', topics: ['Cognitive bias', 'Confirmation bias', 'Dunning–Kruger effect', 'Anchoring (cognitive bias)', 'Availability heuristic'] },
      { id: 'emotions', title: 'Understanding Emotions', description: 'The feeling brain.', topics: ['Emotion', 'Empathy', 'Emotional intelligence', 'Fear', 'Happiness'] },
      { id: 'memory', title: 'Memory', description: 'How we remember and forget.', topics: ['Memory', 'Short-term memory', 'Long-term memory', 'Amnesia', 'Hippocampus'] }
    ]
  },
  {
    id: 'philosophy', title: 'Philosophy', description: 'The big questions.', accentColor: '#A374FF', iconName: 'BookOpen',
    pathways: [
      { id: 'stoicism', title: 'Stoicism', description: 'Mastering your reactions.', topics: ['Stoicism', 'Marcus Aurelius', 'Epictetus', 'Seneca the Younger', 'Virtue'] },
      { id: 'existentialism', title: 'Existentialism', description: 'Finding meaning.', topics: ['Existentialism', 'Jean-Paul Sartre', 'Friedrich Nietzsche', 'Søren Kierkegaard', 'Absurdism'] },
      { id: 'ethics', title: 'Ethics', description: 'Right and wrong.', topics: ['Ethics', 'Utilitarianism', 'Deontology', 'Virtue ethics', 'Moral relativism'] }
    ]
  },
  {
    id: 'technology', title: 'Technology', description: 'The digital revolution.', accentColor: '#3B82F6', iconName: 'Cpu',
    pathways: [
      { id: 'ai', title: 'Artificial Intelligence', description: 'Machines that think.', topics: ['Artificial intelligence', 'Machine learning', 'Neural network', 'Natural language processing', 'Turing test'] },
      { id: 'internet', title: 'The Internet', description: 'Global connectivity.', topics: ['Internet', 'World Wide Web', 'Domain Name System', 'Transmission Control Protocol', 'Hypertext Transfer Protocol'] },
      { id: 'hardware', title: 'Computer Hardware', description: 'Silicon and circuits.', topics: ['Central processing unit', 'Random-access memory', 'Solid-state drive', 'Motherboard', 'Graphics processing unit'] }
    ]
  },
  {
    id: 'culture', title: 'Culture', description: 'Art, music, and society.', accentColor: '#F472B6', iconName: 'Globe',
    pathways: [
      { id: 'art', title: 'Art Movements', description: 'Visual expressions.', topics: ['Impressionism', 'Surrealism', 'Cubism', 'Abstract expressionism', 'Pop art'] },
      { id: 'music', title: 'Music History', description: 'The evolution of sound.', topics: ['Classical music', 'Jazz', 'Rock music', 'Hip hop', 'Electronic dance music'] },
      { id: 'literature', title: 'Classic Literature', description: 'Stories that endure.', topics: ['William Shakespeare', 'Jane Austen', 'Fyodor Dostoevsky', 'Gabriel García Márquez', 'Toni Morrison'] }
    ]
  },
  {
    id: 'lifeskills', title: 'Life Skills', description: 'Practical knowledge.', accentColor: '#10B981', iconName: 'Compass',
    pathways: [
      { id: 'communication', title: 'Communication', description: 'Connecting with others.', topics: ['Active listening', 'Nonverbal communication', 'Public speaking', 'Negotiation', 'Conflict resolution'] },
      { id: 'productivity', title: 'Productivity', description: 'Getting things done.', topics: ['Time management', 'Pomodoro Technique', 'Procrastination', 'Goal setting', 'Flow (psychology)'] },
      { id: 'wellness', title: 'Health & Wellness', description: 'Taking care of yourself.', topics: ['Sleep', 'Nutrition', 'Physical exercise', 'Meditation', 'Stress management'] }
    ]
  },
  {
    id: 'finance', title: 'Finance', description: 'Money and markets.', accentColor: '#F59E0B', iconName: 'TrendingUp',
    pathways: [
      { id: 'investing', title: 'Investing Basics', description: 'Growing your wealth.', topics: ['Stock market', 'Bond (finance)', 'Index fund', 'Dividend', 'Compound interest'] },
      { id: 'economics', title: 'Macroeconomics', description: 'The big picture.', topics: ['Gross domestic product', 'Inflation', 'Monetary policy', 'Fiscal policy', 'Supply and demand'] },
      { id: 'personal', title: 'Personal Finance', description: 'Managing your money.', topics: ['Budget', 'Credit score', 'Mortgage loan', 'Tax', 'Retirement'] }
    ]
  }
];

async function fetchWikipediaSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Network response was not ok');
    const data = await res.json();
    return {
      extract: data.extract || `${title} is a fundamental concept.`,
      description: data.description || 'A fascinating topic.'
    };
  } catch (err) {
    console.error(`Failed to fetch ${title}:`, err);
    return { extract: `${title} is a fundamental concept that continues to be studied.`, description: 'A fascinating topic.' };
  }
}

function generateQuiz(title, extract) {
  return [
    {
      question: `Which of the following best relates to ${title}?`,
      options: [
        "It is completely unrelated to the topic.",
        "It is a core concept described in the reading.",
        "It was invented in the 21st century.",
        "It is only applicable in theoretical scenarios."
      ],
      correctIndex: 1,
      explanation: `As discussed in the reading, ${title} is fundamental to this field of study.`
    }
  ];
}

async function buildDatabase() {
  console.log('Building Orbit content database...');
  const finalCategories = [];

  for (const cat of schema) {
    console.log(`Processing category: ${cat.title}`);
    const pathways = [];
    
    for (const path of cat.pathways) {
      const orbs = [];
      let orbIndex = 1;
      
      for (const topic of path.topics) {
        console.log(`  - Fetching: ${topic}`);
        const wiki = await fetchWikipediaSummary(topic);
        
        // Chunk extract into 2-3 paragraphs if long
        let reading = wiki.extract;
        if (reading.length > 300) {
           reading = reading.replace(/([.?!])\s+(?=[A-Z])/g, "$1\n\n");
        }

        const orb = {
          id: `${path.id}-${orbIndex}`,
          title: topic,
          preview: wiki.description,
          reading: reading,
          keyTerms: [
            { term: topic, definition: wiki.description }
          ],
          summary: `You learned about the fundamentals of ${topic}.`,
          quiz: generateQuiz(topic, wiki.extract),
          difficulty: orbIndex < 3 ? "Beginner" : (orbIndex < 5 ? "Intermediate" : "Advanced"),
          readingTimeMinutes: Math.max(2, Math.ceil(wiki.extract.split(' ').length / 150)),
          xpReward: orbIndex * 10,
          estimatedReviewInterval: 24 // 24 hours
        };
        orbs.push(orb);
        orbIndex++;
      }
      
      pathways.push({
        id: path.id,
        title: path.title,
        description: path.description,
        orbs: orbs
      });
    }
    
    finalCategories.push({
      id: cat.id,
      title: cat.title,
      description: cat.description,
      accentColor: cat.accentColor,
      iconName: cat.iconName,
      pathways: pathways
    });
  }

  const outputPath = path.join(__dirname, '..', 'src', 'lib', 'content', 'database.json');
  fs.writeFileSync(outputPath, JSON.stringify(finalCategories, null, 2));
  console.log(`Successfully generated 120 lessons and wrote to ${outputPath}`);
}

buildDatabase();
