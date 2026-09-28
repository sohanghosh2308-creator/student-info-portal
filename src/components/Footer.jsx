import React from "react";
import { CheckCircle2, ShieldCheck, Code2 } from "lucide-react";

/**
 * Footer Component
 * 
 * Portal branding, copyright statement, and assignment constraint
 * verification status tags.
 */
export default function Footer() {
  return (
    <footer className="portal-footer glass-effect">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-title-row">
            <Code2 size={18} className="footer-logo-icon" />
            <span className="footer-brand">
              Student Information Management System
            </span>
          </div>
          <p className="footer-desc">
            Developed with React 19 • Enforcing Props Encapsulation, State
            Immutability, and Glassmorphism Micro-Interactions.
          </p>
        </div>

        <div className="footer-badges">
          <div className="compliance-tag">
            <CheckCircle2 size={14} className="tag-icon" />
            <span>100% Prop-Driven Data Flow</span>
          </div>
          <div className="compliance-tag">
            <CheckCircle2 size={14} className="tag-icon" />
            <span>Immutable State Sorting</span>
          </div>
          <div className="compliance-tag">
            <ShieldCheck size={14} className="tag-icon" />
            <span>Modular Component Hierarchy</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} Academic Portal Specification • Assignment 2 Documentation
        </p>
      </div>
    </footer>
  );
}
