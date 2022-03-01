import { Container } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import ContactList from "./features/contacts/ContactList";
import theme from "./theme";

function App() {
  //  TODO fetch contacts using apiData function, handle loading and error states
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <ContactList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
