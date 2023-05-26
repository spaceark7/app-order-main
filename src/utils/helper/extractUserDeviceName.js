export const extractUserDeviceName = (userAgent) =>
  (userAgent.match(/by\s(.*?)\sClose/) || [])[1]
