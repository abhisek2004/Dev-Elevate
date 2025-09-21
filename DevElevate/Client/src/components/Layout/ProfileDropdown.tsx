import React, { useRef, useEffect } from 'react';
import { User,  LogOut,  Crown, Shield, Moon, Sun, HelpCircle,  } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useGlobalState } from '../../contexts/GlobalContext';
import {  useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen, onClose }) => {
  const { state: authState, logout } = useAuth();
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  type MenuItem = {
    icon: React.ElementType;
    label: string;
    action: () => void | Promise<void> | Window | null;
    highlight?: boolean;
  };

  type MenuSection = {
    section: string;
    items: MenuItem[];
  };

  const menuItems: MenuSection[] = [
    {
      section: 'Account',
      items: [
        { icon: User, label: 'View Profile', action: () => navigate('/profile') },
      ]
    },
    {
      section: 'Premium',
      items: [
        { icon: Crown, label: 'Upgrade to Pro', action: () => navigate('/premium'), highlight: true },
      ]
    },
    {
      section: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', action: () => navigate('/help-center') },
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={`absolute right-0 top-full mt-2 w-80 ${
        state.darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border rounded-xl shadow-2xl z-50 overflow-hidden fancy`}
    >
      {/* User Info Header */}
      <div className={`p-4 border-b ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <img
              src={authState.user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(authState.user?.name || 'User')}&background=3b82f6&color=fff`}
              alt={authState.user?.name}
              className="w-12 h-12 border-2 border-blue-500 rounded-full"
            />
            <div className="absolute w-4 h-4 bg-green-500 border-2 border-white rounded-full -right-1 -bottom-1 dark:border-gray-900"></div>
          </div>
          <div className="flex-1">
            <h3 className={`font-semibold ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
              {authState.user?.name || 'Guest User'}
            </h3>
            <p className={`text-sm ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {authState.user?.email || 'guest@example.com'}
            </p>
            <div className="flex items-center mt-1 space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                state.darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-700'
              }`}>
                {authState.user?.progress.level || 'Beginner'}
              </span>
              <span className={`text-xs ${state.darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {authState.user?.progress.totalPoints || 0} points
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
  

      {/* Menu Items */}
      <div className="overflow-y-auto max-h-80">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className={`${sectionIndex > 0 ? `border-t ${state.darkMode ? 'border-gray-700' : 'border-gray-200'}` : ''}`}>
            <div className={`px-4 py-2 text-xs font-medium uppercase tracking-wider ${
              state.darkMode ? 'text-gray-400 bg-gray-800' : 'text-gray-500 bg-gray-50'
            }`}>
              {section.section}
            </div>
            <div className="py-1">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <button
                    key={itemIndex}
                    onClick={() => {
                      item.action();
                      onClose();
                    }}
                    className={`w-full px-4 py-3 flex items-center space-x-3 text-left transition-colors ${
                      item.highlight
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700'
                        : state.darkMode
                        ? 'hover:bg-gray-800 text-gray-300'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${item.highlight ? 'text-white' : 'text-gray-400'}`} />
                    <span className={`font-medium ${item.highlight ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                    {item.highlight && (
                      <span className="px-2 py-1 ml-auto text-xs rounded-full bg-white/20">
                        New
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Theme Toggle & Logout */}
      <div className={`p-4 border-t ${state.darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
        <div className="flex items-center justify-between mb-3">
          <span className={`text-sm font-medium ${state.darkMode ? 'text-white' : 'text-gray-900'}`}>
            Theme
          </span>
          <button
            onClick={toggleDarkMode}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
              state.darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {state.darkMode ? (
              <>
                <Sun className="w-4 h-4" />
                <span className="text-sm">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="text-sm">Dark</span>
              </>
            )}
          </button>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center justify-center w-full px-4 py-2 space-x-2 text-white transition-colors bg-red-500 rounded-lg hover:bg-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Footer */}
      <div className={`px-4 py-2 text-center text-xs ${state.darkMode ? 'text-gray-500 bg-gray-900' : 'text-gray-400 bg-gray-50'}`}>
        DevElevate v1.0 • Made with ❤️
      </div>
    </div>
  );
};

export default ProfileDropdown;