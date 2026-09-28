import React, { useState, useEffect } from "react";
import { X, UserPlus, Image, AlertCircle, Sparkles } from "lucide-react";
import { defaultAvatar, getInitialsAvatar } from "../utils/avatar";

const DEPARTMENT_OPTIONS = [
  "Computer Science",
  "Artificial Intelligence",
  "Software Engineering",
  "Electrical Engineering",
  "Data Science",
  "Cyber Security",
  "Information Technology"
];

const SEMESTER_OPTIONS = [
  "Semester 1",
  "Semester 2",
  "Semester 3",
  "Semester 4",
  "Semester 5",
  "Semester 6",
  "Semester 7",
  "Semester 8"
];

const SAMPLE_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80"
];

export default function AddStudentModal({
  isOpen,
  onClose,
  onAddStudent,
  existingRollNumbers = []
}) {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    department: DEPARTMENT_OPTIONS[0],
    semester: "Semester 6",
    cgpa: "9.20",
    photo: ""
  });

  const [errors, setErrors] = useState({});
  const [previewError, setPreviewError] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset errors and reset preview error when photo input changes
  useEffect(() => {
    setPreviewError(false);
  }, [formData.photo]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSelectSampleAvatar = (url) => {
    setFormData((prev) => ({ ...prev, photo: url }));
    setPreviewError(false);
  };

  const handleUseInitialsAvatar = () => {
    const avatarUrl = getInitialsAvatar(formData.name || "Student");
    setFormData((prev) => ({ ...prev, photo: avatarUrl }));
    setPreviewError(false);
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Student name is required";
    }

    if (!formData.rollNo.trim()) {
      newErrors.rollNo = "Roll number is required";
    } else {
      const normalizedRoll = formData.rollNo.trim().toUpperCase();
      const isDuplicate = existingRollNumbers.some(
        (r) => r.toUpperCase() === normalizedRoll
      );
      if (isDuplicate) {
        newErrors.rollNo = "This Roll Number is already registered!";
      }
    }

    const numCgpa = parseFloat(formData.cgpa);
    if (isNaN(numCgpa) || numCgpa < 0 || numCgpa > 10.0) {
      newErrors.cgpa = "CGPA must be between 0.00 and 10.00";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newStudent = {
      name: formData.name.trim(),
      rollNo: formData.rollNo.trim().toUpperCase(),
      department: formData.department,
      semester: formData.semester,
      cgpa: parseFloat(parseFloat(formData.cgpa).toFixed(2)),
      photo: formData.photo.trim() || defaultAvatar
    };

    onAddStudent(newStudent);

    // Reset form & close
    setFormData({
      name: "",
      rollNo: "",
      department: DEPARTMENT_OPTIONS[0],
      semester: "Semester 6",
      cgpa: "9.20",
      photo: ""
    });
    setErrors({});
    onClose();
  };

  const previewPhotoSrc =
    !previewError && formData.photo.trim()
      ? formData.photo.trim()
      : formData.name.trim()
      ? getInitialsAvatar(formData.name)
      : defaultAvatar;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-content glass-effect">
        <div className="modal-header">
          <div className="modal-title-box">
            <div className="modal-icon-badge">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 id="modal-title" className="modal-heading">
                Add New Student Record
              </h2>
              <p className="modal-subheading">
                Input student academic credentials to append to the portal state.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="student-name">
                Full Name <span className="required-star">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                name="name"
                placeholder="e.g. Jordan Lee"
                value={formData.name}
                onChange={handleChange}
                className={`form-input ${errors.name ? "input-error" : ""}`}
              />
              {errors.name && (
                <span className="field-error">
                  <AlertCircle size={13} /> {errors.name}
                </span>
              )}
            </div>

            {/* Roll Number */}
            <div className="form-group">
              <label htmlFor="student-roll">
                Roll Number <span className="required-star">*</span>
              </label>
              <input
                id="student-roll"
                type="text"
                name="rollNo"
                placeholder="e.g. CS-2024-112"
                value={formData.rollNo}
                onChange={handleChange}
                className={`form-input ${errors.rollNo ? "input-error" : ""}`}
              />
              {errors.rollNo && (
                <span className="field-error">
                  <AlertCircle size={13} /> {errors.rollNo}
                </span>
              )}
            </div>

            {/* Department */}
            <div className="form-group">
              <label htmlFor="student-department">Department</label>
              <select
                id="student-department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="form-select"
              >
                {DEPARTMENT_OPTIONS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Semester */}
            <div className="form-group">
              <label htmlFor="student-semester">Semester</label>
              <select
                id="student-semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="form-select"
              >
                {SEMESTER_OPTIONS.map((sem) => (
                  <option key={sem} value={sem}>
                    {sem}
                  </option>
                ))}
              </select>
            </div>

            {/* CGPA */}
            <div className="form-group">
              <label htmlFor="student-cgpa">
                CGPA (0.00 - 10.00) <span className="required-star">*</span>
              </label>
              <input
                id="student-cgpa"
                type="number"
                step="0.01"
                min="0"
                max="10.00"
                name="cgpa"
                placeholder="9.50"
                value={formData.cgpa}
                onChange={handleChange}
                className={`form-input ${errors.cgpa ? "input-error" : ""}`}
              />
              {errors.cgpa && (
                <span className="field-error">
                  <AlertCircle size={13} /> {errors.cgpa}
                </span>
              )}
            </div>

            {/* Photo URL */}
            <div className="form-group full-width">
              <label htmlFor="student-photo">
                Photo URL (optional)
              </label>
              <input
                id="student-photo"
                type="url"
                name="photo"
                placeholder="https://images.unsplash.com/..."
                value={formData.photo}
                onChange={handleChange}
                className="form-input"
              />
              <div className="avatar-presets-bar">
                <span className="presets-label">Quick Avatars:</span>
                {SAMPLE_AVATARS.map((url, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSampleAvatar(url)}
                    className="avatar-preset-btn"
                  >
                    <img src={url} alt={`Preset ${idx + 1}`} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={handleUseInitialsAvatar}
                  className="preset-pill-btn"
                >
                  <Sparkles size={12} />
                  <span>Initials Badge</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="modal-preview-box">
            <span className="preview-label">Live Card Preview:</span>
            <div className="mini-preview-card">
              <img
                src={previewPhotoSrc}
                alt="Preview"
                className="mini-preview-img"
                onError={() => setPreviewError(true)}
              />
              <div className="mini-preview-info">
                <strong>{formData.name || "Student Name"}</strong>
                <span className="mini-preview-meta">
                  Roll: {formData.rollNo || "XX-XXXX-XXX"} | Dept:{" "}
                  {formData.department}
                </span>
                <span className="mini-preview-meta">
                  Sem: {formData.semester} | CGPA:{" "}
                  <span className="badge-cgpa">
                    {parseFloat(formData.cgpa || 0).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <UserPlus size={18} />
              <span>Add Student to Portal</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
