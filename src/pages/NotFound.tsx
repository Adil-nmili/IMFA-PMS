import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <div className="text-center space-y-6 max-w-md">
                <div className="relative">
                    <h1 className="text-9xl font-bold text-primary/20">404</h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search className="w-20 h-20 text-muted-foreground animate-pulse" />
                    </div>
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl font-bold">Page Not Found</h2>
                    <p className="text-muted-foreground">
                        The page you're looking for doesn't exist or has been moved.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <Button asChild variant="default" className="gap-2">
                        <Link to="/accueil">
                            <Home className="w-4 h-4" />
                            Go to Dashboard
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="gap-2">
                        <Link to={-1 as any}>
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
