export const Card = ({ children }) => (
    <div className="bg-white rounded-xl shadow p-4">
      {children}
    </div>
  );
  
  export const CardContent = ({ children, className = '' }) => (
    <div className={`text-gray-700 ${className}`}>{children}</div>
  );
  