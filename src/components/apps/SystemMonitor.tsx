'use client';

import { useState, useEffect } from 'react';
import {
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  Activity,
  Thermometer,
  Zap,
  Clock,
  Server,
  Wifi,
  Upload,
  Download,
} from 'lucide-react';

interface SystemMonitorProps {
  windowId: string;
}

interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped';
}

interface NetworkInterface {
  name: string;
  ip: string;
  rx: number;
  tx: number;
  status: 'up' | 'down';
}

// Fake processes data
const generateProcesses = (): Process[] => [
  { pid: 1, name: 'systemd', cpu: 0.1, memory: 0.5, status: 'running' },
  { pid: 245, name: 'gnome-shell', cpu: 8.2 + Math.random() * 5, memory: 12.4, status: 'running' },
  { pid: 1024, name: 'firefox', cpu: 15.3 + Math.random() * 10, memory: 18.7 + Math.random() * 5, status: 'running' },
  { pid: 1156, name: 'code', cpu: 5.1 + Math.random() * 3, memory: 8.2, status: 'running' },
  { pid: 1289, name: 'spotify', cpu: 2.4 + Math.random() * 2, memory: 6.1, status: 'running' },
  { pid: 1345, name: 'slack', cpu: 1.8 + Math.random(), memory: 4.5, status: 'sleeping' },
  { pid: 1456, name: 'docker', cpu: 3.2 + Math.random() * 2, memory: 5.8, status: 'running' },
  { pid: 1567, name: 'node', cpu: 4.5 + Math.random() * 3, memory: 3.2, status: 'running' },
  { pid: 1678, name: 'postgres', cpu: 1.2 + Math.random(), memory: 2.8, status: 'sleeping' },
  { pid: 1789, name: 'nginx', cpu: 0.5 + Math.random() * 0.5, memory: 1.2, status: 'running' },
  { pid: 1890, name: 'redis-server', cpu: 0.8 + Math.random() * 0.3, memory: 0.9, status: 'running' },
  { pid: 2001, name: 'ssh-agent', cpu: 0.0, memory: 0.1, status: 'sleeping' },
];

const networkInterfaces: NetworkInterface[] = [
  { name: 'enp0s3', ip: '192.168.1.42', rx: 0, tx: 0, status: 'up' },
  { name: 'lo', ip: '127.0.0.1', rx: 0, tx: 0, status: 'up' },
  { name: 'docker0', ip: '172.17.0.1', rx: 0, tx: 0, status: 'up' },
];

// Circular progress component
function CircularProgress({ value, max, color, label, icon: Icon, unit = '%' }: {
  value: number;
  max: number;
  color: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  unit?: string;
}) {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className="w-5 h-5 text-white/70 mb-1" />
          <span className="text-lg font-bold text-white">{value.toFixed(1)}{unit}</span>
        </div>
      </div>
      <span className="text-xs text-white/60 mt-2">{label}</span>
    </div>
  );
}

// Mini sparkline chart
function Sparkline({ data, color, height = 40 }: { data: number[]; color: string; height?: number }) {
  const max = Math.max(...data, 1);
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = height - (value / max) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full" height={height} preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <polyline
        points={`0,${height} ${points} 100,${height}`}
        fill={`${color}20`}
        stroke="none"
      />
    </svg>
  );
}

export function SystemMonitor({ windowId }: SystemMonitorProps) {
  const [activeTab, setActiveTab] = useState<'resources' | 'processes' | 'network'>('resources');
  const [cpuUsage, setCpuUsage] = useState(35);
  const [memoryUsage, setMemoryUsage] = useState(42);
  const [diskUsage] = useState(67);
  const [cpuTemp, setCpuTemp] = useState(52);
  const [processes, setProcesses] = useState<Process[]>(generateProcesses());
  const [cpuHistory, setCpuHistory] = useState<number[]>(Array(30).fill(35));
  const [memHistory, setMemHistory] = useState<number[]>(Array(30).fill(42));
  const [networkRx, setNetworkRx] = useState(0);
  const [networkTx, setNetworkTx] = useState(0);
  const [uptime, setUptime] = useState(0);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // CPU fluctuation
      setCpuUsage((prev) => {
        const newValue = Math.max(10, Math.min(95, prev + (Math.random() - 0.5) * 15));
        setCpuHistory((h) => [...h.slice(1), newValue]);
        return newValue;
      });

      // Memory fluctuation
      setMemoryUsage((prev) => {
        const newValue = Math.max(30, Math.min(85, prev + (Math.random() - 0.5) * 5));
        setMemHistory((h) => [...h.slice(1), newValue]);
        return newValue;
      });

      // Temperature
      setCpuTemp((prev) => Math.max(45, Math.min(75, prev + (Math.random() - 0.5) * 3)));

      // Network
      setNetworkRx(Math.random() * 5000);
      setNetworkTx(Math.random() * 2000);

      // Update processes
      setProcesses(generateProcesses());

      // Uptime
      setUptime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatUptime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes.toFixed(0)} B/s`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB/s`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB/s`;
  };

  return (
    <div className="h-full flex flex-col bg-[#1a1a2e] text-white">
      {/* Header */}
      <div className="h-12 bg-[#16213e] border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Activity className="w-5 h-5 text-[#3B82F6]" />
          <span className="font-semibold">System Monitor</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-white/60">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Uptime: {formatUptime(uptime)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Server className="w-4 h-4" />
            <span>linux-sim</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 bg-[#16213e]/50">
        {[
          { id: 'resources', label: 'Resources', icon: Cpu },
          { id: 'processes', label: 'Processes', icon: Activity },
          { id: 'network', label: 'Network', icon: Network },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as typeof activeTab)}
            className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
              activeTab === id
                ? 'bg-[#3B82F6]/20 text-[#3B82F6] border-b-2 border-[#3B82F6]'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {activeTab === 'resources' && (
          <div className="space-y-6">
            {/* Main metrics */}
            <div className="grid grid-cols-4 gap-6">
              <CircularProgress
                value={cpuUsage}
                max={100}
                color="#3B82F6"
                label="CPU Usage"
                icon={Cpu}
              />
              <CircularProgress
                value={memoryUsage}
                max={100}
                color="#4ade80"
                label="Memory"
                icon={MemoryStick}
              />
              <CircularProgress
                value={diskUsage}
                max={100}
                color="#60a5fa"
                label="Disk"
                icon={HardDrive}
              />
              <CircularProgress
                value={cpuTemp}
                max={100}
                color="#f472b6"
                label="CPU Temp"
                icon={Thermometer}
                unit="°C"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">CPU History</span>
                  <span className="text-xs text-[#3B82F6]">{cpuUsage.toFixed(1)}%</span>
                </div>
                <Sparkline data={cpuHistory} color="#3B82F6" height={80} />
              </div>
              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium">Memory History</span>
                  <span className="text-xs text-[#4ade80]">{memoryUsage.toFixed(1)}%</span>
                </div>
                <Sparkline data={memHistory} color="#4ade80" height={80} />
              </div>
            </div>

            {/* System info cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Cpu className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-sm font-medium">Processor</span>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <p>Intel Core i7-10700K</p>
                  <p>8 Cores / 16 Threads</p>
                  <p>Base: 3.8 GHz / Boost: 5.1 GHz</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Zap className="w-3 h-3 text-yellow-400" />
                    <span>Current: {(3.8 + cpuUsage / 50).toFixed(2)} GHz</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MemoryStick className="w-4 h-4 text-[#4ade80]" />
                  <span className="text-sm font-medium">Memory</span>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <p>16 GB DDR4-3200</p>
                  <p>Used: {((memoryUsage / 100) * 16).toFixed(1)} GB</p>
                  <p>Available: {(16 - (memoryUsage / 100) * 16).toFixed(1)} GB</p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                    <div
                      className="h-full bg-[#4ade80] rounded-full transition-all duration-500"
                      style={{ width: `${memoryUsage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HardDrive className="w-4 h-4 text-[#60a5fa]" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <div className="space-y-2 text-xs text-white/70">
                  <p>NVMe SSD 512 GB</p>
                  <p>Used: {((diskUsage / 100) * 512).toFixed(0)} GB</p>
                  <p>Free: {(512 - (diskUsage / 100) * 512).toFixed(0)} GB</p>
                  <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                    <div
                      className="h-full bg-[#60a5fa] rounded-full"
                      style={{ width: `${diskUsage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processes' && (
          <div className="bg-[#16213e] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-[#0f3460]">
                <tr>
                  <th className="text-left p-3 font-medium">PID</th>
                  <th className="text-left p-3 font-medium">Process Name</th>
                  <th className="text-right p-3 font-medium">CPU %</th>
                  <th className="text-right p-3 font-medium">Memory %</th>
                  <th className="text-center p-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {processes
                  .sort((a, b) => b.cpu - a.cpu)
                  .map((proc) => (
                    <tr key={proc.pid} className="border-t border-white/5 hover:bg-white/5">
                      <td className="p-3 text-white/60 font-mono">{proc.pid}</td>
                      <td className="p-3">{proc.name}</td>
                      <td className="p-3 text-right">
                        <span className={proc.cpu > 10 ? 'text-[#3B82F6]' : 'text-white/70'}>
                          {proc.cpu.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <span className={proc.memory > 10 ? 'text-[#4ade80]' : 'text-white/70'}>
                          {proc.memory.toFixed(1)}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-xs ${
                            proc.status === 'running'
                              ? 'bg-green-500/20 text-green-400'
                              : proc.status === 'sleeping'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {proc.status}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="space-y-4">
            {/* Network stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Download className="w-5 h-5 text-[#4ade80]" />
                  <span className="font-medium">Download</span>
                </div>
                <div className="text-3xl font-bold text-[#4ade80]">{formatBytes(networkRx)}</div>
                <div className="text-xs text-white/50 mt-1">Total: 1.2 GB</div>
              </div>
              <div className="bg-[#16213e] rounded-lg p-4">
                <div className="flex items-center gap-2 mb-4">
                  <Upload className="w-5 h-5 text-[#60a5fa]" />
                  <span className="font-medium">Upload</span>
                </div>
                <div className="text-3xl font-bold text-[#60a5fa]">{formatBytes(networkTx)}</div>
                <div className="text-xs text-white/50 mt-1">Total: 456 MB</div>
              </div>
            </div>

            {/* Network interfaces */}
            <div className="bg-[#16213e] rounded-lg overflow-hidden">
              <div className="p-3 bg-[#0f3460] font-medium flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                Network Interfaces
              </div>
              <div className="divide-y divide-white/5">
                {networkInterfaces.map((iface) => (
                  <div key={iface.name} className="p-4 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{iface.name}</div>
                      <div className="text-sm text-white/50">{iface.ip}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <div className="text-[#4ade80]">RX: {formatBytes(networkRx * Math.random())}</div>
                        <div className="text-[#60a5fa]">TX: {formatBytes(networkTx * Math.random())}</div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          iface.status === 'up'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {iface.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Connection info */}
            <div className="bg-[#16213e] rounded-lg p-4">
              <div className="font-medium mb-3">Connection Details</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-white/50">Gateway:</span>
                  <span className="ml-2">192.168.1.1</span>
                </div>
                <div>
                  <span className="text-white/50">DNS:</span>
                  <span className="ml-2">8.8.8.8, 8.8.4.4</span>
                </div>
                <div>
                  <span className="text-white/50">Subnet:</span>
                  <span className="ml-2">255.255.255.0</span>
                </div>
                <div>
                  <span className="text-white/50">MAC:</span>
                  <span className="ml-2 font-mono">08:00:27:4c:a9:3f</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="h-8 bg-[#16213e] border-t border-white/10 flex items-center justify-between px-4 text-xs text-white/50">
        <span>Last updated: just now</span>
        <span>Refresh rate: 1s</span>
      </div>
    </div>
  );
}
