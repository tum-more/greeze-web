import { cn } from "@/lib/utils";

type Props = {
  errors?: string[];
  className?: string;
};

export function InputErrorMessage({ errors, className }: Props) {
  if (!errors || errors.length === 0) {
    return null;
  }
  return (
    <div className={cn("text-destructive", className)}>
      <ul className="list-disc list-inside">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}
