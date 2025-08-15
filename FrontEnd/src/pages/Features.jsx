import { Link } from "react-router-dom";
import { CheckCircle, Cpu, Shield, Zap } from "lucide-react";
import Button from "../components/ButtonComponents";

const Features = () => {
  const featuresList = [
    {
      icon: <Cpu className="h-12 w-12 text-primary mb-4" />,
      title: "AI-Powered Code Review",
      description:
        "Get instant feedback on your code, including best practices, optimization tips, and potential bugs.",
    },
    {
      icon: <Shield className="h-12 w-12 text-primary mb-4" />,
      title: "Bug Detection",
      description:
        "Automatically identify errors and vulnerabilities in your code before they reach production.",
    },
    {
      icon: <Zap className="h-12 w-12 text-primary mb-4" />,
      title: "Multi-Language Support",
      description:
        "Supports 50+ programming languages, so you can analyze any project with ease.",
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-primary mb-4" />,
      title: "Real-Time Suggestions",
      description:
        "Receive actionable suggestions instantly while coding to improve efficiency and code quality.",
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-4 md:px-6 bg-gradient-to-br from-primary/5 to-secondary/5 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Features of FixMate
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Explore the powerful capabilities of FixMate to improve your code,
          reduce bugs, and accelerate development.
        </p>
        <Button size="lg" className="px-8">
          Get Started
        </Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center hover:shadow-xl transition duration-300"
            >
              {feature.icon}
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 bg-primary/5 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Improve Your Code?</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of developers who trust FixMate to help them write
          better code.
        </p>
        <Link to="/getstarted">
          <Button size="lg">
            Get Started Today
          </Button>
        </Link>
      </section>
    </div>
  );
};

export default Features;
