import React from 'react';
import { Platform, StatusBar, StatusBarStyle } from 'react-native';

interface CustomStatusBarProps {
  hidden?: boolean;
  barStyle?: StatusBarStyle;
  translucent?: false;
}

const CustomStatusbar: React.FC<CustomStatusBarProps> = ({
  hidden = false,
  barStyle = 'light-content',
  translucent = false,
}) => {
  const isAndroid = Platform.OS === 'android';

  return (
    <StatusBar
      animated={true}
      backgroundColor={isAndroid ? 'transparent' : undefined}
      translucent={isAndroid}
      barStyle={barStyle}
      hidden={hidden}
    />
  );
};

export default CustomStatusbar;
