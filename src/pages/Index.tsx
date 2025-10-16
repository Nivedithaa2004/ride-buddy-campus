import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Users, Leaf, DollarSign, MapPin, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent py-20 px-4">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Car className="h-16 w-16 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              CampusRide
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto mb-8">
              Share rides, save money, and make campus commuting sustainable
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
              </Link>
              <Link to="/passenger-dashboard">
                <Button variant="outline" size="lg" className="text-lg px-8 bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                  Browse Rides
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose CampusRide?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-shadow">
              <CardHeader>
                <DollarSign className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Save Money</CardTitle>
                <CardDescription>
                  Split fuel costs and parking fees with fellow students
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-shadow">
              <CardHeader>
                <Leaf className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Eco-Friendly</CardTitle>
                <CardDescription>
                  Reduce carbon footprint by sharing rides to campus
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Build Community</CardTitle>
                <CardDescription>
                  Connect with fellow students on your daily commute
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <Car className="h-10 w-10 text-primary mb-2" />
                <CardTitle className="text-2xl">For Drivers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-muted-foreground">Sign up and verify your college email</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-muted-foreground">Post your ride details and available seats</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-muted-foreground">Accept passenger requests and coordinate pickup</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <p className="text-muted-foreground">Share costs and enjoy the journey!</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-[var(--shadow-soft)]">
              <CardHeader>
                <Users className="h-10 w-10 text-secondary mb-2" />
                <CardTitle className="text-2xl">For Passengers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    1
                  </div>
                  <p className="text-muted-foreground">Create your passenger account</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <p className="text-muted-foreground">Search rides by location, time, or vehicle type</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <p className="text-muted-foreground">Book your seat instantly</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold">
                    4
                  </div>
                  <p className="text-muted-foreground">Get driver contact and enjoy your ride!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Riding?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join hundreds of students making their campus commute better
          </p>
          <Link to="/auth">
            <Button variant="hero" size="lg" className="text-lg px-12 bg-white text-primary hover:bg-white/90">
              Join CampusRide Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
