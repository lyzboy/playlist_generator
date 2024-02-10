import React from "react";
import SearchBar from "./SearchBar";
import { render, screen } from "@testing-library/react";

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
});
