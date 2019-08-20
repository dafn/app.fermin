export type AlertProps = {
  message: string
  positiveButtonText: string
  negativeButtonText: string
  activeKey: string | number
  onPositive: (activeKey: string | number) => any
  onNegative: () => any
}
