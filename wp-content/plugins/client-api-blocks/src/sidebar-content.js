import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, Placeholder, TextareaControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// Export the edit function for sidebar-content block
export const edit = ({ attributes, setAttributes }) => {
	const { leftSidebarContent, rightSidebarContent } = attributes;
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Sidebar Settings', 'client-api-blocks')}>
					<TextareaControl
						label={__('Left Sidebar Content', 'client-api-blocks')}
						value={leftSidebarContent}
						onChange={(value) =>
							setAttributes({ leftSidebarContent: value })
						}
						rows={6}
					/>
					<TextareaControl
						label={__('Right Sidebar Content', 'client-api-blocks')}
						value={rightSidebarContent}
						onChange={(value) =>
							setAttributes({ rightSidebarContent: value })
						}
						rows={6}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<Placeholder
					label={__('Sidebar Content', 'client-api-blocks')}
					instructions={__(
						'Configure left and right sidebar content using the settings panel.',
						'client-api-blocks'
					)}
				/>
			</div>
		</>
	);
};

// Export the save function
export const save = () => null;
