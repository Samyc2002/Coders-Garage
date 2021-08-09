import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createTheme' {
    interface Theme {
		Palette: {
			primary: {
				light: string,
				main: string,
				dark: string
			}
		};
    }
    // allow configuration using `createTheme`
    interface ThemeOptions {
		Palette?: {
			primary?: {
				light?: string,
				main?: string,
				dark?: string
			}
		};
    }
}

export const theme = createTheme({
    palette: {
		primary: {
			dark: '#8000FF',
			main: '#B366FF',
			light: '#E6CCFF'
		}
	}
})