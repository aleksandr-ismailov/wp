import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import {
	Placeholder,
	TextControl,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Register sidebar-content block with keywords for search
registerBlockType('client-api/sidebar-content', {
	title: 'Sidebar Content',
	category: 'widgets',
	icon: 'layout',
	description: 'Configure content for left and right sidebars',
	keywords: ['sidebar', 'panel', 'side panel', 'widget', 'content'],
	attributes: {
		leftSidebarContent: {
			type: 'string',
			default: '',
		},
		rightSidebarContent: {
			type: 'string',
			default: '',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const { leftSidebarContent, rightSidebarContent } = attributes;
		const blockProps = useBlockProps();

		return (
			<div {...blockProps}>
				<h3>
					{__('Sidebar Content Configuration', 'client-api-blocks')}
				</h3>
				<TextareaControl
					label={__('Left Sidebar Content', 'client-api-blocks')}
					value={leftSidebarContent}
					onChange={(value) =>
						setAttributes({ leftSidebarContent: value })
					}
					rows={6}
					help={__(
						'HTML content for the left sidebar',
						'client-api-blocks'
					)}
				/>
				<TextareaControl
					label={__('Right Sidebar Content', 'client-api-blocks')}
					value={rightSidebarContent}
					onChange={(value) =>
						setAttributes({ rightSidebarContent: value })
					}
					rows={6}
					help={__(
						'HTML content for the right sidebar',
						'client-api-blocks'
					)}
				/>
			</div>
		);
	},
	save: () => null,
});

// Register sign-in-page block with keywords for search
registerBlockType('client-api/sign-in-page', {
	title: 'Sign In Page',
	category: 'widgets',
	icon: 'admin-users',
	description: 'Create a sign-in page with configurable content',
	keywords: ['login', 'sign in', 'auth', 'form', 'user'],
	attributes: {
		formTitle: {
			type: 'string',
			default: 'Sign In',
		},
		buttonText: {
			type: 'string',
			default: 'Sign In',
		},
	},
	edit: ({ attributes, setAttributes }) => {
		const { formTitle, buttonText } = attributes;
		const blockProps = useBlockProps();
		const hasContent = formTitle || buttonText;

		return (
			<>
				<InspectorControls>
					<PanelBody title={__('Form Settings', 'client-api-blocks')}>
						<TextControl
							label={__('Form Title', 'client-api-blocks')}
							value={formTitle}
							onChange={(value) =>
								setAttributes({ formTitle: value })
							}
						/>
						<TextControl
							label={__('Button Text', 'client-api-blocks')}
							value={buttonText}
							onChange={(value) =>
								setAttributes({ buttonText: value })
							}
						/>
					</PanelBody>
				</InspectorControls>
				<div {...blockProps}>
					{!hasContent ? (
						<Placeholder
							label={__('Sign In Page', 'client-api-blocks')}
							instructions={__(
								'Configure form settings and add content blocks using the settings panel.',
								'client-api-blocks'
							)}
						/>
					) : (
						<div className="sign-in-form-preview">
							{formTitle && <h3>{formTitle}</h3>}
							<div className="sign-in-content">
								<InnerBlocks />
							</div>
						</div>
					)}
				</div>
			</>
		);
	},
	save: () => null,
});
