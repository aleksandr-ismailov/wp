( function() {
	const { registerBlockType } = wp.blocks;
	const { useBlockProps } = wp.blockEditor;
	const { TextareaControl } = wp.components;
	const { __ } = wp.i18n;
	const { createElement: el } = wp.element;

	registerBlockType( 'client-api/sidebar-content', {
		title: __( 'Sidebar Content', 'client-api' ),
		category: 'widgets',
		icon: 'layout',
		description: __(
			'Configure content for left and right sidebars',
			'client-api'
		),

		edit( props ) {
			const { attributes, setAttributes } = props;
			const { leftSidebarContent, rightSidebarContent } = attributes;
			const blockProps = useBlockProps();

			return el( 'div', blockProps, [
				el( 'h3', {}, __( 'Sidebar Content Configuration', 'client-api' ) ),
				el( TextareaControl, {
					label: __( 'Left Sidebar Content', 'client-api' ),
					value: leftSidebarContent,
					onChange( value ) {
						setAttributes( { leftSidebarContent: value } );
					},
					rows: 6,
					help: __( 'HTML content for the left sidebar', 'client-api' ),
				} ),
				el( TextareaControl, {
					label: __( 'Right Sidebar Content', 'client-api' ),
					value: rightSidebarContent,
					onChange( value ) {
						setAttributes( { rightSidebarContent: value } );
					},
					rows: 6,
					help: __(
						'HTML content for the right sidebar',
						'client-api'
					),
				} ),
			] );
		},

		save() {
			return null;
		},
	} );
}() );
