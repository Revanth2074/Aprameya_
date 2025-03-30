import { Route, Switch, useLocation, Redirect } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Blogs from "./pages/Blogs";
import Research from "./pages/Research";
import Events from "./pages/Events";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CoreTeamDashboard from "./pages/CoreTeamDashboard";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/not-found";

// Protected route component
const ProtectedRoute = ({ component: Component, roles, ...rest }: any) => {
  const { data: user, isLoading } = useQuery({
    queryKey: ['/api/users/me'],
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

function App() {
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
          
          {/* Protected routes with role requirements */}
          <Route path="/admin">
            <ProtectedRoute component={AdminDashboard} roles={['ADMIN']} />
          </Route>
          
          <Route path="/core-team">
            <ProtectedRoute component={CoreTeamDashboard} roles={['ADMIN', 'CORE']} />
          </Route>
          
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
