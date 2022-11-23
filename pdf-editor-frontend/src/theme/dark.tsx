import { createTheme } from "@mui/material/styles";


const theme = createTheme({
    palette: {
      mode: 'dark',
      text: {
        primary: '#fff',
      },
      primary: {
        main: "#898fff", // getComputedStyle(document.body).getPropertyValue("--primary")
      },
      secondary: {
        main: "#fff", 
      },
    },
  });

export default theme;