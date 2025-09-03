import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Zap, Trophy, Users, ArrowRight, Play, Star, GitBranch } from 'lucide-react';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Code2,
      title: 'Multi-Language Support',
      description: 'Practice with C, C++, Java, Python, JavaScript, SQL, HTML, CSS, and React',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'AI-Powered Hints',
      description: 'Get intelligent hints and code reviews powered by advanced AI',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Trophy,
      title: 'Competitive Programming',
      description: 'Join contests and climb the leaderboard with other developers',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Learn from community solutions and share your own approaches',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const stats = [
    { value: '500K+', label: 'Active Users' },
    { value: '2K+', label: 'Problems' },
    { value: '15M+', label: 'Solutions' },
    { value: '99.9%', label: 'Uptime' }
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl bg-electric-400/20"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl bg-neon-500/20"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 bg-cyber-400/10"></div>
        </div>

        <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="mb-6 text-5xl font-bold text-white md:text-7xl">
                Master
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-neon-500"> Coding</span>
                <br />
                Shape the Future
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">
                Join millions of developers on DevElevate - the most advanced platform for coding practice,
                competitive programming, and skill development.
              </p>
              <div className="flex flex-col gap-4 justify-center items-center sm:flex-row">
                <Link
                  to="/coding/problems"
                  className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r rounded-xl shadow-lg transition-all duration-300 transform group from-electric-400 to-neon-500 hover:from-electric-500 hover:to-neon-600 hover:scale-105 hover:shadow-electric-400/50"
                >
                  Start Coding Now
                  <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  to="/coding/problems"
                  className="px-8 py-4 text-lg font-semibold text-white rounded-xl border backdrop-blur-sm transition-all duration-300 bg-white/10 hover:bg-white/20 border-white/20"
                >
                  <Play className="inline-block mr-2 w-5 h-5" />
                  Explore Problems
                </Link>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16"
          >
            <div className="p-8 rounded-2xl border border-gray-700 backdrop-blur-sm bg-gray-800/50">
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-1 text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-800/30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-4xl font-bold text-white">
                Why Choose DevElevate?
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-gray-400">
                Experience the future of coding education with our cutting-edge platform
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group"
              >
                <div className="p-6 h-full rounded-2xl border border-gray-700 backdrop-blur-sm transition-all duration-300 bg-gray-800/50 hover:border-gray-600">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="py-24">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-4xl font-bold text-white">
                Code with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-400 to-neon-500"> Confidence</span>
              </h2>
              <p className="mb-8 text-xl text-gray-400">
                Our advanced code editor supports multiple languages with intelligent
                autocomplete, syntax highlighting, and real-time error detection.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Star, text: 'Intelligent code completion' },
                  { icon: GitBranch, text: 'Version control integration' },
                  { icon: Zap, text: 'Lightning-fast execution' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-electric-400/20">
                      <item.icon className="w-4 h-4 text-electric-400" />
                    </div>
                    <span className="text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="overflow-hidden bg-gray-800 rounded-2xl border border-gray-700">
                <div className="flex items-center px-4 py-3 space-x-2 bg-gray-900 border-b border-gray-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-sm text-gray-400">solution.py</div>
                </div>
                <div className="p-4 font-mono text-sm">
                  <div className="text-purple-400">def <span className="text-blue-400">twoSum</span>(<span className="text-orange-400">nums</span>, <span className="text-orange-400">target</span>):</div>
                  <div className="ml-4 text-gray-500"># AI suggests: Use hash map for O(n) solution</div>
                  <div className="ml-4 text-yellow-400">seen = <span className="text-green-400">{}</span></div>
                  <div className="ml-4 text-purple-400">for <span className="text-orange-400">i</span>, <span className="text-orange-400">num</span> <span className="text-purple-400">in</span> <span className="text-blue-400">enumerate</span>(<span className="text-orange-400">nums</span>):</div>
                  <div className="ml-8 text-orange-400">complement = <span className="text-orange-400">target</span> - <span className="text-orange-400">num</span></div>
                  <div className="ml-8 text-purple-400">if <span className="text-orange-400">complement</span> <span className="text-purple-400">in</span> <span className="text-orange-400">seen</span>:</div>
                  <div className="ml-12 text-purple-400">return <span className="text-green-400">[</span><span className="text-orange-400">seen</span><span className="text-green-400">[</span><span className="text-orange-400">complement</span><span className="text-green-400">]</span>, <span className="text-orange-400">i</span><span className="text-green-400">]</span></div>
                  <div className="ml-8 text-orange-400">seen<span className="text-green-400">[</span><span className="text-orange-400">num</span><span className="text-green-400">]</span> = <span className="text-orange-400">i</span></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;