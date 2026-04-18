import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Link } from 'react-router-dom';

export default function Home() {
  const [offers, setOffers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/offers')
      .then(r => r.json())
      .then(setOffers)
      .catch(console.error);
  }, []);

  return (
    <div className="flex-1 flex flex-col p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Bento Grid Header */}
      <section className="bg-card border border-border rounded-2xl p-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="relative z-10 w-full max-w-xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Transcend Your <span className="text-primary block md:inline">Limits</span>
          </h1>
          <p className="text-muted-foreground">
            The ultimate ecosystem to track progress, manage subscriptions, and unlock your physical potential. 
          </p>
          <div className="pt-4">
            <Link to="/login">
              <Button className="text-black font-bold h-12 px-8 bg-primary hover:opacity-90">
                START YOUR JOURNEY
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative z-10 hidden md:block opacity-80">
          {/* Decorative graphic matching ironcore aesthetic */}
          <div className="w-48 h-48 rounded-full border-4 border-primary border-dashed flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border-2 border-muted-foreground flex items-center justify-center">
              <div className="text-primary font-bold text-2xl">IRONCORE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="flex flex-col border-border bg-card overflow-hidden">
          <CardHeader>
            <div className="card-title text-primary uppercase text-[12px] tracking-[0.05em] font-semibold mb-2">Metrics</div>
            <CardTitle className="text-2xl font-bold">Progress Tracking</CardTitle>
            <CardDescription className="text-muted-foreground">Visual charts and weight lifting stats that keep you focused on your target.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="flex flex-col border-border bg-card overflow-hidden">
          <CardHeader>
            <div className="card-title text-primary uppercase text-[12px] tracking-[0.05em] font-semibold mb-2">Access</div>
            <CardTitle className="text-2xl font-bold">Plan Management</CardTitle>
            <CardDescription className="text-muted-foreground">Subscribe to professional tier plans and instantly sync passes securely.</CardDescription>
          </CardHeader>
        </Card>

        <Card className="flex flex-col border-border bg-card overflow-hidden">
          <CardHeader>
            <div className="card-title text-primary uppercase text-[12px] tracking-[0.05em] font-semibold mb-2">Community</div>
            <CardTitle className="text-2xl font-bold">Exclusive Drops</CardTitle>
            <CardDescription className="text-muted-foreground">Seasonal discounts and gym challenges pushed directly to your feed.</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Offers Bento Row */}
      {offers.length > 0 && (
        <Card className="md:col-span-3 border-border bg-card flex flex-col p-6">
          <div className="card-title mb-6">Active Offers & Discounts</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {offers.map(offer => (
              <div key={offer.id} className="bg-muted p-4 rounded-xl flex flex-col">
                <div className="font-semibold text-[15px]">{offer.title}</div>
                <div className="inline-flex mt-2 mb-2 items-center text-primary text-[11px] font-bold uppercase tracking-wider bg-primary/10 border border-primary px-2 py-1 rounded w-fit">
                  {offer.discountPercentage}% OFF
                </div>
                <div className="text-[12px] text-muted-foreground mt-auto">{offer.description}</div>
              </div>
            ))}
          </div>
        </Card>
      )}

    </div>
  );
}
