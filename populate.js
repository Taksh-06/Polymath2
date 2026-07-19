const fs = require('fs');

const dbPath = './src/lib/content/database.json';
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const content = {
  "Science": [
    {
      title: "Physics Fundamentals",
      reading: "Everything around us follows the laws of physics. Force causes objects to move or stop. Gravity pulls objects toward Earth, while friction slows moving objects. Understanding these forces explains everyday events.",
      quiz: [
        { q: "What force pulls objects toward Earth?", options: ["Gravity", "Magnetism", "Electricity"], a: 0 },
        { q: "What slows a moving object?", options: ["Friction", "Speed", "Air"], a: 0 },
        { q: "Physics mainly studies:", options: ["Matter and energy", "Languages", "History"], a: 0 }
      ]
    },
    {
      title: "Cellular Biology",
      reading: "Cells are the smallest units of life. Every living organism is made of one or more cells. Cells contain structures called organelles that perform different jobs. Together they keep organisms alive.",
      quiz: [
        { q: "Cells are the basic unit of:", options: ["Life", "Water", "Air"], a: 0 },
        { q: "Organelles are found inside:", options: ["Cells", "Rocks", "Oceans"], a: 0 },
        { q: "Humans are made of:", options: ["Millions of cells", "One cell", "No cells"], a: 0 }
      ]
    },
    {
      title: "The Solar System",
      reading: "The Solar System contains the Sun and eight planets. Earth is the third planet from the Sun. Gravity keeps planets in orbit around the Sun. Moons orbit planets.",
      quiz: [
        { q: "Earth is the ____ planet from the Sun.", options: ["Third", "First", "Fifth"], a: 0 },
        { q: "What keeps planets in orbit?", options: ["Gravity", "Wind", "Sound"], a: 0 },
        { q: "The center of the Solar System is:", options: ["Sun", "Moon", "Earth"], a: 0 }
      ]
    },
    {
      title: "States of Matter",
      reading: "Matter exists as solid, liquid, and gas. Solids keep their shape, liquids flow, and gases spread to fill space. Heating or cooling changes matter between these states.",
      quiz: [
        { q: "Which state has a fixed shape?", options: ["Solid", "Liquid", "Gas"], a: 0 },
        { q: "Water vapor is a:", options: ["Gas", "Solid", "Liquid"], a: 0 },
        { q: "Heating ice turns it into:", options: ["Water", "Stone", "Air"], a: 0 }
      ]
    },
    {
      title: "Photosynthesis",
      reading: "Plants use sunlight, water, and carbon dioxide to make food. This process is called photosynthesis. Oxygen is released as a byproduct, helping humans and animals breathe.",
      quiz: [
        { q: "Plants use sunlight to:", options: ["Make food", "Sleep", "Grow roots only"], a: 0 },
        { q: "Photosynthesis releases:", options: ["Oxygen", "Nitrogen", "Helium"], a: 0 },
        { q: "Plants absorb:", options: ["Carbon dioxide", "Oxygen", "Hydrogen"], a: 0 }
      ]
    }
  ],
  "History": [
    {
      title: "Ancient Rome",
      reading: "Ancient Rome grew from a small city into a powerful empire. It built roads, aqueducts, and impressive buildings. Roman laws influenced many legal systems today.",
      quiz: [
        { q: "Rome became a:", options: ["Powerful empire", "Small village", "Island"], a: 0 },
        { q: "Romans were famous for building:", options: ["Roads", "Skyscrapers", "Railways"], a: 0 },
        { q: "Roman laws still influence:", options: ["Modern legal systems", "Weather", "Oceans"], a: 0 }
      ]
    },
    {
      title: "World War II",
      reading: "World War II lasted from 1939 to 1945. It involved many countries across the world. The war ended with the Allied victory and major global changes.",
      quiz: [
        { q: "WWII ended in:", options: ["1945", "1935", "1950"], a: 0 },
        { q: "It was fought by:", options: ["Many countries", "One country", "Two cities"], a: 0 },
        { q: "The war brought:", options: ["Global changes", "No changes", "Only sports"], a: 0 }
      ]
    },
    {
      title: "The Renaissance",
      reading: "The Renaissance was a period of renewed interest in art and science. Thinkers encouraged observation and creativity. Many famous artists lived during this time.",
      quiz: [
        { q: "The Renaissance focused on:", options: ["Art and science", "Farming", "Space travel"], a: 0 },
        { q: "Creativity became:", options: ["Highly valued", "Forbidden", "Ignored"], a: 0 },
        { q: "Renaissance means:", options: ["Rebirth", "War", "Trade"], a: 0 }
      ]
    },
    {
      title: "The Industrial Revolution",
      reading: "Machines changed how goods were made. Factories increased production and cities grew rapidly. This period transformed work and transportation.",
      quiz: [
        { q: "Factories increased:", options: ["Production", "Rainfall", "Mountains"], a: 0 },
        { q: "Machines replaced much:", options: ["Manual labor", "Electricity", "Writing"], a: 0 },
        { q: "Cities generally:", options: ["Grew larger", "Disappeared", "Shrank"], a: 0 }
      ]
    },
    {
      title: "The Printing Press",
      reading: "The printing press allowed books to be produced quickly. Knowledge spread faster than ever before. More people gained access to education and ideas.",
      quiz: [
        { q: "The printing press made:", options: ["Books faster", "Cars", "Computers"], a: 0 },
        { q: "It helped spread:", options: ["Knowledge", "Pollution", "Noise"], a: 0 },
        { q: "More people could:", options: ["Read books", "Fly planes", "Build ships"], a: 0 }
      ]
    }
  ],
  "Psychology": [
    {
      title: "Cognitive Biases",
      reading: "Our brains often use shortcuts when making decisions. These shortcuts can create biases that affect judgment. Recognizing biases helps improve decision-making.",
      quiz: [
        { q: "Biases affect:", options: ["Decisions", "Gravity", "Weather"], a: 0 },
        { q: "Cognitive bias is a:", options: ["Thinking shortcut", "Disease", "Sport"], a: 0 },
        { q: "Knowing biases helps:", options: ["Better decisions", "Less sleep", "More confusion"], a: 0 }
      ]
    },
    {
      title: "Understanding Emotions",
      reading: "Emotions help us react to situations. Happiness, sadness, anger, and fear all serve important purposes. Managing emotions improves relationships.",
      quiz: [
        { q: "Emotions help us:", options: ["Respond to situations", "Stop breathing", "Sleep forever"], a: 0 },
        { q: "Fear is an:", options: ["Emotion", "Animal", "Planet"], a: 0 },
        { q: "Emotional control improves:", options: ["Relationships", "Gravity", "Rain"], a: 0 }
      ]
    },
    {
      title: "Memory",
      reading: "Memory allows us to store and recall information. Practice strengthens memory over time. Sleep also plays an important role in remembering.",
      quiz: [
        { q: "Memory helps us:", options: ["Remember information", "Fly", "Swim"], a: 0 },
        { q: "Practice generally:", options: ["Improves memory", "Erases memory", "Stops learning"], a: 0 },
        { q: "Good sleep supports:", options: ["Memory", "Rust", "Gravity"], a: 0 }
      ]
    },
    {
      title: "Motivation",
      reading: "Motivation is the drive to achieve goals. It can come from internal passion or external rewards. Clear goals make motivation stronger.",
      quiz: [
        { q: "Motivation helps achieve:", options: ["Goals", "Weather", "Rivers"], a: 0 },
        { q: "Internal motivation comes from:", options: ["Personal interest", "Traffic", "Noise"], a: 0 },
        { q: "Clear goals:", options: ["Increase motivation", "Remove learning", "Slow thinking"], a: 0 }
      ]
    },
    {
      title: "Habit Formation",
      reading: "Habits form through repetition. Small actions repeated daily become automatic over time. Good habits lead to lasting improvement.",
      quiz: [
        { q: "Habits form by:", options: ["Repetition", "Luck", "Magic"], a: 0 },
        { q: "Small actions become:", options: ["Automatic", "Invisible", "Impossible"], a: 0 },
        { q: "Good habits lead to:", options: ["Improvement", "Failure", "Forgetfulness"], a: 0 }
      ]
    }
  ],
  "Philosophy": [
    {
      title: "Stoicism",
      reading: "Focus on what you can control. Accept what you cannot. Calm thinking reduces stress and improves decisions.",
      quiz: [
        { q: "What should you control?", options: ["Your actions", "The weather", "Other people"], a: 0 }
      ]
    },
    {
      title: "Existentialism",
      reading: "People create meaning through choices. Freedom comes with responsibility. Actions shape identity.",
      quiz: [
        { q: "Meaning comes from?", options: ["Choices", "Luck", "Biology"], a: 0 }
      ]
    },
    {
      title: "Logic",
      reading: "Logic helps evaluate arguments using evidence instead of emotion. Good reasoning avoids false conclusions.",
      quiz: [
        { q: "Logic relies on?", options: ["Evidence", "Emotion", "Guessing"], a: 0 }
      ]
    },
    {
      title: "Ethics",
      reading: "Ethics explores right and wrong. Different cultures have different moral values, but honesty and fairness are widely respected.",
      quiz: [
        { q: "Ethics studies?", options: ["Right and wrong", "Math", "History"], a: 0 }
      ]
    },
    {
      title: "Critical Thinking",
      reading: "Question assumptions, examine evidence, and avoid jumping to conclusions. Strong thinkers stay curious.",
      quiz: [
        { q: "Good thinkers do what?", options: ["Question assumptions", "Ignore evidence", "Jump to conclusions"], a: 0 }
      ]
    }
  ],
  "Technology": [
    {
      title: "Artificial Intelligence",
      reading: "AI enables computers to learn from data and perform tasks that usually require human intelligence. It powers voice assistants, recommendations, and self-driving technology. AI improves as it processes more information.",
      quiz: [
        { q: "AI learns from?", options: ["Data", "Water", "Sand"], a: 0 },
        { q: "Voice assistants use?", options: ["AI", "Coal", "Wind"], a: 0 },
        { q: "AI improves with?", options: ["More data", "Less electricity", "Paint"], a: 0 }
      ]
    },
    {
      title: "The Internet",
      reading: "The Internet is a global network of computers connected together. It allows instant communication and sharing of information worldwide. It has transformed how we live and work.",
      quiz: [
        { q: "The Internet is a?", options: ["Global network", "Single computer", "Radio station"], a: 0 },
        { q: "It allows instant?", options: ["Communication", "Travel", "Farming"], a: 0 },
        { q: "The Internet has transformed?", options: ["How we live", "Gravity", "The Sun"], a: 0 }
      ]
    },
    {
      title: "Cybersecurity",
      reading: "Cybersecurity protects computers, networks, and data from theft or damage. Strong passwords and encryption are key tools. It keeps sensitive information safe.",
      quiz: [
        { q: "Cybersecurity protects?", options: ["Data", "Food", "Furniture"], a: 0 },
        { q: "A key tool is?", options: ["Strong passwords", "Loud alarms", "Water"], a: 0 },
        { q: "It keeps information?", options: ["Safe", "Public", "Lost"], a: 0 }
      ]
    },
    {
      title: "Cloud Computing",
      reading: "Cloud computing delivers computing services over the internet. It allows users to store and access data remotely. This eliminates the need for expensive local hardware.",
      quiz: [
        { q: "Cloud computing uses the?", options: ["Internet", "Ocean", "Moon"], a: 0 },
        { q: "It allows remote?", options: ["Data access", "Farming", "Driving"], a: 0 },
        { q: "It eliminates the need for?", options: ["Local hardware", "Electricity", "Keyboards"], a: 0 }
      ]
    },
    {
      title: "Programming Basics",
      reading: "Programming is the process of writing instructions for computers. It uses special languages to solve problems and create software. It requires logical thinking.",
      quiz: [
        { q: "Programming writes?", options: ["Instructions", "Novels", "Music"], a: 0 },
        { q: "It uses special?", options: ["Languages", "Paints", "Clothes"], a: 0 },
        { q: "It requires?", options: ["Logical thinking", "Running fast", "Singing"], a: 0 }
      ]
    }
  ],
  "Culture": [
    {
      title: "Art Movements",
      reading: "Art styles change over time as artists express new ideas. Movements like Impressionism and Cubism introduced unique techniques. Art reflects history and society.",
      quiz: [
        { q: "Art reflects?", options: ["Society", "Gravity", "Weather"], a: 0 },
        { q: "Cubism is a?", options: ["Art movement", "Country", "Instrument"], a: 0 },
        { q: "Artists express?", options: ["Ideas", "Only numbers", "Only maps"], a: 0 }
      ]
    },
    {
      title: "Music History",
      reading: "Music has evolved over centuries through different cultures. Classical, jazz, and rock each brought new rhythms and instruments. Music connects people universally.",
      quiz: [
        { q: "Music connects people?", options: ["Universally", "Rarely", "Never"], a: 0 },
        { q: "Music evolved over?", options: ["Centuries", "Two days", "A minute"], a: 0 },
        { q: "Jazz is a type of?", options: ["Music", "Food", "Car"], a: 0 }
      ]
    },
    {
      title: "Festivals",
      reading: "Festivals celebrate cultural traditions, religious events, or seasons. They often feature special foods, music, and clothing. Festivals strengthen community bonds.",
      quiz: [
        { q: "Festivals celebrate?", options: ["Traditions", "Traffic", "Work"], a: 0 },
        { q: "They often feature special?", options: ["Foods", "Rules", "Rocks"], a: 0 },
        { q: "Festivals strengthen?", options: ["Community bonds", "Buildings", "Roads"], a: 0 }
      ]
    },
    {
      title: "Languages",
      reading: "Thousands of languages are spoken around the world. Language shapes how people think and communicate. Learning a new language opens up new cultures.",
      quiz: [
        { q: "Language shapes how people?", options: ["Think", "Breathe", "Sleep"], a: 0 },
        { q: "Learning a new language opens?", options: ["New cultures", "Doors physically", "Banks"], a: 0 },
        { q: "There are thousands of?", options: ["Languages", "Moons", "Suns"], a: 0 }
      ]
    },
    {
      title: "Food Culture",
      reading: "Food represents the history and geography of a culture. Different regions use unique spices and cooking methods. Sharing meals brings people together.",
      quiz: [
        { q: "Food represents a culture's?", options: ["History", "Height", "Weight"], a: 0 },
        { q: "Different regions use unique?", options: ["Spices", "Oceans", "Planets"], a: 0 },
        { q: "Sharing meals brings people?", options: ["Together", "Apart", "To sleep"], a: 0 }
      ]
    }
  ],
  "Life Skills": [
    {
      title: "Communication",
      reading: "Good communication means listening as well as speaking. Clear messages reduce misunderstandings. Respect and empathy improve conversations.",
      quiz: [
        { q: "Good communication includes?", options: ["Listening", "Ignoring", "Shouting"], a: 0 },
        { q: "Clear messages reduce?", options: ["Misunderstandings", "Rain", "Noise"], a: 0 },
        { q: "Respect improves?", options: ["Conversations", "Gravity", "Speed"], a: 0 }
      ]
    },
    {
      title: "Productivity",
      reading: "Productivity is about managing time and focus. Breaking tasks into smaller steps makes them easier to complete. Avoiding distractions helps you work better.",
      quiz: [
        { q: "Productivity is about managing?", options: ["Time", "Weather", "Traffic"], a: 0 },
        { q: "Breaking tasks makes them?", options: ["Easier", "Impossible", "Invisible"], a: 0 },
        { q: "Avoiding distractions helps you?", options: ["Work better", "Sleep", "Forget"], a: 0 }
      ]
    },
    {
      title: "Time Management",
      reading: "Time management helps prioritize important tasks. Using calendars and lists keeps you organized. It reduces stress and increases efficiency.",
      quiz: [
        { q: "Time management helps prioritize?", options: ["Tasks", "Food", "Clothes"], a: 0 },
        { q: "Calendars keep you?", options: ["Organized", "Lost", "Hungry"], a: 0 },
        { q: "It reduces?", options: ["Stress", "Money", "Friends"], a: 0 }
      ]
    },
    {
      title: "Problem Solving",
      reading: "Problem solving involves identifying an issue and finding a solution. Brainstorming helps generate ideas. Testing solutions leads to success.",
      quiz: [
        { q: "Problem solving involves finding a?", options: ["Solution", "Problem", "Excuse"], a: 0 },
        { q: "Brainstorming generates?", options: ["Ideas", "Wind", "Water"], a: 0 },
        { q: "Testing solutions leads to?", options: ["Success", "Failure", "Sleep"], a: 0 }
      ]
    },
    {
      title: "Decision Making",
      reading: "Good decisions require evaluating options and consequences. Gathering information helps make informed choices. Learning from mistakes improves future decisions.",
      quiz: [
        { q: "Good decisions require evaluating?", options: ["Options", "Cars", "Shoes"], a: 0 },
        { q: "Gathering information helps make?", options: ["Informed choices", "Dinner", "Beds"], a: 0 },
        { q: "Learning from mistakes improves?", options: ["Future decisions", "Past decisions", "Nothing"], a: 0 }
      ]
    }
  ],
  "Finance": [
    {
      title: "Investing Basics",
      reading: "Investing means putting money into assets that may grow over time. Stocks, bonds, and mutual funds are common investments. Higher returns often come with higher risk.",
      quiz: [
        { q: "Investing aims to?", options: ["Grow money", "Lose money", "Spend money"], a: 0 },
        { q: "Stocks are a type of?", options: ["Investment", "Food", "Vehicle"], a: 0 },
        { q: "Higher returns usually mean?", options: ["Higher risk", "No risk", "Less learning"], a: 0 }
      ]
    },
    {
      title: "Macroeconomics",
      reading: "Macroeconomics studies the economy as a whole. It looks at inflation, unemployment, and economic growth. Government policies affect these big economic factors.",
      quiz: [
        { q: "Macroeconomics studies the?", options: ["Economy", "Weather", "Oceans"], a: 0 },
        { q: "It looks at?", options: ["Inflation", "Trees", "Bugs"], a: 0 },
        { q: "Government policies affect?", options: ["Economic factors", "Gravity", "Sunlight"], a: 0 }
      ]
    },
    {
      title: "Budgeting",
      reading: "Budgeting is creating a plan for your money. It helps balance income and expenses. Sticking to a budget prevents overspending.",
      quiz: [
        { q: "Budgeting is a plan for?", options: ["Money", "Vacations", "Exercise"], a: 0 },
        { q: "It helps balance?", options: ["Income and expenses", "Diet", "Tires"], a: 0 },
        { q: "Sticking to a budget prevents?", options: ["Overspending", "Saving", "Earning"], a: 0 }
      ]
    },
    {
      title: "Saving Money",
      reading: "Saving money builds financial security. Emergency funds protect against unexpected costs. Regular saving leads to long-term wealth.",
      quiz: [
        { q: "Saving money builds?", options: ["Security", "Houses", "Cars"], a: 0 },
        { q: "Emergency funds protect against?", options: ["Unexpected costs", "Good weather", "Free time"], a: 0 },
        { q: "Regular saving leads to?", options: ["Wealth", "Poverty", "Hunger"], a: 0 }
      ]
    },
    {
      title: "Compound Interest",
      reading: "Compound interest is earning interest on your interest. It makes savings grow faster over time. Starting early maximizes its powerful effect.",
      quiz: [
        { q: "Compound interest earns interest on?", options: ["Interest", "Nothing", "Taxes"], a: 0 },
        { q: "It makes savings grow?", options: ["Faster", "Slower", "Not at all"], a: 0 },
        { q: "Starting early maximizes?", options: ["Its effect", "Your age", "Your debt"], a: 0 }
      ]
    }
  ]
};

// Generate Orbs and replace existing pathways to match the new structure
db.forEach(category => {
  const catName = category.title;
  if (content[catName]) {
    // Create a new pathway for this category that holds all these lessons
    // Or we can just use the first existing pathway and put all orbs there
    // The user said "remove all lessons from each subject sections, add this lesson and quiz questions"
    // So I will just use a single pathway per category named "Core Lessons" or use the existing pathways
    
    // Actually, I'll just clear existing pathways and make 1 pathway per category called "Main Lessons" containing all orbs.
    const newOrbs = content[catName].map((lesson, idx) => {
      return {
        id: category.id + "_orb_" + idx,
        title: lesson.title,
        preview: lesson.reading.substring(0, 50) + "...",
        reading: lesson.reading,
        keyTerms: [],
        summary: lesson.reading,
        quiz: lesson.quiz.map(q => ({
          question: q.q,
          options: q.options,
          correctIndex: q.a,
          explanation: "That is correct."
        })),
        difficulty: "Beginner",
        readingTimeMinutes: 5,
        xpReward: 100,
        estimatedReviewInterval: 24
      };
    });

    category.pathways = [
      {
        id: category.id + "_pathway_1",
        title: "Core Lessons",
        description: "Foundational lessons for " + catName,
        orbs: newOrbs
      }
    ];
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Database updated successfully.');
