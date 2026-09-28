import React, { useState, useMemo } from "react";
import Header from "./components/Header";
import StudentList from "./components/StudentList";
import Footer from "./components/Footer";
import AddStudentModal from "./components/AddStudentModal";
import Toast from "./components/Toast";
import { initialStudents } from "./data/initialStudents";
import "./App.css";

/**
 * Main App Container
 * 
 * Manages the top-level students state array, CGPA sorting logic,
 * add/remove handler callbacks, search filtering, and modal visibility state.
 */
export default function App() {
  // Core State & Handlers as specified in Assignment 2 documentation
  const [students, setStudents] = useState(initialStudents);
  const [sortBy, setSortBy] = useState("cgpa-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Add new student record (immutably prepending to state)
  const addStudent = (newStudent) => {
    setStudents([newStudent, ...students]);
    setToast({
      message: `Enrolled ${newStudent.name} (${newStudent.rollNo}) successfully!`,
      type: "success"
    });
  };

  // Remove student by roll number (immutably filtering state)
  const removeStudent = (rollNo) => {
    const studentToRemove = students.find((s) => s.rollNo === rollNo);
    setStudents(students.filter((s) => s.rollNo !== rollNo));
    setToast({
      message: `Removed ${studentToRemove ? studentToRemove.name : rollNo} from portal.`,
      type: "warning"
    });
  };

  // Restore sample dataset
  const resetToDefaults = () => {
    setStudents(initialStudents);
    setSearchQuery("");
    setToast({
      message: "Restored sample student dataset (4 records).",
      type: "info"
    });
  };

  // Filter students based on search query
  const filteredStudents = useMemo(() => {
    if (!searchQuery.trim()) return students;
    const query = searchQuery.toLowerCase().trim();
    return students.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.rollNo.toLowerCase().includes(query) ||
        s.department.toLowerCase().includes(query)
    );
  }, [students, searchQuery]);

  // Compute immutable sorted student list based on active sorting criteria
  const sortedStudents = useMemo(() => {
    const list = [...filteredStudents];
    if (sortBy === "cgpa-desc") {
      return list.sort((a, b) => parseFloat(b.cgpa) - parseFloat(a.cgpa));
    }
    if (sortBy === "cgpa-asc") {
      return list.sort((a, b) => parseFloat(a.cgpa) - parseFloat(b.cgpa));
    }
    if (sortBy === "name-asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredStudents, sortBy]);

  // Compute live metrics
  const totalCount = students.length;
  const highPerformersCount = useMemo(() => {
    return students.filter((s) => parseFloat(s.cgpa) >= 9.0).length;
  }, [students]);

  const averageCgpa = useMemo(() => {
    if (totalCount === 0) return 0;
    const sum = students.reduce((acc, s) => acc + parseFloat(s.cgpa || 0), 0);
    return sum / totalCount;
  }, [students, totalCount]);

  // Extract existing roll numbers for duplicate prevention validation
  const existingRollNumbers = useMemo(() => {
    return students.map((s) => s.rollNo);
  }, [students]);

  return (
    <div className="app-container">
      {/* Static DigiCampus Accent Line */}
      <div className="campus-top-glow"></div>

      <div className="portal-wrapper">
        {/* Header with branding, metrics, sort selector, search, and add action */}
        <Header
          onOpenAddModal={() => setIsAddModalOpen(true)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={totalCount}
          averageCgpa={averageCgpa}
          highPerformersCount={highPerformersCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Main Content: StudentList mapping to StudentCards */}
        <main className="portal-main">
          {searchQuery && filteredStudents.length === 0 && students.length > 0 ? (
            <div className="empty-state-card glass-effect">
              <h3 className="empty-title">No matching records</h3>
              <p className="empty-description">
                No students found matching "<strong>{searchQuery}</strong>". Try a
                different name, roll number, or department.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="btn-secondary"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            <StudentList
              students={sortedStudents}
              onRemoveStudent={removeStudent}
              onOpenAddModal={() => setIsAddModalOpen(true)}
              onResetDefaults={resetToDefaults}
            />
          )}
        </main>

        {/* Portal Footer with metadata and compliance indicators */}
        <Footer />
      </div>

      {/* Add Student Modal Dialog */}
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStudent={addStudent}
        existingRollNumbers={existingRollNumbers}
      />

      {/* Toast Feedback */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
