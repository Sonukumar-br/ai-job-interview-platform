import React from 'react';
import { BookOpen, Sparkles } from 'lucide-react';

const TopicsCard = ({ topics, onSelectTopic }) => {
  return (
    <div className="dashboard-widget-card">
      <div className="widget-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <BookOpen size={20} color="#06b6d4" />
          <h3>Interview Topics</h3>
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Popular Domains</span>
      </div>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div key={index} className="topic-chip" onClick={() => onSelectTopic && onSelectTopic(topic)}>
            <div className="topic-chip-content">
              <span className="topic-title">{topic.title}</span>
              <span className="topic-count">{topic.questionCount} Questions</span>
            </div>
            <div className="topic-badge" style={{ background: topic.badgeBg, color: topic.badgeColor }}>
              {topic.level}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsCard;
