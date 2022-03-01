import { ThemeProvider } from "@mui/material";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import theme from "src/theme";
import ContactList from "./ContactList";
import * as apiCall from "./api";

jest.mock("./api.ts");

const spy = jest.spyOn(apiCall, "default");

const setup = () =>
  render(
    <ThemeProvider theme={theme}>
      <ContactList />
    </ThemeProvider>
  );

describe("Contact List", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("fulfills happy route", async () => {
    spy.mockImplementationOnce(() =>
      Promise.resolve([
        {
          id: "1",
          jobTitle: "Fabricator",
          emailAddress: "Ron_Giles3711@dionrab.com",
          firstNameLastName: "Ron Giles",
        },
      ])
    );
    setup();
    const contactList = screen.getByLabelText("List of contacts");

    // initially displays an empty list
    expect(contactList.children.length).toBe(0);

    const ctaButton = screen.getByRole("button");
    expect(ctaButton).toHaveTextContent("Load more");

    userEvent.click(ctaButton);

    const contactCard = await screen.findByLabelText("Ron Giles");

    // allows toggling
    expect(contactCard.getAttribute("aria-selected")).toBe("false");

    userEvent.click(contactCard);

    expect(
      screen.queryByLabelText("Ron Giles")?.getAttribute("aria-selected")
    ).toBe("true");

    act(() => userEvent.click(contactCard));

    expect(contactCard.getAttribute("aria-selected")).toBe("false");
  });

  it("displays error if error happens", async () => {
    spy.mockImplementationOnce(() => {
      throw new Error("Something went wrong");
    });

    setup();

    const ctaButton = screen.getByRole("button");
    expect(ctaButton).toHaveTextContent("Load more");

    userEvent.click(ctaButton);

    await waitFor(
      () => {
        expect(ctaButton.textContent).toBe("Error. Try again?");
      },
      { timeout: 3000 }
    );
  });
});
