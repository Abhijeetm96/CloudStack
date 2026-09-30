import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('Accessibility: Accessible Names on Icon-Only Buttons (Issue #10)', () => {
  it('ensures DockerTerminal has aria-label on clear and submit buttons and input', () => {
    const filePath = path.resolve(__dirname, '../docker/components/terminal/DockerTerminal.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('aria-label="Clear terminal output"');
    expect(content).toContain('aria-label="Docker CLI command input"');
    expect(content).toContain('aria-label="Execute command"');
  });

  it('ensures KubeTerminal has aria-label on clear button and command input', () => {
    const filePath = path.resolve(__dirname, '../kubernetes/components/terminal/KubeTerminal.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('aria-label="Clear terminal output"');
    expect(content).toContain('aria-label="kubectl command line input"');
  });

  it('ensures ClusterCanvas has aria-label on modal close button', () => {
    const filePath = path.resolve(__dirname, '../kubernetes/components/visualizer/ClusterCanvas.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('aria-label="Close pod inspector"');
  });

  it('ensures Git Academy HeaderNav has aria-label on settings close button', () => {
    const filePath = path.resolve(__dirname, '../git/components/layout/HeaderNav.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('aria-label="Close settings"');
  });

  it('ensures SuiteHeaderNav has aria-label on brand, navigation, and mobile menu toggle', () => {
    const filePath = path.resolve(__dirname, '../components/layout/SuiteHeaderNav.tsx');
    const content = fs.readFileSync(filePath, 'utf-8');
    expect(content).toContain('aria-label="CloudStack Home"');
    expect(content).toContain('aria-label="Git Academy"');
    expect(content).toContain('aria-label="Docker Academy"');
    expect(content).toContain('aria-label="Kubernetes Academy"');
    expect(content).toContain('aria-label="Linux Academy"');
  });
});
