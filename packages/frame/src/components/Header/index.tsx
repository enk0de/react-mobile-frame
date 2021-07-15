import React from 'react';
import { IHeaderProps } from './PropsType';
import { HeaderContainer, HeaderLeftArea, HeaderRightArea, HeaderTitle } from './Styled';

const Header: React.FC<IHeaderProps> = ({ leftArea, rightArea, children }) => {
	return (
		<HeaderContainer>
			<HeaderLeftArea>{leftArea}</HeaderLeftArea>
			<HeaderTitle>{children}</HeaderTitle>
			<HeaderRightArea>{rightArea}</HeaderRightArea>
		</HeaderContainer>
	);
};

export default Header;
