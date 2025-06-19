import { create } from 'zustand';

export type Voice = 'male' | 'female';
export type Persona = 'aggressive' | 'passive' | 'busy';
export type Scenario = 'budget-shopper' | 'wary-buyer' | 'curious-inquirer';

interface SimulatorConfig {
  offering: string;
  background: string;
  voice: Voice;
  persona: Persona;
  scenario: Scenario;
}


interface SimulatorStore {
  config: SimulatorConfig;
  setConfig: (data: Partial<SimulatorConfig>) => void;
  reset: () => void;
}

export const useSimulatorStore = create<SimulatorStore>((set) => ({
  config: {
    offering: '',
    background: '',
    voice: 'male',
    persona: 'aggressive',
    scenario: 'budget-shopper',
  },
  setConfig: (data) => set((state) => ({
    config: { ...state.config, ...data }
  })),
  reset: () => set({
    config: {
      offering: '',
      background: '',
      voice: 'male',
      persona: 'aggressive',
      scenario: 'budget-shopper',
    }
  })
}));
