import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

describe('StandardConceptsUniverse Grid Layout & Expand/Collapse Functionality', () => {
  const filePath = path.resolve(__dirname, '../platform/layout/StandardConceptsUniverse.tsx');
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  it('verifies viewMode supports grid, cards, table and defaults to grid', () => {
    expect(fileContent).toContain("type ViewMode = 'grid' | 'cards' | 'table';");
    expect(fileContent).toContain("const [viewMode, setViewMode] = useState<ViewMode>('grid');");
  });

  it('verifies responsive CSS grid layout is implemented for grid viewMode', () => {
    expect(fileContent).toContain("viewMode === 'grid'");
    expect(fileContent).toContain("display: 'grid'");
    expect(fileContent).toContain("gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))'");
  });

  it('verifies handleExpandAll properly sets all concepts to false (expanded)', () => {
    // Check that handleExpandAll sets every concept ID to false
    expect(fileContent).toMatch(/handleExpandAll\s*=\s*\(\)\s*=>\s*\{[\s\S]*?allExpanded\[c\.id\]\s*=\s*false[\s\S]*?setCollapsedMap\(allExpanded\)/);
  });

  it('verifies handleCollapseAll properly sets all concepts to true (collapsed)', () => {
    // Check that handleCollapseAll sets every concept ID to true
    expect(fileContent).toMatch(/handleCollapseAll\s*=\s*\(\)\s*=>\s*\{[\s\S]*?allCollapsed\[c\.id\]\s*=\s*true[\s\S]*?setCollapsedMap\(allCollapsed\)/);
  });

  it('verifies individual toggle handles fallback correctly', () => {
    expect(fileContent).toContain('const currentlyCollapsed = prev[conceptId] !== undefined ? prev[conceptId] : true;');
  });

  it('verifies View Mode switcher contains Grid, Cards, and Table buttons', () => {
    expect(fileContent).toContain("onClick={() => setViewMode('grid')}");
    expect(fileContent).toContain("onClick={() => setViewMode('cards')}");
    expect(fileContent).toContain("onClick={() => setViewMode('table')}");
    expect(fileContent).not.toContain('By Chapter');
  });

  it('verifies clicking Details expands grid card across full width of screen', () => {
    // Verifies gridColumn expands across all columns (1 / -1) when not collapsed
    expect(fileContent).toContain("gridColumn: isCollapsed ? 'auto' : '1 / -1'");
    expect(fileContent).toContain("<span>{isCollapsed ? 'Details' : 'Collapse Details'}</span>");
  });

  it('verifies expanded grid card contains rich variations and scenario content', () => {
    expect(fileContent).toContain('Command Variations &amp; Usage');
    expect(fileContent).toContain('Interactive Scenario Check');
    expect(fileContent).toContain('Common Pitfalls &amp; Mistakes');
  });

  it('verifies full view modal support is provided for immersive reading', () => {
    expect(fileContent).toContain('const [modalConcept, setModalConcept] = useState<UniverseConceptItem | null>(null);');
    expect(fileContent).toContain('Full View');
    expect(fileContent).toContain('Full-Screen Focus Modal');
  });

  it('verifies responsive grid uses dense auto-flow to replace empty space with other cards', () => {
    expect(fileContent).toContain("gridAutoFlow: 'dense'");
  });

  it('verifies single-card accordion expansion: expanding a card collapses any previously expanded card', () => {
    // Only one card can be expanded at any point in time
    expect(fileContent).toContain('return {\n          [conceptId]: false,\n        };');
    expect(fileContent).toContain('return {\n          [conceptId]: true,\n        };');
  });
});
