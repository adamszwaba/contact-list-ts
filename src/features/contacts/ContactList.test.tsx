import { ThemeProvider } from "@mui/material";
import * as tlr from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theme from "src/theme";
import ContactList from "./ContactList";

describe("Contact List", () => {
  it("fulfills definition of done", async () => {
    tlr.render(
      <ThemeProvider theme={theme}>
        <ContactList />
      </ThemeProvider>
    );
    const contactList = tlr.screen.getByLabelText("List of contacts");

    // initially displays an empty list
    expect(contactList.children.length).toBe(0);

    const ctaButton = tlr.screen.getByRole("button");
    expect(ctaButton).toHaveTextContent("Load more");

    userEvent.click(ctaButton);

    // this test is ugly, really, and only this way because our apiCall
    // function isn't pure
    await tlr.waitFor(
      () => {
        expect(ctaButton.textContent).not.toBe("Loading...");
      },
      { timeout: 3000 }
    );

    if (ctaButton.textContent === "Load more") {
      const contactCard = await tlr.screen.findByLabelText("Ron Giles");

      await tlr.waitFor(() => {
        console.log(contactCard.ariaSelected);
        expect(contactCard.getAttribute("aria-selected")).toBe("false");
      });

      userEvent.click(contactCard);

      await tlr.waitFor(() => {
        expect(contactCard.getAttribute("aria-selected")).toBe("true");
      });

      userEvent.click(contactCard);

      await tlr.waitFor(() => {
        expect(contactCard.getAttribute("aria-selected")).toBe("false");
      });
    } else {
      expect(contactList.children.length).toBe(0);
    }
  });
});
