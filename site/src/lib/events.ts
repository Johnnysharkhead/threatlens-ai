import fs from 'node:fs';
import path from 'node:path';

export interface EventSource {
  url: string;
  title: string;
  published: string;
}

export interface AttackStep {
  phase: string;
  detail: string;
}

export interface AttackEvent {
  id: string;
  collected_at: string;
  category: 'ai_powered_attack' | 'attack_on_ai';
  title: string;
  summary: string;
  sources: EventSource[];
  status: 'stub' | 'analyzed';
  overview?: {
    attacker: string;
    target: string;
    economic_loss: string;
    timeline: string;
    status: string;
  };
  technique?: {
    vulnerabilities: string[];
    method: string;
    owasp_classification: string;
    tools_used: string[];
    sophistication: string;
  };
  attack_chain?: {
    description: string;
    mermaid: string;
    steps: AttackStep[];
  };
  lessons?: {
    ai_vulnerabilities: string[];
    ai_role: string;
    defense_recommendations: string[];
    industry_impact: string;
  };
}

const DATA_DIR = path.resolve(process.cwd(), '../data/events');

export function getAllEvents(): AttackEvent[] {
  const events: AttackEvent[] = [];

  if (!fs.existsSync(DATA_DIR)) return events;

  const dateDirs = fs.readdirSync(DATA_DIR).filter(d => {
    const fullPath = path.join(DATA_DIR, d);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const dateDir of dateDirs) {
    const dirPath = path.join(DATA_DIR, dateDir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const content = fs.readFileSync(path.join(dirPath, file), 'utf-8');
      const event: AttackEvent = JSON.parse(content);
      events.push(event);
    }
  }

  // Sort by collected_at descending (newest first)
  events.sort((a, b) => b.collected_at.localeCompare(a.collected_at));
  return events;
}

export function getEventById(id: string): AttackEvent | undefined {
  const allEvents = getAllEvents();
  return allEvents.find(e => e.id === id);
}

export function getCategoryLabel(category: string): string {
  return category === 'ai_powered_attack' ? 'AI驱动攻击' : '针对AI攻击';
}

export function getSophisticationLabel(level: string): string {
  const labels: Record<string, string> = {
    low: '低',
    medium: '中',
    high: '高',
    advanced: '高级',
  };
  return labels[level] || level;
}
