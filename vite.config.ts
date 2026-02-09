import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import packageJson from "./package.json";

export default defineConfig({
	plugins: [react()],
	define: {
		// Define a global constant for the app
		"import.meta.env.PACKAGE_VERSION": JSON.stringify(packageJson.version),
	},
});
