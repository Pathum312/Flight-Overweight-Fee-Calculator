import { redirect } from '@sveltejs/kit';

/**
 * Loads the page and redirects to the calculator route.
 *
 * @throws {Redirect} Redirects to the '/calculator' page with a 307 status code.
 */
export const load = () => {
	throw redirect(307, '/calculator');
};
