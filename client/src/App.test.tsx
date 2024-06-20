import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

beforeAll(() => {
  window.alert = jest.fn();
});

describe("App Component", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders welcome messages", () => {
    render(<App />);
    expect(screen.getByText(/Hello, Dani/i)).toBeInTheDocument();
    expect(screen.getByText(/Just a quick check in/i)).toBeInTheDocument();
  });

  it("sends text on Enter key press", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ answer: "Test Answer" }));

    render(<App />);
    const textarea = screen.getByPlaceholderText("Chat with CynchAI...");
    fireEvent.change(textarea, { target: { value: "Test question\n" } });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.anything(),
        expect.anything()
      );
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        body: JSON.stringify({ question: "Test question" }),
      })
    );
  });

  it("does not send empty text", () => {
    render(<App />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(fetchMock).toHaveBeenCalledTimes(0);
  });
});
