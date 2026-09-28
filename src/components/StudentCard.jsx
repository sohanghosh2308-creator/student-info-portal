import React, { useState } from "react";
import { defaultAvatar } from "../utils/avatar";
import { Trash2, Award, BookOpen, Hash } from "lucide-react";

/**
 * StudentCard Component
 * Displays individual student details with modern glassmorphism,
 * hover elevation micro-interactions, and delete trigger.
 * 
 * Props:
 * - name: string
 * - rollNo: string
 * - department: string
 * - semester: string
 * - cgpa: number | string
 * - photo: string
 * - onRemove: function (rollNo) => void
 */
export default function StudentCard({
  name,
  rollNo,
  department,
  semester,
  cgpa,
  photo,
  onRemove
}) {
  const [imageError, setImageError] = useState(false);

  // Determine badge color gradient based on CGPA on a 10.0 scale
  const numCgpa = parseFloat(cgpa);
  const isHighPerformer = numCgpa >= 9.0;
  const isGoodStanding = numCgpa >= 8.0;

  return (
    <div className="student-card glass-effect transition-all duration-300 hover:scale-105">
      <div className="card-header-bar">
        <span className="card-department-pill">
          <BookOpen className="inline-icon" size={13} />
          {department}
        </span>
        {isHighPerformer && (
          <span className="card-honor-pill" title="Dean's List / High Performer">
            <Award size={13} />
            Honor
          </span>
        )}
      </div>

      <div className="photo-container">
        <img
          src={!imageError && photo ? photo : defaultAvatar}
          alt={name}
          className="student-photo"
          onError={() => setImageError(true)}
          loading="lazy"
        />
        <div className="photo-glow-ring"></div>
      </div>

      <div className="student-info">
        <h3 title={name}>{name}</h3>
        
        <p className="student-meta">
          <span className="meta-item">
            <Hash size={13} className="meta-icon" />
            <strong>Roll:</strong> {rollNo}
          </span>
          <span className="meta-separator">|</span>
          <span className="meta-item">
            <strong>Dept:</strong> {department}
          </span>
        </p>

        <p className="student-academic">
          <span>
            <strong>Sem:</strong> {semester}
          </span>
          <span className="meta-separator">|</span>
          <span>
            <strong>CGPA:</strong>{" "}
            <span
              className={`badge-cgpa ${
                isHighPerformer
                  ? "cgpa-exceptional"
                  : isGoodStanding
                  ? "cgpa-good"
                  : "cgpa-standard"
              }`}
            >
              {typeof cgpa === "number" ? cgpa.toFixed(2) : cgpa}
            </span>
          </span>
        </p>
      </div>

      <div className="card-actions">
        <button
          type="button"
          onClick={() => onRemove(rollNo)}
          className="btn-delete"
          aria-label={`Remove student ${name}`}
        >
          <Trash2 size={16} className="btn-icon" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
