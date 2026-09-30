import { useCountUp } from '@/lib/useCountUp'

// Animated statistic. <CountUp value={120} suffix="+" />
export default function CountUp({
  value,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const { ref, value: display } = useCountUp(value, { decimals })
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
