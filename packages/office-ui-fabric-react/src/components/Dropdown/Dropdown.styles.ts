import { IDropdownStyles, IDropdownStyleProps } from './Dropdown.types';
import { IStyleFunction } from '../../Utilities';
import { IStyle, normalize, HighContrastSelector, FontSizes } from '../../Styling';

const highContrastAdjustMixin = {
  // highContrastAdjust mixin
  '@media screen and (-ms-high-contrast: active),  screen and (-ms-high-contrast: black-on-white)': {
    MsHighContrastAdjust: 'none'
  }
};

const highContrastItemAndTitleStateMixin: IStyle = {
  selectors: {
    [HighContrastSelector]: {
      backgroundColor: 'Highlight',
      borderColor: 'Highlight',
      color: 'Highlight'
    },
    ...highContrastAdjustMixin
  }
};

const highContrastBorderState: IStyle = {
  selectors: {
    [HighContrastSelector]: {
      borderColor: 'Highlight'
    }
  }
};

export const getStyles: IStyleFunction<IDropdownStyleProps, IDropdownStyles> = props => {
  const { theme, hasError } = props;

  if (!theme) {
    throw new Error('theme is undefined');
  }

  const rootHoverFocusActiveSelectorNeutralDarkMixin: IStyle = {
    color: theme.palette.neutralDark
  };

  const rootHoverFocusActiveSelectorNeutralSecondaryMixin: IStyle = {
    color: theme.palette.neutralSecondary
  };

  const borderColorError: IStyle = {
    borderColor: theme.semanticColors.errorText
  };

  return {
    root: [
      normalize,
      {
        fontSize: FontSizes.medium,
        color: theme.palette.neutralPrimary,
        position: 'relative',
        outline: 0,
        userSelect: 'none',
        selectors: {
          ':hover .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.neutralDark
            },
            highContrastBorderState
          ],
          ':focus .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.themePrimary
            },
            highContrastItemAndTitleStateMixin
          ],
          ':active .title': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              borderColor: theme.palette.themeDark
            },
            highContrastBorderState
          ],

          ':hover .caretDown': rootHoverFocusActiveSelectorNeutralDarkMixin,
          ':focus .caretDown': [
            rootHoverFocusActiveSelectorNeutralDarkMixin,
            {
              selectors: {
                [HighContrastSelector]: {
                  color: 'HighlightText'
                },
                ...highContrastAdjustMixin
              }
            }
          ],
          ':active .caretDown': rootHoverFocusActiveSelectorNeutralDarkMixin,

          ':hover .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,
          ':focus .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,
          ':active .titleIsPlaceHolder': rootHoverFocusActiveSelectorNeutralSecondaryMixin,

          ':hover .titleIsError': borderColorError,
          ':active .titleIsError': borderColorError,
          ':focus .titleIsError': borderColorError
        }
      }
    ],
    titleIsError: {
      borderColor: theme.semanticColors.errorText
    }
  };
};
