import React, { useEffect } from 'react';
import { CapstoneProject } from './types';
import { StandardCapstoneProjectView } from './StandardCapstoneProjectView';
import './capstone.css';

export interface StandardCapstoneRunnerModalProps {
  project: CapstoneProject;
  isOpen: boolean;
  onClose: () => void;
  onCompleted?: () => void;
}

export const StandardCapstoneRunnerModal: React.FC<StandardCapstoneRunnerModalProps> = ({
  project,
  isOpen,
  onClose,
  onCompleted,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="capstone-modal-backdrop-fixed" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '1280px' }}>
        <StandardCapstoneProjectView
          initialProject={project}
          isEmbedded={false}
          onClose={onClose}
          onCompleted={onCompleted}
        />
      </div>
    </div>
  );
};
