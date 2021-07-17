import React from 'react';
import { ITabsProps } from './PropsType';
import { TabsContainer } from './Styled';
import { css } from '@emotion/css';

const Tabs: React.FC<ITabsProps> = ({ children }) => {
	return (
		<div
			className={css`
				position: fixed;
				bottom: 0;
				right: 0;
				left: 0;
				background: #fff;
			`}>
			<TabsContainer>{children}</TabsContainer>
		</div>
	);
};

export default Tabs;
