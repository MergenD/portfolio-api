const OpenAI = require('openai');

class CoverLetterTailorer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.coverLetter = `I'm Mergen, a Frontend-Focused Full-Stack Developer with 6 years of experience building scalable, high-performance web applications using React, Next.js, and Node.js. I enjoy creating sleek, responsive user experiences while delivering reliable backend systems that support products at scale.
Excited to apply for the Full-Stack Developer (React + Next.js + Node.js) role on your team. My core stack includes React, Next.js, TypeScript, Node.js, Express, GraphQL/REST APIs, and modern frontend architecture patterns. I've built and delivered products across multiple industries, focusing on performance, scalability, and user experience.
A few highlights from my recent work:
✅ Celentis: Led frontend development for an AI-powered HR Copilot built with React, integrating intelligent assistant capabilities, scalable frontend architecture, and reusable systems to enhance HR workflows and user efficiency.
✅ Turkmen Portal: Enhanced and modernized one of Turkmenistan's largest digital news platforms, improving performance, user experience, and overall platform responsiveness.
✅ Timar: Developed an e-commerce platform for furniture fittings featuring SSR with Next.js, dynamic product management, and an optimized customer journey.
What I bring to your team:
⚡ Frontend-focused full-stack development: building responsive interfaces alongside scalable APIs and backend systems.
🎨 Performance & user experience mindset: creating fast, polished, and user-centered applications with strong attention to detail.
🤖 AI-powered solutions: experience integrating intelligent features and automation into modern applications.
🛠️ Strong engineering practices: experience with scalable architecture, reusable systems, clean code, and maintainable solutions.
🤝 Collaborative mindset: strong communication and an enthusiasm for working closely with teams and stakeholders.
🧠 Strong product sense: I think beyond implementation and focus on delivering value to users.
Feel free to explore my portfolio website where you can view my projects and interact with my AI assistant:
🌐 https://mergen.codes
Let's create exceptional products together!

Best regards,
Mergen Durdyyev
`;
  }

  sanitizeOutput(text) {
    return text.replace(/\u2014/g, ', ').replace(/\s+,/g, ',').trim();
  }

  async tailorCoverLetter(jobDescription) {
    const startTime = Date.now();

    try {
      const systemPrompt = `You tailor cover letters for Mergen Durdyyev to match a job description.

CRITICAL RULES (must follow all):
1. LANGUAGE: Detect the language of the job description and write the ENTIRE output in that language only. If the job description is in Russian, every word of the cover letter must be in Russian. Do not keep any English from the template.
2. NO EM DASH: Never use the em dash character (Unicode U+2014). Use colons, commas, or hyphens (-) instead.
3. ROLE FOCUS: Match the role type in the job description. For frontend roles, describe Mergen as a frontend developer only. Remove "full-stack", "backend", Node.js, Express, and server-side framing unless the job explicitly requires full-stack/backend work.
4. KEEP AI CONTENT: Always keep AI-related experience (AI-powered products, intelligent features, AI assistant on portfolio). Never remove these.
5. TECH ALIGNMENT: Weave in technologies from the job description that fit Mergen's experience (React, Next.js, TypeScript, SSR, REST/GraphQL APIs, component architecture, Git, Docker, i18n, UI libraries, etc.). Do not invent skills he does not have.
6. STRUCTURE: Preserve the original cover letter structure, emoji bullets, and tone. Only tailor content to fit the job.
7. OUTPUT: Return only the tailored cover letter text. No explanations or preamble.`;

      const userPrompt = `Job Description:
${jobDescription}

Cover Letter to tailor:
${this.coverLetter}`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 800,
        temperature: 0.4,
      });

      const tailoredCoverLetter = this.sanitizeOutput(
        completion.choices[0].message.content
      );
      const responseTime = Date.now() - startTime;
      const tokensUsed = completion.usage.total_tokens;

      return { response: tailoredCoverLetter, responseTime, tokensUsed };
    } catch (error) {
      console.error('Cover Letter Tailorer Error:', error);
      throw new Error(
        "Sorry, I'm having trouble processing your request right now. Please try again later."
      );
    }
  }
}

module.exports = new CoverLetterTailorer();
