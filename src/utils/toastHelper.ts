import { message } from 'antd';

export const showToast = (state: "error" | "success", msg: string) => {
  if (state === "success") {
    message.success(msg);
  } else {
    message.error(msg);
  }
};