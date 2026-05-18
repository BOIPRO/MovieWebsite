export function decodeTokenServer(token: string) {
  try {
    const base64Url = token.split('.')[1];
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = Buffer.from(base64, 'base64').toString('utf8');
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Lỗi decode token, có thể token sai định dạng:", error);
    return null;
  }
}