export default function ViewFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="
      w-full
      mt-8
      p-6
      rounded-2xl
      border border-[var(--border)]
      bg-[var(--card)]
      shadow-sm
      min-h-[520px]
      transition-all
    ">
      {children}
    </div>
  );
}