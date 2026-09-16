import React, { useState } from 'react';
import { resumeService } from '../services/resumeService';
import { Upload, FileText, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, ThumbsUp, Lightbulb, GraduationCap, Code, FolderGit2, Target, BookOpen, ListOrdered, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TARGET_ROLES = [
  'Java Full Stack Developer',
  'Java Backend Developer',
  'Frontend Developer',
  'Software Engineer'
];

const ResumeAnalyzerPage = () => {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [fileError, setFileError] = useState('');
  
  // UI Status: 'IDLE' | 'ANALYZING_RESUME' | 'ANALYZED' | 'ANALYZING_GAP' | 'GAP_ANALYZED' | 'ERROR'
  const [status, setStatus] = useState('IDLE');
  const [resumeAnalysis, setResumeAnalysis] = useState(null);
  
  // Skill Gap States
  const [selectedTargetRole, setSelectedTargetRole] = useState('Java Full Stack Developer');
  const [skillGapResult, setSkillGapResult] = useState(null);
  const [apiError, setApiError] = useState('');

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    validateAndSetFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.target.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    setFileError('');
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setFileError('Only PDF format (.pdf) files are allowed.');
      setSelectedFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds the 5 MB maximum limit.');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 1. Analyze PDF Resume
  const handleAnalyzeResume = async () => {
    if (!selectedFile) return;

    setStatus('ANALYZING_RESUME');
    setApiError('');
    setResumeAnalysis(null);
    setSkillGapResult(null);

    try {
      const data = await resumeService.analyzeResume(selectedFile);
      setResumeAnalysis(data);
      setStatus('ANALYZED');
    } catch (err) {
      console.error('Failed to analyze resume:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to analyze resume. Please ensure the PDF contains readable text.');
      }
      setStatus('ERROR');
    }
  };

  // 2. Analyze AI Skill Gap
  const handleAnalyzeSkillGap = async () => {
    setStatus('ANALYZING_GAP');
    setApiError('');

    const currentSkills = resumeAnalysis?.skills || ['Java', 'Spring Boot', 'React', 'MySQL'];

    try {
      const gapData = await resumeService.analyzeSkillGap(selectedTargetRole, currentSkills);
      setSkillGapResult(gapData);
      setStatus('GAP_ANALYZED');
    } catch (err) {
      console.error('Failed to perform Skill Gap Analysis:', err);
      if (err.response && err.response.data && err.response.data.message) {
        setApiError(err.response.data.message);
      } else {
        setApiError('Failed to perform Skill Gap Analysis. Please try again.');
      }
      setStatus('ERROR');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setFileError('');
    setResumeAnalysis(null);
    setSkillGapResult(null);
    setApiError('');
    setStatus('IDLE');
  };

  return (
    <div className="interview-page-container">
      {/* Page Header */}
      <div className="interview-page-header">
        <div>
          <h1 className="dashboard-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Sparkles color="#d946ef" size={32} />
            AI Resume & Skill Gap Analyzer
          </h1>
          <p className="dashboard-subtitle">
            Upload your PDF resume for AI parsing, and evaluate your skill gap against target software engineering job roles.
          </p>
        </div>

        {(status === 'ANALYZED' || status === 'GAP_ANALYZED') && (
          <button className="btn-secondary-action" onClick={handleReset}>
            <RefreshCw size={16} /> Analyze Another Resume
          </button>
        )}
      </div>

      {/* STATE 1: IDLE / FILE SELECTION */}
      {status === 'IDLE' && (
        <div className="interview-setup-card">
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '1.5rem' }}>
            Upload PDF Resume (Max 5 MB)
          </h3>

          {fileError && <div className="alert-error">{fileError}</div>}

          {/* File Dropzone */}
          <div
            className="resume-dropzone"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="resume-file-input"
              accept=".pdf,application/pdf"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />

            <label htmlFor="resume-file-input" style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={48} color="#8b5cf6" style={{ marginBottom: '1rem' }} />
              <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '0.4rem' }}>
                Drag & Drop your resume PDF here or <span style={{ color: '#8b5cf6', textDecoration: 'underline' }}>Browse</span>
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Supports text-selectable PDF documents up to 5 MB
              </p>
            </label>
          </div>

          {/* Selected File Badge */}
          {selectedFile && (
            <div className="selected-file-badge">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileText size={24} color="#06b6d4" />
                <div>
                  <div style={{ fontWeight: 700, color: '#fff' }}>{selectedFile.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{formatFileSize(selectedFile.size)}</div>
                </div>
              </div>
              <button
                type="button"
                className="btn-secondary-action"
                style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
                onClick={() => setSelectedFile(null)}
              >
                Remove
              </button>
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1.75rem' }}
            disabled={!selectedFile}
            onClick={handleAnalyzeResume}
          >
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Sparkles size={20} /> Analyze Resume with AI
            </span>
          </button>
        </div>
      )}

      {/* STATE 2: LOADING STATES */}
      {(status === 'ANALYZING_RESUME' || status === 'ANALYZING_GAP') && (
        <div className="interview-loading-card">
          <div className="spinner-glow" />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            {status === 'ANALYZING_GAP' ? 'Analyzing Your Skill Gap with AI...' : 'Analyzing Your Resume with AI...'}
          </h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {status === 'ANALYZING_GAP'
              ? `Comparing candidate skills against industry standard ${selectedTargetRole} requirements.`
              : 'Extracting PDF text, evaluating technical skills, strengths, missing keywords & suggestions.'}
          </p>
        </div>
      )}

      {/* STATE 3: ERROR STATE */}
      {status === 'ERROR' && (
        <div className="interview-error-card">
          <AlertTriangle size={48} color="#f87171" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
            Analysis Failed
          </h3>
          <p style={{ color: '#fca5a5', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '500px' }}>
            {apiError || 'Could not analyze PDF file. Please ensure it is a text-selectable PDF resume.'}
          </p>
          <button className="btn-primary" style={{ width: 'auto', padding: '0.75rem 1.5rem' }} onClick={handleReset}>
            Try Uploading Another PDF
          </button>
        </div>
      )}

      {/* STATE 4 & 5: RESUME ANALYSIS + SKILL GAP RESULTS */}
      {(status === 'ANALYZED' || status === 'GAP_ANALYZED') && resumeAnalysis && (
        <div className="evaluation-results-container">
          {/* Executive Summary Card */}
          <div className="question-prompt-card">
            <div className="question-label" style={{ color: '#d946ef' }}>
              <Sparkles size={18} color="#d946ef" />
              <span>Resume Executive Summary</span>
            </div>
            <p className="question-text" style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.6 }}>
              {resumeAnalysis.summary}
            </p>
          </div>

          {/* Technical Skills Section */}
          <div className="dashboard-widget-card">
            <div className="eval-card-header">
              <Code size={20} color="#06b6d4" />
              <h4 style={{ color: '#06b6d4' }}>Technical Skills Found in Resume</h4>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.75rem' }}>
              {resumeAnalysis.skills && resumeAnalysis.skills.length > 0 ? (
                resumeAnalysis.skills.map((skill, idx) => (
                  <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#22d3ee', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '0.4rem 0.85rem', fontSize: '0.9rem' }}>
                    <CheckCircle2 size={14} style={{ display: 'inline', marginRight: '0.35rem' }} /> {skill}
                  </span>
                ))
              ) : (
                <span style={{ color: 'var(--text-muted)' }}>No explicit skills detected in resume.</span>
              )}
            </div>
          </div>

          {/* Strengths & Missing Resume Keywords */}
          <div className="evaluation-details-grid">
            <div className="eval-detail-card strengths">
              <div className="eval-card-header">
                <ThumbsUp size={20} color="#4ade80" />
                <h4 style={{ color: '#4ade80' }}>Strengths</h4>
              </div>
              <ul className="eval-list">
                {resumeAnalysis.strengths && resumeAnalysis.strengths.map((str, idx) => (
                  <li key={idx}><span className="check-icon">✓</span> {str}</li>
                ))}
              </ul>
            </div>

            <div className="eval-detail-card improvements">
              <div className="eval-card-header">
                <AlertTriangle size={20} color="#facc15" />
                <h4 style={{ color: '#facc15' }}>Missing Skills (General)</h4>
              </div>
              <ul className="eval-list">
                {resumeAnalysis.missingSkills && resumeAnalysis.missingSkills.map((ms, idx) => (
                  <li key={idx}><span className="bullet-icon" style={{ color: '#facc15' }}>⚠</span> {ms}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Projects & Education */}
          <div className="evaluation-details-grid">
            <div className="eval-detail-card" style={{ border: '1px solid rgba(99, 102, 241, 0.3)' }}>
              <div className="eval-card-header">
                <FolderGit2 size={20} color="#818cf8" />
                <h4 style={{ color: '#818cf8' }}>Projects</h4>
              </div>
              <ul className="eval-list">
                {resumeAnalysis.projects && resumeAnalysis.projects.map((proj, idx) => (
                  <li key={idx}><span style={{ color: '#818cf8' }}>•</span> {proj}</li>
                ))}
              </ul>
            </div>

            <div className="eval-detail-card" style={{ border: '1px solid rgba(168, 85, 247, 0.3)' }}>
              <div className="eval-card-header">
                <GraduationCap size={20} color="#c084fc" />
                <h4 style={{ color: '#c084fc' }}>Education</h4>
              </div>
              <ul className="eval-list">
                {resumeAnalysis.education && resumeAnalysis.education.map((edu, idx) => (
                  <li key={idx}><span style={{ color: '#c084fc' }}>•</span> {edu}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resume Improvement Suggestions */}
          <div className="ideal-answer-card">
            <div className="ideal-header" style={{ color: '#facc15' }}>
              <Lightbulb size={20} color="#facc15" />
              <span>Resume Suggestions</span>
            </div>
            <ul className="eval-list">
              {resumeAnalysis.suggestions && resumeAnalysis.suggestions.map((sug, idx) => (
                <li key={idx}><span style={{ fontWeight: 700, color: '#facc15' }}>{idx + 1}.</span> {sug}</li>
              ))}
            </ul>
          </div>

          {/* ========================================================================== */}
          {/* PART B — TARGET JOB ROLE SKILL GAP ANALYSIS CONTROLS & WIDGET */}
          {/* ========================================================================== */}
          <div className="dashboard-widget-card" style={{ marginTop: '1.5rem', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <Target size={24} color="#6366f1" />
              <h3 style={{ fontSize: '1.25rem', color: '#fff', margin: 0 }}>Target Job Role Skill Gap Analysis</h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Select a target software engineering job role to evaluate how well your resume matches industry hiring requirements.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <select
                  className="form-input"
                  style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '0.85rem 1rem', fontSize: '1rem', cursor: 'pointer' }}
                  value={selectedTargetRole}
                  onChange={(e) => setSelectedTargetRole(e.target.value)}
                >
                  {TARGET_ROLES.map((role) => (
                    <option key={role} value={role} style={{ background: '#0f172a', color: '#fff' }}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="btn-primary"
                style={{ width: 'auto', padding: '0.85rem 1.75rem', margin: 0 }}
                onClick={handleAnalyzeSkillGap}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  Analyze Skill Gap <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </div>

          {/* SKILL GAP ANALYSIS RESULT SECTION */}
          {status === 'GAP_ANALYZED' && skillGapResult && (
            <div className="skill-gap-results-widget" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="question-prompt-card" style={{ border: '1px solid rgba(34, 197, 94, 0.4)', background: 'linear-gradient(135deg, rgba(22, 101, 52, 0.3) 0%, rgba(15, 23, 42, 0.9) 100%)' }}>
                <span style={{ fontSize: '0.8rem', color: '#4ade80', fontWeight: 700, textTransform: 'uppercase' }}>
                  Target Role Selected
                </span>
                <h2 style={{ fontSize: '1.5rem', color: '#fff', marginTop: '0.25rem', marginBottom: 0 }}>
                  {skillGapResult.targetRole}
                </h2>
              </div>

              {/* Matched & Missing Role Skills Grid */}
              <div className="evaluation-details-grid">
                {/* Matched Skills */}
                <div className="eval-detail-card strengths">
                  <div className="eval-card-header">
                    <CheckCircle2 size={20} color="#4ade80" />
                    <h4 style={{ color: '#4ade80' }}>Matched Role Skills</h4>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {skillGapResult.matchedSkills && skillGapResult.matchedSkills.map((sk, idx) => (
                      <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}>
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Role Skills */}
                <div className="eval-detail-card improvements">
                  <div className="eval-card-header">
                    <AlertTriangle size={20} color="#f87171" />
                    <h4 style={{ color: '#f87171' }}>Missing Role Skills</h4>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {skillGapResult.missingSkills && skillGapResult.missingSkills.map((sk, idx) => (
                      <span key={idx} className="meta-badge-topic" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
                        ⚠ {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Study Topics */}
              <div className="dashboard-widget-card">
                <div className="eval-card-header">
                  <BookOpen size={20} color="#3b82f6" />
                  <h4 style={{ color: '#60a5fa' }}>Recommended Study Topics</h4>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                  {skillGapResult.recommendedTopics && skillGapResult.recommendedTopics.map((top, idx) => (
                    <span key={idx} className="topic-badge" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#93c5fd', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                      • {top}
                    </span>
                  ))}
                </div>
              </div>

              {/* Step-by-Step Learning Action Plan */}
              <div className="ideal-answer-card">
                <div className="ideal-header" style={{ color: '#c084fc' }}>
                  <ListOrdered size={20} color="#c084fc" />
                  <span>Step-by-Step Learning Action Plan</span>
                </div>
                <ul className="eval-list">
                  {skillGapResult.learningPlan && skillGapResult.learningPlan.map((planStep, idx) => (
                    <li key={idx} style={{ fontSize: '1rem', color: '#f3f4f6' }}>
                      <span style={{ fontWeight: 800, color: '#c084fc', minWidth: '24px' }}>{idx + 1}.</span> {planStep}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Navigation */}
              <div className="evaluation-actions">
                <button className="btn-secondary-action" onClick={() => navigate('/dashboard')}>
                  Back to Dashboard
                </button>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={() => navigate('/interview')}>
                  Start Mock Interview Practice
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeAnalyzerPage;
