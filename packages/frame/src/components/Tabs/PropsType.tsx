import { HTMLProps } from 'react';
import { ReactJSXIntrinsicElements } from '@emotion/react/types/jsx-namespace';

export interface ITabProps extends HTMLProps<HTMLButtonElement> {
	name: string;
	icon: ReactJSXIntrinsicElements['img'];
}

export interface ITabsProps {}
