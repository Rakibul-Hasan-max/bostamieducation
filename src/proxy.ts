import { NextRequest } from "next/server";
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - api routes, _next files, _vercel files
  // - any files with an extension (like favicon.ico, images)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
