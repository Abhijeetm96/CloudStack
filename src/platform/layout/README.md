# Standardized Academy Layout System

This directory provides the standardized layout, navigation, and curriculum UI components for all **CloudStack Academies** (Git Academy, Docker Academy, Kubernetes Academy, and all upcoming sections).

## Purpose
Every academy in the suite must follow the exact same visual hierarchy, layout, responsiveness, and interaction patterns pioneered by **Git Academy**:
1. **Header Navigation (`StandardAcademyHeaderNav`)**: 60px sticky top bar with Suite Home return, academy brand badge, Suite switcher dropdown, standardized 6-tab navigation (`Learn`, `Concepts Universe`, `Practice`, `Labs`, `IDE`, `Reference`), and `Problem Solver (⌘K)`.
2. **Left Sidebar (`StandardAcademySidebar`)**: Standard 240px responsive accordion sidebar (`.academy-sidebar-desktop`), search filter, topic accordions with monospace concept commands, and a pinned progress tracker footer at the bottom.
3. **Center Stage Area**: Interactive routed breadcrumbs, Hero card with sub-tabs, content container, and a pinned bottom bar (`StandardAcademyBottomBar`) with Previous Concept, Mark Complete, and Next Concept buttons.
4. **Concepts Universe (`StandardConceptsUniverse`)**: Independent curriculum catalog page showcasing all canonical concepts with search, difficulty filters, variation breakdowns, scenario quizzes, and copyable commands.

---

## How to Create an Upcoming Section (e.g. HelmCraft, PipelinePilot, TerraStack)

To add a new section that looks 100% standardized with Git Academy:

### 1. Define Topics and Concepts
Create a `data/` module containing your curriculum topics and concepts following the `StandardTopicItem` and `UniverseConceptItem` schemas.

### 2. Implement Academy App Shell
```tsx
import React, { useState } from 'react';
import { StandardAcademyHeaderNav } from '../../platform/layout/StandardAcademyHeaderNav';
import { StandardAcademySidebar } from '../../platform/layout/StandardAcademySidebar';
import { StandardAcademyBottomBar } from '../../platform/layout/StandardAcademyBottomBar';
import { StandardConceptsUniverse } from '../../platform/layout/StandardConceptsUniverse';

export const MyNewAcademyApp: React.FC = () => {
  const [mode, setMode] = useState<'learn' | 'universe' | 'practice' | 'labs' | 'ide' | 'reference'>('learn');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', overflow: 'hidden' }}>
      <StandardAcademyHeaderNav
        academyId="helmcraft"
        brandTitle="HelmCraft"
        brandTagline="Helm Charts & Package Management"
        brandIcon={Anchor}
        brandGradient="linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)"
        brandColor="#0ea5e9"
        activeMode={mode}
        onSelectMode={(m) => setMode(m as any)}
        universeConceptCount={36}
      />
      <main style={{ flex: 1, display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>
        {mode === 'learn' && <MyAcademyView />}
        {mode === 'universe' && <StandardConceptsUniverse ... />}
        {/* practice, labs, ide, reference */}
      </main>
    </div>
  );
};
```
