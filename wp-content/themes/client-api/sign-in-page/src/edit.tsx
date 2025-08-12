import {
	InnerBlocks,
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

/**
 * @typedef {Object} SignInBlockAttributes
 * @property {string} formTitle  - Form title text
 * @property {string} buttonText - Button text
 */

/**
 * @typedef {Object} SignInEditProps
 * @property {SignInBlockAttributes} attributes    - Block attributes
 * @property {Function}              setAttributes - Function to update attributes
 */

/**
 * @param {SignInEditProps} props
 */
const Edit = ( props ) => {
	const { attributes, setAttributes } = props;
	const { formTitle, buttonText } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title="Form Settings">
					<TextControl
						label="Form Title"
						value={ formTitle }
						onChange={ ( value ) =>
							setAttributes( { formTitle: value } )
						}
					/>
					<TextControl
						label="Button Text"
						value={ buttonText }
						onChange={ ( value ) =>
							setAttributes( { buttonText: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...useBlockProps() }>
				<InnerBlocks />
			</div>
		</>
	);
};

export default Edit;
