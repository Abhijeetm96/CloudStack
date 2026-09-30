import React, { useState } from 'react';
import { FileCode, Info, Sparkles, Copy, Check } from 'lucide-react';

export interface YamlTokenDoc {
  key: string;
  label: string;
  explanation: string;
  productionTip: string;
  alternatives: string[];
}

const DEFAULT_DOCS: Record<string, YamlTokenDoc> = {
  name: {
    key: 'name',
    label: 'Workflow Name',
    explanation: 'The human-readable title of your workflow displayed in the GitHub Actions tab, pull request checks, and status badges.',
    productionTip: 'Use clear names like "CI / Test & Build" or "Release / Publish Container" rather than generic "workflow.yml".',
    alternatives: ['name: Production Deployment', 'name: Lint & Typecheck'],
  },
  on: {
    key: 'on',
    label: 'Trigger Event (on:)',
    explanation: 'Defines the GitHub event or schedule that causes the workflow to wake up and execute.',
    productionTip: 'Always filter events by branches or file paths (e.g. `paths: ["src/**"]`) to avoid burning runner minutes on doc edits.',
    alternatives: ['on: [push, pull_request]', 'on: workflow_dispatch', 'on: schedule'],
  },
  push: {
    key: 'push',
    label: 'Push Event',
    explanation: 'Runs the workflow automatically whenever commits are pushed to the repository.',
    productionTip: 'Filter to specific branches (e.g., `branches: [main]`) so private experimental branches don\'t trigger production release jobs.',
    alternatives: ['branches: [main, release/*]', 'tags: ["v*"]'],
  },
  jobs: {
    key: 'jobs',
    label: 'Jobs Collection',
    explanation: 'The collection of top-level work units. By default, all jobs defined under `jobs:` execute in parallel unless configured with `needs:`.',
    productionTip: 'Group independent tasks into separate jobs (e.g., `lint` and `test` running concurrently) to minimize total runtime.',
    alternatives: ['jobs: { lint: ..., test: ..., build: ... }'],
  },
  'runs-on': {
    key: 'runs-on',
    label: 'Runner Host Environment',
    explanation: 'Specifies the operating system and VM image that executes the job: `ubuntu-latest`, `windows-latest`, `macos-latest`, or self-hosted.',
    productionTip: 'Prefer `ubuntu-latest` for cost efficiency (1x billable rate) over macOS (10x rate) unless building iOS or Safari binaries.',
    alternatives: ['runs-on: ubuntu-latest', 'runs-on: self-hosted', 'runs-on: [self-hosted, linux, arm64]'],
  },
  steps: {
    key: 'steps',
    label: 'Sequential Steps',
    explanation: 'A linear list of atomic tasks executed inside the runner. Steps share the same working directory filesystem.',
    productionTip: 'If one step modifies files (like `npm run build`), subsequent steps can read those files directly.',
    alternatives: ['steps: [ - uses: ..., - run: ... ]'],
  },
  uses: {
    key: 'uses',
    label: 'Action Reference (uses:)',
    explanation: 'Imports a reusable action published on GitHub Marketplace or within your repository (`actions/checkout@v4`).',
    productionTip: 'Always pin actions to full commit SHAs or explicit major version tags (`@v4`) to protect against supply chain tampering.',
    alternatives: ['uses: actions/checkout@v4', 'uses: actions/setup-node@v4', 'uses: docker/build-push-action@v5'],
  },
  run: {
    key: 'run',
    label: 'Shell Execution (run:)',
    explanation: 'Executes command-line shell programs or multi-line bash/PowerShell scripts inside the runner container.',
    productionTip: 'Use pipe syntax (`run: |`) for clean multi-line scripts. Commands automatically stop on the first non-zero exit code.',
    alternatives: ['run: npm test', 'run: |\n  npm ci\n  npm run build'],
  },
};

interface Props {
  yamlContent?: string;
  customDocs?: Record<string, YamlTokenDoc>;
}

export const InteractiveYamlExplorer: React.FC<Props> = ({
  yamlContent,
  customDocs = {},
}) => {
  const [selectedKey, setSelectedKey] = useState<string>('on');
  const [copied, setCopied] = useState<boolean>(false);

  const docs = { ...DEFAULT_DOCS, ...customDocs };
  const activeDoc = docs[selectedKey] || docs['on'];

  const defaultYaml = `name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Source Code
        uses: actions/checkout@v4

      - name: Setup Node Runtime
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Run Test Suite
        run: npm test`;

  const yamlLines = (yamlContent || defaultYaml).split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(yamlContent || defaultYaml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        background: '#090d16',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #0d1527 0%, #151d38 100%)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.12)',
          padding: '0.85rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FileCode size={16} color="#a855f7" />
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f8fafc' }}>
            Interactive CI/CD Syntax Explorer
          </span>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            &bull; Click any directive to inspect its mechanism
          </span>
        </div>

        <button
          onClick={handleCopy}
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            color: '#e2e8f0',
            fontSize: '0.72rem',
            padding: '0.35rem 0.65rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
          }}
        >
          {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy YAML'}
        </button>
      </div>

      {/* Two Column Layout: Left YAML Editor, Right Interactive Inspector */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1rem',
          padding: '1.25rem',
        }}
      >
        {/* Left: Clickable YAML Lines */}
        <div
          style={{
            background: '#040711',
            borderRadius: '10px',
            padding: '1rem',
            border: '1px solid rgba(148, 163, 184, 0.1)',
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.78rem',
            lineHeight: 1.6,
            overflowX: 'auto',
          }}
        >
          {yamlLines.map((line, idx) => {
            const trimmed = line.trim();
            let keyCandidate = '';

            if (trimmed.startsWith('name:')) keyCandidate = 'name';
            else if (trimmed.startsWith('on:')) keyCandidate = 'on';
            else if (trimmed.startsWith('push:')) keyCandidate = 'push';
            else if (trimmed.startsWith('jobs:')) keyCandidate = 'jobs';
            else if (trimmed.startsWith('runs-on:')) keyCandidate = 'runs-on';
            else if (trimmed.startsWith('steps:')) keyCandidate = 'steps';
            else if (trimmed.includes('uses:')) keyCandidate = 'uses';
            else if (trimmed.includes('run:')) keyCandidate = 'run';

            const isSelectable = !!keyCandidate && !!docs[keyCandidate];
            const isSelected = isSelectable && selectedKey === keyCandidate;

            return (
              <div
                key={idx}
                onClick={() => {
                  if (isSelectable) setSelectedKey(keyCandidate);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: isSelected ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                  padding: '0.1rem 0.4rem',
                  borderRadius: '4px',
                  cursor: isSelectable ? 'pointer' : 'default',
                  borderLeft: isSelected ? '3px solid #c084fc' : '3px solid transparent',
                  transition: 'background 0.1s ease',
                }}
                title={isSelectable ? `Click to inspect '${keyCandidate}'` : undefined}
              >
                <span style={{ color: '#475569', width: '28px', flexShrink: 0, userSelect: 'none' }}>
                  {idx + 1}
                </span>
                <span
                  style={{
                    color: isSelectable ? (isSelected ? '#f3e8ff' : '#c084fc') : '#e2e8f0',
                    fontWeight: isSelectable ? 700 : 400,
                  }}
                >
                  {line}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Live Inspector Card */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(30, 20, 60, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%)',
            border: '1px solid rgba(168, 85, 247, 0.25)',
            borderRadius: '10px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                fontFamily: 'ui-monospace, monospace',
                fontSize: '0.85rem',
                fontWeight: 800,
                color: '#c084fc',
                background: 'rgba(168, 85, 247, 0.2)',
                padding: '0.2rem 0.5rem',
                borderRadius: '6px',
              }}
            >
              {activeDoc.key}
            </span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#f8fafc' }}>
              {activeDoc.label}
            </span>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
            {activeDoc.explanation}
          </div>

          <div
            style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.2)',
              borderRadius: '8px',
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
            }}
          >
            <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Sparkles size={13} />
              Senior SRE Best Practice
            </div>
            <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.45 }}>
              {activeDoc.productionTip}
            </div>
          </div>

          {activeDoc.alternatives && activeDoc.alternatives.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>
                Common Variations &amp; Syntax Patterns:
              </div>
              {activeDoc.alternatives.map((alt, aIdx) => (
                <code
                  key={aIdx}
                  style={{
                    background: '#030712',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    color: '#a7f3d0',
                    fontFamily: 'ui-monospace, monospace',
                  }}
                >
                  {alt}
                </code>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
