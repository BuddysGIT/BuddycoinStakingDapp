export function Card({ children }) {
  return <div className="p-4 border rounded bg-gray-800">{children}</div>;
}

export function CardContent({ children }) {
  return <div className="p-2">{children}</div>;
}
