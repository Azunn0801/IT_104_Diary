import React from 'react'
import { Alert } from 'antd'

interface ToastProps {
  state: "error" | "success";
  message: string;
  onClose: () => void;
}

export default function Toasts({ state, message, onClose }: ToastProps) {
  const title = state === "success" ? "Success" : "Error";

  return (
    <Alert
      message={title}
      description={<div style={{ whiteSpace: 'pre-line' }}>{message}</div>}
      type={state}
      showIcon
      closable
      onClose={onClose}
    />
  )
}