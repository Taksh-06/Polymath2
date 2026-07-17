import database from './database.json';
import { Category, Pathway, Orb } from './types';

// Cast the imported JSON to our types
const categories = database as Category[];

export function getCategories(): Category[] {
  return categories;
}

export function getCategory(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getPathway(categoryId: string, pathwayId: string): Pathway | undefined {
  const cat = getCategory(categoryId);
  return cat?.pathways.find(p => p.id === pathwayId);
}

export function getOrb(orbId: string): Orb | undefined {
  for (const cat of categories) {
    for (const path of cat.pathways) {
      const orb = path.orbs.find(o => o.id === orbId);
      if (orb) return orb;
    }
  }
  return undefined;
}

export function getNextOrb(orbId: string): Orb | undefined {
  for (const cat of categories) {
    for (const path of cat.pathways) {
      const idx = path.orbs.findIndex(o => o.id === orbId);
      if (idx !== -1 && idx < path.orbs.length - 1) {
        return path.orbs[idx + 1];
      }
    }
  }
  return undefined;
}
