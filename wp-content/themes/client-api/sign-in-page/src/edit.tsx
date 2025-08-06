import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const Edit = ( props: EditProps ) => {
	const { attributes, setAttributes } = props;
	const { formTitle, formDescription, buttonText } = attributes;

	const TEMPLATE = [
		[
			'core/heading',
			{
				content: 'Welcome Back',
				level: 3,
			},
		],
		[
			'core/paragraph',
			{
				content: 'Good to see you again!',
			},
		],
		[
			'core/heading',
			{
				content: 'Features',
				level: 3,
			},
		],
		[
			'core/list',
			{},
			[
				[ 'core/list-item', { content: 'Modern interface' } ],
				[ 'core/list-item', { content: 'Secure authentication' } ],
				[ 'core/list-item', { content: 'Fast performance' } ],
				[ 'core/list-item', { content: '24/7 support' } ],
			],
		],
		[
			'core/heading',
			{
				content: 'Contact Info',
				level: 5,
			},
		],
		[
			'core/paragraph',
			{
				content:
					'Email: support@example.com<br>Phone: +1 (555) 223-332',
			},
		],
		[
			'core/heading',
			{
				content: 'System Status',
				level: 6,
			},
		],
		[
			'core/paragraph',
			{
				content: 'All systems operational ✓',
			},
		],
	];

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Form Settings', 'client-api' ) }>
					<TextControl
						label={ __( 'Form Title', 'client-api' ) }
						value={ formTitle }
						onChange={ ( value ) =>
							setAttributes( { formTitle: value } )
						}
					/>
					<TextControl
						label={ __( 'Form Description', 'client-api' ) }
						value={ formDescription }
						onChange={ ( value ) =>
							setAttributes( { formDescription: value } )
						}
					/>
					<TextControl
						label={ __( 'Button Text', 'client-api' ) }
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<InnerBlocks template={ TEMPLATE } />
			</div>
		</>
	);
};

export default Edit;
