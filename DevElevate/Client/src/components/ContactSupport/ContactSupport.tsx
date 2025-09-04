import React, { useState } from 'react';
import { useGlobalState } from '../../contexts/GlobalContext';

const ContactSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { state } = useGlobalState();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Your message has been sent! We will get back to you shortly.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div className={`container mx-auto p-6 ${state.darkMode ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`text-3xl font-bold mb-6 ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>Contact Support</h1>
      <div className={`${state.darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-700'} shadow-md rounded-lg p-6`}>
        <p className="mb-4">Please fill out the form below to get in touch with our support team. We aim to respond within 24-48 hours.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className={`block text-sm font-bold mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${state.darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={`block text-sm font-bold mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${state.darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="subject" className={`block text-sm font-bold mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${state.darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}
              required
            />
          </div>
          <div>
            <label htmlFor="message" className={`block text-sm font-bold mb-2 ${state.darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={`shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline ${state.darkMode ? 'bg-gray-700 text-gray-300 border-gray-600' : 'text-gray-700 border-gray-300'}`}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactSupport;