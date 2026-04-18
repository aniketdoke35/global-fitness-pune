import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [offers, setOffers] = useState<any[]>([]);
  const [allSubs, setAllSubs] = useState<any[]>([]);
  
  // Offer Form
  const [offerTitle, setOfferTitle] = useState('');
  const [offerDesc, setOfferDesc] = useState('');
  const [offerDisc, setOfferDisc] = useState('');
  const [offerImg, setOfferImg] = useState('');

  // Employee Form
  const [empName, setEmpName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPassword, setEmpPassword] = useState('');

  const fetchUsers = () => fetch('/api/users').then(r => r.json()).then(setUsers);
  const fetchOffers = () => fetch('/api/offers').then(r => r.json()).then(setOffers);
  const fetchAllSubs = () => fetch('/api/subscriptions/all').then(r => r.json()).then(setAllSubs).catch(() => setAllSubs([]));

  useEffect(() => {
    fetchUsers();
    fetchOffers();
    fetchAllSubs();
  }, []);

  const handleAddOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/offers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: offerTitle, description: offerDesc, discountPercentage: parseFloat(offerDisc), image: offerImg })
    });
    setOfferTitle(''); setOfferDesc(''); setOfferDisc(''); setOfferImg('');
    fetchOffers();
  };

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/auth/register-employee', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: empName, email: empEmail, password: empPassword })
    });
    setEmpName(''); setEmpEmail(''); setEmpPassword('');
    fetchUsers();
  };

  const members = users.filter(u => u.role === 'user');
  const employees = users.filter(u => u.role !== 'user');

  return (
    <div className="flex-1 p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">System management and content</p>
        </div>
      </div>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-6 bg-transparent border-b border-border w-full justify-start rounded-none p-0 h-auto gap-6">
          <TabsTrigger value="users" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 pb-3 font-semibold">Gym Members</TabsTrigger>
          <TabsTrigger value="employees" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 pb-3 font-semibold">Employees</TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 pb-3 font-semibold">Billing & Subs</TabsTrigger>
          <TabsTrigger value="offers" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none px-0 pb-3 font-semibold">Offers & Promos</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-0">
          <div className="grid grid-cols-1 gap-6">
            <Card className="bento-card col-span-1">
              <CardHeader>
                <div className="card-title">MEMBER REGISTRY</div>
                <div className="flex items-end justify-between">
                  <div className="text-[32px] font-bold leading-none">{members.length} <span className="text-[14px] font-normal text-muted-foreground">Gym Goers</span></div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow className="border-border">
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Name</TableHead>
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Email</TableHead>
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider text-right">Joined</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.length === 0 && <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground py-8">No members found</TableCell></TableRow>}
                      {members.map(u => (
                        <TableRow key={u.id} className="border-border">
                          <TableCell className="font-semibold text-[14px]">{u.name}</TableCell>
                          <TableCell className="text-muted-foreground text-[14px]">{u.email}</TableCell>
                          <TableCell className="text-right text-muted-foreground text-[14px]">{new Date(u.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="mt-0">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bento-card md:col-span-1">
              <CardHeader>
                <div className="card-title">GRANT ACCESS</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Employee Name</Label>
                    <Input className="bg-muted border-none" value={empName} onChange={e => setEmpName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Email Account</Label>
                    <Input className="bg-muted border-none" type="email" value={empEmail} onChange={e => setEmpEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Passkey</Label>
                    <Input className="bg-muted border-none" type="password" value={empPassword} onChange={e => setEmpPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-black font-semibold hover:bg-primary/90 mt-2">CREATE IDENTITY</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bento-card md:col-span-2">
              <CardHeader>
                <div className="card-title">STAFF DIRECTORY</div>
              </CardHeader>
              <CardContent>
                <div className="rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader className="bg-muted">
                      <TableRow className="border-border">
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Name</TableHead>
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Email</TableHead>
                        <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Clearance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {employees.map(e => (
                        <TableRow key={e.id} className="border-border">
                          <TableCell className="font-semibold text-[14px]">{e.name}</TableCell>
                          <TableCell className="text-muted-foreground text-[14px]">{e.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${e.role === 'admin' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-muted text-foreground'}`}>
                              {e.role}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-0">
          <Card className="bento-card">
            <CardHeader>
              <div className="card-title">FINANCIAL LEDGER</div>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl border border-border overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted">
                    <TableRow className="border-border">
                      <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Member ID</TableHead>
                      <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Package</TableHead>
                      <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Status</TableHead>
                      <TableHead className="font-semibold text-muted-foreground uppercase text-xs tracking-wider">Expiration</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allSubs.length === 0 && <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground py-8">No subscriptions found</TableCell></TableRow>}
                    {allSubs.map(sub => (
                      <TableRow key={sub.id} className="border-border">
                        <TableCell className="font-semibold text-[#8E8E93]">#{sub.userId.toString().padStart(4, '0')}</TableCell>
                        <TableCell className="text-[14px]">{sub.plan}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${sub.status === 'active' ? 'text-[#4CAF50] bg-[#4CAF50]/10' : 'text-red-400 bg-red-400/10'}`}>
                            {sub.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-[14px]">{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="offers" className="mt-0">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bento-card">
              <CardHeader>
                <div className="card-title">DEPLOY NEW OFFER</div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddOffer} className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Campaign Title</Label>
                    <Input className="bg-muted border-none" value={offerTitle} onChange={e => setOfferTitle(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Pitch / Description</Label>
                    <Input className="bg-muted border-none" value={offerDesc} onChange={e => setOfferDesc(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Discount %</Label>
                    <Input className="bg-muted border-none" type="number" value={offerDisc} onChange={e => setOfferDisc(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs uppercase text-muted-foreground tracking-wider font-semibold">Media URI (optional)</Label>
                    <Input className="bg-muted border-none" value={offerImg} onChange={e => setOfferImg(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full bg-primary text-black font-semibold hover:bg-primary/90 mt-2">DEPLOY TO CHANNELS</Button>
                </form>
              </CardContent>
            </Card>

            <Card className="bento-card">
              <CardHeader>
                <div className="card-title">ACTIVE CAMPAIGNS</div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {offers.map(o => (
                     <div key={o.id} className="bg-muted p-4 rounded-xl flex flex-col xl:flex-row gap-4 items-start">
                        {o.image && <img src={o.image} alt={o.title} className="w-16 h-16 object-cover rounded-lg" />}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold text-white">{o.title}</h4>
                            <div className="bg-primary/10 border border-primary text-primary px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
                              {o.discountPercentage}% OFF
                            </div>
                          </div>
                          <p className="text-[13px] text-muted-foreground mt-1">{o.description}</p>
                        </div>
                     </div>
                  ))}
                  {offers.length === 0 && <p className="text-muted-foreground text-sm">No active marketing content.</p>}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
