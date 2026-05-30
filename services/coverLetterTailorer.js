const OpenAI = require('openai');

class CoverLetterTailorer {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.coverLetter = `I’m Mergen, a Frontend-Focused Full-Stack Developer with 6 years of experience building scalable, high-performance web applications using React, Next.js, and Node.js. I enjoy creating sleek, responsive user experiences while delivering reliable backend systems that support products at scale.
Excited to apply for the Full-Stack Developer (React + Next.js + Node.js) role on your team. My core stack includes React, Next.js, TypeScript, Node.js, Express, GraphQL/REST APIs, and modern frontend architecture patterns. I’ve built and delivered products across multiple industries, focusing on performance, scalability, and user experience.
A few highlights from my recent work:
✅ Celentis: Led frontend development for an AI-powered HR Copilot built with React, integrating intelligent assistant capabilities, scalable frontend architecture, and reusable systems to enhance HR workflows and user efficiency.
✅ Turkmen Portal: Enhanced and modernized one of Turkmenistan’s largest digital news platforms, improving performance, user experience, and overall platform responsiveness.
✅ Timar: Developed an e-commerce platform for furniture fittings featuring SSR with Next.js, dynamic product management, and an optimized customer journey.
What I bring to your team:
⚡ Frontend-focused full-stack development — building responsive interfaces alongside scalable APIs and backend systems.
🎨 Performance & user experience mindset — creating fast, polished, and user-centered applications with strong attention to detail.
🤖 AI-powered solutions — experience integrating intelligent features and automation into modern applications.
🛠️ Strong engineering practices — experience with scalable architecture, reusable systems, clean code, and maintainable solutions.
🤝 Collaborative mindset — strong communication and an enthusiasm for working closely with teams and stakeholders.
🧠 Strong product sense — I think beyond implementation and focus on delivering value to users.
Feel free to explore my portfolio website where you can view my projects and interact with my AI assistant:
🌐 https://mergen.codes
Let’s create exceptional products together!

Best regards,
Mergen Durdyyev
`;
  }

  async tailorCoverLetter(jobDescription) {
    const startTime = Date.now();

    try {
      const systemPrompt = `You are a cover letter tailorer. You have access to comprehensive information about Mergen's career, skills, projects, and experience. You are given a cover letter and you need to tailor it to the job description.

IMPORTANT: Only make changes to tailor specific parts. Preserve the original structure, tone.

Your role is to: 
1. Add the company name and role name from the job description to the appropriate places in the cover letter
2. To reflect specific technologies, tools, or skills mentioned in the job description that align with Mergen's experience, add emphasize them in the relevant sections (tech stack, "What I bring" section, or experience highlights)

Cover Letter: ${this.coverLetter}
Job Description: ${jobDescription}`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'system', content: systemPrompt }],
        max_tokens: 500,
        temperature: 0.7,
      });

      const tailoredCoverLetter = completion.choices[0].message.content;
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
