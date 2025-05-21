import { useAuth } from '@/lib/auth-provider';
import { LoginForm } from './login-form';
import { DashboardLayout } from './dashboard-layout';

export function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return <DashboardLayout />;
}