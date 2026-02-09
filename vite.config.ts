import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import packageJson from "./package.json";

export default defineConfig({
	define: {
		// Define a global constant for the app
		"import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
	},
	plugins: [react()],
});
