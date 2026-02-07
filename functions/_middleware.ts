export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);

  if (
    url.pathname === "/sitemap.xml" ||
    url.pathname === "/robots.txt"
  ) {
    return next(); // allow static file to be served
  }

  return next();
};