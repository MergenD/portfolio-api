const OpenAI = require('openai');

class QuestionAnswerer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.careerData = `
    Mergen Durdyyev is a Frontend-Focused Full-Stack Engineer with 6 years of experience building scalable, high-performance web applications and digital products. He specializes in React ecosystems, modern frontend architecture, full-stack development, and AI-powered solutions, creating systems focused on performance, usability, and real-world business impact.

    PROFESSIONAL EXPERIENCE:
    CELENTIS - Lead Frontend Engineer:
    - Led frontend development for an AI-powered HR Copilot platform using React, building scalable architecture and reusable component systems
    - Developed intelligent workflows and AI-assisted interfaces designed to streamline HR operations and improve productivity
    - Built maintainable frontend systems with reusable patterns, improving development efficiency and long-term scalability
    - Collaborated across teams to translate product requirements into responsive, user-focused experiences

    TURKMEN PORTAL - Frontend Developer:
    - Contributed to the modernization of one of Turkmenistan’s largest news platforms, improving overall performance and responsiveness
    - Optimized frontend rendering and loading strategies, enhancing user experience for large-scale traffic
    - Improved platform maintainability through reusable UI components and cleaner architecture
    - Focused on performance metrics and frontend best practices to create a faster browsing experience

    TIMAR - Full-Stack Developer:
    - Built an e-commerce platform for furniture fittings with server-side rendering and dynamic product management
    - Developed advanced filtering systems and responsive user interfaces to simplify product discovery
    - Integrated backend APIs and business workflows to create a seamless purchasing experience
    - Improved SEO and overall customer journey through performance-focused development practices

    TECHNICAL SKILLS:
    - Programming Languages: JavaScript (Node, React), TypeScript (Next), Python (FastAPI), SQL
    - Frameworks & Libraries: React, Next.js, Node.js, Express, Redux Toolkit, Zustand, React Query, GraphQL, REST APIs, Ant Design, Tailwind CSS
    - Frontend Engineering: Responsive UI development, reusable component systems, performance optimization, Core Web Vitals, state management, frontend architecture patterns, performance metrics, SEO optimization, browser APIs, web vitals
    - Databases & Data Engineering Tools: PostgreSQL, MySQL, MongoDB, Prisma, Firebase
    - Software & Tools: Git, Docker, WebSockets, OpenAI APIs, AI integrations, SSR, ISR, SEO optimization, Browser APIs
    - DevOps, Monitoring & Observability: CI/CD pipelines, Nginx, Linux, Vercel deployment workflows
    `;
  }

  _addTyposToEachSentence(text) {
    if (!text || typeof text !== 'string') return text;

    // Split by sentence endings while keeping the delimiters.
    const parts = text.split(/([.!?]+)/);
    let result = '';
    let typoCount = 0;
    const maxTypos = 3;

    for (let i = 0; i < parts.length; i += 2) {
      let sentence = parts[i];
      const delimiter = parts[i + 1] || '';

      if (!sentence || !sentence.trim()) {
        result += sentence + delimiter;
        continue;
      }

      const words = sentence.split(/(\s+)/); // keep spaces

      // Only add typo if we haven't reached the max limit
      if (typoCount < maxTypos) {
        // Find candidate word: alphabetic and length > 3
        const candidateIndexes = [];
        for (let j = 0; j < words.length; j++) {
          if (/^[A-Za-z]{4,}$/.test(words[j])) {
            candidateIndexes.push(j);
          }
        }

        if (candidateIndexes.length > 0) {
          const wordIndex =
            candidateIndexes[
              Math.floor(Math.random() * candidateIndexes.length)
            ];
          const originalWord = words[wordIndex];

          // Simple typo: swap two adjacent middle characters
          if (originalWord.length >= 4) {
            const pos =
              Math.floor(Math.random() * (originalWord.length - 2)) + 1; // avoid first char
            const chars = originalWord.split('');
            const tmp = chars[pos];
            chars[pos] = chars[pos + 1];
            chars[pos + 1] = tmp;
            words[wordIndex] = chars.join('');
            typoCount++;
          }
        }
      }

      sentence = words.join('');
      result += sentence + delimiter;
      if (delimiter) result += ' ';
    }

    return result.trim();
  }

  async answerQuestions(jobDescription, questions) {
    const startTime = Date.now();

    try {
      const systemPrompt = `You are Mergen answering job application questions. Write AS Mergen in FIRST PERSON (I, me, my) - you are speaking directly, not someone describing Mergen.

CRITICAL REQUIREMENTS:
1. Write in FIRST PERSON - use "I", "me", "my" - you ARE Mergen writing this yourself. But don't use so much I word.
2. Answer questions using SIMPLE, everyday words - avoid complex jargon or overly technical terms
3. Be AUTHENTIC and HUMANIC (human-like) - write as if you're speaking naturally, not like a formal document
4. Base ALL answers on your actual experience from the career data provided
5. Keep answers concise but complete - DONT EXCEED 3 sentences per question at maximum
6. Use a conversational, friendly tone - like you're talking to the hiring manager directly

Your role is to:
- Answer each question based on your real experience and projects (write as if you did these things)
- Reference specific projects, technologies, or achievements when relevant
- Make answers sound natural and human-written 
- Connect answers to the job description when appropriate
- Show enthusiasm and authenticity
- Write as if you're filling out the application yourself - direct and personal

Career Information: ${this.careerData}
Job Description: ${jobDescription}
Questions to Answer: ${questions}`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        max_tokens: 800,
        temperature: 0.8,
      });

      const rawAnswers = completion.choices[0].message.content;
      const answers = this._addTyposToEachSentence(rawAnswers);
      const responseTime = Date.now() - startTime;
      const tokensUsed = completion.usage.total_tokens;

      return { response: answers, responseTime, tokensUsed };
    } catch (error) {
      console.error('Question Answerer Error:', error);
      throw new Error(
        "Sorry, I'm having trouble processing your request right now. Please try again later.",
      );
    }
  }
}

module.exports = new QuestionAnswerer();
