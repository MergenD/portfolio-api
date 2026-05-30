const OpenAI = require('openai');

class AIService {
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.careerData = `
    Mergen Durdyyev is a Frontend-Focused Senior Full-Stack Engineer with 6 years of experience delivering high-performance web applications and scalable digital solutions. He specializes in AI, and full-stack development, helping businesses build efficient products that combine modern frontend experiences with backend services and emerging technologies.

    TECHNICAL EXPERTISE:
    - Languages: JavaScript, React.js, TypeScript, Next.js, Node.js, Python, FastAPI, SQL
    - Frameworks: Express, Fastify, Redux,  Context API, React Profiler, Material-UI, Ant Design, ShadCN
    - Tools: Pydantic, Alembic, Sequelize, TypeORM, Prisma, BigQuery, Chart.js, WebSockets, PostgreSQL, MySQL, MongoDB, Firebase, Docker, Git, Web Vitals, OpenTelemetry, Lighthouse, CI/CD Pipelines
    - Integrations: OpenAI, BrianAI, Gemini, LangChain, RAG, LLMs, ML Models

    PROFESSIONAL EXPERIENCE:
    LEAD FRONTEND ENGINEER — Celentis (2025-2026)

    - Partnered with UI/UX designers to build modern and responsive interfaces, improving user satisfaction by 20%
    - Developed reusable React components and interactive experiences that increased monthly page views by 35%
    - Optimized API performance using optimistic updates, caching strategies, and efficient state management
    - Led frontend development of an AI recruitment platform designed to help recruiters process large candidate volumes more efficiently
    - Implemented AI-driven resume summarization and candidate skill extraction features, enabling recruiters to quickly identify key qualifications
    - Built real-time AI assistance capabilities with contextual interview prompts and tailored follow-up question generation based on candidate profiles and job requirements
    - Built a real-time video interview platform using LiveKit for low-latency audio/video streaming and integrated an AI assistant that delivered contextual interview guidance and intelligent follow-up prompts during live sessions

  LEAD FRONTEND ENGINEER — Turkmen Portal (2022-2025)

    - Led a frontend team of three developers while ensuring project quality and timely feature delivery
    - Conducted code reviews and participated in technical interviews for frontend candidates
    - Contributed to the development and maintenance of Turkmenistan’s largest online news platform
    - Significantly improved SEO by migrating the application from React.js to Next.js with server-side rendering
    - Improved rendering efficiency by 40% using React optimization techniques including memoization and eliminating unnecessary re-renders
    - Enhanced frontend architecture and performance across large-scale applications

  FRONTEND ENGINEER — Timar HK (2020-2022)

    - Architected a digital HR management system that improved company productivity by 30%
    - Implemented Git workflows and CI/CD practices, improving deployment reliability and reducing release issues
    - Built responsive user interfaces optimized for desktop and mobile devices
    - Increased frontend performance by 65% by reducing prop drilling and introducing Redux Toolkit with SWR data fetching

    NOTABLE PROJECTS:
    FIND STAR
    Led frontend development of an AI-powered recruitment platform, implementing LLM-based resume summarization, skill extraction, and contextual interview assistance, built real-time AI interview experience with LiveKit video streaming and WebSocket-based communication for scalable recruiter workflows.
    Technologies: React.js, Next.js, TypeScript, Redux Toolkit, RTK Query, LiveKit, Qwen, LLMs, Prompt Engineering, AI Models, WebSockets, Node.js, REST APIs
    Website: findstar.io

    TURKMEN PORTAL
    Led frontend development of the largest news platform in Turkmenistan, migrating from React.js to Next.js, improving SEO, performance, and rendering efficiency through SSR and React optimization techniques while ensuring scalable architecture for high-traffic usage.
    Technologies: Next.js, TypeScript, React Query, Tailwind CSS, SEO, SSR
    Website: www.turkmenportal.com

    TIMIX HR
    Developed frontend architecture for an HR management system, optimizing performance through centralized state management (Redux Toolkit), SWR data fetching, and reducing prop drilling to improve scalability and user experience.
    Technologies: React.js, TypeScript, Redux Toolkit, SWR, Tailwind CSS

    Timar
    Built a full-featured e-commerce system for furniture fittings with a separate customer-facing Next.js storefront and a React-based admin panel, enabling product management, order handling, and inventory control with a focus on performance, scalability, and responsive UX.
    Technologies: Next.js, React.js, TypeScript, Redux Toolkit, Node.js, MongoDB, REST APIs
  
    MIRAS HALY
    Built a modern e-commerce platform for premium handmade carpets, focusing on high-performance UI, responsive product browsing experience, and optimized data fetching for smooth catalog navigation and improved user engagement.
    Technologies: Next.js, TypeScript, React Query, Tailwind CSS
    website: www.mirashaly.com

    TAKYK MENZIL
    Developed a modern multilingual corporate website for a heating, cooling, air conditioning, and air purification company, focusing on fast performance, SEO optimization, and responsive UI, with dynamic service pages and structured content architecture for improved user experience and lead generation.
    Technologies: Next.js, React.js, TypeScript, Tailwind CSS, RTK Query, REST APIs
    website: www.takykmenzil.com

    EDUCATION:
    - Bachelor's Degree in Computer Science | Turkmen Institute of Technologies and Engineering (2019-2023)

    PERSONAL QUALITIES:
    - Organization and attention to detail
    - Empathy and strong communication skills
    - Resilience and problem-solving mindset
    - Leadership and team collaboration
    - Logical reasoning and analytical thinking

    CONTACT INFOINFO:
    - mergendurdyiev@gmail.com
    - www.linkedin.com/in/mergendurdyyev
    
    BIO: 
    - 25 years old
    - From Turkmenistan, currently in Turkmenistan
    `;
  }

  async chatWithAI(question) {
    const startTime = Date.now();

    try {
      const systemPrompt = `You are Mergen's AI assistant. You have access to comprehensive information about Mergen's career, skills, projects, and experience. 

Your role is to:
1. Answer questions about Mergen's professional background, technical skills, and projects
2. Provide detailed information about his work experience and achievements
3. Share insights about his expertise in AI and full-stack development
4. Help visitors understand what Mergen can offer as a senior engineer
5. Be friendly, professional, and enthusiastic about Mergen's capabilities

IMPORTANT RULES:
- Only answer questions about Mergen and his professional background
- If asked about something not related to Mergen, politely redirect to relevant topics
- Provide specific examples and metrics when possible
- Highlight frontend expertise and AI integration in his projects
- Always maintain a positive and enthusiastic tone about Mergen's skills
- Highlight his expertise in emerging technologies (AI)
- Mention his achievements and impact on projects

RESPONSE FORMATTING:
- Use ### for section headers (e.g., "### Programming Languages")
- Use **bold** for important terms and technologies
- Use bullet points (- item) for lists
- Avoid excessive empty lines between content
- Keep responses well-structured and concise

Career Information: ${this.careerData}`;

      // - Be conversational but professional
      // - Use empty lines instead of line breaks for better readability

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });

      const aiResponse = completion.choices[0].message.content;
      const responseTime = Date.now() - startTime;
      const tokensUsed = completion.usage.total_tokens;

      return {
        response: aiResponse,
        responseTime,
        tokensUsed,
      };
    } catch (error) {
      console.error('AI Service Error:', error);
      throw new Error(
        "Sorry, I'm having trouble processing your request right now. Please try again later.",
      );
    }
  }

  // Method to get chat analytics for admin
  async getChatAnalytics() {
    // This would be implemented to provide insights about chat usage
    return {
      totalConversations: 0,
      popularQuestions: [],
      averageResponseTime: 0,
      totalTokensUsed: 0,
    };
  }
}

module.exports = new AIService();
