import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";

import About from "@/pages/About";
import Experience from "@/pages/Experience";
import Interests from "@/pages/Interests";
import Playbook from "@/pages/Playbook";

function Router() {
  return (
    <div className="min-h-screen bg-pure-white">
      <Navigation />
      <Switch>
        <Route path="/" component={About} />
        <Route path="/experience" component={Experience} />
        <Route path="/interests" component={Interests} />
        <Route path="/playbook" component={Playbook} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
