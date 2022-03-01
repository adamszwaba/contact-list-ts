import { ThemeProvider } from "@mui/material";
import * as tlr from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theme from "src/theme";
import ContactList from "./ContactList";

describe("Contact List", () => {
  it("initially displays an empty list", () => {
    tlr.render(
      <ThemeProvider theme={theme}>
        <ContactList />
      </ThemeProvider>
    );
    const contactList = tlr.screen.getByLabelText("List of contacts");
    // initially displays an empty list
    expect(contactList.children.length).toBe(0);

    const ctaButton = tlr.screen.getByRole("button");
    expect(ctaButton).toHaveTextContent("Fetch contacts");

    userEvent.click(ctaButton);

    // this test is ugly, really, and only this way because our apiCall
    // function isn't pure
    if (ctaButton.ariaDisabled === "true") {
      while (ctaButton.ariaDisabled === "true") {
        expect(contactList.children.length).toBe(0);
        expect(ctaButton.textContent).toBe("Error. Retry?");
        userEvent.click(ctaButton);
      }
    }

    expect(contactList.children.length).toBeGreaterThan(0);

    const contactCard = contactList.children[0];

    expect(contactCard.ariaSelected).toBe("false");

    userEvent.click(contactCard);

    expect(contactCard.ariaSelected).toBe("true");

    userEvent.click(contactCard);

    expect(contactCard.ariaSelected).toBe("false");
  });
});
