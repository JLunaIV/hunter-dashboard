import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { Dashboard } from '@/components/dashboard/dashboard';
import { AuthProvider } from '@/lib/auth-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hunter-theme">
      <AuthProvider>
        <Dashboard />
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;