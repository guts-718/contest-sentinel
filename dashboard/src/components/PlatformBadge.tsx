export default function PlatformBadge({ name }: { name: string }) {
  const colors: Record<string, string> = {
    codeforces: "bg-red-500/20 text-red-400",
    atcoder: "bg-blue-500/20 text-blue-400",
    leetcode: "bg-yellow-500/20 text-yellow-400",
    codechef: "bg-green-500/20 text-green-400",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-xs font-medium ${
        colors[name] ?? "bg-gray-500/20 text-gray-400"
      }`}
    >
      {name}
    </span>
  );
}