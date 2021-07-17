import React from 'react';
import { IHeaderProps } from './PropsType';
import { HeaderContainer, HeaderLeftArea, HeaderRightArea, HeaderTitle } from './Styled';
import { css } from '@emotion/css';

const Header: React.FC<IHeaderProps> = ({ leftArea, rightArea, children }) => {
	return (
		<header
			className={css`
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				background: #fff;
			`}>
			<HeaderContainer>
				<HeaderLeftArea>{leftArea}</HeaderLeftArea>
				<HeaderTitle>{children}</HeaderTitle>
				<HeaderRightArea>{rightArea}</HeaderRightArea>
			</HeaderContainer>
		</header>
	);
};

export default Header;
