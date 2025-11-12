import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, X as FiX } from 'lucide-react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import axios from 'axios';

// TypeScript interfaces
interface Experience {
  name: string;
  designation: string;
  avatar?: string;
  feedback: string;
  rating: number;
}

interface Testimonial {
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

interface ApiResponse {
  success: boolean;
  data: Experience[];
  message?: string;
}

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [userExperiences, setUserExperiences] = useState<Testimonial[]>([]);
  const scrollRef = useRef(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    designation: '',
    rating: 0,
    likedMost: '',
    howHelped: '',
    feedback: '',
    canShow: false,
    displayPreference: 'anonymous',
  });

  // Static testimonials
  const staticTestimonials: Testimonial[] = [
    {
      name: 'Sarah Chen',
      role: 'Software Engineer at Google',
      image:
        'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'DevElevate transformed my career. The AI study buddy helped me master DSA, and I landed my dream job at Google within 6 months!',
      rating: 5,
    },
    {
      name: 'Alex Rodriguez',
      role: 'Full Stack Developer at Microsoft',
      image:
        'https://images.pexels.com/photos/3777946/pexels-photo-3777946.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The personalized learning paths and mock interviews were game-changers. DevElevate made complex concepts accessible and fun.',
      rating: 5,
    },
    {
      name: 'Priya Sharma',
      role: 'ML Engineer at Tesla',
      image:
        'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The AI/ML curriculum is outstanding. Hands-on projects and real-world applications helped me transition from web dev to ML.',
      rating: 5,
    },
    {
      name: 'Michael Brown',
      role: 'Backend Developer at Amazon',
      image:
        'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'DevElevate’s system design modules and mentorship sessions were key to cracking Amazon’s rigorous interview process.',
      rating: 4,
    },
    {
      name: 'Emily Davis',
      role: 'Data Scientist at Meta',
      image:
        'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
      content:
        'The AI-driven analytics and practice problems boosted my confidence. I went from beginner to data scientist in under a year!',
      rating: 5,
    },
  ];

  // Fetch approved experiences function (reusable)
  const fetchApprovedExperiences = useCallback(async () => {
    try {
      const response = await axios.get<ApiResponse>(`${API_URL}/api/v1/experience/approved`);
      if (response.data.success) {
        // Transform API data to match testimonial format
        const transformedExperiences: Testimonial[] = response.data.data.map((exp: Experience) => ({
          name: exp.name,
          role: exp.designation,
          image: exp.avatar || 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=400',
          content: exp.feedback,
          rating: exp.rating,
        }));
        setUserExperiences(transformedExperiences);
      }
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    }
  }, [API_URL]);

  // Fetch approved experiences on component mount
  useEffect(() => {
    fetchApprovedExperiences();
  }, [fetchApprovedExperiences]);

  // Merge user experiences first (so they appear at the beginning), then static testimonials
  const testimonials = [...userExperiences, ...staticTestimonials];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);

    // Client-side validation
    if (!formData.name.trim()) {
      setSubmitError('Please enter your name');
      return;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      setSubmitError('Please enter a valid email address');
      return;
    }

    if (!formData.designation.trim()) {
      setSubmitError('Please enter your designation');
      return;
    }

    if (formData.rating === 0) {
      setSubmitError('Please select a rating');
      return;
    }

    if (!formData.likedMost.trim() || !formData.howHelped.trim() || !formData.feedback.trim()) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>(`${API_URL}/api/v1/experience/submit`, formData);
      
      if (response.data.success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          designation: '',
          rating: 0,
          likedMost: '',
          howHelped: '',
          feedback: '',
          canShow: false,
          displayPreference: 'anonymous',
        });
        
        // Re-fetch experiences to update the list (in case of auto-approval or for future updates)
        fetchApprovedExperiences();
        
        // Close modal after showing success message
        setTimeout(() => {
          setIsModalOpen(false);
          setSubmitSuccess(false);
        }, 2500);
      }
    } catch (error) {
      let errorMessage = 'Failed to submit experience. Please try again.';
      
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-950">
      <div className="relative z-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
              Success Stories
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-400">
            Discover how <span className="font-semibold text-blue-400">DevElevate</span> empowered developers to achieve their dream careers
          </p>
        </motion.div>

        {/* Testimonials Container */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              key={testimonials.length} // Force re-render when testimonials count changes
              ref={scrollRef}
              className="flex gap-8"
              animate={{
                x: isPaused ? 0 : ['0%', '-50%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 30,
                  ease: 'linear',
                },
              }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {[...testimonials, ...testimonials].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative flex-shrink-0 w-full p-8 transition-all duration-500 border rounded-2xl backdrop-blur-md group sm:w-80 md:w-96 bg-black/60 border-white/10 hover:border-blue-500/40"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0, 102, 255, 0.2)' }}
                  role="article"
                >
                  <Quote className="w-8 h-8 mb-6 text-blue-400" />
                  <div className="flex mb-4 space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                    {[...Array(5 - testimonial.rating)].map((_, i) => (
                      <Star key={i + testimonial.rating} className="w-5 h-5 text-gray-600" />
                    ))}
                  </div>
                  <p className="mb-6 text-base leading-relaxed text-gray-300">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="object-cover w-12 h-12 border-2 rounded-full border-blue-500/30"
                      loading="lazy"
                    />
                    <div>
                      <div className="font-semibold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r rounded-2xl from-blue-500/10 to-pink-500/10 group-hover:opacity-100"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Share Your Story Button */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 rounded-2xl hover:shadow-pink-500/50"
          >
            Share Your Story
          </motion.button>
        </div>

        {/* Call to Action Section */}
        <div className="relative z-10 max-w-5xl mx-auto mt-12 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="p-10 border shadow-2xl md:p-14 bg-black/50 backdrop-blur-md border-white/10 rounded-3xl"
          >
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-4xl shadow-lg rounded-2xl bg-gradient-to-br from-blue-500 to-pink-500 animate-pulse">
              ⚡
            </div>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Join the{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500">
                DevElevate
              </span>{' '}
              Revolution
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-lg leading-relaxed text-gray-300">
              Be part of a fast-growing community of developers, learners, and innovators.
              Get access to exclusive challenges, leaderboards, and open-source projects — all in one place!
            </p>
            <motion.a
              href="https://forms.gle/QDbb8Tg5Km6CyNHWA"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-blue-600 to-pink-600 hover:from-blue-700 hover:to-pink-700 rounded-2xl hover:shadow-pink-500/50"
            >
              💡 Share Your Feedback
            </motion.a>
            <p className="mt-6 text-sm text-gray-400">
              Let’s build, learn & grow — together with{' '}
              <span className="font-semibold text-blue-400">DevElevate</span>.
            </p>
          </motion.div>
        </div>

        {/* Modal for Testimonial Submission */}
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative backdrop-blur-2xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-950/70 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar border border-white/20 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#94a3b8 transparent',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                <div className="w-full h-full bg-transparent rounded-2xl" />
              </div>
              <div className="relative z-10 w-full h-full">
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close modal"
                  title="Close modal"
                  className="absolute z-20 p-2 transition-colors rounded-full top-4 right-4 hover:bg-gray-800/80 backdrop-blur-sm"
                >
                  <FiX size={20} className="text-gray-200" />
                </button>
                <div className="pt-4 mb-8 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-white">
                    Share Your Experience
                  </h2>
                  <p className="text-gray-300">
                    Help others by sharing how DevElevate helped you in your journey
                  </p>
                </div>

                {/* Success Alert */}
                {submitSuccess && (
                  <div className="p-4 mb-4 text-green-200 bg-green-900/40 border border-green-500/50 rounded-lg backdrop-blur-sm">
                    <p className="font-medium">✅ Success!</p>
                    <p className="text-sm">Thank you! Your experience has been submitted and is pending approval.</p>
                  </div>
                )}

                {/* Error Alert */}
                {submitError && (
                  <div className="p-4 mb-4 text-red-200 bg-red-900/40 border border-red-500/50 rounded-lg backdrop-blur-sm">
                    <p className="font-medium">❌ Error</p>
                    <p className="text-sm">{submitError}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="designation" className="block mb-2 text-sm font-medium text-gray-200">
                      Designation *
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50"
                      placeholder="e.g., Student, Software Engineer, etc."
                    />
                  </div>
                  <div>
                    <label className="block mb-3 text-sm font-medium text-gray-200">
                      Overall Rating *
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                          className="text-2xl transition-all hover:scale-110"
                        >
                          {star <= formData.rating ? (
                            <FaStar className="text-yellow-400" />
                          ) : (
                            <FaRegStar className="text-gray-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label htmlFor="likedMost" className="block mb-2 text-sm font-medium text-gray-200">
                      What did you like most about DevElevate? *
                    </label>
                    <textarea
                      id="likedMost"
                      name="likedMost"
                      value={formData.likedMost}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 resize-vertical custom-scrollbar"
                      placeholder="Share what features or aspects you found most valuable..."
                    />
                  </div>
                  <div>
                    <label htmlFor="howHelped" className="block mb-2 text-sm font-medium text-gray-200">
                      How did DevElevate help you? *
                    </label>
                    <textarea
                      id="howHelped"
                      name="howHelped"
                      value={formData.howHelped}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 resize-vertical custom-scrollbar"
                      placeholder="Share how DevElevate improved your learning journey..."
                    />
                  </div>
                  <div>
                    <label htmlFor="feedback" className="block mb-2 text-sm font-medium text-gray-200">
                      Additional Feedback *
                    </label>
                    <textarea
                      id="feedback"
                      name="feedback"
                      value={formData.feedback}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 text-gray-100 placeholder-gray-400 transition-all border rounded-lg border-gray-600/30 bg-gray-800/40 backdrop-blur-md focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 resize-vertical custom-scrollbar"
                      placeholder="Any additional thoughts, suggestions, or experiences you'd like to share..."
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="canShow"
                      name="canShow"
                      checked={formData.canShow}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-400 rounded bg-gray-800/60 border-gray-600/50 focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
                    />
                    <label htmlFor="canShow" className="text-sm text-gray-200">
                      I allow DevElevate to display this testimonial publicly
                    </label>
                  </div>
                  {formData.canShow && (
                    <div>
                      <label className="block mb-3 text-sm font-medium text-gray-200">
                        If yes, how would you like your feedback to be shown? *
                      </label>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="nameAndDesignation"
                            name="displayPreference"
                            value="nameAndDesignation"
                            checked={formData.displayPreference === 'nameAndDesignation'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-gray-800/60 border-gray-600/50 focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
                          />
                          <label htmlFor="nameAndDesignation" className="ml-2 text-sm text-gray-200">
                            Use my name and designation
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="nameOnly"
                            name="displayPreference"
                            value="nameOnly"
                            checked={formData.displayPreference === 'nameOnly'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-gray-800/60 border-gray-600/50 focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
                          />
                          <label htmlFor="nameOnly" className="ml-2 text-sm text-gray-200">
                            Use my name only
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="anonymous"
                            name="displayPreference"
                            value="anonymous"
                            checked={formData.displayPreference === 'anonymous'}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-blue-400 bg-gray-800/60 border-gray-600/50 focus:ring-blue-400 focus:ring-2 backdrop-blur-sm"
                          />
                          <label htmlFor="anonymous" className="ml-2 text-sm text-gray-200">
                            As anonymous user
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex gap-4 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 px-6 py-3 font-medium text-gray-200 transition-all border rounded-lg border-gray-600/50 bg-gray-800/40 backdrop-blur-md hover:bg-gray-700/60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center flex-1 gap-2 px-6 py-3 font-medium text-white transition-all rounded-lg bg-blue-500/80 hover:bg-blue-500 disabled:bg-blue-500/40 backdrop-blur-md disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="w-4 h-4 mr-2 -ml-1 text-white animate-spin"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Submit Testimonial'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Background Glows */}
        <div className="absolute rounded-full -top-20 left-10 w-72 h-72 bg-blue-500/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 rounded-full right-10 w-72 h-72 bg-pink-500/10 blur-3xl animate-pulse"></div>
      </div>
    </section>
  );
};

export default Testimonials;