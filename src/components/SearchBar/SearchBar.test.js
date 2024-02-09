import React from "react";
import SearchBar from "./SearchBar";
import { render } from "@testing-library/react";

it("Checks if the search bar component is rendered", () => {
    //Arrange

    //Act
    const { container } = render(<SearchBar />);

    //Assert
    expect(container.firstChild).toBeTruthy();
});
