import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Zap, Film, BookOpen, Gift, CreditCard, CheckCircle, Sparkles } from 'lucide-react';
import { Modal } from '@/components/shared/Modal';

interface MarvelUnlimitedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: 9.99,
    billing: 'per month',
    features: [
      'Access to 27,000+ digital comics',
      'New comics weekly',
      'Stream on any device',
      'Offline reading'
    ]
  },
  {
    id: 'annual',
    name: 'Annual',
    price: 69,
    billing: 'per year',
    savings: 'Save 42%',
    features: [
      'All Monthly features',
      'Two free collectible figurines',
      'Exclusive digital variants',
      'Member-only events'
    ],
    recommended: true
  }
];

const MarvelUnlimitedModal = ({ isOpen, onClose }: MarvelUnlimitedModalProps) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('annual');
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose} width="max-w-4xl">
      <div 
        className="bg-gradient-to-br from-red-600/30 via-gray-900 to-red-950 rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[url('/images/noise.png')] opacity-20 absolute inset-0 rounded-2xl" />
        <div className="relative p-8 bg-black/50 backdrop-blur-xl rounded-2xl border border-red-500/20 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-4">
              <Shield size={40} className="text-red-500" />
            </motion.div>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-bold bg-gradient-to-br from-white via-red-300 to-red-600 bg-clip-text text-transparent mb-2">
              Marvel Unlimited
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-gray-300">
              Unlimited Access to Marvel's Digital Comics Universe
            </motion.p>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Feature
              icon={<BookOpen className="w-6 h-6" />}
              title="27,000+ Comics"
              description="Access our entire digital library"
            />
            <Feature
              icon={<Zap className="w-6 h-6" />}
              title="New Weekly"
              description="Fresh content every week"
            />
            <Feature
              icon={<Film className="w-6 h-6" />}
              title="Any Device"
              description="Read on all your devices"
            />
            <Feature
              icon={<Gift className="w-6 h-6" />}
              title="Exclusive Content"
              description="Member-only benefits"
            />
          </motion.div>

          {/* Subscription Plans */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                onClick={() => setSelectedPlan(plan.id)}
                className="relative">
                {/* Glow Effect */}
                <AnimatePresence>
                  {selectedPlan === plan.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-800/20 rounded-xl blur-xl"
                    />
                  )}
                </AnimatePresence>
                
                {/* Card Content */}
                <motion.div
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  animate={{
                    scale: selectedPlan === plan.id ? 1 : 0.98,
                    y: selectedPlan === plan.id ? -4 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className={`relative p-6 rounded-xl border backdrop-blur-sm transition-colors duration-300 ${
                    selectedPlan === plan.id
                      ? 'border-red-500 bg-red-500/10 shadow-lg shadow-red-500/20'
                      : 'border-gray-700 bg-gray-900/50'
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}>
                  
                  {/* Sparkle Effect */}
                  <AnimatePresence>
                    {selectedPlan === plan.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ delay: 0.2 }}
                        className="absolute -top-2 -right-2">
                        <Sparkles className="w-5 h-5 text-red-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {plan.recommended && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-3 -right-3 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1 rounded-full shadow-lg">
                      RECOMMENDED
                    </motion.div>
                  )}

                  <motion.div
                    initial={false}
                    animate={{ scale: selectedPlan === plan.id ? 1.05 : 1 }}
                    className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                    <div className="flex items-baseline">
                      <motion.span
                        initial={false}
                        animate={{
                          scale: selectedPlan === plan.id ? 1.1 : 1
                        }}
                        className="text-3xl font-bold text-white">
                        ${plan.price}
                      </motion.span>
                      <span className="text-gray-400 ml-2">{plan.billing}</span>
                    </div>
                    {plan.savings && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-green-400 text-sm mt-1 block">
                        {plan.savings}
                      </motion.span>
                    )}
                  </motion.div>

                  <motion.ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * featureIndex }}
                        className="flex items-center text-gray-300">
                        <motion.div
                          initial={false}
                          animate={{
                            scale: selectedPlan === plan.id ? 1.2 : 1,
                            rotate: selectedPlan === plan.id ? 360 : 0
                          }}
                          transition={{ duration: 0.3 }}
                          className="mr-2">
                          <CheckCircle className="w-5 h-5 text-red-500" />
                        </motion.div>
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Selection Indicator */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: selectedPlan === plan.id ? 1 : 0,
                      scale: selectedPlan === plan.id ? 1 : 0.8
                    }}
                    className="absolute -right-2 -bottom-2 bg-red-500 rounded-full p-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Subscribe Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 rounded-lg text-white font-bold text-lg shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all duration-300"
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}>
              <CreditCard className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                isHoveringCard ? 'rotate-12' : ''
              }`} />
              Subscribe Now
              <motion.div
                className="absolute inset-0 rounded-lg bg-white/20"
                initial={false}
                animate={{
                  opacity: isHoveringCard ? 0.15 : 0
                }}
              />
            </motion.button>
            <p className="text-gray-400 text-sm mt-4">
              Cancel anytime. No commitment required.
            </p>
          </motion.div>
        </div>
      </div>
    </Modal>
  );
};

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    className="text-center p-4 rounded-lg bg-gray-900/50 border border-gray-800"
    style={{ transformStyle: 'preserve-3d' }}>
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="text-red-500 mb-2 flex justify-center">
      {icon}
    </motion.div>
    <h3 className="text-white font-bold mb-1">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
);

export default MarvelUnlimitedModal; 