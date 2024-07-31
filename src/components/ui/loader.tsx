import { cn } from '@/lib/utils';

interface CircularLoaderProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  width?: number;
}

export function CircularLoader({
  size = 24,
  width = 3,
  className,
  ...props
}: CircularLoaderProps) {
  return (
    <svg
      viewBox="25 25 50 50"
      width={size}
      height={size}
      className={cn('circle-loader', className)}
      {...props}>
      <circle
        cx="50"
        cy="50"
        r="20"
        stroke="currentColor"
        strokeWidth={width}
      />
    </svg>
  );
}
