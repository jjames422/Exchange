import dynamic from 'next/dynamic';

const LoginForm = dynamic(() => import('@/components/LoginForm'), { ssr: false });

export default function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}
