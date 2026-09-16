import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-brand">
        AI Job Prep & Mock Interview
      </div>

      <div className="navbar-user">
        {user && (
          <div className="user-badge">
            <div className="user-avatar">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{user.name}</span>
          </div>
        )}

        <button className="btn-logout" onClick={logout} title="Logout">
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <LogOut size={16} /> Logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
