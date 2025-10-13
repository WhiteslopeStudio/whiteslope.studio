declare module '@agentmonitor/sdk' {
  export class AgentMonitor {
    constructor(token: string);
    track(request: any): void;
  }
}