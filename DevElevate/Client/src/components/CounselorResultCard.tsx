import React from 'react';

interface CounselorResultCardProps {
  role: string;
  match: string;
}

const CounselorResultCard: React.FC<CounselorResultCardProps> = ({ role, match }) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white dark:bg-gray-700 transform hover:-translate-y-1 transition-transform duration-300">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{role}</h3>
      <p className="text-lg mt-2 text-gray-600 dark:text-gray-300">
        Skill Match: <span className="font-extrabold text-green-500">{match}</span>
      </p>
    </div>
  );
};

export default CounselorResultCard;