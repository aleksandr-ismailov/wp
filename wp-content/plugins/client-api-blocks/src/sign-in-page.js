import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, Placeholder, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Export the edit function for sign-in-page block
export const edit = ({ attributes, setAttributes }) => {
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
};

// Export the save function
export const save = () => null;
