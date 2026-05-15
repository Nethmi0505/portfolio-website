// Shared portfolio data for all pages (no build step needed)
window.PORTFOLIO_DATA = {
  PROFILE: {
    name: "W.Udara Nethmi",
    email: "udaranethmi2003@gmail.com",
    github: "https://github.com/Nethmi0505",
    linkedin: "https://www.linkedin.com/in/udaranethmi",
  },

  // Animated role badges — cycles in the hero
  ROLES: [
    "Software Engineering Undergraduate",
    "Aspiring QA Engineer",
    "Frontend Developer",
    "Full-Stack Explorer",
    "UI/UX Curious Mind",
  ],

  SKILLS: [
    {
      title: "Languages",
      level: "Comfortable",
      items: ["Java", "JavaScript", "HTML & CSS", "C#", "SQL"],
    },
    {
      title: "Frameworks & Platforms",
      level: "Growing",
      items: ["Firebase", "MySQL", "AWS S3 & Amplify", "Unity", "Akka (Java)"],
    },
    {
      title: "QA & Testing",
      level: "Interested",
      items: ["Manual Testing", "Automation Testing Basics", "Bug Tracking & Reporting", "Software Testing Fundamentals"],
    },
    {
      title: "Tools & Concepts",
      level: "Learning",
      items: ["OOP", "Database Administration", "Cloud Deployment", "Git & GitHub", "VS Code"],
    },
  ],

  PROJECTS: [
    {
      slug: "movies-review-app",
      title: "Movies Review Web App",
      description: "A web application where users can browse and review movies, backed by Firebase Firestore for real-time data.",
      overview:
        "Built a full movie review platform using HTML and JavaScript with Firebase Firestore as the backend database. Users can view movies, read reviews, and interact with the app in real time — no traditional server needed.",
      highlights: ["Firebase Firestore real-time DB", "Dynamic movie listings", "User review functionality"],
      tech: ["HTML", "JavaScript", "Firebase"],
      links: { live: "#", code: "https://github.com/Nethmi0505/Movies-Review-Web-App" },
    },
    {
      slug: "Nexora-ecommerce",
      title: "Nexora — E-Commerce Website",
      description: "A responsive e-commerce storefront built with pure HTML, CSS and JavaScript.",
      overview:
        "Designed and developed a clean e-commerce front-end focused on product layout, responsive design, and smooth UI interactions — all without a framework.",
      highlights: ["Responsive layout", "Product listing UI", "Cart interactions"],
      tech: ["HTML", "CSS", "JavaScript"],
      links: { live: "#", code: "#" },
    },
    {
      slug: "aws-static-website",
      title: "AWS Static Website Deployment",
      description: "Deployed a static website to the cloud using AWS S3 and AWS Amplify.",
      overview:
        "Learned cloud deployment by hosting a static website on AWS S3 and setting up continuous deployment through AWS Amplify. Gained hands-on experience with cloud infrastructure and deployment pipelines.",
      highlights: ["AWS S3 bucket hosting", "AWS Amplify CI/CD", "Cloud deployment pipeline"],
      tech: ["AWS S3", "AWS Amplify", "HTML"],
      links: { live: "#", code: "#" },
    },
    {
      slug: "banking-system-java",
      title: "Banking System — Java GUI App",
      description: "A desktop banking application built with Java, applying OOP principles like Inheritance and Encapsulation.",
      overview:
        "Developed a Java-based GUI banking application as part of university coursework. The project demonstrated core OOP concepts including inheritance and encapsulation in a real-world scenario.",
      highlights: ["Java Swing GUI", "OOP — Inheritance & Encapsulation", "Account management features"],
      tech: ["Java", "OOP"],
      links: { live: "#", code: "https://github.com/Nethmi0505/Banking-System-Java-GUI-Application" },
    },
    {
      slug: "campus-hub",
      title: "Campus Hub — Database Project",
      description: "A database administration project managing campus data with MySQL.",
      overview:
        "Designed and managed a relational database for a campus management system. Focused on database schema design, query optimization, and data integrity as part of a DBA-focused university project.",
      highlights: ["MySQL schema design", "Database Administration", "Query optimization"],
      tech: ["MySQL", "SQL", "DBA"],
      links: { live: "#", code: "#" },
    },
    {
      slug: "coin-math-3d",
      title: "Coin Math 3D — Educational Game",
      description: "A 3D educational math game built in Unity with C# for young learners.",
      overview:
        "Created a fun 3D game in Unity designed to help kids practice math skills through interactive coin-based challenges. Handled game logic, scene design, and scripting entirely in C#.",
      highlights: ["Unity 3D game design", "C# scripting", "Educational gameplay mechanics"],
      tech: ["Unity", "C#"],
      links: { live: "#", code: "https://github.com/Nethmi0505/-Coin-Math-3D-Educational-3D-Math-Adventure-Game" },
    },
    {
      slug: "cinema-booking-system",
      title: "Cinema Booking System",
      description: "A Java-based cinema seat booking application applying Object-Oriented Programming principles.",
      overview:
        "Built a cinema booking system in Java as a university project, focusing on OOP design patterns. Users can select movies, choose seats, and complete bookings through a structured class-based architecture.",
      highlights: ["OOP class design", "Seat selection logic", "Booking management flow"],
      tech: ["Java", "OOP"],
      links: { live: "#", code: "https://github.com/Nethmi0505/-Cinema-Booking-System" },
    },
    {
      slug: "distributed-banking-simulation",
      title: "Distributed Banking Simulation",
      description: "A distributed systems project simulating concurrent banking transactions using Java Akka Actors.",
      overview:
        "Simulated a distributed banking environment using the Akka Actor model in Java. The project explored concurrency, message passing between actors, and fault-tolerant distributed system design.",
      highlights: ["Akka Actor model", "Concurrent transaction handling", "Distributed systems concepts"],
      tech: ["Java", "Akka"],
      links: { live: "#", code: "https://github.com/Nethmi0505/Distributed-Banking-Simulation" },
    },
  ],

  EDUCATION: [
    {
      when: "2024 — Present",
      title: "BSc. Hons — Computer Science (Software Engineering)",
      org: "University of Wolverhampton (UK) · Cinec Campus",
      details: "Studying Software Engineering with focus on OOP, Databases, Web Development, Cloud, and Software Testing.",
    },
    {
      when: "2025 — Present",
      title: "Diploma in Digital Marketing",
      org: "Sri Lanka Institute of Marketing",
      details: "Learning digital marketing strategy, Google Ads, and online brand management alongside engineering studies.",
    },
    {
      when: "Completed",
      title: "AAT Level 1 & Level 2",
      org: "AAT Sri Lanka",
      details: "Foundation in accounting and business finance principles.",
    },
    {
      when: "Completed",
      title: "G.C.E. Advanced Level — Commerce",
      org: "Anula Vidyalaya, Nugegoda",
      details: "Completed A/Ls in the Commerce stream.",
    },
  ],
};
