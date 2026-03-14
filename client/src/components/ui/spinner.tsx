import { cn } from "@/lib/utils";

type SpinnerProps = {
  className?: string;
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeStyles: Record<NonNullable<SpinnerProps["size"]>, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-8 w-8 border-2",
  lg: "h-12 w-12 border-[3px]",
};

export function Spinner({ className, label = "Loading", size = "md" }: SpinnerProps) {
  return (
    <div className={cn("inline-flex items-center justify-center", className)} aria-live="polite">
      <span
        className={cn(
          "animate-spin rounded-full border-gray-200 border-t-primary",
          sizeStyles[size],
        )}
        role="status"
        aria-label={label}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
