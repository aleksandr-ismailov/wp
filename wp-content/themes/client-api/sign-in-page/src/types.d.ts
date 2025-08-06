declare module '*.json' {
	const value: any;
	export default value;
}

declare module '@wordpress/block-editor' {
	export const useBlockProps: {
		(props?: any): any;
		save: (props?: any) => any;
	};
	export const InnerBlocks: {
		(props: { template?: any; templateLock?: string }): JSX.Element;
		Content: () => JSX.Element;
	};
	export const InspectorControls: (props: {
		children: React.ReactNode;
	}) => JSX.Element;
}

declare module '@wordpress/components' {
	export const PanelBody: (props: {
		title: string;
		children: React.ReactNode;
	}) => JSX.Element;
	export const TextControl: (props: {
		label: string;
		value: string;
		onChange: (value: string) => void;
	}) => JSX.Element;
}

declare module '@wordpress/i18n' {
	export function __(text: string, domain?: string): string;
}

declare module '@wordpress/blocks' {
	export function registerBlockType(name: string, settings: any): void;
}

interface BlockAttributes {
	formTitle: string;
	formDescription: string;
	buttonText: string;
}

interface EditProps {
	attributes: BlockAttributes;
	setAttributes: ( _attributes: Partial< BlockAttributes > ) => void;
}
