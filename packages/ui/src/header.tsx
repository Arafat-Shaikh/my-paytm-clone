export const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full bg-yellow-500">
      <h1>Header Component</h1>
      {children}
    </div>
  );
};
