import { Route, Switch, useLocation, Redirect } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardRouter from "./components/DashboardRouter";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Research from "./pages/Research";
import Events from "./pages/Events";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/not-found";

// Import User type
import { User } from "@shared/schema";

// Protected route component
interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  roles?: string[];
  [key: string]: any;
}

const ProtectedRoute = ({ component: Component, roles, ...rest }: ProtectedRouteProps) => {
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['/api/me'],
    staleTime: 5000,
  });
  
  const [, navigate] = useLocation();

  if (isLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!user) {
    // Redirect to login if not authenticated
    return <Redirect to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // Redirect to home if not authorized
    return <Redirect to="/" />;
  }

  return <Component {...rest} />;
};

// We're now using DashboardRouter component instead of redirects

function App() {
  // Get current user for conditional rendering
  const { data: user } = useQuery<User>({
    queryKey: ['/api/me'],
    staleTime: 5000,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/projects" component={Projects} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/research" component={Research} />
          <Route path="/events" component={Events} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          
          {/* Dashboard route - will route to the appropriate dashboard based on user role */}
          <Route path="/dashboard" component={DashboardRouter} />
          
          <Route path="/profile">
            <ProtectedRoute component={UserProfile} roles={['ADMIN', 'CORE', 'ASPIRANT']} />
          </Route>
          
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
