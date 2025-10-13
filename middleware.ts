import { NextResponse, NextRequest } from 'next/server'
import { AgentMonitor } from '@agentmonitor/sdk'

const agentMonitor = new AgentMonitor(process.env.AGENTMONITOR_TOKEN!)

export function middleware(request: NextRequest) {
    agentMonitor.track({
        path: request.nextUrl.pathname,
        query: request.nextUrl.search,
        method: request.method,
        headers: Object.fromEntries(request.headers),
    })
	 
    return NextResponse.next()
}