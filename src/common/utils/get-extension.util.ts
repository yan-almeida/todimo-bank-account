export const getExtension = (name: string) => {
  return name.substring(name.lastIndexOf('.'));
};

// "yan.com" -> .split(".") -> ["yan", "com"]
