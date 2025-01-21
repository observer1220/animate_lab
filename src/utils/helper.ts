const getDeviceType = (userAgent: string = ""): "Desktop" | "Mobile" => {
  if (
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(
      userAgent
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
};

export { getDeviceType };
