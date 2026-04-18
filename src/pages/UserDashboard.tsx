import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

export default function UserDashboard() {
  const { user } = useAuth();
  const [progress, setProgress] = useState<any[]>([]);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [subs, setSubs] = useState<any[]>([]);

  const fetchProgress = () => {
    fetch(`/api/progress/${user?.id}`)
      .then(r => r.json())
      .then(data => {
        const mapped = data.map((d: any) => ({
          ...d,
          displayDate: format(new Date(d.date), 'MMM dd')
        }));
        setProgress(mapped);
      });
  };

  const fetchSubs = () => {
    fetch(`/api/subscriptions/${user?.id}`)
      .then(r => r.json())
      .then(setSubs);
  };

  useEffect(() => {
    if (user?.id) {
      fetchProgress();
      fetchSubs();
    }
  }, [user?.id]);

  const handleAddProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, weight: parseFloat(weight), height: parseFloat(height) })
    });
    setWeight('');
    setHeight('');
    fetchProgress();
  };

  const handleSubscribe = async () => {
    await fetch('/api/subscriptions/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user?.id, planCents: 4999 })
    });
    fetchSubs();
  };

  const latestBmi = progress.length > 0 ? progress[progress.length - 1].bmi : null;

  return (
    <div className="flex-1 p-6 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-[12px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">MEMBER ACCESS</div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-primary font-bold">{progress.length}</div>
          <div className="text-[11px] text-muted-foreground uppercase tracking-wider">Entries</div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        
        {/* Progress Entry */}
        <Card className="bento-card md:col-span-1">
          <CardHeader>
            <div className="card-title">RECORD TELEMETRY</div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProgress} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Weight (kg)</Label>
                <Input className="bg-muted border-none" type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label className="text-[11px] text-muted-foreground uppercase tracking-wider">Height (cm)</Label>
                <Input className="bg-muted border-none" type="number" step="0.1" value={height} onChange={e => setHeight(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-primary text-black font-bold">COMMIT LOG</Button>
            </form>
          </CardContent>
        </Card>

        {/* BMI & Stats */}
        <Card className="bento-card md:col-span-1 flex flex-col justify-center text-center">
          <CardHeader>
            <div className="card-title text-center">BIOMETRIC INDEX</div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center py-6">
            <span className="text-6xl font-black text-white tracking-tighter">{latestBmi || '--'}</span>
            <div className="h-6 w-full max-w-[120px] bg-muted rounded-full mt-4 flex overflow-hidden">
                <div className="bg-primary h-full" style={{ width: latestBmi ? Math.min((latestBmi / 40) * 100, 100) + '%' : '0%' }}></div>
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-widest font-semibold">{latestBmi ? "Latest reading" : "No data yet"}</p>
          </CardContent>
        </Card>

        {/* Subscriptions */}
        <Card className="bento-card md:col-span-2 flex flex-col">
          <CardHeader>
            <div className="card-title">CLEARANCE LEVEL</div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-center">
            {subs.length === 0 || subs[0].status === 'expired' ? (
              <div className="bg-muted border border-border rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-[16px] font-bold text-white">Guest Access</h3>
                  <p className="text-[13px] text-muted-foreground mt-1">Limited features. Renew to unlock facility access.</p>
                </div>
                <Button onClick={handleSubscribe} className="bg-primary text-black font-bold whitespace-nowrap">AUTHORIZE $49.99/mo</Button>
              </div>
            ) : (
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-[16px] font-bold text-primary">Active Authorization</h3>
                  <p className="text-[13px] text-muted-foreground mt-1">Tier: {subs[0].plan}</p>
                  <p className="text-[12px] text-muted-foreground mt-1 font-mono">VALID THRU: {format(new Date(subs[0].endDate), 'yyyy.MM.dd')}</p>
                </div>
                <span className="inline-flex items-center rounded-md bg-primary/20 px-3 py-1 font-bold text-[11px] text-primary tracking-widest uppercase border border-primary/30">
                  SECURE
                </span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Progress Chart */}
        <Card className="bento-card md:col-span-4">
          <CardHeader>
            <div className="card-title">HISTORICAL TELEMETRY</div>
          </CardHeader>
          <CardContent className="h-[300px]">
            {progress.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progress} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="displayDate" axisLine={false} tickLine={false} tick={{fill: '#8E8E93', fontSize: 12}} />
                  <YAxis domain={['auto', 'auto']} axisLine={false} tickLine={false} tick={{fill: '#8E8E93', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151518', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                    itemStyle={{ color: '#C3FF4D' }}
                  />
                  <Line type="monotone" dataKey="weight" stroke="#C3FF4D" strokeWidth={3} dot={{ r: 4, fill: '#C3FF4D', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#FFFFFF' }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-[13px]">INSUFFICIENT DATA POINTS</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
