import { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';

const VISITOR_DATA_FILE = path.join(__dirname, '../../data/visitor-stats.json');

interface VisitorStats {
  totalVisits: number;
  todayVisits: number;
  lastVisitDate: string;
  uniqueVisitors: Set<string>;
}

// Helper function to load visitor stats
async function loadStats(): Promise<VisitorStats> {
  try {
    const data = await fs.readFile(VISITOR_DATA_FILE, 'utf-8');
    const parsed = JSON.parse(data);
    return {
      ...parsed,
      uniqueVisitors: new Set(parsed.uniqueVisitors || [])
    };
  } catch (error) {
    // If file doesn't exist, return default stats
    return {
      totalVisits: 0,
      todayVisits: 0,
      lastVisitDate: new Date().toDateString(),
      uniqueVisitors: new Set()
    };
  }
}

// Helper function to save visitor stats
async function saveStats(stats: VisitorStats): Promise<void> {
  const dataToSave = {
    ...stats,
    uniqueVisitors: Array.from(stats.uniqueVisitors)
  };
  
  // Ensure data directory exists
  const dataDir = path.dirname(VISITOR_DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
  
  await fs.writeFile(VISITOR_DATA_FILE, JSON.stringify(dataToSave, null, 2));
}

// Track a new visitor
export const trackVisitor = async (req: Request, res: Response) => {
  try {
    const { visitorId } = req.body;
    
    if (!visitorId || typeof visitorId !== 'string') {
      return res.status(400).json({
        error: 'Visitor ID is required'
      });
    }

    const stats = await loadStats();
    const today = new Date().toDateString();
    
    // Reset today's visits if it's a new day
    if (stats.lastVisitDate !== today) {
      stats.todayVisits = 0;
      stats.lastVisitDate = today;
    }

    // Check if this is a new visitor
    const isNewVisitor = !stats.uniqueVisitors.has(visitorId);
    
    if (isNewVisitor) {
      stats.uniqueVisitors.add(visitorId);
      stats.totalVisits += 1;
      stats.todayVisits += 1;
      
      await saveStats(stats);
    }

    res.json({
      success: true,
      isNewVisitor,
      stats: {
        totalVisits: stats.totalVisits,
        todayVisits: stats.todayVisits
      }
    });
  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({
      error: 'Failed to track visitor'
    });
  }
};

// Get current visitor stats
export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await loadStats();
    const today = new Date().toDateString();
    
    // Reset today's visits if it's a new day
    if (stats.lastVisitDate !== today) {
      stats.todayVisits = 0;
      stats.lastVisitDate = today;
      await saveStats(stats);
    }

    res.json({
      totalVisits: stats.totalVisits,
      todayVisits: stats.todayVisits,
      uniqueVisitors: stats.uniqueVisitors.size
    });
  } catch (error) {
    console.error('Error getting visitor stats:', error);
    res.status(500).json({
      error: 'Failed to get visitor stats'
    });
  }
};
