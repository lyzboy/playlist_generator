import React from 'react';
import Track from './Track';
import { render, screen } from '@testing-library/react';

describe('Track Component', () => {
    it('has a track component that is rendered', ()=>{
        //Arrange
        //no arrangement needed
        //Act
        const {container} = render(<Track />);
        //Assert
        expect(container.firstChild).toBeTruthy();
    });

    it('has a track name', ()=>{
        //Arrange
        const trackName = "A Song";
        //Act
        render(<Track trackName={trackName}/>);
        const expectedElement = screen.getByText(trackName);
        //Assert
        // check if there is an <h2> with the text of trackName
        expect(expectedElement).toBeInTheDocument();
    });

    it('has an artist', ()=>{
        //Arrange
        const artistName = "An Artist"
        //Act
        render(<Track artistName={artistName} />);
        const expectedElement = screen.getByText(artistName);
        //Assert
        expect(expectedElement).toBeInTheDocument();
    });

    it('has an album', ()=>{

        const albumName = 'An Album';

        render(<Track albumName={albumName} />);
        const expectedElement = screen.getByText(albumName);

        expect(expectedElement).toBeInTheDocument();

    });

    it('has a button to add track to list state',()=>{
        render(<Track />)

        const inputElement = screen.getByRole("button", {name: "+"});

        expect(inputElement).toBeInTheDocument();
    });

    it('calls the add track to list function when button pressed', ()=>{});
});