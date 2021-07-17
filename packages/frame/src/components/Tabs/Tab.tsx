import React from 'react';
import { ITabProps } from './PropsType';
import { TabButton } from './Styled';
import { css } from '@emotion/css';

const Tab: React.FC<ITabProps> = ({ name, icon }) => {
	return (
		<TabButton>
			<i
				className={css`
					display: block;
					width: 30px;
					height: 28px;
					flex: 1;
				`}>
				{icon}
			</i>
			{name}
		</TabButton>
	);
};

export default Tab;
