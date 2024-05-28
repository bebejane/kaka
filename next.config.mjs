const sassOptions = {
	includePaths: ["./components", "./pages"],
	prependData: `
    @use "sass:math";
    @import "./lib/styles/mediaqueries"; 
    @import "./lib/styles/fonts";
  `,
};

export default async (phase, { defaultConfig }) => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const nextConfig = {
		sassOptions,
		typescript: {
			ignoreBuildErrors: true,
		},
		eslint: {
			ignoreDuringBuilds: true,
		},
		devIndicators: {
			buildActivity: false,
		},
		experimental: {
			scrollRestoration: true,
		},
		webpack: (config, ctx) => {
			config.module.rules.push({
				test: /\.(graphql|gql)$/,
				exclude: /node_modules/,
				loader: "graphql-tag/loader",
			});
			config.module.rules.push({
				test: /\.svg$/i,
				issuer: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: ["@svgr/webpack"],
			});
			return config;
		},
	};
	return nextConfig;
};
