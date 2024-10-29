'use client';

import { motion } from 'framer-motion';
import { Layout, Sparkles, Brain } from 'lucide-react';

const features = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Eisenhower Matrix Method",
    description: "Prioritize tasks based on urgency and importance using the proven four-quadrant system"
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI-Powered Organization",
    description: "Let our AI analyze and categorize your tasks automatically"
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Smart Task Management",
    description: "Tag, filter, and organize tasks with an intuitive drag-and-drop interface"
  }
];

const matrixQuadrants = [
  {
    title: "Do First",
    description: "Important & Urgent",
    color: "from-red-500/20 to-red-500/10",
    hoverColor: "group-hover:from-red-500/30 group-hover:to-red-500/20",
    tasks: ["Finish client presentation", "Fix critical bug", "Team meeting"]
  },
  {
    title: "Schedule",
    description: "Important & Not Urgent",
    color: "from-blue-500/20 to-blue-500/10",
    hoverColor: "group-hover:from-blue-500/30 group-hover:to-blue-500/20",
    tasks: ["Strategic planning", "Learn new skills", "Exercise routine"]
  },
  {
    title: "Delegate",
    description: "Not Important & Urgent",
    color: "from-yellow-500/20 to-yellow-500/10",
    hoverColor: "group-hover:from-yellow-500/30 group-hover:to-yellow-500/20",
    tasks: ["Reply to emails", "Schedule meetings", "Review reports"]
  },
  {
    title: "Eliminate",
    description: "Not Important & Not Urgent",
    color: "from-purple-500/20 to-purple-500/10",
    hoverColor: "group-hover:from-purple-500/30 group-hover:to-purple-500/20",
    tasks: ["Social media", "Random meetings", "Excessive planning"]
  }
];

const DemoSection = () => {
  return (
    <div className="relative pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Demo Content */}
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl overflow-hidden">
            {/* Window Header */}
            <div className="p-4 border-b border-white/[0.06]">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                <div className="ml-4 text-white/60 text-sm font-mono">Eisenhower Matrix</div>
              </div>
            </div>

            {/* Matrix Grid */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {matrixQuadrants.map((quadrant, index) => (
                <motion.div
                  key={quadrant.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`
                    group p-4 rounded-lg bg-gradient-to-br ${quadrant.color} 
                    border border-white/[0.06] transition-all duration-300
                    hover:border-white/[0.1] ${quadrant.hoverColor}
                  `}
                >
                  <h4 className="text-white font-medium text-sm mb-1">{quadrant.title}</h4>
                  <p className="text-white/40 text-xs mb-3">{quadrant.description}</p>
                  <div className="space-y-2">
                    {quadrant.tasks.map((task, taskIndex) => (
                      <motion.div
                        key={taskIndex}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 + taskIndex * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center space-x-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                        <span className="text-white/60 text-xs group-hover:text-white/80 transition-colors">
                          {task}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4"
              >
                <div className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.06]">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoSection; 