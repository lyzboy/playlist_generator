import React from "react";
import SearchBar from "./SearchBar";
import { render, screen, fireEvent } from "@testing-library/react";

describe("SearchBar Component", () => {
    it("has search bar component that is rendered", () => {
        //Arrange
        // no arrangement needed

        //Act
        const { container } = render(<SearchBar />);

        //Assert
        expect(container.firstChild).toBeTruthy();
    });

    it("has an input field that is rendered with the desired text", () => {
        //Arrange
        render(<SearchBar />);
        //Act
        const inputElement = screen.getByPlaceholderText("Enter song title");
        //Assert
        expect(inputElement).toBeInTheDocument;
    });

    it("has a button that is rendered with the desired text", () => {
        //Arrange
        render(<SearchBar />);

        //Act
        const inputElement = screen.getByRole("button", { name: /search/i });

        //Assert
        expect(inputElement).toBeInTheDocument();
    });

    it("sets the search value using setSearchValue on input change", () => {
        //Arrange
        // create a mock setSearchValue function
        const mockSetSearchValue = jest.fn();
        render(<SearchBar setSearchValue={mockSetSearchValue} />);

        //Act
        fireEvent.change(screen.getByPlaceholderText("Enter song title"), {
            target: { value: "Imagine" },
        });

        //Assert
        expect(mockSetSearchValue).toHaveBeenCalledWith("Imagine");
    });

    it("calls the search function when the button is clicked", () => {
        //Arrange
        // create a mock setSearchValue function
        const mockSetSearchValue = jest.fn();
        const mockSearch = jest.fn();
        render(
            <SearchBar
                setSearchValue={mockSetSearchValue}
                handleSearch={mockSearch}
            />
        );

        //Act
        fireEvent.click(screen.getByRole("button", { name: /search/i }));

        //Assert
        expect(mockSearch).toHaveBeenCalled();
    });
});
