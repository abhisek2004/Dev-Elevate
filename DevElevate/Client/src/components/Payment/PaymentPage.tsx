import React, { useEffect, useRef, useState } from 'react';
import { CreditCard, Check, Star, Zap, Shield, Users } from 'lucide-react';
import { useGlobalState } from '../../contexts/GlobalContext';
import {motion, useInView} from 'framer-motion'

const PaymentPage: React.FC = () => {
  const { state } = useGlobalState();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>('basic');

  // for animations 
  const ref=useRef(null)
  const inView=useInView(ref, {once:true})

  const categoryContainerVar={
    hidden:{},
    visible:{transition:{staggerChildren:0.2, delayChildren:0.2}}
  }
  const cardVariant={
    hidden:{opacity:0, scale:0.8},
    visible:{opacity:1, scale:1},
    transition:{type:'spring', stiffness:50, damping:5}
  }
   const priceVariant={
    hidden:{opacity:0, x:-12},
    visible:{opacity:1, x:0},
    transition:{type:'spring', stiffness:50, damping:5}
  }

  // for dyanmic page title
        useEffect(()=>{
          document.title='DevElevate-Pricing Plans'
        },[])

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: 19,
      period: 'month',
      description: 'Perfect for getting started with your development journey',
      features: [
        'Access to all learning modules',
        'Resume builder with 3 templates',
        'Basic placement preparation',
        'Email support',
        'Progress tracking',
        'Tech news feed',
      ],
      stripeLink: 'https://buy.stripe.com/test_5kQ28q0yw0mFbN8b0a3F601',
      popular: false,
      icon: <CreditCard className="w-6 h-6" />,
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 190,
      period: 'year',
      description: 'Everything you need to excel in your tech career',
      features: [
        'Everything in Basic Plan',
        'Premium resume templates (10+)',
        'Advanced AI-powered chatbot',
        'Priority support',
        'Interview preparation videos',
        'Coding challenges & solutions',
        'Career mentorship sessions',
        'Job referral network access',
        'Exclusive tech webinars',
        'Project portfolio builder',
      ],
      stripeLink: 'https://buy.stripe.com/test_cNi4gydlib1j8AW8S23F600',
      popular: true,
      icon: <Star className="w-6 h-6" />,
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-5 h-5" />,
      title: 'Accelerated Learning',
      description: 'Structured curriculum designed by industry experts',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Secure Payment',
      description: 'Powered by Stripe for secure and reliable transactions',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Community Access',
      description: 'Join thousands of developers in our growing community',
    },
  ];

  const handlePayment = (plan: typeof plans[0]) => {
    // Redirect to Stripe payment link
    window.open(plan.stripeLink, '_blank');
  };

  return (
    <motion.div
     initial={{opacity:0, y:20}}
     animate={{opacity:1, y:0}}
     transition={{type:'spring', stiffness:50, damping:5}}
    className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${
      state.darkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
          initial={{opacity:0, y:-50}}
          animate={{opacity:1, y:0}}
          transition={{type:'spring', stiffness:50, damping:20}}
          className={`text-4xl md:text-5xl font-bold mb-6 ${
            state.darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Choose Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">DevElevate</span> Plan
          </motion.h1>
          <motion.p
          initial={{opacity:0, y:-50}}
          animate={{opacity:1, y:0}}
          transition={{type:'spring', stiffness:50, damping:5}}
          className={`text-xl max-w-2xl mx-auto ${
            state.darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Unlock your potential with our comprehensive learning platform designed to accelerate your tech career
          </motion.p>
        </div>

        {/* Benefits Section */}
        <motion.div
         ref={ref}
         variants={categoryContainerVar}
         initial='hidden'
         animate={inView? 'visible':'hidden'}
        className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
             variants={cardVariant}
              key={index}
              className={`text-center p-6 rounded-xl ${
                state.darkMode 
                  ? 'bg-gray-800 border border-gray-700' 
                  : 'bg-white border border-gray-200'
              } shadow-sm hover:shadow-md transition-shadow`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4">
                {React.cloneElement(benefit.icon, { className: 'w-5 h-5 text-white' })}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                state.darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {benefit.title}
              </h3>
              <p className={`text-sm ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Pricing Plans */}
        <motion.div 
          ref={ref}
         variants={categoryContainerVar}
         initial='hidden'
         animate={inView? 'visible':'hidden'}
        className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              variants={priceVariant}
              key={plan.id}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-500'
                  : state.darkMode
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              } shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl mb-4">
                  {React.cloneElement(plan.icon, { className: 'w-6 h-6 text-white' })}
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  state.darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${
                  state.darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-5xl font-bold ${
                    state.darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${plan.price}
                  </span>
                  <span className={`text-lg ml-2 ${
                    state.darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    /{plan.period}
                  </span>
                </div>
                {plan.id === 'premium' && (
                  <p className="text-sm text-green-600 dark:text-green-400 mt-2 font-medium">
                    Save $38 with annual billing
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className={`ml-3 text-sm ${
                      state.darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan)}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    : 'bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                Get Started with {plan.name}
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ or Additional Info */}
        <div className="mt-16 text-center">
          <p className={`text-sm ${
            state.darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Secure payments powered by Stripe • Cancel anytime • 30-day money-back guarantee
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <Shield className="w-4 h-4 text-green-500 mr-2" />
              <span className={`text-xs ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                SSL Secured
              </span>
            </div>
            <div className="flex items-center">
              <CreditCard className="w-4 h-4 text-blue-500 mr-2" />
              <span className={`text-xs ${
                state.darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                All Cards Accepted
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentPage;
