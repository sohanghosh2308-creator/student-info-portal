import React from "react";
import StudentCard from "./StudentCard";
import { Users, UserPlus, RefreshCw } from "lucide-react";

/**
 * StudentList Component
 * 
 * Receives the students array via props, maps over items to render
 * individual StudentCard components, or displays a modern empty state.
 * 
 * Props:
 * - students: Array<Student>
 * - onRemoveStudent: (rollNo: string) => void
 * - onOpenAddModal: () => void
 * - onResetDefaults: () => void
 */
export default function StudentList({
  students,
  onRemoveStudent,
  onOpenAddModal,
  onResetDefaults
}) {
  if (!students || students.length === 0) {
    return (
      <div className="empty-state-card glass-effect">
        <div className="empty-icon-wrapper">
          <Users size={48} className="empty-icon" />
        </div>
        <h3 className="empty-title">No Student Records Found</h3>
        <p className="empty-description">
          The student portal is currently empty. You can register a new student
          record using the button below or restore the sample dataset.
        </p>
        <div className="empty-actions">
          {onOpenAddModal && (
            <button
              type="button"
              onClick={onOpenAddModal}
              className="btn-primary"
            >
              <UserPlus size={18} />
              <span>Add New Student</span>
            </button>
          )}
          {onResetDefaults && (
            <button
              type="button"
              onClick={onResetDefaults}
              className="btn-secondary"
            >
              <RefreshCw size={18} />
              <span>Restore Default Students</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <div className="student-grid">
        {students.map((student) => (
          <StudentCard
            key={student.rollNo}
            name={student.name}
            rollNo={student.rollNo}
            department={student.department}
            semester={student.semester}
            cgpa={student.cgpa}
            photo={student.photo}
            onRemove={onRemoveStudent}
          />
        ))}
      </div>
    </div>
  );
}
