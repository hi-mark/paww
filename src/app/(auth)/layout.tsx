import "./auth.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth-layout">
      <div className="auth-wrapper">{children}</div>
    </main>
  );
}
