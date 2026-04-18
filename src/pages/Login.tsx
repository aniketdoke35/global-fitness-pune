import React, { useState } from 'react';
import { useAuth } from '../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');
      login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      login(data);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 min-h-full">
      <Card className="w-full max-w-md bg-card border-border shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        <Tabs defaultValue="login" className="w-full">
          <CardHeader className="text-center pt-8">
            <div className="mx-auto w-12 h-12 bg-primary/10 flex items-center justify-center rounded-xl mb-4 border border-primary/20">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight text-white uppercase">Authentication</CardTitle>
            <CardDescription className="text-muted-foreground uppercase tracking-widest text-[10px]">Secure Gateway</CardDescription>
            <TabsList className="grid w-full grid-cols-2 mt-6 bg-muted/50 border border-border p-1">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-black text-xs font-bold uppercase tracking-wider">Login</TabsTrigger>
              <TabsTrigger value="register" className="data-[state=active]:bg-primary data-[state=active]:text-black text-xs font-bold uppercase tracking-wider">Register</TabsTrigger>
            </TabsList>
            {error && <div className="text-destructive text-xs uppercase tracking-wide font-bold mt-4 p-2 bg-destructive/10 border border-destructive/20 rounded-md">{error}</div>}
          </CardHeader>
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="pb-4">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-muted-foreground">Email Override</Label>
                  <Input id="email" type="email" placeholder="john@ironcore.app" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="bg-[#0A0A0C] border-white/5 mx-0 h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-[10px] uppercase tracking-widest text-muted-foreground">Passkey</Label>
                  <Input id="password" type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="bg-[#0A0A0C] border-white/5 mx-0 h-11" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-primary text-black font-extrabold tracking-wider mt-2 h-12 hover:bg-primary/90">AUTHORIZE ACCESS</Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="pb-4">
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name" className="text-[10px] uppercase tracking-widest text-muted-foreground">Full Designation (Name)</Label>
                  <Input id="reg-name" placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)} className="bg-[#0A0A0C] border-white/5 h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-[10px] uppercase tracking-widest text-muted-foreground">Email</Label>
                  <Input id="reg-email" type="email" placeholder="john@ironcore.app" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="bg-[#0A0A0C] border-white/5 h-11" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-[10px] uppercase tracking-widest text-muted-foreground">Create Passkey</Label>
                  <Input id="reg-password" type="password" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="bg-[#0A0A0C] border-white/5 h-11" required />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full bg-white text-black font-extrabold tracking-wider mt-2 h-12 hover:bg-white/90">INITIALIZE ACCOUNT</Button>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
