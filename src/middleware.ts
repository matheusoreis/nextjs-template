import { jwtDecode } from "jwt-decode";
import { type MiddlewareConfig, type NextRequest, NextResponse } from "next/server";

const publicRoutes = [
	{
		path: "/",
		whenAuthenticated: "next",
	},
	{
		path: "/sign-in",
		whenAuthenticated: "redirect",
	},
	{
		path: "/sign-up",
		whenAuthenticated: "redirect",
	},
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = "/sign-in";
const PUBLIC_FILE_REGEX = /\.(webmanifest|ico|jpg|jpeg|png|gif|svg|css|js|json)$/;

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	if (PUBLIC_FILE_REGEX.test(path)) {
		return NextResponse.next();
	}

	const publicRoute = publicRoutes.find((route) => route.path === path);
	const authToken = request.cookies.get("token");

	// Usuário não autenticado acessando uma rota pública
	if (!authToken && publicRoute) {
		return NextResponse.next();
	}

	// Usuário não autenticado tentando acessar uma página protegida
	if (!authToken && !publicRoute) {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

		return NextResponse.redirect(redirectUrl);
	}

	// Usuário autenticado tentando acessar uma rota pública e deve ser redirecionado
	if (authToken && publicRoute && publicRoute.whenAuthenticated === "redirect") {
		const redirectUrl = request.nextUrl.clone();
		redirectUrl.pathname = "/recrutador/dashboard";

		return NextResponse.redirect(redirectUrl);
	}

	// Usuário autenticado acessando uma página protegida
	if (authToken && !publicRoute) {
		try {
			const decoded: any = jwtDecode(authToken.value);
			const currentTime = Date.now() / 1000;
			const isExpired = decoded.exp < currentTime;

			if (isExpired) {
				const redirectUrl = request.nextUrl.clone();
				redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

				return NextResponse.redirect(redirectUrl);
			}
		} catch (error) {
			const redirectUrl = request.nextUrl.clone();
			redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

			return NextResponse.redirect(redirectUrl);
		}

		return NextResponse.next();
	}

	return NextResponse.next();
}

export const config: MiddlewareConfig = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
