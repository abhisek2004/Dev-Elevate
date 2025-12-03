import React, { useState } from 'react';
import { ExternalLink, Search, Bot, Zap, Globe, Code, Sparkles, Star } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';

const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    description: "OpenAI's general assistant with GPT-5 Thinking, voice, code, and image tools.",
    url: "https://chat.openai.com/",
    provider: "OpenAI",
    tags: ["Chat", "Code", "Images"],
    color: "from-emerald-400 to-cyan-400",
    icon: Bot
  },
  {
    id: 2,
    name: "Bolt.new",
    description: "Instantly build full-stack apps in the browser with AI assistance.",
    url: "https://bolt.new/",
    provider: "StackBlitz",
    tags: ["Development", "Full-Stack"],
    color: "from-blue-400 to-purple-400",
    icon: Zap
  },
  {
    id: 3,
    name: "V0",
    description: "AI-powered UI builder for React apps with instant previews.",
    url: "https://v0.app/",
    provider: "Vercel",
    tags: ["UI/UX", "React"],
    color: "from-purple-400 to-pink-400",
    icon: Code
  },
  {
    id: 4,
    name: "Gemini",
    description: "Google's Gemini chat with Live voice & Workspace integration.",
    url: "https://gemini.google.com/app",
    provider: "Google",
    tags: ["Chat", "Voice", "Integration"],
    color: "from-yellow-400 to-orange-400",
    icon: Sparkles
  },
  // {
  //   id: 5,
  //   name: "GPT-5",
  //   description: "Next-gen AI model with advanced reasoning and multimodal features.",
  //   url: "https://openai.com/",
  //   provider: "OpenAI",
  //   tags: ["Advanced AI", "Multimodal"],
  //   color: "from-green-400 to-blue-400",
  //   icon: Star
  // },
  {
    id: 6,
    name: "Perplexity",
    description: "AI search engine that provides accurate answers with citations.",
    url: "https://www.perplexity.ai/",
    provider: "Perplexity",
    tags: ["Search", "Research"],
    color: "from-indigo-400 to-purple-400",
    icon: Search
  },
  {
    id: 7,
    name: "Grok",
    description: "xAI's Grok with real-time search and conversational AI.",
    url: "https://grok.com/",
    provider: "xAI",
    tags: ["Chat", "Real-time"],
    color: "from-red-400 to-pink-400",
    icon: Bot
  },
  {
    id: 8,
    name: "Blackbox AI",
    description: "AI coding assistant for developers with code completion.",
    url: "https://www.blackbox.ai/",
    provider: "Blackbox",
    tags: ["Code", "Development"],
    color: "from-gray-400 to-slate-400",
    icon: Code
  },
  {
    id: 9,
    name: "DeepAI",
    description: "Free AI tools for text generation, images, and more.",
    url: "https://deepai.org/",
    provider: "DeepAI",
    tags: ["Text", "Images", "Free"],
    color: "from-teal-400 to-green-400",
    icon: Sparkles
  },
  {
    id: 10,
    name: "Gamma",
    description: "AI tool to create beautiful, modern presentations instantly.",
    url: "https://gamma.app/",
    provider: "Gamma",
    tags: ["Presentations", "Design"],
    color: "from-violet-400 to-purple-400",
    icon: Star
  },
  {
    id: 11,
    name: "MermaidChart",
    description: "Create flowcharts and diagrams with AI + Mermaid syntax.",
    url: "https://www.mermaidchart.com/",
    provider: "MermaidChart",
    tags: ["Diagrams", "Flowcharts"],
    color: "from-blue-400 to-cyan-400",
    icon: Globe
  },
  {
    id: 12,
    name: "Claude AI",
    description: "Anthropic's Claude with long context & artifacts support.",
    url: "https://claude.ai/new",
    provider: "Anthropic",
    tags: ["Chat", "Long Context"],
    color: "from-orange-400 to-red-400",
    icon: Bot
  },
  {
    id: 13,
    name: "Meta AI",
    description: "Facebook's Meta AI assistant for search & conversational AI.",
    url: "https://www.meta.ai/",
    provider: "Meta",
    tags: ["Chat", "Search"],
    color: "from-blue-400 to-indigo-400",
    icon: Globe
  },
  {
    id: 14,
    name: "Copilot",
    description: "Microsoft's AI Copilot for enhanced productivity.",
    url: "https://copilot.microsoft.com/",
    provider: "Microsoft",
    tags: ["Productivity", "Assistant"],
    color: "from-cyan-400 to-blue-400",
    icon: Zap
  },
  {
    id: 15,
    name: "FinalRound AI",
    description: "AI job interview coach with personalized practice sessions.",
    url: "https://www.finalroundai.com/",
    provider: "FinalRound",
    tags: ["Career", "Interview"],
    color: "from-pink-400 to-rose-400",
    icon: Star
  },
  {
    id: 16,
    name: "Tabnine",
    description: "AI code completion assistant for faster development.",
    url: "https://app.tabnine.com/signin",
    provider: "Tabnine",
    tags: ["Code", "Completion"],
    color: "from-emerald-400 to-teal-400",
    icon: Code
  },
  {
    id: 17,
    name: "Lovable",
    description: "AI that helps you design and ship apps fast with modern tools.",
    url: "https://lovable.dev/",
    provider: "Lovable",
    tags: ["Design", "Development"],
    color: "from-purple-400 to-indigo-400",
    icon: Sparkles
  },
  {
    id: 18,
    name: "Bubble.io",
    description: "No-code platform for building apps with AI assistance.",
    url: "https://bubble.io/",
    provider: "Bubble",
    tags: ["No-Code", "Apps"],
    color: "from-yellow-400 to-pink-400",
    icon: Globe
  },
  {
    id: 19,
    name: "Replit AI",
    description: "AI pair programmer and code completion inside Replit.",
    url: "https://replit.com/",
    provider: "Replit",
    tags: ["Code", "Development"],
    color: "from-orange-400 to-amber-400",
    icon: Code
  },
  {
    id: 20,
    name: "HuggingChat",
    description: "Hugging Face’s free open-source AI chat.",
    url: "https://huggingface.co/chat/",
    provider: "Hugging Face",
    tags: ["Chat"],
    color: "from-pink-400 to-rose-400",
    icon: Bot
  },
  {
    id: 21,
    name: "Runway ML",
    description: "AI-powered video, image, and creative editing.",
    url: "https://runwayml.com/",
    provider: "Runway",
    tags: ["Design"],
    color: "from-teal-400 to-cyan-400",
    icon: Sparkles
  },
  {
    id: 22,
    name: "Synthesia",
    description: "AI video generator with talking avatars.",
    url: "https://www.synthesia.io/",
    provider: "Synthesia",
    tags: ["Design", "Productivity"],
    color: "from-violet-400 to-fuchsia-400",
    icon: Star
  },
  {
    id: 23,
    name: "Notion AI",
    description: "AI assistant inside Notion for docs, tasks, and notes.",
    url: "https://www.notion.so/product/ai",
    provider: "Notion",
    tags: ["Productivity"],
    color: "from-amber-400 to-yellow-400",
    icon: Zap
  },
  {
    id: 24,
    name: "Cohere",
    description: "Enterprise-grade AI language models and embeddings.",
    url: "https://cohere.com/",
    provider: "Cohere",
    tags: ["Development"],
    color: "from-indigo-400 to-purple-400",
    icon: Globe
  },
  {
    id: 25,
    name: "QuillBot",
    description: "AI writing and paraphrasing tool.",
    url: "https://quillbot.com/",
    provider: "QuillBot",
    tags: ["Productivity"],
    color: "from-emerald-400 to-green-400",
    icon: Sparkles
  },
  {
    id: 26,
    name: "Jasper",
    description: "AI content and marketing copy generator.",
    url: "https://www.jasper.ai/",
    provider: "Jasper",
    tags: ["Productivity"],
    color: "from-purple-400 to-fuchsia-400",
    icon: Star
  },
  {
    id: 27,
    name: "Copy.ai",
    description: "AI marketing copy and writing assistant.",
    url: "https://www.copy.ai/",
    provider: "Copy.ai",
    tags: ["Productivity"],
    color: "from-cyan-400 to-blue-400",
    icon: Zap
  },
  {
    id: 28,
    name: "MidJourney",
    description: "AI image generation via Discord.",
    url: "https://www.midjourney.com/",
    provider: "MidJourney",
    tags: ["Design"],
    color: "from-orange-400 to-pink-400",
    icon: Sparkles
  },
  {
    id: 29,
    name: "Stable Diffusion",
    description: "Open-source AI image generator.",
    url: "https://stability.ai/",
    provider: "Stability AI",
    tags: ["Design"],
    color: "from-slate-400 to-gray-400",
    icon: Sparkles
  },
  {
    id: 30,
    name: "Leonardo AI",
    description: "AI-powered art and game asset generation.",
    url: "https://leonardo.ai/",
    provider: "Leonardo",
    tags: ["Design"],
    color: "from-yellow-400 to-amber-400",
    icon: Sparkles
  },
  {
    id: 31,
    name: "Durable AI",
    description: "AI website builder in 30 seconds.",
    url: "https://durable.co/",
    provider: "Durable",
    tags: ["Productivity"],
    color: "from-green-400 to-teal-400",
    icon: Globe
  },
  {
    id: 32,
    name: "Character.AI",
    description: "Chat with custom AI characters.",
    url: "https://beta.character.ai/",
    provider: "Character.AI",
    tags: ["Chat"],
    color: "from-red-400 to-pink-400",
    icon: Bot
  },
  {
    id: 33,
    name: "Kreateable",
    description: "AI logo and branding design.",
    url: "https://kreateable.com/",
    provider: "Kreateable",
    tags: ["Design"],
    color: "from-blue-400 to-indigo-400",
    icon: Sparkles
  },
  {
    id: 34,
    name: "Writesonic",
    description: "AI article & content writer with SEO focus.",
    url: "https://writesonic.com/",
    provider: "Writesonic",
    tags: ["Productivity"],
    color: "from-sky-400 to-blue-400",
    icon: Star
  },
  {
    id: 35,
    name: "Descript",
    description: "AI podcast, video, and audio editing.",
    url: "https://www.descript.com/",
    provider: "Descript",
    tags: ["Design"],
    color: "from-teal-400 to-emerald-400",
    icon: Sparkles
  },
  {
    id: 36,
    name: "Luma AI",
    description: "AI for 3D model generation and photorealistic scenes.",
    url: "https://lumalabs.ai/",
    provider: "Luma",
    tags: ["Design"],
    color: "from-indigo-400 to-purple-400",
    icon: Sparkles
  },
  {
    id: 37,
    name: "Podcastle",
    description: "AI podcast creation and voice tools.",
    url: "https://podcastle.ai/",
    provider: "Podcastle",
    tags: ["Productivity"],
    color: "from-rose-400 to-pink-400",
    icon: Star
  },
  {
    id: 38,
    name: "HeyGen",
    description: "AI avatar and video generation platform.",
    url: "https://heygen.com/",
    provider: "HeyGen",
    tags: ["Design"],
    color: "from-yellow-400 to-orange-400",
    icon: Star
  },
  {
    id: 39,
    name: "Play.ht",
    description: "AI voice generation and text-to-speech.",
    url: "https://play.ht/",
    provider: "Play.ht",
    tags: ["Productivity"],
    color: "from-emerald-400 to-cyan-400",
    icon: Sparkles
  },
  {
    id: 40,
    name: "Soundraw",
    description: "AI music generator for creators.",
    url: "https://soundraw.io/",
    provider: "Soundraw",
    tags: ["Design"],
    color: "from-green-400 to-lime-400",
    icon: Sparkles
  },
  {
    "id": 41,
    "name": "Suno",
    "description": "AI music generator — turn lyrics or text prompts into full songs quickly.",
    "url": "https://suno.com/",
    "provider": "Suno",
    "tags": ["Music", "Audio", "Creative"],
    "color": "from-purple-400 to-indigo-400",
    "icon": "MusicNote"
  },
  {
    "id": 42,
    "name": "Soundful",
    "description": "Generative-AI background music / royalty-free music maker — good for videos, streams, content creators.",
    "url": "https://soundful.com/",
    "provider": "Soundful",
    "tags": ["Music", "Audio", "Content Creation"],
    "color": "from-blue-400 to-teal-400",
    "icon": "Headphones"
  },
  {
    "id": 45,
    "name": "Surfer SEO",
    "description": "AI-powered content optimization & SEO assistant — helps structure and optimize written content for search engines.",
    "url": "https://surferseo.com/",
    "provider": "Surfer",
    "tags": ["SEO", "Content", "Marketing"],
    "color": "from-green-400 to-emerald-400",
    "icon": "GlobeAlt"
  },
  {
    "id": 47,
    "name": "Midjourney",
    "description": "AI-based image / art generator — create images from text prompts for creative projects.",
    "url": "https://www.midjourney.com/",
    "provider": "Midjourney",
    "tags": ["Design", "Image", "Art"],
    "color": "from-violet-400 to-purple-600",
    "icon": "Photograph"
  },
  {
    "id": 48,
    "name": "Runway",
    "description": "AI video & creative-media tool — for video editing, generation, creative content production.",
    "url": "https://runway.com/",
    "provider": "Runway",
    "tags": ["Video", "Content Creation", "Media"],
    "color": "from-red-400 to-pink-600",
    "icon": "VideoCamera"
  },
  {
    "id": 49,
    "name": "AIVA",
    "description": "AI composer — generate music in multiple styles instantly, usable for background scores or songs.",
    "url": "https://www.aiva.ai/",
    "provider": "AIVA",
    "tags": ["Music", "Audio", "Creative"],
    "color": "from-indigo-400 to-blue-600",
    "icon": "MusicNote"
  },
  {
    "id": 50,
    "name": "ElevenLabs",
    "description": "AI voice & speech generation — realistic, expressive voice synthesis useful for narration, content voiceovers, podcasts.",
    "url": "https://elevenlabs.io/",
    "provider": "ElevenLabs",
    "tags": ["Audio", "Voice", "Content Creation"],
    "color": "from-teal-400 to-cyan-600",
    "icon": "Microphone"
  },
  {
    "id": 51,
    "name": "LMArena.ai",
    "description": "Community-driven public arena comparing large language models (LLMs) — let users battle models and vote on best answer; live leaderboard across text, image, code, multimodal models.",
    "url": "https://lmarena.ai/",
    "provider": "LMArena",
    "tags": ["AI Research", "Benchmarking", "Models", "Evaluation"],
    "color": "from-blue-400 to-indigo-400",
    "icon": "GlobeAlt"
  },
  {
    "id": 52,
    "name": "GetMulti.ai",
    "description": "Platform to run and compare 400+ AI models side-by-side — get multiple model answers for the same prompt and choose what works best.",
    "url": "https://getmulti.ai/",
    "provider": "GetMulti",
    "tags": ["Multi-model", "AI Chat", "Comparison", "Productivity"],
    "color": "from-blue-400 to-purple-400",
    "icon": "Sparkles"
  }
];

const AiModel = () => {
  const { state } = useGlobalState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState(false);

  const categories = ['All', 'Chat', 'Code', 'Design', 'Search', 'Development', 'Productivity'];

  const filteredTools = aiTools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });



  return (
    <div className={`relative h-full min-h-full overflow-hidden ${state.darkMode ? 'text-white bg-gradient-to-br via-purple-900 from-slate-900 to-slate-900' : 'text-gray-900 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'}`}>
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r animate-pulse from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-0 rounded-full left-1/4 w-96 h-96 blur-3xl animate-bounce bg-blue-500/5"></div>
        <div className="absolute bottom-0 delay-1000 rounded-full right-1/4 w-96 h-96 blur-3xl animate-bounce bg-purple-500/5"></div>
      </div>




      {/* Hero Section */}
      <section className="relative z-10 py-6">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-6 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 md:text-7xl">
              🚀 AI Universe
            </h2>
            <p className={`max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Discover the most powerful AI tools shaping the future. From coding assistants to creative platforms, explore the cutting-edge of artificial intelligence.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-4 top-1/2" />
                <input
                  type="text"
                  placeholder="Search AI tools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-4 ${state.darkMode ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500'} transition-all duration-300 border rounded-xl backdrop-blur-sm bg-white/10 border-white/20 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-white shadow-lg'
                      : state.darkMode
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div >
      </section >

      {/* AI Tools Grid */}
      < main className="relative z-10 py-6" >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="relative p-6 transition-all duration-500 border bg-gradient-to-br rounded-2xl backdrop-blur-xl group from-white/10 to-white/5 border-white/20 hover:border-cyan-400/50 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                >
                  {/* Glowing Border Effect */}
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r rounded-2xl blur-xl from-cyan-400/20 to-purple-400/20 group-hover:opacity-100"></div>

                  <div className="relative z-10">
                    {/* Tool Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${tool.color} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 text-xs text-gray-400 rounded-full bg-white/10">
                          {tool.provider}
                        </span>
                      </div>
                    </div>

                    {/* Tool Info */}
                    <h3 className={`mb-3 text-xl font-bold transition-colors duration-300 group-hover:text-cyan-400 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {tool.name}
                    </h3>
                    <p className={`mb-4 text-sm leading-relaxed ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {tool.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs ${state.darkMode ? 'text-gray-300' : 'text-gray-600'} border rounded-full bg-white/10 border-white/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 space-x-2 font-medium text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl hover:from-cyan-500 hover:to-purple-600 group-hover:scale-105 hover:shadow-cyan-500/25"
                    >
                      <span>Explore Tool</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* No Results */}
          {
            filteredTools.length === 0 && (
              <div className="py-20 text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-gray-400 to-gray-600">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-gray-400">No tools found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
}

export default AiModel;