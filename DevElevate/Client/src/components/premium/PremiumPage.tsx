import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../contexts/GlobalContext';
import { Check, Star, Zap, Shield, Users, Crown, ArrowRight } from 'lucide-react';


const PremiumPage: React.FC = () => {
  const { state } = useGlobalState();
  const navigate = useNavigate();

  

  const pricingPlans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for getting started',
      features: [
        'Basic learning resources',
        'Limited AI assistance',
        'Community access',
        'Basic resume templates',
        '5 placement practice tests'
      ],
      limitations: [
        'Limited daily AI queries',
        'Basic templates only',
        'No priority support'
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'secondary',
      popular: false
    },
    {
      name: 'Pro',
      price: { monthly: 19, yearly: 190 },
      description: 'For serious developers',
      features: [
        'Unlimited AI assistance',
        'Premium learning content',
        'Advanced resume builder',
        'Unlimited practice tests',
        'Priority support',
        'Custom study plans',
        'Interview preparation',
        'Code review assistance'
      ],
      limitations: [],
      buttonText: 'Upgrade Now',
      buttonVariant: 'primary',
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 49, yearly: 490 },
      description: 'For teams and organizations',
      features: [
        'Everything in Pro',
        'Team collaboration tools',
        'Advanced analytics',
        'Custom integrations',
        'Dedicated account manager',
        'White-label solutions',
        'API access',
        'Custom branding'
      ],
      limitations: [],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      popular: false
    }
  ];

  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'yearly'>('monthly');

  const handleUpgrade = (planName: string) => {
    if (planName === 'Pro') {
      // Navigate to payment page
      navigate('/payment');
    } else if (planName === 'Enterprise') {
      // For enterprise, open contact sales
      window.open('mailto:sales@develevate.com?subject=Enterprise Plan Inquiry', '_blank');
    }
  };
  // for dyanmic page title
            useEffect(()=>{
              document.title='DevElevate-Premium'
            },[])

  const featureComparison = [
    { feature: 'Learning Resources', free: 'Basic', pro: 'Unlimited', enterprise: 'Unlimited + Custom' },
    { feature: 'AI Assistance', free: '10/day', pro: 'Unlimited', enterprise: 'Unlimited + Priority' },
    { feature: 'Resume Templates', free: '3 Basic', pro: '50+ Premium', enterprise: 'Custom Templates' },
    { feature: 'Practice Tests', free: '5/month', pro: 'Unlimited', enterprise: 'Unlimited + Custom' },
    { feature: 'Support', free: 'Community', pro: 'Priority Email', enterprise: 'Dedicated Manager' },
    { feature: 'Team Collaboration', free: '✗', pro: '✗', enterprise: '✓' },
    { feature: 'Analytics', free: 'Basic', pro: 'Advanced', enterprise: 'Custom Dashboard' },
    { feature: 'API Access', free: '✗', pro: '✗', enterprise: '✓' }
  ];

  const benefits = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Accelerated Learning',
      description: 'AI-powered personalized learning paths that adapt to your progress and goals.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Interview Confidence',
      description: 'Comprehensive interview preparation with real-world coding challenges.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Access',
      description: 'Connect with fellow developers and industry mentors for guidance.'
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: 'Premium Content',
      description: 'Access exclusive courses, workshops, and industry insights.'
    }
  ];

  return (
    <div
    className={`min-h-screen ${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Elevate Your <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Development Journey</span>
          </h1>
          <p className={`text-xl ${state.darkMode ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Unlock premium features, unlimited AI assistance, and accelerate your path to becoming a top-tier developer.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className={`p-6 rounded-xl ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  {benefit.icon}
                </div>
              </div>
              <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                {benefit.title}
              </h3>
              <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex p-1 rounded-lg ${state.darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : state.darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === 'yearly'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : state.darkMode
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-2xl border-2 transition-all hover:scale-105 ${
                plan.popular
                  ? 'border-blue-500 bg-gradient-to-b '
                  : state.darkMode
                  ? 'border-gray-700 bg-gray-800'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className={`text-2xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {plan.name}
                </h3>
                <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center">
                  <span className={`text-5xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                    ${plan.price[billingCycle]}
                  </span>
                  <span className={`text-lg ${state.darkMode ? 'text-gray-300' : 'text-gray-600'} ml-2`}>
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                </div>
                {billingCycle === 'yearly' && plan.price.yearly > 0 && (
                  <p className="text-green-500 text-sm mt-2">
                    Save ${(plan.price.monthly * 12) - plan.price.yearly} per year
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3" />
                    <span className={`${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleUpgrade(plan.name)}
                disabled={plan.buttonVariant === 'secondary'}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                  plan.buttonVariant === 'primary'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                    : plan.buttonVariant === 'secondary'
                    ? state.darkMode
                      ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
                      : 'bg-gray-100 text-gray-600 cursor-not-allowed'
                    : state.darkMode
                    ? 'border-2 border-gray-600 text-gray-300 hover:border-gray-500'
                    : 'border-2 border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {plan.buttonText}
                {plan.buttonVariant !== 'secondary' && (
                  <ArrowRight className="w-4 h-4 ml-2" />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
            Feature Comparison
          </h2>
          <div className={`rounded-xl border ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} overflow-hidden`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={`${state.darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <tr>
                    <th className={`px-6 py-4 text-left font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Features
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Free
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Pro
                    </th>
                    <th className={`px-6 py-4 text-center font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <tr key={index} className={`border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      <td className={`px-6 py-4 font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {row.feature}
                      </td>
                      <td className={`px-6 py-4 text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.free}
                      </td>
                      <td className={`px-6 py-4 text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.pro}
                      </td>
                      <td className={`px-6 py-4 text-center ${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`rounded-2xl p-12 text-center ${state.darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
          <h2 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
            Ready to Level Up Your Skills?
          </h2>
          <p className={`text-xl ${state.darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8 max-w-2xl mx-auto`}>
            Join thousands of developers who have accelerated their careers with DevElevate Pro.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/payment')}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center"
            >
              Start Free Trial
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
            <button
              onClick={() => window.open('mailto:sales@develevate.com?subject=Enterprise Plan Inquiry', '_blank')}
              className={`px-8 py-3 rounded-lg font-medium border-2 transition-all ${
                state.darkMode
                  ? 'border-gray-600 text-gray-300 hover:border-gray-500'
                  : 'border-gray-300 text-gray-600 hover:border-gray-400'
              }`}
            >
              Contact Sales
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className={`text-3xl font-bold ${state.darkMode ? 'text-white' : 'text-gray-900'} text-center mb-8`}>
            Frequently Asked Questions
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I upgrade or downgrade my plan anytime?",
                answer: "Yes, you can change your plan at any time. Changes take effect immediately and billing is prorated."
              },
              {
                question: "Is there a free trial for Pro features?",
                answer: "Yes, we offer a 7-day free trial for all Pro features. No credit card required to start."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for annual plans."
              },
              {
                question: "Do you offer student discounts?",
                answer: "Yes, students get 50% off on Pro plans with valid student ID verification."
              }
            ].map((faq, index) => (
              <div key={index} className={`p-6 rounded-xl ${state.darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border`}>
                <h3 className={`text-lg font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'} mb-3`}>
                  {faq.question}
                </h3>
                <p className={`${state.darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
