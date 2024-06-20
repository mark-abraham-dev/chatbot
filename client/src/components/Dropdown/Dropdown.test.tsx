import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import Dropdown from "./Dropdown";
import { USER_ROLES } from "../../consts";

const mockOnChange = jest.fn();

describe("Dropdown Component", () => {
  it("renders with default user role", () => {
    render(<Dropdown userRole="Admin" onChange={mockOnChange} />);
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("toggles dropdown list on button click", async () => {
    render(<Dropdown userRole="Admin" onChange={mockOnChange} />);
    const button_1 = screen.getByRole("button");

    // Open dropdown
    await act(async () => {
      fireEvent.click(button_1);
    });

    USER_ROLES.filter((role) => role !== "Admin").forEach((role) => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });

    const button_2 = screen.getByRole("button");

    // Close dropdown
    await act(async () => {
      fireEvent.click(button_2);
    });

    USER_ROLES.filter((role) => role !== "Admin").forEach((role) => {
      expect(screen.queryByText(role)).not.toBeInTheDocument();
    });
  });

  it("calls onChange with selected user role", async () => {
    render(<Dropdown userRole="Admin" onChange={mockOnChange} />);
    const button = screen.getByRole("button");

    // Open dropdown
    await act(async () => {
      fireEvent.click(button);
    });

    const userOption = screen.getByText("User");

    // Select "User"
    await act(async () => {
      fireEvent.click(userOption);
    });

    expect(mockOnChange).toHaveBeenCalledWith("User");
  });
});
