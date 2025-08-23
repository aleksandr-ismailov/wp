interface SourceConfig {
	name: string;
	icon: string;
	bgColor: string;
	textColor: string;
}

const sourceConfigs: Record<string, SourceConfig> = {
	react: {
		name: 'React',
		icon: '/icons/react.svg',
		bgColor: 'bg-[#61dbfb]',
		textColor: 'text-black',
	},
	nextjs: {
		name: 'Next.js',
		icon: '/icons/nextjs.svg',
		bgColor: 'bg-black',
		textColor: 'text-white',
	},
	wordpress: {
		name: 'WordPress',
		icon: '/icons/wordpress.svg',
		bgColor: 'bg-[#21759b]',
		textColor: 'text-white',
	},
};

export const getSourceConfig = (source: string): SourceConfig => {
	return (
		sourceConfigs[source] || {
			name: 'Unknown Source',
			icon: '/icons/default.svg',
			bgColor: 'bg-gray-500',
			textColor: 'text-white',
		}
	);
};
