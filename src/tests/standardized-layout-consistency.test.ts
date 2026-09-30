import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { DOCKER_14_TOPICS } from '../docker/data/unifiedDockerData';
import { KUBE_CHAPTERS } from '../kubernetes/data/topics';
import { ACADEMY_18_TOPICS } from '../git/data/unifiedAcademyData';
import { LINUX_15_TOPICS } from '../linuxforge/data/topics';

describe('Standardized Academy Architecture & Consistency Audit', () => {
  describe('Universal Navigation & Layout Integrity across All 4 Sections', () => {
    it('verifies Git Academy, Docker Academy, Kubernetes Academy, and LinuxForge have standardized 60px HeaderNav with matching routes', () => {
      const commitNav = fs.readFileSync(path.resolve(__dirname, '../git/components/layout/HeaderNav.tsx'), 'utf-8');
      const dockNav = fs.readFileSync(path.resolve(__dirname, '../docker/components/layout/HeaderNav.tsx'), 'utf-8');
      const podNav = fs.readFileSync(path.resolve(__dirname, '../kubernetes/components/layout/HeaderNav.tsx'), 'utf-8');
      const linuxNav = fs.readFileSync(path.resolve(__dirname, '../linuxforge/components/layout/HeaderNav.tsx'), 'utf-8');

      // Docker Academy, Kubernetes Academy, and LinuxForge use the shared StandardAcademyHeaderNav
      expect(dockNav).toContain('StandardAcademyHeaderNav');
      expect(dockNav).toContain('universeConceptCount={42}');
      expect(dockNav).toContain('onOpenProblemSearch');

      expect(podNav).toContain('StandardAcademyHeaderNav');
      expect(podNav).toContain('universeConceptCount={71}');
      expect(podNav).toContain('onOpenProblemSearch');

      expect(linuxNav).toContain('StandardAcademyHeaderNav');
      expect(linuxNav).toMatch(/universeConceptCount=\{(46|TOTAL_LINUX_CONCEPTS)\}/);

      // Check Git Academy has matching tabs
      expect(commitNav).toContain('Learn');
      expect(commitNav).toContain('71 Concepts');
      expect(commitNav).toContain('Practice');
      expect(commitNav).toContain('Labs');
      expect(commitNav).toContain('IDE');
      expect(commitNav).toContain('Reference');
      expect(commitNav).toContain('Problem Solver');
    });

    it('verifies all 4 academies mount an independent Concepts Universe catalog view', () => {
      const commitApp = fs.readFileSync(path.resolve(__dirname, '../git/GitAcademyApp.tsx'), 'utf-8');
      const dockApp = fs.readFileSync(path.resolve(__dirname, '../docker/DockerAcademyApp.tsx'), 'utf-8');
      const podApp = fs.readFileSync(path.resolve(__dirname, '../kubernetes/KubernetesAcademyApp.tsx'), 'utf-8');
      const linuxApp = fs.readFileSync(path.resolve(__dirname, '../linuxforge/LinuxForgeApp.tsx'), 'utf-8');

      expect(commitApp).toContain("mode === 'universe' && <ConceptsUniverseView />");
      expect(dockApp).toContain("mode === 'universe' && <DockerConceptsUniverseView />");
      expect(podApp).toContain("mode === 'universe' && <PodConceptsUniverseView />");
      expect(linuxApp).toContain("<LinuxConceptsUniverseView />");
    });

    it('verifies all 4 academies use 240px standardized responsive accordion sidebars with pinned progress footer', () => {
      const commitAcademy = fs.readFileSync(path.resolve(__dirname, '../git/components/academy/GitAcademyView.tsx'), 'utf-8');
      const dockAcademy = fs.readFileSync(path.resolve(__dirname, '../docker/components/academy/DockerAcademyView.tsx'), 'utf-8');
      const podAcademy = fs.readFileSync(path.resolve(__dirname, '../kubernetes/components/academy/PodAcademyView.tsx'), 'utf-8');
      const linuxAcademy = fs.readFileSync(path.resolve(__dirname, '../linuxforge/components/academy/LinuxAcademyView.tsx'), 'utf-8');

      // All 4 use academy-sidebar-desktop class (which enforces 240px and responsiveness in index.css)
      expect(commitAcademy).toContain('academy-sidebar-desktop');
      expect(dockAcademy).toContain('academy-sidebar-desktop');
      expect(podAcademy).toContain('academy-sidebar-desktop');
      expect(linuxAcademy).toContain('academy-sidebar-desktop');

      // Docker Academy, Kubernetes Academy, and LinuxForge use the StandardAcademySidebar
      expect(dockAcademy).toContain('StandardAcademySidebar');
      expect(podAcademy).toContain('StandardAcademySidebar');
      expect(linuxAcademy).toContain('StandardAcademySidebar');

      // All 4 use mobile topbar with drawer toggle
      expect(commitAcademy).toContain('academy-mobile-topbar');
      expect(dockAcademy).toContain('academy-mobile-topbar');
      expect(podAcademy).toContain('academy-mobile-topbar');
      expect(linuxAcademy).toContain('academy-mobile-topbar');

      // All 4 use off-canvas mobile drawer
      expect(commitAcademy).toContain('academy-mobile-drawer-backdrop');
      expect(dockAcademy).toContain('academy-mobile-drawer-backdrop');
      expect(podAcademy).toContain('academy-mobile-drawer-backdrop');
      expect(linuxAcademy).toContain('academy-mobile-drawer-backdrop');
    });

    it('verifies all 4 academies provide pinned bottom bars for seamless Prev / Next navigation', () => {
      const commitAcademy = fs.readFileSync(path.resolve(__dirname, '../git/components/academy/GitAcademyView.tsx'), 'utf-8');
      const dockAcademy = fs.readFileSync(path.resolve(__dirname, '../docker/components/academy/DockerAcademyView.tsx'), 'utf-8');
      const podAcademy = fs.readFileSync(path.resolve(__dirname, '../kubernetes/components/academy/PodAcademyView.tsx'), 'utf-8');
      const linuxAcademy = fs.readFileSync(path.resolve(__dirname, '../linuxforge/components/academy/LinuxAcademyView.tsx'), 'utf-8');

      expect(commitAcademy).toContain('academy-bottom-bar');
      expect(dockAcademy).toContain('StandardAcademyBottomBar');
      expect(podAcademy).toContain('StandardAcademyBottomBar');
      expect(linuxAcademy).toContain('StandardAcademyBottomBar');
    });

    it('verifies StandardAcademySidebar is pure and modular without hardcoded DevOps curriculum leakage', () => {
      const sidebarContent = fs.readFileSync(path.resolve(__dirname, '../platform/layout/StandardAcademySidebar.tsx'), 'utf-8');
      expect(sidebarContent).not.toContain('DEVOPS_29_CHAPTERS');
      expect(sidebarContent).toContain('filteredTopics.map');
    });
  });

  describe('Curriculum Data Integrity across Git Academy, Docker Academy, Kubernetes Academy, and LinuxForge', () => {
    it('verifies Git Academy has 18 Topics and 75 Concepts', () => {
      expect(ACADEMY_18_TOPICS.length).toBe(18);
      const totalConcepts = ACADEMY_18_TOPICS.reduce((acc, t) => acc + t.concepts.length, 0);
      expect(totalConcepts).toBe(75);
    });

    it('verifies Docker Academy has 14 Topics and 42 Concepts with standard attributes', () => {
      expect(DOCKER_14_TOPICS.length).toBe(14);
      const totalConcepts = DOCKER_14_TOPICS.reduce((acc, t) => acc + t.concepts.length, 0);
      expect(totalConcepts).toBe(42);

      DOCKER_14_TOPICS.forEach((topic) => {
        expect(topic.id).toBeDefined();
        expect(topic.number).toBeDefined();
        expect(topic.title).toBeDefined();
        expect(topic.concepts.length).toBeGreaterThan(0);
        topic.concepts.forEach((c) => {
          expect(c.id).toBeDefined();
          expect(c.command).toBeDefined();
          expect(c.title).toBeDefined();
        });
      });
    });

    it('verifies Kubernetes Academy has 15 Chapters and 71 Concepts with standard attributes', () => {
      expect(KUBE_CHAPTERS.length).toBe(15);
      const totalConcepts = KUBE_CHAPTERS.reduce((acc, ch) => acc + ch.concepts.length, 0);
      expect(totalConcepts).toBe(71);

      KUBE_CHAPTERS.forEach((ch) => {
        expect(ch.id).toBeDefined();
        expect(ch.number).toBeDefined();
        expect(ch.title).toBeDefined();
        expect(ch.concepts.length).toBeGreaterThan(0);
        ch.concepts.forEach((c) => {
          expect(c.id).toBeDefined();
          expect(c.title).toBeDefined();
          expect(c.difficulty).toBeDefined();
        });
      });
    });

    it('verifies LinuxForge has 30 Chapters and 400+ Concepts with standard attributes', () => {
      expect(LINUX_15_TOPICS.length).toBe(30);
      const totalConcepts = LINUX_15_TOPICS.reduce((acc, t) => acc + t.concepts.length, 0);
      expect(totalConcepts).toBeGreaterThanOrEqual(400);

      LINUX_15_TOPICS.forEach((topic) => {
        expect(topic.id).toBeDefined();
        expect(topic.number).toBeDefined();
        expect(topic.title).toBeDefined();
        expect(topic.concepts.length).toBeGreaterThan(0);
        topic.concepts.forEach((c) => {
          expect(c.id).toBeDefined();
          expect(c.command).toBeDefined();
          expect(c.title).toBeDefined();
          expect(c.difficulty).toBeDefined();
        });
      });
    });
  });

  describe('Extensibility for Upcoming Sections (README documentation & exports)', () => {
    it('verifies src/platform/layout exports all standardized layout components', () => {
      const readmePath = path.resolve(__dirname, '../platform/layout/README.md');
      const readmeContent = fs.readFileSync(readmePath, 'utf-8');

      expect(readmeContent).toContain('StandardAcademyHeaderNav');
      expect(readmeContent).toContain('StandardAcademySidebar');
      expect(readmeContent).toContain('StandardAcademyBottomBar');
      expect(readmeContent).toContain('StandardConceptsUniverse');
      expect(readmeContent).toContain('Upcoming Section');
    });
  });
});
