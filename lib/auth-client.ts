import { createAuthClient } from "better-auth/react";
import {
	organizationClient,
	passkeyClient,
	adminClient,
	multiSessionClient,
	usernameClient,
	magicLinkClient,
} from "better-auth/client/plugins";

export const client = createAuthClient({
	plugins: [
		passkeyClient(),
		adminClient(),
		multiSessionClient(),
		usernameClient(),
    magicLinkClient(),
		organizationClient(),
	],
	fetchOptions: {
		onError(e) {
			console.error(e);
			if (e.error.status === 429) {
				console.error("Too many requests. Please try again later.");
			}
		},
	},
});

export const {
	signUp,
	signIn,
	signOut,
	useSession,
	organization,
	useListOrganizations,
	useActiveOrganization,
} = client;

 
export type Session = typeof client.$Infer.Session