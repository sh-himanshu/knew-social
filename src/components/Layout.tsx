interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen bg-gray-950">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default Layout;
