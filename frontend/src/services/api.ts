import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface PasswordAnalysis {
  score: number;
  strength: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
  length: number;
  entropy: number;
  characteristics: {
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumbers: boolean;
    hasSpecialChars: boolean;
    charDiversity: number;
  };
  crackTime: {
    onlineThrottling: string;
    onlineNoThrottling: string;
    offlineSlowHashing: string;
    offlineFastHashing: string;
  };
  feedback: {
    warning: string;
    suggestions: string[];
  };
}

export interface GeneratorOptions {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumbers?: boolean;
  includeSpecial?: boolean;
  excludeAmbiguous?: boolean;
  quantity?: number;
}

export interface MemorablePasswordOptions {
  keywords: string[];
  separator?: string;
  addNumbers?: boolean;
  addSpecial?: boolean;
  capitalize?: boolean;
}

export interface BreachResult {
  breached: boolean;
  count: number;
  message: string;
}

export const passwordApi = {
  checkStrength: async (password: string): Promise<PasswordAnalysis> => {
    const response = await api.post('/password/check', { password });
    return response.data;
  },

  analyzePassword: async (password: string) => {
    const response = await api.post('/password/analyze', { password });
    return response.data;
  },
};

export const generatorApi = {
  generateRandom: async (options: GeneratorOptions): Promise<{ passwords: string[] }> => {
    const response = await api.post('/generator/random', options);
    return response.data;
  },

  generateMemorable: async (options: MemorablePasswordOptions): Promise<{ password: string }> => {
    const response = await api.post('/generator/memorable', options);
    return response.data;
  },

  generatePassphrase: async (options: {
    wordCount?: number;
    separator?: string;
    addNumbers?: boolean;
    capitalize?: boolean;
  }): Promise<{ passphrase: string }> => {
    const response = await api.post('/generator/passphrase', options);
    return response.data;
  },
};

export const breachApi = {
  checkBreach: async (password: string): Promise<BreachResult> => {
    const response = await api.post('/breach/check', { password });
    return response.data;
  },

  checkCommon: async (password: string) => {
    const response = await api.post('/breach/common', { password });
    return response.data;
  },
};

export default api;
