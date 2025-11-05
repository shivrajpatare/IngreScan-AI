import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO, APP_TITLE, getLoginUrl } from "@/const";
import { ScanLine, Shield, MessageSquare, User, TrendingUp, FileText } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  const features = [
    {
      icon: ScanLine,
      title: "Smart Scanner",
      description: "Upload ingredient labels or enter text manually. Our OCR technology extracts ingredients instantly."
    },
    {
      icon: Shield,
      title: "Risk Analysis",
      description: "Get personalized health risk scores based on your profile, medical conditions, and dietary preferences."
    },
    {
      icon: MessageSquare,
      title: "AI Chatbot",
      description: "Ask questions about ingredients, health impacts, and get safer alternatives with scientific backing."
    },
    {
      icon: User,
      title: "Personal Profile",
      description: "Track your health data, medical conditions, and medications for accurate risk assessment."
    },
    {
      icon: TrendingUp,
      title: "Visual Analytics",
      description: "Interactive charts and graphs show ingredient breakdowns and risk levels at a glance."
    },
    {
      icon: FileText,
      title: "Scan History",
      description: "Access all your previous scans and reports anytime. Track your food choices over time."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {APP_LOGO && <img src={APP_LOGO} alt={APP_TITLE} className="h-8 w-8" />}
            <h1 className="text-xl font-bold text-foreground">{APP_TITLE}</h1>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard">
                  <Button variant="ghost">Dashboard</Button>
                </Link>
                <Link href="/scanner">
                  <Button>Scan Now</Button>
                </Link>
              </>
            ) : (
              <Button asChild>
                <a href={getLoginUrl()}>Get Started</a>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Know What You Eat
            </h2>
            <p className="text-xl text-muted-foreground">
              Analyze food ingredients for health risks using AI-powered technology backed by WHO and FSSAI data. Make informed decisions about your food choices.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              {isAuthenticated ? (
                <Link href="/scanner">
                  <Button size="lg" className="text-lg px-8">
                    <ScanLine className="mr-2 h-5 w-5" />
                    Start Scanning
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="text-lg px-8" asChild>
                  <a href={getLoginUrl()}>
                    <Shield className="mr-2 h-5 w-5" />
                    Get Started Free
                  </a>
                </Button>
              )}
              <Link href="/dashboard">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">Comprehensive Food Analysis</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with trusted health data to give you complete insights into your food.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">How It Works</h3>
            <p className="text-lg text-muted-foreground">Simple, fast, and accurate</p>
          </div>
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                1
              </div>
              <h4 className="text-xl font-semibold">Scan or Enter</h4>
              <p className="text-muted-foreground">Take a photo of the ingredient label or type ingredients manually</p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                2
              </div>
              <h4 className="text-xl font-semibold">AI Analysis</h4>
              <p className="text-muted-foreground">Our AI analyzes each ingredient against health databases and your profile</p>
            </div>
            <div className="text-center space-y-3">
              <div className="h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto">
                3
              </div>
              <h4 className="text-xl font-semibold">Get Insights</h4>
              <p className="text-muted-foreground">Receive detailed risk scores, health impacts, and safer alternatives</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!isAuthenticated && (
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center space-y-6">
            <h3 className="text-3xl font-bold">Start Making Healthier Choices Today</h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their health through informed food decisions.
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
              <a href={getLoginUrl()}>
                Sign Up Now - It's Free
              </a>
            </Button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t py-8 mt-auto bg-card">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© 2025 {APP_TITLE}. Powered by WHO and FSSAI data sources.</p>
          <p className="mt-2">Making food transparency accessible to everyone.</p>
        </div>
      </footer>
    </div>
  );
}
