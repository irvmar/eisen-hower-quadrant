import EisenhowerMatrix from '@/components/EisenhowerMatrix';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import PrivateRoute from '@/components/PrivateRoute';

export default function MatrixPage() {
  return (
    <AuthProvider>
      <Header />
      <PrivateRoute>
        <EisenhowerMatrix />
      </PrivateRoute>
    </AuthProvider>
  );
}