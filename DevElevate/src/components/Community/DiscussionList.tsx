

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDiscussionPosts } from '../../utils/mockDiscussionData';
import { MessageSquare, Tag } from 'lucide-react';

export const DiscussionList: React.FC = () => {
  const navigate = useNavigate();

  const handlePostClick = (id: string) => {
    navigate(`/discussions/${id}`);
  };

  return (
    <div className="space-y-6">
      {mockDiscussionPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => handlePostClick(post.id)}
          className="group block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-1 cursor-pointer"
        >
          {/* Post Header: Metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Posted by {post.author}</span>
            <div className="flex items-center gap-x-4">
              <span>{new Date(post.timestamp).toLocaleDateString()}</span>
              <span className="flex items-center gap-x-1">
                <MessageSquare className="w-4 h-4 text-gray-400" />
                {post.comments.length}
              </span>
            </div>
          </div>

          {/* Post Title */}
          <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {post.title}
          </h2>

          {/* Post Content Snippet */}
          <p className="mt-2 text-gray-600 line-clamp-2">
            {post.content}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
              >
                <Tag className="w-3 h-3 mr-1.5" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscussionList;