/**
 * Object containing color values used in the application.
 */
export const Colors = {
    main: {
        black: '#132538',
        white: '#FFFFFF',
        blue: '#035AE6',
        lightBlue: '#189EF8',
        darkBlue: '#132538',
        lightGrey: '#F4F4F4',
        mediumGrey: '#827E81',
        darkPurple: '#5d00a6',
        purple: '#8b4ec6'
    }
}

const hexToRgb = (hex: string) => {
    hex = hex.replace(/^#/, '');

    if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(hex)) {
        return { red: 0, green: 0, blue: 0 }
    }

    if (hex.length === 3) {
        hex = hex.replace(/(.)/g, '$1$1');
    }

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return { red, green, blue };
}

export const colorWithOpacity = (hexColor: string, opacity: number) => {
    const color = hexToRgb(hexColor);

    if (opacity < 0 || opacity > 1) {
        opacity = 1;
    }

    return `rgba(${color.red}, ${color.green}, ${color.blue}, ${opacity})`;
}
