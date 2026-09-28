import React from "react";
import {
  GraduationCap,
  UserPlus,
  ArrowUpDown,
  Sparkles,
  TrendingUp,
  Users,
  Search,
  Award
} from "lucide-react";

/**
 * Header Component
 * 
 * Portal branding, statistics indicators, and control action bar
 * (Add Student modal trigger, Search filter, & CGPA Sort selector).
 * 
 * Props:
 * - onOpenAddModal: () => void
 * - sortBy: string ('cgpa-desc' | 'cgpa-asc' | 'name-asc')
 * - onSortChange: (newSort: string) => void
 * - totalCount: number
 * - averageCgpa: number
 * - highPerformersCount: number
 * - searchQuery: string
 * - onSearchChange: (query: string) => void
 */
export default function Header({
  onOpenAddModal,
  sortBy,
  onSortChange,
  totalCount,
  averageCgpa,
  highPerformersCount,
  searchQuery,
  onSearchChange
}) {
  return (
    <header className="portal-header">
      {/* Top Banner & Branding */}
      <div className="header-brand-section">
        <div className="brand-logo-wrapper">
          <div className="brand-icon-box glass-effect">
            <GraduationCap className="brand-icon" size={32} />
          </div>
          <div className="brand-text">
            <div className="brand-tag">
              <Sparkles size={13} className="sparkle-icon" />
              <span>React 19 • Prop-Driven Architecture</span>
            </div>
            <h1 className="portal-title">Student Information Management</h1>
            <p className="portal-subtitle">
              Dynamic academic portal enforcing component composition, strict
              props data flow, and interactive state operations.
            </p>
          </div>
        </div>

        {/* Live Metrics Chips */}
        <div className="header-metrics">
          <div className="metric-chip glass-effect">
            <div className="metric-icon-box">
              <Users size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Enrolled</span>
              <span className="metric-value">{totalCount}</span>
            </div>
          </div>

          <div className="metric-chip glass-effect">
            <div className="metric-icon-box accent">
              <TrendingUp size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Avg CGPA</span>
              <span className="metric-value">
                {totalCount > 0 ? averageCgpa.toFixed(2) : "0.00"}
              </span>
            </div>
          </div>

          <div className="metric-chip glass-effect">
            <div className="metric-icon-box gold">
              <Award size={16} />
            </div>
            <div className="metric-data">
              <span className="metric-label">Dean's List</span>
              <span className="metric-value">{highPerformersCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Action Bar */}
      <div className="control-action-bar glass-effect">
        <div className="action-bar-left">
          {/* Real-time search filter */}
          <div className="search-box-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, roll, or dept..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="search-input"
              aria-label="Filter students"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="search-clear-btn"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <span className="record-count-badge">
            {totalCount} {totalCount === 1 ? "record" : "records"}
          </span>
        </div>

        <div className="action-bar-right">
          {/* CGPA Sorting Dropdown Selector */}
          <div className="sort-control-group">
            <label htmlFor="cgpa-sort-select" className="sort-label">
              <ArrowUpDown size={15} />
              <span>Sort CGPA:</span>
            </label>
            <div className="select-wrapper">
              <select
                id="cgpa-sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="sort-dropdown"
                aria-label="Sort students by CGPA"
              >
                <option value="cgpa-desc">Highest to Lowest (Descending)</option>
                <option value="cgpa-asc">Lowest to Highest (Ascending)</option>
                <option value="name-asc">Alphabetical (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Add Student Trigger Button */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="btn-add-student"
            aria-haspopup="dialog"
          >
            <UserPlus size={18} />
            <span>Add Student</span>
          </button>
        </div>
      </div>
    </header>
  );
}
