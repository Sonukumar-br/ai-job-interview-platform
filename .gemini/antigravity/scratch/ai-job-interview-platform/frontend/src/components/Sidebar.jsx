import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlayCircle, History, FileText, Target, Sparkles } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <Sparkles size={24} color="#8b5cf6" />
        <span>InterviewAI</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/interview" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <PlayCircle size={20} />
          <span>Mock Interview</span>
        </NavLink>

        <NavLink to="/history" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <History size={20} />
          <span>Interview History</span>
        </NavLink>

        <NavLink to="/resume-analyzer" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={20} />
          <span>Resume Analyzer</span>
        </NavLink>

        <NavLink to="/job-matcher" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Target size={20} />
          <span>Job Matcher</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
