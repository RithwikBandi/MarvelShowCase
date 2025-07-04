import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background" data-id="o24wnu5qe" data-path="src/pages/NotFound.tsx">
      <div className="flex-1 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-6 p-8" data-id="2b2usqw5a" data-path="src/pages/NotFound.tsx">

          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }} data-id="x12kk9xzc" data-path="src/pages/NotFound.tsx">

            <h1 className="text-8xl font-bold text-primary" data-id="i5yeegzuy" data-path="src/pages/NotFound.tsx">404</h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-4" data-id="eq7nmo02a" data-path="src/pages/NotFound.tsx">

            <h2 className="text-2xl font-semibold tracking-tight" data-id="klmf5bosm" data-path="src/pages/NotFound.tsx">Page Not Found</h2>
            <p className="text-muted-foreground" data-id="ifpsguyp3" data-path="src/pages/NotFound.tsx">
              Sorry, the page you are looking for does not exist or has been removed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }} data-id="nepqrhmyx" data-path="src/pages/NotFound.tsx">

            <Button asChild variant="default" size="lg" data-id="w1ou4wtr5" data-path="src/pages/NotFound.tsx">
              <a href="/" data-id="1o0pldhx0" data-path="src/pages/NotFound.tsx">Back to Home</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Built with love by BATMAN footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center pb-8 text-xs text-gray-500"
      >
        <span>
          Built with <span className="text-red-500 animate-pulse">♥</span> by <span className="font-bold text-white">BATMAN</span>
        </span>
      </motion.div>
    </div>);

};

export default NotFound;